import { complexesApi } from "@room-booking/lib/api/complexes";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const complexSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, "Le nom est requis"),
	street: z.string().min(1, "La rue est requise"),
	city: z.string().min(1, "La ville est requise"),
	postalCode: z
		.string()
		.min(5, "Le code postal doit contenir au moins 5 caractères"),
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
		.max(100, "Le nom ne peut pas dépasser 100 caractères"),
	street: z
		.string()
		.min(1, "La rue est requise")
		.max(200, "La rue ne peut pas dépasser 200 caractères"),
	city: z
		.string()
		.min(1, "La ville est requise")
		.max(50, "La ville ne peut pas dépasser 50 caractères"),
	postalCode: z
		.string()
		.min(5, "Le code postal doit contenir au moins 5 caractères")
		.max(10, "Le code postal ne peut pas dépasser 10 caractères")
		.regex(/^\d{5}$/, "Le code postal doit contenir exactement 5 chiffres"),
	numberOfElevators: z
		.number()
		.int("Le nombre d'ascenseurs doit être un nombre entier")
		.nonnegative("Le nombre d'ascenseurs doit être positif ou nul")
		.max(20, "Le nombre d'ascenseurs ne peut pas dépasser 20")
		.default(0),
	accessibleForReducedMobility: z.boolean().default(false),
	parkingCapacity: z
		.number()
		.int("La capacité de parking doit être un nombre entier")
		.nonnegative("La capacité de parking doit être positive ou nulle")
		.max(1000, "La capacité de parking ne peut pas dépasser 1000")
		.default(0),
});

export const updateComplexSchema = createComplexSchema.partial();

export const complexFiltersSchema = z.object({
	page: z.number().int().positive().default(1),
	limit: z.number().int().positive().max(100).default(10),
	search: z.string().optional(),
	type: z.string().optional(),
	city: z.string().optional(),
	isActive: z.boolean().optional(),
});

export const complexStatsSchema = z.object({
	totalComplexes: z.number().int().nonnegative(),
	activeComplexes: z.number().int().nonnegative(),
	inactiveComplexes: z.number().int().nonnegative(),
	typeStats: z.record(z.string(), z.number().int().nonnegative()),
	cityStats: z.record(z.string(), z.number().int().nonnegative()),
});

export const paginationSchema = z.object({
	page: z.number().int().positive(),
	limit: z.number().int().positive(),
	totalCount: z.number().int().nonnegative(),
	totalPages: z.number().int().nonnegative(),
	hasNext: z.boolean(),
	hasPrev: z.boolean(),
});

export type Complex = z.infer<typeof complexSchema>;
export type CreateComplexData = z.infer<typeof createComplexSchema>;
export type UpdateComplexData = z.infer<typeof updateComplexSchema>;
export type ComplexFilters = z.infer<typeof complexFiltersSchema>;
export type ComplexStats = z.infer<typeof complexStatsSchema>;
export type PaginationInfo = z.infer<typeof paginationSchema>;

function formatZodErrors(errors: z.ZodError): string {
	return errors.errors
		.map((error) => {
			const path = error.path.length > 0 ? `${error.path.join(".")} : ` : "";
			return `${path}${error.message}`;
		})
		.join(", ");
}

interface UseComplexesOptions extends Partial<ComplexFilters> {
	initialData?: Complex[];
}

export function useComplexes(options: UseComplexesOptions = {}) {
	const { initialData = [], ...initialFilters } = options;

	const [complexes, setComplexes] = useState<Complex[]>(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [pagination, setPagination] = useState<PaginationInfo | null>(null);

	const [filters, setFilters] = useState<ComplexFilters>(() => {
		try {
			return complexFiltersSchema.parse({
				page: 1,
				limit: 10,
				...initialFilters,
			});
		} catch (error) {
			console.warn("Invalid initial filters, using defaults:", error);
			return complexFiltersSchema.parse({ page: 1, limit: 10 });
		}
	});

	const fetchComplexes = useCallback(async () => {
		if (!filters.search && initialData.length > 0) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const validatedFilters = complexFiltersSchema.parse(filters);
			const fetchedComplexes =
				await complexesApi.getComplexes(validatedFilters);

			setComplexes(fetchedComplexes);

			const mockPagination = {
				page: filters.page,
				limit: filters.limit,
				totalCount: fetchedComplexes.length,
				totalPages: Math.ceil(fetchedComplexes.length / filters.limit),
				hasNext: false,
				hasPrev: false,
			};
			setPagination(mockPagination);
		} catch (err) {
			let errorMessage = "Une erreur inattendue s'est produite";

			if (err instanceof z.ZodError) {
				errorMessage = `Erreur de validation : ${formatZodErrors(err)}`;
			} else if (err instanceof Error) {
				errorMessage = err.message;
			}

			setError(errorMessage);
			toast.error("Erreur", {
				description: errorMessage,
			});
		} finally {
			setLoading(false);
		}
	}, [filters, initialData]);

	const updateFilters = useCallback(
		(newFilters: Partial<ComplexFilters>) => {
			try {
				const updatedFilters = complexFiltersSchema.parse({
					...filters,
					...newFilters,

					page: newFilters.page !== undefined ? newFilters.page : 1,
				});
				setFilters(updatedFilters);
			} catch (error) {
				if (error instanceof z.ZodError) {
					toast.error("Erreur de validation", {
						description: formatZodErrors(error),
					});
				}
			}
		},
		[filters],
	);

	const createComplex = useCallback(
		async (data: CreateComplexData): Promise<Complex | null> => {
			setLoading(true);
			setError(null);

			try {
				const validatedData = createComplexSchema.parse(data);
				const result = await complexesApi.createComplex(validatedData);

				if (result) {
					toast.success("Succès", {
						description: "Complexe créé avec succès",
					});

					setComplexes((prev) => [result, ...prev]);
					return result;
				}
				throw new Error("Erreur lors de la création du complexe");
			} catch (err) {
				let errorMessage = "Une erreur inattendue s'est produite";

				if (err instanceof z.ZodError) {
					errorMessage = `Erreur de validation : ${formatZodErrors(err)}`;
				} else if (err instanceof Error) {
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

	const updateComplex = useCallback(
		async (id: string, data: UpdateComplexData): Promise<Complex | null> => {
			setLoading(true);
			setError(null);

			try {
				z.string().uuid("ID invalide").parse(id);
				const validatedData = updateComplexSchema.parse(data);
				const result = await complexesApi.updateComplex(id, validatedData);

				if (result) {
					toast.success("Succès", {
						description: "Complexe mis à jour avec succès",
					});

					setComplexes((prev) =>
						prev.map((complex) => (complex.id === id ? result : complex)),
					);
					return result;
				}
				throw new Error("Erreur lors de la mise à jour du complexe");
			} catch (err) {
				let errorMessage = "Une erreur inattendue s'est produite";

				if (err instanceof z.ZodError) {
					errorMessage = `Erreur de validation : ${formatZodErrors(err)}`;
				} else if (err instanceof Error) {
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

	const deleteComplex = useCallback(async (id: string): Promise<boolean> => {
		setLoading(true);
		setError(null);

		try {
			z.string().uuid("ID invalide").parse(id);
			const success = await complexesApi.deleteComplex(id);

			if (success) {
				toast.success("Succès", {
					description: "Complexe supprimé avec succès",
				});

				setComplexes((prev) => prev.filter((complex) => complex.id !== id));
				return true;
			}
			throw new Error("Erreur lors de la suppression du complexe");
		} catch (err) {
			let errorMessage = "Une erreur inattendue s'est produite";

			if (err instanceof z.ZodError) {
				errorMessage = `Erreur de validation : ${formatZodErrors(err)}`;
			} else if (err instanceof Error) {
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

	const getComplexById = useCallback(
		async (id: string): Promise<Complex | null> => {
			setLoading(true);
			setError(null);

			try {
				z.string().uuid("ID invalide").parse(id);
				const result = await complexesApi.getComplexById(id);

				if (result) {
					return result;
				}
				throw new Error("Complexe non trouvé");
			} catch (err) {
				let errorMessage = "Une erreur inattendue s'est produite";

				if (err instanceof z.ZodError) {
					errorMessage = `Erreur de validation : ${formatZodErrors(err)}`;
				} else if (err instanceof Error) {
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
		if (filters.search) {
			fetchComplexes();
		}
	}, [fetchComplexes, filters.search]);

	const goToPage = useCallback(
		(page: number) => {
			try {
				const validatedPage = z.number().int().positive().parse(page);
				updateFilters({ page: validatedPage });
			} catch (error) {
				toast.error("Erreur", {
					description: "Numéro de page invalide",
				});
			}
		},
		[updateFilters],
	);

	const nextPage = useCallback(() => {
		if (pagination?.hasNext) {
			goToPage(pagination.page + 1);
		}
	}, [pagination, goToPage]);

	const prevPage = useCallback(() => {
		if (pagination?.hasPrev) {
			goToPage(pagination.page - 1);
		}
	}, [pagination, goToPage]);

	return {
		// Data
		complexes,
		pagination,
		filters,

		// State
		loading,
		error,

		// Actions
		fetchComplexes,
		updateFilters,
		createComplex,
		updateComplex,
		deleteComplex,
		getComplexById,

		// Pagination
		goToPage,
		nextPage,
		prevPage,

		// Helpers
		refresh: fetchComplexes,
	};
}

export function useComplexStats() {
	const [stats, setStats] = useState<ComplexStats | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchStats = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const mockStats: ComplexStats = {
				totalComplexes: 0,
				activeComplexes: 0,
				inactiveComplexes: 0,
				typeStats: {},
				cityStats: {},
			};
			setStats(mockStats);
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
	}, []);

	useEffect(() => {
		fetchStats();
	}, [fetchStats]);

	return {
		stats,
		loading,
		error,
		refresh: fetchStats,
	};
}

export function useComplexValidation() {
	const validateCreateData = useCallback((data: unknown) => {
		try {
			return {
				success: true,
				data: createComplexSchema.parse(data),
				errors: null,
			};
		} catch (error) {
			if (error instanceof z.ZodError) {
				return {
					success: false,
					data: null,
					errors: error.errors,
				};
			}
			return {
				success: false,
				data: null,
				errors: [{ message: "Erreur de validation inconnue", path: [] }],
			};
		}
	}, []);

	const validateUpdateData = useCallback((data: unknown) => {
		try {
			return {
				success: true,
				data: updateComplexSchema.parse(data),
				errors: null,
			};
		} catch (error) {
			if (error instanceof z.ZodError) {
				return {
					success: false,
					data: null,
					errors: error.errors,
				};
			}
			return {
				success: false,
				data: null,
				errors: [{ message: "Erreur de validation inconnue", path: [] }],
			};
		}
	}, []);

	return {
		validateCreateData,
		validateUpdateData,
		createComplexSchema,
		updateComplexSchema,
	};
}
