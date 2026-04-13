import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";
import loginHelper from "../utils/loginHelper.js";

// Test data - update this value if the template name changes
const TEMPLATE_TO_VALIDATE = "Pikachu";

describe("Dashboard Templates Card Tests", () => {
    before(async () => {
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
        await expect(templateNames.length).toBeGreaterThan(0);
    });

    it.skip("should open New Template flow (starter skeleton)", async () => {
        // Remove .skip when you are ready to implement this test
        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.openCaseTemplatesTab();
        await dashboardTemplatesPage.clickNewTemplate();

        // TODO: Add expectations here once the modal selectors are ready
    });

    it.skip("should open row menu for a specific template (starter skeleton)", async () => {
        // Remove .skip when you are ready to implement this test
        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.openCaseTemplatesTab();
        await dashboardTemplatesPage.openTemplateRowMenuByName(TEMPLATE_TO_VALIDATE);

        // TODO: Assert that the menu options are displayed
    });
});

// =============================
// HOW TO ORGANIZE YOUR CODE
// =============================
