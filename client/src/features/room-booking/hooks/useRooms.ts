import { roomsApi } from "@room-booking/lib/api/rooms";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const roomFiltersSchema = z.object({
	search: z.string().optional(),
	type: z.string().optional(),
	isActive: z.boolean().optional(),
});

export const roomSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, "Le nom est requis"),
	complexId: z.string().uuid(),
	capacity: z.number().int().positive().optional(),
	type: z
		.enum(["gym", "pool", "court", "field", "studio", "meeting", "other"])
		.optional(),
	equipment: z.string().optional(),
	isActive: z.boolean().default(true),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const createRoomSchema = z.object({
	name: z
		.string()
		.min(1, "Le nom est requis")
		.max(100, "Le nom ne peut pas dépasser 100 caractères"),
	complexId: z.string().uuid("ID de complexe invalide"),
	capacity: z
		.number()
		.int("La capacité doit être un nombre entier")
		.positive("La capacité doit être positive")
		.max(1000, "La capacité ne peut pas dépasser 1000")
		.optional(),
	type: z
		.enum(["gym", "pool", "court", "field", "studio", "meeting", "other"], {
			errorMap: () => ({ message: "Type de salle invalide" }),
		})
		.optional(),
	equipment: z
		.string()
		.max(500, "L'équipement ne peut pas dépasser 500 caractères")
		.optional(),
	isActive: z.boolean().default(true),
});

export const updateRoomSchema = createRoomSchema
	.partial()
	.omit({ complexId: true });

export type Room = z.infer<typeof roomSchema>;
export type CreateRoomData = z.infer<typeof createRoomSchema>;
export type UpdateRoomData = z.infer<typeof updateRoomSchema>;

export type RoomFilters = z.infer<typeof roomFiltersSchema>;

interface UseRoomsOptions {
	complexId: string;
	initialData?: Room[];
}

export function useRooms({ complexId, initialData = [] }: UseRoomsOptions) {
	const [rooms, setRooms] = useState<Room[]>(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<RoomFilters>({});

	const fetchRooms = useCallback(async () => {
		if (!filters.search && initialData.length > 0) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const fetchedRooms = await roomsApi.getRoomsByComplexId(complexId);

			let filteredRooms = fetchedRooms;

			if (filters.search) {
				filteredRooms = filteredRooms.filter((room) =>
					room.name.toLowerCase().includes(filters.search?.toLowerCase() ?? ""),
				);
			}

			if (filters.type) {
				filteredRooms = filteredRooms.filter(
					(room) => room.type === filters.type,
				);
			}

			if (filters.isActive !== undefined) {
				filteredRooms = filteredRooms.filter(
					(room) => room.isActive === filters.isActive,
				);
			}

			setRooms(filteredRooms);
		} catch (err) {
			let errorMessage = "Une erreur inattendue s'est produite";

			if (err instanceof Error) {
				errorMessage = err.message;
			}

			setError(errorMessage);
			toast.error("Erreur", {
				description: errorMessage,
			});
		} finally {
			setLoading(false);
		}
	}, [complexId, filters, initialData]);

	const updateFilters = useCallback((newFilters: Partial<RoomFilters>) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	}, []);

	const createRoom = useCallback(
		async (data: CreateRoomData): Promise<Room | null> => {
			setLoading(true);
			setError(null);

			try {
				const result = await roomsApi.createRoom(data);

				if (result) {
					toast.success("Succès", {
						description: "Salle créée avec succès",
					});

					setRooms((prev) => [result, ...prev]);
					return result;
				}
				throw new Error("Erreur lors de la création de la salle");
			} catch (err) {
				let errorMessage = "Une erreur inattendue s'est produite";

				if (err instanceof Error) {
					errorMessage = err.message;
				}

				setError(errorMessage);
				toast.error("Erreur", {
					description: errorMessage,
				});
				return null;
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	const updateRoom = useCallback(
		async (roomId: string, data: UpdateRoomData): Promise<Room | null> => {
			setLoading(true);
			setError(null);

			try {
				const result = await roomsApi.updateRoom(roomId, data);

				if (result) {
					toast.success("Succès", {
						description: "Salle mise à jour avec succès",
					});

					setRooms((prev) =>
						prev.map((room) => (room.id === roomId ? result : room)),
					);
					return result;
				}
				throw new Error("Erreur lors de la mise à jour de la salle");
			} catch (err) {
				let errorMessage = "Une erreur inattendue s'est produite";

				if (err instanceof Error) {
					errorMessage = err.message;
				}

				setError(errorMessage);
				toast.error("Erreur", {
					description: errorMessage,
				});
				return null;
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	const deleteRoom = useCallback(async (roomId: string): Promise<boolean> => {
		setLoading(true);
		setError(null);

		try {
			const success = await roomsApi.deleteRoom(roomId);

			if (success) {
				toast.success("Succès", {
					description: "Salle supprimée avec succès",
				});

				setRooms((prev) => prev.filter((room) => room.id !== roomId));
				return true;
			}
			throw new Error("Erreur lors de la suppression de la salle");
		} catch (err) {
			let errorMessage = "Une erreur inattendue s'est produite";

			if (err instanceof Error) {
				errorMessage = err.message;
			}

			setError(errorMessage);
			toast.error("Erreur", {
				description: errorMessage,
			});
			return false;
		} finally {
			setLoading(false);
		}
	}, []);

	const getRoomById = useCallback(
		async (roomId: string): Promise<Room | null> => {
			setLoading(true);
			setError(null);

			try {
				const result = await roomsApi.getRoomById(roomId);

				if (result) {
					return result;
				}
				throw new Error("Salle non trouvée");
			} catch (err) {
				let errorMessage = "Une erreur inattendue s'est produite";

				if (err instanceof Error) {
					errorMessage = err.message;
				}

				setError(errorMessage);
				toast.error("Erreur", {
					description: errorMessage,
				});
				return null;
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	useEffect(() => {
		if (filters.search || filters.type || filters.isActive !== undefined) {
			fetchRooms();
		}
	}, [fetchRooms, filters]);

	return {
		// Data
		rooms,
		filters,

		// State
		loading,
		error,

		// Actions
		fetchRooms,
		updateFilters,
		createRoom,
		updateRoom,
		deleteRoom,
		getRoomById,

		// Helpers
		refresh: fetchRooms,
	};
}
