import { test, expect } from '@playwright/test';

test('toggle button', async ({ page }) => {
  await page.goto('/example/button');

  const button = page.getByRole('button');

  await expect(button).toHaveAttribute('aria-label', 'Control Music')
  await expect(button).toHaveAttribute('aria-pressed', 'false')
  await expect(button).toHaveText('Play')
  await expect(page).toHaveScreenshot('unpressed.png', { maxDiffPixels: 350 });

  await button.click()

  await expect(button).toHaveText('Pause')
  await expect(button).toHaveAttribute('aria-pressed', 'true')
  await expect(page).toHaveScreenshot('pressed.png', { maxDiffPixels: 350 });
});