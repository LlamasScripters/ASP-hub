// client/src/routes/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/index.tsx
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/",
)({
	component: () => <Outlet />,
});
