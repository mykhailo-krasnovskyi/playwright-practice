import { Locator, Page } from "@playwright/test";

export default class EditCarForm {

    public readonly removeCarButton: Locator;

    constructor(page: Page) {
        this.removeCarButton = page.getByRole('button', { name: 'Remove' });
    }

    async clickRemoveCarButton() {
        await this.removeCarButton.click();
    }
}   

