import { expect } from "@wdio/globals";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";

describe("Dashboard Templates", () => {
    it.skip("placeholder test for templates", async () => {
        await dashboardTemplatesPage.open();
        await expect(true).toBe(true);
    });
});
