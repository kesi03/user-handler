import { test, expect } from '@playwright/test';

const HOST = process.env.BODGEIT_HOST || 'localhost';
const PORT = process.env.BODGEIT_PORT || '8090';
const USERNAME = process.env.BODGEIT_USERNAME || 'test@example.com';
const PASSWORD = process.env.BODGEIT_PASSWORD || '123Test!Abcd';

test('User Registration', async ({ page }) => {
    await page.goto(`http://${HOST}:${PORT}/bodgeit/register.jsp`);

    await page.fill('#username', USERNAME);
    await page.fill('#password1', PASSWORD);
    await page.fill('#password2', PASSWORD);
    await page.click('#submit');

    const successMessageLocator = page.locator('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2)');
    const successMessage = await successMessageLocator.innerText();
    expect(successMessage).toContain('You have successfully registered with The BodgeIt Store.');
});

test("Login with new user", async ({ page }) => {
    await page.goto(`http://${HOST}:${PORT}/bodgeit/login.jsp`);

    await page.fill('#username', USERNAME);
    await page.fill('#password', PASSWORD);
    await page.click('#submit');

    const welcomeMessageLocator = page.locator('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2)');
    const welcomeMessage = await welcomeMessageLocator.innerText();
    expect(welcomeMessage).toContain('You have logged in successfully:');
});