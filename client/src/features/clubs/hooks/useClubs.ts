import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { clubsApi } from "./../lib/api";
import type { CreateClubData, UpdateClubData } from "./../types";

// Query keys
export const clubsQueryKeys = {
	all: ['clubs'] as const,
	lists: () => [...clubsQueryKeys.all, 'list'] as const,
	list: () => [...clubsQueryKeys.lists()] as const,
	details: () => [...clubsQueryKeys.all, 'detail'] as const,
	detail: (id: string) => [...clubsQueryKeys.details(), id] as const,
};

// Query hooks
export function useClubs() {
	return useQuery({
		queryKey: clubsQueryKeys.list(),
		queryFn: () => clubsApi.getClubs(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

export function useClub(id: string) {
	return useQuery({
		queryKey: clubsQueryKeys.detail(id),
		queryFn: () => clubsApi.getClubById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

// Mutation hooks
export function useCreateClub() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateClubData) => clubsApi.createClub(data),
		onSuccess: (newClub) => {
			// Invalidate and refetch clubs list
			queryClient.invalidateQueries({ queryKey: clubsQueryKeys.lists() });
			
			// Optimistically update the cache
			queryClient.setQueryData(
				clubsQueryKeys.detail(newClub.id),
				newClub
			);
			
			toast.success("Association créée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la création";
			toast.error(errorMessage);
		},
	});
}

export function useUpdateClub() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateClubData }) =>
			clubsApi.updateClub(id, data),
		onSuccess: (updatedClub, { id }) => {
			// Update the specific club in the cache
			queryClient.setQueryData(
				clubsQueryKeys.detail(id),
				updatedClub
			);
			
			// Invalidate lists to ensure consistency
			queryClient.invalidateQueries({ queryKey: clubsQueryKeys.lists() });
			
			toast.success("Association modifiée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la modification";
			toast.error(errorMessage);
		},
	});
}

export function useDeleteClub() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => clubsApi.deleteClub(id),
		onSuccess: (_, id) => {
			// Remove the club from the cache
			queryClient.removeQueries({ queryKey: clubsQueryKeys.detail(id) });
			
			// Invalidate lists to ensure consistency
			queryClient.invalidateQueries({ queryKey: clubsQueryKeys.lists() });
			
			toast.success("Association supprimée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression";
			toast.error(errorMessage);
		},
	});
}
