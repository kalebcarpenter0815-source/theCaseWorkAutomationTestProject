import { $, expect } from "@wdio/globals";
import dashboardPage from "./dashboardPage.js";
import dashboardTemplatesWorkflowPage from "./dashboardTemplatesWorkflow.js";

const TEMPLATES_URL = "https://app.thecasework.com/templates";
const CASE_TEMPLATE_NAME = "Obligation Template";
const CASE_TEMPLATE_DESCRIPTION = "Performance Obligation (Deliverables): The Vendor shall deliver the [Insert Project Name] components within [Number] business days of the Effective Date.";
const SHORT_DESCRIPTION_FIELD_NAME = "Description / Action / Proceeding";
const SHORT_DESCRIPTION_DEFAULT_TEXT = "Times New Roman";
const OVERVIEW_TEXT = "This pretend case concerns a disputed commercial contract, alleged missed deliverables, and related copyright and payment obligations that require document review, witness interviews, status tracking, and preparation for a formal resolution timeline.";
const INITIAL_NOTE_TEXT = "In this case for the alleged guilty party, the party is innocent until proven guilty by the court of law.";
const MILESTONE_NAME = "Legal Issues Success";
const MILESTONE_DESCRIPTION = "We have won the case between copywriting and copyright infringement.";
const MILESTONE_DELIVERABLES = "The case pertained to about $1 million dollars. And the total cost for the lawyer and other legal issues you must pay is around $6,345 plus tax for our services. Thank you!";
const MILESTONE_DUE_DAYS = "23";
const MILESTONE_EVENT_NAME = "The day we had won the lawsuit case.";
const MILESTONE_EVENT_DAYS = "31";
const MILESTONE_EVENT_DESCRIPTION = "Another lawsuit case against Schmidt United LLC for copyright infringement and copyright issues, which is a different company client is currently being sued by.";
const MILESTONE_TASK_TEXT = "Mr. Quagmire v. Schmidt United LLC legal issue case";
const TEMPLATE_EVENT_NAME = "Quagmires Legal Issues v. The United States";
const TEMPLATE_EVENT_DAYS = "20";
const TEMPLATE_EVENT_DESCRIPTION = "Need to work on Quagmires new lawsuit";
const CASE_TYPE_SEQUENCE = ["alive going", "AUTOTEST_CaseType", "Samsonite"];
const ENGAGEMENT_TEMPLATE_SEQUENCE = ["custom-Copy", "new copy", "Engagement? To whom?", "Copyright - Retention Agreement", "Standard Billing and Payment Terms"];
const ALLOWED_STATUS_GROUPS = [
    { group: "New", options: ["Retaining"] },
    { group: "Active", options: ["Initial Review", "Discovery", "Initial Report", "Testifying / Depo", "Final Report", "Active Customer"] },
    { group: "Completed", options: ["Completed", "Awaiting Payments"] },
    { group: "Closed", options: ["Closed"] },
    { group: "Removed", options: ["Removed"] },
];

class DashboardTemplatesPage {
    get workflow() {
        return dashboardTemplatesWorkflowPage;
    }

    async smallPause(duration = 1200) {
        await browser.pause(duration);
    }

    async waitForDashboardAndOpenTemplates() {
        await dashboardPage.waitForDashboard();
        await browser.waitUntil(async () => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes("dashboard") || currentUrl === "https://app.thecasework.com/";
        }, {
            timeout: 15000,
            interval: 250,
            timeoutMsg: "Expected to land on the Dashboard page after login.",
        });

        await this.workflow.openCaseTemplatesLanding();
        await this.expectOnCaseTemplatesLanding();
    }

    async expectOnCaseTemplatesLanding() {
        await this.workflow.waitForExactTemplatesUrl();
        await expect(await browser.getUrl()).toBe(TEMPLATES_URL);
        await expect(this.workflow.caseTemplatesCardTitle).toBeDisplayed();
        await expect(this.workflow.newTemplateButton).toBeDisplayed();
    }

    async expectOnAddEditCaseTemplatePage() {
        await expect(this.workflow.addEditCaseTemplateHeader).toBeDisplayed();
        await expect(await browser.getUrl()).toBe(TEMPLATES_URL);
    }

    getInfoButtonNearText(nearbyText, rootElement = null) {
        const selector = `.//*[contains(normalize-space(),${this.workflow.escapeXPathText(nearbyText)})]/ancestor::*[self::div or self::section][1]//button[contains(@class,"InfoButton") or starts-with(@id,"infolabel-") or @aria-label="information"][1] | .//label[contains(normalize-space(),${this.workflow.escapeXPathText(nearbyText)})]/ancestor::*[self::div or self::section][1]//button[contains(@class,"InfoButton") or starts-with(@id,"infolabel-") or @aria-label="information"][1]`;
        return rootElement ? rootElement.$(selector) : $(selector.replace(/\.\//g, "//"));
    }

    async getVisiblePopoverOrTooltip() {
        const popup = $('(//div[@role="tooltip" or @role="dialog" or contains(@class,"Popover") or contains(@class,"Tooltip")][not(@aria-hidden="true")])[last()]');
        await popup.waitForDisplayed({ timeout: 5000 });
        return popup;
    }

    async openInfoNearTextAndExpectContent(nearbyText, rootElement = null) {
        const button = this.getInfoButtonNearText(nearbyText, rootElement);
        await this.workflow.safeClick(button);
        const popup = await this.getVisiblePopoverOrTooltip();
        const popupText = (await popup.getText()).trim();
        await expect(popupText.length > 0).toBe(true);
        await this.smallPause();
        await this.workflow.safeClick(button);
        await browser.waitUntil(async () => !(await popup.isDisplayed().catch(() => false)), {
            timeout: 5000,
            interval: 150,
            timeoutMsg: `Expected the info popup for ${nearbyText} to close.`,
        }).catch(async () => {
            await this.workflow.closeInfoPopoverIfPresent();
        });
    }

    async startNewTemplate() {
        await this.workflow.safeClick(this.workflow.newTemplateButton);
        await this.expectOnAddEditCaseTemplatePage();
    }

    async clearAndTypeVisibleInput(element, text) {
        await this.workflow.clearAndType(element, text);
        await expect(element).toHaveValue(text);
    }

    async fillTemplateHeaderFields() {
        await this.clearAndTypeVisibleInput(this.workflow.templateNameInput, CASE_TEMPLATE_NAME);
        await this.workflow.clearAndType(this.workflow.templateDescriptionInput, CASE_TEMPLATE_DESCRIPTION);
        await expect(this.workflow.templateDescriptionInput).toHaveValue(CASE_TEMPLATE_DESCRIPTION);
    }

    getOptionByText(text) {
        const escapedText = this.workflow.escapeXPathText(text);
        return $(`//*[@role="option" and (normalize-space()=${escapedText} or .//*[normalize-space()=${escapedText}])] | //*[@role="menuitemcheckbox" and (normalize-space()=${escapedText} or .//*[normalize-space()=${escapedText}])] | //*[@role="menuitem" and (normalize-space()=${escapedText} or .//*[normalize-space()=${escapedText}])] | //div[normalize-space()=${escapedText}]`);
    }

    async selectDropdownSequence(triggerElement, optionNames) {
        for (const optionName of optionNames) {
            await this.workflow.safeClick(triggerElement);
            const option = this.getOptionByText(optionName);
            await option.waitForDisplayed({ timeout: 5000 });
            await this.workflow.safeClick(option);
            await this.smallPause(250);
        }
    }

    async selectCaseTypesInOrder() {
        await this.openInfoNearTextAndExpectContent("Case Type");
        await this.selectDropdownSequence(this.workflow.caseTypeDropdown, CASE_TYPE_SEQUENCE);
    }

    getSectionRoot(sectionTitle) {
        const escapedTitle = this.workflow.escapeXPathText(sectionTitle);
        return $(`//*[self::h1 or self::h2 or self::h3 or self::span or self::div][normalize-space()=${escapedTitle}]/ancestor::*[self::section or self::div][1]`);
    }

    getCheckboxByText(text, rootElement = null) {
        const escapedText = this.workflow.escapeXPathText(text);
        const selector = `.//*[@role="checkbox" and (.//*[normalize-space()=${escapedText}] or @aria-label=${escapedText})] | .//label[normalize-space()=${escapedText}]//input[@type="checkbox"] | .//label[.//*[normalize-space()=${escapedText}]]//input[@type="checkbox"] | .//input[@type="checkbox" and (@aria-label=${escapedText} or @name=${escapedText})]`;
        return rootElement ? rootElement.$(selector) : $(selector.replace(/\.\//g, "//"));
    }

    async selectAllowedStatuses() {
        await this.openInfoNearTextAndExpectContent("Allowed Statuses");
        const container = await this.workflow.getAllowedStatusesContainer();
        await expect(container).toBeDisplayed();

        for (const { group, options } of ALLOWED_STATUS_GROUPS) {
            await this.workflow.expandSectionByTextIfPresent(group);
            for (const option of options) {
                const checkbox = this.getCheckboxByText(option, container);
                const exists = await checkbox.isExisting().catch(() => false);
                if (!exists) {
                    await this.workflow.expandAllAllowedStatusGroups();
                }
                await this.workflow.ensureStatusChecked(option);
            }
        }
    }

    async fillDescriptionAndOverviewSection() {
        await this.openInfoNearTextAndExpectContent("Description and Overview");
        await this.openInfoNearTextAndExpectContent("Short Description Field");
        await this.workflow.clearAndType(this.workflow.shortDescriptionFieldNameInput, "");
        await this.workflow.clearAndType(this.workflow.shortDescriptionFieldNameInput, SHORT_DESCRIPTION_FIELD_NAME);
        await expect(this.workflow.shortDescriptionFieldNameInput).toHaveValue(SHORT_DESCRIPTION_FIELD_NAME);
        await this.workflow.clearAndType(this.workflow.shortDescriptionDefaultTextInput, SHORT_DESCRIPTION_DEFAULT_TEXT);
        await expect(this.workflow.shortDescriptionDefaultTextInput).toHaveValue(SHORT_DESCRIPTION_DEFAULT_TEXT);
        await this.openInfoNearTextAndExpectContent("Overview");
        await this.workflow.clearAndType(this.workflow.overviewInput, OVERVIEW_TEXT);
        await expect(this.workflow.overviewInput).toHaveValue(OVERVIEW_TEXT);
        await this.openInfoNearTextAndExpectContent("Initial Note");
        await this.workflow.clearAndType(this.workflow.initialNoteInput, INITIAL_NOTE_TEXT);
        await expect(this.workflow.initialNoteInput).toHaveValue(INITIAL_NOTE_TEXT);
    }

    async fillEngagementTemplateSection() {
        await this.openInfoNearTextAndExpectContent("Engagement Template");
        await this.selectDropdownSequence(this.workflow.engagementTemplateCombobox, ENGAGEMENT_TEMPLATE_SEQUENCE);
    }

    getDialogByTitle(title) {
        const escapedTitle = this.workflow.escapeXPathText(title);
        return $(`(//div[@role="dialog"][.//*[self::h1 or self::h2 or self::h3][normalize-space()=${escapedTitle}] or .//*[normalize-space()=${escapedTitle}]])[last()]`);
    }

    async waitForDialog(title) {
        const dialog = this.getDialogByTitle(title);
        await dialog.waitForDisplayed({ timeout: 8000 });
        return dialog;
    }

    async fillDialogField(dialog, labelText, text) {
        const wrote = await this.workflow.clearAndTypeByLabelFromRootIfPresent(dialog, labelText, text);
        if (!wrote) {
            throw new Error(`Could not find field with label ${labelText} in dialog.`);
        }
    }

    async setCheckboxInDialog(dialog, labelText) {
        const checkbox = this.getCheckboxByText(labelText, dialog);
        await checkbox.waitForExist({ timeout: 5000 });
        await this.workflow.ensureStatusChecked(labelText);
    }

    async clickButtonInRoot(rootElement, buttonText) {
        const clicked = await this.workflow.clickButtonByTextFromRootIfPresent(rootElement, buttonText);
        if (!clicked) {
            throw new Error(`Could not click button ${buttonText}.`);
        }
    }

    async findRowByText(rootElement, rowText) {
        const escapedText = this.workflow.escapeXPathText(rowText);
        const row = await rootElement.$(`.//tr[.//*[normalize-space()=${escapedText} or contains(normalize-space(),${escapedText})]] | .//div[@role="row"][.//*[normalize-space()=${escapedText} or contains(normalize-space(),${escapedText})]]`);
        await row.waitForDisplayed({ timeout: 8000 });
        return row;
    }

    async openRowMenu(rootElement, rowText) {
        const row = await this.findRowByText(rootElement, rowText);
        await this.workflow.jsScrollIntoView(row);
        await row.moveTo();
        const menuButton = await row.$('.//button[last()]');
        await menuButton.waitForDisplayed({ timeout: 5000 });
        await this.workflow.safeClick(menuButton);
    }

    async clickMenuAction(actionText) {
        const escapedText = this.workflow.escapeXPathText(actionText);
        const action = $(`//*[@role="menuitem" and (normalize-space()=${escapedText} or .//*[normalize-space()=${escapedText}])] | //button[normalize-space()=${escapedText} or .//*[normalize-space()=${escapedText}]]`);
        await action.waitForDisplayed({ timeout: 5000 });
        await this.workflow.safeClick(action);
    }

    async answerConfirmRemoval(answer) {
        const dialog = await this.waitForDialog("Confirm Removal");
        await this.clickButtonInRoot(dialog, answer);
        await this.workflow.waitForDialogToClose(dialog);
    }

    async createMilestoneFromTemplatePage() {
        await this.openInfoNearTextAndExpectContent("Milestones");
        await this.workflow.expandSectionByTextIfPresent("Milestones");
        await this.workflow.clickButtonByTextIfPresent("Add Milestone");
        const milestoneDialog = await this.waitForDialog("Create/Edit Milestone");
        await this.fillDialogField(milestoneDialog, "Milestone Name", MILESTONE_NAME);
        await this.fillDialogField(milestoneDialog, "Description", MILESTONE_DESCRIPTION);
        await this.fillDialogField(milestoneDialog, "Due Days from Created", MILESTONE_DUE_DAYS);
        await this.fillDialogField(milestoneDialog, "Deliverables", MILESTONE_DELIVERABLES);
        await this.clickButtonInRoot(milestoneDialog, "Add Event");
        let eventDialog = await this.waitForDialog("Add Event");
        await this.fillDialogField(eventDialog, "Event Name", MILESTONE_EVENT_NAME);
        await this.fillDialogField(eventDialog, "Days from Created", MILESTONE_EVENT_DAYS);
        await this.setCheckboxInDialog(eventDialog, "Is Due Date?");
        await this.fillDialogField(eventDialog, "Description", MILESTONE_EVENT_DESCRIPTION);
        await this.clickButtonInRoot(eventDialog, "Save Event Template");
        await this.workflow.waitForDialogToClose(eventDialog);
        await expect(milestoneDialog).toBeDisplayed();
        await this.clickButtonInRoot(milestoneDialog, "Add Event");
        eventDialog = await this.waitForDialog("Add Event");
        await this.clickButtonInRoot(eventDialog, "Cancel");
        await this.workflow.waitForDialogToClose(eventDialog);
        await expect(milestoneDialog).toBeDisplayed();
        await this.clickButtonInRoot(milestoneDialog, "Add Task");
        let taskDialog = await this.waitForDialog("Add/Edit Task in Milestone");
        await this.workflow.toggleBillableOffThenOnIfPresent(taskDialog);
        await this.fillDialogField(taskDialog, "Task to complete", MILESTONE_TASK_TEXT);
        await this.clickButtonInRoot(taskDialog, "Save");
        await this.workflow.waitForDialogToClose(taskDialog);
        await expect(await this.findRowByText(milestoneDialog, MILESTONE_TASK_TEXT)).toBeDisplayed();
        await this.clickButtonInRoot(milestoneDialog, "Add Task");
        taskDialog = await this.waitForDialog("Add/Edit Task in Milestone");
        await this.clickButtonInRoot(taskDialog, "Close");
        await this.workflow.waitForDialogToClose(taskDialog);
        await expect(milestoneDialog).toBeDisplayed();
        await this.clickButtonInRoot(milestoneDialog, "Submit");
        await this.workflow.waitForDialogToClose(milestoneDialog);
    }

    async handleTemplateEventsSection() {
        await this.openInfoNearTextAndExpectContent("Events");
        const eventsSection = this.getSectionRoot("Events");
        await this.clickButtonInRoot(eventsSection, "Add Event");
        let eventDialog = await this.waitForDialog("Add Event");
        await this.fillDialogField(eventDialog, "Event Name", TEMPLATE_EVENT_NAME);
        await this.fillDialogField(eventDialog, "Days from Created", TEMPLATE_EVENT_DAYS);
        await this.setCheckboxInDialog(eventDialog, "Is Due Date?");
        await this.fillDialogField(eventDialog, "Description", TEMPLATE_EVENT_DESCRIPTION);
        await this.clickButtonInRoot(eventDialog, "Save Event Template");
        await this.workflow.waitForDialogToClose(eventDialog);
        await this.openRowMenu(eventsSection, TEMPLATE_EVENT_NAME);
        await this.clickMenuAction("Edit");
        eventDialog = await this.waitForDialog("Add Event");
        await this.clickButtonInRoot(eventDialog, "Cancel");
        await this.workflow.waitForDialogToClose(eventDialog);
        await this.openRowMenu(eventsSection, TEMPLATE_EVENT_NAME);
        await this.clickMenuAction("Remove");
        await this.answerConfirmRemoval("No");
        await expect(await this.findRowByText(eventsSection, TEMPLATE_EVENT_NAME)).toBeDisplayed();
        await this.openRowMenu(eventsSection, TEMPLATE_EVENT_NAME);
        await this.clickMenuAction("Remove");
        await this.answerConfirmRemoval("Yes");
    }

    async handleTemplateMilestonesSection() {
        const milestonesSection = this.getSectionRoot("Milestones");
        await this.openRowMenu(milestonesSection, MILESTONE_NAME);
        await this.clickMenuAction("Edit");
        let milestoneDialog = await this.waitForDialog("Create/Edit Milestone");
        await this.clickButtonInRoot(milestoneDialog, "Cancel");
        await this.workflow.waitForDialogToClose(milestoneDialog);
        await this.openRowMenu(milestonesSection, MILESTONE_NAME);
        await this.clickMenuAction("Remove");
        await this.answerConfirmRemoval("No");
        await expect(await this.findRowByText(milestonesSection, MILESTONE_NAME)).toBeDisplayed();
        await this.openRowMenu(milestonesSection, MILESTONE_NAME);
        await this.clickMenuAction("Remove");
        await this.answerConfirmRemoval("Yes");
    }

    async saveTemplateAndReturn() {
        await this.workflow.safeClick(this.workflow.saveTemplateButton);
        const confirmation = $('//*[contains(normalize-space(),"saved") or contains(normalize-space(),"Saved") or contains(normalize-space(),"success") or contains(normalize-space(),"Success") or contains(normalize-space(),"confirmed") or contains(normalize-space(),"Confirmed")]');
        await confirmation.waitForDisplayed({ timeout: 8000 }).catch(() => false);
        await this.workflow.safeClick(this.workflow.backToCaseTemplatesButton);
        await this.expectOnCaseTemplatesLanding();
    }

    async verifyUnsavedNewTemplateStartsBlank() {
        await this.workflow.safeClick(this.workflow.newTemplateButton);
        await this.expectOnAddEditCaseTemplatePage();
        const templateNameValue = await this.workflow.templateNameInput.getValue().catch(() => "");
        await expect((templateNameValue || "").trim()).toBe("");
        await this.workflow.clickButtonByTextIfPresent("Cancel");
        await this.expectOnCaseTemplatesLanding();
    }

    async copyRowAndExpectCountIncrease(sourceName, expectedRowName = sourceName) {
        const beforeCount = await this.workflow.countTemplatesByExactName(expectedRowName);
        await this.workflow.copyTemplateAndConfirm(sourceName);
        const afterCount = await this.workflow.countTemplatesByExactName(expectedRowName);
        await expect(afterCount).toBe(beforeCount + 1);
    }

    async runRequestedTemplatesScenario() {
        await this.expectOnCaseTemplatesLanding();
        await this.openInfoNearTextAndExpectContent("Case Templates");
        await this.startNewTemplate();
        await this.fillTemplateHeaderFields();
        await this.selectCaseTypesInOrder();
        await this.selectAllowedStatuses();
        await this.fillDescriptionAndOverviewSection();
        await this.fillEngagementTemplateSection();
        await this.createMilestoneFromTemplatePage();
        await this.handleTemplateEventsSection();
        await this.handleTemplateMilestonesSection();
        await this.saveTemplateAndReturn();
        await this.verifyUnsavedNewTemplateStartsBlank();
        await this.copyRowAndExpectCountIncrease("Pikachu", "Pikachu");
        await this.copyRowAndExpectCountIncrease("You're the Best Around", "You're the Best Around-Copy");
        await this.copyRowAndExpectCountIncrease("Wednesday", "Wednesday-Copy");
    }
}

export default new DashboardTemplatesPage();
