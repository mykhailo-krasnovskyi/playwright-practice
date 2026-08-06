import { test, expect } from '@playwright/test';

test.describe('Sign In Form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.locator('.header_signin').click();
    })

    test('Sign In with valid credentials', async ({ page }) => {
        await page.getByLabel('Email').fill('michael.krasnovskyi+testUser2@gmail.com');
        await page.getByLabel('Password').fill('ZSgeVQhuU3qkvlG');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('You have been successfully logged in')).toBeVisible();
        await expect(page.locator('h1', { hasText: 'Garage' })).toBeVisible();
        await expect(page).toHaveScreenshot('garagePage.png', { mask: [page.locator('[name="miles"]')] });
    });

    test('Sign In with invalid credentials', async ({ page }) => {
        await page.getByLabel('Email').fill('invalid@email.com');
        await page.getByLabel('Password').fill('invalidpassword');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Wrong email or password')).toBeVisible();
    });

    test('Sign In without email', async ({ page }) => {
        await page.getByLabel('Email').focus();
        await page.getByLabel('Password').fill('ZSgeVQhuU3qkvlG');
        await expect(page.getByText('Email required')).toBeVisible();
        await expect(page.getByLabel('Email')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Sign In without password', async ({ page }) => {
        await page.getByLabel('Email').fill('michael.krasnovskyi+testUser2@gmail.com');
        await page.getByLabel('Password').focus();
        await page.getByLabel('Password').blur();
        await expect(page.getByText('Password required')).toBeVisible();
        await expect(page.getByLabel('Password')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Sign In with invalid email format', async ({ page }) => {
        await page.getByLabel('Email').fill('invalidemailformat');
        await page.getByLabel('Email').blur();
        await page.getByLabel('Password').fill('ZSgeVQhuU3qkvlG');
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await expect(page.getByLabel('Email')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
})