import {
  type Reservation,
  type CreateReservationData,
  type UpdateReservationData,
  type ReservationsPaginatedResponse,
  reservationSchema,
  reservationsPaginatedResponseSchema,
} from "@/features/room-booking/hooks/useReservations";

const API_BASE_URL = "http://localhost:8080/api";

/**
 * Get the start and end dates of the current week (Monday to Sunday).
 * If today is Sunday, it considers the week starting from the previous Monday.
 */
export function getWeekBounds(): { start: Date; end: Date } {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const diffToMonday = day === 0 ? -6 : 1 - day; // If today is Sunday, go back 6 days to get the previous Monday
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

export class ReservationsApiClient {
  private baseUrl: string;
  private defaultStartDate: Date;
  private defaultEndDate: Date;

  constructor(
    baseUrl: string = API_BASE_URL,
    startDate?: Date,
    endDate?: Date
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
   * Get all reservations (generic).
   * @param filters : { status?, startDate?, endDate? }
   * @param startDate, endDate : if provided, they override defaultStartDate/defaultEndDate
   */
  async getReservations(
    filters?: Partial<{ status: string; startDate: Date; endDate: Date }>,
    startDate?: Date,
    endDate?: Date,
    options?: ApiOptions
  ): Promise<ReservationsPaginatedResponse> {
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
      `${this.baseUrl}/reservations?${queryParams.toString()}`,
      {
        signal: options?.signal,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const raw = await response.json();
    return reservationsPaginatedResponseSchema.parse(raw);
  }

  /**
   * Get reservations for a given room within a [startDate, endDate] interval.
   * @param roomId : Room ID
   * @param startDate, endDate : desired interval (otherwise, current week by default)
   */
  async getReservationsByRoomId(
    roomId: string,
    startDate?: Date,
    endDate?: Date,
    options?: ApiOptions
  ): Promise<ReservationsPaginatedResponse> {
    const sd = startDate ?? this.defaultStartDate;
    const ed = endDate ?? this.defaultEndDate;

    const queryParams = new URLSearchParams({
      startDate: sd.toISOString(),
      endDate: ed.toISOString(),
    });

    const response = await fetch(
      `${this.baseUrl}/rooms/${roomId}/reservations?${queryParams.toString()}`,
      {
        signal: options?.signal,
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return { data: [], total: 0 };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const raw = await response.json();
    return reservationsPaginatedResponseSchema.parse(raw);
  }

  /**
   * Get a single reservation by its ID.
   */
  async getReservationById(
    reservationId: string,
    options?: ApiOptions
  ): Promise<Reservation> {
    const response = await fetch(
      `${this.baseUrl}/reservations/${reservationId}`,
      {
        signal: options?.signal,
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Réservation non trouvée (404).");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const raw = await response.json();
    return reservationSchema.parse(raw);
  }

  /**
   * Creates a new reservation.
   * Returns the complete Reservation object if successful, otherwise throws an error.
   */
  async createReservation(
    data: CreateReservationData,
    options?: ApiOptions
  ): Promise<Reservation> {
    const response = await fetch(`${this.baseUrl}/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: options?.signal,
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error(
          "Ce créneau est déjà réservé pour cette salle (409 Conflict)."
        );
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const raw = await response.json();
    return reservationSchema.parse(raw);
  }

  /**
   * Updates an existing reservation (PUT /reservations/:id).
   * Returns the updated Reservation object if successful, otherwise throws an error.
   */
  async updateReservation(
    reservationId: string,
    data: UpdateReservationData,
    options?: ApiOptions
  ): Promise<Reservation> {
    const response = await fetch(
      `${this.baseUrl}/reservations/${reservationId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: options?.signal,
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Réservation non trouvée (404).");
      }
      if (response.status === 409) {
        throw new Error(
          "Le créneau mis à jour entre en conflit avec une autre réservation (409)."
        );
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const raw = await response.json();
    return reservationSchema.parse(raw);
  }

  /**
   * Deletes a reservation by its ID.
   * Returns `true` if successful, otherwise throws an error.
   */
  async deleteReservation(
    reservationId: string,
    options?: ApiOptions
  ): Promise<boolean> {
    const response = await fetch(
      `${this.baseUrl}/reservations/${reservationId}`,
      {
        method: "DELETE",
        signal: options?.signal,
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Réservation non trouvée (404).");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  }
}

export const reservationsApi = new ReservationsApiClient();
