import { test, expect } from "@playwright/test";
import AuthController from "../../controllers/AuthController";
import CarsController from "../../controllers/CarsController";

let authController: AuthController;
let carsController: CarsController;

test.beforeEach(async () => {
    authController = new AuthController();
    carsController = new CarsController();
});

test.describe('Deleting cars', () => {
    test('Remove all cars for testUser2', async ({ request }) => {
        const authResponse = await authController.signIn(request, process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
        const responseHeaders = authResponse.headers();
        expect(authResponse.status()).toBe(200);
        let sid = responseHeaders['set-cookie'].split(';')[0].split('=')[1];

        const carsResponse = await carsController.getUserCars(request, sid);
        const carsResponseJson = await carsResponse.json();
        const cars = carsResponseJson.data;

        for (const car of cars) {
            const response = await carsController.deleteCar(request, car.id, sid);
            expect(response.status()).toBe(200);
        }
        console.log('Preconditions: All cars for testUser2 deleted!');
    })
})