import { db } from "../index.js";
import { seedComplexes } from "./data/complexes.js";
import { seedReservations } from "./data/reservations.js";
import { seedRooms } from "./data/rooms.js";
import { resetAllTables } from "./reset.js";

export async function seedDatabase() {
	console.log("Begin of database seeding...");

	try {
		// Seeding dans l'ordre des dépendances
		console.log("Seeding Complexes...");
		const complexes = await seedComplexes(db);

		console.log("Seeding Rooms...");
		const rooms = await seedRooms(db, complexes);

		console.log("Seeding Reservations...");
		await seedReservations(db, rooms);

		console.log("All seeders have been executed successfully!");
	} catch (error) {
		console.error("Error during seeding:", error);
		throw error;
	}
}

export async function resetDatabase() {
	console.log("Begin of data deletion...");

	try {
		await resetAllTables(db);
		console.log("All tables have been emptied!");
	} catch (error) {
		console.error("Error during the reset:", error);
		throw error;
	}
}
