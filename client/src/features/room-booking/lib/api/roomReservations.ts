import {
	type CreateRoomReservationData,
	type RoomReservation,
	type RoomReservationsPaginatedResponse,
	type UpdateRoomReservationData,
	roomReservationSchema,
	roomReservationsPaginatedResponseSchema,
} from "@/features/room-booking/hooks/useRoomReservations";

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
	return date.toLocaleDateString("fr-FR", {
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
	const pad = (n: number) => n.toString().padStart(2, "0");
	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
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
	const [hour, minute] = timePart.split(":").map(Number);
	return new Date(year, month - 1, day, hour, minute);
}

/**
 * Formats a date to a string "DD/MM/YYYY" (e.g., "01/01/2023").
 */
export function formatDateForInput(date: Date): string {
	return date.toISOString().slice(0, 16);
}

export interface ApiOptions {
	signal?: AbortSignal;
}

export class RoomReservationsApiClient {
	private baseUrl: string;
	private defaultStartDate: Date;
	private defaultEndDate: Date;

	constructor(
		baseUrl: string = API_BASE_URL,
		startDate?: Date,
		endDate?: Date,
	) {
		this.baseUrl = baseUrl;
		if (startDate && endDate) {
			this.defaultStartDate = startDate;
			this.defaultEndDate = endDate;
		} else {
			const { start: s, end: e } = getWeekBounds();
			this.defaultStartDate = s;
			this.defaultEndDate = e;
		}
	}

	/**
	 * Get all room reservations (generic).
	 * @param filters : { status?, startDate?, endDate? }
	 * @param startDate, endDate : if provided, they override defaultStartDate/defaultEndDate
	 */
	async getRoomReservations(
		filters?: Partial<{ status: string; startDate: Date; endDate: Date }>,
		startDate?: Date,
		endDate?: Date,
		options?: ApiOptions,
	): Promise<RoomReservationsPaginatedResponse> {
		const sd = startDate ?? this.defaultStartDate;
		const ed = endDate ?? this.defaultEndDate;

		const queryParams = new URLSearchParams({
			startDate: sd.toISOString(),
			endDate: ed.toISOString(),
		});

		if (filters?.status) {
			queryParams.append("status", filters.status);
		}

		const response = await fetch(
			`${this.baseUrl}/roomReservations?${queryParams.toString()}`,
			{
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const raw = await response.json();
		return roomReservationsPaginatedResponseSchema.parse(raw);
	}

	/**
	 * Get room reservations for a given room within a [startDate, endDate] interval.
	 * @param roomId : Room ID
	 * @param startDate, endDate : desired interval (otherwise, current week by default)
	 */
	async getRoomReservationsByRoomId(
		roomId: string,
		startDate?: Date,
		endDate?: Date,
		options?: ApiOptions,
	): Promise<RoomReservationsPaginatedResponse> {
		const sd = startDate ?? this.defaultStartDate;
		const ed = endDate ?? this.defaultEndDate;

		const queryParams = new URLSearchParams({
			startDate: sd.toISOString(),
			endDate: ed.toISOString(),
		});

		const response = await fetch(
			`${this.baseUrl}/rooms/${roomId}/roomReservations?${queryParams.toString()}`,
			{
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			if (response.status === 404) {
				return { data: [], total: 0 };
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const raw = await response.json();
		return roomReservationsPaginatedResponseSchema.parse(raw);
	}

	/**
	 * Get a single room reservation by its ID.
	 */
	async getRoomReservationById(
		roomReservationId: string,
		options?: ApiOptions,
	): Promise<RoomReservation> {
		const response = await fetch(
			`${this.baseUrl}/roomReservations/${roomReservationId}`,
			{
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error("Réservation non trouvée (404).");
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const raw = await response.json();
		return roomReservationSchema.parse(raw);
	}

	/**
	 * Creates a new room reservation.
	 * Returns the complete RoomReservation object if successful, otherwise throws an error.
	 */
	async createRoomReservation(
		data: CreateRoomReservationData,
		options?: ApiOptions,
	): Promise<RoomReservation> {
		const response = await fetch(`${this.baseUrl}/roomReservations`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			signal: options?.signal,
		});

		if (!response.ok) {
			if (response.status === 409) {
				throw new Error(
					"Ce créneau est déjà réservé pour cette salle (409 Conflict).",
				);
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const raw = await response.json();
		return roomReservationSchema.parse(raw);
	}

	/**
	 * Updates an existing room reservation (PUT /roomReservations/:id).
	 * Returns the updated RoomReservation object if successful, otherwise throws an error.
	 */
	async updateRoomReservation(
		roomReservationId: string,
		data: UpdateRoomReservationData,
		options?: ApiOptions,
	): Promise<RoomReservation> {
		const response = await fetch(
			`${this.baseUrl}/roomReservations/${roomReservationId}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error("Réservation de salle non trouvée (404).");
			}
			if (response.status === 409) {
				throw new Error(
					"Le créneau mis à jour entre en conflit avec une autre réservation de salle (409).",
				);
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const raw = await response.json();
		return roomReservationSchema.parse(raw);
	}

	/**
	 * Deletes a room reservation by its ID.
	 * Returns `true` if successful, otherwise throws an error.
	 */
	async deleteRoomReservation(
		roomReservationId: string,
		options?: ApiOptions,
	): Promise<boolean> {
		const response = await fetch(
			`${this.baseUrl}/roomReservations/${roomReservationId}`,
			{
				method: "DELETE",
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error("Réservation de salle non trouvée (404).");
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return true;
	}
}

export const roomReservationsApi = new RoomReservationsApiClient();
