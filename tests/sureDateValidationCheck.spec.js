import { test, expect } from '@playwright/test';

test.setTimeout(300000);

test('Candidate Pipeline Status flow', async ({ page }) => {
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

  // Navigate to Candidate Pipelines
  await page.getByRole('link', { name: 'Candidate Pipelines' }).click();
  await page.waitForLoadState('networkidle');

  //Candidate name - Vishal Kelly
  await page.locator('.bi.bi-calendar-event').first().click();
  await page.locator('#startHour').selectOption('14');
  await page.locator('#endHour').selectOption('11');
  await expect(page.locator('#startHour')).toContainText('000102030405060708091011121314151617181920212223');
  test.setTimeout(300000);
  await expect(page.locator('#endHour')).toContainText('000102030405060708091011121314151617181920212223');
  test.setTimeout(300000);
  await expect(page.locator('#startMinute')).toHaveValue('00');
  await page.locator('#startMinute').selectOption('01');
  await page.getByText('Status Interview Scheduled').click();
  test.setTimeout(300000);
  await expect(page.locator('#interviewForm')).toMatchAriaSnapshot(`
    - text: Status
    - combobox [disabled]:
      - option "Interview Scheduled" [selected]
      - option "Interview Re-Scheduled"
      - option "L1-Scheduling Required"
      - option "L1-Scheduled"
      - option "L1-Reschedule"
      - option "L2-Scheduling Required"
      - option "L2-Scheduled"
      - option "L2-Reschedule"
    `);
  await page.locator('#interviewModal > .modal-dialog > .modal-content > .modal-header').click();
  test.setTimeout(300000);

  //Keeping below line commented as currently no need to schedule interview.
  //await page.getByRole('button', { name: 'Schedule Interview' }).click();
   await page.waitForTimeout(3000);
});
