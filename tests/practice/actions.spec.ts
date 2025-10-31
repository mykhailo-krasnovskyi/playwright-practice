import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test('text fields', async ({ page }) => {
    await page.getByText('Sign In').click();
    // await page.locator('//input[@id="signinEmail"]').fill('hello@gmail.com');
    // await page.locator('//input[@id="signinEmail"]').fill('hello@gmail.com');
    await page.locator('//input[@id="signinEmail"]').pressSequentially('hello@gmail.com', { delay: 300 });
    await page.locator('//input[@id="signinEmail"]').clear();
    await page.locator('//input[@id="signinEmail"]').press('');
})

test('force', async ({ page }) => {
    await page.getByText('Sign In').click({ force: true });
})

test('Multiple tabs', async ({ page, context }) => {
    await page.locator('.icon-facebook').click();
    const faceBookPagePromise = context.waitForEvent('page');
    const faceBookPage = await faceBookPagePromise;
    await expect(faceBookPage.getByText('Forgot password?')).toBeVisible();

    await page.locator('.icon-instagram').click();

    const instagramPagePromise = context.waitForEvent('page');
    const instagramPage = await instagramPagePromise;
    await expect(instagramPage).toHaveURL('https://www.instagram.com/hillel_itschool/');
    await page.bringToFront();
    await page.waitForTimeout(1000);
    await faceBookPage.bringToFront();
    await faceBookPage.waitForTimeout(1000);
    await instagramPage.bringToFront();
    await instagramPage.waitForTimeout(1000);
})




