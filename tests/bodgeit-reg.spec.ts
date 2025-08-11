import { test, expect } from '@playwright/test';

test('User Registration', async ({ page }) => {
    await page.goto(`http://localhost:8090/bodgeit/register.jsp`);
    await page.fill('#username', 'test@example.com');
    await page.fill('#password1', '123Test!Abcd');
    await page.fill('#password2', '123Test!Abcd');
    await page.click('#submit');

    const successMessageLocator = page.locator('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2)');
    const successMessage = await successMessageLocator.innerText();
    expect(successMessage).toContain('You have successfully registered with The BodgeIt Store.');
});

test("Login with new user", async ({ page }) => {
    await page.goto(`http://localhost:8090/bodgeit/login.jsp`);
    await page.fill('#username', 'test@example.com');
    await page.fill('#password', '123Test!Abcd');
    await page.click('#submit');

    const welcomeMessageLocator = page.locator('body > center > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td:nth-child(2)');
    const welcomeMessage = await welcomeMessageLocator.innerText();
    expect(welcomeMessage).toContain('You have logged in successfully:');
});
