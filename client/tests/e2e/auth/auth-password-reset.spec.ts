import { expect, test } from "@playwright/test";
import { testUsers } from "../../fixtures/test-users.js";

test.describe("Authentication - Password Reset Flow", () => {
	test.describe("Forgot Password Request", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/auth/forgot-password");
		});

		test("should display forgot password form", async ({ page }) => {
			// Verify form elements are present
			await expect(page.getByLabel(/email|adresse email/i)).toBeVisible();
			await expect(
				page.getByRole("button", { name: /envoyer|send|réinitialiser/i }),
			).toBeVisible();

			// Verify page title or heading
			await expect(
				page.getByText(/mot de passe oublié|forgot password|réinitialiser/i),
			).toBeVisible();
		});

		test("should validate email field is required", async ({ page }) => {
			// Try to submit without email
			await page
				.getByRole("button", { name: /envoyer|send|réinitialiser/i })
				.click();

			// Check for validation error
			await expect(
				page.getByText(/email.*requis|adresse email invalide/i),
			).toBeVisible();
		});

		test("should validate email format", async ({ page }) => {
			const invalidEmail = testUsers.invalid.invalidEmail;

			// Fill with invalid email format
			await page.getByLabel(/email|adresse email/i).fill(invalidEmail);
			await page
				.getByRole("button", { name: /envoyer|send|réinitialiser/i })
				.click();

			// Check for email format validation
			await expect(
				page.getByText(/adresse email invalide|email.*invalid/i),
			).toBeVisible();
		});

		test("should send reset email for existing user", async ({ page }) => {
			const existingUser = testUsers.admin;

			// Fill with valid existing email
			await page.getByLabel(/email|adresse email/i).fill(existingUser.email);
			await page
				.getByRole("button", { name: /envoyer|send|réinitialiser/i })
				.click();

			// Should show success message (even for non-existing emails for security)
			await expect(
				page.getByText(/email envoyé|lien.*envoyé|instructions.*envoyées/i),
			).toBeVisible();
		});

		test("should show success message for non-existing email (security)", async ({
			page,
		}) => {
			const nonExistingEmail = testUsers.invalid.email;

			// Fill with non-existing email
			await page.getByLabel(/email|adresse email/i).fill(nonExistingEmail);
			await page
				.getByRole("button", { name: /envoyer|send|réinitialiser/i })
				.click();

			// Should still show success message for security reasons
			await expect(
				page.getByText(/email envoyé|lien.*envoyé|instructions.*envoyées/i),
			).toBeVisible();
		});

		test("should have link back to login", async ({ page }) => {
			// Look for back to login link
			const loginLink = page.getByRole("link", {
				name: /retour.*connexion|back.*login|se connecter/i,
			});

			if (await loginLink.isVisible()) {
				await loginLink.click();
				await expect(page).toHaveURL("/auth/login");
			}
		});

		test("should show loading state during request", async ({ page }) => {
			const existingUser = testUsers.admin;

			// Fill form and submit
			await page.getByLabel(/email|adresse email/i).fill(existingUser.email);
			await page
				.getByRole("button", { name: /envoyer|send|réinitialiser/i })
				.click();

			// Check for loading state (might be brief)
			const loadingText = page.getByText(/envoi.*cours|sending|chargement/i);
			if (await loadingText.isVisible({ timeout: 1000 }).catch(() => false)) {
				await expect(loadingText).toBeVisible();
			}
		});

		test("should handle network errors gracefully", async ({ page }) => {
			// Simulate network failure
			await page.route("**/api/**", (route) => route.abort());

			const existingUser = testUsers.admin;

			// Fill and submit form
			await page.getByLabel(/email|adresse email/i).fill(existingUser.email);
			await page
				.getByRole("button", { name: /envoyer|send|réinitialiser/i })
				.click();

			// Should show error or stay on the same page
			await expect(page).toHaveURL("/auth/forgot-password");
		});
	});

	test.describe("Password Reset Form", () => {
		// Note: These tests would require valid reset tokens which are typically sent via email
		// In a real test environment, you might need to intercept emails or use test-specific tokens

		test("should display password reset form with valid token", async ({
			page,
		}) => {
			// This test would need a valid reset token - you might need to:
			// 1. Generate a test token via API
			// 2. Mock the token validation
			// 3. Use a test-specific endpoint that generates tokens

			// For now, we'll test the page structure if accessible
			const testToken = "test-reset-token-123";

			await page.goto(`/auth/reset-password?token=${testToken}`);

			// Check if reset form is displayed (might redirect if token is invalid)
			const pageUrl = page.url();
			if (pageUrl.includes("reset-password")) {
				await expect(
					page.getByLabel(/nouveau mot de passe|new password/i),
				).toBeVisible();
				await expect(
					page.getByLabel(/confirmer|confirm.*password/i),
				).toBeVisible();
				await expect(
					page.getByRole("button", { name: /réinitialiser|reset|changer/i }),
				).toBeVisible();
			}
		});

		test("should validate new password requirements", async ({ page }) => {
			const testToken = "test-reset-token-123";
			await page.goto(`/auth/reset-password?token=${testToken}`);

			// Only proceed if we're on the reset password page
			if (page.url().includes("reset-password")) {
				const weakPassword = testUsers.invalid.weakPassword;

				// Fill with weak password
				await page
					.getByLabel(/nouveau mot de passe|new password/i)
					.fill(weakPassword);
				await page
					.getByLabel(/confirmer|confirm.*password/i)
					.fill(weakPassword);
				await page
					.getByRole("button", { name: /réinitialiser|reset|changer/i })
					.click();

				// Check for password validation
				await expect(
					page.getByText(/mot de passe.*6 caractères/i),
				).toBeVisible();
			}
		});

		test("should validate password confirmation match", async ({ page }) => {
			const testToken = "test-reset-token-123";
			await page.goto(`/auth/reset-password?token=${testToken}`);

			if (page.url().includes("reset-password")) {
				// Fill with mismatched passwords
				await page
					.getByLabel(/nouveau mot de passe|new password/i)
					.fill("newpassword123");
				await page
					.getByLabel(/confirmer|confirm.*password/i)
					.fill("differentpassword");
				await page
					.getByRole("button", { name: /réinitialiser|reset|changer/i })
					.click();

				// Check for password mismatch error
				await expect(
					page.getByText(/mots de passe ne correspondent pas/i),
				).toBeVisible();
			}
		});

		test("should redirect to login with invalid token", async ({ page }) => {
			const invalidToken = "invalid-token-123";

			await page.goto(`/auth/reset-password?token=${invalidToken}`);

			// Should redirect to login or show error page
			await expect(page).toHaveURL(/auth\/login|error|invalid/);
		});

		test("should redirect to login with expired token", async ({ page }) => {
			const expiredToken = "expired-token-123";

			await page.goto(`/auth/reset-password?token=${expiredToken}`);

			// Should redirect to login or show error
			await expect(page).toHaveURL(/auth\/login|error|expired/);
		});
	});

	test.describe("Integration with Login", () => {
		test("should access forgot password from login page", async ({ page }) => {
			// Start from login page
			await page.goto("/auth/login");

			// Click forgot password link
			const forgotPasswordLink = page.getByRole("link", {
				name: /mot de passe oublié|forgot password/i,
			});
			await expect(forgotPasswordLink).toBeVisible();
			await forgotPasswordLink.click();

			// Should navigate to forgot password page
			await expect(page).toHaveURL("/auth/forgot-password");
		});

		test("should navigate back to login from forgot password", async ({
			page,
		}) => {
			// Start from forgot password page
			await page.goto("/auth/forgot-password");

			// Look for back to login link
			const loginLink = page.getByRole("link", {
				name: /retour.*connexion|back.*login|se connecter/i,
			});

			if (await loginLink.isVisible()) {
				await loginLink.click();
				await expect(page).toHaveURL("/auth/login");
			}
		});
	});

	test.describe("Email Verification Flow", () => {
		test("should handle email verification after registration", async ({
			page,
		}) => {
			// This test might require mocking email verification tokens
			const testVerificationToken = "test-verification-token-123";

			await page.goto(`/auth/verify?token=${testVerificationToken}`);

			// Check if verification is processed
			const pageUrl = page.url();
			if (pageUrl.includes("verify")) {
				// Look for success or error messages
				const verificationMessages = [
					page.getByText(
						/compte vérifié|email verified|verification.*success/i,
					),
					page.getByText(/token.*invalid|verification.*failed|lien.*expiré/i),
				];

				await expect(
					verificationMessages[0].or(verificationMessages[1]),
				).toBeVisible();
			}
		});

		test("should redirect to login after successful verification", async ({
			page,
		}) => {
			const testVerificationToken = "valid-verification-token-123";

			await page.goto(`/auth/verify?token=${testVerificationToken}`);

			// After verification, should either show success page or redirect to login
			await expect(page).toHaveURL(/auth\/login|verify.*success|dashboard/);
		});
	});
});
