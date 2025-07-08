import { complexesApi } from "@room-booking/lib/api/complexes";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";
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

export const defaultOpenHours = {
	monday: { open: "08:00", close: "20:00", closed: false },
	tuesday: { open: "08:00", close: "20:00", closed: false },
	wednesday: { open: "08:00", close: "20:00", closed: false },
	thursday: { open: "08:00", close: "20:00", closed: false },
	friday: { open: "08:00", close: "18:00", closed: false },
	saturday: { open: "10:00", close: "16:00", closed: false },
	sunday: { open: null, close: null, closed: true },
};

export const frenchDays: Record<keyof OpeningHours, string> = {
	monday: "Lundi",
	tuesday: "Mardi",
	wednesday: "Mercredi",
	thursday: "Jeudi",
	friday: "Vendredi",
	saturday: "Samedi",
	sunday: "Dimanche",
};

export const complexSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, "Le nom est requis"),
	description: z
		.string()
		.max(500, "La description ne peut pas dépasser 500 caractères"),
	street: z.string().min(1, "La rue est requise"),
	city: z.string().min(1, "La ville est requise"),
	postalCode: z
		.string()
		.min(5, "Le code postal doit contenir au moins 5 caractères"),
	openingHours: openingHoursSchema,
	numberOfElevators: z.number().int().nonnegative(),
	accessibleForReducedMobility: z.boolean(),
	parkingCapacity: z.number().int().nonnegative(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
});

export const createComplexSchema = z.object({
	name: z
		.string()
		.min(1, "Le nom est requis")
		.max(255, "Le nom ne peut pas dépasser 255 caractères"),
	description: z
		.string()
		.max(500, "La description ne peut pas dépasser 500 caractères"),
	street: z
		.string()
		.min(1, "La rue est requise")
		.max(255, "La rue ne peut pas dépasser 255 caractères"),
	city: z
		.string()
		.min(1, "La ville est requise")
		.max(100, "La ville ne peut pas dépasser 100 caractères"),
	postalCode: z
		.string()
		.min(5, "Le code postal doit contenir au moins 5 caractères")
		.max(10, "Le code postal ne peut pas dépasser 10 caractères"),
	openingHours: openingHoursSchema,
	numberOfElevators: z.number().int().nonnegative(),
	accessibleForReducedMobility: z.boolean().default(true),
	parkingCapacity: z.number().int().nonnegative(),
});

export const updateComplexSchema = createComplexSchema.partial();

export const complexFiltersSchema = z.object({
	search: z.string().optional(),
	accessibleForReducedMobility: z.boolean().optional(),
	page: z.coerce.number().default(1),
	limit: z.coerce.number().default(20),
});

export const complexesPaginatedResponseSchema = z.object({
	data: z.array(complexSchema),
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
export type Complex = z.infer<typeof complexSchema>;
export type CreateComplexData = z.infer<typeof createComplexSchema>;
export type UpdateComplexData = z.infer<typeof updateComplexSchema>;
export type ComplexFilters = z.infer<typeof complexFiltersSchema>;
export type ComplexesPaginatedResponse = z.infer<
	typeof complexesPaginatedResponseSchema
>;

// TanStack Query options
export const filteredComplexesQueryOptions = ({
	filters = {},
	page = 1,
	limit = 20,
}) => ({
	queryKey: ["complexes", filters, page, limit],
	queryFn: () => complexesApi.getComplexes(filters),
});

interface UseComplexesOptions {
	initialData?: Complex[];
}

export function useComplexes({ initialData = [] }: UseComplexesOptions = {}) {
	const queryClient = useQueryClient();

	// Query for fetching complexes
	const { data: fetchedData, refetch } = useSuspenseQuery({
		queryKey: ["complexes"],
		queryFn: () => complexesApi.getComplexes(),
		initialData: {
			data: initialData,
			total: initialData.length,
			page: 1,
			limit: 20,
		},
	});

	// Create mutation
	const createMutation = useMutation({
		mutationFn: (data: CreateComplexData) => complexesApi.createComplex(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["complexes"] });
			toast.success("Complexe créé avec succès");
		},
		onError: (error: Error) => {
			console.error("Error creating complex:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la création du complexe",
			);
		},
	});

	// Update mutation
	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateComplexData }) =>
			complexesApi.updateComplex(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["complexes"] });
			toast.success("Complexe modifié avec succès");
		},
		onError: (error: Error) => {
			console.error("Error updating complex:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la modification du complexe",
			);
		},
	});

	// Delete mutation
	const deleteMutation = useMutation({
		mutationFn: (id: string) => complexesApi.deleteComplex(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["complexes"] });
			toast.success("Complexe supprimé avec succès");
		},
		onError: (error: Error) => {
			console.error("Error deleting complex:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Erreur lors de la suppression du complexe",
			);
		},
	});

	const createComplex = useCallback(
		async (data: CreateComplexData): Promise<Complex | null> => {
			try {
				const result = await createMutation.mutateAsync(data);
				return result;
			} catch (error) {
				console.error("Error in createComplex:", error);
				return null;
			}
		},
		[createMutation],
	);

	const updateComplex = useCallback(
		async (id: string, data: UpdateComplexData): Promise<Complex | null> => {
			try {
				const result = await updateMutation.mutateAsync({ id, data });
				return result;
			} catch (error) {
				console.error("Error in updateComplex:", error);
				return null;
			}
		},
		[updateMutation],
	);

	const deleteComplex = useCallback(
		async (id: string): Promise<boolean> => {
			try {
				await deleteMutation.mutateAsync(id);
				return true;
			} catch (error) {
				console.error("Error in deleteComplex:", error);
				return false;
			}
		},
		[deleteMutation],
	);

	const refresh = useCallback(async () => {
		await refetch();
	}, [refetch]);

	return {
		complexes: fetchedData.data,
		totalCount: fetchedData.total,
		page: fetchedData.page,
		limit: fetchedData.limit,
		createComplex,
		updateComplex,
		deleteComplex,
		refresh,
		refetch,
	};
}

// Hook pour les statistiques des complexes
export function useComplexStats() {
	const { data: stats, refetch } = useSuspenseQuery({
		queryKey: ["complex-stats"],
		queryFn: async () => {
			// Remplacer par un vrai appel API plus tard
			return {
				totalComplexes: 0,
				totalRooms: 0,
				totalReservations: 0,
				occupancyRate: 0,
			};
		},
		initialData: {
			totalComplexes: 0,
			totalRooms: 0,
			totalReservations: 0,
			occupancyRate: 0,
		},
	});

	const refresh = useCallback(async () => {
		await refetch();
	}, [refetch]);

	return {
		stats,
		loading: false,
		refresh,
	};
}
