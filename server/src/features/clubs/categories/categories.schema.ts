import { z } from "zod";

// Schema de base pour une catégorie (sans validation personnalisée)
const baseCategorySchema = z.object({
	sectionId: z.string().uuid("ID de la section invalide"),
	name: z.string().min(1, "Le nom est requis").max(255, "Le nom est trop long"),
	description: z.string().max(500, "La description est trop longue").optional(),
	ageMin: z
		.number()
		.int()
		.min(0, "L'âge minimum doit être positif")
		.max(99, "L'âge minimum est trop élevé")
		.optional(),
	ageMax: z
		.number()
		.int()
		.min(0, "L'âge maximum doit être positif")
		.max(99, "L'âge maximum est trop élevé")
		.optional(),
});

// Schema pour la création d'une catégorie avec validation personnalisée
export const createCategorySchema = baseCategorySchema.refine(
	(data) => {
		// Vérifier que ageMax >= ageMin si les deux sont définis
		if (data.ageMin !== undefined && data.ageMax !== undefined) {
			return data.ageMax >= data.ageMin;
		}
		return true;
	},
	{
		message: "L'âge maximum doit être supérieur ou égal à l'âge minimum",
		path: ["ageMax"],
	},
);

// Schema pour la modification d'une catégorie
export const updateCategorySchema = baseCategorySchema
	.partial()
	.omit({ sectionId: true })
	.refine(
		(data) => {
			// Vérifier que ageMax >= ageMin si les deux sont définis
			if (data.ageMin !== undefined && data.ageMax !== undefined) {
				return data.ageMax >= data.ageMin;
			}
			return true;
		},
		{
			message: "L'âge maximum doit être supérieur ou égal à l'âge minimum",
			path: ["ageMax"],
		},
	);

// Types générés
export type CreateCategoryData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
