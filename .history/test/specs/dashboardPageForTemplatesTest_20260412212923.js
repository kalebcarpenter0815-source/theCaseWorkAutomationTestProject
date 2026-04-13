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

        // Steps 4-7: Copy Pikachu, then the next row, then the next row.
        await dashboardTemplatesPage.copyTemplateAndConfirm("Pikachu");
        await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around");
        await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around-Copy");

        // Delete only the extra copied rows from this scenario.
        for (const copyRowName of COPY_ROWS_TO_DELETE) {
            await dashboardTemplatesPage.deleteTemplatesUntilCount(copyRowName, 0);
        }

        // Keep exactly one base "You're the Best Around-Copy" row.
        await dashboardTemplatesPage.deleteTemplatesUntilCount("You're the Best Around-Copy", 1);

        // Verify we are back on Case Templates and still on /templates.
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();

        // Final check: base rows should exist exactly once.
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("Pikachu")).toBe(1);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around")).toBe(1);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy")).toBe(1);

        // Final check: extra copy rows should be gone.
        for (const copyRowName of COPY_ROWS_TO_DELETE) {
            const finalCopyCount = await dashboardTemplatesPage.countTemplatesByExactName(copyRowName);
            await expect(finalCopyCount).toBe(0);
        }
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
});
