// Export des types depuis les modules spécialisés
export * from "./types/clubs";
export * from "./types/sections";
export * from "./types/categories";
export * from "./types/sessions";
export * from "./types/responsibilities";

// Export sélectif des mutations pour éviter les conflits
export type {
	AssignCoachParams,
	RemoveCoachParams,
	AssignManagerParams,
	RemoveManagerParams,
	ClubManagementError,
} from "./types/mutations";
