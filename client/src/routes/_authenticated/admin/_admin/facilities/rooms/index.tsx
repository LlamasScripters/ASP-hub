import type { Room } from "@room-booking/hooks/useRooms";
import { roomsApi } from "@room-booking/lib/api/rooms";
import { RoomsPage } from "@room-booking/page/RoomsPage";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

interface RoomsLoaderData {
	rooms: Room[];
}

export const Route = createFileRoute("/_authenticated/admin/_admin/facilities/rooms/")({
	component: RoomsComponent,
	loader: async ({ abortController }): Promise<RoomsLoaderData> => {
		try {
			const response = await roomsApi.getRooms(
				{ search: "", sportType: "", isIndoor: undefined },
				1,
				50,
				{ signal: abortController.signal },
			);

			return { rooms: response.data };
		} catch (error) {
			console.error("Error loading rooms:", error);
			throw error;
		}
	},
	errorComponent: ({ error }) => {
		console.error("Error loading rooms:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<h2 className="text-lg font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h2>
					<p className="text-gray-600 mb-4">
						Impossible de charger les salles. Veuillez réessayer plus tard.
					</p>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
				<p className="text-gray-600">Chargement des salles...</p>
			</div>
		</div>
	),
});

function RoomsComponent() {
	const rooms = useLoaderData({
		from: "/_authenticated/admin/_admin/facilities/rooms/",
	});
	return <RoomsPage initialRooms={rooms.rooms} />;
}
