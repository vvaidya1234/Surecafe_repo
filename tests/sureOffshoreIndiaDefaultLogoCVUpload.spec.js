import { test, expect } from '@playwright/test';

test('test', async ({ page, context }) => {
  // Increase test timeout if needed
  test.setTimeout(300000);
  
  // Navigate to login page
  await page.goto('https://surecafe.softr.app/login');
  
  // Login flow
  await page.getByRole('textbox', { name: 'Email *' }).fill('demo@tiuconsulting.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  
  // Wait for password field to be visible instead of fixed timeout
  await page.getByRole('textbox', { name: 'Password Forgot password' }).waitFor({ state: 'visible' });
  await page.getByRole('textbox', { name: 'Password Forgot password' }).fill('Surecafe2025@');
  
  await page.getByTestId('button').click();
  
  // Wait for navigation to complete after login
  await page.waitForLoadState('networkidle');
  
  // Click Candidates link and wait for navigation
  await page.getByRole('link', { name: 'Candidates', exact: true }).click();
  
  // Wait for the file input to be visible with increased timeout
  await page.locator("#fileInput").waitFor({ state: 'visible', timeout: 20000 });
  
  // Upload file
  await page.locator("#fileInput").setInputFiles("D:\\VRUSHALI\\Office\\SureCafe AI\\CVs\\New CVs\\Sonia.docx");
  
  // Wait for upload to complete
  await page.waitForTimeout(3000);
  
  // Set up listener for new page/popup BEFORE clicking the button
  const page1Promise = context.waitForEvent('page');
  await page.getByRole('button', { name: 'Upload & Process Resumes' }).click();
  
  // Wait for the new page to open
  const page1 = await page1Promise;
  await page1.waitForLoadState('domcontentloaded');
  
  // Interact with the new page
  await page1.getByRole('textbox', { name: 'Email or phone' }).click();
  await page1.getByRole('textbox', { name: 'Email or phone' }).fill('demo@tiuconsulting.com');
  await page1.getByRole('textbox', { name: 'Email or phone' }).press('Enter');
  await page1.getByRole('textbox', { name: 'Enter your password' }).fill('Surecafe@2025');
  await page1.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
  await page.waitForTimeout(90000);
  await expect(page.locator('your-success-indicator')).toBeVisible();
  await page.waitForTimeout(90000);
  //Optional: Add assertion to verify upload success
  //await expect(page.locator('your-success-indicator')).toBeVisible();
});