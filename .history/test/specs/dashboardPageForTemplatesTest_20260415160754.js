import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Templates Card Tests", () => {
    const COPY_ROWS_TO_DELETE = [
        "Pikachu-Copy",
        "You're the Best Around-Copy-Copy",
    ];

    async function openCaseTemplatesCard() {
        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.ensureCaseTemplatesTabIsOpen();

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    }

    async function ensureTemplateExists(templateName) {
        const count = await dashboardTemplatesPage.countTemplatesByExactName(templateName);
        if (count > 0) {
            return;
        }

        if (templateName === "You're the Best Around-Copy") {
            await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around");
        }
    }

    async function normalizeTemplateBaseline() {
        await openCaseTemplatesCard();

        // Keep core rows deterministic.
        await dashboardTemplatesPage.deleteTemplatesUntilCount("Pikachu", 1);
        await dashboardTemplatesPage.deleteTemplatesUntilCount("You're the Best Around", 1);

        // Ensure exactly one base copy row exists.
        await ensureTemplateExists("You're the Best Around-Copy");
        await dashboardTemplatesPage.deleteTemplatesUntilCount("You're the Best Around-Copy", 1);

        // Clean up any nested copies from prior runs.
        const allNames = await dashboardTemplatesPage.getAllTemplateNames();
        const nestedCopyNames = [...new Set(allNames.filter((name) => (
            name.startsWith("Pikachu-Copy")
            || name.startsWith("You're the Best Around-Copy-Copy")
        )))];

        for (const rowName of nestedCopyNames) {
            await dashboardTemplatesPage.deleteTemplatesUntilCount(rowName, 0);
        }
    }

    async function runAllEditChunksForTemplate(templateName) {
        await openCaseTemplatesCard();
        await ensureTemplateExists(templateName);
        await dashboardTemplatesPage.runFullTemplateEditFlow(templateName);

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    }

    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("should open Templates page, verify url, and land on Case Templates", async () => {
        await openCaseTemplatesCard();

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toBe("https://app.thecasework.com/templates");
    });

    it("should copy rows and then delete only new copies", async () => {
        await normalizeTemplateBaseline();

        // Copy Pikachu → confirm Yes.
        await dashboardTemplatesPage.copyTemplateAndConfirm("Pikachu");

        // Copy "You're the Best Around" → confirm No first, then Yes.
        await dashboardTemplatesPage.copyTemplateWithDeclineThenConfirm("You're the Best Around");

        // Copy "You're the Best Around-Copy" → confirm Yes.
        await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around-Copy");

        // Delete Pikachu-Copy → No first, then Yes.
        await dashboardTemplatesPage.deleteTemplateWithDeclineThenConfirm("Pikachu-Copy");

        // Delete the extra "You're the Best Around-Copy" created above → No first, then Yes.
        const ytbaCopyCount = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy");
        if (ytbaCopyCount > 1) {
            await dashboardTemplatesPage.deleteTemplateWithDeclineThenConfirm("You're the Best Around-Copy");
        }

        // Delete "You're the Best Around-Copy-Copy" → No first, then Yes.
        const ytbaCopyCopyCount = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy-Copy");
        if (ytbaCopyCopyCount > 0) {
            await dashboardTemplatesPage.deleteTemplateWithDeclineThenConfirm("You're the Best Around-Copy-Copy");
        }

        // Verify we are back on Case Templates and still on /templates.
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();

        // Final check: base rows should exist exactly once.
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("Pikachu")).toBe(1);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around")).toBe(1);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy")).toBe(1);
    });

    it("should run full edit workflow for You're the Best Around", async () => {
        await runAllEditChunksForTemplate("You're the Best Around");
    });

    it("should run full edit workflow for You're the Best Around-Copy", async () => {
        await runAllEditChunksForTemplate("You're the Best Around-Copy");
    });

    it("should run full edit workflow for Pikachu and then full New Template flow with Back", async () => {
        await runAllEditChunksForTemplate("Pikachu");

        await openCaseTemplatesCard();
        await dashboardTemplatesPage.runFullTemplateFlowFromNewTemplateThenBack();

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    });

    it("chunked part 1-3 should navigate, copy rows, and delete only created copies", async () => {
        await openCaseTemplatesCard();

        const exactUrl = await browser.getUrl();
        expect(exactUrl).toBe("https://app.thecasework.com/templates");

        await normalizeTemplateBaseline();

        // Copy Pikachu → Yes. Copy "You're the Best Around" → No then Yes. Copy …-Copy → Yes.
        await dashboardTemplatesPage.copyTemplateAndConfirm("Pikachu");
        await dashboardTemplatesPage.copyTemplateWithDeclineThenConfirm("You're the Best Around");
        await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around-Copy");

        await expect(await dashboardTemplatesPage.countTemplatesByExactName("Pikachu-Copy")).toBeGreaterThan(0);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy")).toBeGreaterThan(0);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy-Copy")).toBeGreaterThan(0);

        // Delete Pikachu-Copy → No then Yes.
        await dashboardTemplatesPage.deleteTemplateWithDeclineThenConfirm("Pikachu-Copy");

        // Delete extra "You're the Best Around-Copy" (keep exactly 1) → No then Yes.
        const ytbaCopyCount = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy");
        if (ytbaCopyCount > 1) {
            await dashboardTemplatesPage.deleteTemplateWithDeclineThenConfirm("You're the Best Around-Copy");
        }

        // Delete "You're the Best Around-Copy-Copy" → No then Yes.
        const ytbaCopyCopyCount = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy-Copy");
        if (ytbaCopyCopyCount > 0) {
            await dashboardTemplatesPage.deleteTemplateWithDeclineThenConfirm("You're the Best Around-Copy-Copy");
        }

        await expect(await dashboardTemplatesPage.countTemplatesByExactName("Pikachu")).toBe(1);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around")).toBe(1);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy")).toBe(1);
    });

    it("chunked part 4a should run full Add/Edit workflow for Pikachu", async () => {
        await runAllEditChunksForTemplate("Pikachu");
    });

    it("chunked part 4b should run full Add/Edit workflow for You're the Best Around", async () => {
        await runAllEditChunksForTemplate("You're the Best Around");
    });

    it("chunked part 4c should run full Add/Edit workflow for You're the Best Around-Copy", async () => {
        await runAllEditChunksForTemplate("You're the Best Around-Copy");
    });

    it("chunked part 5 should run New Template full form and finish with Back to Case Templates", async () => {
        await openCaseTemplatesCard();
        await dashboardTemplatesPage.runFullTemplateFlowFromNewTemplateThenBack();

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    });
});
