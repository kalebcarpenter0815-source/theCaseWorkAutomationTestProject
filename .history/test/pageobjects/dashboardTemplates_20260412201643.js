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
        return $('//*[self::h1 or self::h2 or self::h3 or @role="heading"][contains(normalize-space(),"Add/Edit Case Template")] | //*[contains(normalize-space(),"Add/Edit Case Template")]');
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
        await browser.waitUntil(async () => {
            const headingVisible = await this.addEditCaseTemplateHeading.isDisplayed().catch(() => false);
            const backVisible = await this.backToCaseTemplatesButton.isDisplayed().catch(() => false);
            return headingVisible || backVisible;
        }, {
            timeout: 15000,
            timeoutMsg: "Add/Edit Case Template form did not appear",
        });
    }

    getTemplateRowMenuButtonByName(templateName) {
        return $(`(//div[@role="row"][.//*[normalize-space()="${templateName}"]]//button)[last()] | (//tr[.//*[normalize-space()="${templateName}"]]//button)[last()]`);
    }

    getContextMenuItem(itemText) {
        const escaped = itemText.replace(/"/g, '\\"');
        return $(`//*[@role="menuitem" and (normalize-space()="${escaped}" or .//*[normalize-space()="${escaped}"])] | //button[normalize-space()="${escaped}"] | //span[normalize-space()="${escaped}"]/ancestor::*[self::button or @role="menuitem"][1]`);
    }

    async openTemplateRowMenuByName(templateName) {
        await this.hoverTemplateRowByName(templateName);
        await this.safeClick(this.getTemplateRowMenuButtonByName(templateName));
    }

    async clearAndType(element, value) {
        await element.waitForDisplayed({ timeout: 10000 });
        await this.safeClick(element);
        await element.clearValue();
        await element.setValue(value);
    }

    get templateNameInput() {
        return $('//label[contains(normalize-space(),"Template Name")]/following::input[1]');
    }

    get templateDescriptionInput() {
        return $('//label[contains(normalize-space(),"Template Description")]/following::input[1] | //label[contains(normalize-space(),"Template Description")]/following::textarea[1]');
    }

    get fieldNameInput() {
        return $('//label[contains(normalize-space(),"Field Name")]/following::input[1]');
    }

    get defaultTextInput() {
        return $('//label[contains(normalize-space(),"Default Text")]/following::input[1] | //label[contains(normalize-space(),"Default Text")]/following::textarea[1]');
    }

    get overviewTextarea() {
        return $('//label[contains(normalize-space(),"Overview")]/following::textarea[1]');
    }

    get initialNoteTextarea() {
        return $('//*[contains(normalize-space(),"Initial Note")]/following::textarea[1]');
    }

    get engagementTemplateCombobox() {
        return $('//*[contains(normalize-space(),"Engagement Template")]/following::*[@role="combobox" or self::input][1]');
    }

    async getTopVisibleDialog() {
        const dialogs = await $$('//div[@role="dialog"]');
        const visibleDialogs = [];

        for (const dialog of dialogs) {
            const isVisible = await dialog.isDisplayed().catch(() => false);
            if (isVisible) {
                visibleDialogs.push(dialog);
            }
        }

        if (visibleDialogs.length === 0) {
            return null;
        }

        return visibleDialogs[visibleDialogs.length - 1];
    }

    async waitForDialogWithText(dialogText) {
        await browser.waitUntil(async () => {
            const topDialog = await this.getTopVisibleDialog();
            if (!topDialog) {
                return false;
            }

            const text = await topDialog.getText().catch(() => "");
            return text.includes(dialogText);
        }, {
            timeout: 10000,
            timeoutMsg: `Dialog containing \"${dialogText}\" did not appear`,
        });
    }

    async waitForDialogToClose(dialogText) {
        await browser.waitUntil(async () => {
            const dialogs = await $$('//div[@role="dialog"]');
            for (const dialog of dialogs) {
                const isVisible = await dialog.isDisplayed().catch(() => false);
                if (!isVisible) {
                    continue;
                }
                const text = await dialog.getText().catch(() => "");
                if (text.includes(dialogText)) {
                    return false;
                }
            }
            return true;
        }, {
            timeout: 10000,
            timeoutMsg: `Dialog containing \"${dialogText}\" did not close`,
        });
    }

    getFieldByLabelInContainer(container, labelText) {
        const escaped = labelText.replace(/"/g, '\\"');
        return container.$(`.//*[contains(@class,"fui-Field") or self::div][.//*[contains(normalize-space(),"${escaped}")]]//*[self::input or self::textarea][1] | .//label[contains(normalize-space(),"${escaped}")]/following::input[1] | .//label[contains(normalize-space(),"${escaped}")]/following::textarea[1]`);
    }

    getMilestonePopupContainer() {
        return $('(//*[contains(normalize-space(),"Create/Edit Milestone")]/ancestor::div[contains(@class,"fui-DialogSurface") or contains(@class,"fui-Card")][1]) | (//*[contains(normalize-space(),"Create/Edit Milestone")]/ancestor::div[.//button[normalize-space()="Submit"] and .//button[contains(normalize-space(),"Add Event")]][1])');
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
        return $(`(//*[contains(@class,"fui-Field") or self::div][.//*[contains(normalize-space(),"${escaped}")]]//*[self::input or self::textarea])[1] | (//label[contains(normalize-space(),"${escaped}")]/following::input[1]) | (//label[contains(normalize-space(),"${escaped}")]/following::textarea[1])`);
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
        const sectionToggle = await $(`//button[normalize-space()="${escaped}"] | //*[@role="button" and (normalize-space()="${escaped}" or .//*[normalize-space()="${escaped}"])] | //div[normalize-space()="${escaped}"]`);
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
        const combo = await this.engagementTemplateCombobox;
        await this.safeClick(combo);

        const lowerEscaped = escaped.toLowerCase();
        const option = await $(`//*[@role="option" and contains(translate(normalize-space(.), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "${lowerEscaped}")] | //li[contains(translate(normalize-space(.), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "${lowerEscaped}")]`);
        const optionVisible = await option.isDisplayed().catch(() => false);

        if (optionVisible) {
            await this.safeClick(option);
            return;
        }

        const firstVisibleOption = await $('(//*[@role="option" or self::li][normalize-space()!=""])[1]');
        const fallbackVisible = await firstVisibleOption.isDisplayed().catch(() => false);
        if (fallbackVisible) {
            await this.safeClick(firstVisibleOption);
            return;
        }

        await browser.keys("Escape");
    }

    async openEditForTemplate(templateName) {
        try {
            await this.clickEditOnRow(templateName);
            await this.waitForAddEditTemplateForm();
            return;
        } catch {
            await this.openTemplateRowMenuByName(templateName);
            await this.safeClick(this.getContextMenuItem("Edit"));
            await this.waitForAddEditTemplateForm();
        }
    }

    async backToCaseTemplatesFromForm() {
        const backVisible = await this.backToCaseTemplatesButton.isDisplayed().catch(() => false);
        if (backVisible) {
            await this.safeClick(this.backToCaseTemplatesButton);
        }
        await this.ensureCaseTemplatesTabIsOpen();
    }

    async openNewTemplateForm() {
        await this.clickNewTemplate();
        await this.waitForAddEditTemplateForm();
    }

    async saveTemplateForm() {
        const canSave = await this.saveTemplateButton.isDisplayed().catch(() => false);
        if (canSave) {
            await this.safeClick(this.saveTemplateButton);
        }

        await browser.waitUntil(async () => {
            const onTemplatesList = await this.newTemplateButton.isDisplayed().catch(() => false);
            const stillOnForm = await this.backToCaseTemplatesButton.isDisplayed().catch(() => false);
            return onTemplatesList || stillOnForm;
        }, {
            timeout: 10000,
            timeoutMsg: "Did not resolve to either templates list or add/edit form after Save",
        });

        const stillOnForm = await this.backToCaseTemplatesButton.isDisplayed().catch(() => false);
        if (stillOnForm) {
            await this.safeClick(this.backToCaseTemplatesButton);
        }

        await this.ensureCaseTemplatesTabIsOpen();
    }

    async fillCaseTemplateMainFields(data) {
        await this.clearAndType(this.templateNameInput, data.templateName);
        await this.clearAndType(this.templateDescriptionInput, data.templateDescription);

        const statuses = ["New", "Active", "Completed", "Closed", "Removed"];
        for (const status of statuses) {
            await this.openStatusSection(status);
            await this.checkAllVisibleCheckboxes();
        }

        await this.clearAndType(this.fieldNameInput, data.fieldNameText);
        await this.clearAndType(this.defaultTextInput, data.defaultText);
        await this.clearAndType(this.overviewTextarea, data.overviewText);
        await this.clearAndType(this.initialNoteTextarea, data.initialNoteText);

        await this.setSelectTemplateAndChoose("custom-Copy");
        await this.setSelectTemplateAndChoose("new copy");
        await this.setSelectTemplateAndChoose("Engagement? To whom?");
    }

    async fillMilestoneAndNestedForms() {
        await this.clickInfoAndDismiss("Milestones");

        await this.safeClick(this.addMilestoneButton);
        await this.createEditMilestoneHeading.waitForDisplayed({ timeout: 10000 });
        const milestoneContainer = await this.getMilestonePopupContainer();
        await milestoneContainer.waitForDisplayed({ timeout: 10000 });

        await this.clearAndType(this.getFieldByLabelInContainer(milestoneContainer, "Milestone Name"), "New Milestone");
        await this.clearAndType(this.getFieldByLabelInContainer(milestoneContainer, "Description"), "Who's Deby? YO WIFE!");
        await this.clearAndType(this.getFieldByLabelInContainer(milestoneContainer, "Deliverables"), "A present of course!");

        const addEventInMilestone = await milestoneContainer.$('.//button[contains(normalize-space(),"Add Event")]');
        await this.safeClick(addEventInMilestone);
        await this.waitForDialogWithText("Add Event");
        const eventDialog = await this.getTopVisibleDialog();
        await this.clearAndType(this.getFieldByLabelInContainer(eventDialog, "Event Name"), "Deby's birthday!");
        await this.clearAndType(this.getFieldByLabelInContainer(eventDialog, "Days from Created"), "12");

        const dueDateCheckbox = await eventDialog.$('.//input[@type="checkbox" and (contains(@name,"due") or contains(@id,"due"))] | .//*[@role="checkbox" and (contains(@aria-label,"Due") or contains(@name,"Due"))]');
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

        await this.clearAndType(this.getFieldByLabelInContainer(eventDialog, "Description"), "This is an IMPORTANT DAY FOR US! ~ Signed, Me");

        const saveEventTemplateBtn = await eventDialog.$('.//button[normalize-space()="Save Event Template" or normalize-space()="Save"]');
        await this.safeClick(saveEventTemplateBtn);
        await this.waitForDialogToClose("Add Event");

        const milestoneContainerAfterEventSave = await this.getMilestonePopupContainer();
        const addEventInMilestoneAgain = await milestoneContainerAfterEventSave.$('.//button[contains(normalize-space(),"Add Event")]');
        await this.safeClick(addEventInMilestoneAgain);
        await this.waitForDialogWithText("Add Event");
        const eventDialogForCancel = await this.getTopVisibleDialog();
        const cancelEventButton = await eventDialogForCancel.$('.//button[normalize-space()="Cancel" or normalize-space()="Close"]');
        await this.safeClick(cancelEventButton);
        await this.waitForDialogToClose("Add Event");

        const milestoneContainerAfterEventCancel = await this.getMilestonePopupContainer();
        const addTaskInMilestone = await milestoneContainerAfterEventCancel.$('.//button[contains(normalize-space(),"Add Task")]');
        await this.safeClick(addTaskInMilestone);
        await this.waitForDialogWithText("Task");
        const taskDialog = await this.getTopVisibleDialog();

        const billableCheckbox = await taskDialog.$('.//input[@type="checkbox" and (contains(@name,"billable") or contains(@id,"billable"))] | .//*[@role="checkbox" and contains(@aria-label,"Billable")]');
        const billableVisible = await billableCheckbox.isDisplayed().catch(() => false);
        if (billableVisible) {
            await this.safeClick(billableCheckbox);
            await this.safeClick(billableCheckbox);
        }

        const taskInput = await taskDialog.$('.//*[self::input or self::textarea][contains(@placeholder,"Task") or contains(@aria-label,"Task")][1] | .//label[contains(normalize-space(),"Task")]/following::input[1] | .//label[contains(normalize-space(),"Task")]/following::textarea[1]');
        await this.clearAndType(taskInput, "I need to buy a gift for Deby.");
        const saveTaskButton = await taskDialog.$('.//button[normalize-space()="Save"]');
        await this.safeClick(saveTaskButton);
        await this.waitForDialogToClose("Task");

        const milestoneContainerAfterTaskSave = await this.getMilestonePopupContainer();
        const addTaskInMilestoneAgain = await milestoneContainerAfterTaskSave.$('.//button[contains(normalize-space(),"Add Task")]');
        await this.safeClick(addTaskInMilestoneAgain);
        await this.waitForDialogWithText("Task");
        const taskDialogForClose = await this.getTopVisibleDialog();
        const closeTaskButton = await taskDialogForClose.$('.//button[normalize-space()="Close" or normalize-space()="Cancel"]');
        await this.safeClick(closeTaskButton);
        await this.waitForDialogToClose("Task");

        const milestoneContainerForSubmit = await this.getMilestonePopupContainer();
        const submitMilestoneButton = await milestoneContainerForSubmit.$('.//button[normalize-space()="Submit" or normalize-space()="Save"]');
        await this.safeClick(submitMilestoneButton);
        await browser.waitUntil(async () => !(await this.createEditMilestoneHeading.isDisplayed().catch(() => false)), {
            timeout: 10000,
            timeoutMsg: "Create/Edit Milestone popup did not close after Submit",
        });

        await this.safeClick(this.addMilestoneButton);
        await this.createEditMilestoneHeading.waitForDisplayed({ timeout: 10000 });
        const milestoneContainerForCancel = await this.getMilestonePopupContainer();
        const cancelMilestoneButton = await milestoneContainerForCancel.$('.//button[normalize-space()="Cancel"]');
        await this.safeClick(cancelMilestoneButton);
        await browser.waitUntil(async () => !(await this.createEditMilestoneHeading.isDisplayed().catch(() => false)), {
            timeout: 10000,
            timeoutMsg: "Create/Edit Milestone popup did not close after Cancel",
        });
    }

    async fillAddEditCaseTemplateFullWorkflow(data) {
        await this.fillCaseTemplateMainFields(data);
        await this.fillMilestoneAndNestedForms();
    }
}

export default new DashboardTemplatesPage();
