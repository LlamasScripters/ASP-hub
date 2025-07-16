import "dotenv/config";

async function main() {
	const command = process.argv[2];
	const environment = process.argv[3] || "local";

	if (!["local", "production"].includes(environment)) {
		console.error("Error: Environment must be either 'local' or 'production'");
		console.log("Usage: npm run db:seed [reset|seed|fresh] [local|production]");
		process.exit(1);
	}

	const { resetDatabase, seedDatabase } = await import(
		`./seeders/data/${environment}/index.js`
	);

	try {
		switch (command) {
			case "reset":
				if (environment === "production" || resetDatabase === undefined) {
					console.error(
						"Error: Reset is not available for production environment",
					);
					process.exit(1);
				}
				console.log(`Deleting all data (${environment})...`);
				await resetDatabase();
				console.log("Database reset successfully!");
				break;

			case "seed":
				console.log(`Seeding data (${environment})...`);
				await seedDatabase();
				console.log("Seeding completed successfully!");
				break;

			case "fresh":
				if (environment === "production" || resetDatabase === undefined) {
					console.error(
						"Error: Fresh is not available for production environment",
					);
					process.exit(1);
				}
				console.log(`Reset and seeding completed (${environment})...`);
				await resetDatabase();
				await seedDatabase();
				console.log("Fresh database created successfully!");
				break;

			default:
				console.log(
					"Usage: npm run db:seed [reset|seed|fresh] [local|production]",
				);
				process.exit(1);
		}
	} catch (error) {
		console.error("Error during seeding:", error);
		process.exit(1);
	}
}

main();
