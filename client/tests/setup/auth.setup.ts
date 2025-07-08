import { expect, test as setup } from "@playwright/test";
import { testUsers } from "../fixtures/test-users.js";
import { generateOTP } from "../helpers/otp.js";
import { randomDelay } from "../helpers/random-delay.js";
import { authFiles } from "./auth.config.js";

/**
 * Setup authentication state for admin user
 * This runs once per worker and saves authentication state
 */
setup("authenticate as admin", async ({ page }) => {
	const adminUser = testUsers.admin;

	// Navigate to login page
	await page.goto("/auth/login");

	// Fill login form
	await page.getByLabel("Adresse email").fill(adminUser.email);
	await page.getByLabel("Mot de passe").fill(adminUser.password);
	await page.getByRole("button", { name: /se connecter/i }).click();

	// Wait for successful login and dashboard redirect
	await expect(page).toHaveURL(/dashboard/);

	// Verify admin access
	await expect(page.locator("body")).toContainText(
		/dashboard|tableau de bord/i,
	);

	// Save signed-in state to reuse in tests
	await page.context().storageState({ path: authFiles.admin });
});

/**
 * Setup authentication state for regular user
 * This runs once per worker and saves authentication state
 */
setup("authenticate as user", async ({ page }) => {
	const regularUser = testUsers.regularUser;

	// Navigate to login page
	await page.goto("http://localhost:8080/auth/login");

	// Fill login form
	await page.getByLabel("Adresse email").fill(regularUser.email);
	await page.getByLabel("Mot de passe").fill(regularUser.password);
	await page.getByRole("button", { name: /se connecter/i }).click();

	// Wait for successful login and dashboard redirect
	await expect(page).toHaveURL(/dashboard/);

	// Verify user is logged in
	await expect(page.locator("body")).toContainText(
		/dashboard|tableau de bord/i,
	);

	// Save signed-in state to reuse in tests
	await page.context().storageState({ path: authFiles.user });
});

setup("authenticate as user with Google", async ({ page }) => {
	const user = testUsers.google;

	// Navigate to login page
	await page.goto("/auth/login");

	const languageSelectLocator = page.getByRole("combobox");
	const frenchLanguageSelectLocator = page.getByRole("combobox", {
		name: "Changer de langue Français (",
	});
	const frenchLanguageOptionLocator = page.getByRole("option", {
		name: "Français (France)",
	});
	const mailInputLocator = page.getByRole("textbox", {
		name: "Adresse e-mail ou téléphone",
	});
	const nextButtonLocator = page.getByRole("button", { name: "Suivant" });
	const passwordInputLocator = page.getByRole("textbox", {
		name: "Saisissez votre mot de passe",
	});

	const totpInputLocator = page.getByRole("textbox", {
		name: "Saisissez le code",
	});

	await page
		.getByRole("button", { name: /.*Continuer avec Google/i })
		.click({ delay: randomDelay() });

	// Verify language selection is present
	const isNotFrenchLanguage = await frenchLanguageSelectLocator.isHidden();

	if (isNotFrenchLanguage) {
		await languageSelectLocator.click({ delay: randomDelay() });
		await frenchLanguageOptionLocator.click({ delay: randomDelay() });
	}

	// Email input
	await mailInputLocator.click({ delay: randomDelay() });
	await mailInputLocator.fill(user.email);
	await nextButtonLocator.click({ delay: randomDelay() });

	// Password input
	await passwordInputLocator.click({ delay: randomDelay() });
	await passwordInputLocator.fill(user.password);
	await nextButtonLocator.click({ delay: randomDelay() });

	// TOTP input
	await totpInputLocator.click({ delay: randomDelay() });
	const totpCode = generateOTP(user.secret);
	await totpInputLocator.fill(totpCode);
	await nextButtonLocator.click({ delay: randomDelay() });

	await expect(page.getByText("Vous vous reconnectez à ASP")).toBeVisible();
	await expect(page.getByLabel("Identifiant de compte sé")).toContainText(
		user.email,
	);
	await Promise.all([
		page
			.getByRole("button", { name: "Continuer" })
			.click({ delay: randomDelay() }),
		page.waitForURL(/dashboard/),
	]);
});
