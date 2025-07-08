import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationsApi } from "../lib/api/applications";
import type { ApplicationFilters, ReviewApplicationData } from "../lib/types";

export const applicationQueries = {
	all: () => ["admin", "applications"] as const,
	lists: () => [...applicationQueries.all(), "list"] as const,
	list: (filters: Partial<ApplicationFilters> = {}) => ({
		queryKey: [...applicationQueries.lists(), filters],
		queryFn: () => applicationsApi.getPendingApplications(filters),
	}),
	details: () => [...applicationQueries.all(), "detail"] as const,
	detail: (id: string) => ({
		queryKey: [...applicationQueries.details(), id],
		queryFn: () => applicationsApi.getApplicationById(id),
	}),
};

export function useApplications(filters: Partial<ApplicationFilters> = {}) {
	const queryClient = useQueryClient();

	const {
		data: applicationsResponse,
		isLoading,
		error,
		refetch,
	} = useQuery(applicationQueries.list(filters));

	const reviewMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: ReviewApplicationData }) =>
			applicationsApi.reviewApplication(id, data),
		onSuccess: () => {
			// Invalidate and refetch applications list
			queryClient.invalidateQueries({ queryKey: applicationQueries.lists() });
		},
	});

	return {
		applications: applicationsResponse?.data || [],
		total: applicationsResponse?.total || 0,
		page: applicationsResponse?.page || 1,
		limit: applicationsResponse?.limit || 20,
		totalPages: applicationsResponse?.totalPages || 0,
		isLoading,
		error,
		refetch,
		reviewApplication: reviewMutation.mutate,
		isReviewing: reviewMutation.isPending,
		reviewError: reviewMutation.error,
	};
}

export function useApplication(id: string) {
	return useQuery(applicationQueries.detail(id));
}
