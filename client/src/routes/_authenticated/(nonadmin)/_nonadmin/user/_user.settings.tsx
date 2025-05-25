import UserSettingsPage from "@/features/users/pages/UserSettingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/(nonadmin)/_nonadmin/user/_user/settings",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <UserSettingsPage />;
}
