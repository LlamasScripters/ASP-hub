/**
 * Test user data - matches seeded users from server/src/db/seeders/data/users.ts
 * These users are automatically seeded during test setup
 */
export const testUsers = {
	admin: {
		email: "admin@admin.com",
		password: "admin123456789",
		name: "Admin Test",
		firstName: "Admin",
		lastName: "Test",
		role: "admin" as const,
	},
	regularUser: {
		email: "user@example.com",
		password: "user123456789",
		name: "User Test",
		firstName: "User",
		lastName: "Test",
		role: "user" as const,
	},
	// Invalid test data for negative testing
	invalid: {
		email: "nonexistent@example.com",
		password: "wrongpassword123",
		weakPassword: "123",
		invalidEmail: "invalid-email",
	},
	google: {
		email: process.env.GOOGLE_EMAIL as string,
		password: process.env.GOOGLE_PASSWORD as string,
		secret: process.env.GOOGLE_OTP_SECRET as string,
	},
} as const;

export type TestUserType = keyof typeof testUsers;
export type TestUser = typeof testUsers.admin | typeof testUsers.regularUser;

/**
 * Get user for specific worker to enable parallel testing
 * Each worker gets a dedicated user account
 */
export function getUserForWorker(workerIndex: number): TestUser {
	const users = [testUsers.admin, testUsers.regularUser];
	return users[workerIndex % users.length];
}
