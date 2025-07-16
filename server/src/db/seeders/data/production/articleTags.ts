import type { db } from "@/db/index.js";
import {
	type SelectArticle,
	type SelectTag,
	articleTags,
} from "@/db/schema.js";

export async function seedArticleTags(
	database: typeof db,
	articles: SelectArticle[],
	tags: SelectTag[],
) {
	console.log("Creating article-tag relationships...");

	try {
		// Check if article tags already exist
		const existingArticleTags = await database.query.articleTags.findMany();

		if (existingArticleTags.length > 0) {
			console.log("ℹ️  Article tags already exist, skipping seed");
			return existingArticleTags;
		}

		// Helper function to find tag by name
		const findTagByName = (name: string) =>
			tags.find((tag) => tag.name === name) as SelectTag;

		// Define article-tag relationships
		const articleTagData = [
			// "Bienvenue sur le nouveau blog ASP Hub"
			{
				articleId: articles[0].id,
				tagId: findTagByName("actualités")?.id,
			},
			{
				articleId: articles[0].id,
				tagId: findTagByName("communauté")?.id,
			},
			{
				articleId: articles[0].id,
				tagId: findTagByName("sport")?.id,
			},

			// "5 conseils pour améliorer vos performances sportives"
			{
				articleId: articles[1].id,
				tagId: findTagByName("conseils")?.id,
			},
			{
				articleId: articles[1].id,
				tagId: findTagByName("performance")?.id,
			},
			{
				articleId: articles[1].id,
				tagId: findTagByName("entraînement")?.id,
			},
			{
				articleId: articles[1].id,
				tagId: findTagByName("nutrition")?.id,
			},
			{
				articleId: articles[1].id,
				tagId: findTagByName("récupération")?.id,
			},

			// "L'importance de l'échauffement avant le sport"
			{
				articleId: articles[2].id,
				tagId: findTagByName("échauffement")?.id,
			},
			{
				articleId: articles[2].id,
				tagId: findTagByName("prévention")?.id,
			},
			{
				articleId: articles[2].id,
				tagId: findTagByName("santé")?.id,
			},
			{
				articleId: articles[2].id,
				tagId: findTagByName("conseils")?.id,
			},
			{
				articleId: articles[2].id,
				tagId: findTagByName("sport")?.id,
			},
		];

		// Insert article tags
		const insertedArticleTags = await database
			.insert(articleTags)
			.values(articleTagData)
			.returning();

		console.log(
			`✅ Created ${insertedArticleTags.length} article-tag relationships`,
		);
		return insertedArticleTags;
	} catch (error) {
		console.error("❌ Error creating article-tag relationships:", error);
		throw error;
	}
}
