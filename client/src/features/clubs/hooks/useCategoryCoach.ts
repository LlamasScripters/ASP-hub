import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleClubError, showSuccessMessage } from "../lib/error-handling";
import { clubsQueryKeys } from "../lib/query-keys";
import type {
	AssignCoachParams,
	RemoveCoachParams,
	ResponsibilityAssignmentResponse,
} from "../types/mutations";

export function useCategoryCoach() {
	const queryClient = useQueryClient();

	const assignCoachMutation = useMutation({
		mutationFn: async (
			params: AssignCoachParams,
		): Promise<ResponsibilityAssignmentResponse> => {
			const { clubId, sectionId, categoryId, userId } = params;
			return await api
				.post(
					`clubs/${clubId}/sections/${sectionId}/categories/${categoryId}/coach`,
					{
						json: { userId },
					},
				)
				.json<ResponsibilityAssignmentResponse>();
		},
		onSuccess: (_, variables) => {
			// Invalidate related queries using centralized query keys
			queryClient.invalidateQueries({
				queryKey: clubsQueryKeys.categories(
					variables.clubId,
					variables.sectionId,
				),
			});
			queryClient.invalidateQueries({
				queryKey: clubsQueryKeys.eligibleUsers.category(variables.categoryId),
			});
			showSuccessMessage("coach", "assign");
		},
		onError: (error) => {
			handleClubError(error, "l'assignation du coach");
		},
	});

	const removeCoachMutation = useMutation({
		mutationFn: async (params: RemoveCoachParams): Promise<void> => {
			const { clubId, sectionId, categoryId } = params;
			await api.delete(
				`clubs/${clubId}/sections/${sectionId}/categories/${categoryId}/coach`,
			);
		},
		onSuccess: (_, variables) => {
			// Invalidate related queries using centralized query keys
			queryClient.invalidateQueries({
				queryKey: clubsQueryKeys.categories(
					variables.clubId,
					variables.sectionId,
				),
			});
			queryClient.invalidateQueries({
				queryKey: clubsQueryKeys.eligibleUsers.category(variables.categoryId),
			});
			showSuccessMessage("coach", "remove");
		},
		onError: (error) => {
			handleClubError(error, "la suppression du coach");
		},
	});

	return {
		assignCoach: assignCoachMutation.mutateAsync,
		removeCoach: removeCoachMutation.mutateAsync,
		isAssigning: assignCoachMutation.isPending,
		isRemoving: removeCoachMutation.isPending,
	};
}
