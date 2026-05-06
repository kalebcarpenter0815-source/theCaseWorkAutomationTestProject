import { expect } from "@wdio/globals";
import dashboardTemplatesWorkflowPage from "../pageobjects/dashboardTemplatesWorkflow.js";
import { expectCaseTemplatesLanding, loginAndOpenCaseTemplates } from "../utils/templatesWorkflowTestHelper.js";

describe("Case Templates Workflow Navigation", () => {
    before(async () => {
        await loginAndOpenCaseTemplates();
    });

    it("opens the Case Templates landing page in the exact expected URL", async () => {
        await expectCaseTemplatesLanding();
    });

    it("opens and closes the Case Templates info icon", async () => {
        const infoToggled = await dashboardTemplatesWorkflowPage.openAndCloseCaseTemplatesInfo();

        await expect(infoToggled).toBe(true);
        await expectCaseTemplatesLanding();
    });
});