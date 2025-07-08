import DashboardSocialPage from "@/features/dashboard/DashboardSocialPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/(nonadmin)/_nonadmin/dashboard/social",
)({
	component: DashboardSocialRoute,
});

function DashboardSocialRoute() {
	return <DashboardSocialPage />;
}
