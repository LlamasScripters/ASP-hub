import type { InsertSessionSport, SelectSessionSport } from "@/db/schema.js";

// Types pour les sessions
export type Session = SelectSessionSport;
export type CreateSessionData = Omit<InsertSessionSport, 'id' | 'createdAt' | 'updatedAt' | 'currentParticipants'>;
export type UpdateSessionData = Partial<Omit<InsertSessionSport, 'id' | 'createdAt' | 'categoryId'>>;

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
	category: {
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

// Type pour une action individuelle sur un participant
export interface SingleParticipantAction {
	action: "add" | "remove" | "update_status";
	userId: string;
	status?: "inscrit" | "present" | "absent" | "excuse";
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
