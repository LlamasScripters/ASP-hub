import { UserSettingsPage } from "@/features/users/pages/UserSettingsPage";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useLoaderData({ from: "/_authenticated" });

	return <UserSettingsPage user={user} />;
}
