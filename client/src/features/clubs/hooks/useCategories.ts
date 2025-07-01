import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Category } from "../types";

interface CreateCategoryData {
	name: string;
	description?: string;
	ageRange: string;
	maxParticipants?: number;
}

interface UpdateCategoryData {
	name?: string;
	description?: string;
	ageRange?: string;
	maxParticipants?: number;
}

export function useCategories(clubId: string, sectionId: string) {
	const queryClient = useQueryClient();

	// Query pour récupérer toutes les catégories d'une section
	const {
		data: categories = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["categories", clubId, sectionId],
		queryFn: async (): Promise<Category[]> => {
			const response = await fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories`,
			);
			if (!response.ok) {
				throw new Error("Erreur lors du chargement des catégories");
			}
			return response.json();
		},
	});

	// Mutation pour créer une catégorie
	const createCategoryMutation = useMutation({
		mutationFn: async (data: CreateCategoryData): Promise<Category> => {
			const response = await fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || "Erreur lors de la création de la catégorie",
				);
			}

			return response.json();
		},
		onSuccess: () => {
			// Invalidation et mise à jour du cache
			queryClient.invalidateQueries({
				queryKey: ["categories", clubId, sectionId],
			});
			toast.success("Catégorie créée avec succès !");
		},
		onError: (error) => {
			console.error("Erreur création catégorie:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la création de la catégorie",
			);
		},
	});

	// Mutation pour mettre à jour une catégorie
	const updateCategoryMutation = useMutation({
		mutationFn: async ({
			categoryId,
			data,
		}: {
			categoryId: string;
			data: UpdateCategoryData;
		}): Promise<Category> => {
			const response = await fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || "Erreur lors de la mise à jour de la catégorie",
				);
			}

			return response.json();
		},
		onSuccess: (updatedCategory) => {
			// Invalidation et mise à jour du cache
			queryClient.invalidateQueries({
				queryKey: ["categories", clubId, sectionId],
			});
			queryClient.invalidateQueries({
				queryKey: ["category", clubId, sectionId, updatedCategory.id],
			});
			toast.success("Catégorie mise à jour avec succès !");
		},
		onError: (error) => {
			console.error("Erreur mise à jour catégorie:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la mise à jour de la catégorie",
			);
		},
	});

	// Mutation pour supprimer une catégorie
	const deleteCategoryMutation = useMutation({
		mutationFn: async (categoryId: string): Promise<void> => {
			const response = await fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || "Erreur lors de la suppression de la catégorie",
				);
			}
		},
		onSuccess: () => {
			// Invalidation du cache
			queryClient.invalidateQueries({
				queryKey: ["categories", clubId, sectionId],
			});
			toast.success("Catégorie supprimée avec succès !");
		},
		onError: (error) => {
			console.error("Erreur suppression catégorie:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la suppression de la catégorie",
			);
		},
	});

	// Fonctions wrapper
	const createCategory = async (data: CreateCategoryData): Promise<Category> => {
		return createCategoryMutation.mutateAsync(data);
	};

	const updateCategory = async (
		categoryId: string,
		data: UpdateCategoryData,
	): Promise<Category> => {
		return updateCategoryMutation.mutateAsync({ categoryId, data });
	};

	const deleteCategory = async (categoryId: string): Promise<void> => {
		return deleteCategoryMutation.mutateAsync(categoryId);
	};

	return {
		// Data
		categories,
		isLoading,
		error,

		// Mutations
		createCategory,
		updateCategory,
		deleteCategory,

		// États des mutations
		isCreating: createCategoryMutation.isPending,
		isUpdating: updateCategoryMutation.isPending,
		isDeleting: deleteCategoryMutation.isPending,
	};
}

// Hook pour récupérer une catégorie spécifique
export function useCategory(
	clubId: string,
	sectionId: string,
	categoryId: string,
) {
	return useQuery({
		queryKey: ["category", clubId, sectionId, categoryId],
		queryFn: async (): Promise<Category> => {
			const response = await fetch(
				`/api/clubs/${clubId}/sections/${sectionId}/categories/${categoryId}`,
			);
			if (!response.ok) {
				throw new Error("Erreur lors du chargement de la catégorie");
			}
			return response.json();
		},
		enabled: !!categoryId,
	});
}
