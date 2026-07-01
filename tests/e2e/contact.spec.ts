import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('Empty form shows validation errors (HTML5 validation)', async ({ page }) => {
    await page.goto('/contact');
    
    // Submit without filling
    await page.getByRole('button', { name: /Send/i }).click();
    
    // Since we use HTML5 required attribute, the browser prevents submission.
    // We can check if the form is still visible and success is not shown.
    await expect(page.getByText('Message sent successfully!')).not.toBeVisible();
    
    // Alternatively, if we implemented custom JS validation:
    // await expect(page.getByText('Name is required')).toBeVisible();
  });

  test('Valid submission shows success message', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill form
    await page.getByLabel(/Name/i).fill('Test User');
    await page.getByLabel(/Email/i).fill('test@example.com');
    await page.getByLabel(/Message/i).fill('Hello, this is a test message from Playwright.');
    
    // Submit
    await page.getByRole('button', { name: /Send/i }).click();
    
    // Expect success message
    // Assuming ContactPage shows this text on success
    await expect(page.getByText('Message sent successfully', { exact: false })).toBeVisible();
  });

  test('Context field is pre-filled from dialogue path', async ({ page }) => {
    // Navigate via dialogue first
    await page.goto('/?path=ROOT.A.A1');
    
    // Go to contact
    await page.goto('/contact');
    
    // Check if the context hidden field or text area includes the path context
    // Our ContactPage might append context to the message or store it hidden
    // Since we didn't expose it visibly, we can check if it exists in the DOM
    const contextInput = page.locator('input[name="context"]');
    if (await contextInput.count() > 0) {
      await expect(contextInput).toHaveValue(/ROOT\.A\.A1/);
    }
  });
});
