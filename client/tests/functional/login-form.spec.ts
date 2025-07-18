import { expect, test } from "@playwright/test";

test.describe("Login Form", () => {
	test("affiche les champs email et mot de passe", async ({ page }) => {
		await page.goto("/auth/login");
		await expect(page.locator('input[name="email"]')).toBeVisible();
		await expect(page.locator('input[name="password"]')).toBeVisible();
	});

	test("affiche une erreur si le formulaire est soumis vide", async ({
		page,
	}) => {
		await page.goto("/auth/login");
		await page.getByRole("button", { name: /se connecter/i }).click();
		await expect(page.getByText(/requis/i)).toBeVisible();
	});
});
