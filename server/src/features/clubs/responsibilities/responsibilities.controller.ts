import { UserRole } from "@/lib/roles.js";
import { requireAuth, requireRole } from "@/middleware/auth.middleware.js";
import type { Request, Response } from "express";
import { Router } from "express";
import {
	assignCategoryCoachSchema,
	assignSectionManagerSchema,
} from "./responsibilities.schema.js";
import { ResponsibilitiesService } from "./responsibilities.service.js";

const responsibilitiesRouter = Router();
const responsibilitiesService = new ResponsibilitiesService();

// Routes protégées par authentification
responsibilitiesRouter.use(requireAuth);

/**
 * @route POST /api/responsibilities/sections/:sectionId/manager
 * @description Assigner un responsable de section
 */
responsibilitiesRouter.post(
	"/sections/:sectionId/manager",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const { sectionId } = req.params;
			const result = assignSectionManagerSchema.safeParse(req.body);

			if (!result.success) {
				res.status(400).json({
					error: "Données invalides",
					details: result.error.issues,
				});
				return;
			}

			const { userId } = result.data;
			const responsibility = await responsibilitiesService.assignSectionManager(
				sectionId,
				userId,
			);

			res.status(201).json(responsibility);
		} catch (error) {
			console.error("Erreur lors de l'assignation du responsable:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de l'assignation du responsable" });
		}
	},
);

/**
 * @route DELETE /api/responsibilities/sections/:sectionId/manager
 * @description Supprimer un responsable de section
 */
responsibilitiesRouter.delete(
	"/sections/:sectionId/manager",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const { sectionId } = req.params;

			await responsibilitiesService.removeSectionManager(sectionId);

			res.status(204).send();
		} catch (error) {
			console.error("Erreur lors de la suppression du responsable:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la suppression du responsable" });
		}
	},
);

/**
 * @route GET /api/responsibilities/sections/:sectionId
 * @description Récupérer les responsabilités d'une section
 */
responsibilitiesRouter.get(
	"/sections/:sectionId",
	async (req: Request, res: Response) => {
		try {
			const { sectionId } = req.params;

			const responsibilities =
				await responsibilitiesService.getSectionResponsibilities(sectionId);

			res.json(responsibilities);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des responsabilités:",
				error,
			);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des responsabilités" });
		}
	},
);

/**
 * @route POST /api/responsibilities/categories/:categoryId/coach
 * @description Assigner un coach à une catégorie
 */
responsibilitiesRouter.post(
	"/categories/:categoryId/coach",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const { categoryId } = req.params;
			const result = assignCategoryCoachSchema.safeParse(req.body);

			if (!result.success) {
				res.status(400).json({
					error: "Données invalides",
					details: result.error.issues,
				});
				return;
			}

			const { userId } = result.data;
			const responsibility = await responsibilitiesService.assignCategoryCoach(
				categoryId,
				userId,
			);

			res.status(201).json(responsibility);
		} catch (error) {
			console.error("Erreur lors de l'assignation du coach:", error);
			res.status(500).json({ error: "Erreur lors de l'assignation du coach" });
		}
	},
);

/**
 * @route DELETE /api/responsibilities/categories/:categoryId/coach
 * @description Supprimer un coach d'une catégorie
 */
responsibilitiesRouter.delete(
	"/categories/:categoryId/coach",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const { categoryId } = req.params;

			await responsibilitiesService.removeCategoryCoach(categoryId);

			res.status(204).send();
		} catch (error) {
			console.error("Erreur lors de la suppression du coach:", error);
			res.status(500).json({ error: "Erreur lors de la suppression du coach" });
		}
	},
);

/**
 * @route GET /api/responsibilities/categories/:categoryId
 * @description Récupérer les responsabilités d'une catégorie
 */
responsibilitiesRouter.get(
	"/categories/:categoryId",
	async (req: Request, res: Response) => {
		try {
			const { categoryId } = req.params;

			const responsibilities =
				await responsibilitiesService.getCategoryResponsibilities(categoryId);

			res.json(responsibilities);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des responsabilités:",
				error,
			);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des responsabilités" });
		}
	},
);

/**
 * @route GET /api/responsibilities/users/:userId
 * @description Récupérer les responsabilités d'un utilisateur
 */
responsibilitiesRouter.get(
	"/users/:userId",
	async (req: Request, res: Response) => {
		try {
			const { userId } = req.params;

			const responsibilities =
				await responsibilitiesService.getUserResponsibilities(userId);

			res.json(responsibilities);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des responsabilités:",
				error,
			);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des responsabilités" });
		}
	},
);

responsibilitiesRouter.get(
	"/eligible-users",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const users = await responsibilitiesService.getEligibleUsers();
			res.json(users);
		} catch (error) {
			console.error("Erreur getEligibleUsers:", error);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des utilisateurs" });
		}
	},
);

// Obtenir les utilisateurs éligibles pour une section spécifique (inclut le responsable actuel)
responsibilitiesRouter.get(
	"/eligible-users/section",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const users = await responsibilitiesService.getEligibleUsersForSection();
			res.json(users);
		} catch (error) {
			console.error("Erreur getEligibleUsersForSection:", error);
			res.status(500).json({
				error:
					"Erreur lors de la récupération des utilisateurs pour la section",
			});
		}
	},
);

responsibilitiesRouter.get(
	"/eligible-users/section/:sectionId",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const sectionId = req.params.sectionId;
			const users =
				await responsibilitiesService.getEligibleUsersForSection(sectionId);
			res.json(users);
		} catch (error) {
			console.error("Erreur getEligibleUsersForSection:", error);
			res.status(500).json({
				error:
					"Erreur lors de la récupération des utilisateurs pour la section",
			});
		}
	},
);

// Obtenir les utilisateurs éligibles pour une catégorie spécifique (inclut le coach actuel)
responsibilitiesRouter.get(
	"/eligible-users/category",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const users = await responsibilitiesService.getEligibleUsersForCategory();
			res.json(users);
		} catch (error) {
			console.error("Erreur getEligibleUsersForCategory:", error);
			res.status(500).json({
				error:
					"Erreur lors de la récupération des utilisateurs pour la catégorie",
			});
		}
	},
);

responsibilitiesRouter.get(
	"/eligible-users/category/:categoryId",
	requireRole(UserRole.ADMIN),
	async (req: Request, res: Response) => {
		try {
			const categoryId = req.params.categoryId;
			const users =
				await responsibilitiesService.getEligibleUsersForCategory(categoryId);
			res.json(users);
		} catch (error) {
			console.error("Erreur getEligibleUsersForCategory:", error);
			res.status(500).json({
				error:
					"Erreur lors de la récupération des utilisateurs pour la catégorie",
			});
		}
	},
);

export default responsibilitiesRouter;
