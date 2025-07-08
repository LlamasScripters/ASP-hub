import { FirstLoginSetupPage } from "@/features/first-login/pages/FirstLoginSetupPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/first-login/setup")({
	component: FirstLoginSetupPage,
});
