import { ComplexEditPage } from "@/features/room-booking/pages/ComplexEditPage";
import type { Complex } from "@room-booking/hooks/useComplexes";
import { complexesApi } from "@room-booking/lib/api/complexes";
import { createFileRoute } from "@tanstack/react-router";
import { useLoaderData } from "@tanstack/react-router";

interface EditComplexLoaderData {
	complex: Complex;
}

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/facilities/complexes/$complexId/edit",
)({
	component: ComplexEditRoute,
	loader: async ({
		params,
		abortController,
	}): Promise<EditComplexLoaderData> => {
		try {
			const complex = await complexesApi.getComplexById(params.complexId, {
				signal: abortController.signal,
			});

			return { complex };
		} catch (error) {
			console.error("Error loading complex for edit:", error);
			throw error;
		}
	},
	errorComponent: ({ error }) => {
		console.error("Error loading complex for edit:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<h2 className="text-lg font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h2>
					<p className="text-gray-600 mb-4">
						Impossible de charger le complexe pour l'édition.
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
				<p className="text-gray-600 mb-4">
					Veuillez patienter pendant que nous chargeons les données du complexe.
				</p>
			</div>
		</div>
	),
});

function ComplexEditRoute() {
	const { complex } = useLoaderData({
		from: "/_authenticated/admin/_admin/facilities/complexes/$complexId/edit",
	});

	return <ComplexEditPage initialComplex={complex} />;
}
