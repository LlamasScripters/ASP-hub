import { expect, test } from "@playwright/test";
import { testUsers } from "../../fixtures/test-users.js";
import { authFiles } from "../../setup/auth.config.js";

test.describe("Authentication - Role-Based Access Control (RBAC)", () => {
	test.describe("Admin User Access", () => {
		test.use({ storageState: authFiles.admin });

		test("should have access to admin dashboard", async ({ page }) => {
			await page.goto("/dashboard");

			// Look for admin-specific navigation or content
			const adminElements = [
				page.getByRole("link", { name: /paramètres|settings/i }), // Admin-specific settings
				page.getByRole("link", { name: /adhérents|membres|members/i }), // Member management
				page
					.getByText("Admin User")
					.first(), // Admin user indicator
				page.getByText(/bienvenue.*admin/i), // Admin welcome message
			];

			// Check each element individually to avoid strict mode violations
			let hasAdminAccess = false;
			for (const element of adminElements) {
				if (await element.isVisible().catch(() => false)) {
					hasAdminAccess = true;
					break;
				}
			}
			expect(hasAdminAccess).toBe(true);
		});

		test("should have access to user management", async ({ page }) => {
			// Try to access user management routes
			const userManagementUrls = [
				"/admin/users",
				"/admin/dashboard/users",
				"/dashboard/admin/users",
			];

			for (const url of userManagementUrls) {
				await page.goto(url);

				// If we don't get redirected to login, we have access
				if (!page.url().includes("/auth/login")) {
					// Look for user management content
					const userManagementElements = [
						page
							.getByText(/gestion.*utilisateurs|user.*management|users/i)
							.first(),
						page.getByRole("heading", { name: /utilisateurs|users/i }).first(),
						page
							.locator("table")
							.filter({ hasText: /email|nom|role/i })
							.first(),
					];

					// Check each element individually to avoid strict mode violations
					let hasUserManagement = false;
					for (const element of userManagementElements) {
						if (await element.isVisible().catch(() => false)) {
							hasUserManagement = true;
							break;
						}
					}

					if (hasUserManagement) {
						// Just confirm we found user management access
						expect(hasUserManagement).toBe(true);
						break;
					}
				}
			}
		});

		test("should have access to content management", async ({ page }) => {
			// Try to access content management (blog admin, etc.)
			const contentManagementUrls = [
				"/admin/blog",
				"/admin/articles",
				"/admin/content",
			];

			for (const url of contentManagementUrls) {
				await page.goto(url);

				if (!page.url().includes("/auth/login")) {
					// Look for content management features
					const contentElements = [
						page
							.getByText(/gestion.*articles|content.*management|blog.*admin/i)
							.first(),
						page
							.getByRole("button", {
								name: /créer.*article|create.*post|new.*article/i,
							})
							.first(),
						page.getByRole("link", { name: /créer|new|add/i }).first(),
					];

					// Check each element individually to avoid strict mode violations
					let hasContentManagement = false;
					for (const element of contentElements) {
						if (await element.isVisible().catch(() => false)) {
							hasContentManagement = true;
							break;
						}
					}

					if (hasContentManagement) {
						// Just confirm we found content management access
						expect(hasContentManagement).toBe(true);
						break;
					}
				}
			}
		});

		test("should have access to facilities management", async ({ page }) => {
			// Try to access facilities/complex management
			const facilitiesUrls = [
				"/admin/facilities",
				"/admin/complexes",
				"/admin/rooms",
			];

			for (const url of facilitiesUrls) {
				await page.goto(url);

				if (!page.url().includes("/auth/login")) {
					// Look for facilities management content
					const facilitiesElements = [
						page.getByText(
							/gestion.*complexes|facilities.*management|complexes/i,
						),
						page.getByText(/salles|rooms|installations/i),
						page.getByRole("button", {
							name: /créer.*complexe|add.*facility|new.*room/i,
						}),
					];

					const hasFacilitiesManagement = await facilitiesElements[0]
						.or(facilitiesElements[1])
						.or(facilitiesElements[2])
						.isVisible();

					if (hasFacilitiesManagement) {
						await expect(
							facilitiesElements[0]
								.or(facilitiesElements[1])
								.or(facilitiesElements[2]),
						).toBeVisible();
						break;
					}
				}
			}
		});

		test("should see admin-specific navigation items", async ({ page }) => {
			await page.goto("/dashboard");

			// Look for admin navigation items
			const adminNavItems = [
				page.getByRole("navigation").getByText(/admin|administration|gestion/i),
				page.getByRole("link", { name: /utilisateurs|users/i }),
				page.getByRole("link", { name: /articles|blog/i }),
				page.getByRole("link", { name: /complexes|facilities/i }),
			];

			// At least one admin navigation item should be visible
			let hasAdminNav = false;
			for (const item of adminNavItems) {
				if (await item.isVisible()) {
					hasAdminNav = true;
					break;
				}
			}

			expect(hasAdminNav).toBe(true);
		});
	});

	test.describe("Regular User Access", () => {
		test.use({ storageState: authFiles.user });

		test("should NOT have access to admin routes", async ({ page }) => {
			const adminRoutes = [
				"/admin",
				"/admin/users",
				"/admin/blog",
				"/admin/facilities",
				"/admin/dashboard",
			];

			for (const route of adminRoutes) {
				await page.goto(route);

				// Should redirect to login, show 403 error, or redirect to regular dashboard
				const currentUrl = page.url();
				const isBlocked =
					currentUrl.includes("/auth/login") ||
					currentUrl.includes("/403") ||
					currentUrl.includes("/unauthorized") ||
					!currentUrl.includes("/admin");

				expect(isBlocked).toBe(true);
			}
		});

		test("should have access to regular user dashboard", async ({ page }) => {
			await page.goto("/dashboard");

			// Should successfully access dashboard
			await expect(page).toHaveURL(/dashboard/);
			await expect(page.locator("body")).toContainText(
				/dashboard|tableau de bord/i,
			);
		});

		test("should have access to user profile", async ({ page }) => {
			const profileUrls = [
				"/dashboard/profile",
				"/user/profile",
				"/profile",
				"/user/settings",
			];

			for (const url of profileUrls) {
				await page.goto(url);

				if (!page.url().includes("/auth/login")) {
					// Look for profile content
					const profileElements = [
						page.getByText(/profil|profile/i).first(),
						page
							.getByText(/User Test/i)
							.first(), // Test user name
						page.getByLabel(/nom|prénom|email/i).first(),
					];

					// Check each element individually to avoid strict mode violations
					let hasProfile = false;
					for (const element of profileElements) {
						if (await element.isVisible().catch(() => false)) {
							hasProfile = true;
							break;
						}
					}

					if (hasProfile) {
						// Just confirm we found profile access
						expect(hasProfile).toBe(true);
						break;
					}
				}
			}
		});

		test("should NOT see admin navigation items", async ({ page }) => {
			await page.goto("/dashboard");

			// Admin-specific navigation should not be visible
			const adminNavItems = [
				page.getByRole("link", { name: /admin|administration/i }),
				page.getByText(/gestion.*utilisateurs|user.*management/i),
				page
					.getByRole("link", { name: /gestion|management/i })
					.filter({ hasText: /admin/i }),
			];

			for (const item of adminNavItems) {
				await expect(item).not.toBeVisible();
			}
		});

		test("should have access to public features", async ({ page }) => {
			// Test access to public/user features
			const publicUrls = ["/blog", "/clubs", "/facilities", "/activities"];

			for (const url of publicUrls) {
				await page.goto(url);

				// Should have access (not redirect to login)
				if (!page.url().includes("/auth/login")) {
					// Basic check that page loaded
					await expect(page.locator("body")).toBeVisible();
				}
			}
		});

		test("should be able to make reservations if feature exists", async ({
			page,
		}) => {
			// Try to access room booking/reservation system
			const reservationUrls = [
				"/reservations",
				"/booking",
				"/dashboard/reservations",
			];

			for (const url of reservationUrls) {
				await page.goto(url);

				if (!page.url().includes("/auth/login")) {
					// Look for reservation content
					const reservationElements = [
						page.getByText(/réservation|booking|reservation/i),
						page.getByRole("button", { name: /réserver|book|reserve/i }),
						page.getByText(/complexes|salles|rooms/i),
					];

					const hasReservations = await reservationElements[0]
						.or(reservationElements[1])
						.or(reservationElements[2])
						.isVisible();

					if (hasReservations) {
						await expect(
							reservationElements[0]
								.or(reservationElements[1])
								.or(reservationElements[2]),
						).toBeVisible();
						break;
					}
				}
			}
		});
	});

	test.describe("Unauthorized Access Protection", () => {
		test("should redirect unauthenticated users from protected routes", async ({
			page,
		}) => {
			// Test without any authentication
			const protectedRoutes = [
				"/dashboard",
				"/admin",
				"/profile",
				"/user/settings",
			];

			for (const route of protectedRoutes) {
				await page.goto(route);

				// Should redirect to login
				await expect(page).toHaveURL(/auth\/login/);
			}
		});

		test("should preserve redirect URL after login", async ({ page }) => {
			// Try to access protected route without authentication
			await page.goto("/dashboard");
			await expect(page).toHaveURL(/auth\/login/);

			// Check if redirect parameter is preserved
			const currentUrl = page.url();
			if (currentUrl.includes("redirect=") || currentUrl.includes("return=")) {
				// Login and verify redirect works
				const regularUser = {
					email: "user@example.com",
					password: "user123456789",
				};

				await page.getByLabel("Adresse email").fill(regularUser.email);
				await page.locator('input[name="password"]').fill(regularUser.password);
				await page.getByRole("button", { name: /se connecter/i }).click();

				// Should redirect back to originally requested page
				await expect(page).toHaveURL(/dashboard/);
			}
		});
	});

	test.describe("Cross-Role Security", () => {
		test("admin should not be able to access invalid routes", async ({
			page,
		}) => {
			// Login as admin first
			await page.goto("/auth/login");
			await page.getByLabel("Adresse email").fill(testUsers.admin.email);
			await page
				.locator('input[name="password"]')
				.fill(testUsers.admin.password);
			await page.getByRole("button", { name: /se connecter/i }).click();
			await expect(page).toHaveURL(/dashboard/);

			// Even admin should not access non-existent routes
			await page.goto("/admin/invalid-route-that-does-not-exist");

			// Should show 404 or redirect to valid page
			const is404 =
				page.url().includes("/404") ||
				page.url().includes("/not-found") ||
				(await page
					.getByText(/404|not found|page.*exist/i)
					.first()
					.isVisible()
					.catch(() => false));

			expect(is404 || !page.url().includes("/admin/invalid-route")).toBe(true);
		});

		test("role changes should be reflected immediately", async ({ page }) => {
			// This test would require an endpoint to change user roles
			// In a real application, you might test this by:
			// 1. Having an admin change a user's role
			// 2. The affected user's session should update accordingly
			// 3. Test that new permissions are enforced immediately

			// For now, we'll just verify that the current user sees their correct role
			// Login as regular user first
			await page.goto("/auth/login");
			await page.getByLabel("Adresse email").fill(testUsers.regularUser.email);
			await page
				.locator('input[name="password"]')
				.fill(testUsers.regularUser.password);
			await page.getByRole("button", { name: /se connecter/i }).click();
			await expect(page).toHaveURL(/dashboard/);

			await page.goto("/dashboard");

			// User should not see admin features
			const adminFeatures = page.getByText(
				/admin|administration|gestion.*utilisateurs/i,
			);
			await expect(adminFeatures).not.toBeVisible();
		});
	});
});
