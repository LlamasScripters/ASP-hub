import DashboardHomePage from "@/features/dashboard/DashboardHomePage";
import { Route as AuthenticatedRoute } from "@/routes/_authenticated";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/_dashboard/")({
	component: DashboardHomeRoute,
});

function DashboardHomeRoute() {
	const { user } = AuthenticatedRoute.useLoaderData();
	return <DashboardHomePage user={user} />;
}
