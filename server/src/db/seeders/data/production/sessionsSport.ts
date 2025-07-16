import type { db } from "@/db/index.js";
import { eq } from "drizzle-orm";
import {
	type InsertSessionSport,
	type SelectCategory,
	type SelectSessionSport,
	sessionsSport,
	users,
} from "../../../schema.js";

const sessionTitles = {
	"U6-U8 Baby Foot": [
		"Éveil footballistique",
		"Découverte du ballon",
		"Jeux avec ballon",
		"Coordination motrice",
	],
	"U10-U12 École de Football": [
		"Technique de base",
		"Passes et contrôles",
		"Conduite de balle",
		"Jeu à effectif réduit",
	],
	"U15 Cadets": [
		"Entraînement technique",
		"Tactique de base",
		"Match amical",
		"Préparation physique",
	],
	"U18 Juniors": [
		"Entraînement compétition",
		"Match championnat",
		"Séance tactique",
		"Condition physique",
	],
	Seniors: [
		"Entraînement équipe première",
		"Match championnat senior",
		"Préparation tactique",
		"Match amical",
	],
	Vétérans: ["Football loisir", "Match vétérans", "Entraînement convivial"],
	"Baby Basket": ["Initiation basket", "Jeux avec ballon", "Coordination"],
	Poussins: ["Apprentissage dribble", "Tirs au panier", "Mini-match"],
	Benjamins: [
		"Technique perfectionnement",
		"Tactique débutant",
		"Match benjamins",
	],
	Juniors: [
		"Entraînement compétition",
		"Match championnat",
		"Préparation physique",
	],
	"Mini-Tennis": [
		"Découverte tennis",
		"Coordination raquette",
		"Jeux tennis adapté",
	],
	"École de Tennis": [
		"Cours collectif tennis",
		"Technique coup droit",
		"Apprentissage service",
	],
	"Compétition Jeunes": [
		"Entraînement compétition",
		"Match tournoi",
		"Perfectionnement technique",
	],
	"Adultes Débutants": [
		"Initiation tennis adulte",
		"Bases du tennis",
		"Premier échange",
	],
	"Jardin Aquatique": [
		"Éveil aquatique",
		"Jeux dans l'eau",
		"Familiarisation eau",
	],
	"École de Nage": [
		"Apprentissage crawl",
		"Technique brasse",
		"Perfectionnement dos",
	],
	Compétition: ["Entraînement natation", "Compétition club", "Stage technique"],
	"Aqua-Fitness": [
		"Cours aqua-fitness",
		"Renforcement musculaire",
		"Cardio aquatique",
	],
	"Mini-Hand": ["Initiation handball", "Jeux de balle", "Coordination"],
	"Seniors Masculins": [
		"Entraînement handball",
		"Match championnat",
		"Préparation tactique",
	],
	"Seniors Féminines": [
		"Entraînement handball F",
		"Match championnat F",
		"Séance technique",
	],
	"Mini-Volley": ["Découverte volleyball", "Jeux filet bas", "Coordination"],
	"Beach Volley": [
		"Entraînement beach",
		"Tournoi beach volley",
		"Technique sable",
	],
	"Musculation Libre": [
		"Séance musculation",
		"Entraînement libre",
		"Programme personnalisé",
	],
	"Cours Collectifs": [
		"Cours fitness",
		"Renforcement musculaire",
		"Cardio training",
	],
	"Cross Training": [
		"WOD du jour",
		"Circuit training",
		"Entraînement fonctionnel",
	],
	"Éveil Danse": ["Découverte danse", "Expression corporelle", "Jeux dansés"],
	"Danse Classique": [
		"Cours ballet",
		"Technique classique",
		"Spectacle préparation",
	],
	"Hip-Hop": ["Cours hip-hop", "Chorégraphie urbaine", "Battle training"],
	"Judo Enfants": [
		"Cours judo enfants",
		"Apprentissage chutes",
		"Techniques de base",
	],
	"Judo Adultes": [
		"Entraînement judo",
		"Perfectionnement technique",
		"Préparation grade",
	],
	"Self-Défense": [
		"Cours self-défense",
		"Techniques protection",
		"Mise en situation",
	],
	"École d'Athlé": [
		"Initiation athlétisme",
		"Multi-activités",
		"Découverte disciplines",
	],
	"Course à Pied": ["Entraînement running", "Sortie longue", "Fractionné"],
};

function generateSessionTitle(categoryName: string): string {
	const titles = sessionTitles[categoryName as keyof typeof sessionTitles] || [
		"Entraînement",
		"Séance",
		"Cours",
	];
	const randomTitle = titles[Math.floor(Math.random() * titles.length)];
	return `${randomTitle} - ${categoryName}`;
}

function generateSessionType():
	| "entrainement"
	| "match"
	| "stage"
	| "competition"
	| "autre" {
	const types = [
		"entrainement",
		"match",
		"stage",
		"competition",
		"autre",
	] as const;
	const weights = [0.6, 0.2, 0.1, 0.08, 0.02]; // 60% entraînement, 20% match, etc.

	const random = Math.random();
	let cumulative = 0;

	for (let i = 0; i < types.length; i++) {
		cumulative += weights[i];
		if (random <= cumulative) {
			return types[i];
		}
	}

	return "entrainement";
}

function generateSessionDuration(): number {
	// Durées en minutes selon le type de session
	const durations = [60, 90, 120, 180];
	return durations[Math.floor(Math.random() * durations.length)];
}

function generateValidStartTime(): Date {
	const today = new Date();
	const futureDate = new Date(today);

	// Générer une date entre aujourd'hui et 30 jours dans le futur
	const daysToAdd = Math.floor(Math.random() * 30);
	futureDate.setDate(today.getDate() + daysToAdd);

	// Heures possibles: 8h à 20h
	const possibleHours = [8, 9, 10, 14, 15, 16, 17, 18, 19, 20];
	const hour = possibleHours[Math.floor(Math.random() * possibleHours.length)];

	// Minutes: 0 ou 30
	const minute = Math.random() < 0.5 ? 0 : 30;

	futureDate.setHours(hour, minute, 0, 0);

	return futureDate;
}

function generateLocation(): string {
	const locations = [
		"Gymnase Principal",
		"Salle Polyvalente",
		"Terrain de Football",
		"Piscine Olympique",
		"Salle de Musculation",
		"Terrains de Tennis",
		"Stade Municipal",
		"Dojo",
		"Salle de Danse",
		"Piste d'Athlétisme",
	];

	return locations[Math.floor(Math.random() * locations.length)];
}

export async function seedSessionsSport(
	database: typeof db,
	categories: SelectCategory[],
): Promise<SelectSessionSport[]> {
	// Récupérer quelques utilisateurs pour assigner comme coach/responsable
	const availableUsers = await database
		.select()
		.from(users)
		.where(eq(users.role, "admin"))
		.limit(5);

	if (availableUsers.length === 0) {
		console.log(
			"No users found to assign as coaches. Skipping sports sessions creation.",
		);
		return [];
	}

	const sessionsData: InsertSessionSport[] = [];

	// Générer 3-5 sessions par catégorie
	for (const category of categories) {
		const numberOfSessions = Math.floor(Math.random() * 3) + 3; // 3 à 5 sessions

		for (let i = 0; i < numberOfSessions; i++) {
			const startDate = generateValidStartTime();
			const duration = generateSessionDuration();
			const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

			const coach =
				availableUsers[Math.floor(Math.random() * availableUsers.length)];
			const responsible =
				availableUsers[Math.floor(Math.random() * availableUsers.length)];

			const sessionType = generateSessionType();
			const maxParticipants = Math.floor(Math.random() * 15) + 8; // 8 à 22 participants
			const currentParticipants = Math.floor(Math.random() * maxParticipants);

			sessionsData.push({
				categoryId: category.id,
				title: generateSessionTitle(category.name),
				description: `Session de ${category.name} - ${sessionType}`,
				type: sessionType,
				status: "planifie",
				startDate,
				endDate,
				location: generateLocation(),
				maxParticipants,
				currentParticipants,
				notes: sessionType === "match" ? "Prévoir équipements de match" : null,
				coachId: coach.id,
				responsibleId: responsible.id,
			});
		}
	}

	console.log(`Insertion of ${sessionsData.length} sports sessions...`);

	try {
		const insertedSessions = await database
			.insert(sessionsSport)
			.values(sessionsData)
			.returning();

		console.log(
			`${insertedSessions.length} sports sessions created successfully`,
		);
		return insertedSessions;
	} catch (error) {
		console.error("Error during the insertion of sports sessions:", error);
		throw error;
	}
}
