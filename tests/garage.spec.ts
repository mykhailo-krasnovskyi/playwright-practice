import test, { expect } from "@playwright/test";
import SignInForm from "../pom/forms/SignInForm";
import HomePage from "../pom/pages/HomePage";
import GaragePage from "../pom/pages/GaragePage";
import AddCarForm from "../pom/forms/AddCarForm";

test.describe('POM Garage Page tests', () => {

    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;
    let addCarForm: AddCarForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        addCarForm = new AddCarForm(page);

        await homePage.navigate();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials('michael.krasnovskyi+testUser1@gmail.com', 'ZSgeVQhuU3qkvlG');
        await expect(garagePage.pageTitle).toBeVisible();
        await garagePage.openAddCarForm();
    })


    test.describe('Successful car adding', () => {

        test.afterEach(async ({ page }) => {
            await page.locator('//span[contains(@class, "icon-edit")]').first().click();
            await page.getByText('Remove car').click();
            await page.locator('//button[contains(@class, "btn-danger")]').click();
        })

        test('Add Audi Q7', async () => {
            await addCarForm.addCar('Audi', 'Q7', '555');
            await expect(garagePage.lastCarName).toHaveText('Audi Q7');
        });

        test('Add BMW 3', async () => {
            await addCarForm.addCar('BMW', '3', '555');
            await expect(garagePage.lastCarName).toHaveText('BMW 3');
        });

        test('Add Ford Focus', async () => {
            await addCarForm.addCar('Ford', 'Focus', '555');
            await expect(garagePage.lastCarName).toHaveText('Ford Focus');
        });

        test('Add Porsche Panamera', async () => {
            await addCarForm.addCar('Porsche', 'Panamera', '555');
            await expect(garagePage.lastCarName).toHaveText('Porsche Panamera');
        });

        test('Add Fiat Panda', async () => {
            await addCarForm.addCar('Fiat', 'Panda', '555');
            await expect(garagePage.lastCarName).toHaveText('Fiat ffff');
        });
    })

})
test.describe.skip('Garage Page tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('michael.krasnovskyi+testUser1@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('ZSgeVQhuU3qkvlG');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        await page.getByRole('button', { name: 'Add car' }).click();
    })


    test.describe('Successful car adding', () => {

        test.afterEach(async ({ page }) => {
            await page.locator('//span[contains(@class, "icon-edit")]').first().click();
            await page.getByText('Remove car').click();
            await page.locator('//button[contains(@class, "btn-danger")]').click();
        })

        test('Add Audi Q7', async ({ page }) => {
            await page.getByLabel('Brand').selectOption('Audi');
            await page.waitForTimeout(300);
            await page.getByLabel('Model').selectOption('Q7');
            await page.waitForTimeout(300);
            await page.getByRole('spinbutton', { name: 'Mileage' }).fill('555');
            await page.getByRole('button', { name: 'Add' }).click();
            await expect(page.locator('.car_name').first()).toHaveText('Audi Q7');
        });

        test('Add BMW 3', async ({ page }) => {
            await page.getByLabel('Brand').selectOption('BMW');
            await page.getByLabel('Model').selectOption('3');
            await page.getByRole('spinbutton', { name: 'Mileage' }).fill('555');
            await page.getByRole('button', { name: 'Add' }).click();
            await expect(page.locator('.car_name').first()).toHaveText('BMW 3');
        });

        test('Add Ford Focus', async ({ page }) => {
            await page.getByLabel('Brand').selectOption('Ford');
            await page.getByLabel('Model').selectOption('Focus');
            await page.getByRole('spinbutton', { name: 'Mileage' }).fill('555');
            await page.getByRole('button', { name: 'Add' }).click();
            await expect(page.locator('.car_name').first()).toHaveText('Ford Focus');
        });

        test('Add Porsche Panamera', async ({ page }) => {
            await page.getByLabel('Brand').selectOption('Porsche');
            await page.getByLabel('Model').selectOption('Panamera');
            await page.getByRole('spinbutton', { name: 'Mileage' }).fill('555');
            await page.getByRole('button', { name: 'Add' }).click();
            await expect(page.locator('.car_name').first()).toHaveText('Porsche Panamera');
        });

        test('Add Fiat Panda', async ({ page }) => {
            await page.getByLabel('Brand').selectOption('Fiat');
            await page.getByLabel('Model').selectOption('Panda');
            await page.getByRole('spinbutton', { name: 'Mileage' }).fill('555');
            await page.getByRole('button', { name: 'Add' }).click();
            await expect(page.locator('.car_name').first()).toHaveText('Fiat Panda');
        });
    })

    test.describe('Fields Validation', () => {
        test('Mileage field is empty', async ({ page }) => {
            await page.locator('//input[@id="addCarMileage"]').focus();
            await page.locator('//input[@id="addCarMileage"]').blur();
            await expect(page.getByRole('button', { name: 'Add' })).toBeDisabled();
            await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Mileage cost required');
            await expect(page.locator('//input[@id="addCarMileage"]')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        });
    })
})


