import type { Club, CreateClubData, UpdateClubData, ClubsResponse } from "@/features/clubs/types/clubs";

const API_BASE_URL = "/api";

export interface ApiOptions {
	signal?: AbortSignal;
}

export class ClubsApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Récupère tous les clubs avec pagination et filtres
	 */
	async getClubs(
		options?: ApiOptions,
	): Promise<ClubsResponse> {
		const queryParams = new URLSearchParams();

		const url = `${this.baseUrl}/clubs?${queryParams}`;
		const response = await fetch(url, {
			method: "GET",
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur ${response.status}: ${response.statusText}`);
		}

		return await response.json();
	}

	/**
	 * Récupère un club par son ID
	 */
	async getClubById(id: string, options?: ApiOptions): Promise<Club> {
		const url = `${this.baseUrl}/clubs/${id}`;
		const response = await fetch(url, {
			method: "GET",
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur ${response.status}: ${response.statusText}`);
		}

		return await response.json();
	}

	/**
	 * Crée un nouveau club
	 */
	async createClub(data: CreateClubData, options?: ApiOptions): Promise<Club> {
		const url = `${this.baseUrl}/clubs`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur ${response.status}: ${response.statusText}`);
		}

		return await response.json();
	}

	/**
	 * Met à jour un club
	 */
	async updateClub(id: string, data: UpdateClubData, options?: ApiOptions): Promise<Club> {
		const url = `${this.baseUrl}/clubs/${id}`;
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur ${response.status}: ${response.statusText}`);
		}

		return await response.json();
	}

	/**
	 * Supprime un club
	 */
	async deleteClub(id: string, options?: ApiOptions): Promise<void> {
		const url = `${this.baseUrl}/clubs/${id}`;
		const response = await fetch(url, {
			method: "DELETE",
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur ${response.status}: ${response.statusText}`);
		}
	}
}

// Instance partagée
export const clubsApi = new ClubsApiClient();
