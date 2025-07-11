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
	eligibleUsersForSection: (sectionId?: string) => [...responsibilitiesQueryKeys.all, 'eligibleUsers', 'section', sectionId] as const,
	eligibleUsersForCategory: (categoryId?: string) => [...responsibilitiesQueryKeys.all, 'eligibleUsers', 'category', categoryId] as const,
	sectionResponsibilities: (sectionId: string) => [...responsibilitiesQueryKeys.all, 'section', sectionId] as const,
	categoryResponsibilities: (categoryId: string) => [...responsibilitiesQueryKeys.all, 'category', categoryId] as const,
	userResponsibilities: (userId: string) => [...responsibilitiesQueryKeys.all, 'user', userId] as const,
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

export function useEligibleUsersForSection(sectionId?: string) {
	return useQuery({
		queryKey: responsibilitiesQueryKeys.eligibleUsersForSection(sectionId),
		queryFn: () => responsibilitiesApi.getEligibleUsersForSection(sectionId),
		staleTime: 10 * 60 * 1000, // 10 minutes (user data changes infrequently)
		gcTime: 30 * 60 * 1000, // 30 minutes
	});
}

export function useEligibleUsersForCategory(categoryId?: string) {
	return useQuery({
		queryKey: responsibilitiesQueryKeys.eligibleUsersForCategory(categoryId),
		queryFn: () => responsibilitiesApi.getEligibleUsersForCategory(categoryId),
		staleTime: 10 * 60 * 1000, // 10 minutes (user data changes infrequently)
		gcTime: 30 * 60 * 1000, // 30 minutes
	});
}

export function useCategoryResponsibilities(categoryId: string) {
	return useQuery({
		queryKey: responsibilitiesQueryKeys.categoryResponsibilities(categoryId),
		queryFn: () => responsibilitiesApi.getCategoryResponsibilities(categoryId),
		enabled: !!categoryId,
		staleTime: 5 * 60 * 1000,
	});
}

export function useUserResponsibilities(userId: string) {
	return useQuery({
		queryKey: responsibilitiesQueryKeys.userResponsibilities(userId),
		queryFn: () => responsibilitiesApi.getUserResponsibilities(userId),
		enabled: !!userId,
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
			
			// Invalidate eligible users for section
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.eligibleUsersForSection(sectionId) 
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
			
			// Invalidate eligible users for section
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.eligibleUsersForSection(sectionId) 
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
		onSuccess: (_, { categoryId }) => {
			// Invalidate eligible users (their availability might have changed)
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.eligibleUsers() 
			});
			
			// Invalidate eligible users for category
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.eligibleUsersForCategory(categoryId) 
			});
			
			// Invalidate category responsibilities
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.categoryResponsibilities(categoryId) 
			});
			
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
		onSuccess: (_, categoryId) => {
			// Invalidate eligible users (their availability might have changed)
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.eligibleUsers() 
			});
			
			// Invalidate eligible users for category
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.eligibleUsersForCategory(categoryId) 
			});
			
			// Invalidate category responsibilities
			queryClient.invalidateQueries({ 
				queryKey: responsibilitiesQueryKeys.categoryResponsibilities(categoryId) 
			});
			
			toast.success("Coach supprimé avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression";
			toast.error(errorMessage);
		},
	});
}
