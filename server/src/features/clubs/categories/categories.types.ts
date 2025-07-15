import type { InsertCategory, SelectCategory } from "@/db/schema.js";

// Types pour les catégories
export type Category = SelectCategory;
export type CreateCategoryData = InsertCategory;
export type UpdateCategoryData = Partial<InsertCategory>;

// Types pour les réponses API avec relations
export interface CategoryResponse {
	id: string;
	sectionId: string;
	name: string;
	description: string | null;
	ageMin: number | null;
	ageMax: number | null;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	// Relations
	section: {
		id: string;
		name: string;
		color: string | null;
		club: {
			id: string;
			name: string;
		};
	};
	sessionsCount?: number;
	coach?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
}

export interface CategoriesPaginatedResponse {
	data: CategoryResponse[];
	total: number;
}
