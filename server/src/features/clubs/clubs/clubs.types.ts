import type { InsertClub, SelectClub } from "@/db/schema.js";

// Types pour les clubs
export type Club = SelectClub;
export type CreateClubData = InsertClub;
export type UpdateClubData = Partial<InsertClub>;

// Types pour les réponses API
export interface ClubResponse {
	id: string;
	name: string;
	description: string | null;
	address: string | null;
	phone: string | null;
	email: string | null;
	website: string | null;
	logo: string | null;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface ClubsPaginatedResponse {
	data: ClubResponse[];
	total: number;
}
