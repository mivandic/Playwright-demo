import { test, expect } from '@playwright/test';
import RegisterPage from '../../pages/registerPage';

     //function for generating random email address
     function generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    function generateRandomEmail(domain: string = "example.com"): string {
        const localPart = generateRandomString(10); // Generates a random string of 10 characters for the email's local part
        return `${localPart}@${domain}`;
    }

    const randomEmail = generateRandomEmail();


test ('successful registration', async ({ page }) => {

    await page.goto('https://www.demoblaze.com/index.html');

    const register = new RegisterPage(page);
    await register.handleAlert();
    await register.clickSignUpBtn();
    await register.checkForSignUpWindow();
    await register.enterUsername(randomEmail);
    await register.enterPassword();
    await register.clickRegisterBtn();
    await register.checkResponse();

})