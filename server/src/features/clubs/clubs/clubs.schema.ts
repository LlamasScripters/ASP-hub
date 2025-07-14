import { z } from "zod";

// Schema pour la création d'un club
export const createClubSchema = z.object({
	name: z.string().min(1, "Le nom est requis").max(255, "Le nom est trop long"),
	description: z.string().max(500, "La description est trop longue").optional(),
	address: z.string().max(255, "L'adresse est trop longue").optional(),
	phone: z.string().max(20, "Le numéro de téléphone est trop long").optional(),
	email: z.string().email("Email invalide").max(255, "L'email est trop long").optional(),
	website: z.string().url("URL invalide").max(255, "L'URL est trop longue").optional(),
});

// Schema pour la modification d'un club
export const updateClubSchema = createClubSchema.partial();

// Schema pour les paramètres d'URL
export const clubParamsSchema = z.object({
	id: z.string().uuid("ID invalide"),
});

export type CreateClubData = z.infer<typeof createClubSchema>;
export type UpdateClubData = z.infer<typeof updateClubSchema>;
export type ClubParamsData = z.infer<typeof clubParamsSchema>;
