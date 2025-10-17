import { Locator } from "@playwright/test";
import BasePage from "../BasePage";
import { step } from "../../utils/stepDecorator";

export default class GaragePage extends BasePage {

    private readonly addCarButton: Locator = this.page.locator('//button[@class="btn btn-primary"]', { hasText: 'Add car' });
    public readonly pageTitle: Locator = this.page.getByRole('heading', { name: 'Garage' });
    public readonly lastCarName: Locator = this.page.locator('.car_name').first();

    @step('Navigate to garage page')
    async navigate(): Promise<void> {
        await this.page.goto('/panel/garage');
    }

    @step('Open add car form')
    async openAddCarForm(): Promise<void> {
        await this.addCarButton.click();
    }
}