import DashboardActivitiesPage from "@/features/dashboard/DashboardActivitiesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/(nonadmin)/_nonadmin/dashboard/activities",
)({
	component: DashboardActivitiesRoute,
});

function DashboardActivitiesRoute() {
	return <DashboardActivitiesPage />;
}
