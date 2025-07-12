// Types pour les responsabilités côté client
export interface Responsibility {
	id: string;
	role: "section_manager" | "coach";
	userId: string;
	sectionId?: string;
	categoryId?: string;
	assignedAt: string;
	// Relations
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
	section?: {
		id: string;
		name: string;
		clubId: string;
	};
	category?: {
		id: string;
		name: string;
		sectionId: string;
	};
}

// Nouveau type pour les responsabilités utilisateur avec détails
export interface UserResponsibilityWithDetails {
	id: string;
	role: "section_manager" | "coach";
	assignedAt: string;
	sectionId: string | null;
	sectionName: string | null;
	sectionClubId: string | null;
	categoryId: string | null;
	categoryName: string | null;
}

export interface CreateResponsibilityData {
	role: "section_manager" | "coach";
	userId: string;
	sectionId?: string;
	categoryId?: string;
}

export interface EligibleUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface AssignSectionManagerData {
	userId: string;
}

export interface AssignCategoryCoachData {
	userId: string;
}

export interface ResponsibilityAssignmentResponse {
	id: string;
	message: string;
	success: boolean;
}
