import type { 
	SectionResponsibility, 
	ResponsibilityWithUser, 
	ResponsibilityAssignmentResult, 
	ResponsibilityFilters 
} from "./responsibilities.types.js";
import { db } from "@/db/index.js";
import { sectionResponsibilities, users } from "@/db/schema.js";
import { eq, and, ne, isNull, asc } from "drizzle-orm";

export class ResponsibilitiesService {
	/**
	 * Récupère les responsabilités avec filtres
	 */
	async getResponsibilities(filters: ResponsibilityFilters = {}): Promise<ResponsibilityWithUser[]> {
		const { sectionId, categoryId, role, isActive, userId } = filters;
		
		// Construction des conditions WHERE
		const whereConditions = [];
		
		if (sectionId) {
			whereConditions.push(eq(sectionResponsibilities.sectionId, sectionId));
		}
		
		if (categoryId) {
			whereConditions.push(eq(sectionResponsibilities.categoryId, categoryId));
		}
		
		if (role) {
			whereConditions.push(eq(sectionResponsibilities.role, role));
		}
		
		if (isActive !== undefined) {
			whereConditions.push(eq(sectionResponsibilities.isActive, isActive));
		}
		
		if (userId) {
			whereConditions.push(eq(sectionResponsibilities.userId, userId));
		}
		
		const result = await db
			.select()
			.from(sectionResponsibilities)
			.leftJoin(users, eq(sectionResponsibilities.userId, users.id))
			.where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
			.orderBy(sectionResponsibilities.assignedAt);
		
		return result.map(row => ({
			...row.section_responsibilities,
			user: {
				id: row.users?.id || "",
				firstName: row.users?.firstName || "",
				lastName: row.users?.lastName || "",
				email: row.users?.email || "",
			}
		})) as ResponsibilityWithUser[];
	}

	/**
	 * Assigne un responsable de section
	 */
	async assignSectionManager(sectionId: string, userId: string): Promise<ResponsibilityAssignmentResult> {
		try {
			// Vérifier s'il y a déjà un responsable actif pour cette section
			const existingManager = await db
				.select()
				.from(sectionResponsibilities)
				.where(
					and(
						eq(sectionResponsibilities.sectionId, sectionId),
						eq(sectionResponsibilities.role, "section_manager"),
						eq(sectionResponsibilities.isActive, true)
					)
				)
				.limit(1);

			if (existingManager.length > 0) {
				// Désactiver l'ancien responsable
				await db
					.update(sectionResponsibilities)
					.set({ isActive: false })
					.where(eq(sectionResponsibilities.id, existingManager[0].id));
			}

			// Créer la nouvelle responsabilité
			const [newResponsibility] = await db
				.insert(sectionResponsibilities)
				.values({
					userId,
					sectionId,
					categoryId: null,
					role: "section_manager",
					assignedAt: new Date(),
					isActive: true,
				})
				.returning();

			return {
				id: newResponsibility.id,
				message: "Responsable de section assigné avec succès",
				success: true,
			};
		} catch (error) {
			console.error("Erreur lors de l'assignation du responsable:", error);
			throw new Error("Erreur lors de l'assignation du responsable");
		}
	}

	/**
	 * Supprime un responsable de section
	 */
	async removeSectionManager(sectionId: string): Promise<void> {
		await db
			.update(sectionResponsibilities)
			.set({ isActive: false })
			.where(
				and(
					eq(sectionResponsibilities.sectionId, sectionId),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true)
				)
			);
	}

	/**
	 * Assigne un coach à une catégorie
	 */
	async assignCategoryCoach(categoryId: string, userId: string): Promise<ResponsibilityAssignmentResult> {
		try {
			// Vérifier s'il y a déjà un coach actif pour cette catégorie
			const existingCoach = await db
				.select()
				.from(sectionResponsibilities)
				.where(
					and(
						eq(sectionResponsibilities.categoryId, categoryId),
						eq(sectionResponsibilities.role, "coach"),
						eq(sectionResponsibilities.isActive, true)
					)
				)
				.limit(1);

			if (existingCoach.length > 0) {
				// Désactiver l'ancien coach
				await db
					.update(sectionResponsibilities)
					.set({ isActive: false })
					.where(eq(sectionResponsibilities.id, existingCoach[0].id));
			}

			// Créer la nouvelle responsabilité
			const [newResponsibility] = await db
				.insert(sectionResponsibilities)
				.values({
					userId,
					sectionId: null,
					categoryId,
					role: "coach",
					assignedAt: new Date(),
					isActive: true,
				})
				.returning();

			return {
				id: newResponsibility.id,
				message: "Coach assigné avec succès",
				success: true,
			};
		} catch (error) {
			console.error("Erreur lors de l'assignation du coach:", error);
			throw new Error("Erreur lors de l'assignation du coach");
		}
	}

	/**
	 * Supprime un coach d'une catégorie
	 */
	async removeCategoryCoach(categoryId: string): Promise<void> {
		await db
			.update(sectionResponsibilities)
			.set({ isActive: false })
			.where(
				and(
					eq(sectionResponsibilities.categoryId, categoryId),
					eq(sectionResponsibilities.role, "coach"),
					eq(sectionResponsibilities.isActive, true)
				)
			);
	}

	/**
	 * Récupère les responsabilités d'un utilisateur
	 */
	async getUserResponsibilities(userId: string): Promise<ResponsibilityWithUser[]> {
		return this.getResponsibilities({ userId, isActive: true });
	}

	/**
	 * Récupère les responsabilités d'une section
	 */
	async getSectionResponsibilities(sectionId: string): Promise<ResponsibilityWithUser[]> {
		return this.getResponsibilities({ sectionId, isActive: true });
	}

	/**
	 * Récupère les responsabilités d'une catégorie
	 */
	async getCategoryResponsibilities(categoryId: string): Promise<ResponsibilityWithUser[]> {
		return this.getResponsibilities({ categoryId, isActive: true });
	}

	/**
	 * Méthode pour obtenir les utilisateurs éligibles (non-admins) pour être assignés
	 */
	async getEligibleUsers() {
		try {
			// Version basique pour récupérer tous les utilisateurs éligibles
			const eligibleUsers = await db
				.select({
					id: users.id,
					firstName: users.firstName,
					lastName: users.lastName,
					email: users.email,
				})
				.from(users)
				.where(
					and(
						ne(users.role, "admin"), // Exclure les admins
						isNull(users.deletedAt), // Exclure les utilisateurs supprimés
					)
				)
				.orderBy(asc(users.firstName), asc(users.lastName));

			return eligibleUsers;
		} catch (error) {
			console.error("Erreur dans getEligibleUsers:", error);
			throw error;
		}
	}

	/**
	 * Méthode pour obtenir les utilisateurs éligibles pour une section spécifique
	 * Inclut le responsable actuel de cette section dans la liste
	 */
	async getEligibleUsersForSection(sectionId?: string) {
		try {
			const eligibleUsers = await db
				.select({
					id: users.id,
					firstName: users.firstName,
					lastName: users.lastName,
					email: users.email,
					role: users.role,
				})
				.from(users)
				.where(
					and(
						ne(users.role, "admin"), // Exclure les admins
						isNull(users.deletedAt) // Exclure les utilisateurs supprimés
					)
				)
				.orderBy(asc(users.firstName), asc(users.lastName));

			// Si aucune section spécifiée, exclure tous les responsables
			if (!sectionId) {
				return eligibleUsers
					.filter((user) => !["section_manager", "coach"].includes(user.role))
					.map((user) => ({
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
					}));
			}

			// Pour l'édition d'une section, inclure le responsable actuel de cette section
			const [currentManager] = await db
				.select({ userId: sectionResponsibilities.userId })
				.from(sectionResponsibilities)
				.where(
					and(
						eq(sectionResponsibilities.sectionId, sectionId),
						eq(sectionResponsibilities.role, "section_manager"),
						eq(sectionResponsibilities.isActive, true)
					)
				);

			return eligibleUsers
				.filter((user) => {
					// Inclure le responsable actuel de cette section
					if (currentManager && user.id === currentManager.userId) {
						return true;
					}
					// Exclure les autres responsables et coaches
					return !["section_manager", "coach"].includes(user.role);
				})
				.map((user) => ({
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
				}));
		} catch (error) {
			console.error("Erreur dans getEligibleUsersForSection:", error);
			throw error;
		}
	}

	/**
	 * Méthode pour obtenir les utilisateurs éligibles pour une catégorie spécifique
	 * Inclut le coach actuel de cette catégorie dans la liste
	 */
	async getEligibleUsersForCategory(categoryId?: string) {
		try {
			const eligibleUsers = await db
				.select({
					id: users.id,
					firstName: users.firstName,
					lastName: users.lastName,
					email: users.email,
					role: users.role,
				})
				.from(users)
				.where(
					and(
						ne(users.role, "admin"), // Exclure les admins
						isNull(users.deletedAt) // Exclure les utilisateurs supprimés
					)
				)
				.orderBy(asc(users.firstName), asc(users.lastName));

			// Si aucune catégorie spécifiée, exclure tous les responsables
			if (!categoryId) {
				return eligibleUsers
					.filter((user) => !["section_manager", "coach"].includes(user.role))
					.map((user) => ({
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
					}));
			}

			// Pour l'édition d'une catégorie, inclure le coach actuel de cette catégorie
			const [currentCoach] = await db
				.select({ userId: sectionResponsibilities.userId })
				.from(sectionResponsibilities)
				.where(
					and(
						eq(sectionResponsibilities.categoryId, categoryId),
						eq(sectionResponsibilities.role, "coach"),
						eq(sectionResponsibilities.isActive, true)
					)
				);

			return eligibleUsers
				.filter((user) => {
					// Inclure le coach actuel de cette catégorie
					if (currentCoach && user.id === currentCoach.userId) {
						return true;
					}
					// Exclure les autres responsables et coaches
					return !["section_manager", "coach"].includes(user.role);
				})
				.map((user) => ({
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
				}));
		} catch (error) {
			console.error("Erreur dans getEligibleUsersForCategory:", error);
			throw error;
		}
	}
}
