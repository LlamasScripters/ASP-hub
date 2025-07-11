import type { InsertSection, SelectSection } from "@/db/schema.js";

// Types pour les sections
export type Section = SelectSection;
export type CreateSectionData = InsertSection;
export type UpdateSectionData = Partial<InsertSection>;

// Types pour les réponses API avec relations
export interface SectionResponse {
	id: string;
	clubId: string;
	name: string;
	description: string | null;
	color: string | null;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
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
}

export interface SectionsPaginatedResponse {
	data: SectionResponse[];
	total: number;
	page: number;
	limit: number;
}

// Types pour les filtres
export interface SectionFilters {
	page?: number;
	limit?: number;
	clubId?: string;
	search?: string;
	isActive?: boolean;
}

// Types pour les relations
export interface SectionWithRelations extends SelectSection {
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
}
