// Types pour les sections côté client
export interface Section {
	id: string;
	clubId: string;
	name: string;
	description?: string;
	color?: string;
	isActive?: boolean;
	createdAt?: string;
	updatedAt?: string;
	// Relations
	club?: {
		id: string;
		name: string;
	};
	categoriesCount?: number;
	manager?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
	// Responsable de section
	managerId?: string;
	managerFirstName?: string;
	managerLastName?: string;
	managerEmail?: string;
}

export interface CreateSectionData {
	clubId: string;
	name: string;
	description?: string;
	color?: string;
}

export interface UpdateSectionData {
	name?: string;
	description?: string;
	color?: string;
}

export interface SectionFilters {
	page?: number;
	limit?: number;
	clubId?: string;
	search?: string;
	isActive?: boolean;
}

export interface SectionsPaginatedResponse {
	data: Section[];
	total: number;
	page: number;
	limit: number;
}
