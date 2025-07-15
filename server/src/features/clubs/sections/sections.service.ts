import { db } from "@/db/index.js";
import {
	type InsertSection,
	type SelectSection,
	categories,
	clubs,
	sectionResponsibilities,
	sections,
	users,
} from "@/db/schema.js";
import { and, asc, eq, sql } from "drizzle-orm";
import type {
	SectionResponse,
	SectionsPaginatedResponse,
} from "./sections.types.js";

export const sectionsService = {
	/**
	 * Récupère toutes les sections avec pagination, filtres et relations
	 */
	async getAll(): Promise<SectionsPaginatedResponse> {
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
				categoriesCount: sql<number>`count(distinct ${categories.id})`.as(
					"categoriesCount",
				),
				// Manager relation
				managerId: users.id,
				managerFirstName: users.firstName,
				managerLastName: users.lastName,
				managerEmail: users.email,
			})
			.from(sections)
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(categories, eq(sections.id, categories.sectionId))
			.leftJoin(
				sectionResponsibilities,
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.leftJoin(users, eq(sectionResponsibilities.userId, users.id))
			.groupBy(sections.id, clubs.id, users.id)
			.orderBy(asc(sections.name));

		// Comptage total
		const [{ count }] = await db
			.select({ count: sql<number>`count(distinct ${sections.id})` })
			.from(sections);

		// Formatage des résultats
		const formattedData = data.map((row) => ({
			id: row.id,
			clubId: row.clubId,
			name: row.name,
			description: row.description,
			color: row.color,
			isActive: row.isActive,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt,
			club: {
				id: row.clubId,
				name: row.clubName || "",
			},
			categoriesCount: row.categoriesCount || 0,
			manager: row.managerId
				? {
						id: row.managerId,
						firstName: row.managerFirstName || "",
						lastName: row.managerLastName || "",
						email: row.managerEmail || "",
					}
				: undefined,
		}));

		return {
			data: formattedData,
			total: count,
		};
	},

	/**
	 * Récupère une section par son ID avec relations
	 */
	async getById(id: string): Promise<SectionResponse | undefined> {
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
				categoriesCount: sql<number>`count(distinct ${categories.id})`.as(
					"categoriesCount",
				),
				// Manager relation
				managerId: users.id,
				managerFirstName: users.firstName,
				managerLastName: users.lastName,
				managerEmail: users.email,
			})
			.from(sections)
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(categories, eq(sections.id, categories.sectionId))
			.leftJoin(
				sectionResponsibilities,
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true),
				),
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
			club: {
				id: result.clubId,
				name: result.clubName || "",
			},
			categoriesCount: result.categoriesCount || 0,
			manager: result.managerId
				? {
						id: result.managerId,
						firstName: result.managerFirstName || "",
						lastName: result.managerLastName || "",
						email: result.managerEmail || "",
					}
				: undefined,
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
	async update(
		id: string,
		data: Partial<InsertSection>,
	): Promise<SelectSection | undefined> {
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
	async getByClubId(clubId: string): Promise<SectionsPaginatedResponse> {
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
				categoriesCount: sql<number>`count(distinct ${categories.id})`.as(
					"categoriesCount",
				),
				// Manager relation
				managerId: users.id,
				managerFirstName: users.firstName,
				managerLastName: users.lastName,
				managerEmail: users.email,
			})
			.from(sections)
			.leftJoin(clubs, eq(sections.clubId, clubs.id))
			.leftJoin(categories, eq(sections.id, categories.sectionId))
			.leftJoin(
				sectionResponsibilities,
				and(
					eq(sectionResponsibilities.sectionId, sections.id),
					eq(sectionResponsibilities.role, "section_manager"),
					eq(sectionResponsibilities.isActive, true),
				),
			)
			.leftJoin(users, eq(sectionResponsibilities.userId, users.id))
			.where(eq(sections.clubId, clubId))
			.groupBy(sections.id, clubs.id, users.id)
			.orderBy(asc(sections.name));

		// Comptage total
		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(sections)
			.where(eq(sections.clubId, clubId));

		// Formatage des résultats
		const formattedData = data.map((row) => ({
			id: row.id,
			clubId: row.clubId,
			name: row.name,
			description: row.description,
			color: row.color,
			isActive: row.isActive,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt,
			club: {
				id: row.clubId,
				name: row.clubName || "",
			},
			categoriesCount: row.categoriesCount || 0,
			manager: row.managerId
				? {
						id: row.managerId,
						firstName: row.managerFirstName || "",
						lastName: row.managerLastName || "",
						email: row.managerEmail || "",
					}
				: undefined,
		}));

		return {
			data: formattedData,
			total: count,
		};
	},
};
