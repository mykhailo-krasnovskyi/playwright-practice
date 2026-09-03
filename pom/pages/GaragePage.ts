import { Locator, Page } from "@playwright/test";

export default class GaragePage {
    public readonly pageHeader: Locator;
    public readonly successLoginMessage: Locator;
    public readonly addCarButton: Locator;
    public readonly lastAddedCarCard: Locator;
    public readonly lastAddedCarName: Locator;
    public readonly lastAddedCarMileage: Locator;
    public readonly editLastAddedCarButton: Locator;
    public readonly approveRemovingCarButton: Locator;

    constructor(page: Page) {
        this.pageHeader = page.locator('h1', { hasText: 'Garage' });
        this.successLoginMessage = page.getByText('You have been successfully logged in');
        this.addCarButton = page.getByRole('button', { name: 'Add car' });
        this.lastAddedCarCard = page.locator('.car-item').first();
        this.lastAddedCarName = this.lastAddedCarCard.locator('.car_name');
        this.lastAddedCarMileage = this.lastAddedCarCard.locator('[name=miles]');
        this.editLastAddedCarButton = this.lastAddedCarCard.locator('.icon-edit');
        this.approveRemovingCarButton = page.getByRole('button', { name: 'Remove' });
    }

    async openAddCarForm() {
        await this.addCarButton.click();
    }

    async openEditLastAddedCarForm() {
        await this.editLastAddedCarButton.click();
    }

    async approveRemovingCar() {
        await this.approveRemovingCarButton.click();
    }
}