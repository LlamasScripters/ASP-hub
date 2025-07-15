import type {
	AssignCategoryCoachData,
	AssignSectionManagerData,
	EligibleUser,
	Responsibility,
	ResponsibilityAssignmentResponse,
	UserResponsibilityWithDetails,
} from "../../types";

const API_BASE_URL = "/api";

export interface ApiOptions {
	signal?: AbortSignal;
}

export class ResponsibilitiesApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Assigne un responsable de section
	 */
	async assignSectionManager(
		sectionId: string,
		data: AssignSectionManagerData,
		options?: ApiOptions,
	): Promise<ResponsibilityAssignmentResponse> {
		const response = await fetch(
			`${this.baseUrl}/responsibilities/sections/${sectionId}/manager`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		return response.json();
	}

	/**
	 * Supprime un responsable de section
	 */
	async removeSectionManager(
		sectionId: string,
		options?: ApiOptions,
	): Promise<void> {
		const response = await fetch(
			`${this.baseUrl}/responsibilities/sections/${sectionId}/manager`,
			{
				method: "DELETE",
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}
	}

	/**
	 * Récupère les responsabilités d'une section
	 */
	async getSectionResponsibilities(
		sectionId: string,
		options?: ApiOptions,
	): Promise<Responsibility[]> {
		const response = await fetch(
			`${this.baseUrl}/responsibilities/sections/${sectionId}`,
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
	 * Assigne un coach à une catégorie
	 */
	async assignCategoryCoach(
		categoryId: string,
		data: AssignCategoryCoachData,
		options?: ApiOptions,
	): Promise<ResponsibilityAssignmentResponse> {
		const response = await fetch(
			`${this.baseUrl}/responsibilities/categories/${categoryId}/coach`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}

		return response.json();
	}

	/**
	 * Supprime un coach d'une catégorie
	 */
	async removeCategoryCoach(
		categoryId: string,
		options?: ApiOptions,
	): Promise<void> {
		const response = await fetch(
			`${this.baseUrl}/responsibilities/categories/${categoryId}/coach`,
			{
				method: "DELETE",
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}
	}

	/**
	 * Récupère les utilisateurs éligibles
	 */
	async getEligibleUsers(options?: ApiOptions): Promise<EligibleUser[]> {
		const response = await fetch(
			`${this.baseUrl}/responsibilities/eligible-users`,
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
	 * Récupère les utilisateurs éligibles pour une section
	 */
	async getEligibleUsersForSection(
		sectionId?: string,
		options?: ApiOptions,
	): Promise<EligibleUser[]> {
		const url = sectionId
			? `${this.baseUrl}/responsibilities/eligible-users/section/${sectionId}`
			: `${this.baseUrl}/responsibilities/eligible-users/section`;

		const response = await fetch(url, {
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
	 * Récupère les utilisateurs éligibles pour une catégorie
	 */
	async getEligibleUsersForCategory(
		categoryId?: string,
		options?: ApiOptions,
	): Promise<EligibleUser[]> {
		const url = categoryId
			? `${this.baseUrl}/responsibilities/eligible-users/category/${categoryId}`
			: `${this.baseUrl}/responsibilities/eligible-users/category`;

		const response = await fetch(url, {
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
	 * Récupère les responsabilités d'une catégorie
	 */
	async getCategoryResponsibilities(
		categoryId: string,
		options?: ApiOptions,
	): Promise<Responsibility[]> {
		const response = await fetch(
			`${this.baseUrl}/responsibilities/categories/${categoryId}`,
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
	 * Récupère les responsabilités d'un utilisateur
	 */
	async getUserResponsibilities(
		userId: string,
		options?: ApiOptions,
	): Promise<UserResponsibilityWithDetails[]> {
		const response = await fetch(
			`${this.baseUrl}/responsibilities/users/${userId}`,
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
}

// Instance partagée
export const responsibilitiesApi = new ResponsibilitiesApiClient();
