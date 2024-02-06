import { Page } from "@playwright/test";

export default class HomePage{

    constructor(public page: Page) {

    }
    
    async clickOnPhones() {
        await this.page.getByRole('link', { name: 'Phones' }).click();
    }

    //Kliknuti na specifican item, ili prvi po redu? Mockati?
    async clickOn() {
        await this.page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    }
}