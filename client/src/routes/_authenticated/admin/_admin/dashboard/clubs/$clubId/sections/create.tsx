import { SectionCreatePage } from "@/features/clubs/pages/sections/SectionCreatePage";
// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/create.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/create",
)({
	component: SectionCreatePage,
});
