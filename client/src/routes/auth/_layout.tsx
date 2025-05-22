import { authClient } from "@/lib/auth-client";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_layout")({
	component: AuthLayout,
	loader: async () => {
		const session = await authClient.getSession();
		if (session) {
			return redirect({ to: "/dashboard" });
		}
		return null;
	},
});

function AuthLayout() {
	return <Outlet />;
}
