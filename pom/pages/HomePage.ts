import { Locator } from "@playwright/test";
import BasePage from "../BasePage";
import { step } from "../../utils/stepDecorator";

export default class HomePage extends BasePage {

    private readonly signInButton: Locator = this.page.locator('//button[contains(@class, "header_signin")]');

    @step('Navigate to home page')
    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    @step('Open sign in form')
    async openSignInForm(): Promise<void> {
        await this.signInButton.click();
    }
}