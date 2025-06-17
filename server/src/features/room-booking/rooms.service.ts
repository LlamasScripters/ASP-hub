import type { InsertRoom, SelectRoom } from "@/db/schema.js";
import { rooms } from "@/db/schema.js";
import { eq, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { complexesService } from "./complexes.service.js";

function validateAgainstParent(
	complexSchedule: Record<
		string,
		{ open: string | null; close: string | null; closed: boolean }
	>,
	roomSchedule: Record<
		string,
		{ open: string | null; close: string | null; closed: boolean }
	>,
) {
	for (const day of Object.keys(complexSchedule)) {
		const p = complexSchedule[day];
		const c = roomSchedule[day];

		if (p.closed && !c.closed) {
			throw new Error(
				`The complex is closed on ${day}, the room must also be closed`,
			);
		}
		if (!p.closed && !c.closed) {
			if (
				(c.open !== null && p.open !== null && c.open < p.open) ||
				(c.close !== null && p.close !== null && c.close > p.close)
			) {
				throw new Error(
					`Room schedule for ${day} is outside the complex's operating hours (${p.open}–${p.close}).`,
				);
			}
		}
	}
}

export const roomsService = {
	create: async (data: InsertRoom) => {
		const complex = await complexesService.getById(data.complexId);
		if (!complex) throw new Error("Complexe introuvable");
		validateAgainstParent(
			complex.openingHours as Record<
				string,
				{ open: string | null; close: string | null; closed: boolean }
			>,
			data.openingHours as Record<
				string,
				{ open: string | null; close: string | null; closed: boolean }
			>,
		);

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
		const complexId =
			data.complexId ??
			(await db.select().from(rooms).where(eq(rooms.id, id)))[0].complexId;

		const complex = await complexesService.getById(complexId);
		if (!complex) throw new Error("Complexe introuvable");

		if (data.openingHours) {
			validateAgainstParent(
				complex.openingHours as Record<
					string,
					{ open: string | null; close: string | null; closed: boolean }
				>,
				data.openingHours as Record<
					string,
					{ open: string | null; close: string | null; closed: boolean }
				>,
			);
		}

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
