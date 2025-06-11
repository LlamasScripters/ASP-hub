import { roomsApi } from "@room-booking/lib/api/rooms";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const openingHoursEntrySchema = z.object({
  open:    z.string().regex(/^\d{2}:\d{2}$/).nullable(),
  close:   z.string().regex(/^\d{2}:\d{2}$/).nullable(),
  closed:  z.boolean(),
});

export const openingHoursSchema = z.record(
  z.enum(days),
  openingHoursEntrySchema
);

export const roomSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().max(500, "La description ne peut pas dépasser 500 caractères"),
  complexId: z.string().uuid(),
  sportType: z.string().min(1, "Le type de sport est requis"),
  openingHours: openingHoursSchema,
  isIndoor: z.boolean(),
  accreditation: z.string().optional(),
  capacity: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createRoomSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est requis")
    .max(255, "Le nom ne peut pas dépasser 255 caractères"),
  description: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères"),
  complexId: z.string().uuid("ID de complexe invalide"),
  sportType: z
    .string()
    .min(1, "Le type de sport est requis")
    .max(100, "Le type de sport ne peut pas dépasser 100 caractères"),
  openingHours: openingHoursSchema,
  isIndoor: z.boolean().default(true),
  accreditation: z
    .string()
    .max(255, "L'accréditation ne peut pas dépasser 255 caractères")
    .optional(),
  capacity: z
    .number()
    .int()
    .nonnegative("La capacité doit être un nombre entier positif")
});

export const updateRoomSchema = createRoomSchema
  .partial()
  .omit({ complexId: true });

export const roomFiltersSchema = z.object({
  search: z.string().optional(),
  sportType: z.string().optional(),
  isIndoor: z.boolean().optional(),
});

export const roomsPaginatedResponseSchema = z.object({
  data: z.array(roomSchema),
  total: z
    .union([z.number(), z.string()])
    .transform((val) =>
      typeof val === "string" ? Number.parseInt(val, 10) : val
    ),
  page: z
    .union([z.number(), z.string()])
    .transform((val) =>
      typeof val === "string" ? Number.parseInt(val, 10) : val
    ),
  limit: z
    .union([z.number(), z.string()])
    .transform((val) =>
      typeof val === "string" ? Number.parseInt(val, 10) : val
    ),
});

export type Room = z.infer<typeof roomSchema>;
export type CreateRoomData = z.infer<typeof createRoomSchema>;
export type UpdateRoomData = z.infer<typeof updateRoomSchema>;
export type RoomsPaginatedResponse = z.infer<typeof roomsPaginatedResponseSchema>;
export type RoomFilters = z.infer<typeof roomFiltersSchema>;
export type OpeningHours = z.infer<typeof openingHoursSchema>;

interface UseRoomsOptions {
  complexId: string;
  initialData?: Room[];
}

export function useRooms({ complexId, initialData = [] }: UseRoomsOptions) {
  const [rooms, setRooms] = useState<Room[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RoomFilters>({});
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);

  /**
   * Fetches rooms based on the current filters and complexId.
   */
  const fetchRooms = useCallback(async () => {
    if (
      !filters.search &&
      !filters.sportType &&
      filters.isIndoor === undefined &&
      initialData.length > 0
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response: RoomsPaginatedResponse =
        await roomsApi.getRoomsByComplexId(complexId, 1, 50);

      let filteredRooms = response.data;

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredRooms = filteredRooms.filter(
          (room) =>
            room.name.toLowerCase().includes(searchTerm) ||
            room.sportType.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.sportType) {
        filteredRooms = filteredRooms.filter(
          (room) => room.sportType === filters.sportType
        );
      }

      if (filters.isIndoor !== undefined) {
        filteredRooms = filteredRooms.filter(
          (room) => room.isIndoor === filters.isIndoor
        );
      }

      setRooms(filteredRooms);
      setPagination({
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: Math.ceil(response.total / response.limit),
      });
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

  /**
   * Updates the filters for fetching rooms.
   * @param newFilters - Partial RoomFilters to update.
   */
  const updateFilters = useCallback((newFilters: Partial<RoomFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  /**
   * Creates a new room.
   */
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
    []
  );

  /**
   * Updates an existing room.
   */
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
            prev.map((room) => (room.id === roomId ? result : room))
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
    []
  );

  /**
   * Deletes a room by its ID.
   */
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

  /**
   * Gets a room by its ID.
   */
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
    []
  );

  useEffect(() => {
    if (filters.search || filters.sportType || filters.isIndoor !== undefined) {
      fetchRooms();
    }
  }, [fetchRooms, filters]);

  return {
    // Data
    rooms,
    filters,
    pagination,

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
