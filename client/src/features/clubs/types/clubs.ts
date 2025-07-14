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

export interface ClubsResponse {
	data: Club[];
	total: number;
}
