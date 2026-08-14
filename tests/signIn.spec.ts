import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';

test.describe('Sign In Form', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.openPage();
        await homePage.openSignInForm();
    })

    test('Sign In with valid credentials', async () => {
        await signInForm.signIn('michael.krasnovskyi+testUser2@gmail.com', 'ZSgeVQhuU3qkvlG');
        await expect(garagePage.successLoginMessage).toBeVisible();
        await expect(garagePage.pageHeader).toBeVisible();
    });

    test('Sign In with invalid credentials', async () => {
        await signInForm.signIn('invalid@email.com', 'invalidpassword');
        await expect(signInForm.invalidCredentialsMessage).toBeVisible();
    });

    test('Sign In without email', async () => {
        await signInForm.triggerValidationError(signInForm.emailField);
        await expect(signInForm.emptyEmailMessage).toBeVisible();
        await expect(signInForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Sign In without password', async () => {
        await signInForm.triggerValidationError(signInForm.passwordField);
        await expect(signInForm.emptyPasswordMessage).toBeVisible();
        await expect(signInForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Sign In with invalid email format', async () => {
        await signInForm.enterEmail('invalidemailformat');
        await signInForm.triggerValidationError(signInForm.emailField);
        await expect(signInForm.invalidEmailMessage).toBeVisible();
        await expect(signInForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
})