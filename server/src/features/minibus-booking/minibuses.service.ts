import type { InsertMinibus, SelectMinibus } from "@/db/schema.js";
import { minibuses } from "@/db/schema.js";
import { eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";

export const minibusesService = {
	create: async (data: InsertMinibus) => {
		const [minibus] = await db.insert(minibuses).values(data).returning();
		return minibus;
	},

	getAll: async (): Promise<SelectMinibus[]> => {
		return await db.select().from(minibuses);
	},

	getAllPaginated: async (
		page: number,
		limit: number,
	): Promise<{
		data: SelectMinibus[];
		total: number;
		page: number;
		limit: number;
	}> => {
		const offset = (page - 1) * limit;

		const data = await db.select().from(minibuses).limit(limit).offset(offset);

		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(minibuses);

		return {
			data,
			total: count,
			page,
			limit,
		};
	},

	getById: async (id: string): Promise<SelectMinibus | null> => {
		const minibusesFound = await db
			.select()
			.from(minibuses)
			.where(eq(minibuses.id, id));
		return minibusesFound[0] || null;
	},

	update: async (
		id: string,
		data: Partial<InsertMinibus>,
	): Promise<SelectMinibus | null> => {
		const [updated] = await db
			.update(minibuses)
			.set(data)
			.where(eq(minibuses.id, id))
			.returning();
		return updated || null;
	},

	deleteById: async (id: string): Promise<void> => {
		await db.delete(minibuses).where(eq(minibuses.id, id));
	},
};
