import { test, expect } from '@playwright/test';

test('Upload and Process Resumes', async ({ page }) => {
  test.setTimeout(300000);

  const email = process.env.TEST_EMAIL || 'demo@tiuconsulting.com';
  const password = process.env.TEST_PASSWORD || 'Surecafe2025@';
  const googlePassword = process.env.GOOGLE_PASSWORD || password;
  const cvFilePath = process.env.CV_FILE_PATH || 'D:\\VRUSHALI\\Office\\SureCafe AI\\CVs\\New CVs\\Sonia.docx';
  const logoFilePath = process.env.LOGO_FILE_PATH || 'D:\\VRUSHALI\\Office\\SureCafe AI\\CVs\\Logos\\logo1.jpeg';

  try {
    // Navigate to login page and sign in
    await page.goto('https://surecafe.softr.app/login');
    await expect(page.getByRole('textbox', { name: 'Email *' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('textbox', { name: 'Email *' }).fill(email);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByRole('textbox', { name: 'Password Forgot password' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('textbox', { name: 'Password Forgot password' }).fill(password);
    await page.getByTestId('button').click();
    await page.waitForLoadState('networkidle');

    // Navigate to Candidates
    await page.getByRole('link', { name: 'Candidates', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Select Onshore (USA) and USA Office
    await expect(page.getByRole('radio', { name: 'Onshore (USA)' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('radio', { name: 'Onshore (USA)' }).check();

    await expect(page.getByRole('radio', { name: 'USA Office' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('radio', { name: 'USA Office' }).check();

    // Select Upload Custom Logo option
    await expect(page.getByRole('radio', { name: 'Upload Custom Logo' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('radio', { name: 'Upload Custom Logo' }).check();

    // Upload files. Try to be robust: prefer multiple file inputs but fall back if only one exists.
    const fileInputs = page.locator('input[type="file"]');
    const inputsCount = await fileInputs.count();
    if (inputsCount >= 2) {
      await fileInputs.nth(0).setInputFiles(cvFilePath);
      await fileInputs.nth(1).setInputFiles(logoFilePath);
    } else if (inputsCount === 1) {
      // If only a single file input exists, upload CV then logo (some apps replace the file input after upload)
      await fileInputs.nth(0).setInputFiles(cvFilePath);
      await page.waitForTimeout(1000);
      await fileInputs.nth(0).setInputFiles(logoFilePath);
    } else {
      // Last-resort selectors used in original script
      await page.locator('#fileInput').setInputFiles(cvFilePath).catch(() => {});
      await page.locator('#fileInput').setInputFiles(logoFilePath).catch(() => {});
    }

    // Select resume template
    await page.locator('#resumeTemplate').selectOption('modern').catch(() => {});

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
   } catch (error) {
    console.error('Test failed:', error)
    throw error;
   }}) ; 
