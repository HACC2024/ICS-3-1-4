import { test, expect } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test('User Pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'Add Stuff' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'List Stuff' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'john@foo.com' })).toBeVisible();
  await page.getByRole('link', { name: 'Add Stuff' }).click();
  await expect(page.getByRole('heading', { name: 'Add Stuff' })).toBeVisible();
  await expect(page.getByText('Name')).toBeVisible();
  await expect(page.getByText('Quantity')).toBeVisible();
  await expect(page.getByText('Condition')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
  await page.getByRole('link', { name: 'List Stuff' }).click();
  await expect(page.getByRole('heading', { name: 'Stuff' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Bicycle' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Basket' })).toBeVisible();
});
