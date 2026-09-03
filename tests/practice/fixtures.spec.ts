// import {  expect, chromium } from '@playwright/test';
import { test } from '../../utils/fixtures/windowSizes';

// test.describe('Without fixtures', () => {

//     test('Small screen - 300x300', async () => {
//         const browser = await chromium.launch();
//         const context = await browser.newContext();
//         const page = await context.newPage();
//         await page.setViewportSize({ width: 300, height: 300 })

//         await page.goto('/');
//         await context.close();
//     })

//     test('Medium screen - 300x300', async () => {
//         const browser = await chromium.launch();
//         const context = await browser.newContext();
//         const page = await context.newPage();
//         await page.setViewportSize({ width: 600, height: 600 })

//         await page.goto('/');
//         await context.close();
//     })

//     test('Huge screen - 1000x1000', async () => {
//         const browser = await chromium.launch();
//         const context = await browser.newContext();
//         const page = await context.newPage();
//         await page.setViewportSize({ width: 1000, height: 1000 })

//         await page.goto('/');
//         await context.close();
//     })
// })

// test.describe('With build-in fixtures', () => {
//     test('Small screen - 300x300', async ({ page }) => {
//         await page.setViewportSize({ width: 300, height: 300 });

//         await page.goto('/');
//     })

//     test('Medium screen - 300x300', async ({ page }) => {
//         await page.setViewportSize({ width: 600, height: 600 });

//         await page.goto('/');
//     })

//     test('Huge screen - 1000x1000', async ({ page }) => {
//         await page.setViewportSize({ width: 1000, height: 1000 });

//         await page.goto('/');
//     })
// });


test.describe('With build-in fixtures', () => {
    test('Small screen - 300x300', async ({ pageSmall }) => {
        await pageSmall.goto('/');
    })

    test('Medium screen - 600x600', async ({ pageMedium, pageSmall }) => {
        await pageSmall.goto('/');
    })

    test('Huge screen - 1000x1000', async ({ pageSmall }) => {
        await pageSmall.goto('/');
    })
});
