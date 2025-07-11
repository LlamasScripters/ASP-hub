import type { InsertSessionSport, SelectSessionSport } from "@/db/schema.js";

// Types pour les sessions
export type Session = SelectSessionSport;
export type CreateSessionData = InsertSessionSport;
export type UpdateSessionData = Partial<InsertSessionSport>;

// Énumérations des types et statuts
export type SessionType = "entrainement" | "match" | "stage" | "competition" | "autre";
export type SessionStatus = "planifie" | "en_cours" | "termine" | "annule";

// Types pour les réponses API avec relations
export interface SessionResponse {
	id: string;
	categoryId: string;
	title: string;
	description: string | null;
	type: SessionType;
	status: SessionStatus;
	startDate: Date;
	endDate: Date;
	location: string | null;
	maxParticipants: number | null;
	currentParticipants: number;
	notes: string | null;
	coachId: string | null;
	responsibleId: string | null;
	createdAt: Date;
	updatedAt: Date;
	// Relations
	category?: {
		id: string;
		name: string;
		ageMin: number | null;
		ageMax: number | null;
		section?: {
			id: string;
			name: string;
			color: string | null;
			club?: {
				id: string;
				name: string;
			};
		};
	};
	coach?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
	responsible?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
	participants?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	}[];
	participantsCount?: number;
}

export interface SessionsPaginatedResponse {
	data: SessionResponse[];
	total: number;
	page: number;
	limit: number;
}

// Types pour les filtres
export interface SessionFilters {
	page?: number;
	limit?: number;
	categoryId?: string;
	clubId?: string;
	sectionId?: string;
	type?: SessionType;
	status?: SessionStatus;
	coachId?: string;
	responsibleId?: string;
	startDate?: Date;
	endDate?: Date;
	search?: string;
}

// Types pour les relations
export interface SessionWithRelations extends SelectSessionSport {
	category?: {
		id: string;
		name: string;
		ageMin: number | null;
		ageMax: number | null;
		section?: {
			id: string;
			name: string;
			color: string | null;
			club?: {
				id: string;
				name: string;
			};
		};
	};
	coach?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
	responsible?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
	participants?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	}[];
	participantsCount?: number;
}

// Types pour les statistiques
export interface SessionStats {
	totalSessions: number;
	sessionsByType: Record<SessionType, number>;
	sessionsByStatus: Record<SessionStatus, number>;
	averageParticipants: number;
	upcomingSessions: number;
	completedSessions: number;
}

// Types pour les participants
export interface SessionParticipant {
	sessionId: string;
	memberId: string;
	joinedAt: Date;
	member: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
}

// Types pour les actions sur les participants
export interface ParticipantAction {
	memberIds: string[];
	action: "add" | "remove";
}

// Types pour les conflits de planning
export interface SessionConflict {
	sessionId: string;
	title: string;
	startDate: Date;
	endDate: Date;
	location: string | null;
	conflictType: "time" | "location" | "coach" | "participant";
	conflictWith: string;
}
