import { test as base, Page } from '@playwright/test';
import AddCarForm from '../../pom/forms/AddCarForm';
import GaragePage from '../../pom/pages/GaragePage';

type pom = {
    addCarForm: AddCarForm;
    garagePage: GaragePage;
    openAddCarFormWithRemoving: AddCarForm;
    garagePageAsUser1: GaragePage;
};

export const test = base.extend<pom>({
    openAddCarFormWithRemoving: async ({ page, garagePage }, use) => {
        await garagePage.navigate();
        await garagePage.openAddCarForm();

        let addCarFormPage = new AddCarForm(page);
        await use(addCarFormPage);
        await page.waitForTimeout(500);
        await page.locator('//span[contains(@class, "icon-edit")]').first().click();
        await page.getByText('Remove car').click();
        await page.locator('//button[contains(@class, "btn-danger")]').click();
    },
    addCarForm: async ({ page }, use) => {
        let addCarForm = new AddCarForm(page);
        await use(addCarForm);
    },
    garagePage: async ({ page }, use) => {
        let garagePage = new GaragePage(page);
        await use(garagePage);
    },
    garagePageAsUser1: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: '.auth/testUser1.json'
        });

        let page = await context.newPage();
        let garagePage = new GaragePage(page);
        await garagePage.navigate();
        await use(garagePage);
        await context.close();
    }


});
export { expect } from '@playwright/test';