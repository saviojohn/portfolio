import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('axe-core scan: 0 critical and serious violations', async ({ page }) => {
    await page.goto('/');
    
    // Wait for main content to render
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical'
    );
    const seriousViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'serious'
    );

    expect(criticalViolations.length).toBe(0);
    expect(seriousViolations.length).toBe(0);
  });

  test('Tab through choices is possible', async ({ page }) => {
    await page.goto('/');
    
    // Wait for signal buttons to appear
    await expect(page.getByText("I'm looking to hire someone")).toBeVisible();

    // Tab into the port buttons
    let foundHiring = false;
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focusedText = await page.evaluate(() => document.activeElement?.textContent);
      if (focusedText?.includes("I'm looking to hire someone")) {
        foundHiring = true;
        break;
      }
    }
    expect(foundHiring).toBe(true);

    // Tab to next signal port
    await page.keyboard.press('Tab');
    let focusedText = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedText?.includes("I want to see what you build")).toBe(true);
    
    await page.keyboard.press('Tab');
    focusedText = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedText?.includes("I might want to work together")).toBe(true);
    
    await page.keyboard.press('Tab');
    focusedText = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedText?.includes('Just curious')).toBe(true);
  });
});
