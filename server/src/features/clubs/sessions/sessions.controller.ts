import { requireAuth } from "@/middleware/auth.middleware.js";
import { requireSessionManagement } from "@/middleware/role-specific.middleware.js";
import type { Request, Response } from "express";
import { Router } from "express";
import { z } from "zod";
import {
	createSessionSchema,
	participantActionSchema,
	updateSessionSchema,
} from "./sessions.schema.js";
import { SessionsService } from "./sessions.service.js";

const sessionsRouter = Router();
const sessionsService = new SessionsService();

// Routes protégées par authentification
sessionsRouter.use(requireAuth);

/**
 * @route GET /api/sessions
 * @description Récupère toutes les sessions
 */
sessionsRouter.get("/", async (req: Request, res: Response) => {
	try {
		const sessionsData = await sessionsService.getSessions();

		res.json(sessionsData);
	} catch (error) {
		console.error("Erreur lors de la récupération des sessions:", error);
		res.status(500).json({ error: "Erreur serveur" });
	}
});

/**
 * @route GET /api/sessions/upcoming
 * @description Récupère les sessions à venir
 */
sessionsRouter.get("/upcoming", async (req: Request, res: Response) => {
	try {
		const limit = req.query.limit
			? Number.parseInt(req.query.limit as string)
			: 10;

		if (Number.isNaN(limit) || limit < 1 || limit > 100) {
			res.status(400).json({ error: "Limite invalide (1-100)" });
			return;
		}

		const sessions = await sessionsService.getUpcomingSessions(limit);

		res.json(sessions);
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des sessions à venir:",
			error,
		);
		res.status(500).json({ error: "Erreur serveur" });
	}
});

/**
 * @route GET /api/sessions/stats
 * @description Récupère les statistiques des sessions
 */
sessionsRouter.get("/stats", async (req: Request, res: Response) => {
	try {
		const { categoryId } = req.query;

		const stats = await sessionsService.getSessionStats(categoryId as string);

		res.json(stats);
	} catch (error) {
		console.error("Erreur lors de la récupération des statistiques:", error);
		res.status(500).json({ error: "Erreur serveur" });
	}
});

/**
 * @route POST /api/sessions/check-conflicts
 * @description Vérifie les conflits d'une session
 */
sessionsRouter.post("/check-conflicts", async (req: Request, res: Response) => {
	try {
		const result = createSessionSchema.safeParse(req.body);

		if (!result.success) {
			res.status(400).json({
				error: "Données invalides",
				details: result.error.issues,
			});
			return;
		}

		const sessionData = result.data;
		const conflicts = await sessionsService.checkSessionConflicts(sessionData);

		res.json({
			hasConflicts: conflicts.length > 0,
			conflicts,
		});
	} catch (error) {
		console.error("Erreur lors de la vérification des conflits:", error);
		res.status(500).json({ error: "Erreur serveur" });
	}
});

/**
 * @route GET /api/sessions/category/:categoryId
 * @description Récupère les sessions d'une catégorie
 */
sessionsRouter.get(
	"/category/:categoryId",
	async (req: Request, res: Response) => {
		try {
			const { categoryId } = req.params;

			const sessions = await sessionsService.getSessionsByCategory(categoryId);

			res.json(sessions);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des sessions par catégorie:",
				error,
			);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * @route GET /api/sessions/coach/:coachId
 * @description Récupère les sessions d'un coach
 */
sessionsRouter.get("/coach/:coachId", async (req: Request, res: Response) => {
	try {
		const { coachId } = req.params;

		const sessions = await sessionsService.getSessionsByCoach(coachId);

		res.json(sessions);
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des sessions par coach:",
			error,
		);
		res.status(500).json({ error: "Erreur serveur" });
	}
});

/**
 * @route GET /api/sessions/:id
 * @description Récupère une session par son ID
 */
sessionsRouter.get("/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const session = await sessionsService.getSessionById(id);

		if (!session) {
			res.status(404).json({ error: "Session non trouvée" });
			return;
		}

		res.json(session);
	} catch (error) {
		console.error("Erreur lors de la récupération de la session:", error);
		res.status(500).json({ error: "Erreur serveur" });
	}
});

/**
 * @route POST /api/sessions
 * @description Créer une nouvelle session
 */
sessionsRouter.post(
	"/",
	requireSessionManagement(),
	async (req: Request, res: Response) => {
		try {
			const result = createSessionSchema.safeParse(req.body);

			if (!result.success) {
				res.status(400).json({
					error: "Données invalides",
					details: result.error.issues,
				});
				return;
			}

			const sessionData = result.data;
			const createdSession = await sessionsService.createSession(sessionData);

			res.status(201).json(createdSession);
		} catch (error) {
			console.error("Erreur lors de la création de la session:", error);

			if (
				error instanceof Error &&
				error.message.includes("Conflits détectés")
			) {
				res.status(409).json({ error: error.message });
				return;
			}

			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * @route POST /api/sessions/with-room-reservation
 * @description Créer une session avec réservation de salle automatique
 */
sessionsRouter.post("/with-room-reservation", requireSessionManagement(), async (req: Request, res: Response) => {
	try {
		const sessionValidation = createSessionSchema.safeParse(req.body);
		
		if (!sessionValidation.success) {
			res.status(400).json({ 
				error: "Données de session invalides", 
				details: sessionValidation.error.issues 
			});
			return;
		}

		const { roomId, bookerId } = req.body;
		
		if (!roomId || !bookerId) {
			res.status(400).json({ 
				error: "roomId et bookerId sont requis pour créer une réservation de salle" 
			});
			return;
		}

		// Validation des UUIDs
		const roomIdSchema = z.string().uuid();
		const bookerIdSchema = z.string().uuid();
		
		const roomIdResult = roomIdSchema.safeParse(roomId);
		const bookerIdResult = bookerIdSchema.safeParse(bookerId);
		
		if (!roomIdResult.success || !bookerIdResult.success) {
			res.status(400).json({ 
				error: "Format d'ID invalide pour roomId ou bookerId" 
			});
			return;
		}

		const sessionData = sessionValidation.data;
		const newSession = await sessionsService.createSessionWithRoomReservation(
			sessionData,
			roomIdResult.data,
			bookerIdResult.data
		);
		
		res.status(201).json(newSession);
	} catch (error) {
		console.error("Erreur lors de la création de la session avec réservation:", error);
		
		if (error instanceof Error) {
			if (error.message.includes("Conflits détectés")) {
				res.status(409).json({ error: error.message });
				return;
			}
			
			if (error.message.includes("Salle non trouvée") || 
				error.message.includes("Utilisateur non trouvé")) {
				res.status(404).json({ error: error.message });
				return;
			}
		}
		
		res.status(500).json({ error: "Erreur serveur" });
	}
});

/**
 * @route PUT /api/sessions/:id
 * @description Mettre à jour une session
 */
sessionsRouter.put(
	"/:id",
	requireSessionManagement(),
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const result = updateSessionSchema.safeParse(req.body);

			if (!result.success) {
				res.status(400).json({
					error: "Données invalides",
					details: result.error.issues,
				});
				return;
			}

			const updateData = result.data;
			const updatedSession = await sessionsService.updateSession(
				id,
				updateData,
			);

			res.json(updatedSession);
		} catch (error) {
			console.error("Erreur lors de la mise à jour de la session:", error);

			if (error instanceof Error && error.message === "Session non trouvée") {
				res.status(404).json({ error: error.message });
				return;
			}

			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * @route PATCH /api/sessions/:id/link-room-reservation
 * @description Lier une session existante à une réservation de salle
 */
sessionsRouter.patch("/:id/link-room-reservation", requireSessionManagement(), async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { roomReservationId } = req.body;
		
		if (!roomReservationId) {
			res.status(400).json({ 
				error: "roomReservationId est requis" 
			});
			return;
		}

		const roomReservationIdSchema = z.string().uuid();
		const roomReservationIdResult = roomReservationIdSchema.safeParse(roomReservationId);
		
		if (!roomReservationIdResult.success) {
			res.status(400).json({ 
				error: "Format d'ID invalide pour roomReservationId" 
			});
			return;
		}

		const updatedSession = await sessionsService.linkSessionToRoomReservation(
			id,
			roomReservationIdResult.data
		);
		
		res.json(updatedSession);
	} catch (error) {
		console.error("Erreur lors de la liaison session-réservation:", error);
		
		if (error instanceof Error) {
			if (error.message === "Session non trouvée" || 
				error.message === "Réservation de salle non trouvée") {
				res.status(404).json({ error: error.message });
				return;
			}
			
			if (error.message.includes("Les horaires")) {
				res.status(400).json({ error: error.message });
				return;
			}
		}
		
		res.status(500).json({ error: "Erreur serveur" });
	}
});

/**
 * @route PATCH /api/sessions/:id/unlink-room-reservation
 * @description Délier une session d'une réservation de salle
 */
sessionsRouter.patch("/:id/unlink-room-reservation", requireSessionManagement(), async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		
		const updatedSession = await sessionsService.unlinkSessionFromRoomReservation(id);
		
		res.json(updatedSession);
	} catch (error) {
		console.error("Erreur lors de la déliason session-réservation:", error);
		
		if (error instanceof Error && error.message === "Session non trouvée") {
			res.status(404).json({ error: error.message });
			return;
		}
		
		res.status(500).json({ error: "Erreur serveur" });
	}
});

/**
 * @route DELETE /api/sessions/:id
 * @description Supprimer une session
 */
sessionsRouter.delete(
	"/:id",
	requireSessionManagement(),
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			await sessionsService.deleteSession(id);

			res.status(204).send();
		} catch (error) {
			console.error("Erreur lors de la suppression de la session:", error);

			if (error instanceof Error) {
				if (error.message === "Session non trouvée") {
					res.status(404).json({ error: error.message });
					return;
				}

				if (error.message.includes("Impossible de supprimer")) {
					res.status(400).json({ error: error.message });
					return;
				}
			}

			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * @route PATCH /api/sessions/:id/status
 * @description Changer le statut d'une session
 */
sessionsRouter.patch(
	"/:id/status",
	requireSessionManagement(),
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const { status, notes } = req.body;

			const statusSchema = z.enum([
				"planifie",
				"en_cours",
				"termine",
				"annule",
			]);
			const statusResult = statusSchema.safeParse(status);

			if (!statusResult.success) {
				res.status(400).json({
					error: "Statut invalide",
					validStatuses: ["planifie", "en_cours", "termine", "annule"],
				});
				return;
			}

			const updatedSession = await sessionsService.updateSessionStatus(
				id,
				statusResult.data,
				notes,
			);

			res.json(updatedSession);
		} catch (error) {
			console.error("Erreur lors de la mise à jour du statut:", error);

			if (error instanceof Error && error.message === "Session non trouvée") {
				res.status(404).json({ error: error.message });
				return;
			}

			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * @route PATCH /api/sessions/:id/participants
 * @description Gérer les participants d'une session
 */
sessionsRouter.patch(
	"/:id/participants",
	requireSessionManagement(),
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const result = participantActionSchema.safeParse(req.body);

			if (!result.success) {
				res.status(400).json({
					error: "Données invalides",
					details: result.error.issues,
				});
				return;
			}

			const participantAction = {
				action: result.data.action as "add" | "remove",
				memberIds: [result.data.userId],
			};

			await sessionsService.manageParticipants(id, participantAction);

			res.json({ message: "Participants mis à jour avec succès" });
		} catch (error) {
			console.error("Erreur lors de la gestion des participants:", error);

			if (error instanceof Error) {
				if (error.message === "Session non trouvée") {
					res.status(404).json({ error: error.message });
					return;
				}

				if (error.message === "Capacité maximale atteinte") {
					res.status(400).json({ error: error.message });
					return;
				}
			}

			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

export default sessionsRouter;
