// @ts-check
const { test, expect } = require('@playwright/test');

test('my modal', async ({ page }) => {
  await page.goto('https://learnwebcode.com/');

  // await page.getByRole("button", {name: "See Plans"}).nth(1).click()

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", {name: "Choose Your Plan"})).toBeVisible()
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
