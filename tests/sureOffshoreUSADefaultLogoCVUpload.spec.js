import { test, expect } from '@playwright/test';

test('test', async ({ page, context }) => {
  test.setTimeout(300000);
  
  // Navigate to login page
  //await page.goto('https://surecafe.softr.app/login');
  
  // Login flow
  await page.getByRole('textbox', { name: 'Email *' }).fill('demo@tiuconsulting.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  
  await page.getByRole('textbox', { name: 'Password Forgot password' }).waitFor({ state: 'visible' });
  await page.getByRole('textbox', { name: 'Password Forgot password' }).fill('Surecafe2025@');
  
  await page.getByTestId('button').click();
  
  await page.waitForLoadState('networkidle');

  // Click Candidates link and wait for navigation to complete
  await page.getByRole('link', { name: 'Candidates', exact: true }).click();
  await page.waitForLoadState('networkidle'); // Wait for page to fully load
  
  // Wait for radio button to be available before checking
  await page.getByRole('radio', { name: 'USA Office' }).waitFor({ state: 'visible', timeout: 10000 });
  await page.getByRole('radio', { name: 'USA Office' }).check();

  // Wait for file input to be visible
  await page.locator("#fileInput").waitFor({ state: 'visible', timeout: 20000 });
  
  // Upload file
  await page.locator("#fileInput").setInputFiles("D:\\VRUSHALI\\Office\\SureCafe AI\\CVs\\New CVs\\Sonia.docx");
  
  await page.waitForTimeout(3000);

  // Set up listener for new page BEFORE clicking
  const page1Promise = context.waitForEvent('page');
  await page.getByRole('button', { name: 'Upload & Process Resumes' }).click();
  
  const page1 = await page1Promise;
  await page1.waitForLoadState('domcontentloaded');
  
  // Interact with the new page
  await page1.getByRole('textbox', { name: 'Email or phone' }).fill('demo@tiuconsulting.com');
  await page1.getByRole('textbox', { name: 'Email or phone' }).press('Enter');
  
  await page1.getByRole('textbox', { name: 'Enter your password' }).waitFor({ state: 'visible' });
  await page1.getByRole('textbox', { name: 'Enter your password' }).fill('Surecafe@2025');
  await page1.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
  
  // Wait for process to complete
  await page1.waitForLoadState('networkidle');
  
  // Replace with actual success indicator selector
  await expect(page1.locator('your-success-indicator')).toBeVisible({ timeout: 90000 });
});