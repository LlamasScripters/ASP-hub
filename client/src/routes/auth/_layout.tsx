import { authClient } from "@/lib/auth-client";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_layout")({
	component: RouteComponent,
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession();

		if (session) {
			return redirect({
				to: "/",
			});
		}
	},
});

function RouteComponent() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gray-50">
			<Outlet />
		</main>
	);
}
