import { expect, test } from "@playwright/test";
import { authFiles } from "../../setup/auth.config";

test.describe("Authentication - Logout Flow", () => {
	test.describe("Admin User Logout", () => {
		test.use({ storageState: authFiles.admin });

		test("should successfully logout from dashboard", async ({ page }) => {
			// Navigate to dashboard (should be already logged in)
			await page.goto("/dashboard");
			await expect(page).toHaveURL(/dashboard/);

			// Find and click user menu/profile dropdown
			const userMenuTrigger = page
				.locator('[data-testid="user-menu-trigger"]')
				.or(page.getByRole("button", { name: /profil|compte|admin test/i }))
				.or(page.locator(".nav-user button"))
				.or(page.locator('[aria-haspopup="menu"]'));

			await userMenuTrigger.first().click();

			// Find and click logout button
			const logoutButton = page
				.getByRole("menuitem", { name: "déconnecter" })
				.or(
					page.getByRole("button", {
						name: "déconnecter",
					}),
				)
				.or(page.getByText("déconnecter"));

			await Promise.all([logoutButton.click(), page.waitForURL(/auth\/login/)]);

			// Verify user is actually logged out by trying to access protected route
			await Promise.all([
				page.goto("/dashboard"),
				page.waitForURL(/auth\/login/),
			]);
		});

		test("should logout from any protected page", async ({ page }) => {
			// Navigate to a different protected page
			await page.goto("/dashboard");

			// Navigate to admin area if accessible
			const adminLink = page.getByRole("link", {
				name: /admin|administration/i,
			});
			if (await adminLink.isVisible()) {
				await adminLink.click();
			}

			// Perform logout from this page
			const userMenuTrigger = page
				.locator('[data-testid="user-menu-trigger"]')
				.or(page.getByRole("button", { name: /profil|compte|admin test/i }))
				.or(page.locator(".nav-user button"));

			await userMenuTrigger.first().click();

			const logoutButton = page
				.getByRole("menuitem", { name: "déconnecter" })
				.or(
					page.getByRole("button", {
						name: "déconnecter",
					}),
				);

			await logoutButton.click();

			// Verify logout successful
			await expect(page).toHaveURL(/auth\/login|\/$/);
		});
	});

	test.describe("Regular User Logout", () => {
		test.use({ storageState: authFiles.user });

		test("should successfully logout from dashboard", async ({ page }) => {
			// Navigate to dashboard (should be already logged in)
			await page.goto("/dashboard");
			await expect(page).toHaveURL(/dashboard/);

			// Find and click user menu/profile dropdown
			const userMenuTrigger = page
				.locator('[data-testid="user-menu-trigger"]')
				.or(page.getByRole("button", { name: /profil|compte|user test/i }))
				.or(page.locator(".nav-user button"));

			await userMenuTrigger.first().click();

			// Find and click logout button
			const logoutButton = page
				.getByRole("menuitem", { name: "déconnecter" })
				.or(
					page.getByRole("button", {
						name: "déconnecter",
					}),
				);

			await logoutButton.click();

			// Verify redirect to login or home page
			await expect(page).toHaveURL(/auth\/login|\/$/);

			// Verify user is actually logged out
			await page.goto("/dashboard");
			await expect(page).toHaveURL(/auth\/login/);
		});

		test("should not have access to admin areas after logout", async ({
			page,
		}) => {
			// Logout first
			await page.goto("/dashboard");

			const userMenuTrigger = page
				.locator('[data-testid="user-menu-trigger"]')
				.or(page.getByRole("button", { name: /profil|compte|user test/i }))
				.or(page.locator(".nav-user button"));

			await userMenuTrigger.first().click();

			const logoutButton = page
				.getByRole("menuitem", { name: "déconnecter" })
				.or(
					page.getByRole("button", {
						name: "déconnecter",
					}),
				);

			await logoutButton.click();

			// Try to access admin routes - should redirect to login
			await page.goto("/admin");
			await expect(page).toHaveURL(/auth\/login/);

			await page.goto("/admin/users");
			await expect(page).toHaveURL(/auth\/login/);
		});
	});

	test.describe("Session Persistence", () => {
		test("should maintain logout state across browser restart", async ({
			browser,
		}) => {
			// Create new context (simulating browser restart)
			const context = await browser.newContext();
			const page = await context.newPage();

			// Try to access protected route
			await page.goto("/dashboard");

			// Should redirect to login
			await expect(page).toHaveURL(/auth\/login/);

			await context.close();
			await browser.close();
		});
	});
});
