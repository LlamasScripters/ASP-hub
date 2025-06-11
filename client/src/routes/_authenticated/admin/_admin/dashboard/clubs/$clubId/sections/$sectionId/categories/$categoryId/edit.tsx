import { CategoryEditPage } from "@/features/clubs/pages/categories/CategoryEditPage";
// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit",
)({
	component: CategoryEditPage,
});
