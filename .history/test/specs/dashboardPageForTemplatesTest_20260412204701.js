import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";
import loginHelper from "../utils/loginHelper.js";

const BASE_TEMPLATES = [
    "Pikachu",
    "You're the Best Around",
    "You're the Best Around-Copy",
];

describe("Dashboard Templates Card Tests", () => {
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

    it("should copy Pikachu template and return to Case Templates", async () => {
        await openCaseTemplatesCard();

        // Step 4-5: Hover Pikachu row, click Copy, confirm Yes.
        const beforePikachuCopyCount = await dashboardTemplatesPage.countTemplatesByExactName("Pikachu-Copy");
        await dashboardTemplatesPage.copyTemplateAndConfirm("Pikachu");

        // Step 6: Confirm we are back on Case Templates card and still on /templates URL.
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();

        const afterPikachuCopyCount = await dashboardTemplatesPage.countTemplatesByExactName("Pikachu-Copy");
        await expect(afterPikachuCopyCount).toBeGreaterThan(beforePikachuCopyCount);

        // Keep test data clean so this test stays stable on repeat runs.
        await dashboardTemplatesPage.deleteTemplatesUntilCount("Pikachu-Copy", beforePikachuCopyCount);
    });

    it.skip("should run full Add/Edit Case Template form walk-through", async () => {
        // This is intentionally skipped for now.
        // I can add this in the next step with stable selectors for every field and popup.
    });
});
