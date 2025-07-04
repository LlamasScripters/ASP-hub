import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { type InsertClub, type SelectClub, clubs } from "../../schema.js";

const createClub = (
	name: string,
	description: string,
	address: string,
	phone: string,
	email: string,
	website: string,
): InsertClub => ({
	name,
	description,
	address,
	phone,
	email,
	website,
	logo: null,
	isActive: true,
});

const clubsData: InsertClub[] = [
	createClub(
		"Association Sportive de Pierrefitte",
		"Association sportive polyvalente offrant de nombreuses activités sportives pour tous les âges et tous les niveaux.",
		"1 Avenue Pierre de Coubertin, 93380 Pierrefitte-sur-Seine",
		"01 48 26 75 00",
		"contact@asp-pierrefitte.fr",
		"https://www.aspierrefitte.com/",
	),
];

export async function seedClubs(db: NodePgDatabase): Promise<SelectClub[]> {
	console.log(`Insertion of ${clubsData.length} clubs...`);

	try {
		const insertedClubs = await db.insert(clubs).values(clubsData).returning();

		console.log(`${insertedClubs.length} clubs created successfully`);
		return insertedClubs;
	} catch (error) {
		console.error("Error during the insertion of clubs:", error);
		throw error;
	}
}
