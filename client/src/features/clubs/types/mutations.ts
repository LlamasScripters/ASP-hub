/**
 * Types for club management mutations
 * Centralizes all mutation parameters and return types for better type safety
 */

// Coach management types
export interface AssignCoachParams {
	clubId: string;
	sectionId: string;
	categoryId: string;
	userId: string;
}

export interface RemoveCoachParams {
	clubId: string;
	sectionId: string;
	categoryId: string;
}

// Section manager management types
export interface AssignManagerParams {
	clubId: string;
	sectionId: string;
	userId: string;
}

export interface RemoveManagerParams {
	clubId: string;
	sectionId: string;
}

// API response types
export interface ResponsibilityAssignmentResponse {
	id: string;
	userId: string;
	sectionId?: string;
	categoryId?: string;
	role: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

// Error types for better error handling
export interface ClubManagementError {
	message: string;
	code?: string;
	details?: Record<string, unknown>;
}
