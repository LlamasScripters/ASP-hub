// Types pour les responsabilités côté client
export interface Responsibility {
	id: string;
	role: "section_manager" | "category_coach";
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

export interface CreateResponsibilityData {
	role: "section_manager" | "category_coach";
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
	responsibility: Responsibility;
}
