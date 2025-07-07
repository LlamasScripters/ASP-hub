import { SidebarProvider } from "@/components/ui/sidebar";
import { getFirstLoginStatusQueryOptions } from "@/features/first-login/first-login.config";
import { shouldRedirectToFirstLogin } from "@/features/first-login/first-login.utils";
import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { useThemeSync } from "@/hooks/use-theme-sync";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	loader: async ({ context: { queryClient }, abortController, location }) => {
		const userQueryOptions = getLoggedInUserQueryOptions({
			signal: abortController.signal,
		});

		const userLoggedIn = await queryClient.ensureQueryData(userQueryOptions);

		if (!userLoggedIn) {
			throw redirect({
				to: "/auth/login",
				search: {
					redirect: location.href,
				},
			});
		}

		if (userLoggedIn.role === "user") {
			try {
				const firstLoginStatusQueryOptions = getFirstLoginStatusQueryOptions({
					signal: abortController.signal,
				});

				const firstLoginStatus = await queryClient.ensureQueryData(
					firstLoginStatusQueryOptions,
				);

				if (shouldRedirectToFirstLogin(userLoggedIn, firstLoginStatus)) {
					if (location.pathname !== "/first-login/setup") {
						throw redirect({
							to: "/first-login/setup",
						});
					}
				}
			} catch (error) {
				console.warn("Failed to check first-login status:", error);
				if (location.pathname !== "/first-login/setup") {
					throw redirect({
						to: "/first-login/setup",
					});
				}
			}
		}

		return { user: userLoggedIn };
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	const { user } = Route.useLoaderData();

	// sync user theme preferences with the theme provider
	useThemeSync({ user });

	return (
		<SidebarProvider className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
			<Outlet />
		</SidebarProvider>
	);
}
