import {
	getLoggedInUserQueryOptions,
	listAccountsQueryOptions,
} from "@/features/users/users.config";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

// preload user accounts for /user routes
export const Route = createFileRoute("/_authenticated/user/_user")({
	component: UserLayout,
	loader: async ({ context: { queryClient }, abortController }) => {
		const userLoggedIn = await queryClient.ensureQueryData(
			getLoggedInUserQueryOptions({ signal: abortController.signal }),
		);

		if (!userLoggedIn) {
			throw redirect({ to: "/auth/login" });
		}

		const accounts = await queryClient.ensureQueryData(
			listAccountsQueryOptions(userLoggedIn.id, {
				signal: abortController.signal,
			}),
		);

		if (!accounts) {
			throw redirect({ to: "/auth/login" });
		}

		return { accounts };
	},
});

function UserLayout() {
	return <Outlet />;
}
