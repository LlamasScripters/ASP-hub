// Index unifié des types pour le module clubs
export * from "./clubs.js";
export * from "./sections.js";
export * from "./categories.js";
export * from "./sessions.js";
export * from "./responsibilities.js";

// Re-export sélectif des mutations pour éviter les conflits
export type {
	AssignCoachParams,
	RemoveCoachParams,
	AssignManagerParams,
	RemoveManagerParams,
	ClubManagementError,
} from "./mutations.js";
