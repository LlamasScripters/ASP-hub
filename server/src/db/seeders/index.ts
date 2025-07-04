import { db } from "../index.js";
import { seedCategories } from "./data/categories.js";
import { seedClubs } from "./data/clubs.js";
import { seedComplexes } from "./data/complexes.js";
import { seedMinibusReservations } from "./data/minibusReservations.js";
import { seedMinibuses } from "./data/minibuses.js";
import { seedRoomReservations } from "./data/roomReservations.js";
import { seedRooms } from "./data/rooms.js";
import { seedSections } from "./data/sections.js";
import { seedSessionsSport } from "./data/sessionsSport.js";
import { resetAllTables } from "./reset.js";

export async function seedDatabase() {
	console.log("Begin of database seeding...");

	try {
		// Seeding dans l'ordre des dépendances
		console.log("Seeding Complexes...");
		const complexes = await seedComplexes(db);

		console.log("Seeding Rooms...");
		const rooms = await seedRooms(db, complexes);

		console.log("Seeding Room Reservations...");
		await seedRoomReservations(db, rooms);

		console.log("Seeding Minibuses...");
		const minibuses = await seedMinibuses(db);

		console.log("Seeding Minibus Reservations...");
		await seedMinibusReservations(db, minibuses);

		console.log("Seeding Clubs...");
		const clubs = await seedClubs(db);

		console.log("Seeding Sections...");
		const sections = await seedSections(db, clubs);

		console.log("Seeding Categories...");
		const categories = await seedCategories(db, sections);

		console.log("Seeding Sports Sessions...");
		await seedSessionsSport(db, categories);

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
