import { expect, test } from "../../utils/fixtures/pom";
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import GaragePage from '../../pom/pages/GaragePage';
import CarsController from "../../api/controllers/CarsController";
import { testUser1 } from "../../test-data/users";
import AccountController from "../../api/controllers/AccountController";

test.describe('Intercept & Mock tests', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
    });

    test('interception test', async ({ page }) => {
        page.on('request', request => console.log('>>', request.method(), request.url()));
        page.on('response', response => console.log('<<', response.status(), response.url()));

        await page.goto('/');
    });


    test('interception with mocking - fake cars response', async ({ page }) => {
        const fakeCars = {
            "status": "ok",
            "data": [
                {
                    "id": 426597,
                    "carBrandId": 3,
                    "carModelId": 11,
                    "initialMileage": 42,
                    "updatedMileageAt": "2025-10-24T16:33:00.000Z",
                    "carCreatedAt": "2025-10-24T16:33:00.000Z",
                    "mileage": 42,
                    "brand": "Ford",
                    "model": "Fiesta",
                    "logo": "ford.png"
                },
                {
                    "id": 426596,
                    "carBrandId": 1,
                    "carModelId": 1,
                    "initialMileage": 43,
                    "updatedMileageAt": "2025-10-24T16:32:56.000Z",
                    "carCreatedAt": "2025-10-24T16:32:56.000Z",
                    "mileage": 43,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png"
                },
                {
                    "id": 426595,
                    "carBrandId": 1,
                    "carModelId": 1,
                    "initialMileage": 432,
                    "updatedMileageAt": "2025-10-24T16:32:54.000Z",
                    "carCreatedAt": "2025-10-24T16:32:54.000Z",
                    "mileage": 432,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png"
                }
            ]
        }

        await page.route('**/cars', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(fakeCars)
            });
        });
        await homePage.navigate();
        await homePage.openSignInForm();
        const email = 'michael.krasnovskyi+testUser1@gmail.com';
        const password = 'ZSgeVQhuU3qkvlG';
        await signInForm.loginWithCredentials(email, password);
        await expect(garagePage.pageTitle, `Garage page is not open. Logging in data: Email : ${email}, password: ${password}`).toBeVisible();
        await page.waitForTimeout(2000);

    });


})

test.describe('API requests', () => {
    let accountController: AccountController;
    let carsController: CarsController;

    let sid: string;

    test.beforeAll(async ({ request }) => {
        accountController = new AccountController(request);
        const response = await accountController.signIn(testUser1.email, testUser1.password);
        sid = response;
    });

    test.beforeEach(async ({ request }) => {
        carsController = new CarsController(request);
    });

    test('Get brands via API', async ({ request }) => {
        const response = await request.get('/api/cars/brands');
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.data).toHaveLength(5);
    });

    test('Get models via API', async ({ request }) => {
        const response = await request.get('/api/cars/models');
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.data).toHaveLength(23);
    });



    test('Create new car via API', async ({ request }) => {
        const newCar = {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 6666
        };

        const response = await carsController.addCar(newCar, sid);

        const body = await response.json();
        expect(response.status()).toBe(201);
        expect(body.data).toMatchObject(newCar);
    });

    test('Sign in via API and get sid from cookie', async ({ request }) => {
        const response = await request.post('/api/auth/signin', {
            data: {
                "email": testUser1.email,
                "password": testUser1.password,
                "remember": false
            }
        });

        expect(response.status()).toBe(200);
        const headers = response.headers();
        const setCookieHeader = headers['set-cookie'];

        const sid = setCookieHeader?.split(';')[0];
        expect(sid).toContain('sid=');
    });

    test('Delete car via API', async ({ request }) => {
        // First, create a new car to delete
        const newCar = {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 123
        };
        const createResponse = await carsController.addCar(newCar, sid);

        const createdCar = await createResponse.json();
        expect(createResponse.status()).toBe(201);
        expect(createdCar.data).toMatchObject(newCar);

        // Now delete the car
        const deleteResponse = await carsController.removeCar(createdCar.data.id, sid);

        expect(deleteResponse.status()).toBe(200);
    });

});

test('Sample test', async ({ request }) => {

    const carsController = new CarsController(request);
    let sid: string;

    const response = await request.post('/api/auth/signin', {
        data: {
            "email": 'michael.krasnovskyi+testUser1@gmail.com',
            "password": 'ZSgeVQhuU3qkvlG',
            "remember": false
        }
    });

    expect(response.status()).toBe(200);
    const headers = response.headers();
    const setCookieHeader = headers['set-cookie'];
    console.log(await response.json());
    console.log(await response.status());
    sid = setCookieHeader?.split(';')[0];
    expect(sid).toContain('sid=');

    await carsController.removeLastAddedCar(sid);

});