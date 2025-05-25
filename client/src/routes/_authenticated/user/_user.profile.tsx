import UserProfilePage from "@/features/users/pages/UserProfilePage";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/user/_user/profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useLoaderData({ from: "/_authenticated" });
	const { accounts } = useLoaderData({ from: "/_authenticated/user/_user" });

	return <UserProfilePage user={user} accounts={accounts} />;
}
