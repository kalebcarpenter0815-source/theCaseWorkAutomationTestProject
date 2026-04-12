import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardClientsThirdPartiesPage extends Page {
    get clientsSidebarButton() {
        return $(
            '//button[@data-testid="vert-nav-clients-parties"] | //a[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")] | //button[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")]'
        );
    }

    get pageTitle() {
        return $('//h1[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")]');
    }

    get searchLabel() {
        return $('//label[contains(normalize-space(.), "Search")] | //span[contains(normalize-space(.), "Search")]');
    }

    get searchInput() {
        return $(
            '//input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "search clients/3rd parties") or contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "search clients") or contains(translate(@aria-label, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "search")]'
        );
    }

    get searchInfoButton() {
        return $('//*[contains(normalize-space(.), "Search")]/following::button[1]');
    }

    get createButton() {
        return $('//button[normalize-space(.)="Create" or .//*[contains(normalize-space(.), "Create")]]');
    }

    get tableGrid() {
        return $('[role="grid"], table');
    }

    get nameColumnHeader() {
        return $('//*[(@role="columnheader" or self::th) and contains(normalize-space(.), "Name")]');
    }

    get addressColumnHeader() {
        return $('//*[(@role="columnheader" or self::th) and contains(normalize-space(.), "Address")]');
    }

    get dataRows() {
        return $$('//div[@role="row"][.//*[@role="gridcell"]] | //tr[td]');
    }

    get rowActionButtons() {
        return $$('//button[contains(@aria-label, "More") or contains(@aria-label, "Edit") or contains(@aria-label, "Delete") or @title="Edit" or @title="Delete"]');
    }

    get clientCheckboxBtns() {
        return $$('//div[@role="row"][.//*[@role="gridcell"]]//input[@type="checkbox"] | //tr[td]//input[@type="checkbox"]');
    }

    get emptyStateMessage() {
        return $('//*[contains(normalize-space(.), "No clients") or contains(normalize-space(.), "No results") or contains(normalize-space(.), "No data")]');
    }

    get clientEditButton() {
        return $('//button[normalize-space(.)="Edit" or contains(@aria-label, "Edit")]');
    }

    get clientDeleteButton() {
        return $('//button[normalize-space(.)="Delete" or contains(@aria-label, "Delete")]');
    }

    get doNotDeleteButtonCard() {
        return $('//button[normalize-space(.)="No" or normalize-space(.)="Cancel"]');
    }

    get editPageHeading() {
        return $('//h1[contains(normalize-space(.), "Edit") or contains(normalize-space(.), "Create New Client / 3rd Party") or contains(normalize-space(.), "Client / 3rd Party")] | //h2[contains(normalize-space(.), "Edit") or contains(normalize-space(.), "Create New Client / 3rd Party") or contains(normalize-space(.), "Client / 3rd Party")]');
    }

    get breadcrumbClientsLink() {
        return $('//a[contains(normalize-space(.), "Clients/Parties") or contains(normalize-space(.), "Clients / 3rd Parties")] | //nav//*[contains(normalize-space(.), "Clients/Parties") or contains(normalize-space(.), "Clients / 3rd Parties")]');
    }

    get cancelEditButton() {
        return $('//button[normalize-space(.)="Cancel" or .//*[contains(normalize-space(.), "Cancel")]]');
    }

    get submitEditButton() {
        return $('//button[normalize-space(.)="Submit" or .//*[contains(normalize-space(.), "Submit")]]');
    }

    get editPartyNameInput() {
        return $('//input[@data-testid="party-dialog-name-input"] | //input[contains(@placeholder, "name of the Client / 3rd Party")] | //label[contains(normalize-space(.), "Party Name")]/following::input[1]');
    }

    get editUrlInput() {
        return $('//input[@data-testid="party-dialog-url-input"] | //input[@placeholder="Enter Url"] | //label[contains(normalize-space(.), "Url")]/following::input[1]');
    }

    get editAddressInput() {
        return $('//input[@data-testid="party-dialog-address1-input"] | //input[@placeholder="Enter Address"] | //label[contains(normalize-space(.), "Address") and not(contains(normalize-space(.), "Address 2"))]/following::input[1]');
    }

    get editAddress2Input() {
        return $('//input[@data-testid="party-dialog-address2-input"] | //input[@placeholder="Enter Address 2"] | //label[contains(normalize-space(.), "Address 2")]/following::input[1]');
    }

    get editCityInput() {
        return $('//input[@data-testid="party-dialog-city-input"] | //input[@placeholder="Enter City"] | //label[contains(normalize-space(.), "City")]/following::input[1]');
    }

    get editStateInput() {
        return $('//input[@data-testid="party-dialog-state-input"] | //input[@placeholder="Enter State"] | //label[contains(normalize-space(.), "State")]/following::input[1]');
    }

    get editZipInput() {
        return $('//input[@data-testid="party-dialog-zip-input"] | //input[@placeholder="Enter Zip"] | //label[contains(normalize-space(.), "Zip")]/following::input[1]');
    }

    get phoneNumbersSection() {
        return $('//*[contains(normalize-space(.), "Phone Numbers")]');
    }

    get addPhoneButton() {
        return $('//*[contains(normalize-space(.), "Phone Numbers")]/following::button[1] | //button[contains(@aria-label, "Add Phone")]');
    }

    get addPhoneNumberDialogHeading() {
        return $('//h2[contains(normalize-space(.), "Add Phone Number")] | //h3[contains(normalize-space(.), "Add Phone Number")]');
    }

    get addPhoneNumberInput() {
        return $('//input[@data-testid="party-dialog-phone-input"] | //label[contains(normalize-space(.), "Phone number")]/following::input[1]');
    }

    get phoneTypeDropdown() {
        return $('//label[contains(normalize-space(.), "Phone type")]/following::button[1] | //button[contains(normalize-space(.), "Select or Enter Phone Type")]');
    }

    get primaryPhoneToggle() {
        return $('//*[@role="switch" or @type="checkbox"][contains(@aria-label, "Primary") or contains(@id, "primary") or contains(@name, "primary")] | //label[contains(normalize-space(.), "Primary")]/preceding::*[@role="switch"][1] | //label[contains(normalize-space(.), "Primary")]/following::*[@role="switch" or @type="checkbox"][1]');
    }

    get phoneNumberSubmitButton() {
        return $('//button[normalize-space(.)="Submit" or @type="submit"]');
    }

    get closeAddPhoneDialogButton() {
        return $('//button[normalize-space(.)="Cancel" or normalize-space(.)="Close"]');
    }

    get previewSizesDropdown() {
        return $('//button[contains(@aria-label, "Preview Sizes") or contains(normalize-space(.), "option") or contains(normalize-space(.), "small") or contains(normalize-space(.), "medium") or contains(normalize-space(.), "large")]');
    }

    get addContactButton() {
        return $('//button[contains(normalize-space(.), "Add Contact")]');
    }

    get addContactHeading() {
        return $('//h2[contains(normalize-space(.), "Add Contact")] | //h3[contains(normalize-space(.), "Add Contact")]');
    }

    get addContactNameInput() {
        return $('//input[contains(@data-testid, "contact") and (contains(@data-testid, "name") or contains(@placeholder, "Name"))] | //label[contains(normalize-space(.), "Name")]/following::input[1]');
    }

    get addContactTitleInput() {
        return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "title")] | //label[contains(normalize-space(.), "Title")]/following::input[1]');
    }

    get addContactEmailInput() {
        return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "email")] | //label[contains(normalize-space(.), "Email")]/following::input[1]');
    }

    get addContactAddressInput() {
        return $('//input[contains(@data-testid, "contact") and (contains(@data-testid, "address1") or contains(@placeholder, "Address"))] | //label[contains(normalize-space(.), "Address")]/following::input[1]');
    }

    get addContactAddress2Input() {
        return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "address2")] | //label[contains(normalize-space(.), "Address 2")]/following::input[1]');
    }

    get addContactCityInput() {
        return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "city")] | //label[contains(normalize-space(.), "City")]/following::input[1]');
    }

    get addContactStateInput() {
        return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "state")] | //label[contains(normalize-space(.), "State")]/following::input[1]');
    }

    get addContactZipInput() {
        return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "zip")] | //label[contains(normalize-space(.), "Zip")]/following::input[1]');
    }

    get createNewContactToggle() {
        return $('//*[@role="switch" or @type="checkbox"][contains(@aria-label, "Create New Contact") or contains(@name, "createNewContact") or contains(@id, "createNewContact")] | //label[contains(normalize-space(.), "Create New Contact")]/preceding::*[@role="switch" or @type="checkbox"][1]');
    }

    get createNewContactButton() {
        return $('//button[contains(normalize-space(.), "Create New Contact") and @type="submit"] | //button[contains(normalize-space(.), "Create New Contact")]');
    }

    get selectContactsSubmitButton() {
        return $('[data-testid="select-contacts-submit-button"]');
    }

    get selectableContactCheckboxes() {
        return $$('//div[contains(@class, "Card") or @role="row"]//input[@type="checkbox"]');
    }

    get addContactCancelButton() {
        return $('//button[normalize-space(.)="Cancel"]');
    }

    get contactsSectionCloseButtons() {
        return $$('//button[@aria-label="Close" or @aria-label="close" or @aria-label="Remove" or @title="Close" or @title="Remove"]');
    }

    get deleteConfirmDialogHeading() {
        return $('//*[contains(normalize-space(.), "Delete?")]');
    }

    phoneTypeOption(phoneType) {
        return $(`//*[(@role="option" or self::span or self::div) and normalize-space(.)="${phoneType}"]`);
    }

    previewSizeOption(sizeText) {
        return $(`//*[(@role="option" or self::span or self::button) and normalize-space(.)="${sizeText}"]`);
    }

    escapeXpathText(text) {
        if (!text.includes('"')) {
            return `"${text}"`;
        }
        if (!text.includes("'")) {
            return `'${text}'`;
        }
        const parts = text.split('"');
        return `concat("${parts.join('", ' + "'\"'" + ', "')}")`;
    }

    rowByClientName(clientName, occurrence = 1) {
        const safeText = this.escapeXpathText(clientName);
        return $(`(
            //div[@role="row"][.//*[contains(normalize-space(.), ${safeText})]]
            | //tr[td][.//*[contains(normalize-space(.), ${safeText})]]
            | //*[contains(normalize-space(.), ${safeText})]/ancestor::div[@role="row"][1]
            | //*[contains(normalize-space(.), ${safeText})]/ancestor::tr[1]
        )[${occurrence}]`);
    }

    async findClientRowWithSearch(clientName, occurrence = 1) {
        await this.clearSearch();
        await this.waitForGridOrEmptyState();

        await this.searchForClient(clientName);
        await this.waitForGridOrEmptyState();

        const row = await this.rowByClientName(clientName, occurrence);
        const exists = await row.isExisting().catch(() => false);

        if (!exists) {
            await this.clearSearch();
            await this.waitForGridOrEmptyState();
            return this.rowByClientName(clientName, occurrence);
        }

        return row;
    }

    async clickElement(element) {
        const resolvedElement = await element;

        try {
            await resolvedElement.waitForExist({ timeout: 10000 });
            await resolvedElement.waitForDisplayed({ timeout: 10000 });
            await resolvedElement.click();
        } catch (error) {
            await browser.execute((el) => el.click(), resolvedElement);
        }
    }

    async clearAndType(element, value) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
        await element.clearValue();
        await element.setValue(value);
    }

    async waitForClientsSidebarButton() {
        await this.clientsSidebarButton.waitForDisplayed({ timeout: 10000 });
    }

    async isOnClientsThirdPartiesPage() {
        const onUrl = (await browser.getUrl()).toLowerCase().includes("clientsparties");
        const hasSearch = await this.searchInput.isDisplayed().catch(() => false);
        const hasCreate = await this.createButton.isDisplayed().catch(() => false);
        return onUrl || hasSearch || hasCreate;
    }

    async openClientsThirdPartiesFromSidebar() {
        if (!(await this.isOnClientsThirdPartiesPage())) {
            await this.waitForClientsSidebarButton();
            await this.clickElement(this.clientsSidebarButton);
        }

        await this.waitForClientsThirdPartiesPage();
    }

    async waitForClientsThirdPartiesPage() {
        await browser.waitUntil(async () => {
            const onUrl = (await browser.getUrl()).toLowerCase().includes("clientsparties");
            const hasSearch = await this.searchInput.isDisplayed().catch(() => false);
            const hasCreate = await this.createButton.isDisplayed().catch(() => false);
            return onUrl && (hasSearch || hasCreate);
        }, {
            timeout: 15000,
            timeoutMsg: "Clients / 3rd Parties page did not load expected controls"
        });
    }

    async waitForGridOrEmptyState() {
        await browser.waitUntil(async () => {
            const gridIsVisible = await this.tableGrid.isDisplayed().catch(() => false);
            const emptyIsVisible = await this.emptyStateMessage.isDisplayed().catch(() => false);
            return gridIsVisible || emptyIsVisible;
        }, {
            timeout: 10000,
            timeoutMsg: "Clients / 3rd Parties grid or empty state did not appear"
        });
    }

    async searchForClient(searchText) {
        await this.clearAndType(this.searchInput, searchText);
        await browser.pause(350);
    }

    async clearSearch() {
        await this.searchForClient("");
    }

    async clickSearchInfoAndDismiss() {
        const isVisible = await this.searchInfoButton.isDisplayed().catch(() => false);
        if (!isVisible) {
            return;
        }
        await this.searchInfoButton.click();
        await browser.pause(250);
        await this.searchLabel.click();
        await browser.pause(250);
    }

    async getDataRowCount() {
        const rows = await this.dataRows;
        return rows.length;
    }

    async hoverOverClientRow(clientName, occurrence = 1) {
        const rowElement = await this.rowByClientName(clientName, occurrence);
        await rowElement.waitForDisplayed({ timeout: 10000 });
        await rowElement.moveTo();
    }

    async openClientsThreeDotMenuByName(clientName, occurrence = 1) {
        const row = await this.rowByClientName(clientName, occurrence);
        await row.waitForDisplayed({ timeout: 10000 });

        const menuButton = await row.$('.//button[contains(@aria-label, "More") or contains(@aria-label, "Options") or contains(normalize-space(.), "...")]');
        const menuVisible = await menuButton.isDisplayed().catch(() => false);

        if (menuVisible) {
            await menuButton.click();
        }
    }

    async clickEditOnClient(clientName, occurrence = 1) {
        await browser.keys("Escape");
        await browser.pause(150);

        const isEditLoaded = async () => {
            const headingVisible = await this.editPageHeading.isDisplayed().catch(() => false);
            const nameVisible = await this.editPartyNameInput.isDisplayed().catch(() => false);
            const urlVisible = await this.editUrlInput.isDisplayed().catch(() => false);
            return headingVisible || nameVisible || urlVisible;
        };

        const row = await this.findClientRowWithSearch(clientName, occurrence);
        await row.waitForDisplayed({ timeout: 10000 });
        await row.moveTo();

        const inlineEdit = await row.$('.//button[contains(@aria-label, "Edit") or @title="Edit"]');
        if (await inlineEdit.isDisplayed().catch(() => false)) {
            try {
                await inlineEdit.click();
            } catch (error) {
                await browser.execute((el) => el.click(), inlineEdit);
            }

            const loadedAfterInline = await browser.waitUntil(async () => await isEditLoaded(), {
                timeout: 4000,
                interval: 250,
                timeoutMsg: "Edit view not visible yet"
            }).then(() => true).catch(() => false);

            if (loadedAfterInline) {
                return;
            }
        }

        await this.openClientsThreeDotMenuByName(clientName, occurrence);
        await this.clientEditButton.waitForDisplayed({ timeout: 10000 });
        try {
            await this.clientEditButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), await this.clientEditButton);
        }

        await browser.waitUntil(async () => await isEditLoaded(), {
            timeout: 10000,
            interval: 250,
            timeoutMsg: "Edit view did not appear after clicking Edit"
        });
    }

    async clickDeleteOnClient(clientName, occurrence = 1) {
        await browser.keys("Escape");
        await browser.pause(150);

        const row = await this.findClientRowWithSearch(clientName, occurrence);
        await row.waitForDisplayed({ timeout: 10000 });
        await row.moveTo();

        const inlineDelete = await row.$('.//button[contains(@aria-label, "Delete") or @title="Delete"]');
        if (await inlineDelete.isDisplayed().catch(() => false)) {
            try {
                await inlineDelete.click();
                return;
            } catch (error) {
                await browser.execute((el) => el.click(), inlineDelete);
                return;
            }
        }

        await this.openClientsThreeDotMenuByName(clientName, occurrence);
        await this.clientDeleteButton.waitForDisplayed({ timeout: 10000 });
        try {
            await this.clientDeleteButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), await this.clientDeleteButton);
        }
    }

    async cancelDeleteClient() {
        await this.doNotDeleteButtonCard.waitForDisplayed({ timeout: 10000 });
        await this.doNotDeleteButtonCard.click();
    }

    async waitForEditPage() {
        await browser.waitUntil(async () => {
            const headingVisible = await this.editPageHeading.isDisplayed().catch(() => false);
            const nameVisible = await this.editPartyNameInput.isDisplayed().catch(() => false);
            const urlVisible = await this.editUrlInput.isDisplayed().catch(() => false);
            const addressVisible = await this.editAddressInput.isDisplayed().catch(() => false);
            return headingVisible || (nameVisible && urlVisible) || (nameVisible && addressVisible);
        }, {
            timeout: 15000,
            timeoutMsg: "Edit card did not load expected form fields"
        });
    }

    async fillClientCoreFields(data) {
        await this.clearAndType(this.editPartyNameInput, data.partyName);
        await this.clearAndType(this.editUrlInput, data.url);
        await this.clearAndType(this.editAddressInput, data.address1);

        if (data.address2) {
            await this.clearAndType(this.editAddress2Input, data.address2);
        }

        await this.clearAndType(this.editCityInput, data.city);
        await this.clearAndType(this.editStateInput, data.state);
        await this.clearAndType(this.editZipInput, data.zip);
    }

    async openAddPhoneNumberDialog() {
        await this.addPhoneButton.waitForDisplayed({ timeout: 10000 });
        await this.addPhoneButton.click();
        await this.addPhoneNumberDialogHeading.waitForDisplayed({ timeout: 10000 });
    }

    async addPhoneNumberEntry({ number, type, makePrimary = false }) {
        await this.openAddPhoneNumberDialog();
        await this.clearAndType(this.addPhoneNumberInput, number);

        await this.phoneTypeDropdown.click();
        const option = await this.phoneTypeOption(type);
        await option.waitForDisplayed({ timeout: 10000 });
        await option.click();

        if (makePrimary) {
            const primaryVisible = await this.primaryPhoneToggle.isDisplayed().catch(() => false);
            if (primaryVisible) {
                await this.primaryPhoneToggle.click();
            }
        }

        await this.phoneNumberSubmitButton.waitForDisplayed({ timeout: 10000 });
        await this.phoneNumberSubmitButton.click();

        await browser.waitUntil(async () => {
            const dialogOpen = await this.addPhoneNumberDialogHeading.isDisplayed().catch(() => false);
            return !dialogOpen;
        }, {
            timeout: 10000,
            timeoutMsg: "Add Phone Number dialog did not close after submit"
        });
    }

    async closeAddPhoneNumberDialog() {
        if (await this.closeAddPhoneDialogButton.isDisplayed().catch(() => false)) {
            await this.closeAddPhoneDialogButton.click();
        } else {
            await browser.keys("Escape");
        }

        await browser.waitUntil(async () => {
            const dialogOpen = await this.addPhoneNumberDialogHeading.isDisplayed().catch(() => false);
            return !dialogOpen;
        }, {
            timeout: 10000,
            timeoutMsg: "Add Phone Number dialog did not close"
        });
    }

    async setPreviewSizesInOrder(order) {
        for (const size of order) {
            await this.previewSizesDropdown.waitForDisplayed({ timeout: 10000 });
            await this.previewSizesDropdown.click();
            const option = await this.previewSizeOption(size);
            if (await option.isDisplayed().catch(() => false)) {
                await option.click();
            } else {
                await browser.keys("Escape");
            }
            await browser.pause(200);
        }
    }

    async closeAnyContactCardAndCancelDeleteIfShown() {
        const closeButtons = await this.contactsSectionCloseButtons;
        if (closeButtons.length === 0) {
            return;
        }

        await closeButtons[0].click();
        const deletePromptVisible = await this.deleteConfirmDialogHeading.isDisplayed().catch(() => false);
        if (deletePromptVisible) {
            await this.cancelDeleteClient();
        }
    }

    async openAddContactDialog() {
        await this.addContactButton.waitForDisplayed({ timeout: 10000 });
        await this.addContactButton.click();
        await this.addContactHeading.waitForDisplayed({ timeout: 10000 });
    }

    async fillAddContactForm(data) {
        await this.clearAndType(this.addContactNameInput, data.name);
        await this.clearAndType(this.addContactTitleInput, data.title);
        await this.clearAndType(this.addContactEmailInput, data.email);
        await this.clearAndType(this.addContactAddressInput, data.address1);

        if (data.address2) {
            await this.clearAndType(this.addContactAddress2Input, data.address2);
        }

        await this.clearAndType(this.addContactCityInput, data.city);
        await this.clearAndType(this.addContactStateInput, data.state);
        await this.clearAndType(this.addContactZipInput, data.zip);
    }

    async ensureCreateNewContactToggle(desiredOn) {
        const toggleVisible = await this.createNewContactToggle.isDisplayed().catch(() => false);
        if (!toggleVisible) {
            return;
        }

        const isSelected = await this.createNewContactToggle.isSelected().catch(() => false);
        if (isSelected !== desiredOn) {
            await this.createNewContactToggle.click();
        }
    }

    async submitCreateNewContact() {
        await this.createNewContactButton.waitForDisplayed({ timeout: 10000 });
        await this.createNewContactButton.click();
        await browser.pause(500);
    }

    async selectExistingContactsIfAny() {
        await this.ensureCreateNewContactToggle(false);
        await browser.pause(300);

        const checkboxes = await this.selectableContactCheckboxes;
        if (checkboxes.length === 0) {
            return false;
        }

        await checkboxes[0].click();

        const canSubmit = await this.selectContactsSubmitButton.isDisplayed().catch(() => false);
        if (canSubmit) {
            await this.selectContactsSubmitButton.click();
            await browser.pause(500);
            return true;
        }

        return false;
    }

    async cancelAddContactDialog() {
        await this.addContactCancelButton.waitForDisplayed({ timeout: 10000 });
        await this.addContactCancelButton.click();
        await browser.pause(300);
    }

    async selectClientByName(clientName, occurrence = 1) {
        const row = await this.rowByClientName(clientName, occurrence);
        await row.waitForDisplayed({ timeout: 10000 });

        const checkbox = await row.$('.//input[@type="checkbox"]');
        await checkbox.waitForDisplayed({ timeout: 10000 });
        await checkbox.click();
    }

    async goBackToClientsListPage() {
        if (await this.breadcrumbClientsLink.isDisplayed().catch(() => false)) {
            await this.breadcrumbClientsLink.click();
            await this.waitForClientsThirdPartiesPage();
            return;
        }

        if (await this.cancelEditButton.isDisplayed().catch(() => false)) {
            await this.cancelEditButton.click();
            await this.waitForClientsThirdPartiesPage();
            return;
        }

        await this.openClientsThirdPartiesFromSidebar();
    }
}

export default new DashboardClientsThirdPartiesPage();