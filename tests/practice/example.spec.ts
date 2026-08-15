import { test, expect } from '@playwright/test';
test.beforeEach(() => {
  console.log('BEFORE EACH');
})

test.describe('Example tests', () => {
  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);

  });

  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('Multiple pages', async ({ page, context }) => {

    await page.goto('/');
    const facebookPagePromise = context.waitForEvent('page');
    await page.locator('.icon-facebook').click();
    const faceBookPage = await facebookPagePromise;

    await expect(page.getByText('Do more!')).toBeVisible();
    await expect(faceBookPage.getByText('Forgot password?')).toBeVisible();

    await page.bringToFront();
    await faceBookPage.bringToFront();
    await page.waitForTimeout(1000);
    await page.bringToFront();
    await faceBookPage.bringToFront();
    await page.bringToFront();
    await page.waitForTimeout(1000);
    await faceBookPage.bringToFront();
    await page.waitForTimeout(1000);
    await page.bringToFront();
    await faceBookPage.bringToFront();
    await page.bringToFront();
    await faceBookPage.bringToFront();
    await page.bringToFront();
    await faceBookPage.bringToFront();
    await page.bringToFront();
    await faceBookPage.bringToFront();
    await page.bringToFront();
    await faceBookPage.bringToFront();
  })

})
