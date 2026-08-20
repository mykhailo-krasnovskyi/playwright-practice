import test, { expect } from "@playwright/test";
import HomePage from '../pom/pages/HomePage';


test.describe('Guest user', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page, context }) => {
        homePage = new HomePage(page);
        await homePage.openPage();
        await page.getByText('Guest log in').click();
    });
    test('Garage is empty by default', async ({ page }) => {
        await expect(page.locator('div.panel-page_empty')).toBeVisible();
        const data = await page.evaluate(() => {
            return JSON.parse(window.sessionStorage.getItem('guestData')!);
        });

        expect(data.cars).toHaveLength(0);
    })

    test('User can see cars if sessionStorage is not empty', async ({ page }) => {
        const seededData = {
            "expenses": [],
            "cars": [
                {
                    "id": 1,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 32,
                    "updatedMileageAt": "2026-08-20T16:57:10.633Z",
                    "carCreatedAt": "2026-08-20T16:57:10.633Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 32
                },
                {
                    "id": 2,
                    "brand": "Ford",
                    "model": "Fiesta",
                    "logo": "ford.png",
                    "initialMileage": 4242,
                    "updatedMileageAt": "2026-08-20T16:57:14.006Z",
                    "carCreatedAt": "2026-08-20T16:57:14.006Z",
                    "carBrandId": 3,
                    "carModelId": 11,
                    "mileage": 4242
                }
            ],
            "nextCarId": 3,
            "nextExpenseId": 1
        }

        await page.evaluate((data) => { window.sessionStorage.setItem('guestData', JSON.stringify(data)) }, seededData);
        await page.reload();
    })



})