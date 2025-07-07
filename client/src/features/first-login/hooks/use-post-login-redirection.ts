import type { UserLoggedIn } from "@/lib/auth/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import {
	type FirstLoginStatus,
	getFirstLoginStatusQueryOptions,
} from "../first-login.config";
import { getPostLoginRedirectUrl } from "../first-login.utils";

/**
 * Hook to handle post-login redirection based on first-login status
 */
export function usePostLoginRedirection() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const handlePostLoginRedirection = useCallback(
		async (user: UserLoggedIn | null, defaultRedirect = "/dashboard") => {
			if (!user) {
				navigate({ to: defaultRedirect });
				return;
			}

			// Only check first-login status for users with role "user"
			if (user.role === "user") {
				try {
					// Retry mechanism in case the first request fails
					let firstLoginStatus: FirstLoginStatus | null = null;
					let attempts = 0;
					const maxAttempts = 3;

					while (attempts < maxAttempts) {
						try {
							firstLoginStatus = await queryClient.fetchQuery(
								getFirstLoginStatusQueryOptions(),
							);
							break;
						} catch (error) {
							attempts++;
							if (attempts < maxAttempts) {
								// Wait before retrying
								await new Promise((resolve) =>
									setTimeout(resolve, 200 * attempts),
								);
							} else {
								throw error;
							}
						}
					}

					const redirectUrl = getPostLoginRedirectUrl(
						user,
						firstLoginStatus,
						defaultRedirect,
					);

					navigate({ to: redirectUrl });
					return;
				} catch (error) {
					// If first-login status check fails, redirect to setup as safety measure
					console.warn("Failed to check first-login status:", error);
					navigate({ to: "/first-login/setup" });
					return;
				}
			}

			navigate({ to: defaultRedirect });
		},
		[navigate, queryClient],
	);

	return { handlePostLoginRedirection };
}
