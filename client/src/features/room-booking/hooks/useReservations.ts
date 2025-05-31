import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { reservationsApi } from "@room-booking/lib/api/reservations";

export const reservationStatusEnum = z.enum([
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "no_show",
  "rescheduled",
]);

export const reservationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Le titre est requis"),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  roomId: z.string().uuid(),
  bookerId: z.string().uuid(),
  status: reservationStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createReservationSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre est requis")
    .max(255, "Le titre ne peut pas dépasser 255 caractères"),
  startAt: z.string().datetime("La date de début doit être un ISO valide"),
  endAt: z.string().datetime("La date de fin doit être un ISO valide"),
  roomId: z.string().uuid("L'ID de la salle doit être un UUID valide"),
  bookerId: z.string().uuid("L'ID du réservateur doit être un UUID valide"),
  status: reservationStatusEnum.default("pending"),
});

export const updateReservationSchema = createReservationSchema
  .partial()
  .omit({ bookerId: true, roomId: true });

export const reservationFiltersSchema = z.object({
  status: reservationStatusEnum.optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const reservationsPaginatedResponseSchema = z.object({
  data: z.array(reservationSchema),
  total: z
    .union([z.number(), z.string()])
    .transform((val) =>
      typeof val === "string" ? Number.parseInt(val, 10) : val
    ),
});

export type Reservation = z.infer<typeof reservationSchema>;
export type CreateReservationData = z.infer<typeof createReservationSchema>;
export type UpdateReservationData = z.infer<typeof updateReservationSchema>;
export type ReservationFilters = z.infer<typeof reservationFiltersSchema>;
export type ReservationsPaginatedResponse = z.infer<
  typeof reservationsPaginatedResponseSchema
>;

interface UseReservationsOptions {
  roomId: string;
  initialData?: Reservation[];
}

export function useReservations({
  roomId,
  initialData = [],
}: UseReservationsOptions) {
  const [reservations, setReservations] = useState<Reservation[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<ReservationFilters>({});

  const [totalCount, setTotalCount] = useState<number>(0);

  /**
   * Calls reservationsApi.getReservationsByRoomId
   */
  const fetchReservations = useCallback(async () => {
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

      const response = await reservationsApi.getReservationsByRoomId(
        roomId,
        sd,
        ed
      );
      setReservations(response.data);
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
   * Creates a reservation
   */
  const createReservation = useCallback(
    async (data: CreateReservationData): Promise<Reservation | null> => {
      setLoading(true);
      setError(null);

      try {
        createReservationSchema.parse(data);

        const result = await reservationsApi.createReservation(data);
        toast.success("Reservation created successfully");

        setReservations((prev) => [result, ...prev]);
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
    []
  );

  /**
   * Updates a reservation
   */
  const updateReservation = useCallback(
    async (
      id: string,
      data: UpdateReservationData
    ): Promise<Reservation | null> => {
      setLoading(true);
      setError(null);

      try {
        updateReservationSchema.parse(data);

        const result = await reservationsApi.updateReservation(id, data);
        toast.success("Reservation updated successfully");
        setReservations((prev) => prev.map((r) => (r.id === id ? result : r)));
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
    []
  );

  /**
   * Deletes a reservation
   */
  const deleteReservation = useCallback(
    async (id: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const success = await reservationsApi.deleteReservation(id);
        if (success) {
          toast.success("Reservation deleted");
          setReservations((prev) => prev.filter((r) => r.id !== id));
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
    []
  );

  /**
   * Gets a single reservation by ID
   */
  const getReservationById = useCallback(
    async (id: string): Promise<Reservation | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await reservationsApi.getReservationById(id);
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
    []
  );

  const updateFilters = useCallback(
    (newFilters: Partial<ReservationFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    []
  );

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return {
    // Data
    reservations,
    totalCount,
    filters,

    // State
    loading,
    error,

    // Actions
    fetchReservations,
    updateFilters,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservationById,

    // Refresh function
    refresh: fetchReservations,
  };
}
