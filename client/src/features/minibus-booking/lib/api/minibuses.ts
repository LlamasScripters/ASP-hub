import { z } from "zod";

const days = [
	"monday",
	"tuesday", 
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
] as const;

export const disponibilityEntrySchema = z.object({
	open: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
	close: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
	available: z.boolean(),
});

export const disponibilitySchema = z.record(
	z.enum(days),
	disponibilityEntrySchema,
);

export const minibusSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, "Le nom est requis"),
	description: z.string().max(500, "La description ne peut pas dépasser 500 caractères"),
	licensePlate: z.string().min(1, "La plaque d'immatriculation est requise").max(9, "La plaque d'immatriculation ne peut pas dépasser 9 caractères"),
	capacity: z.number().int().min(1, "La capacité doit être d'au moins 1"),
	disabledPersonCapacity: z.number().int().min(0, "La capacité pour personnes handicapées doit être positive"),
	disponibility: disponibilitySchema,
	isAvailable: z.boolean(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const createMinibusSchema = z.object({
	name: z.string().min(1, "Le nom est requis").max(255, "Le nom ne peut pas dépasser 255 caractères"),
	description: z.string().max(500, "La description ne peut pas dépasser 500 caractères"),
	licensePlate: z.string().min(1, "La plaque d'immatriculation est requise").max(9, "La plaque d'immatriculation ne peut pas dépasser 9 caractères"),
	capacity: z.number().int().min(1, "La capacité doit être d'au moins 1"),
	disabledPersonCapacity: z.number().int().min(0, "La capacité pour personnes handicapées doit être positive"),
	disponibility: disponibilitySchema,
	isAvailable: z.boolean().default(true),
});

export const updateMinibusSchema = createMinibusSchema.partial();

export const minibusFiltersSchema = z.object({
	search: z.string().optional(),
	isAvailable: z.boolean().optional(),
});

export const minibusesPaginatedResponseSchema = z.object({
	data: z.array(minibusSchema),
	total: z.union([z.number(), z.string()]).transform((val) =>
		typeof val === "string" ? Number.parseInt(val, 10) : val,
	),
	page: z.union([z.number(), z.string()]).transform((val) =>
		typeof val === "string" ? Number.parseInt(val, 10) : val,
	),
	limit: z.union([z.number(), z.string()]).transform((val) =>
		typeof val === "string" ? Number.parseInt(val, 10) : val,
	),
});

export type Minibus = z.infer<typeof minibusSchema>;
export type CreateMinibusData = z.infer<typeof createMinibusSchema>;
export type UpdateMinibusData = z.infer<typeof updateMinibusSchema>;
export type MinibusFilters = z.infer<typeof minibusFiltersSchema>;
export type MinibusesPaginatedResponse = z.infer<typeof minibusesPaginatedResponseSchema>;
export type Disponibility = z.infer<typeof disponibilitySchema>;
export type DisponibilityEntry = z.infer<typeof disponibilityEntrySchema>;

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiOptions {
	signal?: AbortSignal;
}

export class MinibusesApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Get all minibuses with optional filters and pagination.
	 * @param filters - Optional filters for minibus search.
	 * @param page - Page number for pagination (default is 1).
	 * @param limit - Number of minibuses per page (default is 20).
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async getMinibuses(
		filters?: Partial<MinibusFilters>,
		page = 1,
		limit = 20,
		options?: ApiOptions,
	): Promise<MinibusesPaginatedResponse> {
		const queryParams = new URLSearchParams({
			page: page.toString(),
			limit: limit.toString(),
		});

		if (filters) {
			if (filters.search) {
				queryParams.append("search", filters.search);
			}
			if (filters.isAvailable !== undefined) {
				queryParams.append("isAvailable", filters.isAvailable.toString());
			}
		}

		const response = await fetch(
			`${this.baseUrl}/minibuses?${queryParams.toString()}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data as MinibusesPaginatedResponse;
	}

	/**
	 * Get a single minibus by its ID.
	 * @param minibusId - The ID of the minibus to retrieve.
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async getMinibusById(minibusId: string, options?: ApiOptions): Promise<Minibus> {
		const response = await fetch(`${this.baseUrl}/minibuses/${minibusId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data as Minibus;
	}

	/**
	 * Create a new minibus.
	 * @param data - The data for the new minibus.
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async createMinibus(data: CreateMinibusData, options?: ApiOptions): Promise<Minibus> {
		const response = await fetch(`${this.baseUrl}/minibuses`, {
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

		const result = await response.json();
		return result as Minibus;
	}

	/**
	 * Update an existing minibus.
	 * @param minibusId - The ID of the minibus to update.
	 * @param data - The updated data for the minibus.
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async updateMinibus(
		minibusId: string,
		data: UpdateMinibusData,
		options?: ApiOptions,
	): Promise<Minibus> {
		const response = await fetch(`${this.baseUrl}/minibuses/${minibusId}`, {
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

		const result = await response.json();
		return result as Minibus;
	}

	/**
	 * Delete a minibus by its ID.
	 * @param minibusId - The ID of the minibus to delete.
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async deleteMinibus(minibusId: string, options?: ApiOptions): Promise<boolean> {
		const response = await fetch(`${this.baseUrl}/minibuses/${minibusId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			signal: options?.signal,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return true;
	}
}

export const minibusesApi = new MinibusesApiClient();
