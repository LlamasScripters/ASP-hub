// Types pour les clubs côté client
export interface Club {
	id: string;
	name: string;
	description?: string;
	address?: string;
	phone?: string;
	email?: string;
	website?: string;
	logo?: string;
	isActive?: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateClubData {
	name: string;
	description?: string;
	address?: string;
	phone?: string;
	email?: string;
	website?: string;
}

export interface UpdateClubData {
	name?: string;
	description?: string;
	address?: string;
	phone?: string;
	email?: string;
	website?: string;
}

export interface ClubFilters {
	page?: number;
	limit?: number;
	search?: string;
	isActive?: boolean;
}

export interface ClubsPaginatedResponse {
	data: Club[];
	total: number;
	page: number;
	limit: number;
}
