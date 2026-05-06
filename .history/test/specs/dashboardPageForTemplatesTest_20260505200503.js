import { expect } from "@wdio/globals";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";

describe("Dashboard Templates", () => {
    it("starts as a fresh template spec", async () => {
        await expect(dashboardTemplatesPage).toBeDefined();
    });
});
