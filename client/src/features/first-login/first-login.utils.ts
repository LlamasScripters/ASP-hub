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
 * Get role-specific dashboard URL
 */
export function getRoleDashboardUrl(userRole: string | null | undefined): string {
	switch (userRole) {
		case "admin":
			return "/admin";
		case "section_manager":
		case "coach":
		case "member":
			return "/dashboard";
		default:
			return "/first-login/setup";
	}
}

/**
 * Get the appropriate redirect URL for a user after login
 */
export function getPostLoginRedirectUrl(
	user: UserLoggedIn | null,
	firstLoginStatus: FirstLoginStatus | null,
	customRedirect?: string,
): string {
	if (shouldRedirectToFirstLogin(user, firstLoginStatus)) {
		return "/first-login/setup";
	}

	if (customRedirect && 
		customRedirect !== "/" && 
		customRedirect !== "/dashboard" &&
		customRedirect !== "/auth/login") {
		return customRedirect;
	}

	if (user) {
		return getRoleDashboardUrl(user.role);
	}

	return "/";
}
