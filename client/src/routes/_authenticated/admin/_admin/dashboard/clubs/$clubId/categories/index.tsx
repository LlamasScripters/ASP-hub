import { AllCategoriesPage } from "@/features/clubs/pages/categories/AllCategoriesPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/categories/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <AllCategoriesPage />;
}
