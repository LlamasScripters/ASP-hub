import { RoomDetailsPage } from "@room-booking/components/rooms/RoomDetailsPage";
import type { Complex } from "@/features/room-booking/hooks/useComplexes";
import type { Room } from "@/features/room-booking/hooks/useRooms";
import { complexesApi } from "@room-booking/lib/api/complexes";
import { roomsApi } from "@room-booking/lib/api/rooms";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

interface LoaderData {
	room: Room;
	complex: Complex;
}

const roomsSearchParamsSchema = z.object({
	startDate: z.coerce.date().optional(),
	endDate: z.coerce.date().optional(),
});

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/facilities/rooms/$roomId/",
)({
	component: RoomDetailsRoute,
	validateSearch: zodValidator(roomsSearchParamsSchema),
	loaderDeps: ({ search }) => ({ ...search }),
	loader: async ({ params: { roomId } }): Promise<LoaderData> => {
		try {
			const room = await roomsApi.getRoomById(roomId);
			if (!room) {
				throw new Error("Room not found");
			}

			const complex = await complexesApi.getComplexById(room.complexId);
			if (!complex) {
				throw new Error("Complex not found");
			}

			return { room, complex };
		} catch (error) {
			console.error("Error loading room:", error);
			throw error;
		}
	},
	errorComponent: ({ error }) => {
		console.error("Error loading room:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<h2 className="text-lg font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h2>
					<p className="text-gray-600 mb-4">
						Impossible de charger la salle.
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
				<p className="text-gray-500">Veuillez patienter pendant le chargement.</p>
			</div>
		</div>
	),
});

function RoomDetailsRoute() {
	const { room, complex } = Route.useLoaderData();
	return <RoomDetailsPage room={room} complex={complex} />;
}
