import { Page, expect } from "@playwright/test";

export default class RegisterPage{

    constructor(public page: Page) {

    }
    async handleAlert() {
        this.page.on("dialog", async (alert) => {
            const text = alert.defaultValue();
            console.log(text);
    
            expect(alert.message()).toBe('Sign up successful.');
    
            await alert.accept();
        });
    }

    async clickSignUpBtn() {
        await this.page.getByRole('link', { name: 'Sign up' }).click();
    }

    async checkForSignUpWindow() {
        await expect(this.page.getByText('Sign up × Username: Password:')).toBeVisible();
    }

    async enterUsername(username: string) {
        await this.page.getByLabel('Username:')
            .type(username);
    }

    async enterPassword() {
        await this.page.getByLabel('Password:')
            .type("password123$");
    }

    async clickRegisterBtn() {
        await this.page.getByRole('button', { name: 'Sign up' }).click();
    }

    async checkResponse() {
        // Wait for and capture the request/response
        const response = await this.page.waitForResponse('https://api.demoblaze.com/signup');

        // Check if the response status is 200
        expect(response.status()).toBe(200);
    }
}