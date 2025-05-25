import UserProfilePage from "@/features/users/pages/UserProfilePage";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/(nonadmin)/_nonadmin/user/_user/profile",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <UserProfilePage />;
}
