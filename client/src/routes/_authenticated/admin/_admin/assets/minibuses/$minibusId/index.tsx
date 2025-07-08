import { MinibusDetailsPage } from "@/features/minibus-booking/components/minibuses/MinibusDetailsPage";
import type { Minibus } from "@/features/minibus-booking/lib/api/minibuses";
import { minibusesApi } from "@/features/minibus-booking/lib/api/minibuses";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

interface LoaderData {
	minibus: Minibus;
}

const minibusesSearchParamsSchema = z.object({
	startDate: z.coerce.date().optional(),
	endDate: z.coerce.date().optional(),
});

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/assets/minibuses/$minibusId/",
)({
	component: MinibusDetailsRoute,
	validateSearch: zodValidator(minibusesSearchParamsSchema),
	loaderDeps: ({ search }) => ({ ...search }),
	loader: async ({ params: { minibusId } }): Promise<LoaderData> => {
		try {
			const minibus = await minibusesApi.getMinibusById(minibusId);
			if (!minibus) {
				throw new Error("Minibus not found");
			}

			return { minibus };
		} catch (error) {
			console.error("Error loading minibus:", error);
			throw error;
		}
	},
	errorComponent: ({ error }) => {
		console.error("Error loading minibus:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<h2 className="text-lg font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h2>
					<p className="text-gray-600 mb-4">
						Impossible de charger le minibus.
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

function MinibusDetailsRoute() {
	const { minibus } = Route.useLoaderData();
	return <MinibusDetailsPage minibus={minibus} />;
}
