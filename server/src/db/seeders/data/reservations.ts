import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { reservations, users, type InsertReservation, type SelectRoom } from "../../schema.js";
import { eq } from "drizzle-orm";

export async function seedReservations(
  db: NodePgDatabase, 
  rooms: SelectRoom[]
): Promise<void> {
  
const existingUsers = await db.select().from(users).where(eq(users.role, 'admin')).limit(3);
  
  if (existingUsers.length === 0) {
    console.log("Aucun utilisateur trouvé, création d'utilisateurs de test...");
    return;
  }

  const reservationsData: InsertReservation[] = [];
  const today = new Date();
  
  rooms.forEach((room, roomIndex) => {
    // 3-5 réservations par salle
    const reservationCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < reservationCount; i++) {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + Math.floor(Math.random() * 14) + 1); // 1-14 jours dans le futur
      startDate.setHours(8 + Math.floor(Math.random() * 12)); // Entre 8h et 20h
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + (Math.floor(Math.random() * 3) + 1)); // 1-3h de durée
      
      const randomUser = existingUsers[Math.floor(Math.random() * existingUsers.length)];
      const statuses = ['pending', 'confirmed', 'cancelled'] as const;
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      reservationsData.push({
        title: `Séance ${room.sportType} - ${room.name}`,
        startAt: startDate,
        endAt: endDate,
        roomId: room.id,
        bookerId: randomUser.id,
        status: randomStatus,
      });
    }
  });

  console.log(`Insertion de ${reservationsData.length} réservations...`);
  
  try {
    const insertedReservations = await db
      .insert(reservations)
      .values(reservationsData)
      .returning();
    
    console.log(`${insertedReservations.length} réservations créées avec succès`);
  } catch (error) {
    console.error("Erreur lors de l'insertion des réservations:", error);
    throw error;
  }
}