import { authClient } from "@/lib/auth-client";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth")({
	component: RouteComponent,
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession();

		if (session) {
			return redirect({
				to: "/dashboard",
			});
		}
	},
});

function RouteComponent() {
	return (
		<main className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
			<Outlet />
		</main>
	);
}
