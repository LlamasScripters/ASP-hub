import * as OTPAuth from "otpauth";

export function generateOTP(secret: string) {
	const totp = new OTPAuth.TOTP({ secret });
	return totp.generate();
}
