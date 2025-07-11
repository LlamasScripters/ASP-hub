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
	section?: {
		id: string;
		name: string;
		color: string | null;
		club?: {
			id: string;
			name: string;
		};
	};
	sessionsCount?: number;
}

export interface CategoriesPaginatedResponse {
	data: CategoryResponse[];
	total: number;
	page: number;
	limit: number;
}

// Types pour les filtres
export interface CategoryFilters {
	page?: number;
	limit?: number;
	sectionId?: string;
	clubId?: string;
	search?: string;
	isActive?: boolean;
	ageMin?: number;
	ageMax?: number;
}

// Types pour les relations
export interface CategoryWithRelations extends SelectCategory {
	section?: {
		id: string;
		name: string;
		color: string | null;
		club?: {
			id: string;
			name: string;
		};
	};
	sessionsCount?: number;
}
