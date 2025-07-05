import { ValidationPage } from "@/features/first-login/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/first-login/validation")({
	component: ValidationPage,
});
