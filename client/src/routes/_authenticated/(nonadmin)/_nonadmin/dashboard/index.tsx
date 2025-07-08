import DashboardHomePage from "@/features/dashboard/DashboardHomePage";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/(nonadmin)/_nonadmin/dashboard/",
)({
	component: DashboardHomeRoute,
});

function DashboardHomeRoute() {
	const { user } = useLoaderData({ from: "/_authenticated" });
	return <DashboardHomePage user={user} />;
}
