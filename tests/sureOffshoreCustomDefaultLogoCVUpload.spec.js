import { test, expect } from '@playwright/test';

test('Upload and Process Resumes', async ({ page, context }) => {
  test.setTimeout(300000);
  
  const email = process.env.TEST_EMAIL || 'demo@tiuconsulting.com';
  const password = process.env.TEST_PASSWORD || 'Surecafe2025@';
  const cvFilePath = process.env.CV_FILE_PATH || './test-files/Harish.pdf';
  
  try {
    // Navigate to login page
    await page.goto('https://surecafe.softr.app/login');
    
    // Login flow
    await page.getByRole('textbox', { name: 'Email *' }).fill(email);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    
    await page.getByRole('textbox', { name: 'Password Forgot password' }).waitFor({ state: 'visible', timeout: 10000 });
    await page.getByRole('textbox', { name: 'Password Forgot password' }).fill(password);
    await page.getByTestId('button').click();
    
    await page.waitForLoadState('networkidle');
    
    // Navigate to Candidates
    await page.getByRole('link', { name: 'Candidates', exact: true }).click();
    await page.waitForLoadState('networkidle');
    
    // Select Custom Address
    await page.getByRole('radio', { name: 'Custom Address' }).waitFor({ state: 'visible', timeout: 10000 });
    await page.getByRole('radio', { name: 'Custom Address' }).check();
    
    // Fill company address
    await page.getByRole('textbox', { name: 'Enter company address...' }).click();
    await page.getByRole('textbox', { name: 'Enter company address...' }).fill('Cleveland Office, 2000 Auburn Drive, Suite 200, Beachwood, Ohio 44122');
    
    // Wait for file input to be visible
  await page.locator("#fileInput").waitFor({ state: 'visible', timeout: 20000 });
  
  // Upload file
  await page.locator("#fileInput").setInputFiles("D:\\VRUSHALI\\Office\\SureCafe AI\\CVs\\New CVs\\Sonia.docx");
  
  await page.waitForTimeout(3000);
    
    // Click upload button and wait for new page
    const page1Promise = context.waitForEvent('page');
    await page.getByRole('button', { name: 'Upload & Process Resumes' }).click();
    
    const page1 = await page1Promise;
    await page1.waitForLoadState('domcontentloaded');
    
    // Login on new page
    await page1.getByRole('textbox', { name: 'Email or phone' }).fill(email);
    await page1.getByRole('textbox', { name: 'Email or phone' }).press('Enter');
    
    await page1.getByRole('textbox', { name: 'Enter your password' }).waitFor({ state: 'visible', timeout: 10000 });
    await page1.getByRole('textbox', { name: 'Enter your password' }).fill(password);
    await page1.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
    
    await page1.waitForLoadState('networkidle');
    
    // Replace with actual success indicator (e.g., success message, redirect URL, or specific element)
    await expect(page1.locator('[data-testid="success-message"]')).toBeVisible({ timeout: 90000 });
    
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});