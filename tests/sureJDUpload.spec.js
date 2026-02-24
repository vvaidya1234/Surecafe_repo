import { test, expect } from '@playwright/test';

test('test', async ({ page, context }) => {
  // Increase test timeout if needed
  test.setTimeout(300000);

  // Navigate to login page
  await page.goto('https://surecafe.softr.app/login');
  
  // Login flow
  await page.getByRole('textbox', { name: 'Email *' }).fill('demo@tiuconsulting.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  
  // Wait for password field to be visible
  await page.getByRole('textbox', { name: 'Password Forgot password' }).waitFor({ state: 'visible' });
  await page.getByRole('textbox', { name: 'Password Forgot password' }).fill('Surecafe2025@');
  
  await page.getByTestId('button').click();
  
  // Wait for navigation to complete after login
  await page.waitForLoadState('networkidle');

  await page.getByRole('link', { name: 'Job Descriptions' }).click();
  await page.waitForLoadState('networkidle');

  await page.locator('#uploadClientSelect').selectOption('recmpnNTgZyiltSVz');
  await page.waitForTimeout(3000);

  // Wait for file input to be visible
  await page.locator("#fileInput").waitFor({ state: 'visible', timeout: 20000 });

  await page.locator("#fileInput").setInputFiles("D:\\VRUSHALI\\Office\\SureCafe AI\\CVs\\JDs\\SAP Consultant.txt");
  await page.waitForTimeout(3000);
  
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Upload & Process JDs' }).click();
  const page1 = await page1Promise;
  
  // Google OAuth login
  await page1.getByRole('textbox', { name: 'Email or phone' }).fill('demo@tiuconsulting.com');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('textbox', { name: 'Enter your password' }).fill('Surecafe#2025');
  await page1.getByRole('button', { name: 'Next' }).click();
  
  // Wait for OAuth consent page or redirect back to main app
  await page1.waitForURL('**/oauth/consent**', { timeout: 90000 }).catch(() => {});
  
  // If on consent page, wait for it to load and handle it
  if (page1.url().includes('oauth/consent')) {
    await page1.waitForLoadState('networkidle');
    // Add consent approval if needed, or wait for redirect
  }
  
  // Wait for popup to close or redirect back to main page
  await page1.waitForLoadState('networkidle', { timeout: 90000 });
  
  // Check for success on the original page instead
  await page.waitForTimeout(90000); // Give time for processing
  
  // Look for actual success indicators on main page (adjust selector as needed)
  // Option 1: Check if modal appears
  await page.locator('#resultModal').waitFor({ state: 'visible', timeout: 90000 });
  
  // Close modal
  //await page.locator('#resultModal').getByText('×').click();
});