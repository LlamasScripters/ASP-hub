import type {
  InsertRoomOpeningHour,
  SelectRoomOpeningHour,
} from "@/db/schema.js";
import { roomOpeningHours } from "@/db/schema.js";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { complexOpeningHoursService } from "./complexOpeningHours.service.js";

const validateRoomOpeningHours = (
  complexId: string,
  roomOpeningHours: InsertRoomOpeningHour[]
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Vérifier si les horaires d'ouverture de la salle sont valides
    for (const openingHour of roomOpeningHours) {
      if (
        !openingHour.openAt ||
        !openingHour.closeAt ||
        openingHour.openAt >= openingHour.closeAt
      ) {
        return reject(
          new Error("Opening hours must have valid openAt and closeAt times.")
        );
      }
    }

    // Vérifier si les horaires d'ouverture de la salle sont compatibles avec ceux du complexe
    complexOpeningHoursService
      .getByComplexId(complexId)
      .then((complexHours) => {
        for (const openingHour of roomOpeningHours) {
          const isValid = complexHours.some(
            (complexHour) =>
              openingHour.openAt >= complexHour.openAt &&
              openingHour.closeAt <= complexHour.closeAt
          );
          if (!isValid) {
            return reject(
              new Error(
                "Opening hours for the room must be within the complex's opening hours."
              )
            );
          }
        }
        resolve();
      })
      .catch((error) => reject(error));
  });
}

export const roomOpeningHoursService = {
  create: async (data: InsertRoomOpeningHour) => {
    const [openingHours] = await db
      .insert(roomOpeningHours)
      .values(data)
      .returning();
    return openingHours;
  },

  createMany: async (
    complexId: string,
    data: InsertRoomOpeningHour[]
  ): Promise<SelectRoomOpeningHour[]> => {  
    if (data.length === 0) {
      throw new Error("Aucun horaire d'ouverture fourni.");
    }

    await validateRoomOpeningHours(complexId, data);

    const insertedOpeningHours = await db
      .insert(roomOpeningHours)
      .values(data)
      .returning();
    return insertedOpeningHours;
  },

  getAll: async (): Promise<SelectRoomOpeningHour[]> => {
    return await db.select().from(roomOpeningHours);
  },

  getByRoomId: async (roomId: string): Promise<SelectRoomOpeningHour[]> => {
    return await db
      .select()
      .from(roomOpeningHours)
      .where(eq(roomOpeningHours.roomId, roomId));
  },

  getById: async (id: string): Promise<SelectRoomOpeningHour | undefined> => {
    const [openingHours] = await db
      .select()
      .from(roomOpeningHours)
      .where(eq(roomOpeningHours.id, id));
    return openingHours;
  },

  update: async (
    id: string,
    data: Partial<InsertRoomOpeningHour>
  ): Promise<SelectRoomOpeningHour | undefined> => {
    const [updated] = await db
      .update(roomOpeningHours)
      .set(data)
      .where(eq(roomOpeningHours.id, id))
      .returning();
    return updated;
  },

  updateMany: async (
    complexId: string,
    data: InsertRoomOpeningHour[]
  ): Promise<SelectRoomOpeningHour[]> => {
    if (data.length === 0) {
      throw new Error("No opening hours provided.");
    }

    await validateRoomOpeningHours(complexId, data);

    const updatedOpeningHours = [];
    for (const item of data) {
      if (item.id) {
        const [updated] = await db
          .update(roomOpeningHours)
          .set(item)
          .where(eq(roomOpeningHours.id, item.id))
          .returning();
        updatedOpeningHours.push(updated);
      } else {
        const [created] = await db
          .insert(roomOpeningHours)
          .values(item)
          .returning();
        updatedOpeningHours.push(created);
      }
    }
    return updatedOpeningHours;
  },
  
  delete: async (id: string): Promise<void> => {
    await db.delete(roomOpeningHours).where(eq(roomOpeningHours.id, id));
  },

  deleteByRoomId: async (roomId: string): Promise<void> => {
    await db.delete(roomOpeningHours).where(eq(roomOpeningHours.roomId, roomId));
  },
};
