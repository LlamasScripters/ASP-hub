import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./migrations/local",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: "postgresql://postgres:password@localhost:5432/asp_db",
	},
	verbose: true,
});
