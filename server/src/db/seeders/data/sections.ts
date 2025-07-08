import type { db } from "@/db/index.js";
import {
	type InsertSection,
	type SelectClub,
	type SelectSection,
	sections,
} from "../../schema.js";

const createSection = (
	clubId: string,
	name: string,
	description: string,
	color: string,
): InsertSection => ({
	clubId,
	name,
	description,
	color,
	isActive: true,
});

export async function seedSections(
	database: typeof db,
	clubs: SelectClub[],
): Promise<SelectSection[]> {
	const mainClub = clubs[0]; // ASP Pierrefitte

	const sectionsData: InsertSection[] = [
		createSection(
			mainClub.id,
			"Football",
			"Section football avec équipes seniors, juniors et jeunes",
			"#22C55E", // Green
		),
		createSection(
			mainClub.id,
			"Basketball",
			"Section basketball pour tous les niveaux",
			"#F97316", // Orange
		),
		createSection(
			mainClub.id,
			"Tennis",
			"Section tennis avec cours individuels et collectifs",
			"#EAB308", // Yellow
		),
		createSection(
			mainClub.id,
			"Natation",
			"Section natation et activités aquatiques",
			"#3B82F6", // Blue
		),
		createSection(
			mainClub.id,
			"Handball",
			"Section handball compétitive et loisir",
			"#DC2626", // Red
		),
		createSection(
			mainClub.id,
			"Volleyball",
			"Section volleyball en salle et beach",
			"#A855F7", // Purple
		),
		createSection(
			mainClub.id,
			"Musculation & Fitness",
			"Section musculation et remise en forme",
			"#374151", // Gray
		),
		createSection(
			mainClub.id,
			"Danse",
			"Section danse moderne, classique et hip-hop",
			"#EC4899", // Pink
		),
		createSection(
			mainClub.id,
			"Arts Martiaux",
			"Section judo, karaté et self-défense",
			"#059669", // Emerald
		),
		createSection(
			mainClub.id,
			"Athlétisme",
			"Section athlétisme courses, sauts et lancers",
			"#7C3AED", // Violet
		),
	];

	console.log(`Insertion of ${sectionsData.length} sections...`);

	try {
		const insertedSections = await database
			.insert(sections)
			.values(sectionsData)
			.returning();

		console.log(`${insertedSections.length} sections created successfully`);
		return insertedSections;
	} catch (error) {
		console.error("Error during the insertion of sections:", error);
		throw error;
	}
}
