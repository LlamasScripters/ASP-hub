import { db } from "@/db/index.js";
import { type InsertClub, type SelectClub, clubs } from "@/db/schema.js";
import { and, asc, eq, ilike, sql } from "drizzle-orm";
import type { ClubsPaginatedResponse } from "./clubs.types.js";

export const clubsService = {
	/**
	 * Récupère tous les clubs avec pagination et filtres
	 */
	async getAll(): Promise<ClubsPaginatedResponse> {
		// Récupération des données
		const data = await db.select().from(clubs);

		// Comptage total
		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(clubs);

		return {
			data,
			total: count,
		};
	},

	/**
	 * Récupère un club par son ID
	 */
	async getById(id: string): Promise<SelectClub | undefined> {
		const [club] = await db.select().from(clubs).where(eq(clubs.id, id));
		return club;
	},

	/**
	 * Crée un nouveau club
	 */
	async create(data: InsertClub): Promise<SelectClub> {
		const [club] = await db.insert(clubs).values(data).returning();
		return club;
	},

	/**
	 * Met à jour un club
	 */
	async update(
		id: string,
		data: Partial<InsertClub>,
	): Promise<SelectClub | undefined> {
		const [club] = await db
			.update(clubs)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(clubs.id, id))
			.returning();
		return club;
	},

	/**
	 * Supprime logiquement un club (marque comme inactif)
	 */
	async delete(id: string): Promise<boolean> {
		const [club] = await db
			.update(clubs)
			.set({ isActive: false, updatedAt: new Date() })
			.where(eq(clubs.id, id))
			.returning();
		return !!club;
	},

	/**
	 * Supprime définitivement un club
	 */
	async hardDelete(id: string): Promise<void> {
		await db.delete(clubs).where(eq(clubs.id, id));
	},
};
