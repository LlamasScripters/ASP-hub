// client/src/routes/_authenticated/clubs/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { ClubsListPage } from "@/features/clubs/pages/clubs/ClubsListPage";


export const Route = createFileRoute("/_authenticated/admin/_admin/dashboard/clubs/")({
  component: ClubsListPage,
});