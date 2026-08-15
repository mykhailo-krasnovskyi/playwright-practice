import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';
import AddCarForm from '../pom/forms/AddCarForm';
import EditCarForm from '../pom/forms/EditCarForm';

test.describe('Garage Page', () => {

    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;
    let addCarForm: AddCarForm;
    let editCarForm: EditCarForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        addCarForm = new AddCarForm(page);
        editCarForm = new EditCarForm(page);

        await homePage.openPage();
        await homePage.openSignInForm();
        await signInForm.signIn(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
        await expect(garagePage.pageHeader).toBeVisible();
        await garagePage.openAddCarForm();
    })

    test.afterEach(async ({ page }) => {
        await garagePage.openEditLastAddedCarForm();
        await editCarForm.clickRemoveCarButton();
        await garagePage.approveRemovingCar();
    });

    test.describe('Adding cars', () => {
        test('Add Audi TT', async () => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await addCarForm.addCar('Audi', 'TT', randomMileage);
            await expect(garagePage.lastAddedCarName).toHaveText('Audi TT');
            await expect(garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add BMW X5', async () => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await addCarForm.addCar('BMW', 'X5', randomMileage);
            await expect(garagePage.lastAddedCarName).toHaveText('BMW X5');
            await expect(garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add Ford Sierra', async () => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await addCarForm.addCar('Ford', 'Sierra', randomMileage);
            await expect(garagePage.lastAddedCarName).toHaveText('Ford Sierra');
            await expect(garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add Porsche Cayenne', async () => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await addCarForm.addCar('Porsche', 'Cayenne', randomMileage);
            await expect(garagePage.lastAddedCarName).toHaveText('Porsche Cayenne');
            await expect(garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add Fiat Panda', async () => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await addCarForm.addCar('Fiat', 'Panda', randomMileage);
            await expect(garagePage.lastAddedCarName).toHaveText('Fiat Panda');
            await expect(garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })
    })
})
