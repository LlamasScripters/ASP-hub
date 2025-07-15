import type {
	Application,
	ApplicationFilters,
	ApplicationsPaginatedResponse,
	ReviewApplicationData,
} from "../types";
import { applicationSchema } from "../types";

import { API_BASE_URL } from "@/lib/config";

export interface ApiOptions {
	signal?: AbortSignal;
}

export class ApplicationsApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Get all pending applications with optional filters
	 */
	async getPendingApplications(
		filters?: Partial<ApplicationFilters>,
		options?: ApiOptions,
	): Promise<ApplicationsPaginatedResponse> {
		const queryParams = new URLSearchParams();

		if (filters) {
			for (const [key, value] of Object.entries(filters)) {
				if (value !== undefined && value !== null && value !== "") {
					queryParams.append(key, String(value));
				}
			}
		}

		if (!queryParams.has("page")) {
			queryParams.set("page", "1");
		}
		if (!queryParams.has("limit")) {
			queryParams.set("limit", "20");
		}

		const url = `${this.baseUrl}/first-login/applications/pending?${queryParams}`;

		const response = await fetch(url, {
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch applications: ${response.statusText}`);
		}

		const rawData = await response.json();

		console.log("Raw API response:", rawData);

		// L'API retourne { success: true, data: applications }
		if (rawData.success && rawData.data) {
			// Temporairement sans validation pour déboguer
			const applications = rawData.data;
			console.log("Applications data:", applications);

			return {
				data: applications,
				total: applications.length,
				page: 1,
				limit: applications.length,
				totalPages: 1,
			};
		}

		throw new Error("Invalid response format from server");
	}

	/**
	 * Get application by ID
	 */
	async getApplicationById(
		id: string,
		options?: ApiOptions,
	): Promise<Application> {
		const response = await fetch(
			`${this.baseUrl}/first-login/applications/${id}`,
			{
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch application: ${response.statusText}`);
		}

		const rawData = await response.json();
		return applicationSchema.parse(rawData);
	}

	/**
	 * Review an application (approve/reject)
	 */
	async reviewApplication(
		id: string,
		data: ReviewApplicationData,
		options?: ApiOptions,
	): Promise<Application> {
		const response = await fetch(
			`${this.baseUrl}/first-login/applications/${id}/review`,
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
			throw new Error(`Failed to review application: ${response.statusText}`);
		}

		const rawData = await response.json();
		return applicationSchema.parse(rawData);
	}
}

export const applicationsApi = new ApplicationsApiClient();
