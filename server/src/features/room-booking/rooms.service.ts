import type { InsertRoom, SelectRoom } from "@/db/schema.js";
import { rooms } from "@/db/schema.js";
import { eq } from "drizzle-orm";
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

	update: async (id: string, data: Partial<InsertRoom>): Promise<SelectRoom | undefined> => {
		const [updated] = await db.update(rooms).set(data).where(eq(rooms.id, id)).returning();
		return updated;
	},

	delete: async (id: string): Promise<void> => {
		await db.delete(rooms).where(eq(rooms.id, id));
	}
};
