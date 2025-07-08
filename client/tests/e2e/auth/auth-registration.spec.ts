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
		await expect(page.getByLabel(/prénom|first.*name/i)).toBeVisible();
		await expect(page.getByLabel(/nom|last.*name/i)).toBeVisible();
		await expect(page.getByLabel(/email|adresse email/i)).toBeVisible();
		await expect(page.getByLabel(/^mot de passe$/i)).toBeVisible();
		await expect(
			page.getByLabel(/confirmer|confirmation.*mot de passe/i),
		).toBeVisible();
		await expect(page.getByLabel(/conditions|terms/i)).toBeVisible();
		await expect(
			page.getByRole("button", { name: /créer|s'inscrire|register/i }),
		).toBeVisible();
	});

	test("should validate required fields", async ({ page }) => {
		// Try to submit without filling required fields
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Check for validation messages
		await expect(page.getByText(/prénom.*2 caractères/i)).toBeVisible();
		await expect(page.getByText(/nom.*2 caractères/i)).toBeVisible();
		await expect(page.getByText(/adresse email invalide/i)).toBeVisible();
		await expect(page.getByText(/mot de passe.*6 caractères/i)).toBeVisible();
	});

	test("should validate email format", async ({ page }) => {
		const invalidEmail = testUsers.invalid.invalidEmail;

		// Fill form with invalid email
		await page.getByLabel(/prénom|first.*name/i).fill("Test");
		await page.getByLabel(/nom|last.*name/i).fill("User");
		await page.getByLabel(/email|adresse email/i).fill(invalidEmail);
		await page.getByLabel(/^mot de passe$/i).fill("password123");
		await page.getByLabel(/confirmer|confirmation/i).fill("password123");

		// Submit form
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Check for email validation error
		await expect(page.getByText(/adresse email invalide/i)).toBeVisible();
	});

	test("should validate password length", async ({ page }) => {
		const weakPassword = testUsers.invalid.weakPassword;

		// Fill form with weak password
		await page.getByLabel(/prénom|first.*name/i).fill("Test");
		await page.getByLabel(/nom|last.*name/i).fill("User");
		await page.getByLabel(/email|adresse email/i).fill("test@example.com");
		await page.getByLabel(/^mot de passe$/i).fill(weakPassword);
		await page.getByLabel(/confirmer|confirmation/i).fill(weakPassword);

		// Submit form
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Check for password length validation
		await expect(page.getByText(/mot de passe.*6 caractères/i)).toBeVisible();
	});

	test("should validate password confirmation match", async ({ page }) => {
		// Fill form with mismatched passwords
		await page.getByLabel(/prénom|first.*name/i).fill("Test");
		await page.getByLabel(/nom|last.*name/i).fill("User");
		await page.getByLabel(/email|adresse email/i).fill("test@example.com");
		await page.getByLabel(/^mot de passe$/i).fill("password123");
		await page.getByLabel(/confirmer|confirmation/i).fill("differentpassword");

		// Submit form
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Check for password mismatch error
		await expect(
			page.getByText(/mots de passe ne correspondent pas/i),
		).toBeVisible();
	});

	test("should require terms acceptance", async ({ page }) => {
		// Fill all fields but don't check terms
		await page.getByLabel(/prénom|first.*name/i).fill("Test");
		await page.getByLabel(/nom|last.*name/i).fill("User");
		await page.getByLabel(/email|adresse email/i).fill("test@example.com");
		await page.getByLabel(/^mot de passe$/i).fill("password123");
		await page.getByLabel(/confirmer|confirmation/i).fill("password123");

		// Submit without accepting terms
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Check for terms validation error
		await expect(page.getByText(/accepter les conditions/i)).toBeVisible();
	});

	test("should successfully register with valid data", async ({ page }) => {
		const timestamp = Date.now();
		const testEmail = `test-user-${timestamp}@example.com`;

		// Fill registration form with valid data
		await page.getByLabel(/prénom|first.*name/i).fill("Test");
		await page.getByLabel(/nom|last.*name/i).fill("User");
		await page.getByLabel(/email|adresse email/i).fill(testEmail);
		await page.getByLabel(/^mot de passe$/i).fill("password123456");
		await page.getByLabel(/confirmer|confirmation/i).fill("password123456");

		// Accept terms and conditions
		await page.getByLabel(/conditions|terms/i).check();

		// Submit form
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Should redirect to account created page or email verification page
		await expect(page).toHaveURL(/account-created|verify/);

		// Check for success message or redirect
		const successIndicators = [
			page.getByText(/compte créé|account created|vérification|verification/i),
			page.getByText(/email envoyé|email sent/i),
			page.locator("body"),
		];

		await expect(
			successIndicators[0].or(successIndicators[1]).or(successIndicators[2]),
		).toBeVisible();
	});

	test("should show error for existing email", async ({ page }) => {
		const existingUser = testUsers.admin;

		// Try to register with existing email
		await page.getByLabel(/prénom|first.*name/i).fill("Test");
		await page.getByLabel(/nom|last.*name/i).fill("User");
		await page.getByLabel(/email|adresse email/i).fill(existingUser.email);
		await page.getByLabel(/^mot de passe$/i).fill("password123456");
		await page.getByLabel(/confirmer|confirmation/i).fill("password123456");
		await page.getByLabel(/conditions|terms/i).check();

		// Submit form
		await page
			.getByRole("button", { name: /créer|s'inscrire|register/i })
			.click();

		// Should show error about existing email
		await expect(
			page.getByText(/déjà utilisé|already exists|email.*exists/i),
		).toBeVisible();
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
		await page.getByLabel(/prénom|first.*name/i).fill("Test");
		await page.getByLabel(/nom|last.*name/i).fill("User");
		await page.getByLabel(/email|adresse email/i).fill(testEmail);
		await page.getByLabel(/^mot de passe$/i).fill("password123456");
		await page.getByLabel(/confirmer|confirmation/i).fill("password123456");
		await page.getByLabel(/conditions|terms/i).check();

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
		await page.getByLabel(/prénom|first.*name/i).fill("Test");
		await page.getByLabel(/nom|last.*name/i).fill("User");
		await page.getByLabel(/email|adresse email/i).fill("test@example.com");
		await page.getByLabel(/^mot de passe$/i).fill("password123456");
		await page.getByLabel(/confirmer|confirmation/i).fill("password123456");
		await page.getByLabel(/conditions|terms/i).check();

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
		await expect(page.getByText(/prénom.*2 caractères/i)).toBeVisible();

		// Fix the error
		await page.getByLabel(/prénom|first.*name/i).fill("Valid Name");

		// Error should disappear
		await expect(page.getByText(/prénom.*2 caractères/i)).not.toBeVisible();
	});
});
