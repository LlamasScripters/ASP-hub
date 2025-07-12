import type { 
	CategoryResponse,
	CategoriesPaginatedResponse,
	CreateCategoryData, 
	UpdateCategoryData 
} from "./categories.types.js";
import { db } from "@/db/index.js";
import { categories, sections, clubs, sessionsSport, sectionResponsibilities, users, type SelectCategory, } from "@/db/schema.js";
import { eq, and, asc, count, sql } from "drizzle-orm";

export class CategoriesService {
	/**
	 * Récupère une catégorie par son ID avec ses relations
	 */
	async getCategoryById(categoryId: string): Promise<CategoryResponse | undefined> {
		const [result] = await db
			.select({
				id: categories.id,
				sectionId: categories.sectionId,
				name: categories.name,
				description: categories.description,
				ageMin: categories.ageMin,
				ageMax: categories.ageMax,
				isActive: categories.isActive,
				createdAt: categories.createdAt,
				updatedAt: categories.updatedAt,
				// Section relation
				sectionName: sections.name,
				sectionColor: sections.color,
				// Session relation
				sessionsCount: sql<number>`count(distinct ${sessionsSport.id})`.as('sessionsCount'),
				// Club relation
				clubId: clubs.id,
				clubName: clubs.name,
				// Coach relation
				coachId: users.id,
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachEmail: users.email,
			})
			.from(categories)
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(sessionsSport, eq(sessionsSport.categoryId, categories.id))
			.leftJoin(sectionResponsibilities,
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.categoryId, categories.id),
					eq(sectionResponsibilities.role, "coach"),
					eq(sectionResponsibilities.isActive, true)
				)
			)
			.leftJoin(users, eq(sectionResponsibilities.userId, users.id))
			.where(eq(categories.id, categoryId))
			.groupBy(categories.id, sections.id, clubs.id, users.id);

		if (!result) return undefined;

		return {
			id: result.id,
			sectionId: result.sectionId,
			name: result.name,
			description: result.description || null,
			ageMin: result.ageMin || null,
			ageMax: result.ageMax || null,
			isActive: result.isActive ?? false,
			createdAt: result.createdAt,
			updatedAt: result.updatedAt,
			section: {
				id: result.sectionId || '',
				name: result.sectionName || '',
				color: result.sectionColor || null,
				club: {
					id: result.clubId || '',
					name: result.clubName || '',
				},
			},
			sessionsCount: result.sessionsCount ?? 0,
			coach: result.coachId ? {
				id: result.coachId,
				firstName: result.coachFirstName ?? "",
				lastName: result.coachLastName ?? "",
				email: result.coachEmail ?? "",
			} : undefined,
		};
	}

	/**
	 * Récupère toutes les catégories avec pagination et filtres
	 */
	async getCategories(): Promise<CategoriesPaginatedResponse> {
		const data = await db
			.select({
				id: categories.id,
				sectionId: categories.sectionId,
				name: categories.name,
				description: categories.description,
				ageMin: categories.ageMin,
				ageMax: categories.ageMax,
				isActive: categories.isActive,
				createdAt: categories.createdAt,
				updatedAt: categories.updatedAt,
				// Section relation
				sectionName: sections.name,
				sectionColor: sections.color,
				// Session relation
				sessionsCount: sql<number>`count(distinct ${sessionsSport.id})`.as('categoriesCount'),
				// Club relation
				clubId: clubs.id,
				clubName: clubs.name,
				// Coach relation
				coachId: users.id,
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachEmail: users.email,
			})
			.from(categories)
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(sessionsSport, eq(sessionsSport.categoryId, categories.id))
			.leftJoin(sectionResponsibilities,
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.categoryId, categories.id),
					eq(sectionResponsibilities.role, "coach"),
					eq(sectionResponsibilities.isActive, true)
				)
			)
			.leftJoin(users, eq(sectionResponsibilities.userId, users.id))
			.groupBy(categories.id, sections.id, clubs.id, users.id)
			.orderBy(asc(categories.name));


		// Comptage total
		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(categories);

		const formattedData = data.map(row => ({
			id: row.id,
			sectionId: row.sectionId,
			name: row.name,
			description: row.description || null,
			ageMin: row.ageMin || null,
			ageMax: row.ageMax || null,
			isActive: row.isActive || false,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt,
			section: {
				id: row.sectionId || '',
				name: row.sectionName || '',
				color: row.sectionColor || null,
				club: {
					id: row.clubId || '',
					name: row.clubName || '',
				},
			},
			sessionsCount: row.sessionsCount || 0,
			coach: row.coachId ? {
				id: row.coachId,
				firstName: row.coachFirstName || "",
				lastName: row.coachLastName || "",
				email: row.coachEmail || "",
			} : undefined,
		}));

		return {
			data: formattedData,
			total: count,
		};
	}

	/**
	 * Récupère les catégories d'une section
	 */
	async getCategoriesBySection(sectionId: string): Promise<CategoriesPaginatedResponse> {
		const data = await db
			.select({
				id: categories.id,
				sectionId: categories.sectionId,
				name: categories.name,
				description: categories.description,
				ageMin: categories.ageMin,
				ageMax: categories.ageMax,
				isActive: categories.isActive,
				createdAt: categories.createdAt,
				updatedAt: categories.updatedAt,
				// Section relation
				sectionName: sections.name,
				sectionColor: sections.color,
				// Session relation
				sessionsCount: sql<number>`count(distinct ${sessionsSport.id})`.as('categoriesCount'),
				// Club relation
				clubId: clubs.id,
				clubName: clubs.name,
				// Coach relation
				coachId: users.id,
				coachFirstName: users.firstName,
				coachLastName: users.lastName,
				coachEmail: users.email,
			})
			.from(categories)
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(sessionsSport, eq(sessionsSport.categoryId, categories.id))
			.leftJoin(sectionResponsibilities,
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.categoryId, categories.id),
					eq(sectionResponsibilities.role, "coach"),
					eq(sectionResponsibilities.isActive, true)
				)
			)
			.leftJoin(users, eq(sectionResponsibilities.userId, users.id))
			.where(eq(categories.sectionId, sectionId))
			.groupBy(categories.id, sections.id, clubs.id, users.id)
			.orderBy(asc(categories.name));


		// Comptage total
		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(categories)
			.where(eq(categories.sectionId, sectionId));

		const formattedData = data.map(row => ({
			id: row.id,
			sectionId: row.sectionId,
			name: row.name,
			description: row.description || null,
			ageMin: row.ageMin || null,
			ageMax: row.ageMax || null,
			isActive: row.isActive || false,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt,
			section: {
				id: row.sectionId || '',
				name: row.sectionName || '',
				color: row.sectionColor || null,
				club: {
					id: row.clubId || '',
					name: row.clubName || '',
				},
			},
			sessionsCount: row.sessionsCount || 0,
			coach: row.coachId ? {
				id: row.coachId,
				firstName: row.coachFirstName || "",
				lastName: row.coachLastName || "",
				email: row.coachEmail || "",
			} : undefined,
		}));

		return {
			data: formattedData,
			total: count,
		};
	}

	/**
	 * Créer une nouvelle catégorie
	 */
	async createCategory(data: CreateCategoryData): Promise<SelectCategory> {
		const [newCategory] = await db
			.insert(categories)
			.values({
				...data,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning();

		if (!newCategory) {
			throw new Error("Erreur lors de la création de la catégorie");
		}

		// Récupérer la catégorie créée avec ses relations
		const category = await this.getCategoryById(newCategory.id);
		if (!category) {
			throw new Error("Erreur lors de la récupération de la catégorie créée");
		}

		return category;
	}

	/**
	 * Mettre à jour une catégorie
	 */
	async updateCategory(id: string, data: UpdateCategoryData): Promise<SelectCategory | undefined> {
		const [updatedCategory] = await db
			.update(categories)
			.set({
				...data,
				updatedAt: new Date(),
			})
			.where(eq(categories.id, id))
			.returning();

		if (!updatedCategory) {
			throw new Error("Catégorie non trouvée");
		}

		// Récupérer la catégorie mise à jour avec ses relations
		const category = await this.getCategoryById(updatedCategory.id);
		if (!category) {
			throw new Error("Erreur lors de la mise à jour de la catégorie");
		}

		return category;
	}

	/**
	 * Supprimer une catégorie
	 */
	async deleteCategory(id: string): Promise<void> {
		// Vérifier si la catégorie a des sessions
		const category = await this.getCategoryById(id);
		if (!category) {
			throw new Error("Catégorie non trouvée");
		}

		if (category.sessionsCount && category.sessionsCount > 0) {
			throw new Error("Impossible de supprimer une catégorie qui contient des sessions");
		}

		await db.delete(categories).where(eq(categories.id, id));
	}

	/**
	 * Désactiver/Activer une catégorie
	 */
	async toggleCategoryStatus(id: string, isActive: boolean): Promise<SelectCategory | undefined> {
		return await this.updateCategory(id, { isActive });
	}

	/**
	 * Vérifier si une catégorie peut être supprimée
	 */
	async canDeleteCategory(id: string): Promise<boolean> {
		const category = await this.getCategoryById(id);
		return category ? (category.sessionsCount || 0) === 0 : false;
	}

	/**
	 * Récupérer les statistiques d'une catégorie
	 */
	async getCategoryStats(id: string): Promise<{
		sessionsCount: number;
		activeSessionsCount: number;
		membersCount: number;
	}> {
		const sessionsCount = await db
			.select({ count: count() })
			.from(sessionsSport)
			.where(eq(sessionsSport.categoryId, id));

		const activeSessionsCount = await db
			.select({ count: count() })
			.from(sessionsSport)
			.where(
				and(
					eq(sessionsSport.categoryId, id),
					sql`${sessionsSport.status} != 'annule'`
				)
			);

		// Pour les membres, on devrait avoir une table session_members
		// mais pour le moment on retourne 0
		const membersCount = 0;

		return {
			sessionsCount: sessionsCount[0]?.count || 0,
			activeSessionsCount: activeSessionsCount[0]?.count || 0,
			membersCount,
		};
	}
}
