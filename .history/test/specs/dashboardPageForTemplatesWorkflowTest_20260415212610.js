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

        await dashboardTemplatesWorkflowPage.runFullTemplateEditCycle("Pikachu");
        await signOutAndBackIn();

        const processedNames = new Set(["Pikachu"]);
        const startingRowName = "You're the Best Around";

        for (let safety = 0; safety < 40; safety += 1) {
            await dashboardTemplatesWorkflowPage.openCaseTemplatesLanding();
            const namesNow = await dashboardTemplatesWorkflowPage.getUniqueTemplateNames();

            let namesToProcess = namesNow.filter((name) => !processedNames.has(name));
            const startIndex = namesNow.indexOf(startingRowName);
            if (startIndex >= 0) {
                namesToProcess = namesNow
                    .slice(startIndex)
                    .filter((name) => !processedNames.has(name));
            }

            if (namesToProcess.length === 0) {
                break;
            }

            const templateName = namesToProcess[0];
            await dashboardTemplatesWorkflowPage.runFullTemplateEditCycle(templateName);
            processedNames.add(templateName);

            await dashboardTemplatesWorkflowPage.openCaseTemplatesLanding();
            const refreshedNames = await dashboardTemplatesWorkflowPage.getUniqueTemplateNames();
            let hasMore = refreshedNames.some((name) => !processedNames.has(name));

            const refreshedStartIndex = refreshedNames.indexOf(startingRowName);
            if (refreshedStartIndex >= 0) {
                hasMore = refreshedNames
                    .slice(refreshedStartIndex)
                    .some((name) => !processedNames.has(name));
            }

            if (hasMore) {
                await signOutAndBackIn();
            }
        }

        await dashboardTemplatesWorkflowPage.openCaseTemplatesLanding();
        await expect(dashboardTemplatesWorkflowPage.caseTemplatesCardTitle).toBeDisplayed();
    });
});