import type { ComplexFilters } from "@/features/room-booking/hooks/useComplexes";
import type { RoomFilters } from "@/features/room-booking/hooks/useRooms";
import {
	complexesApi,
	roomReservationsApi,
	roomsApi,
} from "@room-booking/lib/api";
import { queryOptions } from "@tanstack/react-query";

// Complexes Query Factory
export const complexQueries = {
	all: () => ["complexes"] as const,
	lists: () => [...complexQueries.all(), "list"] as const,
	list: (filters: Partial<ComplexFilters> = {}, page = 1, limit = 20) =>
		queryOptions({
			queryKey: [...complexQueries.lists(), filters, page, limit],
			queryFn: () => complexesApi.getComplexes(filters),
		}),
	details: () => [...complexQueries.all(), "detail"] as const,
	detail: (id: string) =>
		queryOptions({
			queryKey: [...complexQueries.details(), id],
			queryFn: () => complexesApi.getComplexById(id),
		}),
};

// Rooms Query Factory
export const roomQueries = {
	all: () => ["rooms"] as const,
	lists: () => [...roomQueries.all(), "list"] as const,
	list: (filters: Partial<RoomFilters> = {}, page = 1, limit = 20) =>
		queryOptions({
			queryKey: [...roomQueries.lists(), filters, page, limit],
			queryFn: () => roomsApi.getRooms(filters, page, limit),
		}),
	byComplex: (complexId: string, page = 1, limit = 50) =>
		queryOptions({
			queryKey: [...roomQueries.lists(), "by-complex", complexId, page, limit],
			queryFn: () => roomsApi.getRoomsByComplexId(complexId, page, limit),
		}),
	details: () => [...roomQueries.all(), "detail"] as const,
	detail: (id: string) =>
		queryOptions({
			queryKey: [...roomQueries.details(), id],
			queryFn: () => roomsApi.getRoomById(id),
		}),
};

// Room Reservations Query Factory
export const roomReservationQueries = {
	all: () => ["roomReservations"] as const,
	lists: () => [...roomReservationQueries.all(), "list"] as const,
	byRoom: (roomId: string, startDate: Date, endDate: Date) =>
		queryOptions({
			queryKey: [
				...roomReservationQueries.lists(),
				"by-room",
				roomId,
				startDate,
				endDate,
			],
			queryFn: () =>
				roomReservationsApi.getRoomReservationsByRoomId(
					roomId,
					startDate,
					endDate,
				),
			enabled: !!roomId && !!startDate && !!endDate,
		}),
	details: () => [...roomReservationQueries.all(), "detail"] as const,
	detail: (id: string) =>
		queryOptions({
			queryKey: [...roomReservationQueries.details(), id],
			queryFn: () => roomReservationsApi.getRoomReservationById(id),
		}),
};
