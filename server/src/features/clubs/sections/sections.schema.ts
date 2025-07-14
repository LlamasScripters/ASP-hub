import { z } from "zod";

// Schema pour la création d'une section
export const createSectionSchema = z.object({
	clubId: z.string().uuid("ID du club invalide"),
	name: z.string().min(1, "Le nom est requis").max(255, "Le nom est trop long"),
	description: z.string().max(500, "La description est trop longue").optional(),
	color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Couleur hexadécimale invalide").optional(),
});

// Schema pour la modification d'une section
export const updateSectionSchema = createSectionSchema.partial().omit({ clubId: true });

export type CreateSectionData = z.infer<typeof createSectionSchema>;
export type UpdateSectionData = z.infer<typeof updateSectionSchema>;
