/**
 * Authentication configuration for Playwright tests
 * Provides paths to authentication state files for different user roles
 */

export const authFiles = {
	admin: "tests/.auth/admin.json",
	user: "tests/.auth/user.json",
	google: "tests/.auth/google.json",
} as const;

export type AuthFileType = keyof typeof authFiles;
