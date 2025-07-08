import path from "node:path";
import { parseArgs } from "node:util";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function main() {
	const migrationsDefaultFolder = path.resolve("/app/drizzle");

	const args = parseArgs({
		options: {
			"drizzle-folder": {
				type: "string",
				short: "d",
				default: migrationsDefaultFolder,
			},
			"database-url": {
				type: "string",
				short: "u",
				default: process.env.DATABASE_URL,
			},
			help: {
				type: "boolean",
				short: "h",
				default: false,
			},
		},
	});

	if (args.values.help) {
		console.log("Usage: migrate [options]");
		console.log("Options:");
		console.log(
			"  -d, --drizzle-folder <path>  Path to migrations folder (default: /app/drizzle)",
		);
		console.log(
			"  -u, --database-url   <url>   Database URL (default: process.env.DATABASE_URL)",
		);
		console.log("  -h, --help                   Show this help message");
		return;
	}

	const migrationsFolder = args.values["drizzle-folder"];
	const databaseUrl = args.values["database-url"];

	const db = drizzle(databaseUrl);

	await migrate(db, {
		migrationsFolder,
	});
}

main().catch((err) => {
	if (err instanceof DrizzleQueryError) {
		if (err.cause && "code" in err.cause && err.cause.code === "ENOTFOUND") {
			console.error("Database unreachable. Please check your database URL.");
			return;
		}

		console.error(err.message);
		process.exit(1);
	}

	console.error(err);
	process.exit(1);
});
