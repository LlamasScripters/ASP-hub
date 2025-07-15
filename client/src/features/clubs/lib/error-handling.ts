import { toast } from "sonner";
import type { ClubManagementError } from "../types/mutations";

/**
 * Utility functions for consistent error handling across club management features
 */

/**
 * Handles and displays appropriate error messages for club management operations
 */
export function handleClubError(error: unknown, operation?: string): void {
	console.error(`Erreur lors de ${operation || "l'opération"}:`, error);

	if (isClubManagementError(error)) {
		toast.error(error.message);
	} else if (error instanceof Error) {
		toast.error(
			`Erreur lors de ${operation || "l'opération"}: ${error.message}`,
		);
	} else {
		toast.error(`Erreur lors de ${operation || "l'opération"}`);
	}
}

/**
 * Simple error handler for mutations
 */
export function handleSimpleError(error: unknown): void {
	console.error("Erreur:", error);

	if (error instanceof Error) {
		toast.error(error.message);
	} else {
		toast.error("Une erreur est survenue");
	}
}

/**
 * Type guard to check if an error is a ClubManagementError
 */
function isClubManagementError(error: unknown): error is ClubManagementError {
	return (
		typeof error === "object" &&
		error !== null &&
		"message" in error &&
		typeof (error as ClubManagementError).message === "string"
	);
}

/**
 * Success message mappings for consistent user feedback
 */
export const successMessages = {
	coach: {
		assign: "Coach assigné avec succès",
		remove: "Coach supprimé avec succès",
	},
	manager: {
		assign: "Responsable assigné avec succès",
		remove: "Responsable supprimé avec succès",
	},
	club: {
		create: "Club créé avec succès",
		update: "Club mis à jour avec succès",
		delete: "Club supprimé avec succès",
	},
} as const;

/**
 * Displays success message with toast
 */
export function showSuccessMessage(
	category: keyof typeof successMessages,
	action: string,
): void {
	const message =
		successMessages[category]?.[
			action as keyof (typeof successMessages)[typeof category]
		];
	if (message) {
		toast.success(message);
	}
}

/**
 * Simplified success message for direct usage
 */
export function showSimpleSuccessMessage(message: string): void {
	toast.success(message);
}
