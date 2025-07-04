import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";
import { Route as MinibusesRoute } from "../../../routes/_authenticated/admin/_admin/assets/minibuses/index";
import { minibusesApi } from "../lib/api/minibuses";
import type {
	CreateMinibusData,
	Disponibility,
	DisponibilityEntry,
	Minibus,
	MinibusFilters,
	MinibusesPaginatedResponse,
	UpdateMinibusData,
} from "../lib/api/minibuses";

export const frenchDays: Record<keyof Disponibility, string> = {
	monday: "Lundi",
	tuesday: "Mardi",
	wednesday: "Mercredi",
	thursday: "Jeudi",
	friday: "Vendredi",
	saturday: "Samedi",
	sunday: "Dimanche",
};

export type {
	Minibus,
	CreateMinibusData,
	UpdateMinibusData,
	MinibusFilters,
	MinibusesPaginatedResponse,
	Disponibility,
	DisponibilityEntry,
};

export const filteredQueryOptions = ({
	filters = {},
	page = 1,
	limit = 20,
}) => ({
	queryKey: ["minibuses", filters, page, limit],
	queryFn: () => minibusesApi.getMinibuses(filters, page, limit),
	enabled: Object.keys(filters).length > 0,
});

interface UseMinibusesOptions {
	searchParams?: Record<string, unknown>;
	navigate?: (options: { search: Record<string, unknown> }) => void;
}

export function useMinibuses(options?: UseMinibusesOptions) {
	const fallbackSearchParams = options?.searchParams;
	const fallbackNavigate = options?.navigate;

	let searchParams: Record<string, unknown>;
	let navigate: (options: { search: Record<string, unknown> }) => void;

	try {
		searchParams = fallbackSearchParams || MinibusesRoute.useSearch();
		navigate = fallbackNavigate || MinibusesRoute.useNavigate();
	} catch (error) {
		searchParams = fallbackSearchParams || {};
		navigate = fallbackNavigate || (() => {});
	}

	const queryClient = useQueryClient();

	// Query for fetching minibuses
	const { data: fetchedData, refetch } = useSuspenseQuery(
		filteredQueryOptions({
			filters: {
				search: searchParams.search as string,
				isAvailable: searchParams.isAvailable as boolean,
			},
			page: searchParams.page as number,
			limit: searchParams.limit as number,
		}),
	);

	// Create mutation
	const createMutation = useMutation({
		mutationFn: (data: CreateMinibusData) => minibusesApi.createMinibus(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["minibuses"] });
			toast.success("Minibus créé avec succès");
		},
		onError: (error) => {
			const errorMessage = `Erreur lors de la création: ${error.message}`;
			toast.error("Erreur", { description: errorMessage });
		},
	});

	// Update mutation
	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateMinibusData }) =>
			minibusesApi.updateMinibus(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["minibuses"] });
			toast.success("Minibus mis à jour avec succès");
		},
		onError: (error) => {
			const errorMessage = `Erreur lors de la mise à jour: ${error.message}`;
			toast.error("Erreur", { description: errorMessage });
		},
	});

	// Delete mutation
	const deleteMutation = useMutation({
		mutationFn: (id: string) => minibusesApi.deleteMinibus(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["minibuses"] });
			toast.success("Minibus supprimé avec succès");
		},
		onError: (error) => {
			const errorMessage = `Erreur lors de la suppression: ${error.message}`;
			toast.error("Erreur", { description: errorMessage });
		},
	});

	const updateFilters = useCallback(
		(newFilters: Partial<MinibusFilters> = {}) => {
			navigate({
				search: {
					...searchParams,
					...newFilters,
				},
			});
		},
		[navigate, searchParams],
	);

	const createMinibus = useCallback(
		async (data: CreateMinibusData): Promise<Minibus | null> => {
			const result = await createMutation.mutateAsync(data);
			return result;
		},
		[createMutation],
	);

	const updateMinibus = useCallback(
		async (id: string, data: UpdateMinibusData): Promise<Minibus | null> => {
			try {
				const result = await updateMutation.mutateAsync({ id, data });
				return result;
			} catch (error) {
				console.error("Error updating minibus:", error);
				return null;
			}
		},
		[updateMutation],
	);

	const deleteMinibus = useCallback(
		async (id: string): Promise<boolean> => {
			try {
				await deleteMutation.mutateAsync(id);
				return true;
			} catch (error) {
				console.error("Error deleting minibus:", error);
				return false;
			}
		},
		[deleteMutation],
	);

	return {
		minibuses: fetchedData.data,
		totalCount: fetchedData.total,
		page: fetchedData.page,
		limit: fetchedData.limit,
		updateFilters,
		createMinibus,
		updateMinibus,
		deleteMinibus,
		refetch,
	};
}
