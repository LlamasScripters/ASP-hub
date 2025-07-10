export interface Club {
	id: string;
	name: string;
	description?: string;
	address?: string;
	email?: string;
	phone?: string;
	website?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Section {
	id: string;
	name: string;
	description?: string;
	color?: string;
	clubId: string;
	createdAt?: string;
	updatedAt?: string;
	// Responsable de section
	managerId?: string;
	managerFirstName?: string;
	managerLastName?: string;
	managerEmail?: string;
}

export interface Category {
	id: string;
	name: string;
	description?: string;
	ageMin?: number;
	ageMax?: number;
	sectionId: string;
	createdAt?: string;
	updatedAt?: string;
	// Coach de catégorie
	coachId?: string;
	coachFirstName?: string;
	coachLastName?: string;
	coachEmail?: string;
}

export interface EligibleUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface SessionSport {
	id: string;
	title: string;
	description?: string;
	type: "entrainement" | "match" | "stage" | "competition" | "autre";
	status: "planifie" | "en_cours" | "termine" | "annule";
	startDate: string;
	endDate: string;
	location?: string;
	maxParticipants?: number;
	currentParticipants?: number;
	categoryId: string;
	createdAt?: string;
	updatedAt?: string;
	notes?: string;
}

// Re-export types from mutations module for easier access
export type {
	AssignCoachParams,
	RemoveCoachParams,
	AssignManagerParams,
	RemoveManagerParams,
	ResponsibilityAssignmentResponse,
	ClubManagementError,
} from "./types/mutations";
