import { roomReservationsApi } from "@/features/room-booking/lib/api/roomReservations";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const roomReservationStatusEnumTranslated = {
	pending: "En attente",
	confirmed: "Confirmée",
	cancelled: "Annulée",
	completed: "Terminée",
	no_show: "Non présentée",
	rescheduled: "Reportée",
};

export const roomReservationStatusEnum = z.enum([
	"pending",
	"confirmed",
	"cancelled",
	"completed",
	"no_show",
	"rescheduled",
]);

export const roomReservationSchema = z.object({
	id: z.string().uuid(),
	title: z.string().min(1, "Le titre est requis"),
	startAt: z.coerce.date(),
	endAt: z.coerce.date(),
	roomId: z.string().uuid(),
	bookerId: z.string().uuid(),
	status: roomReservationStatusEnum,
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export const createRoomReservationSchema = z
	.object({
		title: z
			.string()
			.min(1, "Le titre est requis")
			.max(255, "Le titre ne peut pas dépasser 255 caractères"),
		startAt: z.coerce
			.date()
			.min(new Date(), "La date de début doit être dans le futur"),
		endAt: z.coerce.date(),
		roomId: z.string().uuid("L'ID de la salle doit être un UUID valide"),
		bookerId: z.string().uuid("L'ID du réservateur doit être un UUID valide"),
		status: roomReservationStatusEnum.default("pending"),
	})
	.refine((data) => data.endAt > data.startAt, {
		message: "La date de fin doit être postérieure à la date de début",
		path: ["endAt"],
	});

export const updateRoomReservationSchema = createRoomReservationSchema
	.innerType()
	.partial()
	.omit({ bookerId: true, roomId: true });

export const roomReservationFiltersSchema = z.object({
	status: roomReservationStatusEnum.optional(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date(),
});

export const roomReservationsPaginatedResponseSchema = z.object({
	data: z.array(roomReservationSchema),
	total: z
		.union([z.number(), z.string()])
		.transform((val) =>
			typeof val === "string" ? Number.parseInt(val, 10) : val,
		),
});

export type RoomReservation = z.infer<typeof roomReservationSchema>;
export type CreateRoomReservationData = z.infer<typeof createRoomReservationSchema>;
export type UpdateRoomReservationData = z.infer<typeof updateRoomReservationSchema>;
export type RoomReservationFilters = z.infer<typeof roomReservationFiltersSchema>;
export type RoomReservationsPaginatedResponse = z.infer<
	typeof roomReservationsPaginatedResponseSchema
>;

interface UseRoomReservationsOptions {
	roomId: string;
	initialData?: RoomReservation[];
}

export function useRoomReservations({
	roomId,
	initialData = [],
}: UseRoomReservationsOptions) {
	const [roomReservations, setRoomReservations] = useState<RoomReservation[]>(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [filters, setFilters] = useState<RoomReservationFilters>({
		status: undefined,
		startDate: new Date(new Date().setDate(1)), // First day of current month
		endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Last day of next month
	});

	const [totalCount, setTotalCount] = useState<number>(0);

	/**
	 * Calls roomReservationsApi.getRoomReservationsByRoomId
	 */
	const fetchRoomReservations = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			// Convert startDate and endDate to Date if they are ISO strings
			const sd =
				filters.startDate !== undefined
					? new Date(filters.startDate)
					: undefined;
			const ed =
				filters.endDate !== undefined ? new Date(filters.endDate) : undefined;

			const response = await roomReservationsApi.getRoomReservationsByRoomId(
				roomId,
				sd,
				ed,
			);
			setRoomReservations(response.data);
			setTotalCount(response.total);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unexpected error";
			setError(message);
			toast.error("Error", { description: message });
		} finally {
			setLoading(false);
		}
	}, [roomId, filters]);

	/**
	 * Creates a room reservation
	 */
	const createRoomReservation = useCallback(
		async (data: CreateRoomReservationData): Promise<RoomReservation | null> => {
			setLoading(true);
			setError(null);

			try {
				createRoomReservationSchema.parse(data);

				const result = await roomReservationsApi.createRoomReservation(data);
				toast.success("Réservation de salle créée avec succès");

				setRoomReservations((prev) => [result, ...prev]);
				setTotalCount((prev) => prev + 1);
				return result;
			} catch (err) {
				let message = "Unexpected error";

				if (err instanceof z.ZodError) {
					message = err.errors.map((e) => e.message).join(", ");
				} else if (err instanceof Error) {
					message = err.message;
				}

				setError(message);
				toast.error("Error", { description: message });
				return null;
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	/**
	 * Updates a room reservation
	 */
	const updateRoomReservation = useCallback(
		async (
			id: string,
			data: UpdateRoomReservationData,
		): Promise<RoomReservation | null> => {
			setLoading(true);
			setError(null);

			try {
				updateRoomReservationSchema.parse(data);

				const result = await roomReservationsApi.updateRoomReservation(id, data);
				toast.success("Réservation de salle mise à jour avec succès");
				setRoomReservations((prev) => prev.map((r) => (r.id === id ? result : r)));
				return result;
			} catch (err) {
				let message = "Unexpected error";
				if (err instanceof z.ZodError) {
					message = err.errors.map((e) => e.message).join(", ");
				} else if (err instanceof Error) {
					message = err.message;
				}
				setError(message);
				toast.error("Error", { description: message });
				return null;
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	/**
	 * Deletes a room reservation
	 */
	const deleteRoomReservation = useCallback(
		async (id: string): Promise<boolean> => {
			setLoading(true);
			setError(null);

			try {
				const success = await roomReservationsApi.deleteRoomReservation(id);
				if (success) {
					toast.success("Réservation de salle supprimée avec succès");
					setRoomReservations((prev) => prev.filter((r) => r.id !== id));
					setTotalCount((prev) => (prev > 0 ? prev - 1 : 0));
					return true;
				}
				return false;
			} catch (err) {
				const message = err instanceof Error ? err.message : "Unexpected error";
				setError(message);
				toast.error("Error", { description: message });
				return false;
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	/**
	 * Gets a single room reservation by ID
	 */
	const getRoomReservationById = useCallback(
		async (id: string): Promise<RoomReservation | null> => {
			setLoading(true);
			setError(null);

			try {
				const result = await roomReservationsApi.getRoomReservationById(id);
				return result;
			} catch (err) {
				const message = err instanceof Error ? err.message : "Unexpected error";
				setError(message);
				toast.error("Error", { description: message });
				return null;
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	const updateFilters = useCallback(
		(newFilters: Partial<RoomReservationFilters>) => {
			setFilters((prev) => ({ ...prev, ...newFilters }));
		},
		[],
	);

	useEffect(() => {
		fetchRoomReservations();
	}, [fetchRoomReservations]);

	return {
		// Data
		roomReservations,
		totalCount,
		filters,

		// State
		loading,
		error,

		// Actions
		fetchRoomReservations,
		updateFilters,
		createRoomReservation,
		updateRoomReservation,
		deleteRoomReservation,
		getRoomReservationById,

		// Refresh function
		refresh: fetchRoomReservations,
	};
}
