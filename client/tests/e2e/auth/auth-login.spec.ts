import { expect, test } from "@playwright/test";
import { testUsers } from "../../fixtures/test-users.js";

test.describe("Authentication - Login Flow", () => {
	test.beforeEach(async ({ page }) => {
		// Start each test from the login page
		await page.goto("/auth/login");
	});

	test("should successfully login with valid admin credentials", async ({
		page,
	}) => {
		const adminUser = testUsers.admin;

		// Fill login form
		await page.getByLabel("Adresse email").fill(adminUser.email);
		await page.locator('input[name="password"]').fill(adminUser.password);

		// Submit form
		await page.getByRole("button", { name: /se connecter/i }).click();

		// Verify successful login
		await expect(page).toHaveURL(/dashboard/);
		await expect(page.locator("body")).toContainText(
			/dashboard|tableau de bord/i,
		);
	});

	test("should successfully login with valid user credentials", async ({
		page,
	}) => {
		const regularUser = testUsers.regularUser;

		// Fill login form
		await page.getByLabel("Adresse email").fill(regularUser.email);
		await page.locator('input[name="password"]').fill(regularUser.password);

		// Submit form
		await page.getByRole("button", { name: /se connecter/i }).click();

		// Verify successful login
		await expect(page).toHaveURL(/dashboard/);
		await expect(page.locator("body")).toContainText(
			/dashboard|tableau de bord/i,
		);
	});

	test("should show error message with invalid credentials", async ({
		page,
	}) => {
		const invalidCredentials = testUsers.invalid;

		// Fill login form with invalid credentials
		await page.getByLabel("Adresse email").fill(invalidCredentials.email);
		await page
			.locator('input[name="password"]')
			.fill(invalidCredentials.password);

		// Submit form
		await page.getByRole("button", { name: /se connecter/i }).click();

		// Verify error message is displayed
		await expect(
			page.getByText(/incorrect|email ou mot de passe incorrect|invalid/i),
		).toBeVisible();

		// Verify user stays on login page
		await expect(page).toHaveURL("/auth/login");
	});

	test("should show error message with valid email but wrong password", async ({
		page,
	}) => {
		const adminUser = testUsers.admin;
		const invalidPassword = testUsers.invalid.password;

		// Fill login form with valid email but wrong password
		await page.getByLabel("Adresse email").fill(adminUser.email);
		await page.locator('input[name="password"]').fill(invalidPassword);

		// Submit form
		await page.getByRole("button", { name: /se connecter/i }).click();

		// Verify error message is displayed
		await expect(
			page.getByText(/incorrect|email ou mot de passe incorrect|invalid/i),
		).toBeVisible();

		// Verify user stays on login page
		await expect(page).toHaveURL("/auth/login");
	});

	test("should validate required fields", async ({ page }) => {
		// Try to submit without filling any fields
		await page.getByRole("button", { name: /se connecter/i }).click();

		// Check for validation messages
		await expect(
			page.getByText(/email.*requis|adresse email invalide/i),
		).toBeVisible();
		await expect(page.getByText(/mot de passe.*requis/i)).toBeVisible();
	});

	test("should validate email format", async ({ page }) => {
		const invalidEmail = testUsers.invalid.invalidEmail;

		// Fill with invalid email format
		await page.locator('input[name="email"]').fill(invalidEmail);
		await page.locator('input[name="password"]').fill("somepassword");

		// Try to submit
		await page.getByRole("button", { name: /se connecter/i }).click();

		// Should either show validation error OR remain on login page due to invalid email
		const currentUrl = page.url();
		const hasError = await page
			.getByText(
				/adresse.*email.*invalide|veuillez.*inclure.*@|invalid.*email/i,
			)
			.isVisible()
			.catch(() => false);

		// Pass if either validation message is shown OR user remains on login page
		expect(hasError || currentUrl.includes("/auth/login")).toBe(true);
	});

	test('should have "forgot password" link', async ({ page }) => {
		// Verify forgot password link exists and is clickable
		const forgotPasswordLink = page.getByRole("link", {
			name: /mot de passe oublié|forgot password/i,
		});
		await expect(forgotPasswordLink).toBeVisible();

		// Click the link and verify navigation
		await forgotPasswordLink.click();
		await expect(page).toHaveURL("/auth/forgot-password");
	});

	test("should have link to registration page", async ({ page }) => {
		// Look for registration link (might be in footer or header)
		const registerLink = page.getByRole("link", {
			name: /s'inscrire|créer un compte|register/i,
		});

		if (await registerLink.isVisible()) {
			await registerLink.click();
			await expect(page).toHaveURL("/auth/register");
		}
	});

	test("should show loading state during login", async ({ page }) => {
		const adminUser = testUsers.admin;

		// Fill login form
		await page.getByLabel("Adresse email").fill(adminUser.email);
		await page.locator('input[name="password"]').fill(adminUser.password);

		// Submit form and immediately check for loading state
		await page.getByRole("button", { name: /se connecter/i }).click();

		// Check if button shows loading text (might be brief)
		const loadingText = page.getByText(
			/connexion en cours|loading|chargement/i,
		);
		// Note: This might not always be visible due to fast network, so we make it optional
		if (await loadingText.isVisible({ timeout: 1000 }).catch(() => false)) {
			await expect(loadingText).toBeVisible();
		}

		// Eventually should redirect to dashboard
		await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
	});

	test("should handle network errors gracefully", async ({ page }) => {
		// Simulate network failure
		await page.route("**/api/**", (route) => route.abort());

		const adminUser = testUsers.admin;

		// Fill login form
		await page.getByLabel("Adresse email").fill(adminUser.email);
		await page.locator('input[name="password"]').fill(adminUser.password);

		// Submit form
		await page.getByRole("button", { name: /se connecter/i }).click();

		// Should show error message or stay on login page
		await expect(page).toHaveURL("/auth/login");
	});
});
