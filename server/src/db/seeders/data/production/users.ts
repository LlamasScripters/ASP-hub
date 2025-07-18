import type { db } from "@/db/index.js";
import { type User, users } from "@/db/schema.js";
import { auth } from "@/lib/auth.js";
import { eq } from "drizzle-orm";

export async function seedUsers(database: typeof db) {
	console.log("Creating test users...");

	if (
		!process.env.ADMIN_EMAIL ||
		!process.env.ADMIN_PASSWORD ||
		!process.env.ADMIN_PHONE ||
		!process.env.JURY_EMAIL ||
		!process.env.JURY_PASSWORD
	) {
		throw new Error(
			"Ensure that ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_PHONE, JURY_EMAIL and JURY_PASSWORD are set in environment variables",
		);
	}

	try {
		// Create admin user for E2E tests
		const adminData = {
			email: process.env.ADMIN_EMAIL,
			password: process.env.ADMIN_PASSWORD,
			name: "Admin ASPHub",
			firstName: "Admin",
			lastName: "ASPHub",
			acceptTerms: true,
			dateOfBirth: new Date("1990-01-01"),
			civility: "autre",
			phone: process.env.ADMIN_PHONE,
		};

		// Check if admin user already exists
		const existingAdmin = await database.query.users.findFirst({
			where: eq(users.email, adminData.email),
		});

		let adminUser: User;
		if (!existingAdmin) {
			// Create user through better-auth to handle password hashing
			const signUpResult = await auth.api.signUpEmail({
				body: adminData,
			});

			if (!signUpResult) {
				throw new Error("Failed to create admin user");
			}

			// Update user role to admin
			const [updatedAdmin] = await database
				.update(users)
				.set({
					role: "admin",
					emailVerified: true, // Skip email verification for test user
				})
				.where(eq(users.email, adminData.email))
				.returning();

			adminUser = updatedAdmin;
			console.log("✅ Created admin user:", adminData.email);
		} else {
			console.log("ℹ️  Admin user already exists:", adminData.email);
			adminUser = existingAdmin;
		}

		// Create regular user for testing
		const userData = {
			email: process.env.JURY_EMAIL,
			password: process.env.JURY_PASSWORD,
			name: "Jury ASPHub",
			firstName: "Jury",
			lastName: "ASPHub",
			acceptTerms: true,
			dateOfBirth: new Date("1995-05-15"),
			civility: "autre",
			phone: "+33987654321",
		};

		const existingUser = await database.query.users.findFirst({
			where: eq(users.email, userData.email),
		});

		let regularUser: User;
		if (!existingUser) {
			const signUpResult = await auth.api.signUpEmail({
				body: userData,
			});

			if (!signUpResult) {
				throw new Error("Failed to create regular user");
			}

			// Update user to skip email verification for test
			const [updatedUser] = await database
				.update(users)
				.set({ emailVerified: true })
				.where(eq(users.email, userData.email))
				.returning();

			regularUser = updatedUser;
			console.log("✅ Created regular user:", userData.email);
		} else {
			console.log("ℹ️  Regular user already exists:", userData.email);
			regularUser = existingUser;
		}

		return { adminUser, regularUser };
	} catch (error) {
		console.error("❌ Error creating test users:", error);
		throw error;
	}
}
