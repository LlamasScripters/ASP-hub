// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/create.tsx
import { createFileRoute } from "@tanstack/react-router";
import { CategoryCreatePage } from "@/features/clubs/pages/categories/CategoryCreatePage";

export const Route = createFileRoute("/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/create")({
  component: CategoryCreatePage,
});