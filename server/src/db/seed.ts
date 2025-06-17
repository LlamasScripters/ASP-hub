import "dotenv/config";
import { resetDatabase, seedDatabase } from "./seeders/index.js";

async function main() {
	const command = process.argv[2];

	try {
		switch (command) {
			case "reset":
				console.log("Deleting all data...");
				await resetDatabase();
				console.log("Database reset successfully!");
				break;

			case "seed":
				console.log("Seeding data...");
				await seedDatabase();
				console.log("Seeding completed successfully!");
				break;

			case "fresh":
				console.log("Reset and seeding completed...");
				await resetDatabase();
				await seedDatabase();
				console.log("Fresh database created successfully!");
				break;

			default:
				console.log("Apply: npm run db:seed [reset|seed|fresh]");
				process.exit(1);
		}
	} catch (error) {
		console.error("Error during seeding:", error);
		process.exit(1);
	}
}

main();
