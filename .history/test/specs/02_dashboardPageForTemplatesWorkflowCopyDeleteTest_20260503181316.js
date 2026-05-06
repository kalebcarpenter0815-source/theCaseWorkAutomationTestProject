import dashboardTemplatesWorkflowPage from "../pageobjects/dashboardTemplatesWorkflow.js";
import {
    expectCaseTemplatesLanding,
    expectTemplateCount,
    loginAndOpenCaseTemplates,
} from "../utils/templatesWorkflowTestHelper.js";

describe("Case Templates Workflow Copy And Delete", () => {
    before(async () => {
        await loginAndOpenCaseTemplates();
        await dashboardTemplatesWorkflowPage.ensureBaselineRows();
        await expectCaseTemplatesLanding();
    });

    it("copies the priority rows in the required order", async () => {
        await expectTemplateCount("Pikachu", 1);
        await expectTemplateCount("You're the Best Around", 1);
        await expectTemplateCount("You're the Best Around-Copy", 1);

        await dashboardTemplatesWorkflowPage.copyTemplateAndConfirm("Pikachu");
        await expectTemplateCount("Pikachu-Copy", 1);

        await dashboardTemplatesWorkflowPage.copyTemplateWithDeclineThenConfirm("You're the Best Around");
        await expectTemplateCount("You're the Best Around-Copy", 2);

        await dashboardTemplatesWorkflowPage.copyTemplateAndConfirm("You're the Best Around-Copy");
        await expectTemplateCount("You're the Best Around-Copy-Copy", 1);
        await expectCaseTemplatesLanding();
    });

    it("deletes the created copies and preserves one baseline copy row", async () => {
        await dashboardTemplatesWorkflowPage.deleteTemplateWithDeclineThenConfirm("Pikachu-Copy");
        await expectTemplateCount("Pikachu-Copy", 0);

        await dashboardTemplatesWorkflowPage.deleteTemplateWithDeclineThenConfirm("You're the Best Around-Copy-Copy");
        await expectTemplateCount("You're the Best Around-Copy-Copy", 0);

        while ((await dashboardTemplatesWorkflowPage.countTemplatesByExactName("You're the Best Around-Copy")) > 1) {
            await dashboardTemplatesWorkflowPage.deleteTemplateWithDeclineThenConfirm("You're the Best Around-Copy");
        }

        await expectTemplateCount("Pikachu", 1);
        await expectTemplateCount("You're the Best Around", 1);
        await expectTemplateCount("You're the Best Around-Copy", 1);
        await expectCaseTemplatesLanding();
    });
});
