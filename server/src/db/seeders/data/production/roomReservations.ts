import type { db } from "@/db/index.js";
import { eq } from "drizzle-orm";
import {
	type InsertRoomReservation,
	type SelectRoom,
	roomReservations,
	users,
} from "../../../schema.js";
import type { WeekSchedule } from "../../utils/openingHours.js";

const activityTitles = {
	natation: [
		"Entraînement natation libre",
		"Cours de natation adultes",
		"Cours de natation enfants",
		"Aqua-fitness",
		"Nage avec palmes",
		"Compétition de natation",
		"Stage de perfectionnement",
	],
	football: [
		"Entraînement équipe senior",
		"Match de championnat",
		"Entraînement jeunes",
		"Stage de foot",
		"Tournoi inter-clubs",
		"Séance technique",
		"Match amical",
	],
	basketball: [
		"Entraînement basket senior",
		"Match de championnat",
		"Cours de basket jeunes",
		"Tournoi 3x3",
		"Stage basket",
		"Séance tirs",
		"Match amical",
	],
	tennis: [
		"Cours de tennis particulier",
		"Entraînement club",
		"Stage tennis enfants",
		"Tournoi interne",
		"Match inter-clubs",
		"Cours collectif",
		"Compétition régionale",
	],
	musculation: [
		"Séance musculation libre",
		"Cours de fitness",
		"Entraînement personnel",
		"Stage musculation",
		"Cours collectif",
		"Préparation physique",
		"Remise en forme",
	],
	"multi-sport": [
		"Activité multisport",
		"Cours collectif",
		"Entraînement libre",
		"Stage multisport",
		"Activité familiale",
		"Sport adapté",
		"Cours découverte",
	],
};

function isRoomOpen(room: SelectRoom, date: Date): boolean {
	const dayNames = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	] as const;
	const dayName = dayNames[date.getDay()];

	const schedule = room.openingHours as WeekSchedule;
	const daySchedule = schedule[dayName];

	if (daySchedule.closed) {
		return false;
	}

	if (!daySchedule.open || !daySchedule.close) {
		return false;
	}

	const currentTime = date.getHours() * 60 + date.getMinutes();
	const [openHour, openMinute] = daySchedule.open.split(":").map(Number);
	const [closeHour, closeMinute] = daySchedule.close.split(":").map(Number);

	const openTime = openHour * 60 + openMinute;
	const closeTime = closeHour * 60 + closeMinute;

	return currentTime >= openTime && currentTime < closeTime;
}

function getRoomOpeningHours(
	room: SelectRoom,
	date: Date,
): { open: string; close: string } | null {
	const dayNames = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	] as const;
	const dayName = dayNames[date.getDay()];

	const schedule = room.openingHours as WeekSchedule;
	const daySchedule = schedule[dayName];

	if (daySchedule.closed || !daySchedule.open || !daySchedule.close) {
		return null;
	}

	return {
		open: daySchedule.open,
		close: daySchedule.close,
	};
}

function generateValidStartTime(room: SelectRoom, date: Date): Date | null {
	const openingHours = getRoomOpeningHours(room, date);
	if (!openingHours) {
		return null;
	}

	const [openHour, openMinute] = openingHours.open.split(":").map(Number);
	const [closeHour, closeMinute] = openingHours.close.split(":").map(Number);

	// Calculer la durée d'ouverture en minutes
	const openTimeMinutes = openHour * 60 + openMinute;
	const closeTimeMinutes = closeHour * 60 + closeMinute;
	const durationMinutes = closeTimeMinutes - openTimeMinutes;

	// Laisser au minimum 1h avant la fermeture pour une réservation
	if (durationMinutes < 60) {
		return null;
	}

	// Générer une heure aléatoire dans la plage (en laissant 1h avant la fermeture)
	const randomOffsetMinutes = Math.floor(
		Math.random() * (durationMinutes - 59),
	);
	const startTimeMinutes = openTimeMinutes + randomOffsetMinutes;

	const startHour = Math.floor(startTimeMinutes / 60);
	const startMinute = startTimeMinutes % 60;

	const startDate = new Date(date);
	startDate.setHours(startHour, startMinute, 0, 0);

	return startDate;
}

function generateValidDuration(room: SelectRoom, startDate: Date): number {
	const openingHours = getRoomOpeningHours(room, startDate);
	if (!openingHours) {
		return 60; // 1h par défaut
	}

	const [closeHour, closeMinute] = openingHours.close.split(":").map(Number);
	const closeTime = new Date(startDate);
	closeTime.setHours(closeHour, closeMinute, 0, 0);

	const maxDurationMs = closeTime.getTime() - startDate.getTime();
	const maxDurationMinutes = Math.floor(maxDurationMs / (1000 * 60));

	const possibleDurations = [60, 90, 120, 180].filter(
		(duration) => duration <= maxDurationMinutes,
	);

	if (possibleDurations.length === 0) {
		return maxDurationMinutes > 0 ? Math.min(60, maxDurationMinutes) : 0;
	}

	return possibleDurations[
		Math.floor(Math.random() * possibleDurations.length)
	];
}

function generateRoomReservationTitle(room: SelectRoom): string {
	const sportType = room.sportType.toLowerCase();
	const titles =
		activityTitles[sportType as keyof typeof activityTitles] ||
		activityTitles["multi-sport"];
	const randomTitle = titles[Math.floor(Math.random() * titles.length)];
	return `${randomTitle} - ${room.name}`;
}

export async function seedRoomReservations(
	database: typeof db,
	rooms: SelectRoom[],
): Promise<void> {
	const existingUsers = await database
		.select()
		.from(users)
		.where(eq(users.role, "admin"))
		.limit(3);

	if (existingUsers.length === 0) {
		console.log(
			"No users found to assign as bookers. Skipping room reservation creation.",
		);
		return;
	}

	const roomReservationsData: InsertRoomReservation[] = [];
	const today = new Date();
	const statuses = ["pending", "confirmed", "cancelled"] as const;

	// Générer des réservations de salle pour les 21 prochains jours
	for (let dayOffset = 1; dayOffset <= 21; dayOffset++) {
		const currentDate = new Date(today);
		currentDate.setDate(today.getDate() + dayOffset);

		// Pour chaque salle, générer 0-3 réservations par jour
		for (const room of rooms) {
			const roomReservationCount = Math.floor(Math.random() * 4); // 0 à 3 réservations

			const dayRoomReservations: { start: Date; end: Date }[] = [];

			function hasOverlap(
				startA: Date,
				endA: Date,
				roomReservations: { start: Date; end: Date }[],
			): boolean {
				return roomReservations.some(
					(existing) => startA < existing.end && endA > existing.start,
				);
			}

			for (let i = 0; i < roomReservationCount; i++) {
				let attempts = 0;
				let validRoomReservation = false;

				while (!validRoomReservation && attempts < 10) {
					attempts++;

					const startDate = generateValidStartTime(room, currentDate);
					if (!startDate) {
						break; // Salle fermée ce jour-là
					}

					const durationMinutes = generateValidDuration(room, startDate);
					const endDate = new Date(startDate);
					endDate.setMinutes(startDate.getMinutes() + durationMinutes);

					// Vérifier qu'il n'y a pas de conflit avec les autres réservations du jour
					const hasConflict = hasOverlap(
						startDate,
						endDate,
						dayRoomReservations,
					);

					if (!hasConflict) {
						dayRoomReservations.push({ start: startDate, end: endDate });

						const randomUser =
							existingUsers[Math.floor(Math.random() * existingUsers.length)];
						const randomStatus =
							statuses[Math.floor(Math.random() * statuses.length)];

						roomReservationsData.push({
							title: generateRoomReservationTitle(room),
							startAt: startDate,
							endAt: endDate,
							roomId: room.id,
							bookerId: randomUser.id,
							status: randomStatus,
						});

						validRoomReservation = true;
					}
				}
			}
		}
	}

	console.log(
		`Insertion of ${roomReservationsData.length} room reservations...`,
	);

	try {
		if (roomReservationsData.length > 0) {
			const insertedRoomReservations = await database
				.insert(roomReservations)
				.values(roomReservationsData)
				.returning();

			console.log(
				`${insertedRoomReservations.length} room reservations created successfully`,
			);

			const statusCounts = insertedRoomReservations.reduce(
				(acc, roomReservation) => {
					acc[roomReservation.status] = (acc[roomReservation.status] || 0) + 1;
					return acc;
				},
				{} as Record<string, number>,
			);

			console.log("Status distribution:", statusCounts);
		} else {
			console.log(
				"No room reservations generated (rooms closed or incompatible schedules)",
			);
		}
	} catch (error) {
		console.error("Error during the insertion of room reservations:", error);
		throw error;
	}
}
