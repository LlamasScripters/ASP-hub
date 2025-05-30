import { reservationsApi } from "@room-booking/lib/api/reservations";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const reservationStatusEnum = z.enum(["pending", "confirmed", "cancelled", "completed", "no-show", "rescheduled"]);

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
    startAt: z
        .string()
        .datetime("La date de début doit être une date valide"),
    endAt: z
        .string()
        .datetime("La date de fin doit être une date valide"),
    roomId: z
        .string()
        .uuid("L'identifiant de la salle doit être un UUID valide"),
    bookerId: z
        .string()
        .uuid("L'identifiant du réservateur doit être un UUID valide"),
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
    startDate: z
    .union([z.string().datetime(), z.date()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val)),
    endDate: z
    .union([z.string().datetime(), z.date()])
    .transform((val) => (typeof val === "string" ? new Date(val) : val)),
    total: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === "string" ? Number.parseInt(val, 10) : val)),
});

export type Reservation = z.infer<typeof reservationSchema>;
export type CreateReservation = z.infer<typeof createReservationSchema>;
export type UpdateReservation = z.infer<typeof updateReservationSchema>;
export type ReservationFilters = z.infer<typeof reservationFiltersSchema>;
export type ReservationsPaginatedResponse = z.infer<typeof reservationsPaginatedResponseSchema>;

interface UseReservationOptions {
    roomId: string;
    initialData?: Reservation[];
}

export function useReservation({ roomId, initialData = [] }: UseReservationOptions) {
    const [reservations, setReservations] = useState<Reservation[]>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<ReservationFilters>({});
    const [pagination, setPagination] = useState<{
        total: number;
        startDate?: Date;
        endDate?: Date;
        totalPages: number;
    } | null>(null);

    const fetchReservations = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await reservationsApi.getReservationsByRoomId(
                roomId,
                filters.startDate ? new Date(filters.startDate) : undefined,
                filters.endDate ? new Date(filters.endDate) : undefined
            );

            setReservations(response.data);
            setPagination({
                total: response.total,
                startDate: response.startDate,
                endDate: response.endDate,
                totalPages: Math.ceil(response.total / 20),
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erreur inattendue";
            setError(message);
            toast.error("Erreur", { description: message });
        } finally {
            setLoading(false);
        }
    }, [roomId, filters]);

    const createReservation = useCallback(async (data: CreateReservation): Promise<Reservation | null> => {
        setLoading(true);
        setError(null);

        try {
            const result = await reservationsApi.createReservation(data);
            if (result) {
                toast.success("Réservation créée avec succès");
                setReservations((prev) => [result, ...prev]);
                return result;
            }
            throw new Error("Création échouée");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erreur inconnue";
            setError(message);
            toast.error("Erreur", { description: message });
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateReservation = useCallback(async (id: string, data: UpdateReservation): Promise<Reservation | null> => {
        setLoading(true);
        setError(null);

        try {
            const result = await reservationsApi.updateReservation(id, data);
            if (result) {
                toast.success("Réservation mise à jour avec succès");
                setReservations((prev) => prev.map((r) => (r.id === id ? result : r)));
                return result;
            }
            throw new Error("Mise à jour échouée");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erreur inconnue";
            setError(message);
            toast.error("Erreur", { description: message });
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteReservation = useCallback(async (id: string): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const success = await reservationsApi.deleteReservation(id);
            if (success) {
                toast.success("Réservation supprimée");
                setReservations((prev) => prev.filter((r) => r.id !== id));
                return true;
            }
            throw new Error("Suppression échouée");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erreur inconnue";
            setError(message);
            toast.error("Erreur", { description: message });
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const getReservationById = useCallback(async (id: string): Promise<Reservation | null> => {
        setLoading(true);
        setError(null);

        try {
            return await reservationsApi.getReservationById(id);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erreur inconnue";
            setError(message);
            toast.error("Erreur", { description: message });
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateFilters = useCallback((newFilters: Partial<ReservationFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, []);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    return {
        reservations,
        filters,
        pagination,
        loading,
        error,

        fetchReservations,
        updateFilters,
        createReservation,
        updateReservation,
        deleteReservation,
        getReservationById,

        refresh: fetchReservations,
    };
}
