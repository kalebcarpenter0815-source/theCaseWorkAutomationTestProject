import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesWorkflowPage from "../pageobjects/dashboardTemplatesWorkflow.js";
import loginHelper from "./loginHelper.js";

export const TEMPLATES_URL = "https://app.thecasework.com/templates";

export async function expectCaseTemplatesLanding() {
    await dashboardTemplatesWorkflowPage.waitForExactTemplatesUrl();
    const currentUrl = await browser.getUrl();

    await expect(currentUrl).toBe(TEMPLATES_URL);
    await expect(dashboardTemplatesWorkflowPage.caseTemplatesCardTitle).toBeDisplayed();
    await expect(dashboardTemplatesWorkflowPage.newTemplateButton).toBeDisplayed();
}

export async function loginAndOpenCaseTemplates() {
    await loginHelper.loginAsDefaultUser();
    await dashboardPage.waitForDashboard();
    await dashboardTemplatesWorkflowPage.openCaseTemplatesLanding();
    await expectCaseTemplatesLanding();
}
