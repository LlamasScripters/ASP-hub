import { SessionCreatePage } from "@/features/clubs/pages/sessions/SessionCreatePage";
// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/create",
)({
	component: SessionCreatePage,
});
