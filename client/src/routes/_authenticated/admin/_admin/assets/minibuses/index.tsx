import { MinibusesPage } from "@/features/minibus-booking/pages/MinibusesPage";
import type { Minibus } from "@/features/minibus-booking/lib/api/minibuses";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { filteredQueryOptions } from "@/features/minibus-booking/hooks/useMinibuses";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

interface MinibusesLoaderData {
	minibuses: Minibus[];
}

const minibusesSearchParamsSchema = z.object({
	search: z.string().optional(),
	isAvailable: z.boolean().optional(),
	page: z.coerce.number().default(1),
	limit: z.coerce.number().default(20),
});

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/assets/minibuses/",
)({
	component: MinibusesComponent,
	validateSearch: zodValidator(minibusesSearchParamsSchema),
	loaderDeps: ({ search }) => ({ ...search }),
	loader: async ({
		context: { queryClient },
		deps: { page, limit, isAvailable, search },
	}): Promise<MinibusesLoaderData> => {
		try {
			const { data: minibuses } = await queryClient.ensureQueryData(
				filteredQueryOptions({
					filters: { search, isAvailable },
					page,
					limit,
				}),
			);

			return { minibuses };
		} catch (error) {
			console.error("Error loading minibuses:", error);
			throw error;
		}
	},
	errorComponent: ({ error }) => {
		console.error("Error loading minibuses:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<h2 className="text-lg font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h2>
					<p className="text-gray-600 mb-4">
						Impossible de charger les minibus. Veuillez réessayer plus tard.
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
				<p className="text-gray-600">Chargement des minibus...</p>
			</div>
		</div>
	),
});

function MinibusesComponent() {
	const minibuses = useLoaderData({
		from: "/_authenticated/admin/_admin/assets/minibuses/",
	});
	return <MinibusesPage initialMinibuses={minibuses.minibuses} />;
}
