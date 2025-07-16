import type { db } from "@/db/index.js";
import { reactions } from "@/db/schema.js";

export async function seedReactions(database: typeof db) {
	console.log("Creating blog reactions...");

	try {
		// Only positive reactions for production
		const reactionData = [
			{ logoLink: "👍" }, // Like/Thumbs up
			{ logoLink: "❤️" }, // Love
			{ logoLink: "🎉" }, // Celebration
			{ logoLink: "💪" }, // Strong/Inspiring
			{ logoLink: "🔥" }, // Fire/Hot
			{ logoLink: "😊" }, // Happy
			{ logoLink: "👏" }, // Applause
			{ logoLink: "💯" }, // 100/Perfect
		];

		// Check if reactions already exist
		const existingReactions = await database.query.reactions.findMany();

		if (existingReactions.length > 0) {
			console.log("ℹ️  Reactions already exist, skipping seed");
			return existingReactions;
		}

		// Insert reactions
		const insertedReactions = await database
			.insert(reactions)
			.values(reactionData)
			.returning();

		console.log(`✅ Created ${insertedReactions.length} blog reactions`);
		return insertedReactions;
	} catch (error) {
		console.error("❌ Error creating blog reactions:", error);
		throw error;
	}
}
