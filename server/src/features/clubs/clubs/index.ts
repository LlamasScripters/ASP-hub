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
} from "./clubs.types.js";

// Export des schémas
export {
	createClubSchema,
	updateClubSchema,
	clubParamsSchema,
} from "./clubs.schema.js";

export type {
	CreateClubData as CreateClubSchemaData,
	UpdateClubData as UpdateClubSchemaData,
	ClubParamsData,
} from "./clubs.schema.js";
