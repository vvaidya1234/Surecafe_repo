import { test, expect } from '@playwright/test';
import { endianness } from 'os';

test('sureflowCvToJdCanMatch', async ({ page, context }) => {
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

  // Wait for upload to complete
  await page.waitForTimeout(3000);
  await page.getByRole('radio', { name: 'No Logo' }).check();
 
   // Interact with the new page
  await page1.getByRole('textbox', { name: 'Email or phone' }).click();
  await page1.getByRole('textbox', { name: 'Email or phone' }).fill('demo@tiuconsulting.com');
  await page1.getByRole('textbox', { name: 'Email or phone' }).press('Enter');
  await page.waitForTimeout(10000);
 // await page1.frameLocator("iframe[name='ifmail']").getByRole('button', { name: 'Continue' }).click();
  await page1.getByRole('textbox', { name: 'Enter your password' }).fill('Surecafe#2025');
  await page1.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
  await page.waitForTimeout(90000);
  //await expect(page.locator('your-success-indicator')).toBeVisible();
  //await page.waitForTimeout(90000);

  await page.getByText('× Status Processing... Please').click();
  await page.locator('#resultModal').getByText('×').click();

  await page.getByRole('link', { name: 'Job Descriptions' }).click();
  await page.waitForTimeout(3000);

   await page.locator('#uploadClientSelect').selectOption('recmpnNTgZyiltSVz');
  await page.waitForTimeout(3000);

  // Wait for file input to be visible
  await page.locator("#fileInput").waitFor({ state: 'visible', timeout: 20000 });

  await page.locator("#fileInput").setInputFiles("D:\\VRUSHALI\\Office\\SureCafe AI\\CVs\\JDs\\SAP Consultant.txt");
  await page.waitForTimeout(3000);
  
  //const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Upload & Process JDs' }).click();

  // Wait for the new page to open
  const page2 = await page1Promise;
  await page2.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
 // await page.getByRole('link', { name: 'Job Descriptions' }).click();
 
  await page.locator('#resultModal').getByText('×').click();
  
  await page.getByTitle('Show Matched Candidates').first().click();
   await page.waitForTimeout(3000);
   await page.waitForURL('**/jd-candidates-matching', { timeout: 10000 });
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Show All Profile(Including' }).click();
  await page.waitForTimeout(3000);

    // Google OAuth login
 // await page2.getByRole('textbox', { name: 'Email or phone' }).fill('demo@tiuconsulting.com');
 // await page2.getByRole('button', { name: 'Next' }).click();
 // await page2.getByRole('textbox', { name: 'Enter your password' }).fill('Surecafe@2025');
  //await page2.getByRole('button', { name: 'Next' }).click();
 // await page2.waitForLoadState('networkidle', { timeout: 90000 });
  
  //await page.getByRole('textbox', { name: 'Search jobs...' }).click();
  //await page.getByRole('textbox', { name: 'Search jobs...' }).fill('php');
 // await page.getByRole('textbox', { name: 'Search jobs...' }).press('Enter');
 // await page.getByRole('button', { name: ' Reset Filters' }).click();
 // await page.getByRole('button', { name: '2' }).click();
  // await page.waitForTimeout(3000);

   //await page.getByTitle('Show Matched Candidates').nth(3).click();
  //await page.goto('https://surecafe.softr.app/jd-candidates-matching');
   //await page.waitForTimeout(3000);
  // await page.getByText('Sonia • PHP Developer').click();
});