// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit.tsx
import { createFileRoute } from "@tanstack/react-router";
import { CategoryEditPage } from "@/features/clubs/pages/categories/CategoryEditPage";

export const Route = createFileRoute(
  "/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/edit"
)({
  component: CategoryEditPage,
});