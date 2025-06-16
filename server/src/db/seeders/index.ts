import { db } from "../index.js";
import { seedComplexes } from "./data/complexes.js";
import { seedRooms } from "./data/rooms.js";
import { seedReservations } from "./data/reservations.js";
import { resetAllTables } from "./reset.js";

export async function seedDatabase() {
  console.log("Début du seeding des données...");
  
  try {
    // Seeding dans l'ordre des dépendances
    console.log("Seeding des complexes...");
    const complexes = await seedComplexes(db);
    
    console.log("Seeding des salles...");
    const rooms = await seedRooms(db, complexes);
    
    console.log("Seeding des réservations...");
    await seedReservations(db, rooms);
    
    console.log("Tous les seeders ont été exécutés avec succès !");
  } catch (error) {
    console.error("Erreur pendant le seeding:", error);
    throw error;
  }
}

export async function resetDatabase() {
  console.log("Début de la suppression des données...");
  
  try {
    await resetAllTables(db);
    console.log("Toutes les tables ont été vidées !");
  } catch (error) {
    console.error("Erreur pendant le reset:", error);
    throw error;
  }
}