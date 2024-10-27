import { test, expect } from '@playwright/test';
import { randEmail } from '@ngneat/falso';

test('Signup', async ({ page }) => {
  test.slow(); // Increase timeout for this test. Sometimes Next.js can be slow to start.
  const email = randEmail();
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('changeme');
  await page.locator('input[name="password"]').press('Tab');
  await page.locator('input[name="confirmPassword"]').fill('changeme');
  await page.locator('input[name="confirmPassword"]').press('Tab');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('button', { name: email })).toBeVisible();
});
