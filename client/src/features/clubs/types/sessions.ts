// Énumérations des types et statuts
export type SessionType =
	| "entrainement"
	| "match"
	| "stage"
	| "competition"
	| "autre";
export type SessionStatus = "planifie" | "en_cours" | "termine" | "annule";

// Types pour les sessions côté client
export interface SessionSport {
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
	roomReservationId: string | null;
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
	roomReservation?: {
		id: string;
		title: string;
		startAt: Date;
		endAt: Date;
		room: {
			id: string;
			name: string;
			description: string;
			sportType: string;
			complex: {
				id: string;
				name: string;
				description: string;
				street: string;
				city: string;
				postalCode: string;
			};
		};
	};
	participants?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	}[];
	participantsCount?: number;
}

export interface SessionParticipant {
	id: string;
	status: "inscrit" | "present" | "absent" | "excuse";
	registeredAt: string;
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
}

export interface CreateSessionData {
	categoryId: string;
	title: string;
	description?: string;
	type: "entrainement" | "match" | "stage" | "competition" | "autre";
	status: "planifie" | "en_cours" | "termine" | "annule";
	startDate: string;
	endDate: string;
	location?: string;
	maxParticipants?: number;
	notes?: string;
	roomReservationId?: string;
}

export interface CreateSessionWithRoomData extends CreateSessionData {
	roomId: string;
	bookerId: string;
}

export interface UpdateSessionData {
	title?: string;
	description?: string;
	type?: "entrainement" | "match" | "stage" | "competition" | "autre";
	status?: "planifie" | "en_cours" | "termine" | "annule";
	startDate?: string;
	endDate?: string;
	location?: string;
	maxParticipants?: number;
	notes?: string;
	roomReservationId?: string;
}

export interface SessionsPaginatedResponse {
	data: SessionSport[];
	total: number;
}

export interface SessionStats {
	total: number;
	upcoming: number;
	ongoing: number;
	completed: number;
	cancelled: number;
}

export interface SessionConflict {
	type: "coach" | "location" | "participant";
	message: string;
	conflictingSession: {
		id: string;
		title: string;
		startDate: string;
		endDate: string;
	};
}

export interface ParticipantAction {
	action: "add" | "remove" | "update_status";
	userId: string;
	status?: "inscrit" | "present" | "absent" | "excuse";
}
