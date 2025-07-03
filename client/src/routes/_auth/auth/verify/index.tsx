import VerifyEmailErrorPage from "@/features/auth/verify-email/VerifyEmailErrorPage";
import { authClient } from "@/lib/auth/auth-client";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const searchSchema = z
	.object({
		token: z.string(),
	})
	.strict();

export const Route = createFileRoute("/_auth/auth/verify/")({
	loaderDeps: ({ search }) => ({ search }),
	loader: async ({ deps: { search } }) => {
		const { error } = await authClient.verifyEmail({
			query: { token: search.token },
		});
		if (error) {
			return redirect({
				to: "/auth/verify/error",

				//@ts-ignore need to support /auth/verify/error?code=...
				//TODO: implement /auth/verify/error?code=...
				search: { error: error.code },
			});
		}
		return redirect({
			to: "/auth/verify/success",
		});
	},
	validateSearch: zodValidator(searchSchema),
	component: VerifyEmailLayout,
	errorComponent: VerifyEmailErrorPage,
});

function VerifyEmailLayout() {
	return <Outlet />;
}
