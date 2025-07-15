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

export interface CategoriesPaginatedResponse {
	data: Category[];
	total: number;
}
