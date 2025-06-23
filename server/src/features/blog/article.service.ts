import { db } from "@/db/index.js";
import {
	type ArticleState,
	articleTags,
	articles,
	comments,
	tags,
	users,
} from "@/db/schema.js";
// article.service.ts
import { and, desc, eq, inArray, isNull } from "drizzle-orm";

export interface CreateArticleData {
	title: string;
	content: string;
	headerImage?: string;
	state?: ArticleState;
	authorId: string;
	tags?: string[];
	commentsEnabled?: boolean;
}

export interface UpdateArticleData {
	title?: string;
	content?: string;
	headerImage?: string;
	state?: ArticleState;
	tags?: string[];
	commentsEnabled?: boolean;
}

export const articleService = {
	// Liste tous les articles avec leurs tags
	async getAll() {
		const articlesWithTags = await db
			.select({
				id: articles.id,
				title: articles.title,
				headerImage: articles.headerImage,
				content: articles.content,
				state: articles.state,
				createdAt: articles.createdAt,
				updatedAt: articles.updatedAt,
				publishedAt: articles.publishedAt,
				authorId: articles.authorId,
				commentsEnabled: articles.commentsEnabled,
				deletedAt: articles.deletedAt,
				tagId: tags.id,
				tagName: tags.name,
			})
			.from(articles)
			.leftJoin(articleTags, eq(articles.id, articleTags.articleId))
			.leftJoin(tags, eq(articleTags.tagId, tags.id))
			.orderBy(desc(articles.createdAt));

		// Regrouper les articles avec leurs tags
		const articlesMap = new Map();

		for (const row of articlesWithTags) {
			if (!articlesMap.has(row.id)) {
				articlesMap.set(row.id, {
					id: row.id,
					title: row.title,
					headerImage: row.headerImage,
					content: row.content,
					state: row.state,
					createdAt: row.createdAt,
					updatedAt: row.updatedAt,
					publishedAt: row.publishedAt,
					authorId: row.authorId,
					commentsEnabled: row.commentsEnabled,
					deletedAt: row.deletedAt,
					tags: [],
				});
			}

			if (row.tagId !== null) {
				articlesMap.get(row.id).tags.push({
					id: row.tagId,
					name: row.tagName,
				});
			}
		}

		const articlesArray = Array.from(articlesMap.values());

		// Ajouter le nombre de commentaires pour chaque article
		for (const article of articlesArray) {
			const commentsCount = await db
				.select()
				.from(comments)
				.where(
					and(
						eq(comments.articleId, article.id),
						eq(comments.state, "published"),
						isNull(comments.deletedAt),
					),
				);

			// @ts-ignore - Adding commentsCount property dynamically
			article.commentsCount = commentsCount.length;
		}

		return articlesArray;
	},

	// Récupère un article par ID avec ses tags et l'auteur
	async getById(id: string) {
		const article = await db.select().from(articles).where(eq(articles.id, id));
		if (!article[0]) return null;

		// Récupérer les tags associés à l'article et les informations de l'auteur
		const articleWithTags = await db
			.select({
				id: articles.id,
				title: articles.title,
				headerImage: articles.headerImage,
				content: articles.content,
				state: articles.state,
				createdAt: articles.createdAt,
				updatedAt: articles.updatedAt,
				publishedAt: articles.publishedAt,
				authorId: articles.authorId,
				commentsEnabled: articles.commentsEnabled,
				deletedAt: articles.deletedAt,
				tagId: tags.id,
				tagName: tags.name,
				authorName: users.name,
				authorFirstName: users.firstName,
				authorLastName: users.lastName,
				authorImage: users.image,
			})
			.from(articles)
			.innerJoin(users, eq(articles.authorId, users.id))
			.leftJoin(articleTags, eq(articles.id, articleTags.articleId))
			.leftJoin(tags, eq(articleTags.tagId, tags.id))
			.where(eq(articles.id, id));

		if (articleWithTags.length === 0) return null;

		// Regrouper les tags et inclure les informations de l'auteur
		const result = {
			id: articleWithTags[0].id,
			title: articleWithTags[0].title,
			headerImage: articleWithTags[0].headerImage,
			content: articleWithTags[0].content,
			state: articleWithTags[0].state,
			createdAt: articleWithTags[0].createdAt,
			updatedAt: articleWithTags[0].updatedAt,
			publishedAt: articleWithTags[0].publishedAt,
			authorId: articleWithTags[0].authorId,
			commentsEnabled: articleWithTags[0].commentsEnabled,
			deletedAt: articleWithTags[0].deletedAt,
			author: {
				id: articleWithTags[0].authorId,
				name: articleWithTags[0].authorName,
				firstName: articleWithTags[0].authorFirstName,
				lastName: articleWithTags[0].authorLastName,
				image: articleWithTags[0].authorImage,
			},
			tags: articleWithTags
				.filter((row) => row.tagId !== null)
				.map((row) => ({
					id: row.tagId as string,
					name: row.tagName as string,
				})),
		};

		// Ajouter le nombre de commentaires
		const commentsCount = await db
			.select()
			.from(comments)
			.where(
				and(
					eq(comments.articleId, id),
					eq(comments.state, "published"),
					isNull(comments.deletedAt),
				),
			);

		// @ts-ignore - Adding commentsCount property dynamically
		result.commentsCount = commentsCount.length;

		return result;
	},

	// Crée un article avec tags
	async create(data: CreateArticleData) {
		const { tags: tagNames = [], ...articleData } = data;
		const [created] = await db
			.insert(articles)
			.values({
				...articleData,
				state: articleData.state ?? "draft",
				commentsEnabled: articleData.commentsEnabled ?? true,
			})
			.returning();

		// Gestion des tags
		if (tagNames.length > 0) {
			// Récupère les tags existants ou les crée
			const existingTags = await db
				.select()
				.from(tags)
				.where(inArray(tags.name, tagNames));
			const existingTagNames = existingTags.map((t) => t.name);
			const newTagNames = tagNames.filter((t) => !existingTagNames.includes(t));
			let newTags: typeof existingTags = [];
			if (newTagNames.length > 0) {
				newTags = await db
					.insert(tags)
					.values(newTagNames.map((name) => ({ name })))
					.returning();
			}
			const allTags = [...existingTags, ...newTags];
			// Lie les tags à l'article
			await db.insert(articleTags).values(
				allTags.map((tag) => ({
					articleId: created.id,
					tagId: tag.id,
				})),
			);
		}

		return created;
	},

	// Met à jour un article et ses tags
	async update(id: string, data: UpdateArticleData) {
		const { tags: tagNames, ...articleData } = data;
		const [updated] = await db
			.update(articles)
			.set({
				...articleData,
				updatedAt: new Date(),
			})
			.where(eq(articles.id, id))
			.returning();

		if (tagNames !== undefined) {
			// Supprime les anciennes liaisons
			await db.delete(articleTags).where(eq(articleTags.articleId, id));

			// Ajoute les nouvelles liaisons
			if (tagNames.length > 0) {
				const existingTags = await db
					.select()
					.from(tags)
					.where(inArray(tags.name, tagNames));
				const existingTagNames = existingTags.map((t) => t.name);
				const newTagNames = tagNames.filter(
					(t) => !existingTagNames.includes(t),
				);

				let newTags: typeof existingTags = [];
				if (newTagNames.length > 0) {
					newTags = await db
						.insert(tags)
						.values(newTagNames.map((name) => ({ name })))
						.returning();
				}

				const allTags = [...existingTags, ...newTags];

				if (allTags.length > 0) {
					await db.insert(articleTags).values(
						allTags.map((tag) => ({
							articleId: id,
							tagId: tag.id,
						})),
					);
				}
			}
		}

		return updated;
	},

	// Supprime un article
	async delete(id: string) {
		await db.delete(articles).where(eq(articles.id, id));
		return true;
	},
};
