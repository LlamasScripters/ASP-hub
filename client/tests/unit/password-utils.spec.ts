import { test, expect } from '@playwright/test';
// Exemple de fonction utilitaire à tester
function isStrongPassword(password: string): boolean {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

test.describe('isStrongPassword', () => {
  test('accepte un mot de passe fort', () => {
    expect(isStrongPassword('Abcdefg1')).toBe(true);
  });
  test('rejette un mot de passe trop court', () => {
    expect(isStrongPassword('Abc1')).toBe(false);
  });
  test('rejette un mot de passe sans majuscule', () => {
    expect(isStrongPassword('abcdefg1')).toBe(false);
  });
  test('rejette un mot de passe sans chiffre', () => {
    expect(isStrongPassword('Abcdefgh')).toBe(false);
  });
}); 