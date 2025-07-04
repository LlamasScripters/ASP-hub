import { MinibusCreatePage } from "@/features/minibus-booking/pages/MinibusCreatePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/assets/minibuses/create",
)({
	component: MinibusCreateRoute,
});

function MinibusCreateRoute() {
	return <MinibusCreatePage />;
}
