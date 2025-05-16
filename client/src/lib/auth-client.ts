import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "../../../server/src/lib/auth";

type ErrorTypes = Partial<Record<keyof typeof authClient.$ERROR_CODES, string>>;

const errorCodes = {
	USER_ALREADY_EXISTS: "Cet utilisateur existe déjà",
} satisfies ErrorTypes;

export const getSignInErrorMessage = (code: string) => {
	if (code in errorCodes) {
		return errorCodes[code as keyof typeof errorCodes];
	}
	return "";
};

export const authClient = createAuthClient({
	baseURL: "http://localhost:8000",
	plugins: [inferAdditionalFields<typeof auth>()],
});

export type UserLoggedIn = (typeof authClient.$Infer)["Session"]["user"];
