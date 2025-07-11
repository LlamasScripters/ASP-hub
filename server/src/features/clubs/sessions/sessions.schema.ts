import { z } from "zod";

// Schema de base pour une session
const baseSessionSchema = z.object({
	categoryId: z.string().uuid("ID de la catégorie invalide"),
	title: z.string().min(1, "Le titre est requis").max(255, "Le titre est trop long"),
	description: z.string().max(1000, "La description est trop longue").optional(),
	type: z.enum(["entrainement", "match", "stage", "competition", "autre"], {
		errorMap: () => ({ message: "Type de session invalide" })
	}).default("entrainement"),
	status: z.enum(["planifie", "en_cours", "termine", "annule"], {
		errorMap: () => ({ message: "Statut de session invalide" })
	}).default("planifie"),
	startDate: z.coerce.date({ errorMap: () => ({ message: "Date de début invalide" }) }),
	endDate: z.coerce.date({ errorMap: () => ({ message: "Date de fin invalide" }) }),
	location: z.string().max(255, "Le lieu est trop long").optional(),
	maxParticipants: z.number().int().min(1, "Le nombre maximum de participants doit être positif").optional(),
	notes: z.string().max(1000, "Les notes sont trop longues").optional(),
	coachId: z.string().uuid("ID du coach invalide").optional(),
	responsibleId: z.string().uuid("ID du responsable invalide").optional(),
});

// Schema pour la création d'une session avec validations personnalisées
export const createSessionSchema = baseSessionSchema.refine((data) => {
	// Vérifier que la date de fin est après la date de début
	return data.endDate > data.startDate;
}, {
	message: "La date de fin doit être après la date de début",
	path: ["endDate"],
}).refine((data) => {
	// Vérifier que la date de début est dans le futur (sauf pour les sessions terminées)
	const now = new Date();
	if (data.status === "planifie" || data.status === "en_cours") {
		return data.startDate > now;
	}
	return true;
}, {
	message: "La date de début doit être dans le futur pour les sessions planifiées",
	path: ["startDate"],
});

// Schema pour la modification d'une session
export const updateSessionSchema = baseSessionSchema.partial().omit({ categoryId: true }).refine((data) => {
	// Vérifier que la date de fin est après la date de début si les deux sont définies
	if (data.startDate && data.endDate) {
		return data.endDate > data.startDate;
	}
	return true;
}, {
	message: "La date de fin doit être après la date de début",
	path: ["endDate"],
});

// Schema pour les requêtes GET (filtres)
export const getSessionsSchema = z.object({
	page: z.string().optional().transform(val => val ? Number.parseInt(val) : 1),
	limit: z.string().optional().transform(val => val ? Number.parseInt(val) : 10),
	categoryId: z.string().uuid().optional(),
	clubId: z.string().uuid().optional(),
	sectionId: z.string().uuid().optional(),
	type: z.enum(["entrainement", "match", "stage", "competition", "autre"]).optional(),
	status: z.enum(["planifie", "en_cours", "termine", "annule"]).optional(),
	coachId: z.string().uuid().optional(),
	responsibleId: z.string().uuid().optional(),
	startDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
	endDate: z.string().optional().transform(val => val ? new Date(val) : undefined),
	search: z.string().optional(),
});

// Schema pour les paramètres d'URL
export const sessionParamsSchema = z.object({
	id: z.string().uuid("ID de session invalide"),
	categoryId: z.string().uuid("ID de catégorie invalide").optional(),
	clubId: z.string().uuid("ID du club invalide").optional(),
});

// Schema pour la gestion des participants
export const sessionParticipantsSchema = z.object({
	memberIds: z.array(z.string().uuid("ID de membre invalide")).min(1, "Au moins un membre doit être sélectionné"),
	action: z.enum(["add", "remove"], {
		errorMap: () => ({ message: "Action invalide (add ou remove)" })
	}),
});

// Schema pour la gestion du statut
export const sessionStatusSchema = z.object({
	status: z.enum(["planifie", "en_cours", "termine", "annule"], {
		errorMap: () => ({ message: "Statut invalide" })
	}),
	notes: z.string().max(500, "Les notes sont trop longues").optional(),
});

// Schema pour les filtres de requête (query params)
export const sessionFiltersQuerySchema = z.object({
	page: z.coerce.number().int().min(1).optional(),
	limit: z.coerce.number().int().min(1).max(100).optional(),
	categoryId: z.string().uuid().optional(),
	clubId: z.string().uuid().optional(),
	sectionId: z.string().uuid().optional(),
	type: z.enum(["entrainement", "match", "stage", "competition", "autre"]).optional(),
	status: z.enum(["planifie", "en_cours", "termine", "annule"]).optional(),
	coachId: z.string().uuid().optional(),
	responsibleId: z.string().uuid().optional(),
	startDate: z.coerce.date().optional(),
	endDate: z.coerce.date().optional(),
	search: z.string().optional(),
});

// Types d'export
export type CreateSessionData = z.infer<typeof createSessionSchema>;
export type UpdateSessionData = z.infer<typeof updateSessionSchema>;
export type SessionFilters = z.infer<typeof getSessionsSchema>;
export type SessionFiltersQuery = z.infer<typeof sessionFiltersQuerySchema>;
export type SessionParamsData = z.infer<typeof sessionParamsSchema>;
export type SessionParticipantsData = z.infer<typeof sessionParticipantsSchema>;
export type SessionStatusData = z.infer<typeof sessionStatusSchema>;
