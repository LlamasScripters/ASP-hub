import type { Complex } from "@/features/room-booking/hooks/useComplexes";
import { filteredComplexesQueryOptions } from "@/features/room-booking/hooks/useComplexes";
import { ComplexesPage } from "@/features/room-booking/pages/ComplexesPage";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

interface ComplexesLoaderData {
	complexes: Complex[];
}

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/facilities/complexes/",
)({
	component: ComplexesRoute,
	loader: async ({
		context: { queryClient },
	}): Promise<ComplexesLoaderData> => {
		try {
			const { data: complexes } = await queryClient.ensureQueryData(
				filteredComplexesQueryOptions({
					filters: {},
					page: 1,
					limit: 50,
				}),
			);

			return { complexes };
		} catch (error) {
			console.error("Error loading complexes:", error);
			throw error;
		}
	},
	errorComponent: ({ error }) => {
		console.error("Error loading complexes:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<h2 className="text-lg font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h2>
					<p className="text-gray-600 mb-4">
						Impossible de charger les complexes. Veuillez réessayer plus tard.
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
				<p className="text-gray-600">Chargement des complexes...</p>
			</div>
		</div>
	),
});

function ComplexesRoute() {
	const { complexes } = useLoaderData({
		from: "/_authenticated/admin/_admin/facilities/complexes/",
	});

	return <ComplexesPage initialComplexes={complexes} />;
}
