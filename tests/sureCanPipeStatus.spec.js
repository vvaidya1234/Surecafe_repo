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

  // View candidate details
  await page.getByText('Sandeep Kadam Role: Senior').first().click();
  await page.getByRole('button', { name: 'Close' }).click();

  // Switch views
  await page.getByText('Sandeep Kadam').nth(1).click();
  await page.locator('#kanbanCardModal').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.locator('#floatingListViewBtn').click();
  await page.locator('#floatingListViewBtn').click();
  await page.locator('#floatingBoardViewBtn').click();

  // View candidate card details
  await page.getByText('Role: Senior PHP Developer').first().click();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByText('Sandeep Kadam', { exact: true }).nth(5).click();
  await page.getByRole('button', { name: 'Close' }).click();

  // View another candidate
  await page.locator('#kanbanBoard').getByText('Daina Zen').click();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByText('Role: Senior PHP Developer').nth(1).click();
  await page.getByRole('button', { name: 'Close' }).click();

  // Candidate action buttons
  await page.locator('div:nth-child(4) > .kanban-cards > div:nth-child(2) > div:nth-child(2) > div > .btn.btn-secondary > .bi').click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  // Feedback communication
  await page.locator('div:nth-child(4) > .kanban-cards > div:nth-child(2) > div:nth-child(2) > div > .btn.btn-primary.btn-sm.btn-icon-css.btn-action-feedback > .bi').click();
  await page.locator('#feedbackCommunicationModal').getByText('×').click();

  // Feedback modal again
  await page.locator('div:nth-child(4) > .kanban-cards > div:nth-child(2) > div:nth-child(2) > div > .btn.btn-primary.btn-sm.btn-icon-css.btn-action-feedback > .bi').click();
  await page.locator('#feedbackCommunicationModal').getByText('×').click();

  // Send email flow
  await page.locator('div:nth-child(4) > .kanban-cards > div:nth-child(2) > div:nth-child(2) > div > .btn.btn-primary.btn-sm.btn-icon-css.btn-action-email').click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.getByRole('button', { name: 'Send Email' }).click();
  await page.locator('#emailMessage').fill('NA');
  await page.getByRole('button', { name: 'Send Email' }).click();
  await page.locator('#resultModal').getByText('×').click();

  // Send Initial Screening Mail
  await page.locator('div:nth-child(4) > .kanban-cards > div:nth-child(2) > div:nth-child(2) > div > .btn.btn-primary.btn-sm.btn-icon-css.btn-action-email > .bi').click();
  await page.getByText('Send Initial Screening Mail').click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.getByRole('button', { name: 'Send Email' }).click();
  await page.locator('#resultModal').getByText('×').click();

  // Send Interview Voice Bot Email
  await page.locator('div:nth-child(4) > .kanban-cards > div:nth-child(2) > div:nth-child(2) > div > .btn.btn-primary.btn-sm.btn-icon-css.btn-action-email > .bi').click();
  await page.getByText('Send Interview Voice Bot Email to the Candidate').click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.getByRole('button', { name: 'Send Email' }).click();
  await page.locator('#resultModal').getByText('×').click();

  // Final feedback and status update
  await page.locator('div:nth-child(4) > .kanban-cards > div:nth-child(2) > div:nth-child(2) > div > .btn.btn-primary.btn-sm.btn-icon-css.btn-action-feedback > .bi').click();
  await page.locator('#feedbackCommunicationModal').getByText('×').click();

  // More actions
  await page.locator('div:nth-child(4) > .kanban-cards > div:nth-child(2) > div:nth-child(2) > div > .btn.btn-info > .bi').click();
  await page.locator('div:nth-child(4) > .kanban-cards > div:nth-child(2) > div:nth-child(2) > div > .btn.btn-secondary > .bi').click();

  // Update status
  await page.getByText('Status -- Select Main Status').click();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.locator('#resultModal').getByText('×').click();
});