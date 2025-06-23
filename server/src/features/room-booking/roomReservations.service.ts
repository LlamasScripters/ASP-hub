import type {
	InsertRoomReservation,
	SelectRoomReservation,
} from "@/db/schema.js";
import { roomReservations } from "@/db/schema.js";
import { and, eq, gt, lt, ne, or, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
	isWithinOpeningHours,
	type Schedule,
} from "../../lib/schedule-utils.js";
import { roomsService } from "./rooms.service.js";

export const roomReservationsService = {
	create: async (
		data: InsertRoomReservation,
	): Promise<SelectRoomReservation | null> => {
		const room = await roomsService.getById(data.roomId);
		if (!room) {
			throw new Error("Room not found");
		}

		const openingHoursCheck = isWithinOpeningHours(
			data.startAt,
			data.endAt,
			room.openingHours as Schedule,
		);

		if (!openingHoursCheck.isValid) {
			throw new Error(`Réservation impossible: ${openingHoursCheck.reason}`);
		}

		const conflicting = await db
			.select()
			.from(roomReservations)
			.where(
				and(
					eq(roomReservations.roomId, data.roomId),
					or(
						// Début dans la plage existante
						//@ts-ignore
						and(
							//@ts-ignore
							gt(data.startAt, roomReservations.startAt),
							//@ts-ignore
							lt(data.startAt, roomReservations.endAt),
						),
						// Fin dans la plage existante
						//@ts-ignore
						and(
							//@ts-ignore
							gt(data.endAt, roomReservations.startAt),
							//@ts-ignore
							lt(data.endAt, roomReservations.endAt),
						),
						// La nouvelle réservation englobe une existante
						//@ts-ignore
						and(
							//@ts-ignore
							lt(data.startAt, roomReservations.startAt),
							//@ts-ignore
							gt(data.endAt, roomReservations.endAt),
						),
						// Identique
						and(
							//@ts-ignore
							eq(data.startAt, roomReservations.startAt),
							//@ts-ignore
							eq(data.endAt, roomReservations.endAt),
						),
					),
				),
			);

		if (conflicting.length > 0) {
			return null; // indique qu’il y a un conflit
		}

		const [created] = await db
			.insert(roomReservations)
			.values(data)
			.returning();
		return created;
	},

	getAll: async (): Promise<SelectRoomReservation[]> => {
		return await db.select().from(roomReservations);
	},

	getPaginatedByRoomAndDateRange: async (
		roomId: string,
		startDate: Date,
		endDate: Date,
	): Promise<{
		data: SelectRoomReservation[];
		total: number;
	}> => {
		const [data, total] = await Promise.all([
			db
				.select()
				.from(roomReservations)
				.where(
					and(
						eq(roomReservations.roomId, roomId),
						gt(roomReservations.startAt, startDate),
						lt(roomReservations.endAt, endDate),
					),
				)
				.orderBy(roomReservations.startAt),
			db
				.select({ count: sql<number>`count(${roomReservations.id})` })
				.from(roomReservations)
				.where(
					and(
						eq(roomReservations.roomId, roomId),
						gt(roomReservations.startAt, startDate),
						lt(roomReservations.endAt, endDate),
					),
				),
		]);
		return {
			data,
			total: total[0].count,
		};
	},

	getById: async (id: string): Promise<SelectRoomReservation | undefined> => {
		const [res] = await db
			.select()
			.from(roomReservations)
			.where(eq(roomReservations.id, id));
		return res;
	},

	getByRoomId: async (roomId: string): Promise<SelectRoomReservation[]> => {
		return await db
			.select()
			.from(roomReservations)
			.where(eq(roomReservations.roomId, roomId));
	},

	update: async (
		id: string,
		data: Partial<InsertRoomReservation>,
	): Promise<SelectRoomReservation | "conflict" | "not_found"> => {
		const [current] = await db
			.select()
			.from(roomReservations)
			.where(eq(roomReservations.id, id));
		if (!current) return "not_found";

		const startAt = data.startAt ?? current.startAt;
		const endAt = data.endAt ?? current.endAt;
		const roomId = data.roomId ?? current.roomId;

		const room = await roomsService.getById(roomId);
		if (!room) {
			throw new Error("Room not found");
		}

		const openingHoursCheck = isWithinOpeningHours(
			startAt,
			endAt,
			room.openingHours as Schedule,
		);

		if (!openingHoursCheck.isValid) {
			throw new Error(`Mise à jour impossible: ${openingHoursCheck.reason}`);
		}

		const conflicting = await db
			.select()
			.from(roomReservations)
			.where(
				and(
					eq(roomReservations.roomId, roomId),
					ne(roomReservations.id, id), // Exclure la réservation actuelle
					or(
						and(
							//@ts-ignore
							gt(startAt, roomReservations.startAt),
							//@ts-ignore
							lt(startAt, roomReservations.endAt),
						),
						and(
							//@ts-ignore
							gt(endAt, roomReservations.startAt),
							//@ts-ignore
							lt(endAt, roomReservations.endAt),
						),
						and(
							//@ts-ignore
							lt(startAt, roomReservations.startAt),
							//@ts-ignore
							gt(endAt, roomReservations.endAt),
						),
						and(
							//@ts-ignore
							eq(startAt, roomReservations.startAt),
							//@ts-ignore
							eq(endAt, roomReservations.endAt),
						),
					),
				),
			);

		if (conflicting.length > 0) {
			return "conflict";
		}

		const [updated] = await db
			.update(roomReservations)
			.set(data)
			.where(eq(roomReservations.id, id))
			.returning();

		return updated;
	},

	delete: async (id: string): Promise<void> => {
		await db.delete(roomReservations).where(eq(roomReservations.id, id));
	},
};
