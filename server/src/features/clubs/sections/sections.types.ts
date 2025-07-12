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
	club: {
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
}

