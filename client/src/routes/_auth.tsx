import { getLoggedInUserQueryOptions } from "@/features/users/users.config";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const fallbackPath = "/dashboard" as const;

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
			throw redirect({ to: search.redirect || fallbackPath });
		}
	},
});
