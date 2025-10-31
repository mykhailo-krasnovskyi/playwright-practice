import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';

test.describe('POM Sign In tests', () => {

    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.navigate();
        await homePage.openSignInForm();
    })

    test('Successful sign in', async () => {
        const email = 'michael.krasnovskyi+testUser1@gmail.com';
        const password = 'ZSgeVQhuU3qkvlG';
        await signInForm.loginWithCredentials(email, password);
        await expect(garagePage.pageTitle, `Garage page is not open. Logging in data: Email : ${email}, password: ${password}`).toBeVisible();
    })

    test('Sign In without email', async () => {
        await signInForm.triggerErrorOnField(signInForm.emailField)
        await expect(signInForm.errorMessage).toHaveText('Email required');
    })

    test('Sign In without password', async () => {
        await signInForm.triggerErrorOnField(signInForm.passwordField)
        await expect(signInForm.errorMessage).toHaveText('Password required');
    })

})


test.describe('Sign In tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.locator('//button[contains(@class, "header_signin")]').click();
    })

    test('Successful sign in', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('michael.krasnovskyi+testUser1@gmail.com');
        await page.locator('//input[@id="signinPassword"]').fill('ZSgeVQhuU3qkvlG');
        await page.locator('//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]').click();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    })

    test('Sign In without email', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').focus();
        await page.locator('//input[@id="signinEmail"]').blur();
        await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Email required');
    })

    test('Sign In without password', async ({ page }) => {
        await page.locator('//input[@id="signinPassword"]').focus();
        await page.locator('//input[@id="signinPassword"]').blur();
        await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Password required');
    })

    test('Open "Registration" form ', async ({ page }) => {
        await page.getByRole('button', { name: 'Registration' }).click();
        await expect(page.locator('//h4[@class="modal-title"]')).toHaveCount(1);
        await expect(page.locator('//h4[@class="modal-title"]')).toHaveText('Registration');

    })

    test('Open "Restore access" form ', async ({ page }) => {
        await page.getByRole('button', { name: 'Forgot password' }).click();
        await expect(page.locator('//h4[@class="modal-title"]')).toHaveCount(1);
        await expect(page.locator('//h4[@class="modal-title"]')).toHaveText('Restore access');
    })

    // test('Screenshot testing', async ({ page }) => {
    //     await page.locator('//input[@id="signinEmail"]').fill('michael.krasnovskyi+testUser1@gmail.com');
    //     await page.locator('//input[@id="signinPassword"]').fill('ZSgeVQhuU3qkvlG');
    //     await page.locator('//div[contains(@class, "modal-footer")]// button[@class="btn btn-primary"]').click();
    //     await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    //     await expect(page.locator('//li[@class="car-item"]').first()).toHaveScreenshot('last-added-car.png');
    // })

})
