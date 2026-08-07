import { test, expect } from '@playwright/test';

test.describe('Navigation & Core Flows', () => {
  test('Page loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    await page.goto('/');
    expect(errors.length).toBe(0);
  });

  test('Signal ports render and choices are clickable', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the main heading to appear
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // All 4 initial signal choices
    await expect(page.getByText("I'm looking to hire someone")).toBeVisible();
    await expect(page.getByText("I want to see what you build")).toBeVisible();
    await expect(page.getByText("I might want to work together")).toBeVisible();
    await expect(page.getByText("Just curious")).toBeVisible();
    
    // Click "Just curious"
    await page.getByText('Just curious').click();
    
    // Should advance to view 04 (Just curious panel)
    await expect(page.getByText("No pitch here — just what I'm into.")).toBeVisible();
  });

  test('Back link returns to signal board', async ({ page }) => {
    await page.goto('/');
    
    await page.getByText("I'm looking to hire someone").click();
    // At frontend/hiring view
    await expect(page.getByText('01 · hiring')).toBeVisible();
    
    // Click visible back link
    await page.locator('.back-link:visible').click();
    
    // Should be back at grid signal view
    await expect(page.getByText("One board, every layer routed through it.")).toBeVisible();
  });

  test('/projects page loads and shows projects', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { name: /Selected Works/i })).toBeVisible();
  });

  test('/contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('button', { name: /Send/i })).toBeVisible();
  });
});
