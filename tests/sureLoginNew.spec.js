import { test, expect } from '@playwright/test';
 
test('test', async ({ page }) => {
  await page.goto('https://surecafe.softr.app/login');
  //await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('demo@tiuconsulting.com');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  //await page.getByRole('textbox', { name: 'Password Forgot password' }).click();
  await page.getByRole('textbox', { name: 'Password Forgot password' }).fill('Surecafe2025@');
  await page.waitForTimeout(3000);
  await page.getByTestId('button').click();
  //await page.goto('https://surecafe.softr.app/');
  await page.getByRole('button', { name: 'Open profile menu' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
});