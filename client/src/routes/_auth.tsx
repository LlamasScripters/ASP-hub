import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { getRoleDashboardUrl } from "@/features/first-login/first-login.utils";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

export const Route = createFileRoute("/_auth")({
	validateSearch: zodValidator(
		z.object({
			redirect: z.string().optional(),
		}),
	),
	beforeLoad: async ({ context: { queryClient }, abortController, search }) => {
		const queryOptions = getLoggedInUserQueryOptions({
			signal: abortController.signal,
		});

		const userLoggedIn = await queryClient.ensureQueryData(queryOptions);

		if (userLoggedIn) {
			const redirectTo = search.redirect && search.redirect !== "/" && search.redirect !== "/dashboard"
				? search.redirect
				: getRoleDashboardUrl(userLoggedIn.role);

			throw redirect({ to: redirectTo });
		}
	},
});
