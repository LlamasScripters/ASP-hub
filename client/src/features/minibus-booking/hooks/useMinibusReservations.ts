import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { minibusReservationsApi } from "../lib/api/minibusReservations";
import type {
	MinibusReservation,
	CreateMinibusReservationData,
	UpdateMinibusReservationData,
	MinibusReservationFilters,
	MinibusReservationsPaginatedResponse,
} from "../lib/api/minibusReservations";

export const minibusReservationStatusEnumTranslated = {
	pending: "En attente",
	confirmed: "Confirmée",
	cancelled: "Annulée",
	completed: "Terminée",
	no_show: "Non présentée",
	rescheduled: "Reportée",
};

export type {
	MinibusReservation,
	CreateMinibusReservationData,
	UpdateMinibusReservationData,
	MinibusReservationFilters,
	MinibusReservationsPaginatedResponse,
};

interface UseMinibusReservationsOptions {
	minibusId: string;
	initialData?: MinibusReservation[];
}

export function useMinibusReservations(options: UseMinibusReservationsOptions) {
	const { minibusId, initialData = [] } = options;
	const queryClient = useQueryClient();
	
	const [minibusReservations, setMinibusReservations] = useState<MinibusReservation[]>(initialData);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<Partial<MinibusReservationFilters>>({
		startDate: new Date(),
		endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
	});

	// Query for fetching minibus reservations
	const { 
		data: fetchedData,
		isLoading: queryLoading,
		error: queryError,
		refetch
	} = useQuery({
		queryKey: ["minibusReservations", minibusId, filters],		queryFn: () => {
			if (!filters.startDate || !filters.endDate) return Promise.resolve({ data: [], total: 0 });
			return minibusReservationsApi.getMinibusReservationsByMinibusId(
				minibusId,
				filters.startDate,
				filters.endDate
			);
		},
		enabled: !!minibusId && !!filters.startDate && !!filters.endDate,
	});

	// Create mutation
	const createMutation = useMutation({
		mutationFn: (data: CreateMinibusReservationData) => 
			minibusReservationsApi.createMinibusReservation(data),
		onSuccess: (newReservation) => {
			setMinibusReservations(prev => [newReservation, ...prev]);
			queryClient.invalidateQueries({ queryKey: ["minibusReservations", minibusId] });
			toast.success("Réservation de minibus créée avec succès");
		},
		onError: (error) => {
			const errorMessage = `Erreur lors de la création: ${error.message}`;
			setError(errorMessage);
			toast.error("Erreur", { description: errorMessage });
		},
	});

	// Update mutation
	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateMinibusReservationData }) =>
			minibusReservationsApi.updateMinibusReservation(id, data),
		onSuccess: (updatedReservation) => {
			setMinibusReservations(prev => 
				prev.map(reservation => 
					reservation.id === updatedReservation.id ? updatedReservation : reservation
				)
			);
			queryClient.invalidateQueries({ queryKey: ["minibusReservations", minibusId] });
			toast.success("Réservation de minibus mise à jour avec succès");
		},
		onError: (error) => {
			const errorMessage = `Erreur lors de la mise à jour: ${error.message}`;
			setError(errorMessage);
			toast.error("Erreur", { description: errorMessage });
		},
	});

	// Delete mutation
	const deleteMutation = useMutation({
		mutationFn: (id: string) => minibusReservationsApi.deleteMinibusReservation(id),
		onSuccess: (_, deletedId) => {
			setMinibusReservations(prev => prev.filter(reservation => reservation.id !== deletedId));
			queryClient.invalidateQueries({ queryKey: ["minibusReservations", minibusId] });
			toast.success("Réservation de minibus supprimée avec succès");
		},
		onError: (error) => {
			const errorMessage = `Erreur lors de la suppression: ${error.message}`;
			setError(errorMessage);
			toast.error("Erreur", { description: errorMessage });
		},
	});

	// Update state when query data changes
	useEffect(() => {
		if (fetchedData) {
			setMinibusReservations(fetchedData.data);
			setTotalCount(fetchedData.total);
		}
	}, [fetchedData]);

	// Update loading state
	useEffect(() => {
		setLoading(
			queryLoading || 
			createMutation.isPending || 
			updateMutation.isPending || 
			deleteMutation.isPending
		);
	}, [queryLoading, createMutation.isPending, updateMutation.isPending, deleteMutation.isPending]);

	// Update error state
	useEffect(() => {
		if (queryError) {
			setError(`Erreur lors du chargement: ${queryError.message}`);
		} else {
			setError(null);
		}
	}, [queryError]);

	const updateFilters = useCallback((newFilters: Partial<MinibusReservationFilters>) => {
		setFilters(prev => ({ ...prev, ...newFilters }));
	}, []);

	const createMinibusReservation = useCallback(
		async (data: CreateMinibusReservationData): Promise<MinibusReservation | null> => {
			try {
				const result = await createMutation.mutateAsync(data);
				return result;
			} catch (error) {
				console.error("Error creating minibus reservation:", error);
				return null;
			}
		}, 
		[createMutation]
	);

	const updateMinibusReservation = useCallback(
		async (id: string, data: UpdateMinibusReservationData): Promise<MinibusReservation | null> => {
			try {
				const result = await updateMutation.mutateAsync({ id, data });
				return result;
			} catch (error) {
				console.error("Error updating minibus reservation:", error);
				return null;
			}
		}, 
		[updateMutation]
	);

	const deleteMinibusReservation = useCallback(
		async (id: string): Promise<boolean> => {
			try {
				await deleteMutation.mutateAsync(id);
				return true;
			} catch (error) {
				console.error("Error deleting minibus reservation:", error);
				return false;
			}
		}, 
		[deleteMutation]
	);

	return {
		minibusReservations,
		totalCount,
		loading,
		error,
		filters,
		updateFilters,
		createMinibusReservation,
		updateMinibusReservation,
		deleteMinibusReservation,
		refetch,
	};
}
