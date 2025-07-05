import { ApplicationPage } from "@/features/first-login/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/first-login/application")(
	{
		component: ApplicationPage,
	},
);
