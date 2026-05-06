import loginHelper from "../utils/loginHelper.js";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";

describe("Dashboard Templates", () => {
    it("runs the requested Case Templates scenario from login through copy actions", async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardTemplatesPage.waitForDashboardAndOpenTemplates();
        await dashboardTemplatesPage.runRequestedTemplatesScenario();
    });
});
