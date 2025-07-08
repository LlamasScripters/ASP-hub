import type { db } from "@/db/index.js";
import { eq } from "drizzle-orm";
import {
	type InsertMinibusReservation,
	type SelectMinibus,
	minibusReservations,
	users,
} from "../../schema.js";
import type { WeekSchedule } from "../utils/openingHours.js";

const activityTitles = [
	"Déplacement tournoi de football",
	"Déplacement tournoi de basketball",
	"Déplacement tournoi de tennis",
	"Déplacement tournoi de natation",
	"Déplacement tournoi de handball",
	"Déplacement tournoi de volley-ball",
	"Déplacement tournoi de badminton",
	"Déplacement tournoi de rugby",
	"Déplacement tournoi de pétanque",
	"Déplacement tournoi de musculation",
	"Déplacement tournoi de boxe",
	"Déplacement tournoi de judo",
	"Déplacement tournoi de karaté",
	"Déplacement tournoi de danse",
	"Déplacement match de football",
	"Déplacement match de basketball",
	"Déplacement match de tennis",
	"Déplacement match de natation",
	"Déplacement match de handball",
];

function isMinibusOpen(minibus: SelectMinibus, date: Date): boolean {
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

	const schedule = minibus.disponibility as WeekSchedule;
	const daySchedule = schedule[dayName];

	if (!daySchedule.available) {
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

function getMinibusDisponibility(
	minibus: SelectMinibus,
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

	const schedule = minibus.disponibility as WeekSchedule;
	const daySchedule = schedule[dayName];

	if (!daySchedule.available || !daySchedule.open || !daySchedule.close) {
		return null;
	}

	return {
		open: daySchedule.open,
		close: daySchedule.close,
	};
}

function generateValidStartTime(
	minibus: SelectMinibus,
	date: Date,
): Date | null {
	const disponibility = getMinibusDisponibility(minibus, date);
	if (!disponibility) {
		return null;
	}

	const [openHour, openMinute] = disponibility.open.split(":").map(Number);
	const [closeHour, closeMinute] = disponibility.close.split(":").map(Number);

	// Calculer la durée d'ouverture en minutes
	const openTimeMinutes = openHour * 60 + openMinute;
	const closeTimeMinutes = closeHour * 60 + closeMinute;
	const durationMinutes = closeTimeMinutes - openTimeMinutes;

	// Laisser au minimum 1h avant la fermeture pour une réservation
	if (durationMinutes < 60) {
		return null;
	}

	// Générer une heure aléatoire dans la plage (en laissant 1h avant la fermeture)
	const maxStartTimeMinutes = closeTimeMinutes - 60; // Au moins 1h avant la fermeture
	const availableTimeWindow = maxStartTimeMinutes - openTimeMinutes;

	if (availableTimeWindow <= 0) {
		return null;
	}

	const randomOffsetMinutes = Math.floor(Math.random() * availableTimeWindow);
	const startTimeMinutes = openTimeMinutes + randomOffsetMinutes;

	const startHour = Math.floor(startTimeMinutes / 60);
	const startMinute = startTimeMinutes % 60;

	const startDate = new Date(date);
	startDate.setHours(startHour, startMinute, 0, 0);

	return startDate;
}

function generateValidDuration(
	minibus: SelectMinibus,
	startDate: Date,
): number {
	const disponibility = getMinibusDisponibility(minibus, startDate);
	if (!disponibility) {
		return 60; // 1h par défaut
	}

	const [closeHour, closeMinute] = disponibility.close.split(":").map(Number);
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

function generateMinibusReservationTitle(minibus: SelectMinibus): string {
	const randomIndex = Math.floor(Math.random() * activityTitles.length);
	return `${activityTitles[randomIndex]} - ${minibus.name}`;
}

export async function seedMinibusReservations(
	database: typeof db,
	minibuses: SelectMinibus[],
): Promise<void> {
	const existingUsers = await database
		.select()
		.from(users)
		.where(eq(users.role, "admin"))
		.limit(3);

	if (existingUsers.length === 0) {
		console.log(
			"No users found to assign as bookers. Skipping minibus reservation creation.",
		);
		return;
	}

	const minibusReservationsData: InsertMinibusReservation[] = [];
	const today = new Date();
	const statuses = ["pending", "confirmed", "cancelled"] as const;

	// Générer des réservations de minibus pour les 21 prochains jours
	for (let dayOffset = 1; dayOffset <= 21; dayOffset++) {
		const currentDate = new Date(today);
		currentDate.setDate(today.getDate() + dayOffset);

		// Pour chaque minibus, générer 0-3 réservations par jour
		for (const minibus of minibuses) {
			// Vérifier d'abord si le minibus est disponible ce jour-là
			const dayNames = [
				"sunday",
				"monday",
				"tuesday",
				"wednesday",
				"thursday",
				"friday",
				"saturday",
			] as const;
			const dayName = dayNames[currentDate.getDay()];
			const schedule = minibus.disponibility as WeekSchedule;
			const daySchedule = schedule[dayName];

			// Si le minibus n'est pas disponible ce jour-là, passer au suivant
			if (!daySchedule.available || !daySchedule.open || !daySchedule.close) {
				continue;
			}

			const minibusReservationCount = Math.floor(Math.random() * 4); // 0 à 3 réservations

			const dayMinibusReservations: { start: Date; end: Date }[] = [];

			function hasOverlap(
				startA: Date,
				endA: Date,
				minibusReservations: { start: Date; end: Date }[],
			): boolean {
				return minibusReservations.some(
					(existing) => startA < existing.end && endA > existing.start,
				);
			}

			for (let i = 0; i < minibusReservationCount; i++) {
				let attempts = 0;
				let validMinibusReservation = false;

				while (!validMinibusReservation && attempts < 10) {
					attempts++;

					const startDate = generateValidStartTime(minibus, currentDate);
					if (!startDate) {
						console.log(
							`Impossible de générer une heure de début valide pour ${minibus.name} le ${currentDate.toDateString()}`,
						);
						break; // Minibus indisponible ce jour-là ou pas assez de temps
					}

					const durationMinutes = generateValidDuration(minibus, startDate);
					if (durationMinutes <= 0) {
						console.log(
							`Durée invalide générée pour ${minibus.name} le ${currentDate.toDateString()}`,
						);
						break;
					}

					const endDate = new Date(startDate);
					endDate.setMinutes(startDate.getMinutes() + durationMinutes);

					// Vérifier que la réservation reste dans les heures d'ouverture
					const disponibility = getMinibusDisponibility(minibus, currentDate);
					if (disponibility) {
						const [closeHour, closeMinute] = disponibility.close
							.split(":")
							.map(Number);
						const closeTime = new Date(currentDate);
						closeTime.setHours(closeHour, closeMinute, 0, 0);

						if (endDate > closeTime) {
							console.log(
								`Réservation se termine après les heures d'ouverture pour ${minibus.name}`,
							);
							continue; // Essayer un autre créneau
						}
					}

					// Vérifier qu'il n'y a pas de conflit avec les autres réservations du jour
					const hasConflict = hasOverlap(
						startDate,
						endDate,
						dayMinibusReservations,
					);

					if (!hasConflict) {
						dayMinibusReservations.push({ start: startDate, end: endDate });

						const randomUser =
							existingUsers[Math.floor(Math.random() * existingUsers.length)];
						const randomStatus =
							statuses[Math.floor(Math.random() * statuses.length)];

						minibusReservationsData.push({
							title: generateMinibusReservationTitle(minibus),
							startAt: startDate,
							endAt: endDate,
							minibusId: minibus.id,
							bookerId: randomUser.id,
							status: randomStatus,
						});

						validMinibusReservation = true;
					}
				}

				if (!validMinibusReservation && attempts >= 10) {
					console.log(
						`Impossible de créer une réservation valide pour ${minibus.name} le ${currentDate.toDateString()} après ${attempts} tentatives`,
					);
				}
			}
		}
	}

	console.log(
		`Insertion of ${minibusReservationsData.length} minibus reservations...`,
	);

	if (minibusReservationsData.length > 0) {
		try {
			const insertedMinibusReservations = await database
				.insert(minibusReservations)
				.values(minibusReservationsData)
				.returning();

			console.log(
				`${insertedMinibusReservations.length} minibus reservations created successfully`,
			);

			const statusCounts = insertedMinibusReservations.reduce(
				(acc, minibusReservation) => {
					acc[minibusReservation.status] =
						(acc[minibusReservation.status] || 0) + 1;
					return acc;
				},
				{} as Record<string, number>,
			);

			console.log("Status distribution:", statusCounts);
		} catch (error) {
			console.error(
				"Error during the insertion of minibus reservations:",
				error,
			);
		}
	} else {
		console.log(
			"No minibus reservations generated (minibuses unavailable or incompatible schedules)",
		);
	}
}
