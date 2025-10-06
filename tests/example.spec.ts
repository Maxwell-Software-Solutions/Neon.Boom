import { test, expect } from '@playwright/test';

test('placeholder e2e passes', async ({ page }) => {
  await page.goto('/');
  expect(true).toBe(true);
});
