import test, { expect } from "@playwright/test";
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import GaragePage from '../../pom/pages/GaragePage';


test.describe('Authentication for all users', () => {
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
    
    test('Log in as user testUser2 and save storage state', async ({ page }) => {
        await signInForm.signIn(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
        await expect(garagePage.pageHeader).toBeVisible();
        await page.context().storageState({ path: '.auth/testUser2State.json' });
    });
});