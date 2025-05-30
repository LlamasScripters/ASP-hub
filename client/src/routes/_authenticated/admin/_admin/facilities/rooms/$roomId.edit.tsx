import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import { complexesApi } from "@room-booking/lib/api/complexes";
import { roomsApi } from "@room-booking/lib/api/rooms";
import { RoomEditPage } from "@/features/room-booking/pages/RoomEditPage";
import { createFileRoute } from "@tanstack/react-router";

interface LoaderData {
	room: Room;
	complex: Complex;
}

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/facilities/rooms/$roomId/edit",
)({
	loader: async ({ params }): Promise<LoaderData> => {
		const room = await roomsApi.getRoomById(params.roomId);
		const complex = await complexesApi.getComplexById(room.complexId);

		return { room, complex };
	},
	component: RoomEditRoute,
	errorComponent: ({ error }) => {
		console.error("Error loading room for edit:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<h2 className="text-lg font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h2>
					<p className="text-gray-600 mb-4">
						Impossible de charger la salle pour l'édition.
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
						Réessayer
					</button>
				</div>
			</div>
		);
	},
	pendingComponent: () => (
		<div className="flex items-center justify-center min-h-[400px]">
			<div className="text-center">
				<h2 className="text-lg font-semibold text-gray-600 mb-2">
					Chargement en cours...
				</h2>
				<p className="text-gray-500">
					Veuillez patienter pendant que nous chargeons les données.
				</p>
			</div>
		</div>
	),
});

function RoomEditRoute() {
	const { room, complex } = Route.useLoaderData();
	return <RoomEditPage room={room} complex={complex} />;
}
