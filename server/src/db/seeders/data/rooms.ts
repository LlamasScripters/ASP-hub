import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import {
	type InsertRoom,
	type SelectComplex,
	type SelectRoom,
	rooms,
} from "../../schema.js";
import {
	AQUATIC_HOURS,
	EXTENDED_HOURS,
	STADIUM_HOURS,
	STANDARD_HOURS,
	type WeekSchedule,
} from "../utils/openingHours.js";

const createRoom = (
	name: string,
	description: string,
	sportType: string,
	complexId: string,
	openingHours: WeekSchedule,
): InsertRoom => ({
	name,
	description,
	sportType,
	isIndoor: true,
	capacity: 100,
	accreditation: "accreditation",
	complexId,
	openingHours,
});

export async function seedRooms(
	db: NodePgDatabase,
	complexes: SelectComplex[],
): Promise<SelectRoom[]> {
	const roomsData: InsertRoom[] = [
		// Salles pour le complexe sportif Pierre de Coubertin
		createRoom(
			"Salle Polyvalente",
			"Salle polyvalente pour divers sports et activités",
			"multi-sport",
			complexes[0].id,
			STANDARD_HOURS,
		),
		createRoom(
			"Gymnase Principal",
			"Gymnase principal avec terrain de basket et tribunes",
			"basketball",
			complexes[0].id,
			STANDARD_HOURS,
		),
		createRoom(
			"Piscine Olympique",
			"Piscine olympique pour la natation et les compétitions aquatiques",
			"natation",
			complexes[0].id,
			STANDARD_HOURS,
		),
		createRoom(
			"Terrain de Football",
			"Terrain de football en gazon naturel",
			"football",
			complexes[0].id,
			STANDARD_HOURS,
		),
		createRoom(
			"Salle de Musculation",
			"Salle de musculation équipée pour l'entraînement",
			"musculation",
			complexes[0].id,
			STANDARD_HOURS,
		),

		// Salles pour le centre aquatique de Lyon
		createRoom(
			"Bassin Olympique",
			"Bassin olympique pour les compétitions de natation",
			"natation",
			complexes[1].id,
			AQUATIC_HOURS,
		),
		createRoom(
			"Bassin d'Apprentissage",
			"Bassin pour les cours de natation et l'apprentissage",
			"natation",
			complexes[1].id,
			AQUATIC_HOURS,
		),
		createRoom(
			"Espace Bien-Être",
			"Espace bien-être avec sauna et hammam",
			"bien-être",
			complexes[1].id,
			AQUATIC_HOURS,
		),
		createRoom(
			"Salle de Fitness",
			"Salle de fitness avec équipements modernes",
			"fitness",
			complexes[1].id,
			AQUATIC_HOURS,
		),
		createRoom(
			"Terrains de Beach Volley",
			"Terrains de beach volley pour les activités estivales",
			"beach-volley",
			complexes[1].id,
			AQUATIC_HOURS,
		),

		// Salles pour le stade municipal de Pierrefitte
		createRoom(
			"Terrain de Football Principal",
			"Terrain principal pour les matchs de football",
			"football",
			complexes[2].id,
			STADIUM_HOURS,
		),
		createRoom(
			"Piste d'Athlétisme",
			"Piste d'athlétisme pour les courses et entraînements",
			"athlétisme",
			complexes[2].id,
			STADIUM_HOURS,
		),
		createRoom(
			"Tribunes",
			"Tribunes pour les spectateurs lors des événements sportifs",
			"spectateurs",
			complexes[2].id,
			STADIUM_HOURS,
		),
		createRoom(
			"Salle de Conférence",
			"Salle de conférence pour les réunions et briefings",
			"conférence",
			complexes[2].id,
			STADIUM_HOURS,
		),
		createRoom(
			"Terrain de Rugby",
			"Terrain de rugby pour les entraînements et matchs",
			"rugby",
			complexes[2].id,
			STADIUM_HOURS,
		),

		// Salles pour le centre sportif de la Plaine
		createRoom(
			"Terrains de Tennis",
			"Terrains de tennis pour les cours et compétitions",
			"tennis",
			complexes[3].id,
			EXTENDED_HOURS,
		),
		createRoom(
			"Salle de Sport",
			"Salle de sport polyvalente pour divers sports",
			"multi-sport",
			complexes[3].id,
			EXTENDED_HOURS,
		),
		createRoom(
			"Espace Bien-Être",
			"Espace bien-être avec spa et massages",
			"bien-être",
			complexes[3].id,
			EXTENDED_HOURS,
		),
		createRoom(
			"Salle de Danse",
			"Salle de danse pour les cours et répétitions",
			"danse",
			complexes[3].id,
			EXTENDED_HOURS,
		),
		createRoom(
			"Terrain de Handball",
			"Terrain de handball pour les entraînements et matchs",
			"handball",
			complexes[3].id,
			EXTENDED_HOURS,
		),
	];

	console.log(`Insertion of ${roomsData.length} rooms...`);

	try {
		const insertedRooms = await db.insert(rooms).values(roomsData).returning();

		console.log(`${insertedRooms.length} rooms created successfully`);
		return insertedRooms;
	} catch (error) {
		console.error("Error during the insertion of rooms:", error);
		throw error;
	}
}
