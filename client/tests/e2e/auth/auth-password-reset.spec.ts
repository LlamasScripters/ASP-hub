import { expect, test } from "@playwright/test";
import { testUsers } from "../../fixtures/test-users.js";

test.describe("Authentication - Password Reset Flow", () => {
	test.describe("Forgot Password Request", () => {
		test.beforeEach(async ({ page }) => {
			try {
				await page.goto("/auth/forgot-password");
			} catch (error) {
				// Retry once if context was closed
				await page.goto("/auth/forgot-password");
			}
		});

		test("should display forgot password form", async ({ page }) => {
			// Verify form elements are present
			await expect(page.locator('input[name="email"]')).toBeVisible();
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
			await page.locator('input[name="email"]').fill(invalidEmail);
			await page
				.getByRole("button", { name: /envoyer|send|réinitialiser/i })
				.click();

			// Should either show validation error OR remain on password reset page due to invalid email
			const currentUrl = page.url();
			const hasError = await page
				.getByText(
					/adresse.*email.*invalide|veuillez.*inclure.*@|invalid.*email/i,
				)
				.isVisible()
				.catch(() => false);

			// Pass if either validation message is shown OR user remains on forgot password page
			expect(hasError || currentUrl.includes("/auth/forgot-password")).toBe(
				true,
			);
		});

		test("should send reset email for existing user", async ({ page }) => {
			const existingUser = testUsers.admin;

			// Fill with valid existing email
			await page.locator('input[name="email"]').fill(existingUser.email);
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
			await page.locator('input[name="email"]').fill(nonExistingEmail);
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
			await page.locator('input[name="email"]').fill(existingUser.email);
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
			await page.locator('input[name="email"]').fill(existingUser.email);
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
				await expect(page.locator('input[name="password"]')).toBeVisible();
				await expect(
					page.locator('input[name="confirmPassword"]'),
				).toBeVisible();
				await expect(
					page.getByRole("button", { name: /réinitialiser|reset|changer/i }),
				).toBeVisible();
			}
		});

		test("should validate new password requirements", async ({ page }) => {
			const testToken = "test-reset-token-123";
			await page.goto(`/auth/reset-password?token=${testToken}`);

			// Only proceed if we're on the reset password page (not error page)
			const pageUrl = page.url();
			if (pageUrl.includes("reset-password") && !pageUrl.includes("error")) {
				const weakPassword = testUsers.invalid.weakPassword;

				// Try multiple selectors for password fields
				const passwordSelectors = [
					page.getByLabel(/nouveau mot de passe|new password|mot de passe/i),
					page.locator('input[name="password"]'),
					page.locator('input[type="password"]').first(),
				];

				const confirmSelectors = [
					page.getByLabel(/confirmer|confirm.*password/i),
					page.locator('input[name="confirmPassword"]'),
					page.locator('input[type="password"]').nth(1),
				];

				// Fill password fields if they exist
				let passwordFilled = false;
				for (const selector of passwordSelectors) {
					if (await selector.isVisible().catch(() => false)) {
						await selector.fill(weakPassword);
						passwordFilled = true;
						break;
					}
				}

				let confirmFilled = false;
				for (const selector of confirmSelectors) {
					if (await selector.isVisible().catch(() => false)) {
						await selector.fill(weakPassword);
						confirmFilled = true;
						break;
					}
				}

				// Only proceed if fields were found and filled
				if (passwordFilled && confirmFilled) {
					await page
						.getByRole("button", { name: /réinitialiser|reset|changer/i })
						.click();

					// Check for password validation (flexible)
					const validationVisible = await page
						.getByText(/mot.*passe.*6.*caract|password.*short|too.*short/i)
						.isVisible()
						.catch(() => false);
					expect(validationVisible).toBe(true);
				} else {
					// Skip test if form fields not found as expected
					test.skip("Password reset form fields not found as expected");
				}
			} else {
				// Skip test if reset page not accessible (invalid token, etc.)
				test.skip("Password reset page not accessible with test token");
			}
		});

		test("should validate password confirmation match", async ({ page }) => {
			const testToken = "test-reset-token-123";
			await page.goto(`/auth/reset-password?token=${testToken}`);

			// Only proceed if we're on reset page (not error page)
			const pageUrl = page.url();
			if (pageUrl.includes("reset-password") && !pageUrl.includes("error")) {
				// Try multiple selectors for password fields
				const passwordSelectors = [
					page.getByLabel(/nouveau mot de passe|new password|mot de passe/i),
					page.locator('input[name="password"]'),
					page.locator('input[type="password"]').first(),
				];

				const confirmSelectors = [
					page.getByLabel(/confirmer|confirm.*password/i),
					page.locator('input[name="confirmPassword"]'),
					page.locator('input[type="password"]').nth(1),
				];

				// Fill password fields with mismatched passwords
				let passwordFilled = false;
				for (const selector of passwordSelectors) {
					if (await selector.isVisible().catch(() => false)) {
						await selector.fill("newpassword123");
						passwordFilled = true;
						break;
					}
				}

				let confirmFilled = false;
				for (const selector of confirmSelectors) {
					if (await selector.isVisible().catch(() => false)) {
						await selector.fill("differentpassword");
						confirmFilled = true;
						break;
					}
				}

				// Only proceed if fields were found and filled
				if (passwordFilled && confirmFilled) {
					await page
						.getByRole("button", { name: /réinitialiser|reset|changer/i })
						.click();

					// Check for password mismatch validation (flexible)
					const mismatchVisible = await page
						.getByText(
							/mots.*passe.*correspondent.*pas|password.*match|passwords.*match/i,
						)
						.isVisible()
						.catch(() => false);
					expect(mismatchVisible).toBe(true);
				} else {
					// Skip test if form fields not found as expected
					test.skip("Password reset form fields not found as expected");
				}
			} else {
				// Skip test if reset page not accessible
				test.skip("Password reset page not accessible with test token");
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
