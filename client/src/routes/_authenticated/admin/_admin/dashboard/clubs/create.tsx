import { ClubCreatePage } from "@/features/clubs/pages/clubs/CreateClubPage";
// client/src/routes/_authenticated/dashboard/clubs/create.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/create",
)({
	component: ClubCreatePage,
});
