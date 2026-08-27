import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import AuthController from '../../controllers/AuthController';
import CarsController from '../../controllers/CarsController';

let authController: AuthController;
let carsController: CarsController;

test.beforeEach(async () => {
    authController = new AuthController();
    carsController = new CarsController();
});

test.describe('Cars API tests', () => {
    test.describe('Public API tests', () => {
        test('GET all brands', async ({ request }) => {
            const response = await carsController.getBrands(request);
            const responseJson = await response.json();
            expect(response.status()).toBe(200);
            expect(responseJson.data).toHaveLength(5);
        });

        test('GET all models', async ({ request }) => {
            const response = await carsController.getModels(request);
            const responseJson = await response.json();
            expect(response.status()).toBe(200);
            expect(responseJson.data).toHaveLength(23);
        });
    });

    test.describe('Private API tests', () => {
        let sid: string;
        let addedCars: number[] = [];
        test.beforeAll(async ({ request }) => {
            authController = new AuthController();
            carsController = new CarsController();
            const response = await authController.signIn(request, process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
            const responseHeaders = response.headers();
            expect(response.status()).toBe(200);
            sid = responseHeaders['set-cookie'].split(';')[0].split('=')[1];
        })

        test('Create Audi TT', async ({ request }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 });
            const car = {
                carBrandId: 1,
                carModelId: 1,
                mileage: randomMileage
            };

            const response = await carsController.addCar(request, car.carBrandId, car.carModelId, car.mileage, sid);

            const responseBody = await response.json();
            expect(response.status()).toBe(201);
            expect(responseBody.data.carBrandId).toBe(car.carBrandId);
            expect(responseBody.data.carModelId).toBe(car.carModelId);
            expect(responseBody.data.mileage).toBe(car.mileage);
            addedCars.push(responseBody.data.id);
        })

        test('Create BMX X5', async ({ request }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 });
            const car = {
                carBrandId: 2,
                carModelId: 8,
                mileage: randomMileage
            };

            const response = await carsController.addCar(request, car.carBrandId, car.carModelId, car.mileage, sid);

            const responseBody = await response.json();
            expect(response.status()).toBe(201);
            expect(responseBody.data.carBrandId).toBe(car.carBrandId);
            expect(responseBody.data.carModelId).toBe(car.carModelId);
            expect(responseBody.data.mileage).toBe(car.mileage);
            addedCars.push(responseBody.data.id);
        })

        test('Create Ford Sierra', async ({ request }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 });
            const car = {
                carBrandId: 3,
                carModelId: 15,
                mileage: randomMileage
            };

            const response = await carsController.addCar(request, car.carBrandId, car.carModelId, car.mileage, sid);

            const responseBody = await response.json();
            expect(response.status()).toBe(201);
            expect(responseBody.data.carBrandId).toBe(car.carBrandId);
            expect(responseBody.data.carModelId).toBe(car.carModelId);
            expect(responseBody.data.mileage).toBe(car.mileage);
            addedCars.push(responseBody.data.id);
        })
        test('Create Porsche Cayenne', async ({ request }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 });
            const car = {
                carBrandId: 4,
                carModelId: 17,
                mileage: randomMileage
            };

            const response = await carsController.addCar(request, car.carBrandId, car.carModelId, car.mileage, sid);

            const responseBody = await response.json();
            expect(response.status()).toBe(201);
            expect(responseBody.data.carBrandId).toBe(car.carBrandId);
            expect(responseBody.data.carModelId).toBe(car.carModelId);
            expect(responseBody.data.mileage).toBe(car.mileage);
            addedCars.push(responseBody.data.id);
        })

        test('Create Fiat Panda', async ({ request }) => {
            const randomMileage = faker.number.int({ min: 1000, max: 999999 });
            const car = {
                carBrandId: 5,
                carModelId: 21,
                mileage: randomMileage
            };

            const response = await carsController.addCar(request, car.carBrandId, car.carModelId, car.mileage, sid);

            const responseBody = await response.json();
            expect(response.status()).toBe(201);
            expect(responseBody.data.carBrandId).toBe(car.carBrandId);
            expect(responseBody.data.carModelId).toBe(car.carModelId);
            expect(responseBody.data.mileage).toBe(car.mileage);
            addedCars.push(responseBody.data.id);
        })

        test.afterAll(async ({ request }) => {
            for (const carId of addedCars) {
                const response = await carsController.deleteCar(request, carId, sid);
                expect(response.status()).toBe(200);
            }
        });
    })
});
