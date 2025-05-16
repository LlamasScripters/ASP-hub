import DashboardHomePage from "@/features/dashboard/DashboardHomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/_dashboard/")({
	component: DashboardHomeRoute,
});

function DashboardHomeRoute() {
	return <DashboardHomePage />;
}
