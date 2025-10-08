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



