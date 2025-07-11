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

// Schema pour les paramètres de requête
export const sectionQuerySchema = z
	.object({
		page: z.string().optional(),
		limit: z.string().optional(),
		clubId: z.string().uuid().optional(),
		search: z.string().optional(),
		isActive: z.string().optional(),
	})
	.transform((data) => ({
		page: Number.parseInt(data.page || "1", 10),
		limit: Number.parseInt(data.limit || "20", 10),
		clubId: data.clubId,
		search: data.search,
		isActive: data.isActive === "true" ? true : data.isActive === "false" ? false : undefined,
	}));

// Schema pour les paramètres d'URL
export const sectionParamsSchema = z.object({
	id: z.string().uuid("ID de section invalide"),
	clubId: z.string().uuid("ID du club invalide").optional(),
});

export type CreateSectionData = z.infer<typeof createSectionSchema>;
export type UpdateSectionData = z.infer<typeof updateSectionSchema>;
export type SectionQueryData = z.infer<typeof sectionQuerySchema>;
export type SectionParamsData = z.infer<typeof sectionParamsSchema>;
