import type { UserLoggedIn } from "@/lib/auth/auth-client";
import { useQueryClient } from "@tanstack/react-query";
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
	const queryClient = useQueryClient();

	const handlePostLoginRedirection = useCallback(
		async (user: UserLoggedIn | null, customRedirect?: string) => {
			if (!user) {
				window.location.href = "/";
				return;
			}

			if (user.role === "user") {
				try {
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
				customRedirect,
			);

			window.location.href = redirectUrl;
			return;
				} catch (error) {
					console.warn("Failed to check first-login status:", error);
					window.location.href = "/first-login/setup";
					return;
				}
			}
		const redirectUrl = getPostLoginRedirectUrl(
			user,
			null,
			customRedirect,
		);

		window.location.href = redirectUrl;
		},
		[queryClient],
	);

	return { handlePostLoginRedirection };
}
