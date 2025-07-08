import { SectionEditPage } from "@/features/clubs/pages/sections/SectionEditPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/edit",
)({
	component: SectionEditPage,
});
