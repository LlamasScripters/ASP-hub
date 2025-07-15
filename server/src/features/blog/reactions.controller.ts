import { auth } from "@/lib/auth.js";
import { requireAuth } from "@/middleware/auth.middleware.js";
import { requireMemberAccess } from "@/middleware/role-specific.middleware.js";
import { fromNodeHeaders } from "better-auth/node";
import { type Request, type Response, Router } from "express";
import { z } from "zod";
import { reactionsService } from "./reactions.service.js";

const reactionsRouter = Router();
reactionsRouter.use(requireAuth);

const articleReactionSchema = z.object({
	articleId: z.string().uuid(),
	reactionId: z.number().int().positive(),
});

const commentReactionSchema = z.object({
	commentId: z.string().uuid(),
	reactionId: z.number().int().positive(),
});

// GET all reaction types
reactionsRouter.get(
	"/types",
	requireMemberAccess(),
	async (_req: Request, res: Response): Promise<void> => {
		try {
			const reactionTypes = await reactionsService.getAllReactionTypes();
			res.json({ success: true, data: reactionTypes });
		} catch (error) {
			console.error("Error fetching reaction types:", error);
			res.status(500).json({
				success: false,
				error: "Erreur lors de la récupération des types de réactions",
			});
		}
	},
);

// GET article reactions
reactionsRouter.get(
	"/articles/:articleId",
	requireMemberAccess(),
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { articleId } = req.params;

			if (!articleId) {
				res.status(400).json({
					success: false,
					error: "ID de l'article requis",
				});
				return;
			}

			const reactions = await reactionsService.getArticleReactions(articleId);
			res.json({ success: true, data: reactions });
		} catch (error) {
			console.error("Error fetching article reactions:", error);
			res.status(500).json({
				success: false,
				error: "Erreur lors de la récupération des réactions",
			});
		}
	},
);

// GET comment reactions
reactionsRouter.get(
	"/comments/:commentId",
	requireMemberAccess(),
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { commentId } = req.params;

			if (!commentId) {
				res.status(400).json({
					success: false,
					error: "ID du commentaire requis",
				});
				return;
			}

			const reactions = await reactionsService.getCommentReactions(commentId);
			res.json({ success: true, data: reactions });
		} catch (error) {
			console.error("Error fetching comment reactions:", error);
			res.status(500).json({
				success: false,
				error: "Erreur lors de la récupération des réactions",
			});
		}
	},
);

// GET user article reaction
reactionsRouter.get(
	"/articles/:articleId/user",
	requireMemberAccess(),
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { articleId } = req.params;
			const session = await auth.api.getSession({
				headers: fromNodeHeaders(req.headers),
			});
			const userId = session?.user?.id;

			if (!userId) {
				res.status(401).json({
					success: false,
					error: "Utilisateur non authentifié",
				});
				return;
			}

			if (!articleId) {
				res.status(400).json({
					success: false,
					error: "ID de l'article requis",
				});
				return;
			}

			const reaction = await reactionsService.getUserArticleReaction(
				articleId,
				userId,
			);
			res.json({ success: true, data: reaction });
		} catch (error) {
			console.error("Error fetching user article reaction:", error);
			res.status(500).json({
				success: false,
				error: "Erreur lors de la récupération de la réaction utilisateur",
			});
		}
	},
);

// GET user comment reaction
reactionsRouter.get(
	"/comments/:commentId/user",
	requireMemberAccess(),
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { commentId } = req.params;
			const session = await auth.api.getSession({
				headers: fromNodeHeaders(req.headers),
			});
			const userId = session?.user?.id;

			if (!userId) {
				res.status(401).json({
					success: false,
					error: "Utilisateur non authentifié",
				});
				return;
			}

			if (!commentId) {
				res.status(400).json({
					success: false,
					error: "ID du commentaire requis",
				});
				return;
			}

			const reaction = await reactionsService.getUserCommentReaction(
				commentId,
				userId,
			);
			res.json({ success: true, data: reaction });
		} catch (error) {
			console.error("Error fetching user comment reaction:", error);
			res.status(500).json({
				success: false,
				error: "Erreur lors de la récupération de la réaction utilisateur",
			});
		}
	},
);

// POST/Toggle article reaction
reactionsRouter.post(
	"/articles",
	requireMemberAccess(),
	async (req: Request, res: Response): Promise<void> => {
		try {
			const session = await auth.api.getSession({
				headers: fromNodeHeaders(req.headers),
			});
			const userId = session?.user?.id;

			if (!userId) {
				res.status(401).json({
					success: false,
					error: "Utilisateur non authentifié",
				});
				return;
			}

			const validation = articleReactionSchema.safeParse(req.body);
			if (!validation.success) {
				res.status(400).json({
					success: false,
					error: "Données invalides",
					details: validation.error.errors,
				});
				return;
			}

			const { articleId, reactionId } = validation.data;

			const result = await reactionsService.toggleArticleReaction({
				articleId,
				authorId: userId,
				reactionId,
			});

			res.json({ success: true, data: result });
		} catch (error) {
			console.error("Error toggling article reaction:", error);
			res.status(500).json({
				success: false,
				error: "Erreur lors de la gestion de la réaction",
			});
		}
	},
);

// POST/Toggle comment reaction
reactionsRouter.post(
	"/comments",
	requireMemberAccess(),
	async (req: Request, res: Response): Promise<void> => {
		try {
			const session = await auth.api.getSession({
				headers: fromNodeHeaders(req.headers),
			});
			const userId = session?.user?.id;

			if (!userId) {
				res.status(401).json({
					success: false,
					error: "Utilisateur non authentifié",
				});
				return;
			}

			const validation = commentReactionSchema.safeParse(req.body);
			if (!validation.success) {
				res.status(400).json({
					success: false,
					error: "Données invalides",
					details: validation.error.errors,
				});
				return;
			}

			const { commentId, reactionId } = validation.data;

			const result = await reactionsService.toggleCommentReaction({
				commentId,
				authorId: userId,
				reactionId,
			});

			res.json({ success: true, data: result });
		} catch (error) {
			console.error("Error toggling comment reaction:", error);
			res.status(500).json({
				success: false,
				error: "Erreur lors de la gestion de la réaction",
			});
		}
	},
);

export default reactionsRouter;
