import {
	type Complex,
	type ComplexFilters,
	type ComplexesPaginatedResponse,
	type CreateComplexData,
	type UpdateComplexData,
	complexSchema,
	complexesPaginatedResponseSchema,
} from "@room-booking/hooks/useComplexes";

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiOptions {
	signal?: AbortSignal;
}

export class ComplexesApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Get all complexes with optional filters.
	 * @param filters : Partial<ComplexFilters>
	 * @param options : ApiOptions
	 */
	async getComplexes(
		filters?: Partial<ComplexFilters>,
		options?: ApiOptions,
	): Promise<ComplexesPaginatedResponse> {
		const queryParams = new URLSearchParams();

		if (filters) {
			for (const [key, value] of Object.entries(filters)) {
				if (value !== undefined && value !== null && value !== "") {
					queryParams.append(key, String(value));
				}
			}
		}

		if (!queryParams.has("page")) {
			queryParams.append("page", "1");
		}
		if (!queryParams.has("limit")) {
			queryParams.append("limit", "20");
		}

		const url = `${this.baseUrl}/complexes?${queryParams}`;

		const response = await fetch(url, {
			signal: options?.signal,
		});

		if (response.status === 404) {
			return {
				data: [],
				total: 0,
				page: 1,
				limit: 20,
			};
		}

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const rawData = await response.json();
		return complexesPaginatedResponseSchema.parse(rawData);
	}

	/**
	 * Get a complex by its ID.
	 * @param id : Complex ID
	 * @param options : ApiOptions
	 */
	async getComplexById(id: string, options?: ApiOptions): Promise<Complex> {
		const response = await fetch(`${this.baseUrl}/complexes/${id}`, {
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const rawData = await response.json();
		return complexSchema.parse(rawData);
	}

	/**
	 * This method creates a new complex with the provided data.
	 * @param data : CreateComplexData
	 * @param options : ApiOptions
	 */
	async createComplex(
		data: CreateComplexData,
		options?: ApiOptions,
	): Promise<Complex> {
		const response = await fetch(`${this.baseUrl}/complexes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const rawData = await response.json();
		return complexSchema.parse(rawData);
	}

	/**
	 * Updates an existing complex with the provided data.
	 * @param id : Complex ID
	 * @param data : UpdateComplexData
	 * @param options : ApiOptions
	 */
	async updateComplex(
		id: string,
		data: UpdateComplexData,
		options?: ApiOptions,
	): Promise<Complex> {
		const response = await fetch(`${this.baseUrl}/complexes/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const rawData = await response.json();
		return complexSchema.parse(rawData);
	}

	/**
	 * Deletes a complex by its ID.
	 * @param id : Complex ID
	 * @param options : ApiOptions
	 */
	async deleteComplex(id: string, options?: ApiOptions) {
		const response = await fetch(`${this.baseUrl}/complexes/${id}`, {
			method: "DELETE",
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return true;
	}
}

export const complexesApi = new ComplexesApiClient();
