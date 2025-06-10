import { complexesApi } from "@room-booking/lib/api/complexes";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const complexSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().max(500).optional(),
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
    .max(255, "Le nom ne peut pas dépasser 255 caractères"),
  description: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .optional(),
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
    .max(20, "Le code postal ne peut pas dépasser 20 caractères"),
  numberOfElevators: z
    .number()
    .int("Le nombre d'ascenseurs doit être un nombre entier")
    .nonnegative("Le nombre d'ascenseurs doit être positif ou nul")
    .default(0),
  accessibleForReducedMobility: z.boolean().default(false),
  parkingCapacity: z
    .number()
    .int("La capacité de parking doit être un nombre entier")
    .nonnegative("La capacité de parking doit être positive ou nulle")
    .default(0),
});

export const updateComplexSchema = createComplexSchema.partial();

export const complexFiltersSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  city: z.string().optional(),
});

export const complexesPaginatedResponseSchema = z.object({
  data: z.array(complexSchema),
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

export type ComplexesPaginatedResponse = z.infer<
  typeof complexesPaginatedResponseSchema
>;

export const complexStatsSchema = z.object({
  totalComplexes: z.number().int().nonnegative(),
  activeComplexes: z.number().int().nonnegative(),
  inactiveComplexes: z.number().int().nonnegative(),
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

export const complexOpeningHoursSchema = z.object({
  complexId: z.string().uuid(),
  dayOfWeek: z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]),
  openAt: z.string().regex(/^\d{2}:\d{2}$/, "HH:mm"),
  closeAt: z.string().regex(/^\d{2}:\d{2}$/, "HH:mm"),
  isClosed: z.boolean().default(false),
});

export const createComplexOpeningHoursSchema = complexOpeningHoursSchema
  .omit({ complexId: true })
  .refine(
    (data) => data.openAt < data.closeAt,
    {
      message: "L'heure de fermeture doit être postérieure à l'heure d'ouverture",
    }
  );

export const updateComplexOpeningHoursSchema = complexOpeningHoursSchema
  .omit({ complexId: true })
  .partial()
  .refine(
    (data) => !data.openAt || !data.closeAt || data.openAt < data.closeAt,
    {
      message: "L'heure de fermeture doit être postérieure à l'heure d'ouverture",
    }
  );

export type Complex = z.infer<typeof complexSchema>;
export type CreateComplexData = z.infer<typeof createComplexSchema>;
export type UpdateComplexData = z.infer<typeof updateComplexSchema>;
export type ComplexFilters = z.infer<typeof complexFiltersSchema>;
export type ComplexStats = z.infer<typeof complexStatsSchema>;
export type PaginationInfo = z.infer<typeof paginationSchema>;

export type ComplexOpeningHours = z.infer<typeof complexOpeningHoursSchema>;
export type CreateComplexOpeningHoursData = z.infer<typeof createComplexOpeningHoursSchema>;
export type UpdateComplexOpeningHoursData = z.infer<typeof updateComplexOpeningHoursSchema>;

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

  // Valider et définir les filtres initiaux
  const [filters, setFilters] = useState<ComplexFilters>(() => {
    try {
      return complexFiltersSchema.parse({
        page: 1,
        limit: 20,
        ...initialFilters,
      });
    } catch (error) {
      console.warn("Invalid initial filters, using defaults:", error);
      return complexFiltersSchema.parse({ page: 1, limit: 20 });
    }
  });

  /**
   * Fetch complexes from the API based on current filters.
   */
  const fetchComplexes = useCallback(async () => {

    if (!filters.search && initialData.length > 0) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const validatedFilters = complexFiltersSchema.parse(filters);
      const response: ComplexesPaginatedResponse =
        await complexesApi.getComplexes(validatedFilters);

      setComplexes(response.data);

      // Calculer la pagination à partir de la réponse
      const calculatedPagination: PaginationInfo = {
        page: response.page,
        limit: response.limit,
        totalCount: response.total,
        totalPages: Math.ceil(response.total / response.limit),
        hasNext: response.page < Math.ceil(response.total / response.limit),
        hasPrev: response.page > 1,
      };
      setPagination(calculatedPagination);
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

  /**
   * Update filters and reset pagination to page 1.
   */
  const updateFilters = useCallback(
    (newFilters: Partial<ComplexFilters>) => {
      try {
        const updatedFilters = complexFiltersSchema.parse({
          ...filters,
          ...newFilters,
          // Reset to page 1 when filters change (except when changing page)
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
    [filters]
  );

  /**
   * Create a new complex.
   */
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
    []
  );

  /**
   * Update an existing complex.
   */
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
            prev.map((complex) => (complex.id === id ? result : complex))
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
    []
  );

  /**
   * Delete a complex by its ID.
   */
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

  /**
   * Fetch a complex by its ID.
   */
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
    []
  );

  useEffect(() => {
    if (filters.search) {
      fetchComplexes();
    }
  }, [fetchComplexes, filters.search]);

  /**
   * Navigate to a specific page in the pagination.
   */
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
    [updateFilters]
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

/**
 * Hook to fetch and manage complex statistics.
 */
export function useComplexStats() {
  const [stats, setStats] = useState<ComplexStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Mock stats for now - replace with real API call
      const mockStats: ComplexStats = {
        totalComplexes: 0,
        activeComplexes: 0,
        inactiveComplexes: 0,
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

/**
 * Hook to validate complex data for creation and updates.
 */
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
