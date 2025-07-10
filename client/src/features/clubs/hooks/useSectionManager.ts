import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleClubError, showSuccessMessage } from "../lib/error-handling";
import { clubsQueryKeys } from "../lib/query-keys";
import type {
	AssignManagerParams,
	RemoveManagerParams,
	ResponsibilityAssignmentResponse,
} from "../types/mutations";

export function useSectionManager() {
	const queryClient = useQueryClient();

	const assignManagerMutation = useMutation({
		mutationFn: async (
			params: AssignManagerParams,
		): Promise<ResponsibilityAssignmentResponse> => {
			const { clubId, sectionId, userId } = params;
			return await api
				.post(`clubs/${clubId}/sections/${sectionId}/manager`, {
					json: { userId },
				})
				.json<ResponsibilityAssignmentResponse>();
		},
		onSuccess: (_, variables) => {
			// Invalidate related queries using centralized query keys
			queryClient.invalidateQueries({
				queryKey: clubsQueryKeys.sections(variables.clubId),
			});
			queryClient.invalidateQueries({
				queryKey: clubsQueryKeys.eligibleUsers.section(variables.sectionId),
			});
			showSuccessMessage("manager", "assign");
		},
		onError: (error) => {
			handleClubError(error, "l'assignation du responsable");
		},
	});

	const removeManagerMutation = useMutation({
		mutationFn: async (params: RemoveManagerParams): Promise<void> => {
			const { clubId, sectionId } = params;
			await api.delete(`clubs/${clubId}/sections/${sectionId}/manager`);
		},
		onSuccess: (_, variables) => {
			// Invalidate related queries using centralized query keys
			queryClient.invalidateQueries({
				queryKey: clubsQueryKeys.sections(variables.clubId),
			});
			queryClient.invalidateQueries({
				queryKey: clubsQueryKeys.eligibleUsers.section(variables.sectionId),
			});
			showSuccessMessage("manager", "remove");
		},
		onError: (error) => {
			handleClubError(error, "la suppression du responsable");
		},
	});

	return {
		assignManager: assignManagerMutation.mutateAsync,
		removeManager: removeManagerMutation.mutateAsync,
		isAssigning: assignManagerMutation.isPending,
		isRemoving: removeManagerMutation.isPending,
	};
}
