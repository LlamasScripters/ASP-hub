import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoriesApi } from "./../lib/api";
import type { CreateCategoryData, UpdateCategoryData, CategoryFilters } from "./../types";

// Query keys
export const categoriesQueryKeys = {
	all: ['categories'] as const,
	lists: () => [...categoriesQueryKeys.all, 'list'] as const,
	list: (filters: Partial<CategoryFilters> = {}) => [...categoriesQueryKeys.lists(), filters] as const,
	details: () => [...categoriesQueryKeys.all, 'detail'] as const,
	detail: (id: string) => [...categoriesQueryKeys.details(), id] as const,
};

// Query hooks
export function useCategories(filters?: Partial<CategoryFilters>) {
	return useQuery({
		queryKey: categoriesQueryKeys.list(filters),
		queryFn: () => categoriesApi.getCategories(filters),
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

// Mutation hooks
export function useCreateCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateCategoryData) => categoriesApi.createCategory(data),
		onSuccess: (newCategory) => {
			// Invalidate and refetch categories list
			queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.lists() });
			
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
			
			// Invalidate lists to ensure consistency
			queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.lists() });
			
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
			
			// Invalidate lists to ensure consistency
			queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.lists() });
			
			toast.success("Catégorie supprimée avec succès");
		},
		onError: (error) => {
			const errorMessage = error instanceof Error ? error.message : "Erreur lors de la suppression";
			toast.error(errorMessage);
		},
	});
}
