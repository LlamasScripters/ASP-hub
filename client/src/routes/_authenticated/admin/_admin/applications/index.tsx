import { PendingApplicationsPage } from "@/features/admin/applications";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/applications/",
)({
	component: () => <PendingApplicationsPage />,
});
