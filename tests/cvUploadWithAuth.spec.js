import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' }); // Use saved auth

test('CV Upload with Authenticated Session', async ({ page }) => {
  test.setTimeout(300000);
  
  // Already authenticated, skip login
  await page.goto('https://surecafe.softr.app/login');
  await page.waitForLoadState('networkidle');

  // Click Candidates link
  await page.getByRole('link', { name: 'Candidates', exact: true }).click();
  await page.waitForLoadState('networkidle');
  
  // Select "No Address"
  await page.getByRole('radio', { name: 'No Address' }).waitFor({ state: 'visible', timeout: 10000 });
  await page.getByRole('radio', { name: 'No Address' }).check();

  // Upload file
  await page.locator("#fileInput").waitFor({ state: 'visible', timeout: 20000 });
  await page.locator("#fileInput").setInputFiles("D:\\VRUSHALI\\Office\\SureCafe AI\\CVs\\New CVs\\Sonia.docx");
  
  await page.waitForTimeout(3000);

  // Handle popup if it appears
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button', { name: 'Upload & Process Resumes' }).click()
  ]);
  
  await popup.waitForLoadState('domcontentloaded');
  
  // If popup requires re-authentication, handle it
  try {
    await popup.getByRole('textbox', { name: 'Enter your password' }).waitFor({ state: 'visible', timeout: 5000 });
    await popup.getByRole('textbox', { name: 'Enter your password' }).fill('Surecafe@2025');
    await popup.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
  } catch {
    // Popup didn't require login
  }
  
  await popup.waitForLoadState('networkidle');
  await expect(popup.locator('your-success-indicator')).toBeVisible({ timeout: 90000 });
});