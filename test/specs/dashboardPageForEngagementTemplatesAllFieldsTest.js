import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardEngagementTemplates from "../pageobjects/dashboardEngagementTemplates.js";
import loginHelper from "../utils/loginHelper.js";

const FIELD_DATA = [
    {
        optionSuffix: "objectives",
        fieldLabel: "Objectives",
        value: "Define case goals, target outcomes, and timeline checkpoints for the engagement.",
    },
    {
        optionSuffix: "client-responsibilities",
        fieldLabel: "Client Responsibilities",
        value: "Provide requested documents on time, respond to attorney questions, and attend scheduled meetings.",
    },
    {
        optionSuffix: "services-provided",
        fieldLabel: "Services Provided",
        value: "Legal consultation, document drafting, filing support, and representation strategy guidance.",
    },
    {
        optionSuffix: "case-deliverables",
        fieldLabel: "Case Deliverables",
        value: "Prepared pleadings, case summary packet, hearing checklist, and status update reports.",
    },
    {
        optionSuffix: "milestones",
        fieldLabel: "Milestones",
        value: "Intake complete, discovery review complete, pre-hearing prep complete, final review complete.",
    },
    {
        optionSuffix: "assumptions",
        fieldLabel: "Assumptions",
        value: "All relevant records are accurate and available, and key witnesses remain reachable.",
    },
    {
        optionSuffix: "exclusions",
        fieldLabel: "Exclusions",
        value: "Appeals, unrelated legal matters, and expert witness costs are excluded from scope.",
    },
    {
        optionSuffix: "dependencies",
        fieldLabel: "Dependencies",
        value: "Court scheduling, client document turnaround, and third-party record delivery timelines.",
    },
    {
        optionSuffix: "acceptance-criteria",
        fieldLabel: "Acceptance Criteria",
        value: "All required documents filed, milestones met, and client confirms deliverables are complete.",
    },
    {
        optionSuffix: "billing-terms",
        fieldLabel: "Billing Terms",
        value: "Invoices issued bi-weekly and payable within 15 days from invoice date.",
    },
    {
        optionSuffix: "payment-terms",
        fieldLabel: "Payment Terms",
        value: "Initial retainer due at signing; remaining balance due upon milestone completion.",
    },
];

async function openEngagementTemplatesPage() {
    await browser.url("https://app.thecasework.com/templates");
    await dashboardEngagementTemplates.clickEngagementTemplatesButton().catch(() => {});
    await dashboardEngagementTemplates.dashboardEngagementTemplatesHeader.waitForDisplayed({ timeout: 20000 });
}

async function openAddFieldMenuRobustly() {
    const trigger = await $("//button[@data-testid='add-engagement-field-dropdown-trigger'] | //button[@data-testid='add-engagement-field-dropdown-button']");
    await trigger.waitForDisplayed({ timeout: 15000 });
    await trigger.waitForClickable({ timeout: 15000 });
    const expandedBefore = await trigger.getAttribute("aria-expanded").catch(() => null);
    if (expandedBefore !== "true") {
        await trigger.click();
    }

    await browser.waitUntil(async () => {
        const menuItems = await $$("//div[contains(@data-testid,'add-engagement-field-dropdown-item-') or @data-testid='add-engagement-field-dropdown-custom-item']");
        if (menuItems.length === 0) {
            return false;
        }

        for (const item of menuItems) {
            if (await item.isDisplayed().catch(() => false)) {
                return true;
            }
        }

        return false;
    }, {
        timeout: 10000,
        timeoutMsg: "Add Field menu did not open",
    });
}

async function addObjectivesRobustly() {
    const objectivesField = FIELD_DATA.find((value) => value.optionSuffix === "objectives");
    await addFieldAndEnterTextRobustly(objectivesField.optionSuffix, objectivesField.fieldLabel, objectivesField.value);
}

async function addFieldAndEnterTextRobustly(optionSuffix, fieldLabel, value) {
    await openAddFieldMenuRobustly();

    const option = await $(`//div[@data-testid='add-engagement-field-dropdown-item-${optionSuffix}']`);
    await option.waitForDisplayed({ timeout: 15000 });
    await option.waitForClickable({ timeout: 15000 });
    await option.click();

    const escapedLabel = fieldLabel.replace(/"/g, '\\"');

    const removeButton = await $(`//button[@data-testid='edit-engagement-template-remove-button-${escapedLabel}']`);
    const fieldTab = await $(`//button[contains(@data-testid,'edit-engagement-template-field-tab-') and contains(normalize-space(.), '${escapedLabel}')] | //button[contains(normalize-space(.), '${escapedLabel}')]`);

    await browser.waitUntil(async () => {
        const removeExists = await removeButton.isExisting().catch(() => false);
        const tabExists = await fieldTab.isExisting().catch(() => false);
        return removeExists || tabExists;
    }, {
        timeout: 15000,
        timeoutMsg: `Field was not added for ${fieldLabel}`,
    });

    if (await fieldTab.isExisting().catch(() => false)) {
        await fieldTab.click().catch(() => {});
    }

    const textareas = await $$("//textarea[contains(@data-testid,'edit-engagement-template-field-textarea-') or contains(@data-testid,'edit-engagement-template-textarea-')]");
    let textbox = null;
    for (const candidate of textareas) {
        if (await candidate.isDisplayed().catch(() => false)) {
            textbox = candidate;
            break;
        }
    }

    if (!textbox) {
        throw new Error(`No visible engagement field textarea found for ${fieldLabel}`);
    }

    await textbox.click();
    await browser.keys(["Control", "a"]);
    await browser.keys("Backspace");
    await textbox.setValue(value);
    await expect(textbox).toHaveValue(value);
}

describe("Dashboard Engagement Templates New Template All Fields", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await openEngagementTemplatesPage();
    });

    it("opens New Template and fills all standard engagement fields", async () => {
        await dashboardEngagementTemplates.clickEngagementTemplatesNewTemplateButton();
        await dashboardEngagementTemplates.verifyEngagementTemplatesNewTemplateModal();

        await dashboardEngagementTemplates.enterEngagementTemplatesNewTemplateName(`Auto ET ${Date.now()}`);
        await dashboardEngagementTemplates.enterEngagementTemplatesAddSlashEditEngagementTemplateTemplateDescription("Auto engagement template description");
        await dashboardEngagementTemplates.enterEngagementTemplatesAddSlashEditEngagementTemplateDocumentTitle("Auto engagement document title");

        await openAddFieldMenuRobustly();
        await dashboardEngagementTemplates.clickCustomFieldButton();
        await dashboardEngagementTemplates.enterAddCustomFieldTextbox("Custom Field Auto");

        await addObjectivesRobustly();

        for (const field of FIELD_DATA.filter((value) => value.optionSuffix !== "objectives")) {
            await addFieldAndEnterTextRobustly(field.optionSuffix, field.fieldLabel, field.value);
        }

        await dashboardEngagementTemplates.clickAddSlashEditEngagementTemplateCancelButton();
    });
});
