import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('un utilisateur peut se connecter avec de bons identifiants', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByLabel('Adresse email').fill('admin@admin.com');
    await page.getByLabel('Mot de passe').fill('admin123456789');
    await page.getByRole('button', { name: /se connecter/i }).click();
    await expect(page).toHaveURL(/dashboard/i);
  });

  test('affiche une erreur avec de mauvais identifiants', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByLabel('Adresse email').fill('user@example.com');
    await page.getByLabel('Mot de passe').fill('wrongpassword');
    await page.getByRole('button', { name: /se connecter/i }).click();
    await expect(page.getByText(/incorrect|email ou mot de passe incorrect/i)).toBeVisible();
  });
}); 