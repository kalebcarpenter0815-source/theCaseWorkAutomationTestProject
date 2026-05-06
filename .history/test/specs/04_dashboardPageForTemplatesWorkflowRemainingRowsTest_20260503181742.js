import dashboardTemplatesWorkflowPage from "../pageobjects/dashboardTemplatesWorkflow.js";
import {
    expectCaseTemplatesLanding,
    expectTemplatePresent,
    getRemainingTemplateNames,
    loginAndOpenCaseTemplates,
    signOutBackInAndOpenCaseTemplates,
} from "../utils/templatesWorkflowTestHelper.js";

describe("Case Templates Workflow Remaining Rows", () => {
    let targets;

    before(async () => {
        await loginAndOpenCaseTemplates();
        targets = await dashboardTemplatesWorkflowPage.ensureBaselineRows();
    });

    it("edits the You're the Best Around row", async () => {
        await expectTemplatePresent(targets.secondaryName);
        await dashboardTemplatesWorkflowPage.runFullTemplateEditCycle(targets.secondaryName);
        await expectTemplatePresent(targets.secondaryName);
        await signOutBackInAndOpenCaseTemplates();
    });

    it("edits the You're the Best Around-Copy row", async () => {
        await expectTemplatePresent(targets.secondaryCopyName);
        await dashboardTemplatesWorkflowPage.runFullTemplateEditCycle(targets.secondaryCopyName);
        await expectTemplatePresent(targets.secondaryCopyName);
        await expectCaseTemplatesLanding();
    });

    it("edits any remaining Case Template rows after the priority rows", async () => {
        const remainingTemplateNames = await getRemainingTemplateNames([
            targets.primaryName,
            targets.secondaryName,
            targets.secondaryCopyName,
        ]);

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
