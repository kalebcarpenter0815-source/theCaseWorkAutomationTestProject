import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

const CASE_TEMPLATE_LONG_TEXT = "The concept of crafting a single cohesive paragraph that stretches to roughly five hundred words is an intentionally demanding writing exercise that pushes the writer beyond normal paragraph structure and forces a sustained flow of ideas, descriptions, and analysis without the usual reset created by a line break. Standard business and academic writing usually prefers shorter paragraphs because they are easier to scan, easier to edit, and easier for a reader to understand quickly, but a longer block paragraph can still be useful when the goal is to create immersion, sustained focus, or a deliberate feeling of continuity. A paragraph of this length has to rely on careful sentence variety, strong transitions, and a clear thematic center so that each sentence feels connected to the previous one while still moving the thought forward. Without that discipline, the paragraph would become repetitive or confusing, but with enough control it can build momentum and create a cumulative effect that shorter paragraphs do not always achieve. The writer has to balance detail with readability, layering explanation, observation, and reflection in a way that feels deliberate rather than bloated, which means every clause needs to contribute something useful, whether that is context, imagery, clarification, or emphasis. This kind of writing is often more stylistic than practical, yet it can still serve a purpose when the subject benefits from a continuous treatment that does not stop and restart every few sentences. It encourages patience, control, and a close awareness of rhythm, because the paragraph needs enough variation to remain readable while also preserving the sense that it is all part of one uninterrupted idea. When done well, the effect is immersive rather than exhausting, and the reader experiences a long chain of connected thought that feels steady, intentional, and complete from the first sentence through the last.";

class DashboardTemplatesWorkflowPage extends Page {
    get templatesNavButton() {
        return $('//*[@data-testid="vert-nav-templates"] | //button[@data-testid="vert-nav-templates"] | //a[@data-testid="vert-nav-templates"] | //span[normalize-space()="Templates"]/ancestor::*[self::a or self::button or @role="button" or self::div][1]');
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

    get confirmNoButton() {
        return $('//div[@role="dialog"]//button[normalize-space()="No" or .//span[normalize-space()="No"]]');
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

    get caseTypeDropdown() {
        return $(
            '//label[normalize-space()="Case Type"]/following::button[not(contains(@class,"Info") or starts-with(@id,"infolabel-") or @aria-label="information")][1]'
            + ' | //*[contains(normalize-space(),"Case Type")]/ancestor::*[self::div][2]//*[@role="combobox"][1]'
        );
    }

    get modalDialog() {
        return $('(//div[@role="dialog"])[last()]');
    }

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
        } catch {
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

    async openCaseTemplatesLanding() {
        await this.goToTemplatesPage();
        await this.ensureCaseTemplatesTabIsOpen();
        await this.caseTemplatesCardTitle.waitForDisplayed({ timeout: 10000 });
    }

    getTemplateRowByName(templateName) {
        return $(`//tr[.//td[1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]] | //div[@role="row"][.//*[@role="gridcell"][1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]`);
    }

    getCopyButtonInRow(templateName) {
        return $(`(//div[@role="row"][.//*[@role="gridcell"][1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]//button)[1] | (//tr[.//td[1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]//button)[1]`);
    }

    getEditButtonInRow(templateName) {
        return $(`(//div[@role="row"][.//*[@role="gridcell"][1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]//button)[2] | (//tr[.//td[1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]//button)[2]`);
    }

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
        const copyButton = this.getCopyButtonInRow(templateName);
        await copyButton.waitForDisplayed({ timeout: 5000 });
        await this.safeClick(copyButton);
    }

    async clickEditOnRow(templateName) {
        await this.hoverTemplateRowByName(templateName);
        const editButton = this.getEditButtonInRow(templateName);
        await editButton.waitForDisplayed({ timeout: 5000 });
        await this.safeClick(editButton);
    }

    async clickDeleteOnRow(templateName) {
        await this.hoverTemplateRowByName(templateName);
        const deleteButton = this.getDeleteButtonInRow(templateName);
        await deleteButton.waitForDisplayed({ timeout: 5000 });
        await this.safeClick(deleteButton);
    }

    async openEditFormForTemplate(templateName) {
        for (let attempt = 0; attempt < 3; attempt += 1) {
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
            return this.newTemplateButton.isDisplayed().catch(() => false);
        }, { timeout: 5000, interval: 150 }).catch(() => false);

        if (!tableOpened) {
            const backVisible = await this.backToCaseTemplatesButton.isDisplayed().catch(() => false);
            if (backVisible) {
                await this.safeClick(this.backToCaseTemplatesButton);
            }
        }

        await this.openCaseTemplatesLanding();
    }

    async backFromEditFormToTable() {
        const backVisible = await this.backToCaseTemplatesButton.isDisplayed().catch(() => false);
        if (backVisible) {
            await this.safeClick(this.backToCaseTemplatesButton);
        }

        await this.openCaseTemplatesLanding();
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

    async openAndCloseCaseTemplatesInfo() {
        const infoButton = $(
            '//*[self::h1 or self::h2 or self::h3 or @role="heading" or self::span][normalize-space()="Case Templates"]'
            + '/following::*[self::button or @role="button"][1]'
            + ' | //*[contains(normalize-space(),"Case Templates")]/ancestor::*[self::div][1]//button[contains(@class,"InfoButton") or starts-with(@id,"infolabel-") or @aria-label="information"][1]'
        );

        const directInfoExists = await infoButton.isDisplayed().catch(() => false);
        if (directInfoExists) {
            await infoButton.waitForClickable({ timeout: 5000 });
            await this.safeClick(infoButton);

            const opened = await browser.waitUntil(async () => {
                const popupVisible = await $('//div[@role="tooltip" or @role="dialog" or contains(@class,"Popover") or contains(@class,"Tooltip")]').isDisplayed().catch(() => false);
                const isExpanded = await infoButton.getAttribute("aria-expanded").catch(() => null);
                return popupVisible || isExpanded === "true";
            }, { timeout: 5000, interval: 150 }).catch(() => false);

            await this.safeClick(infoButton);
            await browser.pause(250);
            return opened;
        }

        return this.clickInfoIconByNearbyTextIfPresent("Case Templates");
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

    async getAllowedStatusesContainer() {
        return $(
            '//*[contains(normalize-space(),"Allowed Statuses")]/ancestor::*[self::div or self::section][1]'
            + ' | //label[contains(normalize-space(),"Allowed Statuses")]/ancestor::*[self::div or self::section][1]'
        );
    }

    async scrollAllowedStatusesContainerToTop() {
        const container = await this.getAllowedStatusesContainer();
        const exists = await container.isExisting().catch(() => false);
        if (!exists) {
            return;
        }

        await browser.execute((el) => {
            el.scrollTop = 0;
        }, container);
    }

    async scrollAllowedStatusesContainerBy(deltaY) {
        const container = await this.getAllowedStatusesContainer();
        const exists = await container.isExisting().catch(() => false);
        if (!exists) {
            return false;
        }

        return browser.execute((el, delta) => {
            const previous = el.scrollTop;
            el.scrollTop = Math.min(el.scrollTop + delta, el.scrollHeight);
            return el.scrollTop > previous;
        }, container, deltaY);
    }

    async expandAllAllowedStatusGroups() {
        const container = await this.getAllowedStatusesContainer();
        const containerExists = await container.isExisting().catch(() => false);
        if (!containerExists) {
            return;
        }

        await this.scrollAllowedStatusesContainerToTop();
        for (let step = 0; step < 30; step += 1) {
            const collapsedButtons = await container.$$(
                './/*[@role="button" and @aria-expanded="false"]'
                + ' | .//button[@aria-expanded="false"]'
            );

            for (const button of collapsedButtons) {
                const visible = await button.isDisplayed().catch(() => false);
                if (visible) {
                    await this.safeClick(button);
                }
            }

            const moved = await this.scrollAllowedStatusesContainerBy(220);
            if (!moved) {
                break;
            }
        }

        await this.scrollAllowedStatusesContainerToTop();
    }

    async getVisibleAllowedStatusCheckboxes() {
        const container = await this.getAllowedStatusesContainer();
        const containerExists = await container.isExisting().catch(() => false);
        if (!containerExists) {
            return [];
        }

        const roleBoxes = await container.$$('.//*[@role="checkbox"]');
        const nativeBoxes = await container.$$('.//input[@type="checkbox"]');
        const allBoxes = [...roleBoxes, ...nativeBoxes];

        const visibleBoxes = [];
        for (const checkbox of allBoxes) {
            const visible = await checkbox.isDisplayed().catch(() => false);
            if (visible) {
                visibleBoxes.push(checkbox);
            }
        }

        return visibleBoxes;
    }

    async isCheckboxSelected(checkbox) {
        const tagName = (await checkbox.getTagName().catch(() => "")).toLowerCase();
        if (tagName === "input") {
            return checkbox.isSelected().catch(() => false);
        }

        const ariaChecked = await checkbox.getAttribute("aria-checked").catch(() => null);
        if (ariaChecked === "true") {
            return true;
        }
        if (ariaChecked === "false") {
            return false;
        }

        const nestedInput = await checkbox.$('.//input[@type="checkbox"]');
        const nestedExists = await nestedInput.isExisting().catch(() => false);
        if (nestedExists) {
            return nestedInput.isSelected().catch(() => false);
        }

        return false;
    }

    async hasUncheckedAllowedStatusCheckboxesInSweep() {
        await this.expandAllAllowedStatusGroups();
        await this.scrollAllowedStatusesContainerToTop();

        for (let step = 0; step < 35; step += 1) {
            const checkboxes = await this.getVisibleAllowedStatusCheckboxes();
            for (const checkbox of checkboxes) {
                const selected = await this.isCheckboxSelected(checkbox);
                if (!selected) {
                    return true;
                }
            }

            const moved = await this.scrollAllowedStatusesContainerBy(220);
            if (!moved) {
                break;
            }
        }

        await this.scrollAllowedStatusesContainerToTop();
        return false;
    }

    async ensureAllAllowedStatusesCheckedWithRetries(maxPasses = 4) {
        await this.expandSectionByTextIfPresent("Allowed Statuses");

        for (let pass = 0; pass < maxPasses; pass += 1) {
            await this.expandAllAllowedStatusGroups();
            await this.scrollAllowedStatusesContainerToTop();

            let clickedAny = false;
            for (let step = 0; step < 35; step += 1) {
                const checkboxes = await this.getVisibleAllowedStatusCheckboxes();
                for (const checkbox of checkboxes) {
                    const selected = await this.isCheckboxSelected(checkbox);
                    if (!selected) {
                        await this.safeClick(checkbox);
                        clickedAny = true;
                    }
                }

                await this.expandAllAllowedStatusGroups();
                const moved = await this.scrollAllowedStatusesContainerBy(220);
                if (!moved) {
                    break;
                }
            }

            const allChecked = !(await this.hasUncheckedAllowedStatusCheckboxesInSweep());
            if (allChecked) {
                return true;
            }

            if (!clickedAny) {
                continue;
            }
        }

        return false;
    }

    async completeAllowedStatusesChunk() {
        await this.expandSectionByTextIfPresent("Allowed Statuses");
        const allChecked = await this.ensureAllAllowedStatusesCheckedWithRetries();
        if (!allChecked) {
            throw new Error("Not all Allowed Statuses checkboxes are selected after retries.");
        }
    }

    async selectAllAvailableCaseTypes() {
        const trigger = this.caseTypeDropdown;
        const exists = await trigger.isExisting().catch(() => false);
        if (!exists) {
            return;
        }

        await this.safeClick(trigger);
        try {
            await browser.waitUntil(async () => {
                const options = await $$('//*[@role="option"] | //*[@role="menuitemcheckbox"] | //*[@role="menuitem"]');
                for (const option of options) {
                    if (await option.isDisplayed().catch(() => false)) {
                        return true;
                    }
                }
                return false;
            }, { timeout: 5000, interval: 200 });
        } catch {
            return;
        }

        const allOptions = await $$('//*[@role="option"] | //*[@role="menuitemcheckbox"] | //*[@role="menuitem"]');
        const optionTexts = [];
        for (const option of allOptions) {
            if (await option.isDisplayed().catch(() => false)) {
                const text = (await option.getText().catch(() => "")).trim();
                if (text) {
                    optionTexts.push(text);
                }
            }
        }

        for (const text of optionTexts) {
            const anyVisible = await $('//*[@role="option"] | //*[@role="menuitemcheckbox"] | //*[@role="menuitem"]').isDisplayed().catch(() => false);
            if (!anyVisible) {
                await this.safeClick(trigger);
                await browser.pause(300);
            }

            const escapedText = text.replace(/"/g, '\\"');
            const option = $(`//*[@role="option" and normalize-space()="${escapedText}"] | //*[@role="menuitemcheckbox" and normalize-space()="${escapedText}"] | //*[@role="menuitem" and normalize-space()="${escapedText}"]`);
            const visible = await option.isDisplayed().catch(() => false);
            if (!visible) {
                continue;
            }

            const ariaSelected = await option.getAttribute("aria-selected").catch(() => null);
            const ariaChecked = await option.getAttribute("aria-checked").catch(() => null);
            if (ariaSelected !== "true" && ariaChecked !== "true") {
                await this.safeClick(option);
                await browser.pause(150);
            }
        }

        const stillOpen = await $('//*[@role="option"] | //*[@role="menuitemcheckbox"]').isDisplayed().catch(() => false);
        if (stillOpen) {
            await browser.keys("Escape");
            await browser.pause(200);
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
        if (nativeExists) {
            await this.safeClick(nativeToggle);
            await this.safeClick(nativeToggle);
        }
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

        const milestoneName = "New Milestone";
        const milestoneDescription = "Short legal milestone summary for edit and delete coverage.";
        const taskText = "Review legal filings, draft timeline, and prepare attorney follow-up list.";

        const milestoneDialog = this.modalDialog;
        await this.clearAndTypeByLabelFromRootIfPresent(milestoneDialog, "Milestone Name", milestoneName);
        await this.clearAndTypeByLabelFromRootIfPresent(milestoneDialog, "Description", milestoneDescription);
        await this.clearAndTypeByLabelFromRootIfPresent(milestoneDialog, "Deliverables", "Deliverables");
        await this.clearAndTypeByLabelFromRootIfPresent(milestoneDialog, "Due Days from Created", "23");

        await this.clickButtonByTextFromRootIfPresent(milestoneDialog, "Add Event");

        let eventDialog = this.modalDialog;
        await this.clearAndTypeByLabelFromRootIfPresent(eventDialog, "Event Name", "Quagmires Day of Celebration");
        await this.clearAndTypeByLabelFromRootIfPresent(eventDialog, "Days from Created", "27");
        await this.ensureStatusChecked("Is Due Date");
        await this.clearAndTypeByLabelFromRootIfPresent(eventDialog, "Description", "Quagmire is having a party for his promotion he got at his commercial airline pilot job.");
        await this.clickButtonByTextFromRootIfPresent(eventDialog, "Save Event Template");
        await this.waitForDialogToClose(eventDialog);

        const eventRowMenuButton = await milestoneDialog.$(
            './/tr[.//*[contains(normalize-space(),"Quagmires Day of Celebration")]]//button[last()]'
            + ' | .//div[@role="row"][.//*[contains(normalize-space(),"Quagmires Day of Celebration")]]//button[last()]'
        );
        const eventMenuExists = await eventRowMenuButton.isExisting().catch(() => false);
        if (eventMenuExists) {
            await this.safeClick(eventRowMenuButton);
            const editEventButton = $('//button[normalize-space()="Edit" or .//*[normalize-space()="Edit"]] | //*[@role="menuitem"][normalize-space()="Edit" or .//*[normalize-space()="Edit"]]');
            const editEventVisible = await editEventButton.isDisplayed().catch(() => false);
            if (editEventVisible) {
                await this.safeClick(editEventButton);
                eventDialog = this.modalDialog;
                const closedByCancel = await this.clickButtonByTextFromRootIfPresent(eventDialog, "Cancel");
                if (!closedByCancel) {
                    await this.clickButtonByTextFromRootIfPresent(eventDialog, "Close");
                }
                await this.waitForDialogToClose(eventDialog);
            }
        }

        await this.clickButtonByTextFromRootIfPresent(milestoneDialog, "Add Task");

        let taskDialog = this.modalDialog;
        await this.toggleBillableOffThenOnIfPresent(taskDialog);
        const wroteTaskToComplete = await this.clearAndTypeByLabelFromRootIfPresent(taskDialog, "Task to complete", taskText);
        if (!wroteTaskToComplete) {
            await this.clearAndTypeByLabelFromRootIfPresent(taskDialog, "Task", taskText);
        }
        await this.clickButtonByTextFromRootIfPresent(taskDialog, "Save");
        await this.waitForDialogToClose(taskDialog);

        const taskEditButton = await milestoneDialog.$(
            `.//tr[.//*[contains(normalize-space(),"${taskText}")]]//button[2]`
            + ` | .//div[@role="row"][.//*[contains(normalize-space(),"${taskText}")]]//button[2]`
        );
        const taskEditExists = await taskEditButton.isExisting().catch(() => false);
        if (taskEditExists) {
            await this.safeClick(taskEditButton);
            taskDialog = this.modalDialog;
            const editClosedByCancel = await this.clickButtonByTextFromRootIfPresent(taskDialog, "Cancel");
            if (!editClosedByCancel) {
                await this.clickButtonByTextFromRootIfPresent(taskDialog, "Close");
            }
            await this.waitForDialogToClose(taskDialog);
        }

        const taskDeleteButton = await milestoneDialog.$(
            `.//tr[.//*[contains(normalize-space(),"${taskText}")]]//button[last()]`
            + ` | .//div[@role="row"][.//*[contains(normalize-space(),"${taskText}")]]//button[last()]`
        );
        const taskDeleteExists = await taskDeleteButton.isExisting().catch(() => false);
        if (taskDeleteExists) {
            await this.safeClick(taskDeleteButton);

            let confirmRemovalDialog = this.modalDialog;
            let clickedNo = await this.clickButtonByTextFromRootIfPresent(confirmRemovalDialog, "No");
            if (!clickedNo) {
                clickedNo = await this.clickButtonByTextFromRootIfPresent(confirmRemovalDialog, "Cancel");
            }
            if (clickedNo) {
                await this.waitForDialogToClose(confirmRemovalDialog);
            }

            await this.safeClick(taskDeleteButton);
            confirmRemovalDialog = this.modalDialog;
            let clickedYes = await this.clickButtonByTextFromRootIfPresent(confirmRemovalDialog, "Yes");
            if (!clickedYes) {
                clickedYes = await this.clickButtonByTextFromRootIfPresent(confirmRemovalDialog, "Submit");
            }
            if (clickedYes) {
                await this.waitForDialogToClose(confirmRemovalDialog);
            }
        }

        await this.clickButtonByTextFromRootIfPresent(milestoneDialog, "Submit");
        await this.waitForDialogToClose(milestoneDialog);

        const milestoneRow = $(
            `//tr[.//*[normalize-space()="${milestoneName}"] and .//*[contains(normalize-space(),"${milestoneDescription}")]]`
            + ` | //div[@role="row"][.//*[normalize-space()="${milestoneName}"] and .//*[contains(normalize-space(),"${milestoneDescription}")]]`
        );
        const milestoneRowExists = await milestoneRow.isExisting().catch(() => false);
        if (milestoneRowExists) {
            await this.jsScrollIntoView(milestoneRow);
            await milestoneRow.moveTo();

            const milestoneMenuButton = await milestoneRow.$('.//button[last()]');
            const menuExists = await milestoneMenuButton.isExisting().catch(() => false);
            if (menuExists) {
                await this.safeClick(milestoneMenuButton);
                const removeFromMenu = $('//button[normalize-space()="Remove" or normalize-space()="Delete" or .//*[normalize-space()="Remove"] or .//*[normalize-space()="Delete"]] | //*[@role="menuitem"][normalize-space()="Remove" or normalize-space()="Delete" or .//*[normalize-space()="Remove"] or .//*[normalize-space()="Delete"]]');
                const removeVisible = await removeFromMenu.isDisplayed().catch(() => false);
                if (removeVisible) {
                    await this.safeClick(removeFromMenu);
                }
            }

            let confirmRemovalDialog = this.modalDialog;
            let clickedNo = await this.clickButtonByTextFromRootIfPresent(confirmRemovalDialog, "No");
            if (!clickedNo) {
                clickedNo = await this.clickButtonByTextFromRootIfPresent(confirmRemovalDialog, "Cancel");
            }
            if (clickedNo) {
                await this.waitForDialogToClose(confirmRemovalDialog);
            }

            await milestoneRow.moveTo();
            const milestoneMenuButtonAgain = await milestoneRow.$('.//button[last()]');
            const menuAgainExists = await milestoneMenuButtonAgain.isExisting().catch(() => false);
            if (menuAgainExists) {
                await this.safeClick(milestoneMenuButtonAgain);
                const removeFromMenuAgain = $('//button[normalize-space()="Remove" or normalize-space()="Delete" or .//*[normalize-space()="Remove"] or .//*[normalize-space()="Delete"]] | //*[@role="menuitem"][normalize-space()="Remove" or normalize-space()="Delete" or .//*[normalize-space()="Remove"] or .//*[normalize-space()="Delete"]]');
                const removeAgainVisible = await removeFromMenuAgain.isDisplayed().catch(() => false);
                if (removeAgainVisible) {
                    await this.safeClick(removeFromMenuAgain);
                }
            }

            confirmRemovalDialog = this.modalDialog;
            let clickedYes = await this.clickButtonByTextFromRootIfPresent(confirmRemovalDialog, "Yes");
            if (!clickedYes) {
                clickedYes = await this.clickButtonByTextFromRootIfPresent(confirmRemovalDialog, "Submit");
            }
            if (clickedYes) {
                await this.waitForDialogToClose(confirmRemovalDialog);
            }
        }
    }

    async runFullTemplateEditFlow(templateName) {
        await this.openEditFormForTemplate(templateName);

        await this.clearAndType(this.templateNameInput, templateName);
        await this.clearAndType(this.templateDescriptionInput, CASE_TEMPLATE_LONG_TEXT);
        await this.clickInfoIconByNearbyTextIfPresent("Template Description");

        await this.clickInfoIconByNearbyTextIfPresent("Case Type");
        await this.selectAllAvailableCaseTypes();

        await this.clickInfoIconByNearbyTextIfPresent("Allowed Statuses");
        await this.completeAllowedStatusesChunk();

        await this.clickInfoIconByNearbyTextIfPresent("Description and Overview");
        await this.clickInfoIconByNearbyTextIfPresent("Short Description");
        await this.clearAndType(this.shortDescriptionFieldNameInput, "thingy");
        await this.clearAndType(this.shortDescriptionDefaultTextInput, "Pikachu has a best friend Charizard.");

        await this.clickInfoIconByNearbyTextIfPresent("Overview");
        await this.clearAndType(this.overviewInput, "Pikachu and his friends had fun today!");

        await this.clickInfoIconByNearbyTextIfPresent("Initial Note");
        await this.clearAndType(this.initialNoteInput, CASE_TEMPLATE_LONG_TEXT);

        await this.clickInfoIconByNearbyTextIfPresent("Engagement Template");
        await this.selectEngagementTemplateSequence([
            "custom-Copy",
            "new copy",
            "Engagement? To whom?",
            "dfs",
            "Engagement? To whom?",
        ]);

        await this.clickInfoIconByNearbyTextIfPresent("Milestones");
        await this.completeMilestoneDialogFlow();

        await this.saveEditFormAndReturnToTable();

        await this.openEditFormForTemplate(templateName);
        await this.backFromEditFormToTable();
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

    async confirmDialogNo() {
        await this.confirmNoButton.waitForDisplayed({ timeout: 10000 });
        await this.safeClick(this.confirmNoButton);
        await browser.waitUntil(async () => {
            const copyDialogVisible = await this.confirmCopyDialog.isDisplayed().catch(() => false);
            const deleteDialogVisible = await this.confirmDeleteDialog.isDisplayed().catch(() => false);
            return !copyDialogVisible && !deleteDialogVisible;
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm dialog did not close after clicking No",
        });
    }

    async copyTemplateAndConfirm(templateName) {
        await this.clickCopyOnRow(templateName);
        await this.confirmCopyDialog.waitForDisplayed({ timeout: 10000 });
        await this.confirmDialogYes();
        await this.newTemplateButton.waitForDisplayed({ timeout: 10000 });
    }

    async copyTemplateWithDeclineThenConfirm(templateName) {
        await this.clickCopyOnRow(templateName);
        await this.confirmCopyDialog.waitForDisplayed({ timeout: 10000 });
        await this.confirmDialogNo();
        await this.newTemplateButton.waitForDisplayed({ timeout: 10000 });

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

    async deleteTemplateWithDeclineThenConfirm(templateName) {
        await this.clickDeleteOnRow(templateName);
        await this.confirmDeleteDialog.waitForDisplayed({ timeout: 10000 });
        await this.confirmDialogNo();
        await this.newTemplateButton.waitForDisplayed({ timeout: 10000 });

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

    async getUniqueTemplateNames() {
        const allNames = await this.getAllTemplateNames();
        return [...new Set(allNames)];
    }

    async countTemplatesByExactName(templateName) {
        const selector = `//div[@role="row"][.//*[@role="gridcell"][1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]] | //tr[.//td[1][normalize-space()="${templateName}" or .//*[normalize-space()="${templateName}"]]]`;
        try {
            await $(selector).waitForExist({ timeout: 1500 });
        } catch {
            return 0;
        }

        const rows = await $$(selector);
        return rows.length;
    }

    async deleteTemplatesUntilCount(templateName, targetCount) {
        for (let attempt = 0; attempt < 10; attempt += 1) {
            const currentCount = await this.countTemplatesByExactName(templateName);
            if (currentCount <= targetCount) {
                break;
            }

            await this.deleteTemplateAndConfirm(templateName);
        }
    }

    async ensureTemplateExists(templateName) {
        const count = await this.countTemplatesByExactName(templateName);
        if (count > 0) {
            return;
        }

        if (templateName === "You're the Best Around-Copy") {
            await this.copyTemplateAndConfirm("You're the Best Around");
        }
    }

    async ensureBaselineRows() {
        await this.openCaseTemplatesLanding();

        await this.deleteTemplatesUntilCount("Pikachu", 1);
        await this.deleteTemplatesUntilCount("You're the Best Around", 1);

        await this.ensureTemplateExists("You're the Best Around-Copy");
        await this.deleteTemplatesUntilCount("You're the Best Around-Copy", 1);

        const allNames = await this.getAllTemplateNames();
        const nestedCopyNames = [...new Set(allNames.filter((name) => (
            name.startsWith("Pikachu-Copy")
            || name.startsWith("You're the Best Around-Copy-Copy")
        )))];

        for (const rowName of nestedCopyNames) {
            await this.deleteTemplatesUntilCount(rowName, 0);
        }
    }

    async performCopyDeleteSequence() {
        await this.ensureBaselineRows();

        await this.copyTemplateAndConfirm("Pikachu");
        await this.copyTemplateWithDeclineThenConfirm("You're the Best Around");
        await this.copyTemplateAndConfirm("You're the Best Around-Copy");

        await this.deleteTemplateWithDeclineThenConfirm("Pikachu-Copy");

        const bestAroundCopyCount = await this.countTemplatesByExactName("You're the Best Around-Copy");
        if (bestAroundCopyCount > 1) {
            await this.deleteTemplateWithDeclineThenConfirm("You're the Best Around-Copy");
        }

        const bestAroundCopyCopyCount = await this.countTemplatesByExactName("You're the Best Around-Copy-Copy");
        if (bestAroundCopyCopyCount > 0) {
            await this.deleteTemplateWithDeclineThenConfirm("You're the Best Around-Copy-Copy");
        }

        await this.openCaseTemplatesLanding();
    }

    async runFullTemplateEditCycle(templateName) {
        await this.openCaseTemplatesLanding();
        await this.ensureTemplateExists(templateName);
        await this.runFullTemplateEditFlow(templateName);
        await this.openCaseTemplatesLanding();
    }

    async getOrderedTemplateNamesForFullRun() {
        await this.openCaseTemplatesLanding();
        const allNames = await this.getUniqueTemplateNames();
        const priorityNames = [
            "Pikachu",
            "You're the Best Around",
            "You're the Best Around-Copy",
        ];

        const orderedNames = [];
        for (const name of priorityNames) {
            if (allNames.includes(name)) {
                orderedNames.push(name);
            }
        }

        for (const name of allNames) {
            if (!orderedNames.includes(name)) {
                orderedNames.push(name);
            }
        }

        return orderedNames;
    }
}

export default new DashboardTemplatesWorkflowPage();