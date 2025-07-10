import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { clubsQueryKeys } from "../lib/query-keys";
import type { EligibleUser } from "../types";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useEligibleUsers() {
	return useQuery<EligibleUser[]>({
		queryKey: clubsQueryKeys.eligibleUsers.all,
		queryFn: async () => {
			return await api.get("clubs/eligible-users").json<EligibleUser[]>();
		},
		staleTime: STALE_TIME,
	});
}

/**
 * Hook to get eligible users for a specific section
 * Includes the current manager of this section in the list
 */
export function useEligibleUsersForSection(sectionId?: string) {
	return useQuery<EligibleUser[]>({
		queryKey: clubsQueryKeys.eligibleUsers.section(sectionId),
		queryFn: async () => {
			const url = sectionId
				? `clubs/eligible-users/section/${sectionId}`
				: "clubs/eligible-users/section";
			return await api.get(url).json<EligibleUser[]>();
		},
		staleTime: STALE_TIME,
		enabled: true, // Always enabled as we can have a list even without sectionId
	});
}

/**
 * Hook to get eligible users for a specific category
 * Includes the current coach of this category in the list
 */
export function useEligibleUsersForCategory(categoryId?: string) {
	return useQuery<EligibleUser[]>({
		queryKey: clubsQueryKeys.eligibleUsers.category(categoryId),
		queryFn: async () => {
			const url = categoryId
				? `clubs/eligible-users/category/${categoryId}`
				: "clubs/eligible-users/category";
			return await api.get(url).json<EligibleUser[]>();
		},
		staleTime: STALE_TIME,
		enabled: true, // Always enabled as we can have a list even without categoryId
	});
}
