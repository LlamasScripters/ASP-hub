import { ResetPasswordPage } from "@/features/auth/ResetPasswordPage";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const searchSchema = z.object({
	token: z.string().optional(),
});

export const Route = createFileRoute("/auth/reset-password")({
	component: RouteComponent,
	validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
	const { token } = Route.useSearch();

	return <ResetPasswordPage token={token || ""} />;
}
