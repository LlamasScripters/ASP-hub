import { test, expect } from '@playwright/test';

test.describe('Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', 'admin@admin.com');
    await page.fill('input[type="password"]', 'admin123456789');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
  });

  test('validation email invalide', async ({ page }) => {
    await page.goto('/profile');
    
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.fill('email-invalide');
      await page.click('button[type="submit"]');
      await expect(page.locator('text="format"')).toBeVisible();
    }
  });

  test('validation champ requis', async ({ page }) => {
    await page.goto('/profile');
    
    const nameInput = page.locator('input[name="name"]');
    if (await nameInput.isVisible()) {
      await nameInput.fill('');
      await page.click('button[type="submit"]');
      await expect(page.locator('text="requis"')).toBeVisible();
    }
  });

  test('validation longueur minimale', async ({ page }) => {
    await page.goto('/profile');
    
    const nameInput = page.locator('input[name="name"]');
    if (await nameInput.isVisible()) {
      await nameInput.fill('a');
      await page.click('button[type="submit"]');
      await expect(page.locator('text="trop court"')).toBeVisible();
    }
  });
});