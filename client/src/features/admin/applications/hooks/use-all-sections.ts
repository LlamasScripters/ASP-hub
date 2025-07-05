import { useQuery } from "@tanstack/react-query";

interface Section {
	id: string;
	name: string;
	description: string | null;
	color: string | null;
	clubId: string;
	isActive: boolean;
	createdAt: string;
	categoriesCount: number;
	club: {
		id: string;
		name: string;
	} | null;
}

/**
 * Hook to fetch all sections across all clubs
 * Useful for application filters and other cross-club functionality
 */
export function useAllSections() {
	return useQuery({
		queryKey: ["all-sections"],
		queryFn: async (): Promise<Section[]> => {
			const response = await fetch("/api/clubs/all/sections");
			if (!response.ok) {
				throw new Error("Erreur lors du chargement des sections");
			}
			return response.json();
		},
	});
}
