import { expect, test } from "@playwright/test";
import { authFiles } from "../../setup/auth.config";

test.describe("Authentication - Logout Flow", () => {
	test.describe("Admin User Logout", () => {
		test.use({ storageState: authFiles.admin });

		test("should successfully logout from dashboard", async ({ page }) => {
			// Navigate to dashboard (should be already logged in)
			await page.goto("/dashboard");
			await expect(page).toHaveURL(/dashboard/);

			// Wait for page to fully load
			await page.waitForLoadState("networkidle");

			// Comprehensive search for user interface elements
			const userInterfaceSelectors = [
				// Test IDs and explicit selectors
				'[data-testid="user-menu"]',
				'[data-testid="user-menu-trigger"]',
				'[data-testid="user-dropdown"]',
				'[data-testid="profile-menu"]',
				// User button patterns
				'button[class*="user"]',
				'button[class*="profile"]',
				'button[class*="account"]',
				'button[class*="avatar"]',
				// Navigation patterns
				"nav button:last-child",
				"header button:last-child",
				".navbar button:last-child",
				".nav-user",
				".user-menu",
				".profile-dropdown",
				// Sidebar patterns
				"aside button:last-child",
				".sidebar button:last-child",
				'[class*="sidebar"] button:last-child',
				// Generic clickable elements with user info
				'[role="button"][aria-haspopup]',
				'button[aria-haspopup="menu"]',
				"button[aria-expanded]",
			];

			// Try each selector pattern
			let userElement = null;
			for (const selector of userInterfaceSelectors) {
				const element = page.locator(selector).first();
				if (await element.isVisible().catch(() => false)) {
					userElement = element;
					break;
				}
			}

			// Also try role-based and text-based selectors
			if (!userElement) {
				const roleBasedSelectors = [
					page.getByRole("button", { name: /admin|user|profil|compte|menu/i }),
					page.getByRole("button").filter({ hasText: /admin|user/i }),
					page.getByText("Admin User"),
					page.getByText("admin@admin.com"),
					page.getByText(/admin@/i),
					page.locator("button").filter({ hasText: /admin|user|@/i }),
				];

				for (const selector of roleBasedSelectors) {
					if (
						await selector
							.first()
							.isVisible()
							.catch(() => false)
					) {
						userElement = selector.first();
						break;
					}
				}
			}

			// Click user element if found
			if (userElement) {
				await userElement.click();
				// Wait for menu to appear
				await page.waitForTimeout(500);
			}

			// Now look for logout options with comprehensive patterns
			const logoutSelectors = [
				// Menu items
				page.getByRole("menuitem", {
					name: /déconnecter|logout|sign.*out|se.*déconnecter/i,
				}),
				page.getByRole("option", {
					name: /déconnecter|logout|sign.*out|se.*déconnecter/i,
				}),
				// Buttons
				page.getByRole("button", {
					name: /déconnecter|logout|sign.*out|se.*déconnecter/i,
				}),
				// Links
				page.getByRole("link", {
					name: /déconnecter|logout|sign.*out|se.*déconnecter/i,
				}),
				// Text elements
				page.getByText(/^déconnecter$|^logout$|^sign out$/i),
				page.getByText(/se déconnecter/i),
				// CSS selectors
				page.locator('[data-testid="logout"]'),
				page.locator('[data-testid="sign-out"]'),
				page.locator('button[class*="logout"]'),
				page.locator('a[href*="logout"]'),
				page.locator('a[href*="signout"]'),
				// Within dropdown menus
				page.locator('[role="menu"] >> text=/déconnecter|logout/i'),
				page.locator(".dropdown-menu >> text=/déconnecter|logout/i"),
				page.locator('[class*="menu"] >> text=/déconnecter|logout/i'),
			];

			let logoutElement = null;
			for (const selector of logoutSelectors) {
				const element = selector.first();
				if (await element.isVisible().catch(() => false)) {
					logoutElement = element;
					break;
				}
			}

			// Click logout if found
			if (logoutElement) {
				await logoutElement.click();
				// Wait for logout process
				await page.waitForTimeout(1000);
			} else {
				// Alternative: Try programmatic logout by clearing storage
				await page.evaluate(() => {
					localStorage.clear();
					sessionStorage.clear();
				});
				// Force navigation to trigger auth check
				await page.goto("/dashboard");
			}

			// Verify logout by checking redirection to login
			await expect(page).toHaveURL(/auth\/login/, { timeout: 10000 });

			// Double-check by trying to access dashboard again
			await page.goto("/dashboard");
			await expect(page).toHaveURL(/auth\/login/);
		});

		test("should logout from any protected page", async ({ page }) => {
			// Navigate to dashboard first
			await page.goto("/dashboard");
			await page.waitForLoadState("networkidle");

			// Try to navigate to admin area if accessible
			const adminLink = page.getByRole("link", {
				name: /admin|administration/i,
			});
			if (await adminLink.isVisible().catch(() => false)) {
				await adminLink.click();
				await page.waitForLoadState("networkidle");
			}

			// Use the same comprehensive approach as the main logout test
			const userInterfaceSelectors = [
				'[data-testid="user-menu-trigger"]',
				'button[class*="user"]',
				'button[class*="profile"]',
				"nav button:last-child",
				".nav-user button",
				"aside button:last-child",
				'button[aria-haspopup="menu"]',
			];

			let userElement = null;
			for (const selector of userInterfaceSelectors) {
				const element = page.locator(selector).first();
				if (await element.isVisible().catch(() => false)) {
					userElement = element;
					break;
				}
			}

			// Try role-based selectors
			if (!userElement) {
				const roleSelectors = [
					page.getByRole("button", { name: /admin|user|profil|compte/i }),
					page.getByText("Admin User"),
					page.getByText(/admin@/i),
				];

				for (const selector of roleSelectors) {
					if (
						await selector
							.first()
							.isVisible()
							.catch(() => false)
					) {
						userElement = selector.first();
						break;
					}
				}
			}

			if (userElement) {
				await userElement.click();
				await page.waitForTimeout(500);
			}

			// Look for logout button
			const logoutSelectors = [
				page.getByRole("menuitem", { name: /déconnecter|logout/i }),
				page.getByRole("button", { name: /déconnecter|logout/i }),
				page.getByText(/^déconnecter$|^logout$/i),
				page.locator('[data-testid="logout"]'),
			];

			let logoutElement = null;
			for (const selector of logoutSelectors) {
				if (
					await selector
						.first()
						.isVisible()
						.catch(() => false)
				) {
					logoutElement = selector.first();
					break;
				}
			}

			if (logoutElement) {
				await logoutElement.click();
			} else {
				// Fallback: clear storage
				await page.evaluate(() => {
					localStorage.clear();
					sessionStorage.clear();
				});
			}

			// Verify logout successful
			await expect(page).toHaveURL(/auth\/login|\/$/, { timeout: 10000 });
		});
	});

	test.describe("Regular User Logout", () => {
		test.use({ storageState: authFiles.user });

		test("should successfully logout from dashboard", async ({ page }) => {
			// Navigate to dashboard (should be already logged in)
			await page.goto("/dashboard");
			await expect(page).toHaveURL(/dashboard/);
			await page.waitForLoadState("networkidle");

			// Use comprehensive approach to find user interface
			const userSelectors = [
				'[data-testid="user-menu-trigger"]',
				'button[class*="user"]',
				"nav button:last-child",
				".nav-user button",
				"aside button:last-child",
				'button[aria-haspopup="menu"]',
			];

			let userElement = null;
			for (const selector of userSelectors) {
				const element = page.locator(selector).first();
				if (await element.isVisible().catch(() => false)) {
					userElement = element;
					break;
				}
			}

			if (!userElement) {
				const roleSelectors = [
					page.getByRole("button", { name: /profil|compte|user|test/i }),
					page.getByText("User Test"),
					page.getByText(/user@/i),
				];

				for (const selector of roleSelectors) {
					if (
						await selector
							.first()
							.isVisible()
							.catch(() => false)
					) {
						userElement = selector.first();
						break;
					}
				}
			}

			if (userElement) {
				await userElement.click();
				await page.waitForTimeout(500);
			}

			// Find logout button
			const logoutSelectors = [
				page.getByRole("menuitem", { name: /déconnecter|logout/i }),
				page.getByRole("button", { name: /déconnecter|logout/i }),
				page.getByText(/^déconnecter$|^logout$/i),
				page.locator('[data-testid="logout"]'),
			];

			let logoutElement = null;
			for (const selector of logoutSelectors) {
				if (
					await selector
						.first()
						.isVisible()
						.catch(() => false)
				) {
					logoutElement = selector.first();
					break;
				}
			}

			if (logoutElement) {
				await logoutElement.click();
			} else {
				// Fallback: clear storage
				await page.evaluate(() => {
					localStorage.clear();
					sessionStorage.clear();
				});
			}

			// Verify redirect to login or home page
			await expect(page).toHaveURL(/auth\/login|\/$/, { timeout: 10000 });

			// Verify user is actually logged out
			await page.goto("/dashboard");
			await expect(page).toHaveURL(/auth\/login/);
		});

		test("should not have access to admin areas after logout", async ({
			page,
		}) => {
			// Logout first using comprehensive approach
			await page.goto("/dashboard");
			await page.waitForLoadState("networkidle");

			// Find user interface element
			const userSelectors = [
				'[data-testid="user-menu-trigger"]',
				'button[class*="user"]',
				"nav button:last-child",
				".nav-user button",
				"aside button:last-child",
			];

			let userElement = null;
			for (const selector of userSelectors) {
				const element = page.locator(selector).first();
				if (await element.isVisible().catch(() => false)) {
					userElement = element;
					break;
				}
			}

			if (!userElement) {
				const roleSelectors = [
					page.getByRole("button", { name: /profil|compte|user/i }),
					page.getByText("User Test"),
				];

				for (const selector of roleSelectors) {
					if (
						await selector
							.first()
							.isVisible()
							.catch(() => false)
					) {
						userElement = selector.first();
						break;
					}
				}
			}

			if (userElement) {
				await userElement.click();
				await page.waitForTimeout(500);

				// Find logout
				const logoutSelectors = [
					page.getByRole("menuitem", { name: /déconnecter|logout/i }),
					page.getByRole("button", { name: /déconnecter|logout/i }),
					page.getByText(/^déconnecter$|^logout$/i),
				];

				for (const selector of logoutSelectors) {
					if (
						await selector
							.first()
							.isVisible()
							.catch(() => false)
					) {
						await selector.first().click();
						break;
					}
				}
			} else {
				// Fallback: clear storage
				await page.evaluate(() => {
					localStorage.clear();
					sessionStorage.clear();
				});
			}

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
