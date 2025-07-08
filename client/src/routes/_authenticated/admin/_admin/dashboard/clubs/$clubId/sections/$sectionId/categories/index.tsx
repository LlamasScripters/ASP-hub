import { CategoriesListPage } from "@/features/clubs/pages/categories/CategoryListPage";
// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/",
)({
	component: CategoriesListPage,
});
