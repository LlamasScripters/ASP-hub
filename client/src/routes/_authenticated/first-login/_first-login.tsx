import { FirstLoginLayout } from "@/features/first-login/components/FirstLoginLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/first-login/_first-login",
)({
	component: FirstLoginLayout,
});
