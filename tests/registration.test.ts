import { test, expect, chromium } from '@playwright/test';

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


test ('successful registration', async () => {

    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    
    await page.goto('https://www.demoblaze.com/index.html');

    //Handling alert notification 
    page.on("dialog", async (alert) => {
        const text = alert.defaultValue();
        console.log(text);

        expect(alert.message()).toBe('Sign up successful.');

        await alert.accept();
    });

    // Click Sign up button.
    await page.getByRole('link', { name: 'Sign up' }).click();
    
    // Expect a registration pop up to show.

    await expect(page.getByText('Sign up × Username: Password:')).toBeVisible();

    // Enter email and password.
    await page.getByLabel('Username:').click();
    await page.getByLabel('Username:').fill(randomEmail);
    await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').fill('$password123$');

    // Register.
    await page.getByRole('button', { name: 'Sign up' }).click();

    // Wait for and capture the request/response
    const response = await page.waitForResponse('https://api.demoblaze.com/signup');

    // Check if the response status is 200
    expect(response.status()).toBe(200);

});


test ('exisiting user registration', async () => {

    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.demoblaze.com/index.html');

    //Handling alert notification
    page.on("dialog", async (alert) => {
        const text = alert.defaultValue();
        console.log(text);

        expect(alert.message()).toBe('This user already exist.');
    
        await alert.accept();
    })

    // Click Sign up button.
    await page.getByRole('link', { name: 'Sign up' }).click();
    
    // Expect a registration pop up to show.
    await expect(page.getByText('Sign up × Username: Password:')).toBeVisible();

    // Enter email and password.
    await page.getByLabel('Username:').click();
    await page.getByLabel('Username:').fill('matejtesting@gmail.com');
    await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').fill('password');

    // Register.
    await page.getByRole('button', { name: 'Sign up' }).click();

    // Wait for and capture the request/response
    const response = await page.waitForResponse('https://api.demoblaze.com/signup');

    // Check if the response status is 200
    expect(response.status()).toBe(200);

});


test ('registration when username is missing', async () => {

    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.demoblaze.com/index.html');

    //Handling alert notification
    page.on("dialog", async (alert) => {
        const text = alert.defaultValue();
        console.log(text);

        expect(alert.message()).toBe('Please fill out Username and Password.');
    
        await alert.accept();
    })

    // Click Sign up button.
    await page.getByRole('link', { name: 'Sign up' }).click();
    
    // Expect a registration pop up to show.
    await expect(page.getByText('Sign up × Username: Password:')).toBeVisible();

    // Enter email and password.
    await page.getByLabel('Password:').click();
    await page.getByLabel('Password:').fill('password');

    // Register.
    await page.getByRole('button', { name: 'Sign up' }).click();

});

test ('registration when password is missing', async () => {

    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.demoblaze.com/index.html');

    //Handling alert notification
    page.on("dialog", async (alert) => {
        const text = alert.defaultValue();
        console.log(text);

        expect(alert.message()).toBe('Please fill out Username and Password.');
    
        await alert.accept();
    })

    // Click Sign up button.
    await page.getByRole('link', { name: 'Sign up' }).click();
    
    // Expect a registration pop up to show.
    await expect(page.getByText('Sign up × Username: Password:')).toBeVisible();

    // Enter email and password.
    await page.getByLabel('Username:').click();
    await page.getByLabel('Username:').fill('noviuser123');

    // Register.
    await page.getByRole('button', { name: 'Sign up' }).click();

});

test ('registration when username and password are missing', async () => {

    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.demoblaze.com/index.html');

    //Handling alert notification
    page.on("dialog", async (alert) => {
        const text = alert.defaultValue();
        console.log(text);

        expect(alert.message()).toBe('Please fill out Username and Password.');
    
        await alert.accept();
    })

    // Click Sign up button.
    await page.getByRole('link', { name: 'Sign up' }).click();
    
    // Expect a registration pop up to show.
    await expect(page.getByText('Sign up × Username: Password:')).toBeVisible();

    // Click on Register button.
    await page.getByRole('button', { name: 'Sign up' }).click();

});

test ('closing registration window', async ({page}) => {

    await page.goto('https://www.demoblaze.com/index.html');

    // Click Sign up button.
    await page.getByRole('link', { name: 'Sign up' }).click();
    
    // Expect a registration pop up to show.
    await expect(page.getByText('Sign up × Username: Password:')).toBeVisible();

    // Close registration pop up.
    await page.getByLabel('Sign up').getByLabel('Close').click();

});