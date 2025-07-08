import { sql } from "drizzle-orm";
import type { db } from "../index.js";
import {
	categories,
	clubs,
	complexes,
	minibusReservations,
	minibuses,
	roomReservations,
	rooms,
	sections,
	sessionsSport,
	//   sessionParticipants,
	//   users
} from "../schema.js";

export async function resetAllTables(database: typeof db) {
	console.log(
		"Deleting all data from tables in descending order of dependencies...",
	);

	try {
		// Ordre inverse des dépendances pour éviter les erreurs de clés étrangères
		await database.delete(roomReservations);
		console.log("Room Reservations deleted");

		await database.delete(minibusReservations);
		console.log("Minibus Reservations deleted");

		await database.delete(sessionsSport);
		console.log("Sports sessions deleted");

		await database.delete(categories);
		console.log("Categories deleted");

		await database.delete(sections);
		console.log("Sections deleted");

		await database.delete(clubs);
		console.log("Clubs deleted");

		// await db.delete(sessionParticipants);
		// console.log("Session participants deleted");

		await database.delete(minibuses);
		console.log("Minibuses deleted");

		await database.delete(rooms);
		console.log("Rooms deleted");

		await database.delete(complexes);
		console.log("Complexes deleted");

		// await db.delete(users);
		// console.log("Users deleted");

		// Reset des séquences PostgreSQL
		await database.execute(
			sql`SELECT setval(pg_get_serial_sequence('complexes', 'id'), 1, false)`,
		);
		await database.execute(
			sql`SELECT setval(pg_get_serial_sequence('rooms', 'id'), 1, false)`,
		);
		await database.execute(
			sql`SELECT setval(pg_get_serial_sequence('room_reservations', 'id'), 1, false)`,
		);
		await database.execute(
			sql`SELECT setval(pg_get_serial_sequence('clubs', 'id'), 1, false)`,
		);
		await database.execute(
			sql`SELECT setval(pg_get_serial_sequence('sections', 'id'), 1, false)`,
		);
		await database.execute(
			sql`SELECT setval(pg_get_serial_sequence('categories', 'id'), 1, false)`,
		);
		await database.execute(
			sql`SELECT setval(pg_get_serial_sequence('sessions_sport', 'id'), 1, false)`,
		);
	} catch (error) {
		console.error("Error during the reset:", error);
		throw error;
	}
}
