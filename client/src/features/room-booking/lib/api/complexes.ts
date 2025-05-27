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

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const rawData = await response.json();
		return complexesPaginatedResponseSchema.parse(rawData);
	}

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
