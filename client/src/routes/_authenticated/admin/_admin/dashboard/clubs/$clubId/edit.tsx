import { ClubEditPage } from "@/features/clubs/pages/clubs/ClubEditPage";
// client/src/routes/_authenticated/dashboard/clubs/$clubId/edit.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/edit",
)({
	component: ClubEditPage,
});
