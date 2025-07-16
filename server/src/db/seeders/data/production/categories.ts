import type { db } from "@/db/index.js";
import {
	type InsertCategory,
	type SelectCategory,
	type SelectSection,
	categories,
} from "../../../schema.js";

const createCategory = (
	sectionId: string,
	name: string,
	description: string,
	ageMin?: number,
	ageMax?: number,
): InsertCategory => ({
	sectionId,
	name,
	description,
	ageMin,
	ageMax,
	isActive: true,
});

export async function seedCategories(
	database: typeof db,
	sections: SelectSection[],
): Promise<SelectCategory[]> {
	const categoriesData: InsertCategory[] = [];

	// Football categories
	const footballSection = sections.find((s) => s.name === "Football");
	if (footballSection) {
		categoriesData.push(
			createCategory(
				footballSection.id,
				"U6-U8 Baby Foot",
				"Éveil footballistique pour les plus petits",
				5,
				8,
			),
			createCategory(
				footballSection.id,
				"U10-U12 École de Football",
				"Apprentissage des bases du football",
				9,
				12,
			),
			createCategory(
				footballSection.id,
				"U15 Cadets",
				"Formation football niveau intermédiaire",
				13,
				15,
			),
			createCategory(
				footballSection.id,
				"U18 Juniors",
				"Football compétition jeunes",
				16,
				18,
			),
			createCategory(
				footballSection.id,
				"Seniors",
				"Équipe première et réserve",
				18,
				35,
			),
			createCategory(
				footballSection.id,
				"Vétérans",
				"Football loisir et convivialité",
				35,
				undefined,
			),
		);
	}

	// Basketball categories
	const basketSection = sections.find((s) => s.name === "Basketball");
	if (basketSection) {
		categoriesData.push(
			createCategory(
				basketSection.id,
				"Baby Basket",
				"Initiation basket pour enfants",
				6,
				9,
			),
			createCategory(
				basketSection.id,
				"Poussins",
				"Apprentissage fondamentaux",
				10,
				12,
			),
			createCategory(
				basketSection.id,
				"Benjamins",
				"Perfectionnement technique",
				13,
				15,
			),
			createCategory(basketSection.id, "Juniors", "Compétition jeunes", 16, 18),
			createCategory(
				basketSection.id,
				"Seniors",
				"Équipes compétitives adultes",
				18,
				undefined,
			),
			createCategory(
				basketSection.id,
				"Loisir",
				"Basketball détente tous niveaux",
				16,
				undefined,
			),
		);
	}

	// Tennis categories
	const tennisSection = sections.find((s) => s.name === "Tennis");
	if (tennisSection) {
		categoriesData.push(
			createCategory(
				tennisSection.id,
				"Mini-Tennis",
				"Tennis adapté aux enfants",
				4,
				7,
			),
			createCategory(
				tennisSection.id,
				"École de Tennis",
				"Cours collectifs jeunes",
				8,
				17,
			),
			createCategory(
				tennisSection.id,
				"Compétition Jeunes",
				"Tennis de compétition",
				10,
				18,
			),
			createCategory(
				tennisSection.id,
				"Adultes Débutants",
				"Initiation tennis adultes",
				18,
				undefined,
			),
			createCategory(
				tennisSection.id,
				"Adultes Perfectionnement",
				"Amélioration technique",
				18,
				undefined,
			),
			createCategory(
				tennisSection.id,
				"Compétition Adultes",
				"Tennis de compétition",
				18,
				undefined,
			),
		);
	}

	// Natation categories
	const natationSection = sections.find((s) => s.name === "Natation");
	if (natationSection) {
		categoriesData.push(
			createCategory(
				natationSection.id,
				"Jardin Aquatique",
				"Éveil aquatique",
				3,
				6,
			),
			createCategory(
				natationSection.id,
				"École de Nage",
				"Apprentissage des nages",
				7,
				12,
			),
			createCategory(
				natationSection.id,
				"Perfectionnement",
				"Technique et endurance",
				13,
				17,
			),
			createCategory(
				natationSection.id,
				"Compétition",
				"Natation sportive",
				10,
				undefined,
			),
			createCategory(
				natationSection.id,
				"Aqua-Fitness",
				"Fitness aquatique",
				16,
				undefined,
			),
			createCategory(
				natationSection.id,
				"Masters",
				"Natation adultes loisir",
				25,
				undefined,
			),
		);
	}

	// Handball categories
	const handballSection = sections.find((s) => s.name === "Handball");
	if (handballSection) {
		categoriesData.push(
			createCategory(
				handballSection.id,
				"Mini-Hand",
				"Initiation handball",
				6,
				9,
			),
			createCategory(handballSection.id, "U13", "Formation jeunes", 10, 13),
			createCategory(handballSection.id, "U15", "Perfectionnement", 14, 15),
			createCategory(handballSection.id, "U18", "Compétition jeunes", 16, 18),
			createCategory(
				handballSection.id,
				"Seniors Masculins",
				"Équipe première hommes",
				18,
				undefined,
			),
			createCategory(
				handballSection.id,
				"Seniors Féminines",
				"Équipe première femmes",
				18,
				undefined,
			),
		);
	}

	// Volleyball categories
	const volleySection = sections.find((s) => s.name === "Volleyball");
	if (volleySection) {
		categoriesData.push(
			createCategory(
				volleySection.id,
				"Mini-Volley",
				"Découverte du volleyball",
				8,
				12,
			),
			createCategory(
				volleySection.id,
				"Jeunes",
				"Formation volleyball",
				13,
				18,
			),
			createCategory(
				volleySection.id,
				"Seniors",
				"Compétition adultes",
				18,
				undefined,
			),
			createCategory(
				volleySection.id,
				"Loisir",
				"Volleyball détente",
				16,
				undefined,
			),
			createCategory(
				volleySection.id,
				"Beach Volley",
				"Volleyball de plage",
				14,
				undefined,
			),
		);
	}

	// Musculation & Fitness categories
	const fitnessSection = sections.find(
		(s) => s.name === "Musculation & Fitness",
	);
	if (fitnessSection) {
		categoriesData.push(
			createCategory(
				fitnessSection.id,
				"Musculation Libre",
				"Accès libre salle musculation",
				16,
				undefined,
			),
			createCategory(
				fitnessSection.id,
				"Cours Collectifs",
				"Fitness en groupe",
				16,
				undefined,
			),
			createCategory(
				fitnessSection.id,
				"Cross Training",
				"Entraînement fonctionnel",
				18,
				undefined,
			),
			createCategory(
				fitnessSection.id,
				"Préparation Physique",
				"Prépa pour autres sports",
				14,
				undefined,
			),
		);
	}

	// Danse categories
	const danseSection = sections.find((s) => s.name === "Danse");
	if (danseSection) {
		categoriesData.push(
			createCategory(
				danseSection.id,
				"Éveil Danse",
				"Découverte de la danse",
				4,
				6,
			),
			createCategory(
				danseSection.id,
				"Danse Classique",
				"Ballet classique",
				7,
				undefined,
			),
			createCategory(
				danseSection.id,
				"Danse Moderne",
				"Danse contemporaine",
				10,
				undefined,
			),
			createCategory(
				danseSection.id,
				"Hip-Hop",
				"Danse urbaine",
				12,
				undefined,
			),
			createCategory(
				danseSection.id,
				"Danse de Salon",
				"Danses de couple",
				16,
				undefined,
			),
		);
	}

	// Arts Martiaux categories
	const artsMartiaux = sections.find((s) => s.name === "Arts Martiaux");
	if (artsMartiaux) {
		categoriesData.push(
			createCategory(
				artsMartiaux.id,
				"Judo Enfants",
				"Judo pour les jeunes",
				6,
				12,
			),
			createCategory(
				artsMartiaux.id,
				"Judo Ados",
				"Judo perfectionnement",
				13,
				17,
			),
			createCategory(
				artsMartiaux.id,
				"Judo Adultes",
				"Judo tous niveaux",
				18,
				undefined,
			),
			createCategory(
				artsMartiaux.id,
				"Karaté",
				"Art martial japonais",
				8,
				undefined,
			),
			createCategory(
				artsMartiaux.id,
				"Self-Défense",
				"Techniques de défense",
				16,
				undefined,
			),
		);
	}

	// Athlétisme categories
	const athletismeSection = sections.find((s) => s.name === "Athlétisme");
	if (athletismeSection) {
		categoriesData.push(
			createCategory(
				athletismeSection.id,
				"École d'Athlé",
				"Initiation athlétisme",
				7,
				12,
			),
			createCategory(
				athletismeSection.id,
				"Jeunes Athlètes",
				"Formation compétition",
				13,
				17,
			),
			createCategory(
				athletismeSection.id,
				"Seniors",
				"Athlétisme adultes",
				18,
				undefined,
			),
			createCategory(
				athletismeSection.id,
				"Masters",
				"Athlétisme vétérans",
				35,
				undefined,
			),
			createCategory(
				athletismeSection.id,
				"Course à Pied",
				"Running et trail",
				16,
				undefined,
			),
		);
	}

	console.log(`Insertion of ${categoriesData.length} categories...`);

	try {
		const insertedCategories = await database
			.insert(categories)
			.values(categoriesData)
			.returning();

		console.log(`${insertedCategories.length} categories created successfully`);
		return insertedCategories;
	} catch (error) {
		console.error("Error during the insertion of categories:", error);
		throw error;
	}
}
