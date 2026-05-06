import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesWorkflowPage from "../pageobjects/dashboardTemplatesWorkflow.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Templates Workflow Tests", () => {
    async function signOutAndBackIn() {
        await dashboardPage.logout();
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    }

    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("should run the full Case Templates workflow from the new isolated spec", async () => {
        await dashboardTemplatesWorkflowPage.openCaseTemplatesLanding();

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesWorkflowPage.caseTemplatesCardTitle).toBeDisplayed();

        const infoToggled = await dashboardTemplatesWorkflowPage.openAndCloseCaseTemplatesInfo();
        expect(infoToggled).toBe(true);

        await dashboardTemplatesWorkflowPage.performCopyDeleteSequence();

        const orderedTemplateNames = await dashboardTemplatesWorkflowPage.getOrderedTemplateNamesForFullRun();
        for (let index = 0; index < orderedTemplateNames.length; index += 1) {
            const templateName = orderedTemplateNames[index];
            const count = await dashboardTemplatesWorkflowPage.countTemplatesByExactName(templateName);
            if (count === 0) {
                continue;
            }

            await dashboardTemplatesWorkflowPage.runFullTemplateEditCycle(templateName);

            const isLast = index === orderedTemplateNames.length - 1;
            if (!isLast) {
                await signOutAndBackIn();
            }
        }

        await dashboardTemplatesWorkflowPage.openCaseTemplatesLanding();
        await expect(dashboardTemplatesWorkflowPage.caseTemplatesCardTitle).toBeDisplayed();
    });
});