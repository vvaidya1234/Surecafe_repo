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

  await page.getByRole('button', { name: 'Settings' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Clients' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: '+ Add Client' }).click();

  await page.locator('input[name="company_name"]').click();
 
  await page.locator('input[name="company_name"]').fill('Advanced ');
 
  await page.locator('input[name="company_name"]').fill('Advanced T');

  await page.locator('input[name="company_name"]').fill('Advanced Tech');
  await page.locator('input[name="contact_person"]').click();

  await page.locator('input[name="contact_person"]').fill('VV V');
 
  await page.locator('input[name="contact_person"]').fill('VV Vaidya');
  await page.locator('input[name="contact_number"]').click();
  await page.locator('input[name="contact_number"]').fill('202520252025');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('vvaidya@tiuconsulting.com');
  await page.locator('#clientCountry').selectOption('Japan');
  await page.locator('#clientState').selectOption('Toyama');
  await page.locator('input[name="city"]').click();
 
  await page.locator('input[name="city"]').fill('T');
  
  await page.locator('input[name="city"]').fill('Toyama');
  await page.locator('input[name="city"]').press('Tab');
  await page.locator('input[name="zip_code"]').fill('52521');
  await page.locator('input[name="address_line_1"]').click();
  await page.locator('input[name="address_line_1"]').press('CapsLock');
  await page.locator('input[name="address_line_1"]').fill('T');
  await page.locator('input[name="address_line_1"]').press('CapsLock');
  await page.locator('input[name="address_line_1"]').fill('Toyama city');
  await page.getByRole('button', { name: 'Save Client' }).click();
  await page.waitForTimeout(3000);
  await page.locator('#resultModal').getByText('×').click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Search clients...' }).click();
  await page.waitForTimeout(3000);
  //await page.getByRole('textbox', { name: 'Search clients...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search clients...' }).fill('A');
  //await page.getByRole('textbox', { name: 'Search clients...' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Search clients...' }).fill('Ad');
  await page.waitForTimeout(3000);
  await page.getByTitle('Edit Client').click();
  await page.locator('input[name="contact_person"]').click();
  await page.locator('input[name="contact_person"]').fill('VV Vaidya ');
 // await page.locator('input[name="contact_person"]').press('CapsLock');
  await page.locator('input[name="contact_person"]').fill('VV Vaidya S');
  //await page.locator('input[name="contact_person"]').press('CapsLock');
  await page.locator('input[name="contact_person"]').fill('VV Vaidya Soni');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await page.locator('#resultModal').getByText('×').click();
  await page.getByText('▼ Show').click();
  await page.getByText('▲ Hide').click();
  await page.getByTitle('Delete Client').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByTitle('Delete Client').click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.locator('#resultModal').getByText('×').click();
  await page.getByRole('textbox', { name: 'Search clients...' }).click();
  await page.locator('#clients').getByRole('img').click();
  await page.locator('#clients').getByRole('img').click();
  await page.getByRole('textbox', { name: 'Search clients...' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Search clients...' }).fill('');
  await page.waitForTimeout(3000);
});