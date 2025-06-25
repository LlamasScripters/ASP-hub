import type {
  InsertMinibusReservation,
  SelectMinibusReservation,
} from "@/db/schema.js";
import { minibusReservations } from "@/db/schema.js";
import { minibusesService } from "./minibuses.service.js";
import { and, eq, gt, lt, ne, or, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { isWithinAvailability, type Schedule } from "../../lib/schedule-utils.js";
import type { WeekSchedule } from "../../db/seeders/utils/openingHours.js";

/**
 * Safely converts minibus disponibility to WeekSchedule type
 */
function validateMinibusDisponibility(disponibility: unknown): WeekSchedule {
  const schedule = disponibility as WeekSchedule;
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  
  for (const day of days) {
    if (!schedule[day]) {
      throw new Error(`Missing day schedule for ${day}`);
    }
    
    const daySchedule = schedule[day];
    if (typeof daySchedule.available !== 'boolean') {
      throw new Error(`Invalid 'available' property for ${day}`);
    }
  }
  
  return schedule;
}

export const minibusReservationsService = {
  create: async (
    data: InsertMinibusReservation
  ): Promise<SelectMinibusReservation | null> => {
    const minibus = await minibusesService.getById(data.minibusId);
    if (!minibus) {
      throw new Error("Minibus not found");
    }
    if (!minibus.isAvailable) {
      throw new Error("Minibus is not available for reservation");
    }

    const availabilityCheck = isWithinAvailability(
      data.startAt,
      data.endAt,
      validateMinibusDisponibility(minibus.disponibility)
    );
    
    if (!availabilityCheck.isValid) {
      throw new Error(`Réservation impossible: ${availabilityCheck.reason}`);
    }

    const conflicting = await db
      .select()
      .from(minibusReservations)
      .where(
        and(
          eq(minibusReservations.minibusId, data.minibusId),
          or(
            // Début dans la plage existante
            //@ts-ignore
            and(
              //@ts-ignore
              gt(data.startAt, minibusReservations.startAt),
              //@ts-ignore
              lt(data.startAt, minibusReservations.endAt)
            ),
            // Fin dans la plage existante
            //@ts-ignore
            and(
              //@ts-ignore
              gt(data.endAt, minibusReservations.startAt),
              //@ts-ignore
              lt(data.endAt, minibusReservations.endAt)
            ),
            // La nouvelle réservation englobe une existante
            //@ts-ignore
            and(
              //@ts-ignore
              lt(data.startAt, minibusReservations.startAt),
              //@ts-ignore
              gt(data.endAt, minibusReservations.endAt)
            ),
            // Identique
            and(
              //@ts-ignore
              eq(data.startAt, minibusReservations.startAt),
              //@ts-ignore
              eq(data.endAt, minibusReservations.endAt)
            )
          )
        )
      );

    if (conflicting.length > 0) {
      return null; // indique qu’il y a un conflit
    }

    const [created] = await db
      .insert(minibusReservations)
      .values(data)
      .returning();
    return created;
  },

  getAll: async (): Promise<SelectMinibusReservation[]> => {
    return await db.select().from(minibusReservations);
  },

  getPaginatedByMinibusAndDateRange: async (
    minibusId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{
    data: SelectMinibusReservation[];
    total: number;
  }> => {
    const [data, total] = await Promise.all([
      db
        .select()
        .from(minibusReservations)
        .where(
          and(
            eq(minibusReservations.minibusId, minibusId),
            gt(minibusReservations.startAt, startDate),
            lt(minibusReservations.endAt, endDate)
          )
        )
        .orderBy(minibusReservations.startAt),
      db
        .select({ count: sql<number>`count(${minibusReservations.id})` })
        .from(minibusReservations)
        .where(
          and(
            eq(minibusReservations.minibusId, minibusId),
            gt(minibusReservations.startAt, startDate),
            lt(minibusReservations.endAt, endDate)
          )
        ),
    ]);
    return {
      data,
      total: total[0].count,
    };
  },

  getById: async (
    id: string
  ): Promise<SelectMinibusReservation | undefined> => {
    const [res] = await db
      .select()
      .from(minibusReservations)
      .where(eq(minibusReservations.id, id));
    return res;
  },

  getByMinibusId: async (
    minibusId: string
  ): Promise<SelectMinibusReservation[]> => {
    return await db
      .select()
      .from(minibusReservations)
      .where(eq(minibusReservations.minibusId, minibusId));
  },

  update: async (
    id: string,
    data: Partial<InsertMinibusReservation>
  ): Promise<SelectMinibusReservation | "conflict" | "not_found"> => {
    const [current] = await db
      .select()
      .from(minibusReservations)
      .where(eq(minibusReservations.id, id));
    if (!current) return "not_found";

    const startAt = data.startAt ?? current.startAt;
    const endAt = data.endAt ?? current.endAt;
    const minibusId = data.minibusId ?? current.minibusId;

    const minibus = await minibusesService.getById(minibusId);
    if (!minibus) {
      throw new Error("Minibus not found");
    }
    if (!minibus.isAvailable) {
      throw new Error("Minibus is not available for reservation");
    }

    const availabilityCheck = isWithinAvailability(
      startAt,
      endAt,
      validateMinibusDisponibility(minibus.disponibility)
    );
    
    if (!availabilityCheck.isValid) {
      throw new Error(`Mise à jour impossible: ${availabilityCheck.reason}`);
    }

    const conflicting = await db
      .select()
      .from(minibusReservations)
      .where(
        and(
          eq(minibusReservations.minibusId, minibusId),
          ne(minibusReservations.id, id), // Exclure la réservation actuelle
          or(
            and(
              //@ts-ignore
              gt(startAt, minibusReservations.startAt),
              //@ts-ignore
              lt(startAt, minibusReservations.endAt)
            ),
            and(
              //@ts-ignore
              gt(endAt, minibusReservations.startAt),
              //@ts-ignore
              lt(endAt, minibusReservations.endAt)
            ),
            and(
              //@ts-ignore
              lt(startAt, minibusReservations.startAt),
              //@ts-ignore
              gt(endAt, minibusReservations.endAt)
            ),
            and(
              //@ts-ignore
              eq(startAt, minibusReservations.startAt),
              //@ts-ignore
              eq(endAt, minibusReservations.endAt)
            )
          )
        )
      );

    if (conflicting.length > 0) {
      return "conflict";
    }

    const [updated] = await db
      .update(minibusReservations)
      .set(data)
      .where(eq(minibusReservations.id, id))
      .returning();

    return updated;
  },

  delete: async (id: string): Promise<void> => {
    await db.delete(minibusReservations).where(eq(minibusReservations.id, id));
  },
};
