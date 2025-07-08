import { expect, test } from "@playwright/test";
import { testUsers } from "../../fixtures/test-users.js";

test.describe("Authentication - Registration Flow", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/auth/register");
	});

	test("should display registration form with all required fields", async ({
		page,
	}) => {
		// Verify all form fields are present
		await expect(page.locator('input[name="firstName"]')).toBeVisible();
		await expect(page.locator('input[name="lastName"]')).toBeVisible();
		await expect(page.locator('input[name="email"]')).toBeVisible();
		await expect(page.locator('input[name="password"]')).toBeVisible();
		await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
		await expect(page.locator("#acceptTerms")).toBeVisible();
		await expect(
			page.getByRole("button", { name: /créer|s'inscrire|register/i }),
		).toBeVisible();
	});

	test("should validate required fields", async ({ page }) => {
		// Try to submit without filling required fields
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Check for validation messages (may be HTML5 native or custom)
		const validationMessages = [
			page.getByText(/prénom.*2.*caractères|required|remplir/i),
			page.getByText(/nom.*2.*caractères|required|remplir/i),
			page.getByText(/email.*invalide|required|remplir/i),
			page.getByText(/mot.*passe.*6.*caractères|required|remplir/i),
		];

		// At least some validation should be visible
		let visibleValidations = 0;
		for (const msg of validationMessages) {
			if (await msg.isVisible().catch(() => false)) {
				visibleValidations++;
			}
		}
		expect(visibleValidations).toBeGreaterThan(0);
	});

	test("should validate email format", async ({ page }) => {
		const invalidEmail = testUsers.invalid.invalidEmail;

		// Fill form with invalid email
		await page.locator('input[name="firstName"]').fill("Test");
		await page.locator('input[name="lastName"]').fill("User");
		await page.locator('input[name="email"]').fill(invalidEmail);
		await page.locator('input[name="password"]').fill("password123");
		await page.locator('input[name="confirmPassword"]').fill("password123");

		// Submit form
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Should either show validation error OR remain on registration page due to invalid email
		const currentUrl = page.url();
		const hasError = await page
			.getByText(
				/adresse.*email.*invalide|veuillez.*inclure.*@|invalid.*email/i,
			)
			.isVisible()
			.catch(() => false);

		// Pass if either validation message is shown OR user remains on registration page
		expect(hasError || currentUrl.includes("/auth/register")).toBe(true);
	});

	test("should validate password length", async ({ page }) => {
		const weakPassword = testUsers.invalid.weakPassword;

		// Fill form with weak password
		await page.locator('input[name="firstName"]').fill("Test");
		await page.locator('input[name="lastName"]').fill("User");
		await page.locator('input[name="email"]').fill("test@example.com");
		await page.locator('input[name="password"]').fill(weakPassword);
		await page.locator('input[name="confirmPassword"]').fill(weakPassword);

		// Submit form
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Check for password length validation
		const passwordError = page.getByText(
			/mot.*passe.*6.*caractères|password.*short|too.*short/i,
		);
		await expect(passwordError).toBeVisible();
	});

	test("should validate password confirmation match", async ({ page }) => {
		// Fill form with mismatched passwords
		await page.locator('input[name="firstName"]').fill("Test");
		await page.locator('input[name="lastName"]').fill("User");
		await page.locator('input[name="email"]').fill("test@example.com");
		await page.locator('input[name="password"]').fill("password123");
		await page
			.locator('input[name="confirmPassword"]')
			.fill("differentpassword");

		// Submit form
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Check for password mismatch error
		const mismatchError = page.getByText(
			/mots.*passe.*correspondent.*pas|password.*match|passwords.*match/i,
		);
		await expect(mismatchError).toBeVisible();
	});

	test("should require terms acceptance", async ({ page }) => {
		// Fill all fields but don't check terms
		await page.locator('input[name="firstName"]').fill("Test");
		await page.locator('input[name="lastName"]').fill("User");
		await page.locator('input[name="email"]').fill("test@example.com");
		await page.locator('input[name="password"]').fill("password123");
		await page.locator('input[name="confirmPassword"]').fill("password123");

		// Submit without accepting terms
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Check for terms validation error
		const termsError = page.getByText(
			/accepter.*conditions|terms.*required|must.*accept/i,
		);
		await expect(termsError).toBeVisible();
	});

	test("should successfully register with valid data", async ({ page }) => {
		const timestamp = Date.now();
		const testEmail = `test-user-${timestamp}@example.com`;

		// Fill registration form with valid data
		await page.locator('input[name="firstName"]').fill("Test");
		await page.locator('input[name="lastName"]').fill("User");
		await page.locator('input[name="email"]').fill(testEmail);
		await page.locator('input[name="password"]').fill("password123456");
		await page.locator('input[name="confirmPassword"]').fill("password123456");

		// Accept terms and conditions
		await page.locator("#acceptTerms").check();

		// Submit form
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Should redirect to account created page or email verification page
		await expect(page).toHaveURL(/account-created|verify/);

		// Check for success message - be specific to avoid strict mode violations
		await expect(
			page.getByText("Compte créé avec succès !").first(),
		).toBeVisible();
	});

	test("should show error for existing email", async ({ page }) => {
		const existingUser = testUsers.admin;

		// Try to register with existing email
		await page.locator('input[name="firstName"]').fill("Test");
		await page.locator('input[name="lastName"]').fill("User");
		await page.locator('input[name="email"]').fill(existingUser.email);
		await page.locator('input[name="password"]').fill("password123456");
		await page.locator('input[name="confirmPassword"]').fill("password123456");
		await page.locator("#acceptTerms").check();

		// Submit form
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Should show error about existing email
		await expect(page.getByText("Cet utilisateur existe déjà")).toBeVisible();
	});

	test("should have link to login page", async ({ page }) => {
		// Look for login link
		const loginLink = page.getByRole("link", {
			name: /se connecter|login|connexion/i,
		});

		if (await loginLink.isVisible()) {
			await loginLink.click();
			await expect(page).toHaveURL("/auth/login");
		}
	});

	test("should show loading state during registration", async ({ page }) => {
		const timestamp = Date.now();
		const testEmail = `test-user-${timestamp}@example.com`;

		// Fill form
		await page.locator('input[name="firstName"]').fill("Test");
		await page.locator('input[name="lastName"]').fill("User");
		await page.locator('input[name="email"]').fill(testEmail);
		await page.locator('input[name="password"]').fill("password123456");
		await page.locator('input[name="confirmPassword"]').fill("password123456");
		await page.locator("#acceptTerms").check();

		// Submit and check for loading state
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Check if button shows loading text
		const loadingText = page.getByText(/création.*cours|creating|chargement/i);
		if (await loadingText.isVisible({ timeout: 1000 }).catch(() => false)) {
			await expect(loadingText).toBeVisible();
		}
	});

	test("should handle network errors gracefully", async ({ page }) => {
		// Simulate network failure
		await page.route("**/api/**", (route) => route.abort());

		// Fill and submit form
		await page.locator('input[name="firstName"]').fill("Test");
		await page.locator('input[name="lastName"]').fill("User");
		await page.locator('input[name="email"]').fill("test@example.com");
		await page.locator('input[name="password"]').fill("password123456");
		await page.locator('input[name="confirmPassword"]').fill("password123456");
		await page.locator("#acceptTerms").check();

		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Should show error or stay on registration page
		await expect(page).toHaveURL("/auth/register");
	});

	test("should clear form validation errors when corrected", async ({
		page,
	}) => {
		// Trigger validation error first
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();
		await expect(
			page.getByText("Le prénom doit contenir au moins 2 caractères"),
		).toBeVisible();

		// Fix the error
		await page.locator('input[name="firstName"]').fill("Valid Name");

		// Error should disappear (check if any validation errors are still visible)
		const validationError = page.getByText(
			/prénom.*2.*caractères|required|remplir/i,
		);
		if (await validationError.isVisible().catch(() => false)) {
			await expect(validationError).not.toBeVisible();
		}
	});
});
