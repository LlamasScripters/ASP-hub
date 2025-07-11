// Types pour les responsabilités
export interface SectionResponsibility {
	id: string;
	userId: string;
	sectionId: string | null;
	categoryId: string | null;
	role: "section_manager" | "coach";
	assignedAt: Date;
	isActive: boolean;
}

export interface ResponsibilityWithUser extends SectionResponsibility {
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
}

export interface ResponsibilityAssignmentResult {
	id: string;
	message: string;
	success: boolean;
}

export interface ResponsibilityFilters {
	sectionId?: string;
	categoryId?: string;
	role?: "section_manager" | "coach";
	isActive?: boolean;
	userId?: string;
}
