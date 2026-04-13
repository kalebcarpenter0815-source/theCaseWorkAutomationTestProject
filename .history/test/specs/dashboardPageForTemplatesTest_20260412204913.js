import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Templates Card Tests", () => {
    const BASE_ROWS = [
        "Pikachu",
        "You're the Best Around",
        "You're the Best Around-Copy",
    ];

    const COPY_ROWS_TO_RESTORE = [
        "Pikachu-Copy",
        "You're the Best Around-Copy",
        "You're the Best Around-Copy-Copy",
    ];

    async function openCaseTemplatesCard() {
        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.ensureCaseTemplatesTabIsOpen();

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
    });

    it("should copy rows and then delete only new copies", async () => {
        await openCaseTemplatesCard();

        // Save baseline counts so we only remove what this test creates.
        const beforeCounts = {};
        for (const rowName of [...BASE_ROWS, ...COPY_ROWS_TO_RESTORE]) {
            beforeCounts[rowName] = await dashboardTemplatesPage.countTemplatesByExactName(rowName);
        }

        // Steps 4-7: Copy Pikachu, then the next row, then the next row.
        await dashboardTemplatesPage.copyTemplateAndConfirm("Pikachu");
        await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around");
        await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around-Copy");

        // Step 8: Delete only created rows by restoring copy rows to their original counts.
        for (const copyRowName of COPY_ROWS_TO_RESTORE) {
            await dashboardTemplatesPage.deleteTemplatesUntilCount(copyRowName, beforeCounts[copyRowName]);
        }

        // Verify we are back on Case Templates and still on /templates.
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();

        // Final check: base rows should still exist and return to their baseline counts.
        for (const baseRowName of BASE_ROWS) {
            const finalCount = await dashboardTemplatesPage.countTemplatesByExactName(baseRowName);
            await expect(finalCount).toBeGreaterThan(0);
            await expect(finalCount).toBe(beforeCounts[baseRowName]);
        }
    });

    it.skip("should run full Add/Edit Case Template form walk-through", async () => {
        // This is intentionally skipped for now.
        // I can add this in the next step with stable selectors for every field and popup.
    });
});
