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

  test('Prism opening renders and choices are clickable', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the ROOT node text to appear
    await expect(page.getByText('Who are you looking for?')).toBeVisible();
    
    // All 4 initial choices
    await expect(page.getByText('I’m hiring')).toBeVisible();
    await expect(page.getByText('I’m a CTO')).toBeVisible();
    await expect(page.getByText('I’m a Founder')).toBeVisible();
    await expect(page.getByText('Just curious')).toBeVisible();
    
    // Click "Just curious"
    await page.getByText('Just curious').click();
    
    // Should advance to D node
    await expect(page.getByText('What catches your eye first?')).toBeVisible();
  });

  test('Back button returns to previous node and updates path', async ({ page }) => {
    await page.goto('/');
    
    await page.getByText('I’m hiring').click();
    // At A node
    await expect(page.getByText('What kind of role?')).toBeVisible();
    
    // Path indicator should be visible in header
    await expect(page.getByText('› Hiring')).toBeVisible();
    
    // Click back button
    await page.getByText('← Back').click();
    
    // Should be back at ROOT
    await expect(page.getByText('Who are you looking for?')).toBeVisible();
    
    // Back button should disappear when at ROOT
    await expect(page.getByText('← Back')).not.toBeVisible();
  });

  test('/projects page loads and shows projects', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.getByRole('heading', { name: 'All Work' })).toBeVisible();
    
    // At least one project card should render (assuming content exists)
    const cards = page.locator('article');
    if (await cards.count() > 0) {
      await expect(cards.first()).toBeVisible();
    }
  });

  test('/meta page loads', async ({ page }) => {
    await page.goto('/meta');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('/contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /Contact/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Send/i })).toBeVisible();
  });
});
