import { test, expect } from '@playwright/test';

// Retrieve environment variables with default values
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8090';
const username = process.env.USERNAME || 'test@example.com';
const password = process.env.LOSENORD || '123Test!Abcd';

test('User Registration', async ({ page }) => {
    await page.goto(`http://${host}:${port}/bodgeit/register.jsp`);

    await page.fill('#username', username);
    await page.fill('#password1', password);
    await page.fill('#password2', password);
    await page.click('#submit');

    const successMessageLocator = page.locator('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2)');
    const successMessage = await successMessageLocator.innerText();
    expect(successMessage).toContain('You have successfully registered with The BodgeIt Store.');
});

test("Login with new user", async ({ page }) => {
    await page.goto(`http://${host}:${port}/bodgeit/login.jsp`);

    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('#submit');

    const welcomeMessageLocator = page.locator('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2)');
    const welcomeMessage = await welcomeMessageLocator.innerText();
    expect(welcomeMessage).toContain('You have logged in successfully:');
});
