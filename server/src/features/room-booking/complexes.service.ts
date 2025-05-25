import type { InsertComplex, SelectComplex } from "@/db/schema.js";
import { complexes } from "@/db/schema.js";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";

export const complexesService = {
	create: async (data: InsertComplex) => {
		const [complex] = await db.insert(complexes).values(data).returning();
		return complex;
	},

	getAll: async (): Promise<SelectComplex[]> => {
		return await db.select().from(complexes);
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
