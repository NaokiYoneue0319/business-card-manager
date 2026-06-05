import type { Page } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('/login');

  await page.getByPlaceholder('ログインIDを入力').fill('admin');
  await page.getByPlaceholder('パスワードを入力').fill('admin123');

  await page.getByRole('button', { name: 'ログイン' }).click();
}