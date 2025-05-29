import { ComplexDetailsPage } from "@room-booking/components/complexes/ComplexDetailsPage";
import type { Complex } from "@room-booking/hooks/useComplexes";
import type { Room } from "@room-booking/hooks/useRooms";
import { complexesApi, roomsApi } from "@room-booking/lib/api";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

interface ComplexDetailsLoaderData {
	complex: Complex;
	rooms: Room[];
}

export const Route = createFileRoute(
	"/_authenticated/facilities/complexes/$complexId/",
)({
	component: ComplexDetailsRoute,
	loader: async ({
		params,
		abortController,
	}): Promise<ComplexDetailsLoaderData> => {
		try {
			const [complex, roomsResponse] = await Promise.all([
				complexesApi.getComplexById(params.complexId, {
					signal: abortController.signal,
				}),
				roomsApi.getRoomsByComplexId(params.complexId, 1, 50, {
					signal: abortController.signal,
				}),
			]);

			return { complex, rooms: roomsResponse.data };
		} catch (error) {
			console.error("Error loading complex details:", error);
			throw error;
		}
	},
	errorComponent: ({ error }) => {
		console.error("Error loading complex details:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<h2 className="text-lg font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h2>
					<p className="text-gray-600 mb-4">
						Impossible de charger les détails du complexe.
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
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
				<p className="text-gray-600">Chargement des détails du complexe...</p>
			</div>
		</div>
	),
});

function ComplexDetailsRoute() {
	const { complex, rooms } = useLoaderData({
		from: "/_authenticated/facilities/complexes/$complexId/",
	});

	return <ComplexDetailsPage complex={complex} initialRooms={rooms} />;
}
