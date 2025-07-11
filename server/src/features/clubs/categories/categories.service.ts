import type { 
	CategoryFilters, 
	CategoryWithRelations, 
	CreateCategoryData, 
	UpdateCategoryData 
} from "./categories.types.js";
import { db } from "@/db/index.js";
import { categories, sections, clubs, sessionsSport } from "@/db/schema.js";
import { eq, and, like, count, sql } from "drizzle-orm";
import type { SQL } from "drizzle-orm";

export class CategoriesService {
	/**
	 * Récupère une catégorie par son ID avec ses relations
	 */
	async getCategoryById(categoryId: string): Promise<CategoryWithRelations | null> {
		const result = await db
			.select()
			.from(categories)
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.where(eq(categories.id, categoryId))
			.limit(1);

		if (!result.length) return null;

		const row = result[0];
		const sessionsCount = await db
			.select({ count: count() })
			.from(sessionsSport)
			.where(eq(sessionsSport.categoryId, categoryId));

		return {
			...row.categories,
			section: row.sections ? {
				...row.sections,
				club: row.clubs ? row.clubs : undefined,
			} : undefined,
			sessionsCount: sessionsCount[0]?.count || 0,
		};
	}

	/**
	 * Récupère toutes les catégories avec pagination et filtres
	 */
	async getCategories(filters: CategoryFilters = {}): Promise<{
		data: CategoryWithRelations[];
		total: number;
		page: number;
		limit: number;
	}> {
		const { page = 1, limit = 10, sectionId, clubId, search, isActive, ageMin, ageMax } = filters;
		const offset = (page - 1) * limit;

		// Construction des conditions WHERE
		const whereConditions: SQL[] = [];

		if (sectionId) {
			whereConditions.push(eq(categories.sectionId, sectionId));
		}

		if (clubId) {
			whereConditions.push(eq(clubs.id, clubId));
		}

		if (search) {
			whereConditions.push(like(categories.name, `%${search}%`));
		}

		if (isActive !== undefined) {
			whereConditions.push(eq(categories.isActive, isActive));
		}

		if (ageMin !== undefined) {
			whereConditions.push(
				sql`${categories.ageMin} IS NULL OR ${categories.ageMin} >= ${ageMin}`
			);
		}

		if (ageMax !== undefined) {
			whereConditions.push(
				sql`${categories.ageMax} IS NULL OR ${categories.ageMax} <= ${ageMax}`
			);
		}

		// Requête pour les données
		const data = await db
			.select()
			.from(categories)
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.where(whereConditions.length > 0 ? and(...whereConditions) : undefined)
			.orderBy(categories.name)
			.offset(offset)
			.limit(limit);

		// Requête pour le total
		const totalResult = await db
			.select({ count: count() })
			.from(categories)
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.where(whereConditions.length > 0 ? and(...whereConditions) : undefined);

		// Transformation des données avec comptage des sessions
		const transformedData: CategoryWithRelations[] = [];
		for (const row of data) {
			const sessionsCount = await db
				.select({ count: count() })
				.from(sessionsSport)
				.where(eq(sessionsSport.categoryId, row.categories.id));

			transformedData.push({
				...row.categories,
				section: row.sections ? {
					...row.sections,
					club: row.clubs ? row.clubs : undefined,
				} : undefined,
				sessionsCount: sessionsCount[0]?.count || 0,
			});
		}

		return {
			data: transformedData,
			total: totalResult[0]?.count || 0,
			page,
			limit,
		};
	}

	/**
	 * Récupère les catégories d'une section
	 */
	async getCategoriesBySection(sectionId: string): Promise<CategoryWithRelations[]> {
		const data = await db
			.select()
			.from(categories)
			.leftJoin(sections, eq(categories.sectionId, sections.id))
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.where(eq(categories.sectionId, sectionId))
			.orderBy(categories.name);

		const transformedData: CategoryWithRelations[] = [];
		for (const row of data) {
			const sessionsCount = await db
				.select({ count: count() })
				.from(sessionsSport)
				.where(eq(sessionsSport.categoryId, row.categories.id));

			transformedData.push({
				...row.categories,
				section: row.sections ? {
					...row.sections,
					club: row.clubs ? row.clubs : undefined,
				} : undefined,
				sessionsCount: sessionsCount[0]?.count || 0,
			});
		}

		return transformedData;
	}

	/**
	 * Créer une nouvelle catégorie
	 */
	async createCategory(data: CreateCategoryData): Promise<CategoryWithRelations> {
		const [createdCategory] = await db
			.insert(categories)
			.values({
				...data,
				id: crypto.randomUUID(),
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning();

		// Récupérer la catégorie créée avec ses relations
		const category = await this.getCategoryById(createdCategory.id);
		if (!category) {
			throw new Error("Erreur lors de la création de la catégorie");
		}

		return category;
	}

	/**
	 * Mettre à jour une catégorie
	 */
	async updateCategory(id: string, data: UpdateCategoryData): Promise<CategoryWithRelations> {
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
	async toggleCategoryStatus(id: string, isActive: boolean): Promise<CategoryWithRelations> {
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
