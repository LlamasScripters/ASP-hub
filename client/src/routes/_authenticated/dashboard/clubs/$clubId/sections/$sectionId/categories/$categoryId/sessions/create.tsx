// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create.tsx
import { createFileRoute } from "@tanstack/react-router";
import { SessionCreatePage } from "@/features/clubs/pages/sessions/SessionCreatePage";

export const Route = createFileRoute("/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create")({
  component: SessionCreatePage,
});