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

const TEMPLATE_EDIT_DATA = {
    "Pikachu": {
        templateName: "Pikachu",
        templateDescription: "pokemon thingsss",
        fieldNameText: "Description / Action / Proceeding",
        defaultText: "Pikachu has a best friend Charizard.",
        overviewText: "Pikachu and his friends had fun today!",
        initialNoteText: "fsjdsksjsdkfdklsjalskdf912342321331",
    },
    "You're the Best Around": {
        templateName: "You're the Best Around",
        templateDescription: "Nothing's gonna ever keep you down.",
        fieldNameText: "Description / Action / Proceeding",
        defaultText: "Best Around keeps training every day.",
        overviewText: "Today was a strong day for the whole team.",
        initialNoteText: "note-best-around-9988776655",
    },
    "You're the Best Around-Copy": {
        templateName: "You're the Best Around-Copy",
        templateDescription: "Nothing's gonna ever keep you down. Copy version.",
        fieldNameText: "Description / Action / Proceeding",
        defaultText: "Copy template still follows the same process.",
        overviewText: "This copy is tested with different content.",
        initialNoteText: "note-best-around-copy-4433221100",
    },
};

const NEW_TEMPLATE_DATA = {
    templateName: "New Template Flow",
    templateDescription: "Created from New Template flow.",
    fieldNameText: "Description / Action / Proceeding",
    defaultText: "New template default text for testing.",
    overviewText: "New template overview for workflow check.",
    initialNoteText: "new-template-initial-note-12345",
};

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

        // Baseline guard: if the "You're the Best Around-Copy" row was missing from prior runs,
        // recreate it once from "You're the Best Around" before running this test.
        const aroundCopyCount = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy");
        if (aroundCopyCount === 0) {
            await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around");
        }

        // Make sure required base rows exist before copy/delete actions.
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("Pikachu")).toBeGreaterThan(0);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around")).toBeGreaterThan(0);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy")).toBeGreaterThan(0);

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

            await dashboardTemplatesPage.fillAddEditCaseTemplateFullWorkflow(TEMPLATE_EDIT_DATA[templateName]);

            await dashboardTemplatesPage.saveTemplateForm();

            // Re-open once more and use Back to Case Templates as requested.
            await dashboardTemplatesPage.openEditForTemplate(templateName);
            await dashboardTemplatesPage.backToCaseTemplatesFromForm();
        }

        // Step 2: Open New Template and run the same workflow, then go Back (not Save/Cancel).
        await dashboardTemplatesPage.openNewTemplateForm();
        await dashboardTemplatesPage.fillAddEditCaseTemplateFullWorkflow(NEW_TEMPLATE_DATA);
        await dashboardTemplatesPage.backToCaseTemplatesFromForm();

        const currentUrl = await browser.getUrl();
        expect(new URL(currentUrl).pathname).toBe("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    });
});
