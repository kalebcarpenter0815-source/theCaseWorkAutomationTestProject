import dashboardTemplatesWorkflowPage from "../pageobjects/dashboardTemplatesWorkflow.js";
import {
    expectCaseTemplatesLanding,
    expectTemplateCount,
    loginAndOpenCaseTemplates,
} from "../utils/templatesWorkflowTestHelper.js";

describe("Case Templates Workflow Copy And Delete", () => {
    let targets;

    before(async () => {
        await loginAndOpenCaseTemplates();
        targets = await dashboardTemplatesWorkflowPage.ensureBaselineRows();
        await expectCaseTemplatesLanding();
    });

    it("copies the priority rows in the required order", async () => {
        const primaryCopyName = `${targets.primaryName}-Copy`;
        const secondaryNestedCopyName = `${targets.secondaryCopyName}-Copy`;

        await expectTemplateCount(targets.primaryName, 1);
        await expectTemplateCount(targets.secondaryName, 1);
        await expectTemplateCount(targets.secondaryCopyName, 1);

        const primaryCopyBefore = await dashboardTemplatesWorkflowPage.countTemplatesByExactName(primaryCopyName);
        await dashboardTemplatesWorkflowPage.copyTemplateAndConfirm(targets.primaryName);
        await expectTemplateCount(primaryCopyName, primaryCopyBefore + 1);

        const secondaryCopyBefore = await dashboardTemplatesWorkflowPage.countTemplatesByExactName(targets.secondaryCopyName);
        await dashboardTemplatesWorkflowPage.copyTemplateWithDeclineThenConfirm(targets.secondaryName);
        await expectTemplateCount(targets.secondaryCopyName, secondaryCopyBefore + 1);

        const nestedBefore = await dashboardTemplatesWorkflowPage.countTemplatesByExactName(secondaryNestedCopyName);
        await dashboardTemplatesWorkflowPage.copyTemplateAndConfirm(targets.secondaryCopyName);
        await expectTemplateCount(secondaryNestedCopyName, nestedBefore + 1);
        await expectCaseTemplatesLanding();
    });

    it("deletes the created copies and preserves one baseline copy row", async () => {
        const primaryCopyName = `${targets.primaryName}-Copy`;
        const secondaryNestedCopyName = `${targets.secondaryCopyName}-Copy`;

        const keepPrimaryCopyCount = primaryCopyName === targets.secondaryCopyName ? 1 : 0;
        while ((await dashboardTemplatesWorkflowPage.countTemplatesByExactName(primaryCopyName)) > keepPrimaryCopyCount) {
            await dashboardTemplatesWorkflowPage.deleteTemplateWithDeclineThenConfirm(primaryCopyName);
        }
        await expectTemplateCount(primaryCopyName, keepPrimaryCopyCount);

        while ((await dashboardTemplatesWorkflowPage.countTemplatesByExactName(secondaryNestedCopyName)) > 0) {
            await dashboardTemplatesWorkflowPage.deleteTemplateWithDeclineThenConfirm(secondaryNestedCopyName);
        }
        await expectTemplateCount(secondaryNestedCopyName, 0);

        while ((await dashboardTemplatesWorkflowPage.countTemplatesByExactName(targets.secondaryCopyName)) > 1) {
            await dashboardTemplatesWorkflowPage.deleteTemplateWithDeclineThenConfirm(targets.secondaryCopyName);
        }

        await expectTemplateCount(targets.primaryName, 1);
        await expectTemplateCount(targets.secondaryName, 1);
        await expectTemplateCount(targets.secondaryCopyName, 1);
        await expectCaseTemplatesLanding();
    });
});
