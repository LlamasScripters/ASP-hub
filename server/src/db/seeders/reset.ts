import { sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { 
  reservations, 
  rooms, 
  complexes,
//   sessionParticipants,
//   sessionsSport,
//   categories,
//   sections,
//   clubs,
//   users
} from "../schema.js";

export async function resetAllTables(db: NodePgDatabase) {
  console.log("Suppression des données dans l'ordre des dépendances...");
  
  try {
    // Ordre inverse des dépendances pour éviter les erreurs de clés étrangères
    await db.delete(reservations);
    console.log("Réservations supprimées");
    
    // await db.delete(sessionParticipants);
    // console.log("Participants aux sessions supprimés");
    
    // await db.delete(sessionsSport);
    // console.log("Sessions sportives supprimées");
    
    // await db.delete(categories);
    // console.log("Catégories supprimées");
    
    // await db.delete(sections);
    // console.log("Sections supprimées");
    
    // await db.delete(clubs);
    // console.log("Clubs supprimés");
    
    await db.delete(rooms);
    console.log("Salles supprimées");
    
    await db.delete(complexes);
    console.log("Complexes supprimés");
    
    // await db.delete(users);
    // console.log("Utilisateurs supprimés");

    // Reset des séquences PostgreSQL
    await db.execute(sql`SELECT setval(pg_get_serial_sequence('complexes', 'id'), 1, false)`);
    await db.execute(sql`SELECT setval(pg_get_serial_sequence('rooms', 'id'), 1, false)`);
    await db.execute(sql`SELECT setval(pg_get_serial_sequence('reservations', 'id'), 1, false)`);
    
  } catch (error) {
    console.error("Erreur lors du reset des tables:", error);
    throw error;
  }
}