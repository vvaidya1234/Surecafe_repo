import { test, expect } from '@playwright/test';

test('Upload and Process Resumes with Default Logo', async ({ page, context }) => {
  test.setTimeout(300000);

  const email = process.env.TEST_EMAIL || 'demo@tiuconsulting.com';
  const password = process.env.TEST_PASSWORD || 'Surecafe2025@';
  const googlePassword = process.env.GOOGLE_PASSWORD || 'Surecafe#2025';
  const cvFilePath = process.env.CV_FILE_PATH || 'D:\\VRUSHALI\\Office\\SureCafe AI\\CVs\\New CVs\\RajkumarB.docx';

  try {
    // Navigate to login page and sign in
    await page.goto('https://surecafe.softr.app/login');
    await expect(page.getByRole('textbox', { name: 'Email *' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('textbox', { name: 'Email *' }).fill(email);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByRole('textbox', { name: 'Password Forgot password' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('textbox', { name: 'Password Forgot password' }).fill(password);
    await page.getByTestId('button').click();
    await page.waitForLoadState('networkidle');

    // Navigate to Candidates
    await page.getByRole('link', { name: 'Candidates', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Select Onshore (USA) and USA Office
    await expect(page.getByRole('radio', { name: 'Onshore (USA)' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('radio', { name: 'Onshore (USA)' }).check();

    await expect(page.getByRole('radio', { name: 'USA Office' })).toBeVisible({ timeout: 10000 });
    await page.getByRole('radio', { name: 'USA Office' }).check();

    // Upload CV file
    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles(cvFilePath);

    // Select resume template
    await page.locator('#resumeTemplate').selectOption('creative');

    // Trigger upload and wait for Google auth popup
    const [page1] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('button', { name: 'Upload & Process Resumes' }).click(),
    ]);

    await page1.waitForLoadState('domcontentloaded').catch(() => {});

    // Handle Google authentication in the popup
    try {
      const emailBox = page1.getByRole('textbox', { name: /Email|phone/i });
      if (await emailBox.count()) {
        await emailBox.fill(email);
        await page1.getByRole('button', { name: /Next/i }).click().catch(() => {});
        await page1.waitForTimeout(2000);
      }

      if (!page1.isClosed()) {
        const passBox = page1.getByRole('textbox', { name: /password|Enter your password/i });
        if (await passBox.count()) {
          //await passBox.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
          await passBox.fill(googlePassword);
          await page1.getByRole('button', { name: /Next/i }).click().catch(() => {});
          await page1.waitForTimeout(2000);
        }
        const page1Promise = context.waitForEvent('page');
            await page.getByRole('button', { name: 'Upload & Process Resumes' }).click();
      }

      await page1.waitForLoadState('networkidle').catch(() => {});
    } catch (e) {
      console.warn('Google popup handling warning:', e.message || e);
    } finally {
      if (!page1.isClosed()) await page1.close().catch(() => {});
    }

    // Wait for result modal on main page with extended timeout
    const resultModal = page.locator('#resultModal');
    await resultModal.waitFor({ state: 'attached', timeout: 30000 }).catch(() => {});
    
    if (await resultModal.count()) {
      await resultModal.waitFor({ state: 'visible', timeout: 90000 });
      console.log('Result modal appeared successfully');
      
      // Close the modal
      await resultModal.getByText('×').click().catch(() => {});
    } else {
      console.warn('Result modal did not appear within expected timeframe');
    }
  } catch (error) {
    console.error('Test failed:', error)
    throw error;
    }}) ;