import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { test } from '../utils/fixtures/app';

test.describe('Garage Page', () => {
    test.use({ storageState: '.auth/testUser2State.json' });

    test.beforeEach(async ({ app }) => {
        await app.homePage.openPage()
        await app.garagePage.openAddCarForm();
    })

    test.afterEach(async ({ app }) => {
        await app.garagePage.openEditLastAddedCarForm();
        await app.editCarForm.clickRemoveCarButton();
        await app.garagePage.approveRemovingCar();
    });

    test.describe('Adding cars', () => {
        test('Add Audi TT', async ({ app }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await app.addCarForm.addCar('Audi', 'TT', randomMileage);
            await expect(app.garagePage.lastAddedCarName).toHaveText('Audi TT');
            await expect(app.garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add BMW X5', async ({ app }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await app.addCarForm.addCar('BMW', 'X5', randomMileage);
            await expect(app.garagePage.lastAddedCarName).toHaveText('BMW X5');
            await expect(app.garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add Ford Sierra', async ({ app }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await app.addCarForm.addCar('Ford', 'Sierra', randomMileage);
            await expect(app.garagePage.lastAddedCarName).toHaveText('Ford Sierra');
            await expect(app.garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add Porsche Cayenne', async ({ app }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();
            await app.addCarForm.addCar('Porsche', 'Cayenne', randomMileage);
            await expect(app.garagePage.lastAddedCarName).toHaveText('Porsche Cayenne');
            await expect(app.garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })

        test('Add Fiat Panda', async ({ app }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 }).toString();

            await app.addCarForm.addCar('Fiat', 'Panda', randomMileage);
            await expect(app.garagePage.lastAddedCarName).toHaveText('Fiat Panda');
            await expect(app.garagePage.lastAddedCarMileage).toHaveValue(randomMileage);
        })
    })
})
