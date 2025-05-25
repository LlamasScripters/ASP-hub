import DashboardMembersPage from "@/features/dashboard/DashboardMembersPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/(nonadmin)/_nonadmin/dashboard/members",
)({
	component: DashboardMembersRoute,
});

function DashboardMembersRoute() {
	return <DashboardMembersPage />;
}
