import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";
import loginHelper from "../utils/loginHelper.js";

const BASE_TEMPLATES = [
    "Pikachu",
    "You're the Best Around",
    "You're the Best Around-Copy",
];

const COPY_NAMES_TO_NORMALIZE = [
    "Pikachu-Copy",
    "You're the Best Around-Copy",
    "You're the Best Around-Copy-Copy",
    "You're the Best Around-Copy-Copy-Copy",
];

const TEMPLATES_TO_EDIT = [
    "Pikachu",
    "You're the Best Around",
    "You're the Best Around-Copy",
];

describe("Dashboard Templates Card Tests", () => {
    async function openCaseTemplatesCard() {
        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.ensureCaseTemplatesTabIsOpen();
        const currentUrl = await browser.getUrl();
        expect(new URL(currentUrl).pathname).toBe("/templates");
    }

    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("should open Templates page, verify url, and land on Case Templates", async () => {
        await openCaseTemplatesCard();
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    });

    it("should copy selected rows and then remove only extra copy rows", async () => {
        await openCaseTemplatesCard();

        // Make sure the three original rows exist before we start copying/deleting.
        for (const baseTemplate of BASE_TEMPLATES) {
            const count = await dashboardTemplatesPage.countTemplatesByExactName(baseTemplate);
            await expect(count).toBeGreaterThan(0);
        }

        const beforeCounts = {};
        for (const copyName of COPY_NAMES_TO_NORMALIZE) {
            beforeCounts[copyName] = await dashboardTemplatesPage.countTemplatesByExactName(copyName);
        }

        for (const baseTemplate of BASE_TEMPLATES) {
            await dashboardTemplatesPage.copyTemplateAndConfirm(baseTemplate);
        }

        for (const copyName of COPY_NAMES_TO_NORMALIZE) {
            const expectedCount = beforeCounts[copyName] || 0;
            await dashboardTemplatesPage.deleteTemplatesUntilCount(copyName, expectedCount);
        }

        const finalPikachu = await dashboardTemplatesPage.countTemplatesByExactName("Pikachu");
        const finalBest = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around");
        const finalCopy = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy");

        await expect(finalPikachu).toBeGreaterThan(0);
        await expect(finalBest).toBeGreaterThan(0);
        await expect(finalCopy).toBeGreaterThan(0);
    });

    it("should run full Add/Edit Case Template form walk-through", async function () {
        this.timeout(600000);

        await openCaseTemplatesCard();

        // Step 1: Edit each existing template row and complete the full form workflow.
        for (const templateName of TEMPLATES_TO_EDIT) {
            await dashboardTemplatesPage.openEditForTemplate(templateName);

            await dashboardTemplatesPage.fillAddEditCaseTemplateFullWorkflow();

            await dashboardTemplatesPage.saveTemplateForm();

            // Re-open once more and use Back to Case Templates as requested.
            await dashboardTemplatesPage.openEditForTemplate(templateName);
            await dashboardTemplatesPage.backToCaseTemplatesFromForm();
        }

        // Step 2: Open New Template and run the same workflow, then go Back (not Save/Cancel).
        await dashboardTemplatesPage.openNewTemplateForm();
        await dashboardTemplatesPage.fillAddEditCaseTemplateFullWorkflow();
        await dashboardTemplatesPage.backToCaseTemplatesFromForm();

        const currentUrl = await browser.getUrl();
        expect(new URL(currentUrl).pathname).toBe("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    });
});
