import dashboardTemplatesWorkflowPage from "../pageobjects/dashboardTemplatesWorkflow.js";
import {
    expectCaseTemplatesLanding,
    expectTemplatePresent,
    getRemainingTemplateNames,
    loginAndOpenCaseTemplates,
    signOutBackInAndOpenCaseTemplates,
} from "../utils/templatesWorkflowTestHelper.js";

describe("Case Templates Workflow Remaining Rows", () => {
    before(async () => {
        await loginAndOpenCaseTemplates();
        await dashboardTemplatesWorkflowPage.ensureBaselineRows();
    });

    it("edits the You're the Best Around row", async () => {
        await expectTemplatePresent("You're the Best Around");
        await dashboardTemplatesWorkflowPage.runFullTemplateEditCycle("You're the Best Around");
        await expectTemplatePresent("You're the Best Around");
        await signOutBackInAndOpenCaseTemplates();
    });

    it("edits the You're the Best Around-Copy row", async () => {
        await expectTemplatePresent("You're the Best Around-Copy");
        await dashboardTemplatesWorkflowPage.runFullTemplateEditCycle("You're the Best Around-Copy");
        await expectTemplatePresent("You're the Best Around-Copy");
        await expectCaseTemplatesLanding();
    });

    it("edits any remaining Case Template rows after the priority rows", async () => {
        const remainingTemplateNames = await getRemainingTemplateNames();

        for (let index = 0; index < remainingTemplateNames.length; index += 1) {
            const templateName = remainingTemplateNames[index];

            await expectTemplatePresent(templateName);
            await dashboardTemplatesWorkflowPage.runFullTemplateEditCycle(templateName);
            await expectTemplatePresent(templateName);

            if (index < remainingTemplateNames.length - 1) {
                await signOutBackInAndOpenCaseTemplates();
            }
        }

        await expectCaseTemplatesLanding();
    });
});