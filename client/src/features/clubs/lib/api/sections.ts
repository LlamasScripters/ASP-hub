import type { Section, SectionsPaginatedResponse, CreateSectionData, UpdateSectionData } from "@/features/clubs/types/sections";

const API_BASE_URL = "/api";

export interface ApiOptions {
	signal?: AbortSignal;
}

export class SectionsApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Récupère toutes les sections avec pagination et filtres
	 */
	async getSections(
		options?: ApiOptions,
	): Promise<SectionsPaginatedResponse> {
		const queryParams = new URLSearchParams();

		const url = `${this.baseUrl}/sections?${queryParams}`;
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
	 * Récupère une section par son ID
	 */
	async getSectionById(id: string, options?: ApiOptions): Promise<Section> {
		const url = `${this.baseUrl}/sections/${id}`;
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
	 * Récupère les sections d'un club spécifique
	 */
	async getSectionsByClubId(clubId: string, options?: ApiOptions): Promise<SectionsPaginatedResponse> {
		const url = `${this.baseUrl}/sections/club/${clubId}`;
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
	 * Crée une nouvelle section
	 */
	async createSection(data: CreateSectionData, options?: ApiOptions): Promise<Section> {
		const url = `${this.baseUrl}/sections`;
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
	 * Met à jour une section
	 */
	async updateSection(id: string, data: UpdateSectionData, options?: ApiOptions): Promise<Section> {
		const url = `${this.baseUrl}/sections/${id}`;
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
	 * Supprime une section
	 */
	async deleteSection(id: string, options?: ApiOptions): Promise<void> {
		const url = `${this.baseUrl}/sections/${id}`;
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
export const sectionsApi = new SectionsApiClient();
