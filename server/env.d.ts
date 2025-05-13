declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		NODE_ENV: string;
		DATABASE_URL: string;
		MONGO_URI: string;
	}
}
