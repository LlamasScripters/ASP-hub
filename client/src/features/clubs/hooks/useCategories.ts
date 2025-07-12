import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoriesApi } from "./../lib/api";
import type { CreateCategoryData, UpdateCategoryData } from "./../types";

// Query keys
export const categoriesQueryKeys = {
	all: ['categories'] as const,
	lists: () => [...categoriesQueryKeys.all, 'list'] as const,
	list: () => [...categoriesQueryKeys.lists()] as const,
	details: () => [...categoriesQueryKeys.all, 'detail'] as const,
	detail: (id: string) => [...categoriesQueryKeys.details(), id] as const,
};

// Query hooks
export function useCategories() {
	return useQuery({
		queryKey: categoriesQueryKeys.list(),
		queryFn: () => categoriesApi.getCategories(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}

export function useCategory(id: string) {
	return useQuery({
		queryKey: categoriesQueryKeys.detail(id),
		queryFn: () => categoriesApi.getCategoryById(id),
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
	});
}

export function useCategoriesBySection(sectionId: string) {
	return useQuery({
		queryKey: [...categoriesQueryKeys.all, 'section', sectionId],
		queryFn: () => categoriesApi.getCategoriesBySection(sectionId),
		enabled: !!sectionId,
		staleTime: 5 * 60 * 1000,
	});
}

// Mutation hooks
export function useCreateCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateCategoryData) => categoriesApi.createCategory(data),
		onSuccess: (newCategory) => {
			// Invalidate all categories lists
			queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.lists() });
			
			// Invalidate categories by section
			if (newCategory.sectionId) {
				queryClient.invalidateQueries({ 
					queryKey: [...categoriesQueryKeys.all, 'section', newCategory.sectionId] 
				});
			}
			
			// Invalidate all categories (for AllCategoriesPage)
			queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.all });
			
			// Optimistically update the cache
			queryClient.setQueryData(
				categoriesQueryKeys.detail(newCategory.id),
				newCategory
			);
			
			toast.success("Catégorie créée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la création";
			toast.error(errorMessage);
		},
	});
}

export function useUpdateCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateCategoryData }) =>
			categoriesApi.updateCategory(id, data),
		onSuccess: (updatedCategory, { id }) => {
			// Update the specific category in the cache
			queryClient.setQueryData(
				categoriesQueryKeys.detail(id),
				updatedCategory
			);
			
			// Invalidate all categories lists
			queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.lists() });
			
			// Invalidate categories by section
			if (updatedCategory.sectionId) {
				queryClient.invalidateQueries({ 
					queryKey: [...categoriesQueryKeys.all, 'section', updatedCategory.sectionId] 
				});
			}
			
			// Invalidate all categories (for AllCategoriesPage)
			queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.all });
			
			toast.success("Catégorie modifiée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la modification";
			toast.error(errorMessage);
		},
	});
}

export function useDeleteCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => categoriesApi.deleteCategory(id),
		onSuccess: (_, id) => {
			// Remove the category from the cache
			queryClient.removeQueries({ queryKey: categoriesQueryKeys.detail(id) });
			
			// Invalidate all categories lists
			queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.lists() });
			
			// Invalidate all categories by section queries
			queryClient.invalidateQueries({ 
				queryKey: [...categoriesQueryKeys.all, 'section'] 
			});
			
			// Invalidate all categories (for AllCategoriesPage)
			queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.all });
			
			toast.success("Catégorie supprimée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression";
			toast.error(errorMessage);
		},
	});
}
