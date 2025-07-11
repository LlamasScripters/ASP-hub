// Types pour les catégories côté client
export interface Category {
	id: string;
	name: string;
	description?: string;
	ageMin?: number;
	ageMax?: number;
	sectionId: string;
	isActive?: boolean;
	createdAt?: string;
	updatedAt?: string;
	// Relations
	section?: {
		id: string;
		name: string;
		clubId: string;
	};
	sessionsCount?: number;
	// Coach de catégorie
	coachId?: string;
	coachFirstName?: string;
	coachLastName?: string;
	coachEmail?: string;
}

export interface CreateCategoryData {
	sectionId: string;
	name: string;
	description?: string;
	ageMin?: number;
	ageMax?: number;
}

export interface UpdateCategoryData {
	name?: string;
	description?: string;
	ageMin?: number;
	ageMax?: number;
}

export interface CategoryFilters {
	sectionId?: string;
	ageMin?: number;
	ageMax?: number;
	search?: string;
	isActive?: boolean;
}

export interface CategoriesPaginatedResponse {
	data: Category[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		pages: number;
	};
}
