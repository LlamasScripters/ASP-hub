import { SidebarProvider } from "@/components/ui/sidebar";
import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { useThemeSync } from "@/hooks/use-theme-sync";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	loader: async ({ context: { queryClient }, abortController }) => {
		const queryOptions = getLoggedInUserQueryOptions({
			signal: abortController.signal,
		});

		const userLoggedIn = await queryClient.ensureQueryData(queryOptions);

		if (!userLoggedIn) {
			throw redirect({
				to: "/auth/login",
				search: {
					redirect: location.pathname,
				},
			});
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
