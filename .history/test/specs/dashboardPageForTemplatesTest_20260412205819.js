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

    const COPY_ROWS_TO_DELETE = [
        "Pikachu-Copy",
        "You're the Best Around-Copy-Copy",
        "You're the Best Around-Copy-Copy-Copy",
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

        // Steps 4-7: Copy Pikachu, then the next row, then the next row.
        await dashboardTemplatesPage.copyTemplateAndConfirm("Pikachu");
        await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around");
        await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around-Copy");

        // Step 8: Delete only the extra copies we created.
        // End state should be exactly:
        // Pikachu, You're the Best Around, You're the Best Around-Copy
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

    it.skip("should run step-9 full Add/Edit flow for all 3 rows", async () => {
        // Step-9 scaffold (kept skipped so working tests stay stable while we build this in chunks):
        // 1) Open Edit on Pikachu.
        // 2) Re-type Template Name + Template Description.
        // 3) Click/dismiss all requested info buttons.
        // 4) Expand New/Active/Completed/Closed/Removed and select all checkboxes.
        // 5) Re-type Field Name.
        // 6) Set Default Text + Overview + Initial Note.
        // 7) Select engagement templates: custom-Copy, new copy, Engagement? To whom?
        // 8) Open Create/Edit Milestone and complete milestone/event/task flow.
        // 9) Save, re-open Edit, then Back to Case Templates.
        // 10) Repeat same steps for You're the Best Around and You're the Best Around-Copy.
    });

    it("should run step-9 chunk 1 for Pikachu basic fields", async () => {
        await openCaseTemplatesCard();

        // Open Edit on Pikachu.
        await dashboardTemplatesPage.openEditFormForTemplate("Pikachu");

        // Clear and retype Template Name + Template Description.
        await dashboardTemplatesPage.clearAndType(dashboardTemplatesPage.templateNameInput, "Pikachu");
        await dashboardTemplatesPage.clearAndType(dashboardTemplatesPage.templateDescriptionInput, "pokemons thingsss");

        // Save and return to Case Templates.
        await dashboardTemplatesPage.saveEditFormAndReturnToTable();

        // Re-open Edit and use Back to Case Templates.
        await dashboardTemplatesPage.openEditFormForTemplate("Pikachu");
        await dashboardTemplatesPage.backFromEditFormToTable();

        // Confirm we are still on Templates table.
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    });
});
