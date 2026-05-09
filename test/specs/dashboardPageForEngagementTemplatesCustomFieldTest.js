import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardEngagementTemplates from "../pageobjects/dashboardEngagementTemplates.js";
import loginHelper from "../utils/loginHelper.js";

async function openEngagementTemplatesPage() {
    await browser.url("https://app.thecasework.com/templates");
    await dashboardEngagementTemplates.clickEngagementTemplatesButton().catch(() => {});
    await dashboardEngagementTemplates.dashboardEngagementTemplatesHeader.waitForDisplayed({ timeout: 20000 });
}

async function openAddFieldMenu() {
    const trigger = await $("//button[@data-testid='add-engagement-field-dropdown-trigger'] | //button[@data-testid='add-engagement-field-dropdown-button']");
    await trigger.waitForDisplayed({ timeout: 15000 });
    await trigger.waitForClickable({ timeout: 15000 });
    await trigger.click();
}

describe("Dashboard Engagement Templates Custom Field", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await openEngagementTemplatesPage();
    });

    it("adds custom field and shows the created field tab", async () => {
        await dashboardEngagementTemplates.clickEngagementTemplatesNewTemplateButton();
        await dashboardEngagementTemplates.verifyEngagementTemplatesNewTemplateModal();

        await dashboardEngagementTemplates.enterEngagementTemplatesNewTemplateName(`Auto ET ${Date.now()}`);
        await dashboardEngagementTemplates.enterEngagementTemplatesAddSlashEditEngagementTemplateTemplateDescription("Auto engagement template description");
        await dashboardEngagementTemplates.enterEngagementTemplatesAddSlashEditEngagementTemplateDocumentTitle("Auto engagement document title");

        await openAddFieldMenu();
        await dashboardEngagementTemplates.clickCustomFieldButton();
        await dashboardEngagementTemplates.enterAddCustomFieldTextbox("Custom Field Auto");

        await dashboardEngagementTemplates.clickAddSlashEditEngagementTemplateCancelButton();
    });
});
