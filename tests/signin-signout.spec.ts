import { test, expect } from '@playwright/test';

test('Signin and Signout', async ({ page }) => {
  test.slow();
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('john@foo.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('changeme');
  await page.locator('input[name="password"]').press('Tab');
  await page.getByRole('button', { name: 'Signin' }).click();
  await expect(page.getByRole('button', { name: 'john@foo.com' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Stuff' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Basket' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Bicycle' })).toBeVisible();
  await page.getByRole('button', { name: 'john@foo.com' }).click();
  await page.getByRole('link', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
