import { authClient } from "@/lib/auth-client";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession();
		if (!session) {
			return redirect({ to: "/auth/login" });
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}
