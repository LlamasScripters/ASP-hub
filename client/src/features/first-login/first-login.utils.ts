import type { UserLoggedIn } from "@/lib/auth/auth-client";
import type { FirstLoginStatus } from "./first-login.config";

/**
 * Determine if a user should be redirected to the first-login setup flow
 */
export function shouldRedirectToFirstLogin(
	user: UserLoggedIn | null,
	firstLoginStatus: FirstLoginStatus | null,
): boolean {
	if (!user || !firstLoginStatus) {
		return false;
	}

	// Only redirect users with role "user" who haven't completed the first-login flow
	return user.role === "user" && firstLoginStatus.step !== "complete";
}

/**
 * Get the appropriate redirect URL for a user after login
 */
export function getPostLoginRedirectUrl(
	user: UserLoggedIn | null,
	firstLoginStatus: FirstLoginStatus | null,
	defaultRedirect = "/dashboard",
): string {
	if (shouldRedirectToFirstLogin(user, firstLoginStatus)) {
		return "/first-login/setup";
	}

	return defaultRedirect;
}
