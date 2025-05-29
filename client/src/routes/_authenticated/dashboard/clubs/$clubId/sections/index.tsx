// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { SectionsListPage } from "@/features/clubs/pages/sections/SectionsListPage";

export const Route = createFileRoute("/_authenticated/dashboard/clubs/$clubId/sections/")({
  component: SectionsListPage,
});
