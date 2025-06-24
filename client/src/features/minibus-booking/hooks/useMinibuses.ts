import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import { minibusesApi } from "../lib/api/minibuses";
import type {
	Minibus,
	CreateMinibusData,
	UpdateMinibusData,
	MinibusFilters,
	MinibusesPaginatedResponse,
	Disponibility,
	DisponibilityEntry,
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

interface UseMinibusesOptions {
	initialData?: Minibus[];
}

export function useMinibuses(options: UseMinibusesOptions = {}) {
	const queryClient = useQueryClient();
	const [minibuses, setMinibuses] = useState<Minibus[]>(options.initialData || []);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<Partial<MinibusFilters>>({});
	const [page, setPage] = useState(1);
	const [limit] = useState(20);

	// Query for fetching minibuses
	const { 
		data: fetchedData,
		isLoading: queryLoading,
		error: queryError,
		refetch
	} = useQuery({
		queryKey: ["minibuses", filters, page, limit],
		queryFn: () => minibusesApi.getMinibuses(filters, page, limit),
		enabled: Object.keys(filters).length > 0,
	});

	// Create mutation
	const createMutation = useMutation({
		mutationFn: (data: CreateMinibusData) => minibusesApi.createMinibus(data),
		onSuccess: (newMinibus) => {
			setMinibuses(prev => [newMinibus, ...prev]);
			queryClient.invalidateQueries({ queryKey: ["minibuses"] });
		},
		onError: (error) => {
			setError(`Erreur lors de la création: ${error.message}`);
		},
	});

	// Update mutation 
	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateMinibusData }) =>
			minibusesApi.updateMinibus(id, data),
		onSuccess: (updatedMinibus) => {
			setMinibuses(prev => 
				prev.map(minibus => minibus.id === updatedMinibus.id ? updatedMinibus : minibus)
			);
			queryClient.invalidateQueries({ queryKey: ["minibuses"] });
		},
		onError: (error) => {
			setError(`Erreur lors de la mise à jour: ${error.message}`);
		},
	});

	// Delete mutation
	const deleteMutation = useMutation({
		mutationFn: (id: string) => minibusesApi.deleteMinibus(id),
		onSuccess: (_, deletedId) => {
			setMinibuses(prev => prev.filter(minibus => minibus.id !== deletedId));
			queryClient.invalidateQueries({ queryKey: ["minibuses"] });
		},
		onError: (error) => {
			setError(`Erreur lors de la suppression: ${error.message}`);
		},
	});

	// Update state when query data changes
	useEffect(() => {
		if (fetchedData) {
			setMinibuses(fetchedData.data);
			setTotalCount(fetchedData.total);
		}
	}, [fetchedData]);

	// Update loading state
	useEffect(() => {
		setLoading(queryLoading || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending);
	}, [queryLoading, createMutation.isPending, updateMutation.isPending, deleteMutation.isPending]);

	// Update error state
	useEffect(() => {
		if (queryError) {
			setError(`Erreur lors du chargement: ${queryError.message}`);
		} else {
			setError(null);
		}
	}, [queryError]);

	const updateFilters = useCallback((newFilters: Partial<MinibusFilters>) => {
		setFilters(newFilters);
		setPage(1);
	}, []);

	const createMinibus = useCallback(async (data: CreateMinibusData): Promise<Minibus | null> => {
		try {
			const result = await createMutation.mutateAsync(data);
			return result;
		} catch (error) {
			console.error("Error creating minibus:", error);
			return null;
		}
	}, [createMutation]);

	const updateMinibus = useCallback(async (id: string, data: UpdateMinibusData): Promise<Minibus | null> => {
		try {
			const result = await updateMutation.mutateAsync({ id, data });
			return result;
		} catch (error) {
			console.error("Error updating minibus:", error);
			return null;
		}
	}, [updateMutation]);

	const deleteMinibus = useCallback(async (id: string): Promise<boolean> => {
		try {
			await deleteMutation.mutateAsync(id);
			return true;
		} catch (error) {
			console.error("Error deleting minibus:", error);
			return false;
		}
	}, [deleteMutation]);

	return {
		minibuses,
		totalCount,
		loading,
		error,
		filters,
		page,
		limit,
		updateFilters,
		createMinibus,
		updateMinibus,
		deleteMinibus,
		refetch,
	};
}
