import { roomReservationsApi } from "@room-booking/lib/api/roomReservations";
import { useCallback } from "react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
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
export type RoomOpeningHours = Record<string, { open: string | null; close: string | null; closed: boolean }>;

// TanStack Query options
export const filteredRoomReservationsQueryOptions = ({
  roomId = "",
  startDate = new Date(),
  endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
}) => ({
  queryKey: ["roomReservations", roomId, startDate, endDate],
  queryFn: () => {
    if (!startDate || !endDate) {
      throw new Error("startDate and endDate are required");
    }
    return roomReservationsApi.getRoomReservationsByRoomId(
      roomId,
      startDate,
      endDate
    );
  },
  enabled: !!roomId && !!startDate && !!endDate,
});

interface UseRoomReservationsOptions {
	roomId?: string;
	startDate?: Date;
	endDate?: Date;
}

export function useRoomReservations(options?: UseRoomReservationsOptions) {
  const roomId = options?.roomId;
  const startDate = options?.startDate || new Date();
  const endDate = options?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const queryClient = useQueryClient();

  const { data: fetchedData, refetch } = useSuspenseQuery({
    queryKey: ["roomReservations", roomId, startDate, endDate],
    queryFn: () => {
      if (!roomId) {
        return { data: [], total: 0 };
      }
      return roomReservationsApi.getRoomReservationsByRoomId(roomId, startDate, endDate);
    },
    initialData: { data: [], total: 0 },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateRoomReservationData) =>
      roomReservationsApi.createRoomReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomReservations"] });
      toast.success("Réservation créée avec succès");
    },
    onError: (error: Error) => {
      console.error("Error creating room reservation:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Erreur lors de la création de la réservation"
      );
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateRoomReservationData;
    }) => roomReservationsApi.updateRoomReservation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomReservations"] });
      toast.success("Réservation modifiée avec succès");
    },
    onError: (error: Error) => {
      console.error("Error updating room reservation:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Erreur lors de la modification de la réservation"
      );
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      roomReservationsApi.deleteRoomReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roomReservations"] });
      toast.success("Réservation supprimée avec succès");
    },
    onError: (error: Error) => {
      console.error("Error deleting room reservation:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Erreur lors de la suppression de la réservation"
      );
    },
  });

  const createRoomReservation = useCallback(
    async (
      data: CreateRoomReservationData
    ): Promise<RoomReservation | null> => {
      try {
        const result = await createMutation.mutateAsync(data);
        return result;
      } catch (error) {
        console.error("Error in createRoomReservation:", error);
        return null;
      }
    },
    [createMutation]
  );

  const updateRoomReservation = useCallback(
    async (
      id: string,
      data: UpdateRoomReservationData
    ): Promise<RoomReservation | null> => {
      try {
        const result = await updateMutation.mutateAsync({ id, data });
        return result;
      } catch (error) {
        console.error("Error in updateRoomReservation:", error);
        return null;
      }
    },
    [updateMutation]
  );

  const deleteRoomReservation = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await deleteMutation.mutateAsync(id);
        return true;
      } catch (error) {
        console.error("Error in deleteRoomReservation:", error);
        return false;
      }
    },
    [deleteMutation]
  );

  return {
    roomReservations: fetchedData.data,
    totalCount: fetchedData.total,
    loading: false,
    error: null,
    createRoomReservation,
    updateRoomReservation,
    deleteRoomReservation,
    updateFilters: () => {}, // Placeholder pour compatibilité
    refetch,
  };
}
