import { ClubsListPage } from "@/features/clubs/pages/clubs/ClubsListPage";
// client/src/routes/_authenticated/clubs/index.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/",
)({
	component: ClubsListPage,
});
