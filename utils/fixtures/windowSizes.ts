import { test as base, Page } from '@playwright/test';

type WindowSizes = {
    pageSmall: Page,
    pageMedium: Page,
    pageHuge: Page
};

export const test = base.extend<WindowSizes>({
    pageSmall: async ({ page }, use) => {
        await page.setViewportSize({ width: 300, height: 300 });
        console.log('BEFORE SMALL SCREEN TEST');
        await use(page);
        console.log('AFTER SMALL SCREEN TEST');
    },
    pageMedium: async ({ page }, use) => {
        await page.setViewportSize({ width: 600, height: 600 });
        console.log('BEFORE MEDIUM SCREEN TEST');
        await use(page);
        console.log('AFTER MEDIUM SCREEN TEST');
    },
    pageHuge: async ({ page }, use) => {
        await page.setViewportSize({ width: 1000, height: 1000 });
        console.log('BEFORE HUGE SCREEN TEST');
        await use(page);
        console.log('AFTER HUGE SCREEN TEST');
    }
})