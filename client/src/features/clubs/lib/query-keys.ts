/**
 * Centralized query keys for React Query cache management
 * This ensures consistency across all hooks and prevents cache invalidation issues
 */

export const clubsQueryKeys = {
	// Base keys
	all: ["clubs"] as const,
	sections: (clubId?: string) => {
		const keys = [...clubsQueryKeys.all, "sections"];
		return clubId ? [...keys, clubId] : keys;
	},
	categories: (clubId?: string, sectionId?: string) => {
		const keys = [...clubsQueryKeys.all, "categories"];
		if (clubId) keys.push(clubId);
		if (sectionId) keys.push(sectionId);
		return keys;
	},
	eligibleUsers: {
		all: ["eligible-users"] as const,
		section: (sectionId?: string) => {
			const keys = [...clubsQueryKeys.eligibleUsers.all, "section"];
			return sectionId ? [...keys, sectionId] : keys;
		},
		category: (categoryId?: string) => {
			const keys = [...clubsQueryKeys.eligibleUsers.all, "category"];
			return categoryId ? [...keys, categoryId] : keys;
		},
	},
} as const;
