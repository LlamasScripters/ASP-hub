import { UserRole } from "@/lib/roles.js";
import { requireAuth, requireRole } from "@/middleware/auth.middleware.js";
import { requireMemberAccess } from "@/middleware/role-specific.middleware.js";
import { type Request, type Response, Router } from "express";
import {
	type ClubParamsData,
	type CreateClubData,
	type UpdateClubData,
	clubParamsSchema,
	createClubSchema,
	updateClubSchema,
} from "./clubs.schema.js";
import { clubsService } from "./clubs.service.js";

const clubsRouter = Router();

// Authentication required for all club routes
clubsRouter.use(requireAuth);

/**
 * GET /api/clubs
 * Récupère tous les clubs (dans notre cas il y en a un seul)
 * Accessible aux membres pour visualiser les clubs
 */
clubsRouter.get(
	"/",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		try {
			const result = await clubsService.getAll();
			res.json(result);
		} catch (error) {
			console.error("Erreur lors de la récupération des clubs:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * GET /api/clubs/:id
 * Récupère un club par son ID
 * Accessible aux membres pour visualiser les détails d'un club
 */
clubsRouter.get(
	"/:id",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		try {
			const params = clubParamsSchema.safeParse(req.params);
			if (!params.success) {
				res.status(400).json({ error: params.error.flatten() });
				return;
			}

			const club = await clubsService.getById(params.data.id);
			if (!club) {
				res.status(404).json({ error: "Club non trouvé" });
				return;
			}

			res.json(club);
		} catch (error) {
			console.error("Erreur lors de la récupération du club:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * POST /api/clubs
 * Crée un nouveau club
 * Accessible aux administrateurs uniquement
 */
clubsRouter.post(
	"/",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const data = createClubSchema.safeParse(req.body);
			if (!data.success) {
				res.status(400).json({ error: data.error.flatten() });
				return;
			}

			const club = await clubsService.create(data.data);
			res.status(201).json(club);
		} catch (error) {
			console.error("Erreur lors de la création du club:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * PUT /api/clubs/:id
 * Met à jour un club
 * Accessible aux administrateurs uniquement
 */
clubsRouter.put(
	"/:id",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const params = clubParamsSchema.safeParse(req.params);
			if (!params.success) {
				res.status(400).json({ error: params.error.flatten() });
				return;
			}

			const data = updateClubSchema.safeParse(req.body);
			if (!data.success) {
				res.status(400).json({ error: data.error.flatten() });
				return;
			}

			const club = await clubsService.update(params.data.id, data.data);
			if (!club) {
				res.status(404).json({ error: "Club non trouvé" });
				return;
			}

			res.json(club);
		} catch (error) {
			console.error("Erreur lors de la mise à jour du club:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * DELETE /api/clubs/:id
 * Supprime logiquement un club (marque comme inactif)
 * Accessible aux administrateurs uniquement
 */
clubsRouter.delete(
	"/:id",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const params = clubParamsSchema.safeParse(req.params);
			if (!params.success) {
				res.status(400).json({ error: params.error.flatten() });
				return;
			}

			const success = await clubsService.delete(params.data.id);
			if (!success) {
				res.status(404).json({ error: "Club non trouvé" });
				return;
			}

			res.status(204).send();
		} catch (error) {
			console.error("Erreur lors de la suppression du club:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

export default clubsRouter;
