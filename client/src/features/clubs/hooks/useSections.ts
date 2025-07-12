import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sectionsApi } from "./../lib/api";
import type { CreateSectionData, UpdateSectionData } from "./../types";

// Query keys
export const sectionsQueryKeys = {
	all: ['sections'] as const,
	lists: () => [...sectionsQueryKeys.all, 'list'] as const,
	list: () => [...sectionsQueryKeys.lists()] as const,
	details: () => [...sectionsQueryKeys.all, 'detail'] as const,
	detail: (id: string) => [...sectionsQueryKeys.details(), id] as const,
	byClub: (clubId: string) => [...sectionsQueryKeys.all, 'byClub', clubId] as const,
};

// Query hooks
export function useSections() {
	return useQuery({
		queryKey: sectionsQueryKeys.list(),
		queryFn: () => sectionsApi.getSections(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

export function useSection(id: string) {
	return useQuery({
		queryKey: sectionsQueryKeys.detail(id),
		queryFn: () => sectionsApi.getSectionById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

export function useSectionsByClub(clubId: string) {
	return useQuery({
		queryKey: sectionsQueryKeys.byClub(clubId),
		queryFn: () => sectionsApi.getSectionsByClubId(clubId),
		enabled: !!clubId,
		staleTime: 5 * 60 * 1000,
	});
}

// Mutation hooks
export function useCreateSection() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateSectionData) => sectionsApi.createSection(data),
		onSuccess: (newSection) => {
			// Invalidate all sections lists
			queryClient.invalidateQueries({ queryKey: sectionsQueryKeys.lists() });
			
			// Invalidate sections by club
			if (newSection.clubId) {
				queryClient.invalidateQueries({ 
					queryKey: sectionsQueryKeys.byClub(newSection.clubId) 
				});
			}
			
			// Invalidate all sections
			queryClient.invalidateQueries({ queryKey: sectionsQueryKeys.all });
			
			// Optimistically update the cache
			queryClient.setQueryData(
				sectionsQueryKeys.detail(newSection.id),
				newSection
			);
			
			toast.success("Section créée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la création";
			toast.error(errorMessage);
		},
	});
}

export function useUpdateSection() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateSectionData }) =>
			sectionsApi.updateSection(id, data),
		onSuccess: (updatedSection, { id }) => {
			// Update the specific section in the cache
			queryClient.setQueryData(
				sectionsQueryKeys.detail(id),
				updatedSection
			);
			
			// Invalidate all sections lists
			queryClient.invalidateQueries({ queryKey: sectionsQueryKeys.lists() });
			
			// Invalidate sections by club
			if (updatedSection.clubId) {
				queryClient.invalidateQueries({ 
					queryKey: sectionsQueryKeys.byClub(updatedSection.clubId) 
				});
			}
			
			// Invalidate all sections
			queryClient.invalidateQueries({ queryKey: sectionsQueryKeys.all });
			
			toast.success("Section modifiée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la modification";
			toast.error(errorMessage);
		},
	});
}

export function useDeleteSection() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => sectionsApi.deleteSection(id),
		onSuccess: (_, id) => {
			// Remove the section from the cache
			queryClient.removeQueries({ queryKey: sectionsQueryKeys.detail(id) });
			
			// Invalidate lists to ensure consistency
			queryClient.invalidateQueries({ queryKey: sectionsQueryKeys.lists() });
			
			// Invalidate all sections by club (we don't know which club it belonged to)
			queryClient.invalidateQueries({ 
				queryKey: [...sectionsQueryKeys.all, 'byClub'] 
			});
			
			toast.success("Section supprimée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression";
			toast.error(errorMessage);
		},
	});
}
