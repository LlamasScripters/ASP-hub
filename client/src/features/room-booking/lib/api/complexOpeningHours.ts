import {
    type ComplexOpeningHours,
    type CreateComplexOpeningHoursData,
    type UpdateComplexOpeningHoursData,
    complexOpeningHoursSchema,
} from "@room-booking/hooks/useComplexes";

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiOptions {
    signal?: AbortSignal;
}

export class ComplexOpeningHoursApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    /**
     * Get opening hours for a specific complex.
     * @param complexId - The ID of the complex.
     * @param options - Optional API options (e.g., AbortSignal).
     */
    async getOpeningHours(
        complexId: string,
        options?: ApiOptions
    ): Promise<ComplexOpeningHours> {
        const response = await fetch(
            `${this.baseUrl}/complexes/${complexId}/opening-hours`,
            { signal: options?.signal }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        return complexOpeningHoursSchema.parse(rawData);
    }

    /**
     * Create an opening hours for a specific complex.
     * @param complexId - The ID of the complex.
     * @param data - The opening hours data to create or update.
     * @param options - Optional API options (e.g., AbortSignal).
     */
    async createOpeningHours(
        complexId: string,
        data: CreateComplexOpeningHoursData,
        options?: ApiOptions
    ): Promise<ComplexOpeningHours> {
        const response = await fetch(
            `${this.baseUrl}/complexes/${complexId}/opening-hours`,
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
        return complexOpeningHoursSchema.parse(rawData);
    }

    /**
     * Update an opening hours for a specific complex.
     * @param complexId - The ID of the complex.
     * @param data - The updated opening hours data.
     * @param options - Optional API options (e.g., AbortSignal).
     */
    async updateOpeningHours(
        complexId: string,
        data: UpdateComplexOpeningHoursData,
        options?: ApiOptions
    ): Promise<ComplexOpeningHours> {
        const response = await fetch(
            `${this.baseUrl}/complexes/${complexId}/opening-hours`,
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
        return complexOpeningHoursSchema.parse(rawData);
    }

    /**
     * Delete an opening hours for a specific complex.
     * @param complexId - The ID of the complex.
     * @param options - Optional API options (e.g., AbortSignal).
     */
    async deleteOpeningHours(
        complexId: string,
        options?: ApiOptions
    ): Promise<void> {
        const response = await fetch(
            `${this.baseUrl}/complexes/${complexId}/opening-hours`,
            {
                method: "DELETE",
                signal: options?.signal,
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
}

export const complexOpeningHoursApi = new ComplexOpeningHoursApiClient();
