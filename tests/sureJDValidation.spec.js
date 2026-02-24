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

  await page.getByRole('button', { name: 'Upload & Process JDs' }).click();
  await page.waitForTimeout(3000);

  await page.locator('#resultModal').getByText('×').click();
  await page.waitForTimeout(3000);
  await page.waitForLoadState('networkidle');
  await page.locator('#uploadClientSelect').selectOption('rectrkmmw4Q5gjlLv');
  await page.waitForTimeout(3000);

  await page.getByRole('button', { name: 'Upload & Process JDs' }).click();
 // await page.getByRole('button', { name: 'Choose File' }).click();

  // Wait for file input to be visible
  await page.locator("#fileInput").waitFor({ state: 'visible', timeout: 20000 });

  await page.locator("#fileInput").setInputFiles("D:\\VRUSHALI\\Office\\SureCafe AI\\CVs\\JDs\\Operator.pdf");
  await page.waitForTimeout(3000);

  //await page.getByRole('button', { name: 'Choose File' }).setInputFiles('Operator.pdf');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Upload & Process JDs' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Email or phone' }).click();
  await page1.getByRole('textbox', { name: 'Email or phone' }).fill('demo@tiuconsulting.com');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('textbox', { name: 'Enter your password' }).fill('Surecafe#2025');
  await page1.getByRole('button', { name: 'Next' }).click();
    await page1.waitForURL('**/oauth/consent**', { timeout: 3000 }).catch(() => {});
    if (page1.url().includes('oauth/consent')) {
  await page.locator('#resultModal').getByText('×').click();
  await page.waitForTimeout(3000);
  await page.locator('.col-md-3').first().click();
  await page.waitForTimeout(3000);
  const page2Promise = page.waitForEvent('popup');
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'View Uploaded JD File' }).click();
  await page.waitForTimeout(3000);
  const page2 = await page2Promise;
}});