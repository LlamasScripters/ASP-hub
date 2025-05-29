import { createFileRoute } from "@tanstack/react-router";
import { SectionEditPage } from "@/features/clubs/pages/sections/SectionEditPage";

export const Route = createFileRoute("/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/edit")({
  component: SectionEditPage,
});