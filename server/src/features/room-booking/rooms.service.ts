import type { InsertRoom, SelectRoom } from "@/db/schema.js";
import { rooms } from "@/db/schema.js";
import { eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";

export const roomsService = {
	create: async (data: InsertRoom) => {
		const [room] = await db.insert(rooms).values(data).returning();
		return room;
	},

	getAll: async (): Promise<SelectRoom[]> => {
		return await db.select().from(rooms);
	},

	getById: async (id: string): Promise<SelectRoom | undefined> => {
		const [room] = await db.select().from(rooms).where(eq(rooms.id, id));
		return room;
	},

	getByComplexId: async (complexId: string): Promise<SelectRoom[]> => {
		return await db.select().from(rooms).where(eq(rooms.complexId, complexId));
	},

	getAllPaginated: async (
		page: number,
		limit: number,
	): Promise<{
		data: SelectRoom[];
		total: number;
		page: number;
		limit: number;
	}> => {
		const offset = (page - 1) * limit;
		const data = await db.select().from(rooms).limit(limit).offset(offset);
		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(rooms);
		return {
			data,
			total: count,
			page,
			limit,
		};
	},

	getByComplexIdPaginated: async (
		complexId: string,
		page: number,
		limit: number,
	): Promise<{
		data: SelectRoom[];
		total: number;
		page: number;
		limit: number;
	}> => {
		const offset = (page - 1) * limit;
		const data = await db
			.select()
			.from(rooms)
			.where(eq(rooms.complexId, complexId))
			.limit(limit)
			.offset(offset);
		const [{ count }] = await db
			.select({ count: sql<number>`count(*)` })
			.from(rooms)
			.where(eq(rooms.complexId, complexId));
		return {
			data,
			total: count,
			page,
			limit,
		};
	},

	update: async (
		id: string,
		data: Partial<InsertRoom>,
	): Promise<SelectRoom | undefined> => {
		const [updated] = await db
			.update(rooms)
			.set(data)
			.where(eq(rooms.id, id))
			.returning();
		return updated;
	},

	delete: async (id: string): Promise<void> => {
		await db.delete(rooms).where(eq(rooms.id, id));
	},
};
