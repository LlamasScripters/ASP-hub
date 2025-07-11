// Export du contrôleur
export { default as categoriesRouter } from "./categories.controller.js";

// Export du service
export { CategoriesService } from "./categories.service.js";

// Export des types
export type {
	CreateCategoryData,
	UpdateCategoryData,
	CategoryFilters,
	CategoryWithRelations,
	CategoryResponse,
	CategoriesPaginatedResponse,
} from "./categories.types.js";

// Export des schemas
export {
	createCategorySchema,
	updateCategorySchema,
	getCategoriesSchema,
	categoryParamsSchema,
} from "./categories.schema.js";
