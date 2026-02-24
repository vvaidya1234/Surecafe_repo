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

  await page.getByRole('button', { name: 'Settings' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('link', { name: 'Reports' }).click();
    await page.waitForLoadState('networkidle');
  await expect(page.getByRole('button', { name: ' All Candidates' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' All Jobs' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Search applications...' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Search applications...' }).click();
  await page.getByRole('textbox', { name: 'Search applications...' }).fill('lead');
  await page.locator('#pipelines-tab').getByRole('img').click();
  await expect(page.locator('#pipelines-tab')).toMatchAriaSnapshot(`- button " Reset Filters"`);
  await page.getByRole('button', { name: ' Reset Filters' }).click();
  await page.getByRole('button', { name: ' All Candidates' }).click();
  await page.getByRole('button', { name: 'Next →' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: 'Next →' }).click();
  await page.getByRole('button', { name: ' All Jobs' }).click();
  await page.getByRole('textbox', { name: 'Search jobs...' }).click();
  await page.getByRole('textbox', { name: 'Search jobs...' }).fill('java');
  await expect(page.locator('#jobs-tab')).toContainText('Reload Data');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: ' CSV' }).click();
  const download = await downloadPromise;
  await page.getByRole('button', { name: ' Send Report' }).click();
  await page.locator('#reportClientSelect').selectOption('recDVNEZnzk3rjKo9');
  await page.getByRole('textbox', { name: 'Enter comma separated CC email' }).click();
  await page.getByRole('button', { name: 'Send Report', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: ' Reset Filters' }).click();
  await page.locator('#jobs-tab').click();
  await page.getByText('All Time Today Last 7 Days Last 30 Days Custom Range From Date To Date Job').click();
  await page.locator('#jobDateFilter').selectOption('week');
  await page.locator('#jobDateFilter').selectOption('month');
  await page.locator('#jobDateFilter').selectOption('today');
  await page.locator('#jobDateFilter').selectOption('custom');
  await page.locator('#jobFromDate').fill('2026-02-06');
  await page.locator('#jobToDate').fill('2026-02-10');
  await page.getByRole('button', { name: 'Employment Type' }).click();
  await page.getByText('Full-time').click();
  await expect(page.locator('#jobs-tab > div:nth-child(3) > div:nth-child(2)')).toBeVisible();
} catch (error) {
    console.error('Test failed:', error);
    throw error;
 } finally {
    await page.close();
  }}); ;