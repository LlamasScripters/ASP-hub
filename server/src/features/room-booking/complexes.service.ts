import type { InsertComplex, SelectComplex } from "@/db/schema.js";
import { complexes } from "@/db/schema.js";
import { eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";

export const complexesService = {
	create: async (data: InsertComplex) => {
		const [complex] = await db.insert(complexes).values(data).returning();
		return complex;
	},

	getAll: async (): Promise<SelectComplex[]> => {
		return await db.select().from(complexes);
	},

	getAllPaginated: async (
		page: number,
		limit: number,
	): Promise<{
		data: SelectComplex[];
		total: number;
		page: number;
		limit: number;
	}> => {
		const offset = (page - 1) * limit;

		const data = await db.select().from(complexes).limit(limit).offset(offset);

		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(complexes);

		return {
			data,
			total: count,
			page,
			limit,
		};
	},

	getById: async (id: string): Promise<SelectComplex | undefined> => {
		const [complex] = await db
			.select()
			.from(complexes)
			.where(eq(complexes.id, id));
		return complex;
	},

	update: async (
		id: string,
		data: Partial<InsertComplex>,
	): Promise<SelectComplex | undefined> => {
		const [updated] = await db
			.update(complexes)
			.set(data)
			.where(eq(complexes.id, id))
			.returning();
		return updated;
	},

	delete: async (id: string): Promise<void> => {
		await db.delete(complexes).where(eq(complexes.id, id));
	},
};
