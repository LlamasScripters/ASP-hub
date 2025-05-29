// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit.tsx
import { createFileRoute } from "@tanstack/react-router";
import { SessionEditPage } from "@/features/clubs/pages/sessions/SessionEditPage";

export const Route = createFileRoute("/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/$sessionId/edit")({
  component: SessionEditPage,
});