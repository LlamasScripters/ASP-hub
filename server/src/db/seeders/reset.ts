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
  console.log("Deleting all data from tables in descending order of dependencies...");
  
  try {
    // Ordre inverse des dépendances pour éviter les erreurs de clés étrangères
    await db.delete(reservations);
    console.log("Reservations deleted");
    
    // await db.delete(sessionParticipants);
    // console.log("Session participants deleted");
    
    // await db.delete(sessionsSport);
    // console.log("Sports sessions deleted");
    
    // await db.delete(categories);
    // console.log("Categories deleted");
    
    // await db.delete(sections);
    // console.log("Sections deleted");
    
    // await db.delete(clubs);
    // console.log("Clubs deleted");
    
    await db.delete(rooms);
    console.log("Rooms deleted");

    await db.delete(complexes);
    console.log("Complexes deleted");

    // await db.delete(users);
    // console.log("Users deleted");

    // Reset des séquences PostgreSQL
    await db.execute(sql`SELECT setval(pg_get_serial_sequence('complexes', 'id'), 1, false)`);
    await db.execute(sql`SELECT setval(pg_get_serial_sequence('rooms', 'id'), 1, false)`);
    await db.execute(sql`SELECT setval(pg_get_serial_sequence('reservations', 'id'), 1, false)`);
    
  } catch (error) {
    console.error("Error during the reset:", error);
    throw error;
  }
}