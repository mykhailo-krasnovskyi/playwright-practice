import { Locator, Page } from "@playwright/test";

export default class AddCarForm {
    public readonly brandDropdown: Locator;
    public readonly modelDropdown: Locator;
    public readonly mileageField: Locator;
    public readonly addButton: Locator;

    constructor(page: Page) {
        this.brandDropdown = page.getByLabel('Brand');
        this.modelDropdown = page.getByLabel('Model');
        this.mileageField = page.getByLabel('Mileage');
        this.addButton = page.getByRole('button', { name: 'Add' });
    }

    async selectBrand(brand: string) {
        await this.brandDropdown.selectOption(brand);
    }

    async selectModel(model: string) {
        await this.modelDropdown.selectOption(model);
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async addCar(brand: string, model: string, mileage: string) {
        await this.selectBrand(brand);
        await this.selectModel(model);
        await this.enterMileage(mileage);
        await this.clickAddButton();
    }
}