import { z } from "zod";

export const applicationStatusEnum = z.enum([
	"pending",
	"approved",
	"rejected",
]);

export const applicationSchema = z
	.object({
		id: z.string().uuid(),
		motivation: z.string(),
		status: z.enum(["pending", "approved", "rejected"]).default("pending"),
		reviewComments: z.string().nullable().default(null),
		createdAt: z.string().datetime(),
		reviewedAt: z.string().datetime().nullable().default(null),
		sectionId: z.string().uuid().nullable().optional(),
		categoryId: z.string().uuid().nullable().optional(),
		emergencyContactName: z.string(),
		emergencyContactPhone: z.string(),
		medicalCertificateUrl: z.string().nullable().default(null),
		// Adaptation pour les données du serveur
		sectionName: z
			.string()
			.nullable()
			.default(null)
			.or(
				z
					.object({ id: z.string().uuid(), name: z.string() })
					.transform((s) => s.name),
			),
		categoryName: z
			.string()
			.nullable()
			.default(null)
			.or(
				z
					.object({ id: z.string().uuid(), name: z.string() })
					.transform((c) => c.name),
			),
		reviewerName: z.string().nullable().default(null),
		user: z.object({
			id: z.string().uuid(),
			firstName: z.string(),
			lastName: z.string(),
			email: z.string().email(),
			dateOfBirth: z.string().nullable(),
			phone: z.string().nullable(),
		}),
		// Accepter les champs section/category si ils viennent du serveur
		section: z
			.object({
				id: z.string().uuid(),
				name: z.string(),
			})
			.optional(),
		category: z
			.object({
				id: z.string().uuid(),
				name: z.string(),
			})
			.optional(),
	})
	.transform((data) => ({
		...data,
		// Normaliser les noms de section/category
		sectionName: data.sectionName || data.section?.name || null,
		categoryName: data.categoryName || data.category?.name || null,
		sectionId: data.sectionId || data.section?.id || null,
		categoryId: data.categoryId || data.category?.id || null,
		status: data.status || "pending",
		reviewComments: data.reviewComments || null,
		reviewedAt: data.reviewedAt || null,
		medicalCertificateUrl: data.medicalCertificateUrl || null,
		reviewerName: data.reviewerName || null,
	}));

export const applicationFiltersSchema = z.object({
	status: z.enum(["pending", "approved", "rejected", "all"]).optional(),
	sectionId: z.string().uuid().optional(),
	categoryId: z.string().uuid().optional(),
	search: z.string().optional(),
	dateRange: z
		.enum(["all", "today", "week", "month"])
		.default("all")
		.optional(),
	page: z.coerce.number().default(1),
	limit: z.coerce.number().default(20),
});

export const reviewApplicationSchema = z.object({
	decision: z.enum(["approved", "rejected"]),
	comments: z.string().optional(),
});

export const applicationsPaginatedResponseSchema = z.object({
	data: z.array(applicationSchema),
	total: z.coerce.number(),
	page: z.coerce.number(),
	limit: z.coerce.number(),
	totalPages: z.coerce.number(),
});

export type Application = z.infer<typeof applicationSchema>;
export type ApplicationFilters = z.infer<typeof applicationFiltersSchema>;
export type ReviewApplicationData = z.infer<typeof reviewApplicationSchema>;
export type ApplicationsPaginatedResponse = z.infer<
	typeof applicationsPaginatedResponseSchema
>;

export const applicationStatusTranslations = {
	pending: "En attente",
	approved: "Approuvée",
	rejected: "Refusée",
	all: "Toutes",
} as const;
