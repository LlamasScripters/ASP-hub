import { db } from "@/db/index.js";
import * as schema from "@/db/schema.js";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins";
import { sendConfirmationEmail } from "./email.js";

export const auth = betterAuth({
	appName: "ASP Hub",
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
		schema,
	}),
	trustedOrigins: [process.env.CLIENT_URL],
	user: {
		additionalFields: {
			acceptTerms: {
				type: "boolean",
				required: true,
			},
			firstName: {
				type: "string",
				required: true,
			},
			lastName: {
				type: "string",
				required: true,
			},
			dateOfBirth: {
				type: "date",
				required: false,
			},
		},
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
	},
	advanced: {
		database: {
			generateId: false,
		},
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: false,
		sendVerificationEmail: async ({ user, url, token }) => {
			await sendConfirmationEmail(
				{
					email: user.email,
					fullname: user.name,
				},
				token,
			);
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			mapProfileToUser: (profile) => ({
				firstName: profile.given_name,
				lastName: profile.family_name,
				name: `${profile.given_name} ${profile.family_name}`,
				acceptTerms: true,
			}),
		},
	},
	plugins: [
		twoFactor({
			issuer: "ASP Hub",
		}),
	],
});
