import { RoomDetailsPage } from "@room-booking/components/rooms/RoomDetailsPage";
import { complexesApi } from "@room-booking/lib/api/complexes";
import { roomsApi } from "@room-booking/lib/api/rooms";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/facilities/rooms/$roomId/",
)({
	loader: async ({ params }) => {
		const room = await roomsApi.getRoomById(params.roomId);
		const complex = await complexesApi.getComplexById(room.complexId);

		return { room, complex };
	},
	component: RoomDetailsRoute,
});

function RoomDetailsRoute() {
	const { room, complex } = Route.useLoaderData();
	return <RoomDetailsPage room={room} complex={complex} />;
}
