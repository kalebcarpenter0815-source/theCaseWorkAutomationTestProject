import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardMyCasesPage extends Page {
    // =============================
    // MY CASES CARD / SECTION
    // =============================

    get myCasesSection() {
        return $('//*[contains(normalize-space(.), "My Cases")]/ancestor::div[.//input[@data-testid="search-input"]][1]');
    }

    get myCasesHeading() {
        return $('//label//*[contains(normalize-space(.), "My Cases")]');
    }

    get searchInput() {
        return $('input[data-testid="search-input"]');
    }

    get searchInfoButton() {
        return $('//input[@data-testid="search-input"]/following::button[.//*[name()="path" and contains(@d,"M8 1a7")]][1]');
    }

    get createCaseButton() {
        return $('//button[@data-testid="my-cases-create-case-button"] | //button[contains(normalize-space(.), "Create Case")]');
    }

    get caseTable() {
        return $('[role="grid"]');
    }

    get emptyStateMessage() {
        return $('//*[contains(normalize-space(.), "You have no cases") or contains(normalize-space(.), "no cases")]');
    }

    get caseNameLinks() {
        return $$('[role="grid"] button.fui-Link');
    }

    // =============================
    // CREATE CASE MODAL
    // =============================

    get createCaseModal() {
        return $('//*[@role="dialog"] | //h1[contains(normalize-space(.), "New Case")] | //label[contains(normalize-space(.), "Case Name")]');
    }

    // Apply Template Dropdown
    get applyTemplateButton() {
        return $('button[aria-haspopup="menu"]');
    }

    get templateOptions() {
        return $$('.fui-MenuItem__content');
    }

    getTemplateOption(templateName) {
        return $(`//*[contains(text(), "${templateName}")]`);
    }

    // Case Name Field
    get caseNameInput() {
        return $('input[data-testid="case-info-card-name-input"]');
    }

    // Retained Date Fields
    get retainedDateInput() {
        return $('input[name="retainedDate"]');
    }

    get retainedDateField() {
        return $('//div[contains(@class,"fui-Field")][.//input[@name="retainedDate"]]');
    }

    get calendarPicker() {
        return $('[role="grid"][aria-label*="April"]');
    }

    get datePickerMonthYear() {
        return $('button[aria-label*="change year"]');
    }

    getMonthButton(month) {
        // Month abbreviations (Jan, Feb, May…) contain no spaces; this distinguishes them from
        // nav headers ("May 2026") and day aria-labels ("Saturday, May 23, 2026").
        return $(`//button[@role="gridcell" and normalize-space()="${month}"] | //button[normalize-space()="${month}" and not(contains(normalize-space()," "))]`);
    }

    getDateButton(day) {
        // Prefer in-month (not aria-disabled) day buttons first.
        return $(`//button[not(@aria-disabled="true")][.//span[normalize-space()="${day}"]] | //button[.//span[normalize-space()="${day}"]] | //*[@role="grid"]//*[normalize-space()="${day}"]/ancestor::button[1]`);
    }

    // Case Type Dropdown
    get caseTypeCombobox() {
        return $('input[data-testid="case-type-combobox"]');
    }

    getCaseTypeOption(optionName) {
        return $(`//div[@role="option" and .//*[normalize-space()="${optionName}"]] | //li[@role="option" and .//*[normalize-space()="${optionName}"]] | //span[normalize-space()="${optionName}"]/ancestor::*[@role="option"][1] | //span[normalize-space()="${optionName}"]`);
    }

    // Retained By (Party) Field
    get partyCombobox() {
        return $('input[data-testid="party-combobox"]');
    }

    get addContactButton() {
        return $('//button[@data-testid="party-control-add-contact-button"] | //button[contains(normalize-space(.), "Add Contact")]');
    }

    get addContactCancelButton() {
        return $('//div[.//*[contains(normalize-space(.), "Add Contact")]]//button[contains(normalize-space(.), "Cancel")]');
    }

    getAddedPartyInfo() {
        return $('div.fui-Persona');
    }

    // Status Dropdown
    get statusCombobox() {
        return $('input[data-testid="case-status-combobox"]');
    }

    get retainedByInfoButton() {
        return $('//div[contains(@class,"fui-Field")][.//input[@data-testid="party-combobox"]]//button[@aria-label="information"]');
    }

    get statusInfoButton() {
        return $('//div[contains(@class,"fui-Field")][.//input[@data-testid="case-status-combobox"]]//button[@aria-label="information"]');
    }

    getStatusOption(statusName) {
        return $(`//div[@role="option" and .//*[normalize-space()="${statusName}"]] | //li[@role="option" and .//*[normalize-space()="${statusName}"]] | //span[normalize-space()="${statusName}"]/ancestor::*[@role="option"][1] | //span[normalize-space()="${statusName}"]`);
    }

    // Billing Section
    get fixedFeeSwitch() {
        return $('input[data-testid="case-info-card-fixed-fee-switch"]');
    }

    get fixedFeeAmountInput() {
        return $('//label[contains(normalize-space(.), "Fixed Fee")]/following::input[1] | //input[contains(@value, "$") or contains(@placeholder, "$")][1]');
    }

    // Description / Action / Proceeding
    get descriptionTextarea() {
        return $('textarea[data-testid="case-info-card-short-description-input"]');
    }

    // Overview Field
    get overviewField() {
        return $('textarea[name*="overview"]');
    }

    // Assign Case Button
    get assignCaseButton() {
        return $('//button[@data-testid="assign-case-button"] | //button[starts-with(@data-testid,"link-button-") and contains(normalize-space(.), "Assign Case")] | //button[contains(normalize-space(.), "Assign Case")]');
    }

    // User Dialog
    get userCheckboxes() {
        return $$('input[type="checkbox"][id^="checkbox-"]');
    }

    get selectUsersButton() {
        return $('//button[@data-testid="select-users-dialog-submit"] | //button[contains(normalize-space(.), "Select Users")]');
    }

    get cancelUsersButton() {
        return $('//button[@data-testid="select-users-dialog-cancel"] | //button[contains(normalize-space(.), "Cancel")]');
    }

    get assignUsersDialog() {
        return $('//div[@role="dialog" and (.//*[contains(normalize-space(.), "Assign Case To")] or .//*[contains(normalize-space(.), "Assign Case")]) and (.//button[@data-testid="select-users-dialog-submit"] or .//button[contains(normalize-space(.), "Select Users")])]');
    }

    get assignUsersCheckboxes() {
        return this.assignUsersDialog.$$('.//input[@type="checkbox"]');
    }

    // Add Affiliated Party
    get addAffiliatedPartyButton() {
        return $('//button[not(ancestor::*[@role="dialog"]) and (@data-testid="add-affiliated-party-button" or (starts-with(@data-testid,"link-button-") and contains(normalize-space(.), "Add Affiliated Party")) or contains(normalize-space(.), "Add Affiliated Party"))]');
    }

    get affiliatedPartyPersonas() {
        return $$('div.fui-Persona');
    }

    get affiliatedPartyCheckboxes() {
        return $$('.fui-Persona input[type="checkbox"]');
    }

    get submitAffiliatedPartyButton() {
        return this.affiliatedPartyDialog.$('.//button[@data-testid="affiliated-party-dialog-submit-button"] | .//button[normalize-space()="Add Affiliated Party"]');
    }

    get cancelAffiliatedPartyButton() {
        return this.affiliatedPartyDialog.$('.//button[@data-testid="affiliated-party-dialog-cancel-button"] | .//button[contains(normalize-space(.), "Cancel")]');
    }

    get addNewPartyButton() {
        return this.affiliatedPartyDialog.$('.//button[@data-testid="affiliated-party-dialog-add-new-party-button"] | .//button[contains(normalize-space(.), "Add New Party")] | .//button[contains(normalize-space(.), "Add Party")]');
    }

    get affiliatedPartyDialog() {
        return $('//div[@role="dialog" and (.//*[contains(normalize-space(.), "Add Affiliated Party")] or .//*[contains(normalize-space(.), "Affiliated Party")]) and (.//button[@data-testid="affiliated-party-dialog-add-party-button"] or .//button[contains(normalize-space(.), "Add Party")])]');
    }

    get affiliatedPartyDialogCheckboxes() {
        return this.affiliatedPartyDialog.$$('.//input[@type="checkbox"]');
    }

    // Create New Party / Client Form
    get partyNameInput() {
        return $('input[data-testid="party-dialog-name-input"]');
    }

    get createNewPartyDialog() {
        return $('//div[@role="dialog" and .//*[contains(normalize-space(.), "Create New Client") or contains(normalize-space(.), "Create New Client / 3rd Party") or contains(normalize-space(.), "3rd Party")]]');
    }

    get partyAddressInput() {
        return $('input[data-testid="party-dialog-address1-input"]');
    }

    get partyAddress2Input() {
        return $('input[data-testid="party-dialog-address2-input"]');
    }

    get partyCityInput() {
        return $('input[data-testid="party-dialog-city-input"]');
    }

    get partyStateInput() {
        return $('input[data-testid="party-dialog-state-input"]');
    }

    get partyZipInput() {
        return $('input[data-testid="party-dialog-zip-input"]');
    }

    get partyUrlInput() {
        return $('input[data-testid="party-dialog-url-input"]');
    }

    get addPhoneNumberButton() {
        return $('//button[.//*[name()="path" and contains(@d,"M4 3.5C4 2.67")]] | //button[contains(normalize-space(.),"Add Phone Number")]');
    }

    // Phone Number Dialog
    get phoneNumberInput() {
        return $('input[data-testid="phone-dialog-number-input"]');
    }

    get phonePrimarySwitch() {
        return $('//input[@role="switch" and @name="primary"] | //input[@role="switch"][ancestor::*[contains(normalize-space(.), "Primary")]]');
    }

    get phoneTypeCombobox() {
        return $('input[data-testid="phone-dialog-type-combobox"]');
    }

    get submitPhoneButton() {
        return $('button[data-testid="phone-dialog-submit-button"]');
    }

    get cancelPhoneButton() {
        return $('button[data-testid="phone-dialog-cancel-button"]');
    }

    // Notes Card
    get caseNoteInput() {
        return $('textarea[data-testid="case-note-input"]');
    }

    get addNoteButton() {
        return $('button[data-testid="case-note-add-button"]');
    }

    // Events Card
    get eventsSection() {
        return $('//*[contains(normalize-space(.), "Events")]');
    }

    get eventInput() {
        return $('input[data-testid="event-input"]');
    }

    get addEventButton() {
        return $('//button[contains(normalize-space(.), "Add Event")]');
    }

    get eventDateInput() {
        return $('input[name="eventDate"], input[name="date"], input[placeholder*="Select a date"]');
    }

    get eventCalendarButton() {
        return $('//button[.//*[name()="path" and contains(@d,"M14.5 3A2.5")]]');
    }

    get eventDueCheckbox() {
        return $('input[data-testid="event-due-checkbox"]');
    }

    get eventDescriptionTextarea() {
        return $('textarea[data-testid="event-description-textarea"]');
    }

    get saveEventButton() {
        return $('button[data-testid="event-save-button"]');
    }

    get editEventButton() {
        return $('//*[name()="path" and contains(@d,"M17.18 2.93")]/ancestor::button[1]');
    }

    get deleteEventButton() {
        return $('//*[name()="path" and contains(@d,"M8.5 4h3")]/ancestor::button[1]');
    }

    get closeEventButton() {
        return $('//div[@role="dialog" and .//*[contains(normalize-space(.), "Event")]]//button[@data-testid="event-cancel-button" or normalize-space()="Close"] | //button[@data-testid="event-cancel-button"] | //button[normalize-space()="Close"]');
    }

    get confirmDeleteNoButton() {
        return $('button[data-testid="confirmation-dialog-cancel-button"]');
    }

    get confirmDeleteYesButton() {
        return $('button[data-testid="confirmation-dialog-confirm-button"]');
    }

    // =============================
    // TABLE ROW CELL HELPERS
    // =============================

    getRowCells(rowElement) {
        return rowElement.$$('[role="gridcell"]');
    }

    getCaseName(rowElement) {
        return rowElement.$('[role="gridcell"]:first-child button.fui-Link');
    }

    getCaseType(rowElement) {
        return rowElement.$$('[role="gridcell"]')[1].$('span');
    }

    getRetainedBy(rowElement) {
        return rowElement.$$('[role="gridcell"]')[2].$('.fui-Persona__primaryText');
    }

    getStatus(rowElement) {
        return rowElement.$$('[role="gridcell"]')[3].$('span');
    }

    // =============================
    // CLICK/INTERACTION HELPERS
    // =============================

    async clickElement(element) {
        const resolvedElement = await element;

        try {
            await resolvedElement.waitForExist({ timeout: 10000 });
            await resolvedElement.click();
        } catch (error) {
            const stillExists = await resolvedElement.isExisting().catch(() => false);
            if (!stillExists) {
                throw error;
            }

            await browser.execute((el) => {
                if (el && typeof el.click === "function") {
                    el.click();
                    return;
                }

                if (el && typeof el.dispatchEvent === "function") {
                    el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
                }
            }, resolvedElement);
        }
    }

    async scrollIntoView(element) {
        const resolvedElement = await element;
        await browser.execute((el) => {
            el.scrollIntoView({ block: "center", inline: "center" });
        }, resolvedElement);
    }

    async typeIntoField(element, text) {
        const resolvedElement = await element;
        await resolvedElement.waitForExist({ timeout: 10000 });
        await resolvedElement.clearValue();
        await resolvedElement.setValue(text);
    }

    async selectComboboxValue(element, value) {
        const input = await element;
        await input.waitForDisplayed({ timeout: 10000 });
        await this.scrollIntoView(input);
        await this.clickElement(input);
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");
        await input.clearValue();
        await input.setValue(value);

        const escapedValue = value.replace(/"/g, '\\"');
        const exactOption = await $(`//*[@role="option" and (normalize-space(.)="${escapedValue}" or .//*[normalize-space(.)="${escapedValue}"])]`);
        const containsOption = await $(`//*[@role="option" and contains(normalize-space(.), "${escapedValue}")]`);

        if (await exactOption.isDisplayed().catch(() => false)) {
            await this.clickElement(exactOption);
        } else if (await containsOption.isDisplayed().catch(() => false)) {
            await this.clickElement(containsOption);
        } else {
            await browser.pause(300);
            await browser.keys("ArrowDown");
            await browser.pause(150);
            await browser.keys("Enter");
        }

        await browser.pause(250);
    }

    // =============================
    // SEARCH & VISIBILITY
    // =============================

    async waitForMyCasesSection() {
        await browser.waitUntil(async () => {
            const sectionVisible = await this.myCasesSection.isDisplayed().catch(() => false);
            const headingVisible = await this.myCasesHeading.isDisplayed().catch(() => false);
            const searchVisible = await this.searchInput.isDisplayed().catch(() => false);
            return sectionVisible || headingVisible || searchVisible;
        }, {
            timeout: 10000,
            timeoutMsg: "My Cases section did not load"
        });
    }

    async waitForCaseTable() {
        await browser.waitUntil(async () => {
            const tableVisible = await this.caseTable.isDisplayed().catch(() => false);
            const emptyVisible = await this.emptyStateMessage.isDisplayed().catch(() => false);
            return tableVisible || emptyVisible;
        }, {
            timeout: 10000,
            timeoutMsg: "Neither case table nor empty state is visible"
        });
    }

    async isCaseTableVisible() {
        return await this.caseTable.isDisplayed().catch(() => false);
    }

    async isEmptyStateVisible() {
        return await this.emptyStateMessage.isDisplayed().catch(() => false);
    }

    async waitForCreateCaseModal() {
        await browser.waitUntil(async () => {
            const caseNameVisible = await this.caseNameInput.isDisplayed().catch(() => false);
            const modalVisible = await this.createCaseModal.isDisplayed().catch(() => false);
            return caseNameVisible || modalVisible;
        }, {
            timeout: 10000,
            timeoutMsg: "Create Case form did not open in time"
        });
    }

    async searchCases(searchText) {
        const input = await this.searchInput;
        await input.waitForDisplayed({ timeout: 10000 });
        await this.typeIntoField(input, searchText);
        await browser.pause(500);
    }

    async clickSearchInfoButton() {
        const button = await this.searchInfoButton;
        await this.clickElement(button);
    }

    async clickRetainedByInfoButton() {
        const button = await this.retainedByInfoButton;
        await this.clickElement(button);
        await browser.pause(300);
        await browser.keys('Escape');
    }

    async clickStatusInfoButton() {
        const button = await this.statusInfoButton;
        await this.clickElement(button);
        await browser.pause(300);
        await browser.keys('Escape');
    }

    // =============================
    // CREATE CASE BUTTON & FLOW
    // =============================

    async clickCreateCaseButton() {
        const createFormAlreadyOpen = await this.caseNameInput.isDisplayed().catch(() => false);
        if (createFormAlreadyOpen) {
            return;
        }

        await this.waitForMyCasesSection();

        const searchField = await this.searchInput;
        if (await searchField.isDisplayed().catch(() => false)) {
            await searchField.clearValue();
            await browser.pause(250);
        }

        const candidateButtons = await $$('//button[@data-testid="my-cases-create-case-button"] | //button[contains(normalize-space(.), "Create Case")]');
        let clicked = false;

        for (const button of candidateButtons) {
            if (await button.isDisplayed().catch(() => false)) {
                await this.scrollIntoView(button);
                await this.clickElement(button);
                clicked = true;
                break;
            }
        }

        if (!clicked) {
            throw new Error('Could not find a visible "Create Case" button');
        }

        await this.waitForCreateCaseModal();
    }

    async clickCaseByName(caseName) {
        const links = await this.caseNameLinks;
        for (const link of links) {
            const text = await link.getText();
            if (text.trim() === caseName.trim()) {
                await this.clickElement(link);
                return;
            }
        }
        throw new Error(`Case "${caseName}" not found in table`);
    }

    async getCaseCount() {
        try {
            const rows = await this.caseTable.$$('[role="row"]');
            return rows.length;
        } catch {
            return 0;
        }
    }

    async getVisibleCaseNames() {
        const links = await this.caseNameLinks;
        const names = [];
        for (const link of links) {
            const text = await link.getText();
            names.push(text.trim());
        }
        return names;
    }

    // =============================
    // APPLY TEMPLATE
    // =============================

    async selectTemplate(templateName) {
        const button = await this.applyTemplateButton;
        await this.clickElement(button);
        
        const option = await this.getTemplateOption(templateName);
        await this.clickElement(option);
    }

    // =============================
    // CASE INFO FIELDS
    // =============================

    async enterCaseName(caseName) {
        const input = await this.caseNameInput;
        await this.typeIntoField(input, caseName);
    }

    async clickVisibleCalendarButton(text, side, { allowDisabled = false } = {}) {
        const clicked = await browser.execute((buttonText, preferredSide, includeDisabled) => {
            const isVisible = (element) => {
                if (!element) {
                    return false;
                }

                const style = window.getComputedStyle(element);
                const rect = element.getBoundingClientRect();
                return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
            };

            const popup = Array.from(document.querySelectorAll('[role="dialog"], [role="presentation"], body *'))
                .filter(isVisible)
                .filter((element) => element.querySelector && element.querySelector('[role="grid"] button, button[role="gridcell"]'))
                .sort((left, right) => {
                    const leftRect = left.getBoundingClientRect();
                    const rightRect = right.getBoundingClientRect();
                    return (rightRect.width * rightRect.height) - (leftRect.width * leftRect.height);
                })[0];

            if (!popup) {
                return false;
            }

            const popupRect = popup.getBoundingClientRect();
            const popupMidpoint = popupRect.left + (popupRect.width / 2);

            const candidates = Array.from(popup.querySelectorAll('button, [role="gridcell"]'))
                .filter(isVisible)
                .filter((element) => (element.textContent || "").trim() === buttonText)
                .filter((element) => includeDisabled || element.getAttribute('aria-disabled') !== 'true')
                .map((element) => ({
                    element,
                    rect: element.getBoundingClientRect()
                }))
                .filter(({ rect }) => preferredSide === 'right'
                    ? (rect.left + (rect.width / 2)) > popupMidpoint
                    : (rect.left + (rect.width / 2)) < popupMidpoint)
                .sort((left, right) => left.rect.top - right.rect.top || left.rect.left - right.rect.left);

            if (!candidates.length) {
                return false;
            }

            candidates[0].element.click();
            return true;
        }, text, side, allowDisabled);

        if (!clicked) {
            throw new Error(`Could not click calendar button "${text}" on the ${side} side of the picker`);
        }
    }

    async selectRetainedDate(month, day) {
        const dateInput = await this.retainedDateInput;
        await this.clickElement(dateInput);
        await browser.pause(500);

        // Wait for the calendar popup (any role="grid" with gridcell buttons) to appear.
        await browser.waitUntil(async () => {
            return await $('//*[@role="grid"]//button[@role="gridcell"]').isExisting().catch(() => false);
        }, { timeout: 8000, timeoutMsg: 'Calendar popup did not appear for retained date' });

        await browser.waitUntil(async () => {
            try {
                await this.clickVisibleCalendarButton(month, 'right', { allowDisabled: true });
                return true;
            } catch {
                return false;
            }
        }, { timeout: 5000, timeoutMsg: `Month button "${month}" did not appear on the right side of the retained date picker` });

        await browser.waitUntil(async () => {
            const exists = await browser.execute((buttonText) => {
                const isVisible = (element) => {
                    if (!element) {
                        return false;
                    }

                    const style = window.getComputedStyle(element);
                    const rect = element.getBoundingClientRect();
                    return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
                };

                const grids = Array.from(document.querySelectorAll('[role="grid"]')).filter(isVisible);
                if (!grids.length) {
                    return false;
                }

                const leftGrid = grids
                    .map((grid) => ({ grid, rect: grid.getBoundingClientRect() }))
                    .sort((left, right) => left.rect.left - right.rect.left)[0]?.grid;

                if (!leftGrid) {
                    return false;
                }

                return Array.from(leftGrid.querySelectorAll('button, [role="gridcell"]')).some((element) => {
                    const text = (element.textContent || '').trim();
                    return text === buttonText && element.getAttribute('aria-disabled') !== 'true' && isVisible(element);
                });
            }, day);

            return exists;
        }, { timeout: 5000, timeoutMsg: `Day button "${day}" did not appear after selecting month "${month}"` });

        const dayByAria = await $(`//button[not(@aria-disabled="true") and contains(@aria-label, "${month} ${day}")]`);
        if (await dayByAria.isExisting().catch(() => false)) {
            await browser.execute((el) => el.click(), dayByAria);
        } else {
            const dayCell = await $(
                `//td[@role="gridcell"]//button[normalize-space(text())="${day}" and not(@aria-disabled="true")] | ` +
                `//button[@role="gridcell" and normalize-space(text())="${day}" and not(@aria-disabled="true")]`
            );

            if (await dayCell.isExisting().catch(() => false)) {
                await browser.execute((el) => el.click(), dayCell);
            } else {
                const anyDayBtn = await $(`//button[normalize-space(text())="${day}" and not(@aria-disabled="true")]`);
                if (await anyDayBtn.isExisting().catch(() => false)) {
                    await browser.execute((el) => el.click(), anyDayBtn);
                } else {
                    throw new Error(`Could not find a clickable day button for ${month} ${day}`);
                }
            }
        }

        await browser.waitUntil(async () => {
            const fieldText = await this.retainedDateField.getText().catch(() => '');
            const placeholder = fieldText.includes('Select a date');
            return !placeholder && fieldText.includes(month) && fieldText.includes(day);
        }, {
            timeout: 5000,
            timeoutMsg: `Retained date field did not update to ${month} ${day}`
        });

        await browser.keys('Escape').catch(() => {});
        await browser.pause(200);
    }

    async selectCaseType(caseType) {
        await this.selectComboboxValue(this.caseTypeCombobox, caseType);
    }

    async selectStatus(status) {
        await this.selectComboboxValue(this.statusCombobox, status);
    }

    // =============================
    // RETAINED BY / PARTY MANAGEMENT
    // =============================

    async selectPartyFromDropdown(partyName) {
        await this.closeOpenDialogs();
        await this.selectComboboxValue(this.partyCombobox, partyName);
    }

    async clickAddContactButton() {
        await browser.pause(300);

        const primary = await $('button[data-testid="party-control-add-contact-button"]');

        if (await primary.isExisting().catch(() => false)) {
            try {
                await this.scrollIntoView(primary);
                await primary.click();
                await browser.pause(300);
                return;
            } catch (error) {
                // fall through to DOM click fallback
            }
        }

        await browser.execute(() => {
            const selector = 'button[data-testid="party-control-add-contact-button"], button';
            const candidates = Array.from(document.querySelectorAll(selector));

            const target = candidates.find((candidate) => {
                const text = (candidate.textContent || '').trim();
                const rect = candidate.getBoundingClientRect();
                const isVisible = rect.width > 0 && rect.height > 0;
                return isVisible && text.includes('Add Contact');
            });

            if (target) {
                target.click();
            }
        });

        await browser.pause(300);

        const addContactDialogVisible = await $('//*[contains(normalize-space(.), "Add Contact")]').isDisplayed().catch(() => false);
        if (!addContactDialogVisible) {
            // Some selected clients may not expose Add Contact; continue without failing the full flow.
            return false;
        }

        return true;
    }

    async closeAddContactModal() {
        const cancelButton = await this.addContactCancelButton;
        if (await cancelButton.isDisplayed().catch(() => false)) {
            await this.clickElement(cancelButton);
            await browser.pause(300);
            return;
        }

        const createClientCancel = await $('//div[@role="dialog" and .//*[contains(normalize-space(.), "Create New Client") or contains(normalize-space(.), "3rd Party")]]//button[contains(normalize-space(.), "Cancel")]');
        if (await createClientCancel.isDisplayed().catch(() => false)) {
            await this.clickElement(createClientCancel);
            await browser.pause(300);
        }
    }

    async closeOpenDialogs() {
        for (let attempt = 0; attempt < 8; attempt++) {
            const closedTopDialog = await browser.execute(() => {
                const isVisible = (el) => {
                    if (!el) {
                        return false;
                    }
                    const rect = el.getBoundingClientRect();
                    return rect.width > 0 && rect.height > 0;
                };

                const dialogs = Array.from(document.querySelectorAll('[role="dialog"]')).filter(isVisible);
                if (!dialogs.length) {
                    return false;
                }

                const topDialog = dialogs[dialogs.length - 1];
                const buttons = Array.from(topDialog.querySelectorAll('button')).filter(isVisible);

                const preferred = buttons.find((button) => {
                    const testId = (button.getAttribute('data-testid') || '').toLowerCase();
                    const text = (button.textContent || '').trim().toLowerCase();

                    if (testId.includes('cancel') || testId.includes('close')) {
                        return true;
                    }

                    return text === 'cancel' || text === 'close' || text === 'no';
                });

                if (preferred) {
                    preferred.click();
                    return true;
                }

                const closeIconButton = buttons.find((button) => {
                    const aria = (button.getAttribute('aria-label') || '').toLowerCase();
                    return aria.includes('close');
                });

                if (closeIconButton) {
                    closeIconButton.click();
                    return true;
                }

                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                return true;
            });

            if (!closedTopDialog) {
                break;
            }

            await browser.pause(250);
        }
    }

    async ensureEventDialogClosed() {
        for (let attempt = 0; attempt < 4; attempt++) {
            const eventDialogOpen = await $('//div[@role="dialog" and .//*[contains(normalize-space(.), "Edit Event") or contains(normalize-space(.), "Add Event")]]').isDisplayed().catch(() => false);
            if (!eventDialogOpen) {
                return;
            }

            await this.closeOpenDialogs();
            await browser.pause(250);
        }
    }

    // =============================
    // BILLING SECTION
    // =============================

    async toggleFixedFeeSwitch() {
        const switchElement = await this.fixedFeeSwitch;
        await this.clickElement(switchElement);
    }

    async enterFixedFeeAmount(amount) {
        const input = await this.fixedFeeAmountInput;
        await this.typeIntoField(input, amount);
    }

    // =============================
    // DESCRIPTION & OVERVIEW
    // =============================

    async enterDescription(description) {
        const textarea = await this.descriptionTextarea;
        await this.typeIntoField(textarea, description);
    }

    async enterOverview(overview) {
        const field = await this.overviewField;
        await this.typeIntoField(field, overview);
    }

    // =============================
    // ASSIGN TO USERS
    // =============================

    async clickAssignCaseButton() {
        await this.closeOpenDialogs();
        await this.ensureEventDialogClosed();
        const candidates = await $$('//button[@data-testid="assign-case-button"] | //button[starts-with(@data-testid,"link-button-") and contains(normalize-space(.), "Assign Case")] | //button[contains(normalize-space(.), "Assign Case")]');
        for (const button of candidates) {
            if (await button.isDisplayed().catch(() => false)) {
                await this.scrollIntoView(button);
                await this.clickElement(button);
                await browser.pause(500);
                return;
            }
        }

        const fallbackButton = await this.assignCaseButton;
        await this.clickElement(fallbackButton);
        await browser.pause(500);
    }

    async selectUserByName(userName) {
        const escapedName = userName.replace(/"/g, '\\"');
        const container = await $(
            `//*[self::tr or self::div or self::label][.//*[contains(normalize-space(.), "${escapedName}")] or contains(normalize-space(.), "${escapedName}")][1]`
        );

        await container.waitForExist({ timeout: 10000 });
        await this.scrollIntoView(container);
        await browser.pause(200);

        const checkbox = await container.$('.//input[@type="checkbox"]');
        if (await checkbox.isExisting().catch(() => false)) {
            await this.scrollIntoView(checkbox);
            await this.clickElement(checkbox);
            return;
        }

        await this.clickElement(container);
    }

    async selectAllAssignableUsers() {
        const checkboxes = await this.assignUsersCheckboxes;

        for (const checkbox of checkboxes) {
            const isSelected = await checkbox.isSelected().catch(() => false);
            if (!isSelected) {
                await this.scrollIntoView(checkbox);
                await this.clickElement(checkbox);
                await browser.pause(100);
            }
        }
    }

    async clickSelectUsersButton() {
        // Prefer the submit button scoped to the Assign Case dialog.
        const dialogBtn = await $('//div[@role="dialog"][.//*[contains(normalize-space(.), "Assign Case")]]//button[@data-testid="select-users-dialog-submit"]');
        if (await dialogBtn.isDisplayed().catch(() => false)) {
            await this.scrollIntoView(dialogBtn);
            await this.clickElement(dialogBtn);
            return;
        }
        // Fallback: any visible "Select Users" button.
        const candidates = await $$('//button[contains(normalize-space(.), "Select Users")]');
        for (const candidate of candidates) {
            if (await candidate.isDisplayed().catch(() => false)) {
                await this.scrollIntoView(candidate);
                await this.clickElement(candidate);
                return;
            }
        }
        const button = await this.selectUsersButton;
        await this.scrollIntoView(button);
        await this.clickElement(button);
    }

    async clickCancelUsersButton() {
        // Prefer the cancel button scoped to the Assign Case dialog.
        const dialogBtn = await $('//div[@role="dialog"][.//*[contains(normalize-space(.), "Assign Case")]]//button[@data-testid="select-users-dialog-cancel"]');
        if (await dialogBtn.isDisplayed().catch(() => false)) {
            await this.scrollIntoView(dialogBtn);
            await this.clickElement(dialogBtn);
            return;
        }
        // Fallback: Cancel button within the users dialog (identified by its Submit sibling).
        const fallbackBtn = await $('//div[@role="dialog"][.//button[@data-testid="select-users-dialog-submit"] or .//button[contains(normalize-space(.), "Select Users")]]//button[contains(normalize-space(.), "Cancel")]');
        if (await fallbackBtn.isDisplayed().catch(() => false)) {
            await this.scrollIntoView(fallbackBtn);
            await this.clickElement(fallbackBtn);
            return;
        }
        const button = await this.cancelUsersButton;
        await this.scrollIntoView(button);
        await this.clickElement(button);
    }

    // =============================
    // AFFILIATED PARTY MANAGEMENT
    // =============================

    async clickAddAffiliatedPartyButton() {
        await this.closeOpenDialogs();
        await this.ensureEventDialogClosed();
        const buttons = await $$('//button[not(ancestor::*[@role="dialog"]) and (@data-testid="add-affiliated-party-button" or (starts-with(@data-testid,"link-button-") and contains(normalize-space(.), "Add Affiliated Party")) or contains(normalize-space(.), "Add Affiliated Party"))]');
        for (const btn of buttons) {
            const text = await btn.getText().catch(() => "");
            const visible = await btn.isDisplayed().catch(() => false);
            if (visible && text.includes("Add Affiliated Party")) {
                await this.clickElement(btn);
                return;
            }
        }

        const fallback = await this.addAffiliatedPartyButton;
        if (await fallback.isDisplayed().catch(() => false)) {
            await this.clickElement(fallback);
            return;
        }

        throw new Error("Add Affiliated Party button not found");
    }

    async selectAffiliatedPartyOption(partyName) {
        const container = await $(`//*[self::div or self::label][.//*[contains(normalize-space(.), "${partyName}")] or contains(normalize-space(.), "${partyName}")][1]`);
        await container.waitForDisplayed({ timeout: 10000 });

        const checkbox = await container.$('.//input[@type="checkbox"]');
        if (await checkbox.isExisting().catch(() => false)) {
            await this.clickElement(checkbox);
            return;
        }

        await this.clickElement(container);
    }

    async selectAllAffiliatedParties() {
        const checkboxes = await this.affiliatedPartyDialogCheckboxes;

        for (const checkbox of checkboxes) {
            const isSelected = await checkbox.isSelected().catch(() => false);
            if (!isSelected) {
                await this.scrollIntoView(checkbox);
                await this.clickElement(checkbox);
                await browser.pause(100);
            }
        }
    }

    async clickSubmitAffiliatedPartyButton() {
        const button = await this.submitAffiliatedPartyButton;
        await this.clickElement(button);
    }

    async clickCancelAffiliatedPartyButton() {
        const button = await this.cancelAffiliatedPartyButton;
        await this.clickElement(button);
    }

    async clickAddNewPartyButton() {
        const button = await this.addNewPartyButton;
        await this.clickElement(button);
        await browser.pause(500);
    }

    async isCreateNewPartyDialogOpen() {
        return await this.createNewPartyDialog.isDisplayed().catch(() => false);
    }

    async openCreateNewPartyDialog() {
        await this.clickCreateCaseButton();
        await this.waitForCreateCaseModal();
        await this.clickAddAffiliatedPartyButton();
        await this.clickAddNewPartyButton();
        await this.createNewPartyDialog.waitForDisplayed({ timeout: 10000 });
    }

    async ensureCreateNewPartyDialogOpen() {
        const open = await this.isCreateNewPartyDialogOpen();
        if (open) {
            return;
        }

        await this.openCreateNewPartyDialog();
    }

    async ensurePhoneDialogOpen() {
        const phoneOpen = await this.phoneNumberInput.isDisplayed().catch(() => false);
        if (phoneOpen) {
            return;
        }

        await this.clickAddPhoneNumberButton();
        await this.phoneNumberInput.waitForDisplayed({ timeout: 10000 });
    }

    // =============================
    // CREATE NEW PARTY FORM
    // =============================

    async fillPartyName(name) {
        const input = await this.partyNameInput;
        await this.typeIntoField(input, name);
    }

    async fillPartyAddress(address) {
        const input = await this.partyAddressInput;
        await this.typeIntoField(input, address);
    }

    async fillPartyAddress2(address2) {
        const input = await this.partyAddress2Input;
        await this.typeIntoField(input, address2);
    }

    async fillPartyCity(city) {
        const input = await this.partyCityInput;
        await this.typeIntoField(input, city);
    }

    async fillPartyState(state) {
        const input = await this.partyStateInput;
        await this.typeIntoField(input, state);
    }

    async fillPartyZip(zip) {
        const input = await this.partyZipInput;
        await this.typeIntoField(input, zip);
    }

    async fillPartyUrl(url) {
        const input = await this.partyUrlInput;
        await this.typeIntoField(input, url);
    }

    // =============================
    // PHONE NUMBER MANAGEMENT
    // =============================

    async clickAddPhoneNumberButton() {
        const button = await this.addPhoneNumberButton;
        await this.clickElement(button);
        await browser.pause(500);
    }

    async togglePhonePrimary() {
        const switchElement = await this.phonePrimarySwitch;
        await this.scrollIntoView(switchElement);
        await this.clickElement(switchElement);
    }

    async enterPhoneNumber(number) {
        const input = await this.phoneNumberInput;
        await this.typeIntoField(input, number);
    }

    async selectPhoneType(phoneType) {
        await this.selectComboboxValue(this.phoneTypeCombobox, phoneType);
    }

    async clickSubmitPhoneButton() {
        const button = await this.submitPhoneButton;
        await this.clickElement(button);
    }

    async clickCancelPhoneButton() {
        const button = await this.cancelPhoneButton;
        await this.clickElement(button);
    }

    // =============================
    // NOTES CARD
    // =============================

    async addCaseNote(noteText) {
        const noteInput = await this.caseNoteInput;
        await noteInput.waitForDisplayed({ timeout: 10000 });
        await this.typeIntoField(noteInput, noteText);
        const button = await this.addNoteButton;
        await this.clickElement(button);
    }

    // =============================
    // EVENTS CARD
    // =============================

    async enterEventName(eventText) {
        const addEvent = await this.addEventButton;
        if (await addEvent.isDisplayed().catch(() => false)) {
            await this.clickElement(addEvent);
            await browser.pause(300);
        }

        const input = await this.eventInput;
        await input.waitForDisplayed({ timeout: 10000 });
        await this.typeIntoField(input, eventText);
    }

    async selectEventDate(month, day) {
        const calendarButton = await this.eventCalendarButton;
        if (await calendarButton.isExisting()) {
            await this.clickElement(calendarButton);
        } else {
            const input = await this.eventDateInput;
            await this.clickElement(input);
        }
        await browser.pause(400);

        // Wait for the calendar popup to appear.
        await browser.waitUntil(async () => {
            return await $('//*[@role="grid"]//button[@role="gridcell"]').isExisting().catch(() => false);
        }, { timeout: 8000, timeoutMsg: 'Calendar popup did not appear for event date' });

        const monthButton = await this.getMonthButton(month);
        await monthButton.waitForExist({ timeout: 5000 });
        await this.scrollIntoView(monthButton);
        await this.clickElement(monthButton);
        await browser.pause(400);

        const dayButton = await this.getDateButton(day);
        await dayButton.waitForExist({ timeout: 5000 });
        await this.scrollIntoView(dayButton);
        await this.clickElement(dayButton);
        await browser.pause(200);
    }

    async toggleEventDueCheckbox() {
        const checkbox = await this.eventDueCheckbox;
        await this.clickElement(checkbox);
    }

    async enterEventDescription(description) {
        const textarea = await this.eventDescriptionTextarea;
        await this.typeIntoField(textarea, description);
    }

    async saveEvent() {
        const button = await this.saveEventButton;
        await this.clickElement(button);
        await browser.pause(500);
    }

    async hoverEventsSection() {
        const section = await this.eventsSection;
        await section.moveTo();
    }

    async clickEditEvent() {
        await this.closeOpenDialogs();
        await this.hoverEventsSection();
        await this.clickElement(this.editEventButton);
    }

    async closeEventEditor() {
        const button = await this.closeEventButton;
        if (await button.isDisplayed().catch(() => false)) {
            await this.clickElement(button);
            await browser.pause(250);
        }

        await this.closeOpenDialogs();
    }

    async clickDeleteEvent() {
        await this.closeOpenDialogs();
        await this.ensureEventDialogClosed();
        await this.hoverEventsSection();
        await this.clickElement(this.deleteEventButton);
    }

    async cancelDeleteEvent() {
        const button = await this.confirmDeleteNoButton;
        await this.clickElement(button);
    }

    async confirmDeleteEvent() {
        const button = await this.confirmDeleteYesButton;
        await this.clickElement(button);
    }

    async runTemplateRefreshSequence() {
        await this.selectTemplate("Pikachu");
        await browser.pause(500);
        await this.selectTemplate("You're the Best Around");
        await browser.pause(500);
        await this.selectTemplate("You're the Best Around-Copy");
        await browser.pause(500);
    }

    async goBackToDashboardWithBrowserBack() {
        await browser.back();
        await browser.pause(800);
    }

    async getVisibleCaseNames() {
        const links = await this.caseNameLinks;
        const names = [];
        for (const link of links) {
            const text = await link.getText();
            names.push(text.trim());
        }
        return names;
    }
}

export default new DashboardMyCasesPage();

