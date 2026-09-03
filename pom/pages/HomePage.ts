import { Locator, Page } from "@playwright/test";
import { step } from "../../utils/step-decorator";

export default class HomePage {
    public readonly page: Page;
    public readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator('.header_signin');
    }

    async openPage() {
        await this.page.goto('/');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }
}