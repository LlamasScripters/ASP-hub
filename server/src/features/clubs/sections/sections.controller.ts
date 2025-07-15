import { UserRole } from "@/lib/roles.js";
import { requireAuth, requireRole } from "@/middleware/auth.middleware.js";
import { requireMemberAccess } from "@/middleware/role-specific.middleware.js";
import { requireSectionAccess } from "@/middleware/section.middleware.js";
import { type Request, type Response, Router } from "express";
import {
	type CreateSectionData,
	type UpdateSectionData,
	createSectionSchema,
	updateSectionSchema,
} from "./sections.schema.js";
import { sectionsService } from "./sections.service.js";

const sectionsRouter = Router();

// Authentication required for all section routes
sectionsRouter.use(requireAuth);

/**
 * GET /api/sections
 * Récupère toutes les sections avec pagination et filtres
 * Accessible aux membres pour visualiser les sections
 */
sectionsRouter.get(
	"/",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		try {
			const result = await sectionsService.getAll();
			res.json(result);
		} catch (error) {
			console.error("Erreur lors de la récupération des sections:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * GET /api/sections/:id
 * Récupère une section par son ID
 * Accessible aux membres pour visualiser les détails d'une section
 */
sectionsRouter.get(
	"/:id",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		try {
			const section = await sectionsService.getById(req.params.id);
			if (!section) {
				res.status(404).json({ error: "Section non trouvée" });
				return;
			}

			res.json(section);
		} catch (error) {
			console.error("Erreur lors de la récupération de la section:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * POST /api/sections
 * Crée une nouvelle section
 * Accessible aux administrateurs uniquement
 */
sectionsRouter.post(
	"/",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const data = createSectionSchema.safeParse(req.body);
			if (!data.success) {
				res.status(400).json({ error: data.error.flatten() });
				return;
			}

			const section = await sectionsService.create(data.data);
			res.status(201).json(section);
		} catch (error) {
			console.error("Erreur lors de la création de la section:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * PUT /api/sections/:id
 * Met à jour une section
 * Accessible aux administrateurs et au responsable de la section
 */
sectionsRouter.put(
	"/:id",
	requireSectionAccess(),
	async (req: Request, res: Response) => {
		try {
			const data = updateSectionSchema.safeParse(req.body);
			if (!data.success) {
				res.status(400).json({ error: data.error.flatten() });
				return;
			}

			const section = await sectionsService.update(req.params.id, data.data);
			if (!section) {
				res.status(404).json({ error: "Section non trouvée" });
				return;
			}

			res.json(section);
		} catch (error) {
			console.error("Erreur lors de la mise à jour de la section:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * DELETE /api/sections/:id
 * Supprime logiquement une section (marque comme inactive)
 * Accessible aux administrateurs uniquement
 */
sectionsRouter.delete(
	"/:id",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const success = await sectionsService.delete(req.params.id);
			if (!success) {
				res.status(404).json({ error: "Section non trouvée" });
				return;
			}

			res.status(204).send();
		} catch (error) {
			console.error("Erreur lors de la suppression de la section:", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

/**
 * GET /api/sections/club/:clubId
 * Récupère les sections d'un club spécifique
 * Accessible aux membres pour visualiser les sections d'un club
 */
sectionsRouter.get(
	"/club/:clubId",
	requireMemberAccess(),
	async (req: Request, res: Response) => {
		try {
			const clubId = req.params.clubId;
			if (!clubId) {
				res.status(400).json({ error: "ID du club requis" });
				return;
			}

			const sections = await sectionsService.getByClubId(clubId);
			res.json(sections);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des sections du club:",
				error,
			);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},
);

export default sectionsRouter;
