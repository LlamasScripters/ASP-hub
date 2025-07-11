import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { responsibilitiesApi } from "./../lib/api";
import type { 
	AssignSectionManagerData, 
	AssignCategoryCoachData 
} from "./../types";

// Query keys
export const responsibilitiesQueryKeys = {
	all: ['responsibilities'] as const,
	eligibleUsers: () => [...responsibilitiesQueryKeys.all, 'eligibleUsers'] as const,
	sectionResponsibilities: (sectionId: string) => [...responsibilitiesQueryKeys.all, 'section', sectionId] as const,
};

// Query hooks
export function useEligibleUsers() {
	return useQuery({
		queryKey: responsibilitiesQueryKeys.eligibleUsers(),
		queryFn: () => responsibilitiesApi.getEligibleUsers(),
		staleTime: 10 * 60 * 1000, // 10 minutes (user data changes infrequently)
		gcTime: 30 * 60 * 1000, // 30 minutes
	});
}

export function useSectionResponsibilities(sectionId: string) {
	return useQuery({
		queryKey: responsibilitiesQueryKeys.sectionResponsibilities(sectionId),
		queryFn: () => responsibilitiesApi.getSectionResponsibilities(sectionId),
		enabled: !!sectionId,
		staleTime: 5 * 60 * 1000,
	});
}

// Mutation hooks
export function useAssignSectionManager() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ sectionId, data }: { sectionId: string; data: AssignSectionManagerData }) =>
			responsibilitiesApi.assignSectionManager(sectionId, data),
		onSuccess: (_, { sectionId }) => {
			// Invalidate section responsibilities
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.sectionResponsibilities(sectionId) 
			});
			
			// Invalidate eligible users (their availability might have changed)
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.eligibleUsers() 
			});
			
			toast.success("Responsable de section assigné avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de l'assignation";
			toast.error(errorMessage);
		},
	});
}

export function useRemoveSectionManager() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (sectionId: string) => responsibilitiesApi.removeSectionManager(sectionId),
		onSuccess: (_, sectionId) => {
			// Invalidate section responsibilities
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.sectionResponsibilities(sectionId) 
			});
			
			// Invalidate eligible users (their availability might have changed)
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.eligibleUsers() 
			});
			
			toast.success("Responsable de section supprimé avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression";
			toast.error(errorMessage);
		},
	});
}

export function useAssignCategoryCoach() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ categoryId, data }: { categoryId: string; data: AssignCategoryCoachData }) =>
			responsibilitiesApi.assignCategoryCoach(categoryId, data),
		onSuccess: () => {
			// Invalidate eligible users (their availability might have changed)
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.eligibleUsers() 
			});
			
			// We might want to invalidate category data too (depends on how it's structured)
			// queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.detail(categoryId) });
			
			toast.success("Coach assigné avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de l'assignation";
			toast.error(errorMessage);
		},
	});
}

export function useRemoveCategoryCoach() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (categoryId: string) => responsibilitiesApi.removeCategoryCoach(categoryId),
		onSuccess: () => {
			// Invalidate eligible users (their availability might have changed)
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.eligibleUsers() 
			});
			
			// We might want to invalidate category data too (depends on how it's structured)
			// queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.detail(categoryId) });
			
			toast.success("Coach supprimé avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression";
			toast.error(errorMessage);
		},
	});
}
