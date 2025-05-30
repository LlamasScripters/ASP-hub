import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			Hello
			"/_authenticated/dashboard/clubs/$clubId/sections/$sectionId/categories/$categoryId/sessions/"!
		</div>
	);
}
