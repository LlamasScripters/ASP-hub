// Types pour les sessions côté client
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
	// Relations
	category?: {
		id: string;
		name: string;
		section: {
			id: string;
			name: string;
			clubId: string;
		};
	};
	coach?: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
	participants?: SessionParticipant[];
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
}

export interface SessionFilters {
	categoryId?: string;
	type?: "entrainement" | "match" | "stage" | "competition" | "autre";
	status?: "planifie" | "en_cours" | "termine" | "annule";
	startDate?: string;
	endDate?: string;
	search?: string;
}

export interface SessionsPaginatedResponse {
	data: SessionSport[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		pages: number;
	};
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
