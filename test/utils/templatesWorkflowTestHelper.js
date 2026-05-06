import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesWorkflowPage from "../pageobjects/dashboardTemplatesWorkflow.js";
import loginHelper from "./loginHelper.js";

export const TEMPLATES_URL = "https://app.thecasework.com/templates";
export const PRIORITY_TEMPLATE_NAMES = [
    "Pikachu",
    "You're the Best Around",
    "You're the Best Around-Copy",
];

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

export async function signOutBackInAndOpenCaseTemplates() {
    await dashboardPage.logout();
    await loginAndOpenCaseTemplates();
}

export async function expectTemplateCount(templateName, expectedCount) {
    const count = await dashboardTemplatesWorkflowPage.countTemplatesByExactName(templateName);
    await expect(count).toBe(expectedCount);
}

export async function expectTemplatePresent(templateName) {
    const isPresent = await dashboardTemplatesWorkflowPage.isTemplatePresent(templateName);
    await expect(isPresent).toBe(true);
}

export async function getRemainingTemplateNames(priorityTemplateNames = PRIORITY_TEMPLATE_NAMES) {
    return dashboardTemplatesWorkflowPage.getRemainingTemplateNames(priorityTemplateNames);
}
