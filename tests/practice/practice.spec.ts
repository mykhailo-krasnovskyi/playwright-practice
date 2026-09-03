import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test.describe('Search elements', () => {
    test('CSS Search', async ({ page }) => {
        await page.locator('h1',).highlight();
    })

    test('Xpath Search', async ({ page }) => {
        await page.locator('//h1').highlight();
    })

    test('getByRole Search', async ({ page }) => {
        await page.getByRole('button', { name: 'Sign In' }).highlight();
    })

    test('getByText Search', async ({ page }) => {
        await page.getByLabel('About', { exact: true }).highlight();
    })

    test('hasText/hasNotText', async ({ page }) => {
        await page.locator('button', { hasNotText: 'Sign up' }).highlight();
        await page.locator('button', { hasText: 'Sign up' }).highlight();
    })

    test('has/hasNot', async ({ page }) => {
        const facebookIcon = page.locator('.icon-facebook');
        await page.locator('div.row', { has: page.locator('.icon-facebook') }).highlight();
    })

    test('.locator.locator', async ({ page }) => {
        await page.getByText('Sign In').click();
        await page.locator('.modal-content').locator('.btn-primary').highlight();
    })

    test('filter', async ({ page }) => {
        await page.getByRole('button').filter({ hasText: 'Sign Up' }).highlight();
    })
})

test.describe('Multiple Elements', () => {
    test('first/last/nth', async ({ page }) => {
        await page.locator('button').first().highlight();
        await page.locator('button').last().highlight();
        await page.locator('button').nth(2).highlight();
    })

    test('all', async ({ page }) => {
        const buttons = page.locator('button');
        console.log(await buttons.all());
        console.log(await buttons.count());
        for (const button of await buttons.all()) {
            console.log(await button.click());
        };
    })
})


test.describe('Actions', () => {
    test('pressSeq', async ({ page }) => {
        await page.locator('.header_signin').click();
        await page.locator('#signinEmail').fill('Test');
        await page.locator('#signinEmail').fill('Test');
        await page.locator('#signinPassword').pressSequentially('HELLOWORLD', { delay: 200 });
    })

    test('Text', async ({ page }) => {
        console.log(await page.locator('.header_signin').innerText());
        console.log(await page.locator('button').allInnerTexts());
    })
})


test.describe('Assertions', () => {
    test('Main Assertions', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('h1')).toHaveText('Do more!');
        await expect(page.locator('h1')).toContainText('Do');
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('h1')).not.toHaveCount(0);

    })

})