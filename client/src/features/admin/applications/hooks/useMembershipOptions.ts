import { useQuery } from "@tanstack/react-query";

export interface Section {
	id: string;
	name: string;
	description: string | null;
}

export interface Category {
	id: string;
	name: string;
	description: string | null;
	sectionId: string;
}

export interface MembershipOptions {
	sections: Section[];
	categories: Category[];
}

/**
 * Hook to fetch membership options (sections and categories)
 */
export function useMembershipOptions() {
	return useQuery<MembershipOptions>({
		queryKey: ["membership-options"],
		queryFn: async () => {
			const response = await fetch("/api/onboarding/membership-options");
			if (!response.ok) {
				throw new Error(
					`Failed to fetch membership options: ${response.statusText}`,
				);
			}
			return response.json();
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
}
