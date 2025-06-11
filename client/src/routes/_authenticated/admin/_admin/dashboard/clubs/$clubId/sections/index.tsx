import { SectionsListPage } from "@/features/clubs/pages/sections/SectionsListPage";
// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/",
)({
	component: SectionsListPage,
});
