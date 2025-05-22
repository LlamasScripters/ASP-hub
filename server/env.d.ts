declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		DATABASE_URL: string;
		MONGO_URI: string;
		BETTER_AUTH_SECRET: string;
		BETTER_AUTH_URL: string;
		CLIENT_URL: string;
		BREVO_API_KEY: string;
	}
}
