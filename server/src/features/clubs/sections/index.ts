// Export des services
export { sectionsService } from "./sections.service.js";

// Export des contrôleurs
export { default as sectionsRouter } from "./sections.controller.js";

// Export des types
export type {
	Section,
	CreateSectionData,
	UpdateSectionData,
	SectionResponse,
	SectionsPaginatedResponse,
	SectionFilters,
	SectionWithRelations,
} from "./sections.types.js";

// Export des schémas
export {
	createSectionSchema,
	updateSectionSchema,
	sectionQuerySchema,
	sectionParamsSchema,
} from "./sections.schema.js";

export type {
	CreateSectionData as CreateSectionSchemaData,
	UpdateSectionData as UpdateSectionSchemaData,
	SectionQueryData,
	SectionParamsData,
} from "./sections.schema.js";
