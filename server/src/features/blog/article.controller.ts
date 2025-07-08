import { type Request, type Response, Router } from "express";
import { articleService } from "./article.service.js";

const articleRouter = Router();

// GET all articles (admin only)
articleRouter.get("/", async (req: Request, res: Response): Promise<void> => {
	const articles = await articleService.getAll();
	res.json(articles);
});

// GET published articles only (public)
articleRouter.get(
	"/public",
	async (_req: Request, res: Response): Promise<void> => {
		const articles = await articleService.getPublishedArticles();
		res.json(articles);
	},
);

// GET single published article (public)
articleRouter.get(
	"/public/:id",
	async (req: Request, res: Response): Promise<void> => {
		const article = await articleService.getById(req.params.id);
		if (!article || article.state !== "published") {
			res.status(404).json({ error: "Not found" });
			return;
		}
		res.json(article);
	},
);

// GET one article
articleRouter.get(
	"/:id",
	async (req: Request, res: Response): Promise<void> => {
		const article = await articleService.getById(req.params.id);
		if (!article) {
			res.status(404).json({ error: "Not found" });
			return;
		}
		res.json(article);
	},
);

// CREATE article
articleRouter.post("/", async (req: Request, res: Response): Promise<void> => {
	const {
		title,
		content,
		headerImage,
		state,
		authorId,
		commentsEnabled,
		tags,
	} = req.body;
	if (!title || !content || !authorId) {
		res.status(400).json({ error: "Missing fields" });
		return;
	}
	const article = await articleService.create({
		title,
		content,
		headerImage,
		state,
		authorId,
		commentsEnabled,
		tags,
	});
	res.status(201).json(article);
});

// UPDATE article
articleRouter.put(
	"/:id",
	async (req: Request, res: Response): Promise<void> => {
		const updated = await articleService.update(req.params.id, req.body);
		if (!updated) {
			res.status(404).json({ error: "Not found" });
			return;
		}
		res.json(updated);
	},
);

// DELETE article
articleRouter.delete(
	"/:id",
	async (req: Request, res: Response): Promise<void> => {
		await articleService.delete(req.params.id);
		res.status(204).send();
	},
);

export default articleRouter;
