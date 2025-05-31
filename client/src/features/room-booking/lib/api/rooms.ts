import {
  type CreateRoomData,
  type Room,
  type RoomFilters,
  type RoomsPaginatedResponse,
  type UpdateRoomData,
  roomSchema,
  roomsPaginatedResponseSchema,
} from "@room-booking/hooks/useRooms";

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiOptions {
  signal?: AbortSignal;
}

export class RoomsApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all rooms with optional filters and pagination.
   * @param filters - Optional filters for room search.
   * @param page - Page number for pagination (default is 1).
   * @param limit - Number of rooms per page (default is 20).
   * @param options - Optional API options (e.g., AbortSignal).
   */
  async getRooms(
    filters?: Partial<RoomFilters>,
    page = 1,
    limit = 20,
    options?: ApiOptions
  ): Promise<RoomsPaginatedResponse> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, String(value));
        }
      }
    }

    const response = await fetch(`${this.baseUrl}/rooms?${queryParams}`, {
      signal: options?.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    return roomsPaginatedResponseSchema.parse(rawData);
  }

  /**
   * Get rooms by complex ID with pagination.
   * @param complexId - The ID of the complex to filter rooms by.
   * @param page - Page number for pagination (default is 1).
   * @param limit - Number of rooms per page (default is 20).
   * @param options - Optional API options (e.g., AbortSignal).
   */
  async getRoomsByComplexId(
    complexId: string,
    page = 1,
    limit = 20,
    options?: ApiOptions
  ): Promise<RoomsPaginatedResponse> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `${this.baseUrl}/complexes/${complexId}/rooms?${queryParams}`,
      {
        signal: options?.signal,
      }
    );

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
    return roomsPaginatedResponseSchema.parse(rawData);
  }

  /**
   * Get a single room by its ID.
   * @param roomId - The ID of the room to retrieve.
   * @param options - Optional API options (e.g., AbortSignal).
   */
  async getRoomById(roomId: string, options?: ApiOptions): Promise<Room> {
    const response = await fetch(`${this.baseUrl}/rooms/${roomId}`, {
      signal: options?.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    return roomSchema.parse(rawData);
  }

  /**
   * Create a new room.
   * @param data - The data for the new room.
   * @param options - Optional API options (e.g., AbortSignal).
   */
  async createRoom(data: CreateRoomData, options?: ApiOptions): Promise<Room> {
    const response = await fetch(`${this.baseUrl}/rooms`, {
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
    return roomSchema.parse(rawData);
  }

  /**
   * Update an existing room.
   * @param roomId - The ID of the room to update.
   * @param data - The updated data for the room.
   * @param options - Optional API options (e.g., AbortSignal).
   */
  async updateRoom(
    roomId: string,
    data: UpdateRoomData,
    options?: ApiOptions
  ): Promise<Room> {
    const response = await fetch(`${this.baseUrl}/rooms/${roomId}`, {
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
    return roomSchema.parse(rawData);
  }

  /**
   * Delete a room by its ID.
   * @param roomId - The ID of the room to delete.
   * @param options - Optional API options (e.g., AbortSignal).
   */
  async deleteRoom(roomId: string, options?: ApiOptions): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/rooms/${roomId}`, {
      method: "DELETE",
      signal: options?.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  }
}

export const roomsApi = new RoomsApiClient();
