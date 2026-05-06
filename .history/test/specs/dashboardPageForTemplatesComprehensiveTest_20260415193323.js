import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";
import dashboardTemplatesComprehensivePage from "../pageobjects/dashboardTemplatesComprehensive.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Templates Comprehensive Case Templates Tests", () => {
    async function signOutAndBackIn() {
        await dashboardPage.logout();
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    }

    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("should run comprehensive Case Templates component flow", async () => {
        await dashboardTemplatesComprehensivePage.openCaseTemplatesLanding();

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");

        // Top-card info icon behavior.
        await dashboardTemplatesComprehensivePage.openAndCloseCaseTemplatesInfo();

        // Copy/Delete section with Yes and No-then-Yes flows.
        await dashboardTemplatesComprehensivePage.performCopyDeleteSequence();

        // Run full edit flow for Pikachu first.
        await dashboardTemplatesComprehensivePage.runFullEditFlowForTemplate("Pikachu");

        // Sign out and sign back in before running the tail list.
        await signOutAndBackIn();

        // Continue from You're the Best Around through the last available row.
        const tailNames = await dashboardTemplatesComprehensivePage.getTailTemplateNamesFrom("You're the Best Around");
        for (const templateName of tailNames) {
            const count = await dashboardTemplatesPage.countTemplatesByExactName(templateName);
            if (count === 0) {
                continue;
            }

            await dashboardTemplatesComprehensivePage.runFullEditFlowForTemplate(templateName);

            const isLast = templateName === tailNames[tailNames.length - 1];
            if (!isLast) {
                await signOutAndBackIn();
            }
        }

        await dashboardTemplatesComprehensivePage.openCaseTemplatesLanding();
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    });
});
