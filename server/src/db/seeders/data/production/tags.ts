import type { db } from "@/db/index.js";
import { tags } from "@/db/schema.js";

export async function seedTags(database: typeof db) {
	console.log("Creating blog tags...");

	try {
		// Check if tags already exist
		const existingTags = await database.query.tags.findMany();

		if (existingTags.length > 0) {
			console.log("ℹ️  Tags already exist, skipping seed");
			return existingTags;
		}

		const tagData = [
			{ name: "sport" },
			{ name: "entraînement" },
			{ name: "nutrition" },
			{ name: "santé" },
			{ name: "performance" },
			{ name: "conseils" },
			{ name: "échauffement" },
			{ name: "prévention" },
			{ name: "récupération" },
			{ name: "communauté" },
			{ name: "actualités" },
			{ name: "événements" },
		];

		// Insert tags
		const insertedTags = await database
			.insert(tags)
			.values(tagData)
			.returning();

		console.log(`✅ Created ${insertedTags.length} blog tags`);
		return insertedTags;
	} catch (error) {
		console.error("❌ Error creating blog tags:", error);
		throw error;
	}
}
