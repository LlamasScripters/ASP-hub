// Export des services
export { clubsService } from "./clubs.service.js";

// Export des contrôleurs
export { default as clubsRouter } from "./clubs.controller.js";

// Export des types
export type {
	Club,
	CreateClubData,
	UpdateClubData,
	ClubResponse,
	ClubsPaginatedResponse,
	ClubFilters,
} from "./clubs.types.js";

// Export des schémas
export {
	createClubSchema,
	updateClubSchema,
	clubQuerySchema,
	clubParamsSchema,
} from "./clubs.schema.js";

export type {
	CreateClubData as CreateClubSchemaData,
	UpdateClubData as UpdateClubSchemaData,
	ClubQueryData,
	ClubParamsData,
} from "./clubs.schema.js";
