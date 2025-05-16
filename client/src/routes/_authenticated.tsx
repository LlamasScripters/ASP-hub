import { authClient } from "@/lib/auth-client";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
	loader: async ({ abortController }) => {
		const { data } = await authClient.getSession({
			fetchOptions: { signal: abortController.signal },
		});
		if (!data) {
			throw redirect({ to: "/auth/login" });
		}
		return { user: data.user };
	},
});

function RouteComponent() {
	return <Outlet />;
}
