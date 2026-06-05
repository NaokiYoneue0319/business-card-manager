import { test, expect } from '@playwright/test';

test('ログインできる', async ({ page }) => {
  await page.goto('/login');

  await page.getByPlaceholder('ログインIDを入力').fill('admin');
  await page.getByPlaceholder('パスワードを入力').fill('admin123');

  await page.getByRole('button', { name: 'ログイン' }).click();

  await expect(page).toHaveURL(/\/cards/);
  await expect(page.getByText('PubberNow')).toBeVisible();
});