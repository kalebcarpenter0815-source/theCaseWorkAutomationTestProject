import dashboardTemplatesWorkflowPage from "../pageobjects/dashboardTemplatesWorkflow.js";
import {
    expectCaseTemplatesLanding,
    expectTemplatePresent,
    loginAndOpenCaseTemplates,
    signOutBackInAndOpenCaseTemplates,
} from "../utils/templatesWorkflowTestHelper.js";

describe("Case Templates Workflow Pikachu", () => {
    before(async () => {
        await loginAndOpenCaseTemplates();
        await dashboardTemplatesWorkflowPage.ensureBaselineRows();
    });

    it("edits the Pikachu row and returns to the Case Templates table", async () => {
        await expectTemplatePresent("Pikachu");
        await dashboardTemplatesWorkflowPage.runFullTemplateEditCycle("Pikachu");
        await expectTemplatePresent("Pikachu");
        await expectCaseTemplatesLanding();
    });

    it("signs out and returns to Case Templates after the Pikachu flow", async () => {
        await signOutBackInAndOpenCaseTemplates();
    });
});
