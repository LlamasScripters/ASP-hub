import { db } from "@/db/index.js";
import { 
	type InsertSection, 
	type SelectSection, 
	sections, 
	clubs,
	categories,
	sectionResponsibilities,
	users,
} from "@/db/schema.js";
import { and, asc, eq, ilike, sql } from "drizzle-orm";
import type { SectionFilters, SectionsPaginatedResponse, SectionWithRelations } from "./sections.types.js";

export const sectionsService = {
	/**
	 * Récupère toutes les sections avec pagination, filtres et relations
	 */
	async getAll(filters: SectionFilters = {}): Promise<SectionsPaginatedResponse> {
		const { page = 1, limit = 20, clubId, search, isActive } = filters;
		const offset = (page - 1) * limit;

		// Construction de la requête avec filtres
		const conditions = [];
		
		if (clubId) {
			conditions.push(eq(sections.clubId, clubId));
		}
		
		if (search) {
			conditions.push(ilike(sections.name, `%${search}%`));
		}
		
		if (isActive !== undefined) {
			conditions.push(eq(sections.isActive, isActive));
		}

		// Récupération des données avec relations
		const data = await db
			.select({
				// Section fields
				id: sections.id,
				clubId: sections.clubId,
				name: sections.name,
				description: sections.description,
				color: sections.color,
				isActive: sections.isActive,
				createdAt: sections.createdAt,
				updatedAt: sections.updatedAt,
				// Club relation
				clubName: clubs.name,
				// Categories count
				categoriesCount: sql<number>`count(distinct ${categories.id})`.as('categoriesCount'),
				// Manager relation
				managerId: users.id,
				managerFirstName: users.firstName,
				managerLastName: users.lastName,
				managerEmail: users.email,
			})
			.from(sections)
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(categories, eq(sections.id, categories.sectionId))
			.leftJoin(sectionResponsibilities, 
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true)
				)
			)
			.leftJoin(users, eq(sectionResponsibilities.userId, users.id))
			.where(conditions.length > 0 ? and(...conditions) : undefined)
			.groupBy(sections.id, clubs.id, users.id)
			.orderBy(asc(sections.name))
			.limit(limit)
			.offset(offset);

		// Comptage total
		const [{ count }] = await db
			.select({ count: sql<number>`count(distinct ${sections.id})` })
			.from(sections)
			.where(conditions.length > 0 ? and(...conditions) : undefined);

		// Formatage des résultats
		const formattedData = data.map(row => ({
			id: row.id,
			clubId: row.clubId,
			name: row.name,
			description: row.description,
			color: row.color,
			isActive: row.isActive,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt,
			club: row.clubName ? {
				id: row.clubId,
				name: row.clubName,
			} : undefined,
			categoriesCount: row.categoriesCount || 0,
			manager: row.managerId ? {
				id: row.managerId,
				firstName: row.managerFirstName || "",
				lastName: row.managerLastName || "",
				email: row.managerEmail || "",
			} : undefined,
		}));

		return {
			data: formattedData,
			total: count,
			page,
			limit,
		};
	},

	/**
	 * Récupère une section par son ID avec relations
	 */
	async getById(id: string): Promise<SectionWithRelations | undefined> {
		const [result] = await db
			.select({
				// Section fields
				id: sections.id,
				clubId: sections.clubId,
				name: sections.name,
				description: sections.description,
				color: sections.color,
				isActive: sections.isActive,
				createdAt: sections.createdAt,
				updatedAt: sections.updatedAt,
				// Club relation
				clubName: clubs.name,
				// Categories count
				categoriesCount: sql<number>`count(distinct ${categories.id})`.as('categoriesCount'),
				// Manager relation
				managerId: users.id,
				managerFirstName: users.firstName,
				managerLastName: users.lastName,
				managerEmail: users.email,
			})
			.from(sections)
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(categories, eq(sections.id, categories.sectionId))
			.leftJoin(sectionResponsibilities, 
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true)
				)
			)
			.leftJoin(users, eq(sectionResponsibilities.userId, users.id))
			.where(eq(sections.id, id))
			.groupBy(sections.id, clubs.id, users.id);

		if (!result) return undefined;

		return {
			id: result.id,
			clubId: result.clubId,
			name: result.name,
			description: result.description,
			color: result.color,
			isActive: result.isActive,
			createdAt: result.createdAt,
			updatedAt: result.updatedAt,
			club: result.clubName ? {
				id: result.clubId,
				name: result.clubName,
			} : undefined,
			categoriesCount: result.categoriesCount || 0,
			manager: result.managerId ? {
				id: result.managerId,
				firstName: result.managerFirstName || "",
				lastName: result.managerLastName || "",
				email: result.managerEmail || "",
			} : undefined,
		};
	},

	/**
	 * Crée une nouvelle section
	 */
	async create(data: InsertSection): Promise<SelectSection> {
		const [section] = await db.insert(sections).values(data).returning();
		return section;
	},

	/**
	 * Met à jour une section
	 */
	async update(id: string, data: Partial<InsertSection>): Promise<SelectSection | undefined> {
		const [section] = await db
			.update(sections)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(sections.id, id))
			.returning();
		return section;
	},

	/**
	 * Supprime logiquement une section (marque comme inactive)
	 */
	async delete(id: string): Promise<boolean> {
		const [section] = await db
			.update(sections)
			.set({ isActive: false, updatedAt: new Date() })
			.where(eq(sections.id, id))
			.returning();
		return !!section;
	},

	/**
	 * Supprime définitivement une section
	 */
	async hardDelete(id: string): Promise<void> {
		await db.delete(sections).where(eq(sections.id, id));
	},

	/**
	 * Récupère les sections d'un club spécifique
	 */
	async getByClubId(clubId: string): Promise<SectionWithRelations[]> {
		const result = await this.getAll({ clubId, limit: 100 });
		return result.data;
	},
};
