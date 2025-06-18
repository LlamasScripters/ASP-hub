import { Router, Request, Response } from "express";
import { tagsService } from "./tags.service.js";

const tagsRouter = Router();

// GET /api/tags - Get all tags
tagsRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const tags = await tagsService.getAllTags();
    res.json(tags);
  } catch (error) {
    console.error("Erreur lors de la récupération des tags:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// GET /api/tags/search - Search tags
tagsRouter.get("/search", async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      res.status(400).json({ error: "Query de recherche requise" });
      return;
    }

    const tags = await tagsService.searchTags(q);
    res.json(tags);
  } catch (error) {
    console.error("Erreur lors de la recherche de tags:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// GET /api/tags/:id - Get tag by ID
tagsRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID de tag invalide" });
      return;
    }

    const tag = await tagsService.getTagById(id);
    if (!tag) {
      res.status(404).json({ error: "Tag non trouvé" });
      return;
    }

    res.json(tag);
  } catch (error) {
    console.error("Erreur lors de la récupération du tag:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// POST /api/tags - Create new tag (admin only)
tagsRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ error: "Nom du tag requis" });
      return;
    }

    if (name.trim().length > 50) {
      res.status(400).json({ error: "Le nom du tag ne peut pas dépasser 50 caractères" });
      return;
    }

    const tag = await tagsService.createTag({ name: name.trim() });
    res.status(201).json(tag);
  } catch (error) {
    console.error("Erreur lors de la création du tag:", error);
    if ((error as any)?.code === '23505') {
      res.status(409).json({ error: "Ce nom de tag existe déjà" });
      return;
    }
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// PUT /api/tags/:id - Update tag (admin only)
tagsRouter.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID de tag invalide" });
      return;
    }

    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ error: "Nom du tag requis" });
      return;
    }

    if (name.trim().length > 50) {
      res.status(400).json({ error: "Le nom du tag ne peut pas dépasser 50 caractères" });
      return;
    }

    const tag = await tagsService.updateTag(id, { name: name.trim() });
    if (!tag) {
      res.status(404).json({ error: "Tag non trouvé" });
      return;
    }

    res.json(tag);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du tag:", error);
    if ((error as any)?.code === '23505') {
      res.status(409).json({ error: "Ce nom de tag existe déjà" });
      return;
    }
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// DELETE /api/tags/:id - Delete tag (admin only)
tagsRouter.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "ID de tag invalide" });
      return;
    }

    const deleted = await tagsService.deleteTag(id);
    if (!deleted) {
      res.status(404).json({ error: "Tag non trouvé" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression du tag:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

export default tagsRouter;