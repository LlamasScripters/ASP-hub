import { expect, test } from "@playwright/test";

test.describe("UI Components", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/auth/login");
		await page.fill('input[type="email"]', "admin@admin.com");
		await page.fill('input[type="password"]', "admin123456789");
		await page.click('button[type="submit"]');
		await page.waitForURL("**/dashboard");
	});

	test("thème sombre/clair", async ({ page }) => {
		const themeToggle = page.locator('[data-testid="theme-toggle"]');
		if (await themeToggle.isVisible()) {
			await themeToggle.click();
			await expect(page.locator("html")).toHaveClass(/dark/);
		}
	});

	test("modal de confirmation", async ({ page }) => {
		await page.goto("/profile");

		const deleteButton = page.locator('button:has-text("Supprimer")');
		if (await deleteButton.isVisible()) {
			await deleteButton.click();
			await expect(page.locator('[role="dialog"]')).toBeVisible();
		}
	});

	test("notifications/toast", async ({ page }) => {
		await page.goto("/profile");

		const saveButton = page.locator('button[type="submit"]');
		if (await saveButton.isVisible()) {
			await saveButton.click();
			await expect(page.locator('[data-testid="toast"]')).toBeVisible();
		}
	});
});
