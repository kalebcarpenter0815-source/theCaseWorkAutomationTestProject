import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";
import loginHelper from "../utils/loginHelper.js";

// Keep test data/constants near the top so they are easy to edit.
const TEMPLATE_TO_VALIDATE = "Pikachu";

describe("Dashboard Templates Card Tests", () => {
    before(async () => {
        // Login setup should stay in before/beforeEach.
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("should open Templates page and display Case Templates card", async () => {
        // Arrange
        await dashboardTemplatesPage.goToTemplatesPage();

        // Act
        await dashboardTemplatesPage.openCaseTemplatesTab();

        // Assert
        await expect(dashboardTemplatesPage.templatesHeader).toBeDisplayed();
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    });

    it("should list at least one template row", async () => {
        // Arrange
        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.openCaseTemplatesTab();

        // Act
        const templateNames = await dashboardTemplatesPage.getAllTemplateNames();

        // Assert
        // This gives you a simple sanity check for table content.
        await expect(templateNames.length).toBeGreaterThan(0);
    });

    it.skip("should open New Template flow (starter skeleton)", async () => {
        // Remove .skip when you are ready to implement this test.
        // Recommended pattern:
        // 1) Navigate to Templates page
        // 2) Click New Template button
        // 3) Verify modal/form appears
        // 4) Fill fields
        // 5) Save
        // 6) Assert new row appears in table

        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.openCaseTemplatesTab();

        // Example button click call from spec -> pageobject method
        await dashboardTemplatesPage.clickNewTemplate();

        // TODO: Add selectors + methods in dashboardTemplates.js for modal fields.
        // TODO: Add expectations for success toast or row presence.
    });

    it.skip("should open row menu for a specific template (starter skeleton)", async () => {
        // Use this for edit/delete/duplicate actions from the kebab menu.
        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.openCaseTemplatesTab();

        // Function example with argument:
        await dashboardTemplatesPage.openTemplateRowMenuByName(TEMPLATE_TO_VALIDATE);

        // TODO: Assert the menu options are displayed (Edit, Duplicate, Delete, etc.).
    });
});

// =============================
// HOW TO ORGANIZE YOUR CODE
// =============================
// 1) Put selectors + reusable UI actions in pageobjects/dashboardTemplates.js.
// 2) Put test scenarios and assertions in specs/dashboardPageForTemplatesTest.js.
// 3) If a step is repeated in multiple tests, move it into a pageobject method.
// 4) Keep each test focused on one behavior.
// 5) Use stable selectors (data-testid) first when possible.
// 6) For waits, prefer waitForDisplayed/waitUntil over long browser.pause calls.
