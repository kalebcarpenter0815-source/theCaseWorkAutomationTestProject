import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardEngagementTemplates from "../pageobjects/dashboardEngagementTemplates.js";
import loginHelper from "../utils/loginHelper.js";

async function openEngagementTemplatesPage() {
    await browser.url("https://app.thecasework.com/templates");
    await dashboardEngagementTemplates.clickEngagementTemplatesButton().catch(() => {});
    await dashboardEngagementTemplates.dashboardEngagementTemplatesHeader.waitForDisplayed({ timeout: 20000 });
}

describe("Dashboard Engagement Templates Smoke", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await openEngagementTemplatesPage();
    });

    it("shows engagement templates header", async () => {
        await dashboardEngagementTemplates.verifyDashboardEngagementTemplatesHeader();
        await dashboardEngagementTemplates.verifyEngagementTemplatesHeader();
        expect(await browser.getUrl()).toContain("/templates");
    });

    it("opens engagement templates info modal", async () => {
        await dashboardEngagementTemplates.clickEngagementTemplatesInfoIconButton();
        await dashboardEngagementTemplates.verifyEngagementTemplatesInfoModal();
        await dashboardEngagementTemplates.clickEngagementTemplatesInfoIconButton();
    });
});
