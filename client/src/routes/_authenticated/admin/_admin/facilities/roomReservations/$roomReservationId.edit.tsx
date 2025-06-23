import { RoomReservationEditPage } from "@/features/room-booking/pages/RoomReservationEditPage";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { RoomReservation } from "@/features/room-booking/hooks/useRoomReservations";
import type { Room } from "@room-booking/hooks/useRooms";
import { complexesApi } from "@room-booking/lib/api/complexes";
import { roomReservationsApi } from "@/features/room-booking/lib/api/roomReservations";
import { roomsApi } from "@room-booking/lib/api/rooms";
import { createFileRoute } from "@tanstack/react-router";

interface LoaderData {
	complex: Complex;
	room: Room;
	roomReservation: RoomReservation;
}

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/facilities/roomReservations/$roomReservationId/edit",
)({
	loader: async ({ params }): Promise<LoaderData> => {
		const roomReservation = await roomReservationsApi.getRoomReservationById(
			params.roomReservationId,
		);
		const room = await roomsApi.getRoomById(roomReservation.roomId);
		const complex = await complexesApi.getComplexById(room.complexId);

		return { roomReservation, room, complex };
	},
	component: RoomReservationEditRoute,
	errorComponent: ({ error }) => {
		console.error("Erreur chargement de la réservation pour édition:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<h2 className="text-lg font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h2>
					<p className="text-gray-600 mb-4">
						Impossible de charger la réservation demandée.
					</p>
					<button
						type="button"
						onClick={() => window.history.back()}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
					>
						Retour
					</button>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
					>
						Réessayez
					</button>
				</div>
			</div>
		);
	},
	pendingComponent: () => (
		<div className="flex items-center justify-center min-h-[400px]">
			<div className="text-center">
				<h2 className="text-lg font-semibold text-gray-600 mb-2">
					Chargement en cours…
				</h2>
				<p className="text-gray-500">
					Veuillez patienter pendant que nous récupérons la réservation.
				</p>
			</div>
		</div>
	),
});

function RoomReservationEditRoute() {
	const { roomReservation, room, complex } = Route.useLoaderData();
	return (
		<RoomReservationEditPage
			roomReservation={roomReservation}
			room={room}
			complex={complex}
		/>
	);
}
