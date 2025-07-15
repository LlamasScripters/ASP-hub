import { db } from "@/db/index.js";
import {
	categories,
	sectionResponsibilities,
	sections,
	users,
} from "@/db/schema.js";
import { and, asc, eq, isNull, ne } from "drizzle-orm";
import { updateUserRole } from "../shared/membership-helpers.js";
import type {
	ResponsibilityAssignmentResult,
	ResponsibilityFilters,
	ResponsibilityWithUser,
	SectionResponsibility,
	UserResponsibilityWithDetails,
} from "./responsibilities.types.js";

export class ResponsibilitiesService {
	/**
	 * Récupère les responsabilités avec filtres
	 */
	async getResponsibilities(
		filters: ResponsibilityFilters = {},
	): Promise<ResponsibilityWithUser[]> {
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

		return result.map((row) => ({
			...row.section_responsibilities,
			user: {
				id: row.users?.id || "",
				firstName: row.users?.firstName || "",
				lastName: row.users?.lastName || "",
				email: row.users?.email || "",
			},
		})) as ResponsibilityWithUser[];
	}

	/**
	 * Assigne une responsabilité générique
	 */
	async assignResponsibility(data: {
		userId: string;
		sectionId?: string;
		categoryId?: string;
		role: string;
	}) {
		const [responsibility] = await db
			.insert(sectionResponsibilities)
			.values(data)
			.returning();
		return responsibility;
	}

	/**
	 * Assigne un responsable de section
	 */
	async assignSectionManager(
		sectionId: string,
		userId: string,
	): Promise<ResponsibilityAssignmentResult> {
		// Validation des paramètres d'entrée
		if (!sectionId || !userId) {
			throw new Error("Section ID and User ID are required");
		}

		// Utiliser une transaction pour assurer la cohérence
		return await db.transaction(async (tx) => {
			// Vérifier que la section existe
			const [section] = await tx
				.select({ id: sections.id })
				.from(sections)
				.where(eq(sections.id, sectionId));

			if (!section) {
				throw new Error("Section non trouvée");
			}

			// Vérifier que l'utilisateur existe
			const [user] = await tx
				.select({ id: users.id })
				.from(users)
				.where(eq(users.id, userId));

			if (!user) {
				throw new Error("Utilisateur non trouvé");
			}

			// D'abord, récupérer l'ancien responsable s'il existe
			const [currentManager] = await tx
				.select()
				.from(sectionResponsibilities)
				.where(
					and(
						eq(sectionResponsibilities.sectionId, sectionId),
						eq(sectionResponsibilities.role, "section_manager"),
						eq(sectionResponsibilities.isActive, true),
					),
				);

			// Désactiver le responsable actuel s'il y en a un
			if (currentManager) {
				await tx
					.update(sectionResponsibilities)
					.set({ isActive: false })
					.where(eq(sectionResponsibilities.id, currentManager.id));

				// Mettre à jour le rôle de l'ancien responsable
				await updateUserRole(currentManager.userId, tx);
			}

			// Assigner le nouveau responsable
			const [responsibility] = await tx
				.insert(sectionResponsibilities)
				.values({
					userId,
					sectionId,
					role: "section_manager",
					isActive: true,
				})
				.returning();

			// Mettre à jour le rôle du nouveau responsable
			await updateUserRole(userId, tx);

			return {
				id: responsibility.id,
				message: "Responsable de section assigné avec succès",
				success: true,
			};
		});
	}

	/**
	 * Supprime un responsable de section
	 */
	async removeSectionManager(sectionId: string) {
		// Utiliser une transaction pour assurer la cohérence
		return await db.transaction(async (tx) => {
			// Récupérer le responsable actuel
			const [currentManager] = await tx
				.select()
				.from(sectionResponsibilities)
				.where(
					and(
						eq(sectionResponsibilities.sectionId, sectionId),
						eq(sectionResponsibilities.role, "section_manager"),
						eq(sectionResponsibilities.isActive, true),
					),
				);

			if (currentManager) {
				// Désactiver la responsabilité
				await tx
					.update(sectionResponsibilities)
					.set({ isActive: false })
					.where(eq(sectionResponsibilities.id, currentManager.id));

				// Mettre à jour le rôle de l'utilisateur
				await updateUserRole(currentManager.userId, tx);
			}
		});
	}

	/**
	 * Assigne un coach à une catégorie
	 */
	async assignCategoryCoach(
		categoryId: string,
		userId: string,
	): Promise<ResponsibilityAssignmentResult> {
		// Validation des paramètres d'entrée
		if (!categoryId || !userId) {
			throw new Error("Category ID and User ID are required");
		}

		// Utiliser une transaction pour assurer la cohérence
		return await db.transaction(async (tx) => {
			// Récupérer la catégorie pour obtenir la sectionId
			const [category] = await tx
				.select({ sectionId: categories.sectionId })
				.from(categories)
				.where(eq(categories.id, categoryId));

			if (!category) {
				throw new Error("Catégorie non trouvée");
			}

			// Vérifier que l'utilisateur existe
			const [user] = await tx
				.select({ id: users.id })
				.from(users)
				.where(eq(users.id, userId));

			if (!user) {
				throw new Error("Utilisateur non trouvé");
			}

			// D'abord, récupérer l'ancien coach s'il existe
			const [currentCoach] = await tx
				.select()
				.from(sectionResponsibilities)
				.where(
					and(
						eq(sectionResponsibilities.categoryId, categoryId),
						eq(sectionResponsibilities.role, "coach"),
						eq(sectionResponsibilities.isActive, true),
					),
				);

			// Désactiver le coach actuel s'il y en a un
			if (currentCoach) {
				await tx
					.update(sectionResponsibilities)
					.set({ isActive: false })
					.where(eq(sectionResponsibilities.id, currentCoach.id));

				// Mettre à jour le rôle de l'ancien coach
				await updateUserRole(currentCoach.userId, tx);
			}

			// Assigner le nouveau coach
			const [responsibility] = await tx
				.insert(sectionResponsibilities)
				.values({
					userId,
					sectionId: category.sectionId, // Ajouter le sectionId
					categoryId,
					role: "coach",
					isActive: true,
				})
				.returning();

			// Mettre à jour le rôle du nouveau coach
			await updateUserRole(userId, tx);

			return {
				id: responsibility.id,
				message: "Coach assigné avec succès",
				success: true,
			};
		});
	}

	/**
	 * Supprime un coach d'une catégorie
	 */
	async removeCategoryCoach(categoryId: string) {
		// Utiliser une transaction pour assurer la cohérence
		return await db.transaction(async (tx) => {
			// Récupérer le coach actuel
			const [currentCoach] = await tx
				.select()
				.from(sectionResponsibilities)
				.where(
					and(
						eq(sectionResponsibilities.categoryId, categoryId),
						eq(sectionResponsibilities.role, "coach"),
						eq(sectionResponsibilities.isActive, true),
					),
				);

			if (currentCoach) {
				// Désactiver la responsabilité
				await tx
					.update(sectionResponsibilities)
					.set({ isActive: false })
					.where(eq(sectionResponsibilities.id, currentCoach.id));

				// Mettre à jour le rôle de l'utilisateur
				await updateUserRole(currentCoach.userId, tx);
			}
		});
	}

	/**
	 * Récupère les responsabilités d'un utilisateur
	 */
	async getUserResponsibilities(
		userId: string,
	): Promise<UserResponsibilityWithDetails[]> {
		const results = await db
			.select({
				id: sectionResponsibilities.id,
				role: sectionResponsibilities.role,
				assignedAt: sectionResponsibilities.assignedAt,
				sectionId: sections.id,
				sectionName: sections.name,
				sectionClubId: sections.clubId,
				categoryId: categories.id,
				categoryName: categories.name,
			})
			.from(sectionResponsibilities)
			.leftJoin(sections, eq(sections.id, sectionResponsibilities.sectionId))
			.leftJoin(
				categories,
				eq(categories.id, sectionResponsibilities.categoryId),
			)
			.where(
				and(
					eq(sectionResponsibilities.userId, userId),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.orderBy(asc(sections.name));

		return results as UserResponsibilityWithDetails[];
	}

	/**
	 * Récupère les responsabilités d'une section
	 */
	async getSectionResponsibilities(
		sectionId: string,
	): Promise<ResponsibilityWithUser[]> {
		return this.getResponsibilities({ sectionId, isActive: true });
	}

	/**
	 * Récupère les responsabilités d'une catégorie
	 */
	async getCategoryResponsibilities(
		categoryId: string,
	): Promise<ResponsibilityWithUser[]> {
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
					),
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
						isNull(users.deletedAt), // Exclure les utilisateurs supprimés
					),
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
						eq(sectionResponsibilities.isActive, true),
					),
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
						isNull(users.deletedAt), // Exclure les utilisateurs supprimés
					),
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
						eq(sectionResponsibilities.isActive, true),
					),
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
