import { z } from "zod";

export const minibusReservationStatusEnum = z.enum([
	"pending",
	"confirmed",
	"cancelled",
	"completed",
	"no_show",
	"rescheduled",
]);

export const minibusReservationSchema = z.object({
	id: z.string().uuid(),
	title: z.string().min(1, "Le titre est requis"),
	startAt: z.coerce.date(),
	endAt: z.coerce.date(),
	minibusId: z.string().uuid(),
	bookerId: z.string().uuid(),
	status: minibusReservationStatusEnum,
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export const createMinibusReservationSchema = z
	.object({
		title: z
			.string()
			.min(1, "Le titre est requis")
			.max(255, "Le titre ne peut pas dépasser 255 caractères"),
		startAt: z.coerce
			.date()
			.min(new Date(), "La date de début doit être dans le futur"),
		endAt: z.coerce.date(),
		minibusId: z.string().uuid("L'ID du minibus doit être un UUID valide"),
		bookerId: z.string().uuid("L'ID du réservateur doit être un UUID valide"),
		status: minibusReservationStatusEnum.default("pending"),
	})
	.refine((data) => data.endAt > data.startAt, {
		message: "La date de fin doit être postérieure à la date de début",
		path: ["endAt"],
	});

export const updateMinibusReservationSchema = createMinibusReservationSchema
	.innerType()
	.partial()
	.omit({ bookerId: true, minibusId: true });

export const minibusReservationFiltersSchema = z.object({
	status: minibusReservationStatusEnum.optional(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date(),
});

export const minibusReservationsPaginatedResponseSchema = z.object({
	data: z.array(minibusReservationSchema),
	total: z
		.union([z.number(), z.string()])
		.transform((val) =>
			typeof val === "string" ? Number.parseInt(val, 10) : val,
		),
});

export type MinibusReservation = z.infer<typeof minibusReservationSchema>;
export type CreateMinibusReservationData = z.infer<
	typeof createMinibusReservationSchema
>;
export type UpdateMinibusReservationData = z.infer<
	typeof updateMinibusReservationSchema
>;
export type MinibusReservationFilters = z.infer<
	typeof minibusReservationFiltersSchema
>;
export type MinibusReservationsPaginatedResponse = z.infer<
	typeof minibusReservationsPaginatedResponseSchema
>;

const API_BASE_URL = "/api";

/**
 * Get the start and end dates of the week containing `refDate` (lundi → dimanche).
 * Si `refDate` est un dimanche, la semaine calculée commencera quand même au lundi précédent.
 * @param refDate Date de référence (type Date). Par défaut : today (si on appelle sans argument).
 */
export function getWeekBounds(refDate?: Date): { start: Date; end: Date } {
	const now = refDate ? new Date(refDate) : new Date();
	const day = now.getDay();

	const diffToMonday = day === 0 ? -6 : 1 - day;

	const monday = new Date(now);
	monday.setDate(now.getDate() + diffToMonday);
	monday.setHours(0, 0, 0, 0);

	const sunday = new Date(monday);
	sunday.setDate(monday.getDate() + 6);
	sunday.setHours(23, 59, 59, 999);

	return { start: monday, end: sunday };
}

/**
 * Get the start and end dates of the current month.
 * The start date is the first day of the month at 00:00:00,
 * and the end date is the last day of the month at 23:59:59.
 */
export function getMonthBounds(date: Date): { start: Date; end: Date } {
	const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
	firstOfMonth.setHours(0, 0, 0, 0);
	const lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	lastOfMonth.setHours(23, 59, 59, 999);

	return { start: firstOfMonth, end: lastOfMonth };
}

/**
 * Formats a date string to "DD/MM/YYYY HH:mm" in French locale.
 */
export function formatDateTime(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleString("fr-FR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

/**
 * Formats a date to a short string "ddd DD/MM" (e.g., "lun. 01/01").
 */
export function formatDateShort(date: Date): string {
	return date.toLocaleDateString("fr-FR", {
		weekday: "short",
		day: "2-digit",
		month: "2-digit",
	});
}

/**
 * Converts a `Date` object to a string in "YYYY-MM-DDTHH:mm" format
 * in **local time**.
 */
export function toLocalInputDateTime(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Takes a "YYYY-MM-DDTHH:mm" string (value returned by <input type="datetime-local">)
 * and returns a **local** Date object (in the current timezone).
 * Ex. "2025-06-04T18:24" → new Date(2025, 5, 4, 18, 24).
 */
export function parseLocalInputDateTime(val: string): Date {
	const [datePart, timePart] = val.split("T");
	const [year, month, day] = datePart.split("-").map(Number);
	const [hours, minutes] = timePart.split(":").map(Number);

	return new Date(year, month - 1, day, hours, minutes);
}

/**
 * Formats a date to a string "DD/MM/YYYY" (e.g., "01/01/2023").
 */
export function formatDateForInput(date: Date): string {
	return date.toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

export interface ApiOptions {
	signal?: AbortSignal;
}

export class MinibusReservationsApiClient {
	private baseUrl: string;
	private defaultStartDate: Date;
	private defaultEndDate: Date;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
		this.defaultStartDate = new Date();
		this.defaultEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // +30 days
	}

	/**
	 * Get all minibus reservations with optional filters and pagination.
	 * @param filters - Optional filters for minibus reservation search.
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async getMinibusReservations(
		filters?: Partial<MinibusReservationFilters>,
		options?: ApiOptions,
	): Promise<MinibusReservationsPaginatedResponse> {
		const queryParams = new URLSearchParams();

		if (filters) {
			if (filters.status) {
				queryParams.append("status", filters.status);
			}
			if (filters.startDate) {
				queryParams.append("startDate", filters.startDate.toISOString());
			}
			if (filters.endDate) {
				queryParams.append("endDate", filters.endDate.toISOString());
			}
		}

		const response = await fetch(
			`${this.baseUrl}/minibusReservations?${queryParams.toString()}`,
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
		return data as MinibusReservationsPaginatedResponse;
	}

	/**
	 * Get minibus reservations by minibus ID with date range filtering.
	 * @param minibusId - The ID of the minibus to filter reservations by.
	 * @param startDate - Start date for filtering (default is current date).
	 * @param endDate - End date for filtering (default is 30 days from now).
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async getMinibusReservationsByMinibusId(
		minibusId: string,
		startDate: Date = this.defaultStartDate,
		endDate: Date = this.defaultEndDate,
		options?: ApiOptions,
	): Promise<MinibusReservationsPaginatedResponse> {
		const queryParams = new URLSearchParams({
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(),
		});

		const response = await fetch(
			`${this.baseUrl}/minibuses/${minibusId}/minibusReservations?${queryParams.toString()}`,
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
		return data as MinibusReservationsPaginatedResponse;
	}

	/**
	 * Get a single minibus reservation by its ID.
	 * @param reservationId - The ID of the minibus reservation to retrieve.
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async getMinibusReservationById(
		reservationId: string,
		options?: ApiOptions,
	): Promise<MinibusReservation> {
		const response = await fetch(
			`${this.baseUrl}/minibusReservations/${reservationId}`,
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
		return data as MinibusReservation;
	}

	/**
	 * Create a new minibus reservation.
	 * @param data - The data for the new minibus reservation.
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async createMinibusReservation(
		data: CreateMinibusReservationData,
		options?: ApiOptions,
	): Promise<MinibusReservation> {
		const response = await fetch(`${this.baseUrl}/minibusReservations`, {
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
		return result as MinibusReservation;
	}

	/**
	 * Update an existing minibus reservation.
	 * @param reservationId - The ID of the minibus reservation to update.
	 * @param data - The updated data for the minibus reservation.
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async updateMinibusReservation(
		reservationId: string,
		data: UpdateMinibusReservationData,
		options?: ApiOptions,
	): Promise<MinibusReservation> {
		const response = await fetch(
			`${this.baseUrl}/minibusReservations/${reservationId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		return result as MinibusReservation;
	}

	/**
	 * Delete a minibus reservation by its ID.
	 * @param reservationId - The ID of the minibus reservation to delete.
	 * @param options - Optional API options (e.g., AbortSignal).
	 */
	async deleteMinibusReservation(
		reservationId: string,
		options?: ApiOptions,
	): Promise<boolean> {
		const response = await fetch(
			`${this.baseUrl}/minibusReservations/${reservationId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return true;
	}
}

export const minibusReservationsApi = new MinibusReservationsApiClient();
