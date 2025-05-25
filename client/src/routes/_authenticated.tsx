import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	component: AuthenticatedLayout,
	loader: async ({ context: { queryClient }, abortController }) => {
		const queryOptions = getLoggedInUserQueryOptions({
			signal: abortController.signal,
		});

		const userLoggedIn = await queryClient.ensureQueryData(queryOptions);

		if (!userLoggedIn) {
			throw redirect({ to: "/auth/login" });
		}

		return { user: userLoggedIn };
	},
});

function AuthenticatedLayout() {
	return <Outlet />;
}
