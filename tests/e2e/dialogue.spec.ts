import { test, expect } from '@playwright/test';

test.describe('Dialogue Engine Core Paths', () => {
  test('Recruiter path leads to projects and contact', async ({ page }) => {
    await page.goto('/');
    
    // ROOT -> A (Hiring)
    await page.getByText('I’m hiring').click();
    await expect(page.getByText('What kind of role?')).toBeVisible();
    
    // A -> A1 (Frontend)
    await page.getByText('Frontend').click();
    await expect(page.getByText('I specialize in')).toBeVisible();
    
    // A1 -> A_AFTER_PROJ (View Projects)
    await page.getByText('View relevant projects').click();
    await expect(page.getByText('Here are a few projects')).toBeVisible();
    
    // Check if ProjectCards rendered
    await expect(page.locator('article').first()).toBeVisible();
    
    // Terminal choice -> Contact
    await page.getByText('Let’s talk').click();
    await expect(page.url()).toContain('/contact');
  });

  test('CTO path explores architecture', async ({ page }) => {
    await page.goto('/');
    
    // ROOT -> B (CTO)
    await page.getByText('I’m a CTO').click();
    await expect(page.getByText('What’s your biggest engineering challenge?')).toBeVisible();
    
    // B -> B1 (Architecture)
    await page.getByText('Architecture & scaling').click();
    await expect(page.getByText('Scaling is mostly about')).toBeVisible();
  });

  test('URL ?path= param loads correct node', async ({ page }) => {
    // Navigate directly to B1 via query param
    await page.goto('/?path=ROOT.B.B1');
    
    // Should immediately see B1 content
    await expect(page.getByText('Scaling is mostly about')).toBeVisible();
  });

  test('Return visit triggers welcome back message via localStorage', async ({ page }) => {
    // We simulate a previous visit by setting localStorage before page load
    await page.goto('/');
    await page.evaluate(() => {
      window.localStorage.setItem('dialogue_memory', JSON.stringify({
        firstVisit: new Date().toISOString(),
        lastVisit: new Date().toISOString(),
        visitCount: 2,
        lastPath: ['ROOT', 'B'],
        projectsViewed: [],
        coveragePercent: 15
      }));
    });
    
    // Reload to trigger memory load
    await page.reload();
    
    // Should see welcome back text (assuming ROOT handles memory state)
    // The exact text depends on your ROOT implementation, but typically it shows a "Welcome back" node or variant
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('Rewind: breadcrumb click returns to earlier node', async ({ page }) => {
    await page.goto('/');
    
    // ROOT -> C (Founder)
    await page.getByText('I’m a Founder').click();
    
    // Breadcrumb appears
    await expect(page.getByText('› Founder')).toBeVisible();
    
    // Click back button to rewind
    await page.getByText('← Back').click();
    
    // Should be at ROOT again
    await expect(page.getByText('Who are you looking for?')).toBeVisible();
  });
});
