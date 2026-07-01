import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('axe-core scan: 0 critical and serious violations', async ({ page }) => {
    await page.goto('/');
    
    // Wait for main content to render
    await expect(page.getByText('Who are you looking for?')).toBeVisible();

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

  test('Skip link is first focusable element and focuses main content on Enter', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to focus the first element
    await page.keyboard.press('Tab');
    
    // Check if the focused element is the skip link
    const focusedText = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedText).toBe('Skip to content');
    
    // Press Enter to activate skip link
    await page.keyboard.press('Enter');
    
    // Verify focus moved to main content (or main-content is targeted)
    const activeId = await page.evaluate(() => document.activeElement?.id);
    expect(activeId).toBe('main-content');
  });

  test('Tab through all 4 choices is possible', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the buttons to appear
    await expect(page.getByText('I’m hiring')).toBeVisible();

    // The choices should be focusable via Tab
    // Let's count focusable buttons in the PrismOpening component
    const buttons = page.locator('button');
    await buttons.first().waitFor();
    
    // Since SkipLink might be first, we can Tab until we hit a choice
    let foundHiring = false;
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focusedText = await page.evaluate(() => document.activeElement?.textContent);
      if (focusedText?.includes('I’m hiring')) {
        foundHiring = true;
        break;
      }
    }
    expect(foundHiring).toBe(true);

    // Tab to next choice
    await page.keyboard.press('Tab');
    let focusedText = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedText?.includes('I’m a CTO')).toBe(true);
    
    await page.keyboard.press('Tab');
    focusedText = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedText?.includes('I’m a Founder')).toBe(true);
    
    await page.keyboard.press('Tab');
    focusedText = await page.evaluate(() => document.activeElement?.textContent);
    expect(focusedText?.includes('Just curious')).toBe(true);
  });

  test('Theme toggle is keyboard accessible', async ({ page }) => {
    await page.goto('/projects');
    
    // Navigate via keyboard or directly locate theme toggle to ensure it's a button
    const themeToggle = page.locator('button[aria-label^="Switch to"]');
    await expect(themeToggle).toBeVisible();
    
    // Check that it can receive focus
    await themeToggle.focus();
    const isFocused = await themeToggle.evaluate((node) => document.activeElement === node);
    expect(isFocused).toBe(true);
    
    // Trigger via keyboard
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    await page.keyboard.press('Enter');
    const newTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    
    expect(newTheme).not.toBe(initialTheme);
  });
});
