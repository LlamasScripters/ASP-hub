import {
    type RoomOpeningHours,
    type CreateRoomOpeningHoursData,   
    type UpdateRoomOpeningHoursData,
    roomOpeningHoursSchema,
} from "@room-booking/hooks/useRooms";

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiOptions {
    signal?: AbortSignal;
}

export class RoomOpeningHoursApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    /**
     * Get opening hours for a specific room.
     * @param roomId - The ID of the room.
     * @param options - Optional API options (e.g., AbortSignal).
     */
    async getOpeningHours(
        roomId: string,
        options?: ApiOptions
    ): Promise<RoomOpeningHours> {
        const response = await fetch(
            `${this.baseUrl}/rooms/${roomId}/opening-hours`,
            { signal: options?.signal }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        return roomOpeningHoursSchema.parse(rawData);
    }

    /**
     * Create an opening hours for a specific room.
     * @param roomId - The ID of the room.
     * @param data - The opening hours data to create or update.
     * @param options - Optional API options (e.g., AbortSignal).
     */
    async createOpeningHours(
        roomId: string,
        data: CreateRoomOpeningHoursData,
        options?: ApiOptions
    ): Promise<RoomOpeningHours> {
        const response = await fetch(
            `${this.baseUrl}/rooms/${roomId}/opening-hours`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                signal: options?.signal,
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        return roomOpeningHoursSchema.parse(rawData);
    }

    /**
     * Update opening hours for a specific room.
     * @param roomId - The ID of the room.
     * @param data - The updated opening hours data.
     * @param options - Optional API options (e.g., AbortSignal).
     */
    async updateOpeningHours(
        roomId: string,
        data: UpdateRoomOpeningHoursData,
        options?: ApiOptions
    ): Promise<RoomOpeningHours> {
        const response = await fetch(
            `${this.baseUrl}/rooms/${roomId}/opening-hours`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                signal: options?.signal,
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        return roomOpeningHoursSchema.parse(rawData);
    }

    /**
     * Delete opening hours for a specific room.
     * @param roomId - The ID of the room.
     * @param options - Optional API options (e.g., AbortSignal).
     */
    async deleteOpeningHours(
        roomId: string,
        options?: ApiOptions
    ): Promise<void> {
        const response = await fetch(
            `${this.baseUrl}/rooms/${roomId}/opening-hours`,
            {
                method: "DELETE",
                signal: options?.signal,
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // No content to return, just ensure the request was successful
    }   
}

export const roomOpeningHoursApi = new RoomOpeningHoursApiClient();
