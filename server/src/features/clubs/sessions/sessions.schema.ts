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

// Schema pour la gestion des participants
export const participantActionSchema = z.object({
	action: z.enum(["add", "remove", "update_status"], {
		errorMap: () => ({ message: "Action invalide" })
	}),
	userId: z.string().uuid("ID utilisateur invalide"),
	status: z.enum(["inscrit", "present", "absent", "excuse"]).optional(),
});

// Schema pour la gestion du statut
export const sessionStatusSchema = z.object({
	status: z.enum(["planifie", "en_cours", "termine", "annule"], {
		errorMap: () => ({ message: "Statut invalide" })
	}),
	notes: z.string().max(500, "Les notes sont trop longues").optional(),
});

// Types d'export
export type CreateSessionData = z.infer<typeof createSessionSchema>;
export type UpdateSessionData = z.infer<typeof updateSessionSchema>;
export type SessionStatusData = z.infer<typeof sessionStatusSchema>;
export type ParticipantActionData = z.infer<typeof participantActionSchema>;
