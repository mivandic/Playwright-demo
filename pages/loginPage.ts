import { Page } from "@playwright/test";

export default class LoginPage {

    constructor(public page: Page) {}

    async enterUsername(username: string) {
        await this.page.getByLabel('Username:')
            .type(username);
    }

    async enterPassword() {
        await this.page.getByLabel('Password:')
            .type("password123$");
    }
}