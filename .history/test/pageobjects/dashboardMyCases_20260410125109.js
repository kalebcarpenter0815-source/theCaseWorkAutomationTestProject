import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardMyCasesPage extends Page {
    // =============================
    // MY CASES CARD / SECTION
    // =============================

    get myCasesSection() {
        return $('//*[contains(normalize-space(.), "My Cases")]//ancestor::div[.//*[@role="grid"]][1]');
    }

    get myCasesHeading() {
        return $('//label//*[contains(normalize-space(.), "My Cases")]');
    }

    get searchInput() {
        return $('input[data-testid="search-input"]');
    }

    get searchInfoButton() {
        return $('[data-testid="search-input"]//following::button[svg/path[@d*="8 1a7"]][1]');
    }

    get createCaseButton() {
        return $('button[data-testid="my-cases-create-case-button"]');
    }

    get caseTable() {
        return $('[role="grid"]');
    }

    get caseNameLinks() {
        return $$('[role="grid"] button.fui-Link');
    }

    // =============================
    // CREATE CASE MODAL
    // =============================

    get createCaseModal() {
        return $('[role="dialog"]');
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
        return $(`button[aria-label^="${month}"]`);
    }

    getDateButton(day) {
        return $(`//*[@role="grid"]//span[contains(text(), "${day}")]`);
    }

    // Case Type Dropdown
    get caseTypeCombobox() {
        return $('input[data-testid="case-type-combobox"]');
    }

    getCaseTypeOption(optionName) {
        return $(`//*[contains(text(), "${optionName}")]/ancestor::*[@role="option"]`);
    }

    // Retained By (Party) Field
    get partyCombobox() {
        return $('input[data-testid="party-combobox"]');
    }

    get addContactButton() {
        return $('button[data-testid="party-control-add-contact-button"]');
    }

    getAddedPartyInfo() {
        return $('div.fui-Persona');
    }

    // Status Dropdown
    get statusCombobox() {
        return $('input[data-testid="case-status-combobox"]');
    }

    getStatusOption(statusName) {
        return $(`//*[contains(text(), "${statusName}")]/ancestor::*[@role="option"]`);
    }

    // Billing Section
    get fixedFeeSwitch() {
        return $('input[data-testid="case-info-card-fixed-fee-switch"]');
    }

    get estimatedHoursInput() {
        return $('input[data-testid*="estimated"]');
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
        return $('button[aria-label*="Phone"]') || $('button:has-text("Add Phone Number")');
    }

    // Phone Number Dialog
    get phoneNumberInput() {
        return $('input[data-testid="phone-dialog-number-input"]');
    }

    get phonePrimarySwitch() {
        return $('input[id^="field-r3nq"]');
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
        try {
            await element.click();
        } catch (error) {
            await browser.execute((el) => el.click(), element);
        }
    }

    async scrollIntoView(element) {
        const resolvedElement = await element;
        await browser.execute((el) => {
            el.scrollIntoView({ block: "center", inline: "center" });
        }, resolvedElement);
    }

    async typeIntoField(element, text) {
        await element.clearValue();
        await element.setValue(text);
    }

    // =============================
    // SEARCH & VISIBILITY
    // =============================

    async waitForMyCasesSection() {
        await this.myCasesSection.waitForDisplayed({ timeout: 10000 });
    }

    async waitForCaseTable() {
        await this.caseTable.waitForDisplayed({ timeout: 10000 });
    }

    async waitForCreateCaseModal() {
        await this.createCaseModal.waitForDisplayed({ timeout: 10000 });
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
        const button = await this.createCaseButton;
        await button.waitForDisplayed({ timeout: 10000 });
        await this.scrollIntoView(button);
        await this.clickElement(button);
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

        // Click month picker
        const monthYearBtn = await this.datePickerMonthYear;
        await this.clickElement(monthYearBtn);
        await browser.pause(300);

        // Select month
        const monthBtn = await this.getMonthButton(month);
        await this.clickElement(monthBtn);
        await browser.pause(300);

        // Select day
        const dayBtn = await this.getDateButton(day);
        await this.clickElement(dayBtn);
    }

    async selectCaseType(caseType) {
        const input = await this.caseTypeCombobox;
        await this.clickElement(input);
        
        const option = await this.getCaseTypeOption(caseType);
        await this.clickElement(option);
    }

    async selectStatus(status) {
        const input = await this.statusCombobox;
        await this.clickElement(input);
        
        const option = await this.getStatusOption(status);
        await this.clickElement(option);
    }

    // =============================
    // RETAINED BY / PARTY MANAGEMENT
    // =============================

    async selectPartyFromDropdown(partyName) {
        const input = await this.partyCombobox;
        await this.clickElement(input);
        await browser.pause(300);

        const options = await $$(`//span[contains(text(), "${partyName}")]`);
        if (options.length > 0) {
            await this.clickElement(options[0]);
        }
    }

    async clickAddContactButton() {
        const button = await this.addContactButton;
        await this.clickElement(button);
    }

    // =============================
    // BILLING SECTION
    // =============================

    async toggleFixedFeeSwitch() {
        const switchElement = await this.fixedFeeSwitch;
        await this.clickElement(switchElement);
    }

    async enterEstimatedHours(hours) {
        const input = await this.estimatedHoursInput;
        await this.typeIntoField(input, hours);
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
        const checkboxes = await this.userCheckboxes;
        const parentElements = [];
        
        for (const checkbox of checkboxes) {
            const parent = await checkbox.parentElement();
            const text = await parent.getText();
            if (text.includes(userName)) {
                await this.clickElement(checkbox);
                return;
            }
        }
        throw new Error(`User "${userName}" not found`);
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
        const personas = await this.affiliatedPartyPersonas;
        for (const persona of personas) {
            const text = await persona.getText();
            if (text.includes(partyName)) {
                const checkbox = await persona.$('input[type="checkbox"]');
                await this.clickElement(checkbox);
                return;
            }
        }
        throw new Error(`Affiliated party "${partyName}" not found`);
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
        await this.clickElement(switchElement);
    }

    async enterPhoneNumber(number) {
        const input = await this.phoneNumberInput;
        await this.typeIntoField(input, number);
    }

    async selectPhoneType(phoneType) {
        const input = await this.phoneTypeCombobox;
        await this.clickElement(input);
        await browser.pause(300);

        const options = await $$(`//span[contains(text(), "${phoneType}")]`);
        if (options.length > 0) {
            await this.clickElement(options[0]);
        }
    }

    async clickSubmitPhoneButton() {
        const button = await this.submitPhoneButton;
        await this.clickElement(button);
    }

    async clickCancelPhoneButton() {
        const button = await this.cancelPhoneButton;
        await this.clickElement(button);
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
}

export default new DashboardMyCasesPage();