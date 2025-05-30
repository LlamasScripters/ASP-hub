import {
    type Reservation,
    type CreateReservation,
    type UpdateReservation,
    type ReservationFilters,
    type ReservationsPaginatedResponse,
    reservationSchema,
    reservationsPaginatedResponseSchema,
} from "@room-booking/hooks/useReservation";

const API_BASE_URL = "http://localhost:8080/api";

const thisWeekStartDate = new Date();
thisWeekStartDate.setDate(thisWeekStartDate.getDate() - thisWeekStartDate.getDay() + 1); // Set to Monday
const thisWeekEndDate = new Date();
thisWeekEndDate.setDate(thisWeekStartDate.getDate() + 6); // Set to Sunday

export interface ApiOptions {
	signal?: AbortSignal;
}

export class ReservationsApiClient {
    private baseUrl: string;
    private startDate: Date;
    private endDate: Date;

    constructor(
        baseUrl: string = API_BASE_URL, 
        startDate: Date = thisWeekStartDate, 
        endDate: Date = thisWeekEndDate
    ) {
        this.baseUrl = baseUrl;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    async getReservations(
        filters?: Partial<ReservationFilters>,
        startDate?: Date,
        endDate?: Date,
        options?: ApiOptions,
    ): Promise<ReservationsPaginatedResponse> {
        const queryParams = new URLSearchParams({
            startDate: startDate ? startDate.toISOString() : this.startDate.toISOString(),
            endDate: endDate ? endDate.toISOString() : this.endDate.toISOString(),
        });

        if (filters) {
            for (const [key, value] of Object.entries(filters)) {
                if (value !== undefined && value !== null && value !== "") {
                    queryParams.append(key, String(value));
                }
            }
        }

        const response = await fetch(`${this.baseUrl}/reservations?${queryParams}`, {
            signal: options?.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        return reservationsPaginatedResponseSchema.parse(rawData);
    }   

    async getReservationsByRoomId(
        roomId: string,
        startDate?: Date,
        endDate?: Date,
        options?: ApiOptions,
    ): Promise<ReservationsPaginatedResponse> {
        const queryParams = new URLSearchParams({
            startDate: startDate ? startDate.toISOString() : this.startDate.toISOString(),
            endDate: endDate ? endDate.toISOString() : this.endDate.toISOString(),
        });

        const response = await fetch(`${this.baseUrl}/rooms/${roomId}/reservations?${queryParams}`, {
            signal: options?.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        return reservationsPaginatedResponseSchema.parse(rawData);
    }

    async getReservationById(
        reservationId: string,
        options?: ApiOptions,
    ): Promise<Reservation> {
        const response = await fetch(`${this.baseUrl}/reservations/${reservationId}`, {
            signal: options?.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        return reservationSchema.parse(rawData);
    }

    async createReservation(
        data: CreateReservation,
        options?: ApiOptions,
    ): Promise<Reservation | null> {
        const response = await fetch(`${this.baseUrl}/reservations`, {
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
        return reservationSchema.parse(rawData);
    }

    async updateReservation(
        reservationId: string,
        data: UpdateReservation,
        options?: ApiOptions,
    ): Promise<Reservation | null> {
        const response = await fetch(`${this.baseUrl}/reservations/${reservationId}`, {
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
        return reservationSchema.parse(rawData);
    }

    async deleteReservation(
        reservationId: string,
        options?: ApiOptions,
    ): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/reservations/${reservationId}`, {
            method: "DELETE",
            signal: options?.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
    }

}

export const reservationsApi = new ReservationsApiClient();