import { db } from "@/db/index.js";
import * as schema from "@/db/schema.js";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { admin, twoFactor } from "better-auth/plugins";
import { sendConfirmationEmail, sendResetPasswordEmail } from "./email.js";
import { checkPasswordStrength } from "./password.js";

const SESSION_DURATION = 5 * 60;
export const authConfig = {
	MIN_PASSWORD_LENGTH: 12,
} as const;

export const auth = betterAuth({
	appName: "ASP Hub",
	database: drizzleAdapter(db, {
		provider: "pg",
		usePlural: true,
		schema,
	}),
	trustedOrigins: [process.env.CLIENT_URL],
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "email-password"],
			allowDifferentEmails: false,
		},
	},
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
			maxAge: SESSION_DURATION,
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
		minPasswordLength: authConfig.MIN_PASSWORD_LENGTH,
		sendResetPassword: async ({ user, url, token }) => {
			await sendResetPasswordEmail(
				{
					email: user.email,
					name: user.name,
				},
				token,
			);
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: false,
		sendVerificationEmail: async ({ user, url, token }) => {
			await sendConfirmationEmail(
				{
					email: user.email,
					name: user.name,
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
	hooks: {
		before: createAuthMiddleware(async (ctx) => {
			if (!ctx.body) {
				return;
			}

			if (!ctx.body.newPassword) {
				return;
			}

			const { isStrong } = checkPasswordStrength(ctx.body.newPassword);

			if (!isStrong) {
				throw new APIError("UNPROCESSABLE_ENTITY", {
					message: "Password too weak",
					code: "PASSWORD_TOO_WEAK",
				});
			}
		}),
	},
	plugins: [
		twoFactor({
			issuer: "ASP Hub",
		}),
		admin(),
	],
});
