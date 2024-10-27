import { test, expect } from '@playwright/test';

test('Test Add Stuff Page renders', async ({ page }) => {
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
  await page.getByRole('link', { name: 'Add Stuff' }).click();
  await expect(page.getByRole('heading', { name: 'Add Stuff' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
  await expect(page.getByText('Name')).toBeVisible();
  await expect(page.getByText('Quantity')).toBeVisible();
  await expect(page.getByText('Condition')).toBeVisible();
});
