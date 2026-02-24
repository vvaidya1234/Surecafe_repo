/* import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  // Navigate to login
  await page.goto('https://surecafe.softr.app/login');
  
  // Fill credentials
  await page.getByRole('textbox', { name: 'Email *' }).fill('demo@tiuconsulting.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  
  await page.getByRole('textbox', { name: 'Password Forgot password' }).waitFor({ state: 'visible' });
  await page.getByRole('textbox', { name: 'Password Forgot password' }).fill('Surecafe2025@');
  await page.getByTestId('button').click();
  
  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');
  
  // Save authenticated state
  await page.context().storageState({ path: 'auth.json' });
}); */