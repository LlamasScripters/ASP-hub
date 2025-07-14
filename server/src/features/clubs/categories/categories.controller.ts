import { Router } from "express";
import { CategoriesService } from "./categories.service.js";
import { 
	createCategorySchema, 
	updateCategorySchema, 
} from "./categories.schema.js";
import { requireAuth } from "@/middleware/auth.middleware.js";
import { requireRole } from "@/middleware/auth.middleware.js";
import type { Request, Response } from "express";

const router = Router();
const categoriesService = new CategoriesService();

/**
 * @route GET /api/categories
 * @description Récupère toutes les catégories avec pagination et filtres
 * @access Public
 */
//@ts-ignore
router.get("/", async (req: Request, res: Response) => {
	try {
		const result = await categoriesService.getCategories();
		res.json(result);
	} catch (error) {
		console.error("Erreur lors de la récupération des catégories:", error);
		res.status(500).json({ 
			message: "Erreur lors de la récupération des catégories" 
		});
	}
});

/**
 * @route GET /api/categories/:id
 * @description Récupère une catégorie par son ID
 * @access Public
 */
//@ts-ignore
router.get("/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const category = await categoriesService.getCategoryById(id);
		
		if (!category) {
			return res.status(404).json({ message: "Catégorie non trouvée" });
		}
		
		res.json(category);
	} catch (error) {
		console.error("Erreur lors de la récupération de la catégorie:", error);
		res.status(500).json({ 
			message: "Erreur lors de la récupération de la catégorie" 
		});
	}
});

/**
 * @route GET /api/categories/section/:sectionId
 * @description Récupère les catégories d'une section
 * @access Public
 */
router.get("/section/:sectionId", async (req: Request, res: Response) => {
	try {
		const { sectionId } = req.params;
		const categories = await categoriesService.getCategoriesBySection(sectionId);
		res.json(categories);
	} catch (error) {
		console.error("Erreur lors de la récupération des catégories de la section:", error);
		res.status(500).json({ 
			message: "Erreur lors de la récupération des catégories de la section" 
		});
	}
});

/**
 * @route GET /api/categories/:id/stats
 * @description Récupère les statistiques d'une catégorie
 * @access Public
 */
router.get("/:id/stats", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const stats = await categoriesService.getCategoryStats(id);
		res.json(stats);
	} catch (error) {
		console.error("Erreur lors de la récupération des statistiques:", error);
		res.status(500).json({ 
			message: "Erreur lors de la récupération des statistiques" 
		});
	}
});

/**
 * @route POST /api/categories
 * @description Créer une nouvelle catégorie
 * @access Private - Admin, Section Manager
 */
//@ts-ignore
router.post("/", requireAuth, requireRole("section_manager"), async (req: Request, res: Response) => {
	try {
		const body = createCategorySchema.safeParse(req.body);
		if (!body.success) {
			return res.status(400).json({ 
				message: "Données invalides",
				errors: body.error.issues 
			});
		}

		const category = await categoriesService.createCategory(body.data);
		res.status(201).json(category);
	} catch (error) {
		console.error("Erreur lors de la création de la catégorie:", error);
		res.status(500).json({ 
			message: "Erreur lors de la création de la catégorie" 
		});
	}
});

/**
 * @route PUT /api/categories/:id
 * @description Mettre à jour une catégorie
 * @access Private - Admin, Section Manager
 */
//@ts-ignore
router.put("/:id", requireAuth, requireRole("section_manager"), async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const body = updateCategorySchema.safeParse(req.body);
		if (!body.success) {
			return res.status(400).json({ 
				message: "Données invalides",
				errors: body.error.issues 
			});
		}

		const category = await categoriesService.updateCategory(id, body.data);
		res.json(category);
	} catch (error) {
		console.error("Erreur lors de la mise à jour de la catégorie:", error);
		if (error instanceof Error && error.message === "Catégorie non trouvée") {
			return res.status(404).json({ message: error.message });
		}
		res.status(500).json({ 
			message: "Erreur lors de la mise à jour de la catégorie" 
		});
	}
});

/**
 * @route PATCH /api/categories/:id/status
 * @description Activer/désactiver une catégorie
 * @access Private - Admin, Section Manager
 */
//@ts-ignore
router.patch("/:id/status", requireAuth, requireRole("section_manager"), async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { isActive } = req.body;
		
		if (typeof isActive !== "boolean") {
			return res.status(400).json({ 
				message: "Le statut doit être un booléen" 
			});
		}
		
		const category = await categoriesService.toggleCategoryStatus(id, isActive);
		res.json(category);
	} catch (error) {
		console.error("Erreur lors du changement de statut:", error);
		if (error instanceof Error && error.message === "Catégorie non trouvée") {
			return res.status(404).json({ message: error.message });
		}
		res.status(500).json({ 
			message: "Erreur lors du changement de statut" 
		});
	}
});

/**
 * @route DELETE /api/categories/:id
 * @description Supprimer une catégorie
 * @access Private - Admin, Section Manager
 */
//@ts-ignore
router.delete("/:id", requireAuth, requireRole("section_manager"), async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		
		// Vérifier si la catégorie peut être supprimée
		const canDelete = await categoriesService.canDeleteCategory(id);
		if (!canDelete) {
			return res.status(400).json({ 
				message: "Impossible de supprimer une catégorie qui contient des sessions" 
			});
		}
		
		await categoriesService.deleteCategory(id);
		res.status(204).send();
	} catch (error) {
		console.error("Erreur lors de la suppression de la catégorie:", error);
		if (error instanceof Error && error.message === "Catégorie non trouvée") {
			return res.status(404).json({ message: error.message });
		}
		if (error instanceof Error && error.message.includes("sessions")) {
			return res.status(400).json({ message: error.message });
		}
		res.status(500).json({ 
			message: "Erreur lors de la suppression de la catégorie" 
		});
	}
});

export default router;
