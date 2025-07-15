import {
	adminClient,
	inferAdditionalFields,
	twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { API_BASE_URL } from "../config";

type ErrorCode = keyof typeof authClient.$ERROR_CODES | "PASSWORD_TOO_WEAK";

const errorCodes: readonly ErrorCode[] = Object.freeze([
	"USER_NOT_FOUND",
	"FAILED_TO_CREATE_USER",
	"FAILED_TO_CREATE_SESSION",
	"FAILED_TO_UPDATE_USER",
	"FAILED_TO_GET_SESSION",
	"INVALID_PASSWORD",
	"INVALID_EMAIL",
	"INVALID_EMAIL_OR_PASSWORD",
	"SOCIAL_ACCOUNT_ALREADY_LINKED",
	"PROVIDER_NOT_FOUND",
	"INVALID_TOKEN",
	"ID_TOKEN_NOT_SUPPORTED",
	"FAILED_TO_GET_USER_INFO",
	"USER_EMAIL_NOT_FOUND",
	"EMAIL_NOT_VERIFIED",
	"PASSWORD_TOO_SHORT",
	"PASSWORD_TOO_LONG",
	"PASSWORD_TOO_WEAK",
	"USER_ALREADY_EXISTS",
	"EMAIL_CAN_NOT_BE_UPDATED",
	"CREDENTIAL_ACCOUNT_NOT_FOUND",
	"SESSION_EXPIRED",
	"FAILED_TO_UNLINK_LAST_ACCOUNT",
	"ACCOUNT_NOT_FOUND",
]);

const errorCodesMap: Record<ErrorCode, string> = {
	USER_ALREADY_EXISTS: "Cet utilisateur existe déjà",
	INVALID_PASSWORD: "Mot de passe incorrect",
	INVALID_EMAIL: "Email incorrect",
	INVALID_EMAIL_OR_PASSWORD: "Email ou mot de passe incorrect",
	FAILED_TO_CREATE_USER: "Erreur lors de la création de l'utilisateur",
	FAILED_TO_CREATE_SESSION: "Erreur lors de la création de la session",
	FAILED_TO_GET_SESSION: "Erreur lors de la récupération de la session",
	FAILED_TO_UPDATE_USER: "Erreur lors de la mise à jour de l'utilisateur",
	FAILED_TO_GET_USER_INFO:
		"Erreur lors de la récupération des informations de l'utilisateur",
	USER_EMAIL_NOT_FOUND: "Email non trouvé",
	EMAIL_NOT_VERIFIED: "Email non vérifié",
	PASSWORD_TOO_SHORT: "Mot de passe trop court",
	PASSWORD_TOO_LONG: "Mot de passe trop long",
	PASSWORD_TOO_WEAK: "Mot de passe trop faible",
	SOCIAL_ACCOUNT_ALREADY_LINKED: "Compte social déjà lié",
	PROVIDER_NOT_FOUND: "Fournisseur non trouvé",
	INVALID_TOKEN: "Token invalide",
	ID_TOKEN_NOT_SUPPORTED: "Token ID non supporté",
	FAILED_TO_UNLINK_LAST_ACCOUNT:
		"Erreur lors de la déconnexion du dernier compte",
	ACCOUNT_NOT_FOUND: "Compte non trouvé",
	EMAIL_CAN_NOT_BE_UPDATED: "Email ne peut pas être mis à jour",
	CREDENTIAL_ACCOUNT_NOT_FOUND: "Compte de connexion non trouvé",
	SESSION_EXPIRED: "Session expirée",
	USER_NOT_FOUND: "Utilisateur non trouvé",
};

function isErrorCode(code: string): code is ErrorCode {
	return errorCodes.includes(code as ErrorCode);
}

export function getAuthErrorMessage(code: string) {
	return isErrorCode(code) ? errorCodesMap[code] : "";
}

export const authClient = createAuthClient({
	// baseURL: API_BASE_URL,
	plugins: [
		inferAdditionalFields({
			user: {
				acceptTerms: {
					type: "boolean",
				},
				firstName: {
					type: "string",
				},
				lastName: {
					type: "string",
				},
				dateOfBirth: {
					type: "date",
					required: false,
				},
				civility: {
					type: "string",
					required: false,
				},
				phone: {
					type: "string",
					required: false,
				},
				height: {
					type: "number",
					required: false,
				},
				weight: {
					type: "number",
					required: false,
				},
				licenseNumber: {
					type: "string",
					required: false,
				},
				preferences: {
					type: "string",
					required: false,
				},
				deletedAt: {
					type: "date",
					required: false,
				},
			},
		}),
		twoFactorClient(),
		adminClient(),
	],
});

export type UserLoggedIn = (typeof authClient.$Infer)["Session"]["user"];

/**
 * This type is used to type the accounts returned by the `authClient.listAccounts` method.
 *
 * @see https://better-auth.com/docs/api-reference/client/list-accounts
 */
export type ClientAccount = {
	id: string;
	provider: string;
	createdAt: Date;
	updatedAt: Date;
	accountId: string;
	scopes: string[];
};
