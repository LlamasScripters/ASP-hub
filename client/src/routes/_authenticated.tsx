import { SidebarProvider } from "@/components/ui/sidebar";
import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { useThemeSync } from "@/hooks/use-theme-sync";
import { api } from "@/lib/api";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

// Type pour le statut first login
interface FirstLoginStatus {
	step: "profile" | "application" | "validation" | "complete";
	isProfileComplete: boolean;
	hasActiveApplication: boolean;
	applicationStatus?: "pending" | "approved" | "rejected";
	canProceed: boolean;
	nextAction: string;
}

export const Route = createFileRoute("/_authenticated")({
	loader: async ({ context: { queryClient }, abortController, location }) => {
		const queryOptions = getLoggedInUserQueryOptions({
			signal: abortController.signal,
		});

		const userLoggedIn = await queryClient.ensureQueryData(queryOptions);

		if (!userLoggedIn) {
			throw redirect({
				to: "/auth/login",
				search: {
					redirect: location.href,
				},
			});
		}

		// Vérifier le statut du first login flow
		try {
			const firstLoginResponse = await api
				.get("first-login/status", {
					signal: abortController.signal,
				})
				.json<{ success: boolean; data: FirstLoginStatus }>();

			const firstLoginStatus = firstLoginResponse.data;

			// Si l'utilisateur n'a pas complété le first login flow et n'est pas déjà sur une page first-login
			if (
				firstLoginStatus.step !== "complete" &&
				!location.pathname.startsWith("/first-login")
			) {
				// Rediriger vers l'étape appropriée du first login
				switch (firstLoginStatus.step) {
					case "profile":
						throw redirect({ to: "/first-login/profile" });
					case "application":
						throw redirect({ to: "/first-login/application" });
					case "validation":
						throw redirect({ to: "/first-login/validation" });
					default:
						break;
				}
			}

			return { user: userLoggedIn, firstLoginStatus };
		} catch (error) {
			// En cas d'erreur de récupération du statut first login, continuer sans redirection
			console.warn("Failed to fetch first login status:", error);
			return { user: userLoggedIn, firstLoginStatus: null };
		}
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
