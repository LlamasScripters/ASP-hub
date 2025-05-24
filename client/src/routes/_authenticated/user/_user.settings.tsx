import { UserSettingsPage } from "@/features/users/pages/UserSettingsPage";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/_user/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useLoaderData({ from: "/_authenticated" });
	const { accounts } = useLoaderData({ from: "/_authenticated/user/_user" });

	return <UserSettingsPage user={user} accounts={accounts} />;
}
