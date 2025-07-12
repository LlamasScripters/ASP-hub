import type { 
	Category, 
	CreateCategoryData, 
	UpdateCategoryData, 
	CategoriesPaginatedResponse 
} from "../../types";

const API_BASE_URL = "/api";

export interface ApiOptions {
	signal?: AbortSignal;
}

export class CategoriesApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Récupère toutes les catégories avec pagination et filtres
	 */
	async getCategories(
		options?: ApiOptions,
	): Promise<CategoriesPaginatedResponse> {
		const url = new URL(`${this.baseUrl}/categories`, window.location.origin);

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
	 * Récupère une catégorie par son ID
	 */
	async getCategoryById(id: string, options?: ApiOptions): Promise<Category> {
		const response = await fetch(`${this.baseUrl}/categories/${id}`, {
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
	 * Récupère les catégories d'une section
	 */
	async getCategoriesBySection(
		sectionId: string,
		options?: ApiOptions,
	): Promise<CategoriesPaginatedResponse> {
		const response = await fetch(
			`${this.baseUrl}/categories/section/${sectionId}`,
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
	 * Crée une nouvelle catégorie
	 */
	async createCategory(data: CreateCategoryData, options?: ApiOptions): Promise<Category> {
		const response = await fetch(`${this.baseUrl}/categories`, {
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
	 * Met à jour une catégorie
	 */
	async updateCategory(
		id: string,
		data: UpdateCategoryData,
		options?: ApiOptions,
	): Promise<Category> {
		const response = await fetch(`${this.baseUrl}/categories/${id}`, {
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
	 * Supprime une catégorie
	 */
	async deleteCategory(id: string, options?: ApiOptions): Promise<void> {
		const response = await fetch(`${this.baseUrl}/categories/${id}`, {
			method: "DELETE",
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Erreur HTTP: ${response.status}`);
		}
	}
}

// Instance partagée
export const categoriesApi = new CategoriesApiClient();
