import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { complexes, type InsertComplex, type SelectComplex } from "../../schema.js";

const complexesData: InsertComplex[] = [
  {
    name: "Complexe Sportif Jean Bouin",
    description: "Grand complexe sportif avec installations multiples pour tous les sports",
    street: "Avenue Pierre de Coubertin",
    city: "Pierrefitte-sur-Seine",
    postalCode: "93380",
    numberOfElevators: 2,
    accessibleForReducedMobility: true,
    parkingCapacity: 150,
    openingHours: {
      monday: { open: "07:00", close: "22:00", closed: false },
      tuesday: { open: "07:00", close: "22:00", closed: false },
      wednesday: { open: "07:00", close: "22:00", closed: false },
      thursday: { open: "07:00", close: "22:00", closed: false },
      friday: { open: "07:00", close: "20:00", closed: false },
      saturday: { open: "09:00", close: "18:00", closed: false },
      sunday: { open: "09:00", close: "17:00", closed: false },
    }
  },
  {
    name: "Centre Aquatique de Lyon",
    description: "Centre aquatique moderne avec piscines olympiques",
    street: "Rue de la Piscine",
    city: "Pierrefitte-sur-Seine",
    postalCode: "93380",
    numberOfElevators: 3,
    accessibleForReducedMobility: true,
    parkingCapacity: 200,
    openingHours: {
      monday: { open: "06:00", close: "21:00", closed: false },
      tuesday: { open: "06:00", close: "21:00", closed: false },
      wednesday: { open: "06:00", close: "21:00", closed: false },
      thursday: { open: "06:00", close: "21:00", closed: false },
      friday: { open: "06:00", close: "19:00", closed: false },
      saturday: { open: "08:00", close: "19:00", closed: false },
      sunday: { open: null, close: null, closed: true },
    }
  },
  {
    name: "Stade Municipal de Marseille",
    description: "Stade avec terrains de football et d'athlétisme",
    street: "Boulevard du Stade",
    city: "Pierrefitte-sur-Seine",
    postalCode: "93380",
    numberOfElevators: 1,
    accessibleForReducedMobility: false,
    parkingCapacity: 80,
    openingHours: {
        monday: { open: "08:00", close: "20:00", closed: false },
        tuesday: { open: "08:00", close: "20:00", closed: false },
        wednesday: { open: "08:00", close: "20:00", closed: false },
        thursday: { open: "08:00", close: "20:00", closed: false },
        friday: { open: "08:00", close: "18:00", closed: false },
        saturday: { open: "09:00", close: "17:00", closed: false },
        sunday: { open: null, close: null, closed: true },
    }
  },
    {
        name: "Gymnase Pierre de Coubertin",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Avenue du Gymnase",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
        monday: { open: "07:30", close: "22:00", closed: false },
        tuesday: { open: "07:30", close: "22:00", closed: false },
        wednesday: { open: "07:30", close: "22:00", closed: false },
        thursday: { open: "07:30", close: "22:00", closed: false },
        friday: { open: "07:30", close: "20:00", closed: false },
        saturday: { open: "09:00", close: "18:00", closed: false },
        sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Gymnase Oliver Twist",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Rue Oliver Twist",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Gymnase Didierot",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Rue Didierot",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Gymnase Charles de Gaulle",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Avenue Charles de Gaulle",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Gymnase Jiolle",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Avenue du Gymnase Jiolle",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Gymnase Magassa",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Avenue du Gymnase Magassa",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Gymnase Molière",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Rue Molière",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Gymnase Mohamed Ali",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Boulevard Mohamed Ali",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Gymnase fiorentino",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Avenue du Gymnase fiorentino",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Complexe Sportif Lionel Messi",
        description: "Complexe sportif moderne avec terrains de football et gymnase",
        street: "Avenue Lionel Messi",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Centre Sportif Lebron James",
        description: "Centre sportif polyvalent avec terrains de basket et gymnase",
        street: "Avenue Lebron James",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Palais des Sports Ronaldo Nazario",
        description: "Palais des sports avec terrains de football et gymnase",
        street: "Boulevard Ronaldo Nazario",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Palais des Sports Serena Williams",
        description: "Palais des sports avec terrains de tennis et gymnase",
        street: "Boulevard Serena Williams",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Arenes Sportives Khamzat Chimaev",
        description: "Arenes sportives avec terrains de combat et gymnase",
        street: "Avenue Khamzat Chimaev",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Arenes Sportives Georges St-Pierre",
        description: "Arenes sportives avec terrains de combat et gymnase",
        street: "Avenue Georges St-Pierre",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Gymnase Teddy Riner",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Avenue Teddy Riner",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    },
    {
        name: "Gymnase Naomi Osaka",
        description: "Gymnase polyvalent pour sports collectifs et individuels",
        street: "Avenue Naomi Osaka",
        city: "Pierrefitte-sur-Seine",
        postalCode: "93380",
        numberOfElevators: 1,
        accessibleForReducedMobility: true,
        parkingCapacity: 50,
        openingHours: {
            monday: { open: "07:30", close: "22:00", closed: false },
            tuesday: { open: "07:30", close: "22:00", closed: false },
            wednesday: { open: "07:30", close: "22:00", closed: false },
            thursday: { open: "07:30", close: "22:00", closed: false },
            friday: { open: "07:30", close: "20:00", closed: false },
            saturday: { open: "09:00", close: "18:00", closed: false },
            sunday: { open: null, close: null, closed: true },
        }
    }
];

export async function seedComplexes(db: NodePgDatabase): Promise<SelectComplex[]> {
  console.log(`Insertion de ${complexesData.length} complexes...`);

  try {
    const insertedComplexes = await db
      .insert(complexes)
      .values(complexesData)
      .returning();
    
    console.log(`${insertedComplexes.length} complexes créés avec succès`);
    return insertedComplexes;
  } catch (error) {
    console.error("Erreur lors de l'insertion des complexes:", error);
    throw error;
  }
}