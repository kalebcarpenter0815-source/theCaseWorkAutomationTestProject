import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardEngagementTemplates from "../pageobjects/dashboardEngagementTemplates.js";
import loginHelper from "../utils/loginHelper.js";

async function openEngagementTemplatesPage() {
    await browser.url("https://app.thecasework.com/templates");
    await dashboardEngagementTemplates.clickEngagementTemplatesButton().catch(() => {});
    await dashboardEngagementTemplates.dashboardEngagementTemplatesHeader.waitForDisplayed({ timeout: 20000 });
}

describe("Dashboard Engagement Templates Create Flow", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await openEngagementTemplatesPage();
    });

    it("opens Add/Edit Engagement Template and validates core input fields", async () => {
        await dashboardEngagementTemplates.clickEngagementTemplatesNewTemplateButton();
        await dashboardEngagementTemplates.verifyEngagementTemplatesNewTemplateModal();

        await dashboardEngagementTemplates.enterEngagementTemplatesNewTemplateName("Auto Engagement Template");
        await dashboardEngagementTemplates.verifyEngagementTemplatesNewTemplateNameInputValue("Auto Engagement Template");

        await dashboardEngagementTemplates.enterEngagementTemplatesAddSlashEditEngagementTemplateTemplateDescription("Auto template description");
        await dashboardEngagementTemplates.verifyEngagementTemplatesAddSlashEditEngagementTemplateTemplateDescriptionInputValue("Auto template description");

        await dashboardEngagementTemplates.enterEngagementTemplatesAddSlashEditEngagementTemplateDocumentTitle("Auto document title");
        await dashboardEngagementTemplates.verifyEngagementTemplatesAddSlashEditEngagementTemplateDocumentTitleInputValue("Auto document title");

        await dashboardEngagementTemplates.clickAddSlashEditEngagementTemplateCancelButton();
    });
});
