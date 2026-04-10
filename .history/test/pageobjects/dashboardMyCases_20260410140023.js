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

    get calendarPicker() {
        return $('[role="grid"][aria-label*="April"]');
    }

    get datePickerMonthYear() {
        return $('button[aria-label*="change year"]');
    }

    getMonthButton(month) {
        return $(`//button[@role="gridcell" and normalize-space()="${month}"] | //button[@aria-label="${month}"]`);
    }

    getDateButton(day) {
        return $(`//button[.//span[normalize-space()="${day}"]] | //*[@role="grid"]//*[normalize-space()="${day}"]/ancestor::button[1]`);
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
        return $('button[data-testid="link-button-"]');
    }

    // User Dialog
    get userCheckboxes() {
        return $$('input[type="checkbox"][id^="checkbox-"]');
    }

    get selectUsersButton() {
        return $('button[data-testid="select-users-dialog-submit"]');
    }

    get cancelUsersButton() {
        return $('button[data-testid="select-users-dialog-cancel"]');
    }

    get assignUsersDialog() {
        return $('//div[.//*[contains(normalize-space(.), "Assign Case To")] and .//button[@data-testid="select-users-dialog-submit"]]');
    }

    get assignUsersCheckboxes() {
        return this.assignUsersDialog.$$('.//input[@type="checkbox"]');
    }

    // Add Affiliated Party
    get addAffiliatedPartyButton() {
        return $('button[data-testid="link-button-"]');
    }

    get affiliatedPartyPersonas() {
        return $$('div.fui-Persona');
    }

    get affiliatedPartyCheckboxes() {
        return $$('.fui-Persona input[type="checkbox"]');
    }

    get submitAffiliatedPartyButton() {
        return $('button[data-testid="affiliated-party-dialog-add-party-button"]');
    }

    get cancelAffiliatedPartyButton() {
        return $('button[data-testid="affiliated-party-dialog-cancel-button"]');
    }

    get addNewPartyButton() {
        return $('button[data-testid="affiliated-party-dialog-add-new-party-button"]');
    }

    get affiliatedPartyDialog() {
        return $('//div[.//*[contains(normalize-space(.), "Add Affiliated Party")] and .//button[@data-testid="affiliated-party-dialog-add-party-button"]]');
    }

    get affiliatedPartyDialogCheckboxes() {
        return this.affiliatedPartyDialog.$$('.//input[@type="checkbox"]');
    }

    // Create New Party / Client Form
    get partyNameInput() {
        return $('input[data-testid="party-dialog-name-input"]');
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
        return $('button[data-testid="event-cancel-button"]');
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
        await this.clickElement(input);
        await input.clearValue();
        await input.setValue(value);
        await browser.pause(400);
        await browser.keys("ArrowDown");
        await browser.pause(150);
        await browser.keys("Enter");
        await browser.pause(300);
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

    async selectRetainedDate(month, day) {
        const dateInput = await this.retainedDateInput;
        await this.clickElement(dateInput);
        await browser.pause(500);

        const monthBtn = await this.getMonthButton(month);
        await monthBtn.waitForExist({ timeout: 10000 });
        await this.clickElement(monthBtn);
        await browser.pause(300);

        const dayBtn = await this.getDateButton(day);
        await dayBtn.waitForExist({ timeout: 10000 });
        await this.clickElement(dayBtn);
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
        await this.selectComboboxValue(this.partyCombobox, partyName);
    }

    async clickAddContactButton() {
        await browser.pause(300);

        const buttons = await $$('//button[@data-testid="party-control-add-contact-button"] | //button[contains(normalize-space(.), "Add Contact")]');

        for (const button of buttons) {
            if (await button.isDisplayed().catch(() => false)) {
                try {
                    await button.waitForClickable({ timeout: 3000 });
                    await button.click();
                } catch (error) {
                    await browser.execute(() => {
                        const candidates = Array.from(document.querySelectorAll('button[data-testid="party-control-add-contact-button"]'));
                        const visible = candidates.find((candidate) => {
                            const rect = candidate.getBoundingClientRect();
                            return rect.width > 0 && rect.height > 0;
                        });

                        if (visible) {
                            visible.click();
                        }
                    });
                }

                await browser.pause(300);
                return;
            }
        }

        throw new Error('Could not find a visible "Add Contact" button');
    }

    async closeAddContactModal() {
        const cancelButton = await this.addContactCancelButton;
        if (await cancelButton.isDisplayed().catch(() => false)) {
            await this.clickElement(cancelButton);
            await browser.pause(300);
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
        const button = await this.assignCaseButton;
        await this.clickElement(button);
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
        const button = await this.selectUsersButton;
        await this.clickElement(button);
    }

    async clickCancelUsersButton() {
        const button = await this.cancelUsersButton;
        await this.clickElement(button);
    }

    // =============================
    // AFFILIATED PARTY MANAGEMENT
    // =============================

    async clickAddAffiliatedPartyButton() {
        const buttons = await $$('button[data-testid="link-button-"]');
        for (const btn of buttons) {
            const text = await btn.getText();
            if (text.includes("Add Affiliated Party")) {
                await this.clickElement(btn);
                return;
            }
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

        const monthButton = await this.getMonthButton(month);
        await this.clickElement(monthButton);
        await browser.pause(300);

        const dayButton = await this.getDateButton(day);
        await this.clickElement(dayButton);
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
        await this.hoverEventsSection();
        await this.clickElement(this.editEventButton);
    }

    async closeEventEditor() {
        const button = await this.closeEventButton;
        await this.clickElement(button);
    }

    async clickDeleteEvent() {
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