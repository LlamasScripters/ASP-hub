import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";
import { minibusReservationsApi } from "../lib/api/minibusReservations";
import type {
  MinibusReservation,
  CreateMinibusReservationData,
  UpdateMinibusReservationData,
  MinibusReservationFilters,
  MinibusReservationsPaginatedResponse,
} from "../lib/api/minibusReservations";
import { Route as MinibusReservationsRoute } from "../../../routes/_authenticated/admin/_admin/assets/minibuses/$minibusId/index";

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
	minibusId?: string;
	searchParams?: Record<string, unknown>;
	routeParams?: Record<string, unknown>;
}

export const filteredQueryOptions = ({
  minibusId = "",
  startDate = new Date(),
  endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
}) => ({
  queryKey: ["minibusReservations", minibusId, startDate, endDate],
  queryFn: () => {
    if (!startDate || !endDate) return Promise.resolve({ data: [], total: 0 });
    return minibusReservationsApi.getMinibusReservationsByMinibusId(
      minibusId,
      startDate,
      endDate
    );
  },
  enabled: !!minibusId && !!startDate && !!endDate,
});

export function useMinibusReservations(options?: UseMinibusReservationsOptions) {
  const fallbackSearchParams = options?.searchParams;
  const fallbackRouteParams = options?.routeParams;
  
  let searchParams: Record<string, unknown>;
  let routeParams: Record<string, unknown>;
  
  try {
    searchParams = fallbackSearchParams || MinibusReservationsRoute.useSearch();
    routeParams = fallbackRouteParams || MinibusReservationsRoute.useParams();
  } catch (error) {
    searchParams = fallbackSearchParams || {};
    routeParams = fallbackRouteParams || {};
  }

  const minibusId = options?.minibusId || (routeParams.minibusId as string);

  const queryClient = useQueryClient();

  const { data: fetchedData, refetch } = useSuspenseQuery({
    queryKey: ["minibusReservations", minibusId],
    queryFn: () => {
      if (!minibusId) return Promise.resolve({ data: [], total: 0 });

      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
      
      return minibusReservationsApi.getMinibusReservationsByMinibusId(
        minibusId,
        sixMonthsAgo,
        sixMonthsFromNow
      );
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateMinibusReservationData) =>
      minibusReservationsApi.createMinibusReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["minibusReservations", minibusId],
      });
      toast.success("Réservation de minibus créée avec succès");
    },
    onError: (error) => {
      const errorMessage = `Erreur lors de la création: ${error.message}`;
      toast.error("Erreur", { description: errorMessage });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateMinibusReservationData;
    }) => minibusReservationsApi.updateMinibusReservation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["minibusReservations", minibusId],
      });
      toast.success("Réservation de minibus mise à jour avec succès");
    },
    onError: (error) => {
      const errorMessage = `Erreur lors de la mise à jour: ${error.message}`;
      toast.error("Erreur", { description: errorMessage });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      minibusReservationsApi.deleteMinibusReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["minibusReservations", minibusId],
      });
      toast.success("Réservation de minibus supprimée avec succès");
    },
    onError: (error) => {
      const errorMessage = `Erreur lors de la suppression: ${error.message}`;
      toast.error("Erreur", { description: errorMessage });
    },
  });

  const updateFilters = useCallback(
    () => {
      console.warn("updateFilters is deprecated - filtering is now done locally in the component");
    },
    []
  );

  const createMinibusReservation = useCallback(
    async (
      data: CreateMinibusReservationData
    ): Promise<MinibusReservation | null> => {
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
    async (
      id: string,
      data: UpdateMinibusReservationData
    ): Promise<MinibusReservation | null> => {
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
    minibusReservations: fetchedData.data,
    totalCount: fetchedData.total,
    loading: !fetchedData.data,
    filters: searchParams,
    updateFilters,
    createMinibusReservation,
    updateMinibusReservation,
    deleteMinibusReservation,
    refetch,
  };
}
