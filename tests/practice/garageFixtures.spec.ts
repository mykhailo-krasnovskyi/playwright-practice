import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { test } from '../../utils/fixtures/pages';

test.describe('Garage Page', () => {
    test.use({ storageState: '.auth/testUser2State.json' });
    test.beforeEach(async ({ homePage, garagePage }) => {

        // await homePage.openPage();
        // await garagePage.openAddCarForm();
    })

    test.afterEach(async ({ garagePage, editCarForm }) => {
        // await garagePage.openEditLastAddedCarForm();
        // await editCarForm.clickRemoveCarButton();
        // await garagePage.approveRemovingCar();
    });

    test.describe('Adding cars', () => {
        test('Add Audi TT', async ({ openAddCarFormAndRemoveAddedCar, addCarForm, garagePage }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await addCarForm.addCar('Audi', 'TT', randomMileage);
            await expect(garagePage.lastAddedCarName).toHaveText('Audi TT');
            await expect(garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add BMW X5', async ({ openAddCarFormAndRemoveAddedCar, addCarForm, garagePage }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await addCarForm.addCar('BMW', 'X5', randomMileage);
            await expect(garagePage.lastAddedCarName).toHaveText('BMW X5');
            await expect(garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add Ford Sierra', async ({ openAddCarFormAndRemoveAddedCar, addCarForm, garagePage }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await addCarForm.addCar('Ford', 'Sierra', randomMileage);
            await expect(garagePage.lastAddedCarName).toHaveText('Ford Sierra');
            await expect(garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add Porsche Cayenne', async ({ openAddCarFormAndRemoveAddedCar, addCarForm, garagePage }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();
            await addCarForm.addCar('Porsche', 'Cayenne', randomMileage);
            await expect(garagePage.lastAddedCarName).toHaveText('Porsche Cayenne');
            await expect(garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add Fiat Panda', async ({ openAddCarFormAndRemoveAddedCar, addCarForm, garagePage }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await addCarForm.addCar('Fiat', 'Panda', randomMileage);
            await expect(garagePage.lastAddedCarName).toHaveText('Fiat Panda');
            await expect(garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })
    })
})
