import { complexesApi } from "@room-booking/lib/api/complexes";
import { RoomCreatePage } from "@room-booking/page/RoomCreatePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/facilities/complexes/$complexId/create-room",
)({
	loader: async ({ params }) => {
		const complex = await complexesApi.getComplexById(params.complexId);
		return { complex };
	},
	component: CreateRoomRoute,
});

function CreateRoomRoute() {
	const { complex } = Route.useLoaderData();
	return <RoomCreatePage complex={complex} />;
}
