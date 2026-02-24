import { test, expect } from '@playwright/test';

test('Candidate Initial Screening Flow', async ({ page, context }) => {

  /* -------------------- Login -------------------- */
  await page.goto('https://surecafe.softr.app/login');

  await page.getByRole('textbox', { name: 'Email *' })
    .fill('demo@tiuconsulting.com');

  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  await page.getByRole('textbox', { name: 'Password Forgot password' })
    .fill('Surecafe2025@');

  await page.getByTestId('button').click();
  await page.waitForLoadState('networkidle');

  /* -------------------- Navigate to Candidate Pipelines -------------------- */
  await page.getByRole('link', { name: 'Candidate Pipelines' }).click();
  await page.waitForLoadState('networkidle');

  //await page.getByText('SureCafe Evaluation (2)').click();

  await page.getByText('Harish').nth(1).click();
  await page.locator('#kanbanCardModal').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.locator('div:nth-child(3) > .job-kanban > div:nth-child(3) > .kanban-cards > div:nth-child(2) > div:nth-child(2) > div > .btn.btn-primary.btn-sm.btn-icon-css.btn-action-email > .bi').click();
  await page.getByText('Send Initial Screening Mail').click();

  /* -------------------- Send Initial Screening Email -------------------- */
  const gmailPagePromise = context.waitForEvent('page');

  await page
    .locator('.btn-action-email')
    .first()
    .click();

  await page.getByText('Send Initial Screening Mail').click();
  await page.getByRole('button', { name: 'Proceed' }).click();

  await page.locator('#initialScreeningTo')
    .fill('vvaidya@tiuconsulting.com');

  await page.locator('#initialScreeningMessage1')
    .fill('Test');

  await page.getByRole('button', { name: 'Send Email' }).click();

  await page.locator('#resultModal').getByText('×').click();

  /* -------------------- Gmail Login -------------------- */
  const gmailPage = await gmailPagePromise;

  await gmailPage.goto(
    'https://accounts.google.com/v3/signin/identifier?service=mail'
  );

  await gmailPage.getByRole('textbox', { name: 'Email or phone' })
    .fill('vvaidya@tiuconsulting.com');

  await gmailPage.getByRole('button', { name: 'Next' }).click();

  await gmailPage.getByRole('textbox', { name: 'Enter your password' })
    .fill('Tiu#5566');

  await gmailPage.getByRole('button', { name: 'Next' }).click();

  /* -------------------- Open Screening Email -------------------- */
  await gmailPage.getByRole('link', { name: /Initial Screening/i }).click();

  await gmailPage.getByRole('button', { name: 'No thanks' }).click();

  /* -------------------- Start Screening Interview -------------------- */
  const interviewPagePromise = gmailPage.waitForEvent('popup');
  await gmailPage.getByRole('link', { name: 'Start Interview' }).click();
  const interviewPage = await interviewPagePromise;

  await interviewPage.locator('#introSection').click();

  const questionPagePromise = interviewPage.waitForEvent('popup');
  await interviewPage.getByRole('button', { name: 'Read & Continue' }).click();
  const questionPage = await questionPagePromise;

  await questionPage
    .getByRole('link', { name: /Vrushali Vaidya/i })
    .click();

  /* -------------------- Answer Screening Questions -------------------- */
  for (let i = 0; i < 5; i++) {
    await interviewPage.getByRole('button', { name: 'Next Question' }).click();
  }

  /* -------------------- Completion Page -------------------- */
  await interviewPage.goto(
    'https://surecafe.ai/project_surecafe_ai/thanks.html'
  );

  /* -------------------- Reload & Verify Analysis -------------------- */
  await page.getByRole('button', { name: /Reload Data/i }).click();

  await page.getByTitle('Analysis In Progress').click();
  await page.locator('.bi.bi-hourglass-split').click();

  await page.getByRole('button', { name: /Reload Data/i }).click();

  await page.getByTitle('Initial Video Analysis').nth(3).click();
  await page.getByRole('button', { name: 'Question-2' }).click();

  await page
    .locator('#initialAnalysisModal')
    .getByRole('button')
    .first()
    .click();
});
