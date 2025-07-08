import { type Request, type Response, Router } from "express";
import {
	type CreateCommentData,
	type UpdateCommentData,
	commentsService,
} from "./comments.service.js";

const commentsRouter = Router();

// GET /api/comments/article/:articleId - Get all comments for an article
commentsRouter.get(
	"/article/:articleId",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { articleId } = req.params;
			const comments = await commentsService.getCommentsByArticleId(articleId);
			res.json(comments);
		} catch (error) {
			console.error("Erreur lors de la récupération des commentaires:", error);
			res.status(500).json({ error: "Erreur interne du serveur" });
		}
	},
);

// GET /api/comments/:id - Get comment by ID
commentsRouter.get(
	"/:id",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const comment = await commentsService.getCommentById(id);

			if (!comment) {
				res.status(404).json({ error: "Commentaire non trouvé" });
				return;
			}

			res.json(comment);
		} catch (error) {
			console.error("Erreur lors de la récupération du commentaire:", error);
			res.status(500).json({ error: "Erreur interne du serveur" });
		}
	},
);

// POST /api/comments - Create new comment
commentsRouter.post("/", async (req: Request, res: Response): Promise<void> => {
	try {
		const { articleId, authorId, content }: CreateCommentData = req.body;

		// Validation
		if (!articleId || !authorId || !content) {
			res
				.status(400)
				.json({ error: "articleId, authorId et content sont requis" });
			return;
		}

		if (typeof content !== "string" || content.trim().length === 0) {
			res
				.status(400)
				.json({ error: "Le contenu du commentaire ne peut pas être vide" });
			return;
		}

		if (content.trim().length > 1000) {
			res
				.status(400)
				.json({ error: "Le commentaire ne peut pas dépasser 1000 caractères" });
			return;
		}

		const commentData: CreateCommentData = {
			articleId,
			authorId,
			content: content.trim(),
		};

		const comment = await commentsService.createComment(commentData);
		res.status(201).json(comment);
	} catch (error) {
		console.error("Erreur lors de la création du commentaire:", error);
		res.status(500).json({ error: "Erreur interne du serveur" });
	}
});

// PUT /api/comments/:id - Update comment
commentsRouter.put(
	"/:id",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const { content, state }: UpdateCommentData = req.body;

			// Validation
			if (content !== undefined) {
				if (typeof content !== "string" || content.trim().length === 0) {
					res
						.status(400)
						.json({ error: "Le contenu du commentaire ne peut pas être vide" });
					return;
				}

				if (content.trim().length > 1000) {
					res.status(400).json({
						error: "Le commentaire ne peut pas dépasser 1000 caractères",
					});
					return;
				}
			}

			if (state !== undefined && !["published", "archived"].includes(state)) {
				res
					.status(400)
					.json({ error: "L'état doit être 'published' ou 'archived'" });
				return;
			}

			const updateData: UpdateCommentData = {};
			if (content !== undefined) updateData.content = content.trim();
			if (state !== undefined) updateData.state = state;

			const comment = await commentsService.updateComment(id, updateData);

			if (!comment) {
				res.status(404).json({ error: "Commentaire non trouvé" });
				return;
			}

			res.json(comment);
		} catch (error) {
			console.error("Erreur lors de la mise à jour du commentaire:", error);
			res.status(500).json({ error: "Erreur interne du serveur" });
		}
	},
);

// DELETE /api/comments/:id - Delete comment (soft delete)
commentsRouter.delete(
	"/:id",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const deleted = await commentsService.deleteComment(id);

			if (!deleted) {
				res.status(404).json({ error: "Commentaire non trouvé" });
				return;
			}

			res.status(204).send();
		} catch (error) {
			console.error("Erreur lors de la suppression du commentaire:", error);
			res.status(500).json({ error: "Erreur interne du serveur" });
		}
	},
);

// GET /api/comments/article/:articleId/count - Get comments count for an article
commentsRouter.get(
	"/article/:articleId/count",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { articleId } = req.params;
			const count =
				await commentsService.getCommentsCountByArticleId(articleId);
			res.json({ count });
		} catch (error) {
			console.error("Erreur lors du comptage des commentaires:", error);
			res.status(500).json({ error: "Erreur interne du serveur" });
		}
	},
);

// ADMIN ROUTES

// GET /api/comments/admin/article/:articleId - Get ALL comments for an article (including archived) - ADMIN ONLY
commentsRouter.get(
	"/admin/article/:articleId",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { articleId } = req.params;
			const comments =
				await commentsService.getAllCommentsByArticleId(articleId);
			res.json(comments);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des commentaires (admin):",
				error,
			);
			res.status(500).json({ error: "Erreur interne du serveur" });
		}
	},
);

// PUT /api/comments/admin/:id/hide - Hide comment (set state to archived) - ADMIN ONLY
commentsRouter.put(
	"/admin/:id/hide",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const comment = await commentsService.updateComment(id, {
				state: "archived",
			});

			if (!comment) {
				res.status(404).json({ error: "Commentaire non trouvé" });
				return;
			}

			res.json({ message: "Commentaire masqué avec succès", comment });
		} catch (error) {
			console.error("Erreur lors du masquage du commentaire:", error);
			res.status(500).json({ error: "Erreur interne du serveur" });
		}
	},
);

// PUT /api/comments/admin/:id/show - Show comment (set state to published) - ADMIN ONLY
commentsRouter.put(
	"/admin/:id/show",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const comment = await commentsService.updateComment(id, {
				state: "published",
			});

			if (!comment) {
				res.status(404).json({ error: "Commentaire non trouvé" });
				return;
			}

			res.json({ message: "Commentaire affiché avec succès", comment });
		} catch (error) {
			console.error("Erreur lors de l'affichage du commentaire:", error);
			res.status(500).json({ error: "Erreur interne du serveur" });
		}
	},
);

// GET /api/comments/admin/all - Get ALL comments across all articles - ADMIN ONLY
commentsRouter.get(
	"/admin/all",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const comments = await commentsService.getAllComments();
			res.json(comments);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération de tous les commentaires:",
				error,
			);
			res.status(500).json({ error: "Erreur interne du serveur" });
		}
	},
);

export default commentsRouter;
