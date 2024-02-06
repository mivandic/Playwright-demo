import { test, expect, chromium } from '@playwright/test';

test ('successful login', async () => {

    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.demoblaze.com/index.html');

    // Click login button.
    await page.getByRole('link', { name: 'Log in' }).click();
    
    // Expect a login pop up to show.
    await expect(page.getByText('Log in × Username: Password:')).toBeVisible();

    // Enter email and password.
    await page.locator('#loginusername').click();
    await page.locator('#loginusername').fill('matejtesting@gmail.com');
    await page.locator('#loginpassword').click();
    await page.locator('#loginpassword').fill('password');

    // Login.
    await page.getByRole('button', { name: 'Log in' }).click();

    //Wait until user is logged in (cekat provjeru ili ne?)
    //await page.route('**/api.demoblaze.com/login', route => route.fulfill({
    //status: 200,
    //body: testData,
    // }));

    //Verify that user is logged in
    await expect(page.getByRole('link', { name: 'matejtesting@gmail.com' })).toBeVisible();

});

test ('login with non existing username', async () => {

    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.demoblaze.com/index.html');

    // Click login button.
    await page.getByRole('link', { name: 'Log in' }).click();
    
    // Expect a login pop up to show.
    await expect(page.getByText('Log in × Username: Password:')).toBeVisible();

    // Enter email and password.
    await page.locator('#loginusername').click();
    await page.locator('#loginusername').fill('noneexisting-matej');
    await page.locator('#loginpassword').click();
    await page.locator('#loginpassword').fill('password');

    // Login.
    await page.getByRole('button', { name: 'Log in' }).click();


    //Verify that user is logged in
    await expect(page.getByRole('link', { name: 'matejtesting@gmail.com' })).toBeVisible();

});