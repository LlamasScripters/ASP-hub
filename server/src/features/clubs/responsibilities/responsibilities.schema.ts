import { z } from "zod";

// Schéma pour l'assignation d'un responsable de section
export const assignSectionManagerSchema = z.object({
	userId: z.string().uuid("ID utilisateur invalide"),
});

// Schéma pour l'assignation d'un coach de catégorie
export const assignCategoryCoachSchema = z.object({
	userId: z.string().uuid("ID utilisateur invalide"),
});

// Schéma pour les paramètres d'assignation générique
export const assignResponsibilitySchema = z.object({
	userId: z.string().uuid("ID utilisateur invalide"),
	sectionId: z.string().uuid("ID section invalide").optional(),
	categoryId: z.string().uuid("ID catégorie invalide").optional(),
	role: z.enum(["section_manager", "coach"], {
		errorMap: () => ({ message: "Rôle invalide" }),
	}),
});

// Types d'export
export type AssignSectionManagerData = z.infer<
	typeof assignSectionManagerSchema
>;
export type AssignCategoryCoachData = z.infer<typeof assignCategoryCoachSchema>;
export type AssignResponsibilityData = z.infer<
	typeof assignResponsibilitySchema
>;
