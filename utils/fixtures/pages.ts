import { test as base, Page } from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import GaragePage from '../../pom/pages/GaragePage';
import AddCarForm from '../../pom/forms/AddCarForm';
import EditCarForm from '../../pom/forms/EditCarForm';

type Pages = {
    homePage: HomePage,
    signInForm: SignInForm,
    garagePage: GaragePage,
    addCarForm: AddCarForm,
    editCarForm: EditCarForm,
    openAddCarFormAndRemoveAddedCar: AddCarForm,
};

export const test = base.extend<Pages>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    signInForm: async ({ page }, use) => {
        const signInForm = new SignInForm(page);
        await use(signInForm);
    },
    garagePage: async ({ page }, use) => {
        const garagePage = new GaragePage(page);
        await use(garagePage);
    },
    addCarForm: async ({ page }, use) => {
        const addCarForm = new AddCarForm(page);
        await use(addCarForm);
    },
    editCarForm: async ({ page }, use) => {
        const editCarForm = new EditCarForm(page);
        await use(editCarForm);
    },
    openAddCarFormAndRemoveAddedCar: async ({ homePage, garagePage, addCarForm, editCarForm }, use) => {
        await homePage.openPage();
        await garagePage.openAddCarForm();
        await use(addCarForm);
        await garagePage.openEditLastAddedCarForm();
        await editCarForm.clickRemoveCarButton();
        await garagePage.approveRemovingCar();
    }
});