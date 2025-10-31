import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test('Get by locator', async ({ page }) => {
    await page.locator('h1').highlight();
    await page.locator('//h1').highlight();
})

test('Get by role', async ({ page }) => {
    await page.getByRole('heading', { name: 'Do more!' }).highlight();
})

test('Get by label', async ({ page }) => {
    await page.locator('//button[contains(@class, "header_signin")]').click();
    await page.getByLabel('Email').highlight();
})

test('Get by text', async ({ page }) => {
    await page.getByText('Do more!', { exact: true }).highlight();
})

test('hasText', async ({ page }) => {
    await page.locator('//button').highlight();
    await page.locator('//button', { hasText: 'Sign In' }).highlight();
})

test('hasNotText', async ({ page }) => {
    await page.locator('//button', { hasNotText: 'Sign In' }).highlight();
})

test('has', async ({ page }) => {
    await page.locator('//a', { has: page.locator('//span[contains(@class, "icon-instagram")]') }).highlight();
})

test('hasNot', async ({ page }) => {
    await page.locator('//a', { hasNot: page.locator('//span[contains(@class, "icon-instagram")]') }).highlight();
})

test('filter', async ({ page }) => {
    await page.getByRole('heading').filter({ hasText: 'Do more!' }).highlight();
})

test('.locator.locator', async ({ page }) => {
    await page.locator('//header').locator('//button').highlight();
})

test('first, last', async ({ page }) => {
    await page.locator('//a[@class="socials_link"]').first().highlight();
    await page.locator('//a[@class="socials_link"]').last().highlight();
})

test('nth', async ({ page }) => {
    await page.locator('//a[@class="socials_link"]').nth(2).highlight();
})

test('.all', async ({ page }) => {
    const buttons = page.locator('//button');
    console.log(buttons);
    for (const button of await buttons.all()) {
        console.log((await button.innerText()))
    }

    console.log(await buttons.count());
})