import { createFileRoute } from "@tanstack/react-router";
import { SectionSessionsListPage } from "@/features/clubs/pages/sections/SectionSessionsListPage";

export const Route = createFileRoute("/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/sessions/")({
  component: SectionSessionsListPage,
});
