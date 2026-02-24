// ...existing code...
import { test, expect } from '@playwright/test';
import { endianness } from 'os';

test('sureJdCanMatchSelCan', async ({ page }) => {
  test.setTimeout(300000);
  // Navigate to login page
  await page.goto('https://surecafe.softr.app/login', { waitUntil: 'networkidle' });

  // Login
  await page.getByRole('textbox', { name: 'Email *' }).fill('demo@tiuconsulting.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  // Wait for password and submit
  await page.getByRole('textbox', { name: /password/i }).waitFor({ state: 'visible' });
  await page.getByRole('textbox', { name: /password/i }).fill('Surecafe2025@');
  await page.getByTestId('button').click();
  await page.waitForLoadState('networkidle');

  // Navigate to JD-Candidates Matching
  await page.getByRole('link', { name: 'JD-Candidates Matching', exact: true }).click();
  await page.waitForLoadState('networkidle');

  // Show matched candidates and show all profiles
  await page.getByRole('button', { name: 'Show Matched Candidates' }).nth(4).click();
  await page.getByRole('button', { name: /Show All Profile/i }).click();

  // Select candidate and proceed
 // await page.locator('#select-btn-recZHJanIA8opzEmT').click();
  //await page.getByRole('button', { name: 'Yes, Proceed' }).click();
  //await page.locator('#resultModal').getByText('×').click();

  // Send Email flow
  await page.getByRole('button', { name: ' Send Email' }).first().click();
  await page.getByRole('button', { name: 'Send Email', exact: true }).click();
  await page.locator('#resultModal').getByText('×').click();

  // Open resume in popup and handle possible Google sign-in
  const [resumePage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: ' View Resume' }).first().click()
  ]);

  // Try simple Google sign-in sequence (if required)
  try {
    await resumePage.waitForLoadState('load');
    const emailBox = resumePage.getByRole('textbox', { name: /email or phone/i });
    if (await emailBox.isVisible()) {
      await emailBox.fill('demo@tiuconsulting.com');
      await resumePage.getByRole('button', { name: 'Next' }).click();
      const pwdBox = resumePage.getByRole('textbox', { name: /enter your password/i });
      await pwdBox.waitFor({ state: 'visible', timeout: 10000 });
      await pwdBox.fill('Surecafe2025@');
      await resumePage.getByRole('button', { name: 'Next' }).click();
    }
  } catch (e) {
    // continue if sign-in not required or different flow
  }

  // Navigate to drive file (best-effort; catch navigation errors)
  await resumePage.goto('https://drive.google.com/file/d/1EAbbmZc9ugxvGLxhKPKWLVQGlWfH6n_q/view').catch(() => {});

  // Back to main page: view profile and close
  await page.getByRole('button', { name: ' View Profile' }).first().click();
  await page.getByRole('button', { name: 'Close' }).click();
});
// ...existing code...