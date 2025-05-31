import { SectionSessionsListPage } from "@/features/clubs/pages/sections/SectionSessionsListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/sessions/",
)({
	component: SectionSessionsListPage,
});
