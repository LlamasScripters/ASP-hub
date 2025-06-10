import type {
  InsertComplexOpeningHour,
  SelectComplexOpeningHour,
} from "@/db/schema.js";
import { complexOpeningHours } from "@/db/schema.js";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";

export const complexOpeningHoursService = {
  create: async (data: InsertComplexOpeningHour) => {
    const [openingHours] = await db
      .insert(complexOpeningHours)
      .values(data)
      .returning();
    return openingHours;
  },

  createMany: async (
    data: InsertComplexOpeningHour[] 
  ): Promise<SelectComplexOpeningHour[]> => {
    const insertedOpeningHours = await db
      .insert(complexOpeningHours)
      .values(data)
      .returning();
    return insertedOpeningHours;
  },

  getAll: async (): Promise<SelectComplexOpeningHour[]> => {
    return await db.select().from(complexOpeningHours);
  },

  getByComplexId: async (
    complexId: string
  ): Promise<SelectComplexOpeningHour[]> => {
    return await db
      .select()
      .from(complexOpeningHours)
      .where(eq(complexOpeningHours.complexId, complexId));
  },

  getById: async (
    id: string
  ): Promise<SelectComplexOpeningHour | undefined> => {
    const [openingHours] = await db
      .select()
      .from(complexOpeningHours)
      .where(eq(complexOpeningHours.id, id));
    return openingHours;
  },

  update: async (
    id: string,
    data: Partial<InsertComplexOpeningHour>
  ): Promise<SelectComplexOpeningHour | undefined> => {
    const [updated] = await db
      .update(complexOpeningHours)
      .set(data)
      .where(eq(complexOpeningHours.id, id))
      .returning();
    return updated;
  },

  updateMany: async (
    data: InsertComplexOpeningHour[]
  ): Promise<SelectComplexOpeningHour[]> => {
    const updatedOpeningHours = [];
    for (const item of data) {
      if (item.id) {
        const [updated] = await db
          .update(complexOpeningHours)
          .set(item)
          .where(eq(complexOpeningHours.id, item.id))
          .returning();
        if (updated) updatedOpeningHours.push(updated);
      }
    }
    return updatedOpeningHours;
  },

  delete: async (id: string): Promise<void> => {
    await db.delete(complexOpeningHours).where(eq(complexOpeningHours.id, id));
  },

  deleteByComplexId: async (complexId: string): Promise<void> => {
    await db
      .delete(complexOpeningHours)
      .where(eq(complexOpeningHours.complexId, complexId));
  },
};
