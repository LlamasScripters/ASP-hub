import { roomsApi } from "@room-booking/lib/api/rooms";
import { useCallback } from "react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
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
	open: z
		.string()
		.regex(/^\d{2}:\d{2}$/)
		.nullable(),
	close: z
		.string()
		.regex(/^\d{2}:\d{2}$/)
		.nullable(),
	closed: z.boolean(),
});

export const openingHoursSchema = z.record(
	z.enum(days),
	openingHoursEntrySchema,
);

export const frenchDays: Record<keyof OpeningHours, string> = {
	monday: "Lundi",
	tuesday: "Mardi",
	wednesday: "Mercredi",
	thursday: "Jeudi",
	friday: "Vendredi",
	saturday: "Samedi",
	sunday: "Dimanche",
};

export const roomSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, "Le nom est requis"),
	description: z
		.string()
		.max(500, "La description ne peut pas dépasser 500 caractères"),
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
		.nonnegative("La capacité doit être un nombre entier positif"),
});

export const updateRoomSchema = createRoomSchema
	.partial()
	.omit({ complexId: true });

export const roomFiltersSchema = z.object({
	search: z.string().optional(),
	complexId: z.string().uuid().optional(),
	sportType: z.string().optional(),
	isIndoor: z.boolean().optional(),
	page: z.coerce.number().default(1),
	limit: z.coerce.number().default(20),
});

export const roomsPaginatedResponseSchema = z.object({
	data: z.array(roomSchema),
	total: z
		.union([z.number(), z.string()])
		.transform((val) =>
			typeof val === "string" ? Number.parseInt(val, 10) : val,
		),
	page: z
		.union([z.number(), z.string()])
		.transform((val) =>
			typeof val === "string" ? Number.parseInt(val, 10) : val,
		),
	limit: z
		.union([z.number(), z.string()])
		.transform((val) =>
			typeof val === "string" ? Number.parseInt(val, 10) : val,
		),
});

export type OpeningHoursEntry = z.infer<typeof openingHoursEntrySchema>;
export type OpeningHours = z.infer<typeof openingHoursSchema>;
export type Room = z.infer<typeof roomSchema>;
export type CreateRoomData = z.infer<typeof createRoomSchema>;
export type UpdateRoomData = z.infer<typeof updateRoomSchema>;
export type RoomFilters = z.infer<typeof roomFiltersSchema>;
export type RoomsPaginatedResponse = z.infer<typeof roomsPaginatedResponseSchema>;

// TanStack Query options
export const filteredRoomsQueryOptions = ({
  complexId,
  filters = {},
  page = 1,
  limit = 20,
}: {
  complexId?: string;
  filters?: Partial<RoomFilters>;
  page?: number;
  limit?: number;
}) => ({
  queryKey: ["rooms", complexId, filters, page, limit],
  queryFn: () => {
    if (complexId) {
      return roomsApi.getRoomsByComplexId(complexId, page, limit);
    }
    return roomsApi.getRooms(filters, page, limit);
  },
});

interface UseRoomsOptions {
	complexId?: string;
	initialData?: Room[];
}

export function useRooms({ complexId, initialData = [] }: UseRoomsOptions = {}) {
  const queryClient = useQueryClient();

  // Query for fetching rooms
  const { data: fetchedData, refetch } = useSuspenseQuery({
    queryKey: complexId ? ["rooms", "by-complex", complexId] : ["rooms"],
    queryFn: () => {
      if (complexId) {
        return roomsApi.getRoomsByComplexId(complexId, 1, 50);
      }
      return roomsApi.getRooms({}, 1, 50);
    },
    initialData: { data: initialData, total: initialData.length, page: 1, limit: 50 },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateRoomData) => roomsApi.createRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Salle créée avec succès");
    },
    onError: (error: Error) => {
      console.error("Error creating room:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Erreur lors de la création de la salle"
      );
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoomData }) =>
      roomsApi.updateRoom(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Salle modifiée avec succès");
    },
    onError: (error: Error) => {
      console.error("Error updating room:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Erreur lors de la modification de la salle"
      );
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => roomsApi.deleteRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Salle supprimée avec succès");
    },
    onError: (error: Error) => {
      console.error("Error deleting room:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Erreur lors de la suppression de la salle"
      );
    },
  });

  const createRoom = useCallback(
    async (data: CreateRoomData): Promise<Room | null> => {
      try {
        const result = await createMutation.mutateAsync(data);
        return result;
      } catch (error) {
        console.error("Error in createRoom:", error);
        return null;
      }
    },
    [createMutation]
  );

  const updateRoom = useCallback(
    async (id: string, data: UpdateRoomData): Promise<Room | null> => {
      try {
        const result = await updateMutation.mutateAsync({ id, data });
        return result;
      } catch (error) {
        console.error("Error in updateRoom:", error);
        return null;
      }
    },
    [updateMutation]
  );

  const deleteRoom = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await deleteMutation.mutateAsync(id);
        return true;
      } catch (error) {
        console.error("Error in deleteRoom:", error);
        return false;
      }
    },
    [deleteMutation]
  );

  const refresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return {
    rooms: fetchedData.data,
    totalCount: fetchedData.total,
    page: fetchedData.page,
    limit: fetchedData.limit,
    loading: false,
    error: null,
    createRoom,
    updateRoom,
    deleteRoom,
    updateFilters: () => {}, // Placeholder pour compatibilité
    refresh,
    refetch,
  };
}
