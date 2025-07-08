import {
	type Application,
	ApplicationsPage,
	applicationQueries,
} from "@/features/admin/applications";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { z } from "zod";

const searchParamsSchema = z.object({
	status: z.enum(["pending", "approved", "rejected"]).optional(),
	search: z.string().optional(),
	page: z.coerce.number().default(1),
	limit: z.coerce.number().default(20),
});

interface ApplicationsLoaderData {
	applications: Application[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export const Route = createFileRoute(
	"/_authenticated/admin/_admin/applications",
)({
	component: ApplicationsRoute,
	validateSearch: (search) => searchParamsSchema.parse(search),
	loader: async ({
		context: { queryClient },
	}): Promise<ApplicationsLoaderData> => {
		try {
			const filters = {
				page: 1,
				limit: 20,
			};

			const response = await queryClient.ensureQueryData(
				applicationQueries.list(filters),
			);

			return {
				applications: response.data || [],
				total: response.total || 0,
				page: response.page || 1,
				limit: response.limit || 20,
				totalPages: response.totalPages || 0,
			};
		} catch (error) {
			console.error("Error loading applications:", error);
			throw error;
		}
	},
	errorComponent: ({ error }) => {
		console.error("Error loading applications:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<h2 className="text-lg font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h2>
					<p className="text-gray-600 mb-4">
						Impossible de charger les candidatures. Veuillez réessayer plus
						tard.
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
				<p className="text-gray-600">Chargement des candidatures...</p>
			</div>
		</div>
	),
});

function ApplicationsRoute() {
	const { applications } = useLoaderData({
		from: "/_authenticated/admin/_admin/applications",
	});

	return <ApplicationsPage initialApplications={applications} />;
}
