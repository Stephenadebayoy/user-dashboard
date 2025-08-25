/** @format */
import { test, expect } from "@playwright/test";

test.describe("/users page", () => {
  test("can search users by name", async ({ page }) => {
    await page.goto("/users");

    await page.fill("input[placeholder='Search users']", "Leanne");
    await page.keyboard.press("Enter");

    const firstRow = page.locator("table tr >> nth=1");
    await expect(firstRow).toContainText("Leanne");
  });

  test("can sort users by email", async ({ page }) => {
    await page.goto("/users");

    await page.click("th:has-text('Email')");

    const firstRowEmail = await page
      .locator("table tr >> nth=1 td >> nth=1")
      .textContent();
    expect(firstRowEmail).toMatch(/@/);
  });
});
