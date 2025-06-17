import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { complexes, type InsertComplex, type SelectComplex } from "../../schema.js";
import { STANDARD_HOURS, AQUATIC_HOURS, STADIUM_HOURS, EXTENDED_HOURS, type WeekSchedule } from "../utils/openingHours.js";

const createComplex = (name: string, street: string, description: string, openingHours: WeekSchedule): InsertComplex => ({
    name,
    description,
    street,
    city: "Pierrefitte-sur-Seine",
    postalCode: "93380",
    numberOfElevators: 1,
    accessibleForReducedMobility: true,
    parkingCapacity: 10,
    openingHours,
});

const complexesData: InsertComplex[] = [
    createComplex("Complexe Sportif Pierre de Coubertin", "1 Avenue Pierre de Coubertin", "Complexe sportif polyvalent avec gymnase, piscine et terrains de sport", STANDARD_HOURS),
    createComplex("Centre Aquatique de Lyon", "10 Rue des Nageurs", "Centre aquatique moderne avec piscine olympique et bassins d'apprentissage", AQUATIC_HOURS),
    createComplex("Stade Municipal de Pierrefitte", "5 Rue du Stade", "Stade municipal avec terrain de football, piste d'athlétisme et tribunes", STADIUM_HOURS),
    createComplex("Centre Sportif de la Plaine", "15 Avenue des Sports", "Centre sportif avec terrains de tennis, salle de sport et espace bien-être", EXTENDED_HOURS),
    createComplex("Complexe Sportif de la Gare", "20 Rue de la Gare", "Complexe sportif avec gymnase, terrains de basket et salle de danse", STANDARD_HOURS),
    createComplex("Complexe Sportif Jean Bouin", "30 Avenue Jean Bouin", "Complexe sportif avec salle de musculation, terrains de tennis et salle de danse", STANDARD_HOURS),
    createComplex("Complexe Sportif des Lilas", "25 Rue des Lilas", "Complexe sportif avec gymnase, terrains de football et salle de fitness", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Montagne", "35 Chemin de la Montagne", "Complexe sportif en pleine nature avec terrains de sport et sentiers de randonnée", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Rivière", "40 Rue de la Rivière", "Complexe sportif au bord de la rivière avec activités nautiques et espaces verts", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Forêt", "50 Avenue de la Forêt", "Complexe sportif en pleine forêt avec terrains de sport et sentiers de course", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Plage", "60 Rue de la Plage", "Complexe sportif en bord de mer avec activités nautiques et espaces de détente", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Ville", "70 Avenue de la Ville", "Complexe sportif urbain avec gymnase, terrains de sport et espaces verts", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Campagne", "80 Chemin de la Campagne", "Complexe sportif rural avec terrains de sport et activités en plein air", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Montagne Verte", "90 Rue de la Montagne Verte", "Complexe sportif avec vue panoramique sur la montagne et activités de plein air", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Plaine Blanche", "100 Avenue de la Plaine Blanche", "Complexe sportif avec terrains de sport et espaces de loisirs en pleine nature", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Vallée", "110 Rue de la Vallée", "Complexe sportif en vallée avec activités sportives et espaces de détente", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Côte", "120 Avenue de la Côte", "Complexe sportif en bord de côte avec activités nautiques et espaces de loisirs", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Plaine du Nord", "130 Chemin de la Plaine du Nord", "Complexe sportif avec terrains de sport et activités en plein air dans la plaine du nord", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Plaine du Sud", "140 Chemin de la Plaine du Sud", "Complexe sportif avec terrains de sport et activités en plein air dans la plaine du sud", STANDARD_HOURS),
    createComplex("Complexe Sportif de la Plaine Centrale", "150 Chemin de la Plaine Centrale", "Complexe sportif avec terrains de sport et activités en plein air dans la plaine centrale", STANDARD_HOURS),
];

export async function seedComplexes(db: NodePgDatabase): Promise<SelectComplex[]> {
    console.log(`Insertion of ${complexesData.length} complexes...`);

    try {
        const insertedComplexes = await db
            .insert(complexes)
            .values(complexesData)
            .returning();

        console.log(`${insertedComplexes.length} complexes created successfully`);
        return insertedComplexes;
    } catch (error) {
        console.error("Error during the insertion of complexes:", error);
        throw error;
    }
}
