import {
	type CreateRoomData,
	type Room,
	type UpdateRoomData,
	roomSchema,
} from "@room-booking/hooks/useRooms";
import { z } from "zod";

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiOptions {
	signal?: AbortSignal;
}

export class RoomsApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	async getRoomsByComplexId(
		complexId: string,
		options?: ApiOptions,
	): Promise<Room[]> {
		const response = await fetch(
			`${this.baseUrl}/complexes/${complexId}/rooms`,
			{
				signal: options?.signal,
			},
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const rawData = await response.json();
		return z.array(roomSchema).parse(rawData);
	}

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

	async updateRoom(
		roomId: string,
		data: UpdateRoomData,
		options?: ApiOptions,
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
