import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { rooms, type InsertRoom, type SelectRoom, type SelectComplex } from "../../schema.js";

export async function seedRooms(
  db: NodePgDatabase, 
  complexes: SelectComplex[]
): Promise<SelectRoom[]> {
  
  const roomsData: InsertRoom[] = [
    // Salles pour le Complexe Jean Bouin
    {
      name: "Salle de Musculation A",
      description: "Grande salle de musculation équipée avec matériel moderne",
      sportType: "Musculation",
      isIndoor: true,
      capacity: 30,
      accreditation: "FFM-2024",
      complexId: complexes[0].id,
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
      name: "Terrain de Tennis Couvert 1",
      description: "Terrain de tennis indoor avec surface synthétique",
      sportType: "Tennis",
      isIndoor: true,
      capacity: 4,
      accreditation: "FFT-2024",
      complexId: complexes[0].id,
      openingHours: {
        monday: { open: "08:00", close: "22:00", closed: false },
        tuesday: { open: "08:00", close: "22:00", closed: false },
        wednesday: { open: "08:00", close: "22:00", closed: false },
        thursday: { open: "08:00", close: "22:00", closed: false },
        friday: { open: "08:00", close: "20:00", closed: false },
        saturday: { open: "09:00", close: "18:00", closed: false },
        sunday: { open: "09:00", close: "17:00", closed: false },
      }
    },
    {
      name: "Salle de Danse",
      description: "Salle spacieuse avec parquet et miroirs pour la danse",
      sportType: "Danse",
      isIndoor: true,
      capacity: 25,
      complexId: complexes[0].id,
      openingHours: {
        monday: { open: "08:00", close: "22:00", closed: false },
        tuesday: { open: "08:00", close: "22:00", closed: false },
        wednesday: { open: "08:00", close: "22:00", closed: false },
        thursday: { open: "08:00", close: "22:00", closed: false },
        friday: { open: "08:00", close: "20:00", closed: false },
        saturday: { open: "09:00", close: "18:00", closed: false },
        sunday: { open: "09:00", close: "17:00", closed: false },
      }
    },
    
    // Salles pour le Centre Aquatique de Lyon
    {
      name: "Piscine Olympique",
      description: "Piscine 50m avec 8 couloirs pour la natation",
      sportType: "Natation",
      isIndoor: true,
      capacity: 200,
      accreditation: "FFN-2024",
      complexId: complexes[1].id,
      openingHours: {
        monday: { open: "08:00", close: "22:00", closed: false },
        tuesday: { open: "08:00", close: "22:00", closed: false },
        wednesday: { open: "08:00", close: "22:00", closed: false },
        thursday: { open: "08:00", close: "22:00", closed: false },
        friday: { open: "08:00", close: "20:00", closed: false },
        saturday: { open: "09:00", close: "18:00", closed: false },
        sunday: { open: "09:00", close: "17:00", closed: false },
      }
    },
    {
      name: "Bassin d'Apprentissage",
      description: "Bassin peu profond pour l'apprentissage de la natation",
      sportType: "Natation",
      isIndoor: true,
      capacity: 50,
      complexId: complexes[1].id,
      openingHours: {
        monday: { open: "08:00", close: "22:00", closed: false },
        tuesday: { open: "08:00", close: "22:00", closed: false },
        wednesday: { open: "08:00", close: "22:00", closed: false },
        thursday: { open: "08:00", close: "22:00", closed: false },
        friday: { open: "08:00", close: "20:00", closed: false },
        saturday: { open: "09:00", close: "18:00", closed: false },
        sunday: { open: "09:00", close: "17:00", closed: false },
      }
    },
    {
        name: "Salle de Fitness",
        description: "Salle de fitness avec équipements cardio et musculation",
        sportType: "Fitness",
        isIndoor: true,
        capacity: 40,
        accreditation: "FFH-2024",
        complexId: complexes[1].id,
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
    
    // Salles pour le Stade de Marseille
    {
      name: "Terrain de Football Principal",
      description: "Terrain en herbe naturelle aux dimensions officielles",
      sportType: "Football",
      isIndoor: false,
      capacity: 22,
      accreditation: "FFF-2024",
      complexId: complexes[2].id,
      openingHours: {
        monday: { open: "08:00", close: "22:00", closed: false },
        tuesday: { open: "08:00", close: "22:00", closed: false },
        wednesday: { open: "08:00", close: "22:00", closed: false },
        thursday: { open: "08:00", close: "22:00", closed: false },
        friday: { open: "08:00", close: "20:00", closed: false },
        saturday: { open: "09:00", close: "18:00", closed: false },
        sunday: { open: "09:00", close: "17:00", closed: false },
      }
    },
    {
      name: "Piste d'Athlétisme",
      description: "Piste de 400m avec zones de saut et de lancer",
      sportType: "Athlétisme",
      isIndoor: false,
      capacity: 100,
      accreditation: "FFA-2024",
      complexId: complexes[2].id,
      openingHours: {
        monday: { open: "08:00", close: "22:00", closed: false },
        tuesday: { open: "08:00", close: "22:00", closed: false },
        wednesday: { open: "08:00", close: "22:00", closed: false },
        thursday: { open: "08:00", close: "22:00", closed: false },
        friday: { open: "08:00", close: "20:00", closed: false },
        saturday: { open: "09:00", close: "18:00", closed: false },
        sunday: { open: "09:00", close: "17:00", closed: false },
      }
    },
    {
      name: "Salle de Boxe",
      description: "Salle équipée pour la boxe avec ring et sacs de frappe",
      sportType: "Boxe",
      isIndoor: true,
      capacity: 20,
      accreditation: "FFB-2024",
      complexId: complexes[2].id,
      openingHours: {
        monday: { open: "08:00", close: "22:00", closed: false },
        tuesday: { open: "08:00", close: "22:00", closed: false },
        wednesday: { open: "08:00", close: "22:00", closed: false },
        thursday: { open: "08:00", close: "22:00", closed: false },
        friday: { open: "08:00", close: "20:00", closed: false },
        saturday: { open: "09:00", close: "18:00", closed: false },
        sunday: { open: "09:00", close: "17:00", closed: false },
      }
    }
  ];

  console.log(`Insertion de ${roomsData.length} salles...`);
  
  try {
    const insertedRooms = await db
      .insert(rooms)
      .values(roomsData)
      .returning();

    console.log(`${insertedRooms.length} salles créées avec succès`);
    return insertedRooms;
  } catch (error) {
    console.error("Erreur lors de l'insertion des salles:", error);
    throw error;
  }
}