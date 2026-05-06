import dashboardTemplatesWorkflowPage from "../pageobjects/dashboardTemplatesWorkflow.js";
import {
    expectCaseTemplatesLanding,
    expectTemplatePresent,
    loginAndOpenCaseTemplates,
    signOutBackInAndOpenCaseTemplates,
} from "../utils/templatesWorkflowTestHelper.js";

describe("Case Templates Workflow Pikachu", () => {
    let targets;

    before(async () => {
        await loginAndOpenCaseTemplates();
        targets = await dashboardTemplatesWorkflowPage.ensureBaselineRows();
    });

    it("edits the Pikachu row and returns to the Case Templates table", async () => {
        await expectTemplatePresent(targets.primaryName);
        await dashboardTemplatesWorkflowPage.runFullTemplateEditCycle(targets.primaryName);
        await expectTemplatePresent(targets.primaryName);
        await expectCaseTemplatesLanding();
    });

    it("signs out and returns to Case Templates after the Pikachu flow", async () => {
        await signOutBackInAndOpenCaseTemplates();
    });
});
