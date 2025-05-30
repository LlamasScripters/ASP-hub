import type { InsertReservation, SelectReservation } from "@/db/schema.js";
import { reservations } from "@/db/schema.js";
import { and, eq, gt, lt, ne, or } from "drizzle-orm";
import { db } from "../../db/index.js";

export const reservationsService = {
	create: async (
		data: InsertReservation,
	): Promise<SelectReservation | null> => {
		const conflicting = await db
			.select()
			.from(reservations)
			.where(
				and(
					eq(reservations.roomId, data.roomId),
					or(
						// Début dans la plage existante
						//@ts-ignore
						and(
							//@ts-ignore
							gt(data.startAt, reservations.startAt),
							//@ts-ignore
							lt(data.startAt, reservations.endAt),
						),
						// Fin dans la plage existante
						//@ts-ignore
						and(
							//@ts-ignore
							gt(data.endAt, reservations.startAt),
							//@ts-ignore
							lt(data.endAt, reservations.endAt),
						),
						// La nouvelle réservation englobe une existante
						//@ts-ignore
						and(
							//@ts-ignore
							lt(data.startAt, reservations.startAt),
							//@ts-ignore
							gt(data.endAt, reservations.endAt),
						),
						// Identique
						and(
							//@ts-ignore
							eq(data.startAt, reservations.startAt),
							//@ts-ignore
							eq(data.endAt, reservations.endAt),
						),
					),
				),
			);

		if (conflicting.length > 0) {
			return null; // indique qu’il y a un conflit
		}

		const [created] = await db.insert(reservations).values(data).returning();
		return created;
	},

	getAll: async (): Promise<SelectReservation[]> => {
		return await db.select().from(reservations);
	},

	getById: async (id: string): Promise<SelectReservation | undefined> => {
		const [res] = await db
			.select()
			.from(reservations)
			.where(eq(reservations.id, id));
		return res;
	},

	getByRoomId: async (
		roomId: string,
	): Promise<SelectReservation[]> => {
		return await db
			.select()
			.from(reservations)
			.where(eq(reservations.roomId, roomId));
	},

	update: async (
		id: string,
		data: Partial<InsertReservation>,
	): Promise<SelectReservation | "conflict" | "not_found"> => {
		const [current] = await db
			.select()
			.from(reservations)
			.where(eq(reservations.id, id));
		if (!current) return "not_found";

		const startAt = data.startAt ?? current.startAt;
		const endAt = data.endAt ?? current.endAt;
		const roomId = data.roomId ?? current.roomId;

		const conflicting = await db
			.select()
			.from(reservations)
			.where(
				and(
					eq(reservations.roomId, roomId),
					ne(reservations.id, id), // Exclure la réservation actuelle
					or(
						and(
							//@ts-ignore
							gt(startAt, reservations.startAt),
							//@ts-ignore
							lt(startAt, reservations.endAt),
						),
						and(
							//@ts-ignore
							gt(endAt, reservations.startAt),
							//@ts-ignore
							lt(endAt, reservations.endAt),
						),
						and(
							//@ts-ignore
							lt(startAt, reservations.startAt),
							//@ts-ignore
							gt(endAt, reservations.endAt),
						),
						and(
							//@ts-ignore
							eq(startAt, reservations.startAt),
							//@ts-ignore
							eq(endAt, reservations.endAt),
						),
					),
				),
			);

		if (conflicting.length > 0) {
			return "conflict";
		}

		const [updated] = await db
			.update(reservations)
			.set(data)
			.where(eq(reservations.id, id))
			.returning();

		return updated;
	},

	delete: async (id: string): Promise<void> => {
		await db.delete(reservations).where(eq(reservations.id, id));
	},
};
