import { expect } from '@playwright/test';
import { test } from '../utils/fixtures/app'

test.describe('Sign In Form', () => {

    test.beforeEach(async ({ app }) => {
        await app.homePage.openPage();
        await app.homePage.openSignInForm();
    })

    test('TC-1 Sign In with valid credentials', async ({ app }) => {
        await app.signInForm.signIn(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
        await expect(app.garagePage.successLoginMessage).toBeVisible();
        await expect(app.garagePage.pageHeader).toBeVisible();
    });

    test('TC-2 Sign In with invalid credentials', async ({ app }) => {
        await app.signInForm.signIn('invalid@email.com', 'invalidpassword');
        await expect(app.signInForm.invalidCredentialsMessage).toBeVisible();
    });

    test('TC-3 Sign In without email', async ({ app }) => {
        await app.signInForm.triggerValidationError(app.signInForm.emailField);
        await expect(app.signInForm.emptyEmailMessage).toBeVisible();
        await expect(app.signInForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Sign In without password', async ({ app }) => {
        await app.signInForm.triggerValidationError(app.signInForm.passwordField);
        await expect(app.signInForm.emptyPasswordMessage).toBeVisible();
        await expect(app.signInForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('Sign In with invalid email format', async ({ app }) => {
        await app.signInForm.enterEmail('invalidemailformat');
        await app.signInForm.triggerValidationError(app.signInForm.emailField);
        await expect(app.signInForm.invalidEmailMessage).toBeVisible();
        await expect(app.signInForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
})