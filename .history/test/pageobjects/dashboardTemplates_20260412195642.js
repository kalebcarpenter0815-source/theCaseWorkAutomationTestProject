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
        return $(`//tr[.//*[normalize-space()="${templateName}"]] | //div[@role="row"][.//*[normalize-space()="${templateName}"]]`);
    }

    // Gets the Copy button (1st icon button that appears when you hover a row)
    getCopyButtonInRow(templateName) {
        return $(`(//div[@role="row"][.//*[normalize-space()="${templateName}"]]//button)[1]`);
    }

    // Gets the Edit button (2nd icon button that appears when you hover a row)
    getEditButtonInRow(templateName) {
        return $(`(//div[@role="row"][.//*[normalize-space()="${templateName}"]]//button)[2]`);
    }

    // Gets the Delete button (3rd icon button that appears when you hover a row)
    getDeleteButtonInRow(templateName) {
        return $(`(//div[@role="row"][.//*[normalize-space()="${templateName}"]]//button)[3]`);
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
        const selector = `//div[@role="row"][.//*[normalize-space()="${templateName}"]]`;
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

    // =============================
    // ADD / EDIT TEMPLATE FORM HELPERS
    // =============================

    get addEditCaseTemplateHeading() {
        return $('//*[self::h1 or self::h2 or self::h3][contains(normalize-space(),"Add/Edit Case Template")]');
    }

    get backToCaseTemplatesButton() {
        return $('//a[normalize-space()="Back to Case Templates"] | //button[normalize-space()="Back to Case Templates"]');
    }

    get saveTemplateButton() {
        return $('//button[normalize-space()="Save"]');
    }

    get cancelTemplateButton() {
        return $('//button[normalize-space()="Cancel"]');
    }

    get addMilestoneButton() {
        return $('//button[contains(normalize-space(),"Add Milestone")]');
    }

    get addEventButtonInMainForm() {
        return $('//button[contains(normalize-space(),"Add Event")]');
    }

    get createEditMilestoneHeading() {
        return $('//*[self::h1 or self::h2 or self::h3][contains(normalize-space(),"Create/Edit Milestone")]');
    }

    get addEventDialogHeading() {
        return $('//*[self::h1 or self::h2 or self::h3][contains(normalize-space(),"Add Event") or contains(normalize-space(),"Edit Event")]');
    }

    get addEditTaskInMilestoneHeading() {
        return $('//*[self::h1 or self::h2 or self::h3][contains(normalize-space(),"Add/Edit Task in Milestone") or contains(normalize-space(),"Add/Edit Task")]');
    }

    async waitForAddEditTemplateForm() {
        await this.addEditCaseTemplateHeading.waitForDisplayed({ timeout: 15000 });
    }

    async clearAndType(element, value) {
        await element.waitForDisplayed({ timeout: 10000 });
        await this.safeClick(element);
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");
        await element.setValue(value);
    }

    async clickOutsideForm() {
        const outsideTarget = await $('//*[contains(normalize-space(),"Add/Edit Case Template")]');
        const isVisible = await outsideTarget.isDisplayed().catch(() => false);
        if (isVisible) {
            await this.safeClick(outsideTarget);
            return;
        }
        await browser.execute(() => document.body.click());
    }

    getFieldByLabel(labelText) {
        const escaped = labelText.replace(/"/g, '\\"');
        return $(`(//*[contains(@class,"fui-Field") or self::div][.//*[normalize-space()="${escaped}"]]//*[self::input or self::textarea])[1] | (//label[normalize-space()="${escaped}"]/following::input[1]) | (//label[normalize-space()="${escaped}"]/following::textarea[1])`);
    }

    getInfoButtonNearText(text) {
        const escaped = text.replace(/"/g, '\\"');
        return $(`(//*[contains(@class,"fui-Field") or self::div][.//*[contains(normalize-space(),"${escaped}")]]//button[@aria-label="information" or @aria-label="Info" or @aria-label="info"])[1] | (//*[contains(normalize-space(),"${escaped}")]//following::button[@aria-label="information" or @aria-label="Info" or @aria-label="info"])[1]`);
    }

    async clickInfoAndDismiss(textNearInfoButton) {
        const infoBtn = this.getInfoButtonNearText(textNearInfoButton);
        const isVisible = await infoBtn.isDisplayed().catch(() => false);
        if (!isVisible) {
            return;
        }
        await this.safeClick(infoBtn);
        await browser.pause(300);
        await this.clickOutsideForm();
    }

    async openStatusSection(statusName) {
        const escaped = statusName.replace(/"/g, '\\"');
        const sectionToggle = await $(`//div[contains(normalize-space(),"Allowed Statuses")]/following::*[(self::button or @role="button" or self::div)[.//*[normalize-space()="${escaped}"] or normalize-space()="${escaped}"]][1] | //button[normalize-space()="${escaped}"]`);
        await this.safeClick(sectionToggle);
    }

    async checkAllVisibleCheckboxes() {
        const checkboxes = await $$('//input[@type="checkbox" and not(@disabled)] | //*[@role="checkbox" and not(@aria-disabled="true")]');
        for (const box of checkboxes) {
            const isDisplayed = await box.isDisplayed().catch(() => false);
            if (!isDisplayed) {
                continue;
            }
            const selected = await box.isSelected().catch(async () => {
                const aria = await box.getAttribute("aria-checked");
                return aria === "true";
            });
            if (!selected) {
                await this.safeClick(box);
            }
        }
    }

    async setSelectTemplateAndChoose(optionText) {
        const escaped = optionText.replace(/"/g, '\\"');
        const combo = await $('//*[contains(normalize-space(),"Select Template")]/following::*[@role="combobox" or self::input][1] | //input[@placeholder="Select Template"]');
        await this.safeClick(combo);
        const option = await $(`//*[@role="option" and (normalize-space()="${escaped}" or .//*[normalize-space()="${escaped}"])] | //li[(normalize-space()="${escaped}" or .//*[normalize-space()="${escaped}"])]`);
        await option.waitForDisplayed({ timeout: 5000 });
        await this.safeClick(option);
    }

    async openEditForTemplate(templateName) {
        await this.clickEditOnRow(templateName);
        await this.waitForAddEditTemplateForm();
    }

    async backToCaseTemplatesFromForm() {
        await this.safeClick(this.backToCaseTemplatesButton);
        await this.ensureCaseTemplatesTabIsOpen();
    }

    async openNewTemplateForm() {
        await this.clickNewTemplate();
        await this.waitForAddEditTemplateForm();
    }

    async saveTemplateForm() {
        await this.safeClick(this.saveTemplateButton);
        await this.ensureCaseTemplatesTabIsOpen();
    }

    async fillCaseTemplateMainFields(data) {
        await this.clearAndType(this.getFieldByLabel("Template Name"), data.templateName);
        await this.clearAndType(this.getFieldByLabel("Template Description"), data.templateDescription);

        await this.clickInfoAndDismiss("Template Description");
        await this.clickInfoAndDismiss("Allowed Statuses");

        const statuses = ["New", "Active", "Completed", "Closed", "Removed"];
        for (const status of statuses) {
            await this.openStatusSection(status);
            await this.checkAllVisibleCheckboxes();
        }

        await this.clickInfoAndDismiss("Description and Overview");
        await this.clickInfoAndDismiss("Short Description Field");
        await this.clearAndType(this.getFieldByLabel("Field Name"), "Description / Action / Proceeding");
        await this.clearAndType(this.getFieldByLabel("Default Text"), "Pikachu has a best friend Charizard.");

        await this.clickInfoAndDismiss("Overview");
        await this.clearAndType(this.getFieldByLabel("Overview"), "Pikachu and his friends had fun today!");

        await this.clickInfoAndDismiss("Initial Note");
        await this.clearAndType(this.getFieldByLabel("Note"), "fsjdsksjsdkfdklsjalskdf912342321331");

        await this.clickInfoAndDismiss("Engagement Template");
        await this.setSelectTemplateAndChoose("custom-Copy");
        await this.setSelectTemplateAndChoose("new copy");
        await this.setSelectTemplateAndChoose("Engagement? To whom?");
    }

    async fillMilestoneAndNestedForms() {
        await this.clickInfoAndDismiss("Milestones");

        await this.safeClick(this.addMilestoneButton);
        await this.createEditMilestoneHeading.waitForDisplayed({ timeout: 10000 });

        await this.clearAndType(this.getFieldByLabel("Milestone Name"), "New Milestone");
        await this.clearAndType(this.getFieldByLabel("Description"), "Who's Deby? YO WIFE!");
        await this.clearAndType(this.getFieldByLabel("Deliverables"), "A present of course!");

        const addEventInMilestone = await $('//button[contains(normalize-space(),"Add Event")]');
        await this.safeClick(addEventInMilestone);
        await this.addEventDialogHeading.waitForDisplayed({ timeout: 10000 });
        await this.clearAndType(this.getFieldByLabel("Event Name"), "Deby's birthday!");
        await this.clearAndType(this.getFieldByLabel("Days from Created"), "12");

        const dueDateCheckbox = await $('//input[@type="checkbox" and (contains(@name,"due") or contains(@id,"due"))] | //*[@role="checkbox" and (contains(@aria-label,"Due") or contains(@name,"Due"))]');
        const dueVisible = await dueDateCheckbox.isDisplayed().catch(() => false);
        if (dueVisible) {
            const checked = await dueDateCheckbox.isSelected().catch(async () => {
                const aria = await dueDateCheckbox.getAttribute("aria-checked");
                return aria === "true";
            });
            if (!checked) {
                await this.safeClick(dueDateCheckbox);
            }
        }

        await this.clearAndType(this.getFieldByLabel("Description"), "This is an IMPORTANT DAY FOR US! ~ Signed, Me");

        const saveEventTemplateBtn = await $('//button[normalize-space()="Save Event Template" or normalize-space()="Save"]');
        await this.safeClick(saveEventTemplateBtn);

        await this.safeClick(addEventInMilestone);
        await this.addEventDialogHeading.waitForDisplayed({ timeout: 10000 });
        const cancelEventButton = await $('//button[normalize-space()="Cancel" or normalize-space()="Close"]');
        await this.safeClick(cancelEventButton);

        const addTaskInMilestone = await $('//button[contains(normalize-space(),"Add Task")]');
        await this.safeClick(addTaskInMilestone);
        await this.addEditTaskInMilestoneHeading.waitForDisplayed({ timeout: 10000 });

        const billableCheckbox = await $('//input[@type="checkbox" and (contains(@name,"billable") or contains(@id,"billable"))] | //*[@role="checkbox" and contains(@aria-label,"Billable")]');
        const billableVisible = await billableCheckbox.isDisplayed().catch(() => false);
        if (billableVisible) {
            await this.safeClick(billableCheckbox);
            await this.safeClick(billableCheckbox);
        }

        await this.clearAndType(this.getFieldByLabel("Task to complete"), "I need to buy a gift for Deby.");
        const saveTaskButton = await $('//button[normalize-space()="Save"]');
        await this.safeClick(saveTaskButton);

        await this.safeClick(addTaskInMilestone);
        await this.addEditTaskInMilestoneHeading.waitForDisplayed({ timeout: 10000 });
        const closeTaskButton = await $('//button[normalize-space()="Close" or normalize-space()="Cancel"]');
        await this.safeClick(closeTaskButton);

        const submitMilestoneButton = await $('//button[normalize-space()="Submit" or normalize-space()="Save"]');
        await this.safeClick(submitMilestoneButton);

        await this.safeClick(this.addMilestoneButton);
        await this.createEditMilestoneHeading.waitForDisplayed({ timeout: 10000 });
        const cancelMilestoneButton = await $('//button[normalize-space()="Cancel"]');
        await this.safeClick(cancelMilestoneButton);
    }

    async fillAddEditCaseTemplateFullWorkflow() {
        await this.fillCaseTemplateMainFields({
            templateName: "Pikachu",
            templateDescription: "pokemons thingsss",
        });
        await this.fillMilestoneAndNestedForms();
        await this.clickInfoAndDismiss("Events");
    }
}

export default new DashboardTemplatesPage();
