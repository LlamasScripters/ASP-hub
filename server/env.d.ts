declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		DATABASE_URL: string;
		MONGO_URI: string;
		BETTER_AUTH_SECRET: string;
		BETTER_AUTH_URL: string;
		HOST: string;
		BREVO_API_KEY: string;
		S3_ACCESS_KEY_ID: string;
		S3_SECRET_ACCESS_KEY: string;
		S3_REGION: string;
		S3_BUCKET: string;
		S3_ENDPOINT: string;
	}
}
