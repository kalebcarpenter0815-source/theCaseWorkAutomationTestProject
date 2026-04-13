import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardTemplatesPage extends Page {
    // =============================
    // NAV + PAGE GETTERS
    // =============================

    get templatesNavButton() {
        return $('//*[@data-testid="vert-nav-templates"] | //button[@data-testid="vert-nav-templates"] | //a[@data-testid="vert-nav-templates"] | //span[normalize-space()="Templates"]/ancestor::*[self::a or self::button or @role="button" or self::div][1]');
    }

    get templatesHeader() {
        return $('//*[self::h1 or self::h2 or @role="heading"][normalize-space()="Templates"] | //div[normalize-space()="Templates"]');
    }

    get caseTemplatesTab() {
        return $('//*[@data-testid="templates-tab-case-templates"] | //span[normalize-space()="Case Templates"]/ancestor::*[self::a or self::button or @role="tab" or @role="button" or self::div][1]');
    }

    get caseTemplatesCardTitle() {
        return $('//h2[contains(normalize-space(),"Case Templates")] | //button[.//span[normalize-space()="New Template"] or normalize-space()="New Template"]');
    }

    get newTemplateButton() {
        return $('//button[.//span[normalize-space()="New Template"] or normalize-space()="New Template"]');
    }

    get confirmCopyDialog() {
        return $('//div[@role="dialog" and .//*[contains(normalize-space(),"Confirm Copy")]]');
    }

    get confirmDeleteDialog() {
        return $('//div[@role="dialog" and .//*[contains(normalize-space(),"Confirm Delete")]]');
    }

    get confirmYesButton() {
        return $('//div[@role="dialog"]//button[normalize-space()="Yes" or .//span[normalize-space()="Yes"]]');
    }

    get addEditCaseTemplateHeader() {
        return $('//*[self::h1 or self::h2 or self::h3 or @role="heading"][contains(normalize-space(),"Add/Edit Case Template")] | //*[contains(normalize-space(),"Add/Edit Case Template")]');
    }

    get backToCaseTemplatesButton() {
        return $('//a[normalize-space()="Back to Case Templates"] | //button[normalize-space()="Back to Case Templates"]');
    }

    get saveTemplateButton() {
        return $('//button[normalize-space()="Save"]');
    }

    get templateNameInput() {
        return $('//label[contains(normalize-space(),"Template Name")]/following::input[1]');
    }

    get templateDescriptionInput() {
        return $('//label[contains(normalize-space(),"Template Description")]/following::textarea[1] | //label[contains(normalize-space(),"Template Description")]/following::input[1]');
    }

    get shortDescriptionFieldNameInput() {
        return $('//*[contains(normalize-space(),"Description and Overview")]/ancestor::*[self::div][1]//label[contains(normalize-space(),"Field Name")]/following::input[1]');
    }

    get shortDescriptionDefaultTextInput() {
        return $('//*[contains(normalize-space(),"Description and Overview")]/ancestor::*[self::div][1]//label[contains(normalize-space(),"Default Text")]/following::textarea[1] | //*[contains(normalize-space(),"Description and Overview")]/ancestor::*[self::div][1]//label[contains(normalize-space(),"Default Text")]/following::input[1]');
    }

    get overviewInput() {
        return $('//*[contains(normalize-space(),"Description and Overview")]/ancestor::*[self::div][1]//label[contains(normalize-space(),"Overview")]/following::textarea[1]');
    }

    get initialNoteInput() {
        return $('//*[contains(normalize-space(),"Initial Note")]/ancestor::*[self::div][1]//label[contains(normalize-space(),"Note")]/following::textarea[1] | //*[contains(normalize-space(),"Initial Note")]/ancestor::*[self::div][1]//textarea[1]');
    }

    get engagementTemplateCombobox() {
        return $('//*[contains(normalize-space(),"Engagement Template")]/ancestor::*[self::div][1]//*[@role="combobox" or self::input or self::button][1]');
    }

    get createEditMilestoneSection() {
        return $('//*[contains(normalize-space(),"Create/Edit Milestone")]');
    }

    // =============================
    // REUSABLE HELPER METHODS
    // =============================

    async jsScrollIntoView(element) {
        const resolvedElement = await element;
        await browser.execute((el) => {
            el.scrollIntoView({ block: "center", inline: "center" });
        }, resolvedElement);
    }

    async safeClick(element) {
        const resolvedElement = await element;
        await resolvedElement.waitForDisplayed({ timeout: 10000 });
        await this.jsScrollIntoView(resolvedElement);

        try {
            await resolvedElement.waitForClickable({ timeout: 5000 });
            await resolvedElement.click();
        } catch (error) {
            await browser.execute((el) => el.click(), resolvedElement);
        }
    }

    async clearAndType(element, text) {
        const resolvedElement = await element;
        await resolvedElement.waitForDisplayed({ timeout: 10000 });
        await this.safeClick(resolvedElement);
        await resolvedElement.clearValue();
        await resolvedElement.setValue(text);
    }

    async goToTemplatesPage() {
        await this.safeClick(this.templatesNavButton);
        await browser.waitUntil(async () => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes("/templates");
        }, {
            timeout: 10000,
            timeoutMsg: "Templates page URL did not load",
        });
    }

    async ensureCaseTemplatesTabIsOpen() {
        const currentUrl = await browser.getUrl();
        if (!currentUrl.includes("/templates")) {
            await this.goToTemplatesPage();
        }

        const cardIsVisible = await this.caseTemplatesCardTitle.isDisplayed().catch(() => false);

        if (!cardIsVisible) {
            await this.safeClick(this.caseTemplatesTab);
        }

        await this.newTemplateButton.waitForDisplayed({ timeout: 10000 });
    }

    async clickNewTemplate() {
        await this.safeClick(this.newTemplateButton);
    }

    getTemplateRowByName(templateName) {
        return $(`//tr[.//td[1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]] | //div[@role="row"][.//*[@role="gridcell"][1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]`);
    }

    // Gets the Copy button (1st icon button that appears when you hover a row)
    getCopyButtonInRow(templateName) {
        return $(`(//div[@role="row"][.//*[@role="gridcell"][1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]//button)[1] | (//tr[.//td[1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]//button)[1]`);
    }

    // Gets the Edit button (2nd icon button that appears when you hover a row)
    getEditButtonInRow(templateName) {
        return $(`(//div[@role="row"][.//*[@role="gridcell"][1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]//button)[2] | (//tr[.//td[1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]//button)[2]`);
    }

    // Gets the Delete button (3rd icon button that appears when you hover a row)
    getDeleteButtonInRow(templateName) {
        return $(`(//div[@role="row"][.//*[@role="gridcell"][1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]//button)[3] | (//tr[.//td[1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]//button)[3]`);
    }

    async hoverTemplateRowByName(templateName) {
        const row = this.getTemplateRowByName(templateName);
        await row.waitForDisplayed({ timeout: 10000 });
        await this.jsScrollIntoView(row);
        await row.moveTo();
    }

    async clickCopyOnRow(templateName) {
        await this.hoverTemplateRowByName(templateName);
        const copyBtn = this.getCopyButtonInRow(templateName);
        await copyBtn.waitForDisplayed({ timeout: 5000 });
        await this.safeClick(copyBtn);
    }

    async clickEditOnRow(templateName) {
        await this.hoverTemplateRowByName(templateName);
        const editBtn = this.getEditButtonInRow(templateName);
        await editBtn.waitForDisplayed({ timeout: 5000 });
        await this.safeClick(editBtn);
    }

    async openEditFormForTemplate(templateName) {
        for (let i = 0; i < 3; i += 1) {
            await this.clickEditOnRow(templateName);
            const opened = await browser.waitUntil(async () => {
                const headerVisible = await this.addEditCaseTemplateHeader.isDisplayed().catch(() => false);
                const backVisible = await this.backToCaseTemplatesButton.isDisplayed().catch(() => false);
                return headerVisible || backVisible;
            }, { timeout: 3500, interval: 150 }).catch(() => false);

            if (opened) {
                return;
            }
        }

        throw new Error(`Could not open Edit form for row: ${templateName}`);
    }

    async saveEditFormAndReturnToTable() {
        const saveVisible = await this.saveTemplateButton.isDisplayed().catch(() => false);
        if (saveVisible) {
            await this.safeClick(this.saveTemplateButton);
        }

        const tableOpened = await browser.waitUntil(async () => {
            const newTemplateVisible = await this.newTemplateButton.isDisplayed().catch(() => false);
            return newTemplateVisible;
        }, { timeout: 5000, interval: 150 }).catch(() => false);

        if (!tableOpened) {
            const backVisible = await this.backToCaseTemplatesButton.isDisplayed().catch(() => false);
            if (backVisible) {
                await this.safeClick(this.backToCaseTemplatesButton);
            }
        }

        const currentUrl = await browser.getUrl();
        if (!currentUrl.includes("/templates")) {
            await this.goToTemplatesPage();
        }

        await this.ensureCaseTemplatesTabIsOpen();
    }

    async backFromEditFormToTable() {
        const backVisible = await this.backToCaseTemplatesButton.isDisplayed().catch(() => false);
        if (backVisible) {
            await this.safeClick(this.backToCaseTemplatesButton);
        }
        await this.ensureCaseTemplatesTabIsOpen();
    }

    async clickVisibleInfoButtons(maxClicks = 8) {
        const infoButtons = await $$(
            '//button[contains(@class,"InfoButton") or starts-with(@id,"infolabel-") or @aria-label="information"]'
        );

        let clickCount = 0;
        for (const btn of infoButtons) {
            if (clickCount >= maxClicks) {
                break;
            }

            const isVisible = await btn.isDisplayed().catch(() => false);
            if (!isVisible) {
                continue;
            }

            await this.safeClick(btn);
            clickCount += 1;
        }
    }

    async closeInfoPopoverIfPresent() {
        const closeButton = $('//button[normalize-space()="Close" or @aria-label="Close"]');
        const canCloseWithButton = await closeButton.isDisplayed().catch(() => false);
        if (canCloseWithButton) {
            await this.safeClick(closeButton);
            return;
        }

        const modalBackdrop = $('//div[contains(@class,"MuiBackdrop") and not(contains(@class,"MuiBackdrop-invisible"))]');
        const backdropVisible = await modalBackdrop.isDisplayed().catch(() => false);
        if (backdropVisible) {
            await browser.keys("Escape");
            return;
        }

        await browser.execute(() => {
            document.body.click();
        });
    }

    async clickInfoIconByNearbyTextIfPresent(nearbyText) {
        const icon = $(`//*[contains(normalize-space(),"${nearbyText}")]/ancestor::*[self::div or self::section][1]//button[contains(@class,"InfoButton") or starts-with(@id,"infolabel-") or @aria-label="information"][1] | //label[contains(normalize-space(),"${nearbyText}")]/ancestor::*[self::div or self::section][1]//button[contains(@class,"InfoButton") or starts-with(@id,"infolabel-") or @aria-label="information"][1]`);
        const exists = await icon.isExisting().catch(() => false);
        if (!exists) {
            return false;
        }

        await this.safeClick(icon);
        await this.closeInfoPopoverIfPresent();
        return true;
    }

    async expandSectionByTextIfPresent(sectionText) {
        const sectionButton = $(`//button[normalize-space()="${sectionText}" or .//*[normalize-space()="${sectionText}"]] | //*[@role="button"][normalize-space()="${sectionText}" or .//*[normalize-space()="${sectionText}"]]`);
        const exists = await sectionButton.isExisting().catch(() => false);
        if (!exists) {
            return;
        }

        const expanded = await sectionButton.getAttribute("aria-expanded").catch(() => null);
        if (expanded === "false") {
            await this.safeClick(sectionButton);
        }
    }

    async ensureStatusChecked(statusName) {
        const roleCheckbox = $(`//*[@role="checkbox" and (.//*[normalize-space()="${statusName}"] or @aria-label="${statusName}")]`);
        const roleCheckboxExists = await roleCheckbox.isExisting().catch(() => false);

        if (roleCheckboxExists) {
            const ariaChecked = await roleCheckbox.getAttribute("aria-checked").catch(() => "false");
            if (ariaChecked !== "true") {
                await this.safeClick(roleCheckbox);
            }
            return;
        }

        const nativeCheckbox = $(`//label[normalize-space()="${statusName}"]//input[@type="checkbox"] | //label[.//*[normalize-space()="${statusName}"]]//input[@type="checkbox"] | //input[@type="checkbox" and (@aria-label="${statusName}" or @name="${statusName}")]`);
        const nativeExists = await nativeCheckbox.isExisting().catch(() => false);

        if (!nativeExists) {
            return;
        }

        const selected = await nativeCheckbox.isSelected().catch(() => false);
        if (!selected) {
            await this.safeClick(nativeCheckbox);
        }
    }

    async ensureAllVisibleStatusesCheckedInGroup(statusName) {
        const roleBoxes = await $$(`//*[contains(@aria-label,"${statusName}") or .//*[normalize-space()="${statusName}"]]/ancestor::*[self::div or self::section][1]//*[@role="checkbox"]`);
        for (const checkbox of roleBoxes) {
            const visible = await checkbox.isDisplayed().catch(() => false);
            if (!visible) {
                continue;
            }
            const ariaChecked = await checkbox.getAttribute("aria-checked").catch(() => "false");
            if (ariaChecked !== "true") {
                await this.safeClick(checkbox);
            }
        }

        const nativeBoxes = await $$(`//*[contains(@aria-label,"${statusName}") or .//*[normalize-space()="${statusName}"]]/ancestor::*[self::div or self::section][1]//input[@type="checkbox"]`);
        for (const nativeBox of nativeBoxes) {
            const visible = await nativeBox.isDisplayed().catch(() => false);
            if (!visible) {
                continue;
            }
            const selected = await nativeBox.isSelected().catch(() => false);
            if (!selected) {
                await this.safeClick(nativeBox);
            }
        }
    }

    async completeAllowedStatusesChunk() {
        await this.expandSectionByTextIfPresent("Allowed Statuses");

        const statusGroups = ["New", "Active", "Completed", "Closed", "Removed"];
        for (const statusName of statusGroups) {
            await this.expandSectionByTextIfPresent(statusName);
            await this.ensureStatusChecked(statusName);
            await this.ensureAllVisibleStatusesCheckedInGroup(statusName);
        }
    }

    async selectEngagementTemplateByName(templateName) {
        const combo = this.engagementTemplateCombobox;
        const exists = await combo.isExisting().catch(() => false);
        if (!exists) {
            return;
        }

        await this.safeClick(combo);

        const option = $(`//*[@role="option" and (normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"])] | //div[normalize-space()="${templateName}"]`);
        const optionExists = await option.waitForExist({ timeout: 3000 }).catch(() => false);
        if (optionExists) {
            await this.safeClick(option);
        }
    }

    async selectEngagementTemplateSequence(templateNames) {
        for (const templateName of templateNames) {
            await this.selectEngagementTemplateByName(templateName);
        }
    }

    async clearAndTypeByLabelIfPresent(labelText, text) {
        const input = $(`//label[contains(normalize-space(),"${labelText}")]/following::input[1] | //label[contains(normalize-space(),"${labelText}")]/following::textarea[1]`);
        const exists = await input.isExisting().catch(() => false);
        if (!exists) {
            return false;
        }

        await this.clearAndType(input, text);
        return true;
    }

    async clickButtonByTextIfPresent(buttonText) {
        const button = $(`//button[normalize-space()="${buttonText}" or .//*[normalize-space()="${buttonText}"]]`);
        const exists = await button.isExisting().catch(() => false);
        if (!exists) {
            return false;
        }

        await this.safeClick(button);
        return true;
    }

    async completeMilestoneEventTaskChunk() {
        // Keep this chunk resilient across small UI differences while still exercising the flow.
        await this.expandSectionByTextIfPresent("Create/Edit Milestone");

        await this.clearAndTypeByLabelIfPresent("Milestone Name", "Our Very First New Milestone");
        await this.clearAndTypeByLabelIfPresent("Event Name", "Our Very First New Event");
        await this.clearAndTypeByLabelIfPresent("Task Name", "Our Very First New Task");

        await this.clickButtonByTextIfPresent("Create Milestone");
        await this.clickButtonByTextIfPresent("Create Event");
        await this.clickButtonByTextIfPresent("Create Task");
    }

    get modalDialog() {
        return $('(//div[@role="dialog"])[last()]');
    }

    async clickButtonByTextFromRootIfPresent(rootElement, buttonText) {
        const button = await rootElement.$(`.//button[normalize-space()="${buttonText}" or .//*[normalize-space()="${buttonText}"]]`);
        const exists = await button.isExisting().catch(() => false);
        if (!exists) {
            return false;
        }

        await this.safeClick(button);
        return true;
    }

    async clearAndTypeByLabelFromRootIfPresent(rootElement, labelText, text) {
        const input = await rootElement.$(`.//label[contains(normalize-space(),"${labelText}")]/following::input[1] | .//label[contains(normalize-space(),"${labelText}")]/following::textarea[1]`);
        const exists = await input.isExisting().catch(() => false);
        if (!exists) {
            return false;
        }

        await this.clearAndType(input, text);
        return true;
    }

    async toggleBillableOffThenOnIfPresent(rootElement) {
        const roleSwitch = await rootElement.$('.//*[@role="switch" or @role="checkbox"][contains(@aria-label,"Billable") or contains(@name,"Billable")]');
        const roleSwitchExists = await roleSwitch.isExisting().catch(() => false);
        if (roleSwitchExists) {
            const initialState = await roleSwitch.getAttribute("aria-checked").catch(() => "false");
            await this.safeClick(roleSwitch);
            const afterFirst = await roleSwitch.getAttribute("aria-checked").catch(() => initialState === "true" ? "false" : "true");
            if (afterFirst === initialState) {
                await this.safeClick(roleSwitch);
            }
            await this.safeClick(roleSwitch);
            return;
        }

        const nativeToggle = await rootElement.$('.//input[@type="checkbox" and (contains(@name,"Billable") or contains(@aria-label,"Billable"))]');
        const nativeExists = await nativeToggle.isExisting().catch(() => false);
        if (!nativeExists) {
            return;
        }

        await this.safeClick(nativeToggle);
        await this.safeClick(nativeToggle);
    }

    async waitForDialogToClose(previousDialog) {
        await browser.waitUntil(async () => {
            if (!previousDialog) {
                return true;
            }
            const stillExists = await previousDialog.isExisting().catch(() => false);
            const stillDisplayed = await previousDialog.isDisplayed().catch(() => false);
            return !stillExists || !stillDisplayed;
        }, {
            timeout: 8000,
            interval: 150,
            timeoutMsg: "Expected dialog to close but it stayed visible",
        });
    }

    async openMilestoneDialogIfPresent() {
        await this.expandSectionByTextIfPresent("Milestones");
        await this.expandSectionByTextIfPresent("Create/Edit Milestone");

        const clicked = await this.clickButtonByTextIfPresent("Add Milestone")
            || await this.clickButtonByTextIfPresent("Create Milestone");
        if (!clicked) {
            return false;
        }

        await this.modalDialog.waitForDisplayed({ timeout: 5000 });
        return true;
    }

    async completeMilestoneDialogFlow() {
        const opened = await this.openMilestoneDialogIfPresent();
        if (!opened) {
            return;
        }

        const milestoneDialog = this.modalDialog;
        await this.clearAndTypeByLabelFromRootIfPresent(milestoneDialog, "Milestone Name", "New Milestone");
        await this.clearAndTypeByLabelFromRootIfPresent(milestoneDialog, "Description", "Who's Deby? YO WIFE!");
        await this.clearAndTypeByLabelFromRootIfPresent(milestoneDialog, "Deliverables", "A present of course!");

        await this.clickButtonByTextFromRootIfPresent(milestoneDialog, "Add Event");

        let eventDialog = this.modalDialog;
        await this.clearAndTypeByLabelFromRootIfPresent(eventDialog, "Event Name", "Deby's birthday!");
        await this.clearAndTypeByLabelFromRootIfPresent(eventDialog, "Days from Created", "12");
        await this.ensureStatusChecked("Is Due Date");
        await this.clearAndTypeByLabelFromRootIfPresent(eventDialog, "Description", "This is an IMPORTANT DAY FOR US! ~ Signed Me");
        await this.clickButtonByTextFromRootIfPresent(eventDialog, "Save Event Template");
        await this.waitForDialogToClose(eventDialog);

        eventDialog = this.modalDialog;
        const eventDialogVisible = await eventDialog.isDisplayed().catch(() => false);
        if (!eventDialogVisible) {
            await this.clickButtonByTextFromRootIfPresent(milestoneDialog, "Add Event");
            eventDialog = this.modalDialog;
        }
        await this.clickButtonByTextFromRootIfPresent(eventDialog, "Cancel");
        await this.waitForDialogToClose(eventDialog);

        await this.clickButtonByTextFromRootIfPresent(milestoneDialog, "Add Task");

        let taskDialog = this.modalDialog;
        await this.toggleBillableOffThenOnIfPresent(taskDialog);
        await this.clearAndTypeByLabelFromRootIfPresent(taskDialog, "Task", "I need to buy a gift for Deby.");
        await this.clickButtonByTextFromRootIfPresent(taskDialog, "Save");
        await this.waitForDialogToClose(taskDialog);

        taskDialog = this.modalDialog;
        const taskDialogVisible = await taskDialog.isDisplayed().catch(() => false);
        if (!taskDialogVisible) {
            await this.clickButtonByTextFromRootIfPresent(milestoneDialog, "Add Task");
            taskDialog = this.modalDialog;
        }
        const closedWithClose = await this.clickButtonByTextFromRootIfPresent(taskDialog, "Close");
        if (!closedWithClose) {
            await this.clickButtonByTextFromRootIfPresent(taskDialog, "Cancel");
        }
        await this.waitForDialogToClose(taskDialog);

        await this.clickButtonByTextFromRootIfPresent(milestoneDialog, "Submit");
        await this.waitForDialogToClose(milestoneDialog);

        await this.clickButtonByTextIfPresent("Add Milestone");
        const cancelDialog = this.modalDialog;
        const cancelVisible = await cancelDialog.isDisplayed().catch(() => false);
        if (cancelVisible) {
            const closedByClose = await this.clickButtonByTextFromRootIfPresent(cancelDialog, "Close");
            if (!closedByClose) {
                await this.clickButtonByTextFromRootIfPresent(cancelDialog, "Cancel");
            }
            await this.waitForDialogToClose(cancelDialog);
        }

        await this.clickInfoIconByNearbyTextIfPresent("Add Event");
    }

    async runFullTemplateEditFlow(templateName) {
        await this.openEditFormForTemplate(templateName);

        await this.clearAndType(this.templateNameInput, templateName);
        await this.clearAndType(this.templateDescriptionInput, "pokemons thingsss");
        await this.clickInfoIconByNearbyTextIfPresent("Template Description");

        await this.completeAllowedStatusesChunk();

        await this.clickInfoIconByNearbyTextIfPresent("Description and Overview");
        await this.clickInfoIconByNearbyTextIfPresent("Short Description");
        await this.clearAndType(this.shortDescriptionFieldNameInput, "Description / Action / Proceeding");
        await this.clearAndType(this.shortDescriptionDefaultTextInput, "Pikachu has a best friend Charizard.");

        await this.clickInfoIconByNearbyTextIfPresent("Overview");
        await this.clearAndType(this.overviewInput, "Pikachu and his friends had fun today!");

        await this.clickInfoIconByNearbyTextIfPresent("Initial Note");
        await this.clearAndType(this.initialNoteInput, "fsjdsksjsdkfdklsjalskdf912342321331");

        await this.clickInfoIconByNearbyTextIfPresent("Engagement Template");
        await this.selectEngagementTemplateSequence([
            "custom-Copy",
            "new copy",
            "Engagement? To whom?",
        ]);

        await this.clickInfoIconByNearbyTextIfPresent("Milestones");
        await this.completeMilestoneDialogFlow();

        await this.saveEditFormAndReturnToTable();

        await this.openEditFormForTemplate(templateName);
        await this.backFromEditFormToTable();
    }

    async runFullTemplateFlowFromNewTemplateThenBack() {
        await this.clickNewTemplate();
        await this.addEditCaseTemplateHeader.waitForDisplayed({ timeout: 10000 });

        await this.clearAndType(this.templateNameInput, "Pikachu");
        await this.clearAndType(this.templateDescriptionInput, "pokemons thingsss");
        await this.clickInfoIconByNearbyTextIfPresent("Template Description");

        await this.completeAllowedStatusesChunk();

        await this.clickInfoIconByNearbyTextIfPresent("Description and Overview");
        await this.clickInfoIconByNearbyTextIfPresent("Short Description");
        await this.clearAndType(this.shortDescriptionFieldNameInput, "Description / Action / Proceeding");
        await this.clearAndType(this.shortDescriptionDefaultTextInput, "Pikachu has a best friend Charizard.");

        await this.clickInfoIconByNearbyTextIfPresent("Overview");
        await this.clearAndType(this.overviewInput, "Pikachu and his friends had fun today!");

        await this.clickInfoIconByNearbyTextIfPresent("Initial Note");
        await this.clearAndType(this.initialNoteInput, "fsjdsksjsdkfdklsjalskdf912342321331");

        await this.clickInfoIconByNearbyTextIfPresent("Engagement Template");
        await this.selectEngagementTemplateSequence([
            "custom-Copy",
            "new copy",
            "Engagement? To whom?",
        ]);

        await this.clickInfoIconByNearbyTextIfPresent("Milestones");
        await this.completeMilestoneDialogFlow();

        await this.backFromEditFormToTable();
    }

    async clickDeleteOnRow(templateName) {
        await this.hoverTemplateRowByName(templateName);
        const deleteBtn = this.getDeleteButtonInRow(templateName);
        await deleteBtn.waitForDisplayed({ timeout: 5000 });
        await this.safeClick(deleteBtn);
    }

    async confirmDialogYes() {
        await this.confirmYesButton.waitForDisplayed({ timeout: 10000 });
        await this.safeClick(this.confirmYesButton);
        await browser.waitUntil(async () => {
            const copyDialogVisible = await this.confirmCopyDialog.isDisplayed().catch(() => false);
            const deleteDialogVisible = await this.confirmDeleteDialog.isDisplayed().catch(() => false);
            return !copyDialogVisible && !deleteDialogVisible;
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm dialog did not close after clicking Yes",
        });
    }

    async copyTemplateAndConfirm(templateName) {
        await this.clickCopyOnRow(templateName);
        await this.confirmCopyDialog.waitForDisplayed({ timeout: 10000 });
        await this.confirmDialogYes();
        await this.newTemplateButton.waitForDisplayed({ timeout: 10000 });
    }

    async deleteTemplateAndConfirm(templateName) {
        await this.clickDeleteOnRow(templateName);
        await this.confirmDeleteDialog.waitForDisplayed({ timeout: 10000 });
        await this.confirmDialogYes();
        await this.newTemplateButton.waitForDisplayed({ timeout: 10000 });
    }

    async getAllTemplateNames() {
        const nameCells = await $$('//h2[normalize-space()="Case Templates"]/ancestor::div[1]//tbody/tr/td[1] | //div[@role="row"]/*[1]');
        const names = [];

        for (const cell of nameCells) {
            names.push((await cell.getText()).trim());
        }

        return names.filter((name) => name.length > 0);
    }

    async countTemplatesByExactName(templateName) {
        const selector = `//div[@role="row"][.//*[@role="gridcell"][1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]] | //tr[.//td[1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]`;
        // $$ is a one-shot call that doesn't retry. We use $ + waitForExist first so that
        // we wait for the DOM to finish rendering before counting with $$.
        // If nothing exists within 1.5 seconds, we return 0.
        try {
            await $(selector).waitForExist({ timeout: 1500 });
        } catch {
            return 0;
        }
        const rows = await $$(selector);
        return rows.length;
    }

    async deleteTemplatesUntilCount(templateName, targetCount) {
        for (let i = 0; i < 10; i += 1) {
            const currentCount = await this.countTemplatesByExactName(templateName);
            if (currentCount <= targetCount) {
                break;
            }

            await this.deleteTemplateAndConfirm(templateName);
        }
    }
}

export default new DashboardTemplatesPage();
