import test, { expect } from "@playwright/test";
import SignInForm from "../../pom/forms/SignInForm";
import HomePage from "../../pom/pages/HomePage";
import GaragePage from "../../pom/pages/GaragePage";
import AddCarForm from "../../pom/forms/AddCarForm";
import { testUser1, testUser2 } from "../../test-data/users";

test.describe('Login and save states', () => {

    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;
    let addCarForm: AddCarForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        garagePage = new GaragePage(page);
        addCarForm = new AddCarForm(page);

        await homePage.navigate();
        await homePage.openSignInForm();
    })

    test('Login as testUser1 and save state', async ({ page }) => {
        signInForm = new SignInForm(page);

        await signInForm.loginWithCredentials(testUser1.email, testUser1.password);
        await expect(garagePage.pageTitle).toBeVisible();
        await page.context().storageState({ path: '.auth/testUser1.json' });
    })

    test('Login as testUser2 and save state', async ({ page }) => {
        signInForm = new SignInForm(page);

        await signInForm.loginWithCredentials(testUser2.email, testUser2.password);
        await expect(garagePage.pageTitle).toBeVisible();
        await page.context().storageState({ path: '.auth/testUser2.json' });
    })
})