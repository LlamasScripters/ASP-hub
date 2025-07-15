import type {
	CreateSessionData,
	ParticipantAction,
	SessionConflict,
	SessionSport,
	SessionStats,
	SessionsPaginatedResponse,
	UpdateSessionData,
} from "../../types";

const API_BASE_URL = "/api";

export interface ApiOptions {
	signal?: AbortSignal;
}

export class SessionsApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Récupère toutes les sessions
	 */
	async getSessions(options?: ApiOptions): Promise<SessionsPaginatedResponse> {
		const response = await fetch(`${this.baseUrl}/sessionsSport`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		return response.json();
	}

	/**
	 * Récupère une session par son ID
	 */
	async getSessionById(
		id: string,
		options?: ApiOptions,
	): Promise<SessionSport> {
		const response = await fetch(`${this.baseUrl}/sessionsSport/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		return response.json();
	}

	/**
	 * Récupère les sessions d'une catégorie
	 */
	async getSessionsByCategory(
		categoryId: string,
		options?: ApiOptions,
	): Promise<SessionSport[]> {
		const response = await fetch(
			`${this.baseUrl}/sessionsSport/category/${categoryId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		return response.json();
	}

	/**
	 * Récupère les statistiques des sessions
	 */
	async getSessionStats(
		categoryId?: string,
		options?: ApiOptions,
	): Promise<SessionStats> {
		const url = new URL(
			`${this.baseUrl}/sessionsSport/stats`,
			window.location.origin,
		);
		if (categoryId) {
			url.searchParams.append("categoryId", categoryId);
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		return response.json();
	}

	/**
	 * Vérifie les conflits d'une session
	 */
	async checkSessionConflicts(
		sessionData: CreateSessionData,
		options?: ApiOptions,
	): Promise<{ hasConflicts: boolean; conflicts: SessionConflict[] }> {
		const response = await fetch(
			`${this.baseUrl}/sessionsSport/check-conflicts`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sessionData),
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		return response.json();
	}

	/**
	 * Crée une nouvelle session
	 */
	async createSession(
		data: CreateSessionData,
		options?: ApiOptions,
	): Promise<SessionSport> {
		const response = await fetch(`${this.baseUrl}/sessionsSport`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		return response.json();
	}

	/**
	 * Met à jour une session
	 */
	async updateSession(
		id: string,
		data: UpdateSessionData,
		options?: ApiOptions,
	): Promise<SessionSport> {
		const response = await fetch(`${this.baseUrl}/sessionsSport/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		return response.json();
	}

	/**
	 * Supprime une session
	 */
	async deleteSession(id: string, options?: ApiOptions): Promise<void> {
		const response = await fetch(`${this.baseUrl}/sessionsSport/${id}`, {
			method: "DELETE",
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}
	}

	/**
	 * Gère les participants d'une session
	 */
	async manageParticipants(
		sessionId: string,
		action: ParticipantAction,
		options?: ApiOptions,
	): Promise<void> {
		const response = await fetch(
			`${this.baseUrl}/sessionsSport/${sessionId}/participants`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(action),
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}
	}
}

// Instance partagée
export const sessionsApi = new SessionsApiClient();
