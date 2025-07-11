// Index unifié des types pour le module clubs
export * from "./clubs";
export * from "./sections";
export * from "./categories";
export * from "./sessions";
export * from "./responsibilities";

// Re-export sélectif des mutations pour éviter les conflits
export type {
	AssignCoachParams,
	RemoveCoachParams,
	AssignManagerParams,
	RemoveManagerParams,
	ClubManagementError,
} from "./mutations";
