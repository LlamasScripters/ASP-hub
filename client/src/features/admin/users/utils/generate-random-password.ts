import { authConfig } from "@/lib/auth/auth-config";
import { zxcvbn } from "@zxcvbn-ts/core";

const MIN_PASSWORD_LENGTH = authConfig.passwordMinLength;
const MAX_PASSWORD_LENGTH = 20;

const VALID_CHARS =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !@#$%^&*()_+-=[]{}|;:,.<>?";

function isValidChar(char: string): boolean {
	return VALID_CHARS.includes(char);
}

export function generateRandomPassword() {
	const length =
		Math.floor(
			Math.random() * (MAX_PASSWORD_LENGTH - MIN_PASSWORD_LENGTH + 1),
		) + MIN_PASSWORD_LENGTH;

	let passwordString = "";
	while (passwordString.length < length) {
		const array = new Uint8Array(1);
		crypto.getRandomValues(array);
		const char = String.fromCharCode(array[0]);
		if (isValidChar(char)) {
			passwordString += char;
		}
	}

	const result = zxcvbn(passwordString);

	if (result.score < 3) {
		return generateRandomPassword();
	}

	return passwordString;
}
