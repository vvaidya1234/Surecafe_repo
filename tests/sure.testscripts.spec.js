import { test, expect } from '@playwright/test';

test('Handling Dropdown List in Playwright', async ({ page }) => {
  // Open Facebook
  await page.goto('https://www.facebook.com/');
  await expect(page).toHaveTitle(/Facebook/);

  // Open Create New Account modal
  await page.getByRole('button', { name: /create new account/i }).click();
await page.waitForTimeout(3000);
  // Wait for Month dropdown to be visible
  const monthDropdown = page.getByLabel('Month');
  await expect(monthDropdown).toBeVisible();
  await page.waitForTimeout(3000);

  // Select dropdown using value
  await monthDropdown.selectOption('3');
  await page.waitForTimeout(3000);

  // Select dropdown using visible text
  await monthDropdown.selectOption({ label: 'Oct' });

  // Validate all dropdown options
  const options = page.locator('#month option');
  const optionsText = await options.allTextContents();
  await page.waitForTimeout(3000);

  console.log('Dropdown options:', optionsText);
  await page.waitForTimeout(3000);

  await expect(options).toHaveText([
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]);

  // Additional validations
  expect(optionsText).toContain('Jan');
  expect(optionsText).toContain('Feb');
  expect(optionsText).toContain('Mar');

    // Handling drag and drop 
 
});