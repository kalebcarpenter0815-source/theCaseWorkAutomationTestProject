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

describe("Dashboard Templates Card Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("should open Templates page, verify url, and land on Case Templates", async () => {
        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.ensureCaseTemplatesTabIsOpen();

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    });

    it("should copy selected rows and then remove only extra copy rows", async () => {
        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.ensureCaseTemplatesTabIsOpen();

        // --- DEBUG: verify base template rows are visible before we do anything ---
        for (const name of BASE_TEMPLATES) {
            const count = await dashboardTemplatesPage.countTemplatesByExactName(name);
            console.log(`[DEBUG] count before anything — "${name}": ${count}`);
        }

        const beforeCounts = {};
        for (const copyName of COPY_NAMES_TO_NORMALIZE) {
            beforeCounts[copyName] = await dashboardTemplatesPage.countTemplatesByExactName(copyName);
            console.log(`[DEBUG] beforeCount "${copyName}": ${beforeCounts[copyName]}`);
        }

        console.log("[DEBUG] Starting copy loop...");
        for (const baseTemplate of BASE_TEMPLATES) {
            console.log(`[DEBUG] Copying "${baseTemplate}"...`);
            await dashboardTemplatesPage.copyTemplateAndConfirm(baseTemplate);
            console.log(`[DEBUG] Done copying "${baseTemplate}"`);
        }

        console.log("[DEBUG] Starting delete loop...");
        for (const copyName of COPY_NAMES_TO_NORMALIZE) {
            const expectedCount = beforeCounts[copyName] || 0;
            console.log(`[DEBUG] deleteUntilCount "${copyName}" → target ${expectedCount}`);
            await dashboardTemplatesPage.deleteTemplatesUntilCount(copyName, expectedCount);
        }

        console.log("[DEBUG] Checking final counts...");
        const finalPikachu = await dashboardTemplatesPage.countTemplatesByExactName("Pikachu");
        const finalBest = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around");
        const finalCopy = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy");
        console.log(`[DEBUG] final counts — Pikachu: ${finalPikachu}, Best Around: ${finalBest}, Best Around-Copy: ${finalCopy}`);

        await expect(finalPikachu).toBeGreaterThan(0);
        await expect(finalBest).toBeGreaterThan(0);
        await expect(finalCopy).toBeGreaterThan(0);
    });

    it.skip("should run full Add/Edit Case Template form walk-through", async () => {
        // This is intentionally skipped for now.
        // I can add this in the next step with stable selectors for every field and popup.
    });
});
