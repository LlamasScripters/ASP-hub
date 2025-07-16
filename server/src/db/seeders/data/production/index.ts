import { db } from "@/db/index.js";
import { seedArticleTags } from "./articleTags.js";
import { seedArticles } from "./articles.js";
import { seedCategories } from "./categories.js";
import { seedClubs } from "./clubs.js";
import { seedComplexes } from "./complexes.js";
import { seedMinibusReservations } from "./minibusReservations.js";
import { seedMinibuses } from "./minibuses.js";
import { seedReactions } from "./reactions.js";
import { seedRoomReservations } from "./roomReservations.js";
import { seedRooms } from "./rooms.js";
import { seedSections } from "./sections.js";
import { seedSessionsSport } from "./sessionsSport.js";
import { seedTags } from "./tags.js";
import { seedUsers } from "./users.js";

export async function seedDatabase() {
	console.log("Begin of database seeding...");

	try {
		// Seeding dans l'ordre des dépendances
		console.log("Seeding Users...");
		const users = await seedUsers(db);

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

		// Blog-related seeding
		console.log("Seeding Blog Reactions...");
		await seedReactions(db);

		console.log("Seeding Blog Tags...");
		const tags = await seedTags(db);

		console.log("Seeding Blog Articles...");
		const articles = await seedArticles(db, users);

		console.log("Seeding Article Tags...");
		await seedArticleTags(db, articles, tags);

		console.log("All seeders have been executed successfully!");
	} catch (error) {
		console.error("Error during seeding:", error);
		throw error;
	}
}
