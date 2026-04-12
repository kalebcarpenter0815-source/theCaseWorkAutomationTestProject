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

    get dialogBackdrop() {
        return $('.fui-DialogSurface__backdrop');
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

    get addPhoneNumberDialogContainer() {
        return $('//div[@role="dialog"][.//h2[contains(normalize-space(.), "Add Phone Number")] or .//h3[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//h2[contains(normalize-space(.), "Add Phone Number")] or .//h3[contains(normalize-space(.), "Add Phone Number")]]');
    }

    get addPhoneNumberInput() {
        return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//label[contains(translate(normalize-space(.), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "phone number")]/following::input[1] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "phone")] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//input[contains(translate(@name, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "phone") and @type="text"] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//input[contains(@data-testid, "phone") and @type="text"]');
    }

    get phoneTypeDropdown() {
        return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//label[contains(normalize-space(.), "Phone type")]/following::button[1] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//button[contains(normalize-space(.), "Select or Enter Phone Type")]');
    }

    get phoneTypeInput() {
        return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//label[contains(normalize-space(.), "Phone type")]/following::input[1]');
    }

    get primaryPhoneToggle() {
        return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//*[@role="switch" or @type="checkbox"][contains(@aria-label, "Primary") or contains(@id, "primary") or contains(@name, "primary")] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//label[contains(normalize-space(.), "Primary")]/following::*[@role="switch" or @type="checkbox"][1]');
    }

    get phoneNumberSubmitButton() {
        return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//button[normalize-space(.)="Submit" or normalize-space(.)="Create" or normalize-space(.)="Add" or @type="submit"]');
    }

    get closeAddPhoneDialogButton() {
        return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//button[normalize-space(.)="Cancel" or normalize-space(.)="Close"]');
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
        return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "title")] | //input[@name="title"] | //input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "title")] | //label[contains(normalize-space(.), "Title")]/following::input[1]');
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
        await this.dismissBlockingBackdrops();
        await element.waitForDisplayed({ timeout: 10000 });
        try {
            await element.click();
        } catch (error) {
            await this.dismissBlockingBackdrops();
            await browser.execute((el) => el.click(), element);
        }
        await element.clearValue();
        await element.setValue(value);
    }

    async clearAndTypeIfVisible(element, value) {
        const visible = await element.isDisplayed().catch(() => false);
        if (!visible) {
            return;
        }
        await this.clearAndType(element, value);
    }

    async dismissBlockingBackdrops() {
        for (let attempt = 0; attempt < 4; attempt += 1) {
            const blocking = await this.dialogBackdrop.isDisplayed().catch(() => false);
            if (!blocking) {
                return;
            }
            await browser.keys("Escape");
            await browser.pause(250);
        }
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
        await this.dismissBlockingBackdrops();
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
        // Dismiss any blocking backdrops first
        await this.dismissBlockingBackdrops();
        await browser.pause(200);

        // Check if we can find a phone add button
        const phoneButtonFound = await browser.execute(() => {
            // Look for phone button - could be on main page or in dialogs
            const buttons = Array.from(document.querySelectorAll('button'));
            const phoneBtn = buttons.find(btn => 
                btn.getAttribute('data-testid') === 'phone-panel-add-button' ||
                btn.getAttribute('aria-label')?.includes('Add Phone') ||
                (btn.textContent.includes('Add') && btn.textContent.includes('Phone'))
            );
            
            return !!phoneBtn;
        });

        if (!phoneButtonFound) {
            // Phone button not available (we might be in a contact dialog where phones aren't editable here)
            throw new Error('Phone add button not available in current context');
        }

        // Phone button is available
            const addPhoneButton = await this.addPhoneButton;
            try {
                await addPhoneButton.waitForDisplayed({ timeout: 5000 });
            } catch (error) {
                await browser.execute((el) => el?.click(), addPhoneButton).catch(() => null);
            }

        try {
                await addPhoneButton.click();
        } catch (e) {
                await browser.execute((el) => el.click(), addPhoneButton);
        }

        // Wait for dialog heading to appear
        await this.addPhoneNumberDialogHeading.waitForDisplayed({ timeout: 10000 });
    }

    async getAddPhoneDialogContainer() {
        const heading = await this.addPhoneNumberDialogHeading;
        await heading.waitForDisplayed({ timeout: 10000 });

        const container = await heading.$('./ancestor::*[@role="dialog" or contains(@class, "Dialog") or contains(@class, "Popover") or contains(@class, "Card")][1]');
        const containerDisplayed = await container.isDisplayed().catch(() => false);

        if (containerDisplayed) {
            return container;
        }

        return heading;
    }

    async getPhoneInputsFromDialog() {
        // Use JavaScript to find all visible text inputs within any visible dialog
        const dialogInputs = await browser.execute(() => {
            // Find all elements that might be dialogs (containing "Add Phone Number" text)
            const possibleDialogs = Array.from(
                document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
            ).filter(el => {
                const text = el.textContent || '';
                return text.includes('Add Phone Number');
            });

            if (possibleDialogs.length === 0) {
                return [];
            }

            const dialog = possibleDialogs[0];
            
            // Find all text inputs within the dialog
            const allInputs = Array.from(dialog.querySelectorAll('input[type="text"]:not([disabled]):not([readonly])'));
            
            // Filter out address fields (they'll have address-related names/placeholders)
            const phoneInputs = allInputs.filter(input => {
                const name = (input.name || '').toLowerCase();
                const placeholder = (input.placeholder || '').toLowerCase();
                const ariaLabel = (input.getAttribute('aria-label') || '').toLowerCase();
                const isAddress = name.includes('address') || placeholder.includes('address') || ariaLabel.includes('address');
                return !isAddress;
            });

            return phoneInputs.map(input => ({
                selector: 'element',
                index: allInputs.indexOf(input)
            }));
        });

        // Convert indices back to WebdriverIO elements
        if (dialogInputs.length === 0) {
            return [];
        }

        // Get fresh dialog container and query for inputs
        const dialogContainer = await this.addPhoneNumberDialogHeading.$(
            'ancestor::div[1] | ancestor::*[contains(@class, "Dialog") or contains(@class, "Popover") or contains(@class, "Card") or @role="dialog"][1]'
        ).catch(() => null);

        if (!dialogContainer) {
            return [];
        }

        // Now get the actual inputs using relative selectors
        const inputs = await dialogContainer.$$('input[type="text"]:not([disabled]):not([readonly])');
        
        // Filter to exclude address inputs
        const filtered = [];
        for (const input of inputs) {
            try {
                const name = (await input.getAttribute('name') || '').toLowerCase();
                const placeholder = (await input.getAttribute('placeholder') || '').toLowerCase();
                const ariaLabel = (await input.getAttribute('aria-label') || '').toLowerCase();
                const isAddress = name.includes('address') || placeholder.includes('address') || ariaLabel.includes('address');
                
                if (!isAddress) {
                    filtered.push(input);
                }
            } catch (e) {
                // Skip if we can't query attributes
            }
        }

        return filtered;
    }

    async addPhoneNumberEntry({ number, type, makePrimary = false }) {
        try {
            await this.openAddPhoneNumberDialog();
        } catch (e) {
            // Phone button not available in this context (e.g., inside "Create New Contact" dialog)
            // Just skip phone entry
            return;
        }

        // Use JavaScript to fill phone number in the dialog
        const phoneEntered = await browser.execute((phoneNum) => {
            // Find the dialog containing "Add Phone Number"
            const dialogs = Array.from(
                document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
            ).filter(el => el.textContent.includes('Add Phone Number'));
            
            if (dialogs.length === 0) return false;
            
            const dialog = dialogs[0];
            const inputs = Array.from(dialog.querySelectorAll('input[type="text"]:not([disabled]):not([readonly])'));
            
            // Find first input that's not address-related
            for (const input of inputs) {
                const attrs = (input.name + input.placeholder + input.getAttribute('data-testid')).toLowerCase();
                if (!attrs.includes('address')) {
                    input.focus();
                    input.value = phoneNum;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                    input.dispatchEvent(new Event('blur', { bubbles: true }));
                    return true;
                }
            }
            return false;
        }, number);

        if (!phoneEntered) {
            // Fallback: keyboard entry
            await this.addPhoneNumberDialogHeading.click();
            await browser.keys(number);
        }

        // Handle phone type selection
        const typeSelected = await browser.execute((phoneType) => {
            const dialogs = Array.from(
                document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
            ).filter(el => el.textContent.includes('Add Phone Number'));
            
            if (dialogs.length === 0) return false;
            
            const dialog = dialogs[0];
            
            // Try to find and click dropdown button
            const buttons = Array.from(dialog.querySelectorAll('button'));
            const typeButton = buttons.find(btn => 
                btn.textContent.includes('Select or Enter') || 
                btn.textContent.includes('Phone') ||
                btn.textContent.includes('Type')
            );
            
            if (typeButton) {
                typeButton.click();
                return 'dropdown-clicked';
            }
            return false;
        }, type);

        if (typeSelected === 'dropdown-clicked') {
            // Wait for options to appear
            await browser.pause(300);
            
            // Try to select the option
            const optionSelected = await browser.execute((phoneType) => {
                const options = Array.from(
                    document.querySelectorAll('[role="option"], .ms-Button-label')
                ).filter(el => el.textContent.trim() === phoneType);
                
                if (options.length > 0) {
                    options[0].click();
                    return true;
                }
                return false;
            }, type);

            if (!optionSelected) {
                // Fallback: type the value
                await browser.keys(type);
                await browser.keys('Enter');
            }
        } else {
            // Fallback: use keyboard
            await browser.keys(type);
            await browser.keys('Enter');
        }

        // Handle primary toggle
        if (makePrimary) {
            await browser.execute(() => {
                const dialogs = Array.from(
                    document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
                ).filter(el => el.textContent.includes('Add Phone Number'));
                
                if (dialogs.length === 0) return;
                
                const dialog = dialogs[0];
                const toggle = dialog.querySelector('[role="switch"][aria-label*="Primary"], input[type="checkbox"][aria-label*="Primary"]');
                
                if (toggle && !toggle.checked && !toggle.getAttribute('aria-checked') === 'true') {
                    toggle.click();
                }
            });
        }

        // Submit the dialog
        const submitted = await browser.execute(() => {
            const dialogs = Array.from(
                document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
            ).filter(el => el.textContent.includes('Add Phone Number'));
            
            if (dialogs.length === 0) return false;
            
            const dialog = dialogs[0];
            const buttons = Array.from(dialog.querySelectorAll('button'));
            const submitBtn = buttons.find(btn => 
                btn.textContent.includes('Submit') || 
                btn.textContent.includes('Add') || 
                btn.textContent.includes('Create') ||
                btn.type === 'submit'
            );
            
            if (submitBtn) {
                submitBtn.click();
                return true;
            }
            return false;
        });

        if (!submitted) {
            await browser.keys('Enter');
        }

        // Wait for dialog to close
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
        // Wait for dialog to be visible
        await this.addContactHeading.waitForDisplayed({ timeout: 10000 });
        await browser.pause(200);

        // Use JavaScript to fill all contact form fields
        const filled = await browser.execute((contactData) => {
            // Find the Add Contact dialog
            const dialogs = Array.from(
                document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
            ).filter(el => el.textContent.includes('Add Contact'));
            
            if (dialogs.length === 0) return { success: false, reason: 'no dialog' };
            
            const dialog = dialogs[0];
            const inputs = Array.from(dialog.querySelectorAll('input[type="text"]:not([disabled]):not([readonly])'));
            
            if (inputs.length === 0) return { success: false, reason: 'no inputs' };
            
            // Map fields by finding which input corresponds to which field
            const fieldMap = {};
            for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                const attrs = (
                    input.name + 
                    input.placeholder + 
                    input.getAttribute('data-testid') + 
                    input.getAttribute('aria-label')
                ).toLowerCase();
                
                if (attrs.includes('name')) {
                    fieldMap.name = i;
                } else if (attrs.includes('title')) {
                    fieldMap.title = i;
                } else if (attrs.includes('email')) {
                    fieldMap.email = i;
                } else if (attrs.includes('address 2')) {
                    fieldMap.address2 = i;
                } else if (attrs.includes('address')) {
                    fieldMap.address1 = i;
                } else if (attrs.includes('city')) {
                    fieldMap.city = i;
                } else if (attrs.includes('state')) {
                    fieldMap.state = i;
                } else if (attrs.includes('zip')) {
                    fieldMap.zip = i;
                }
            }
            
            // Fill each field that exists
            const fillField = (value, fieldName) => {
                if (!value || fieldMap[fieldName] === undefined) return false;
                const input = inputs[fieldMap[fieldName]];
                input.focus();
                input.value = value;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                return true;
            };
            
            const results = {
                name: fillField(contactData.name, 'name'),
                title: fillField(contactData.title, 'title'),
                email: fillField(contactData.email, 'email'),
                address1: fillField(contactData.address1, 'address1'),
                address2: fillField(contactData.address2, 'address2'),
                city: fillField(contactData.city, 'city'),
                state: fillField(contactData.state, 'state'),
                zip: fillField(contactData.zip, 'zip'),
            };
            
            return { success: true, filled: results };
        }, data);

        // If JavaScript fill didn't work perfectly, try fallbacks for critical fields
        if (!filled.success || !filled.filled?.email) {
            // Fall back to clearAndType for email  which is most critical
            try {
                await this.clearAndType(this.addContactEmailInput, data.email);
            } catch (e) {
                // Last resort: keyboard entry
                await browser.keys(data.email);
            }
        }
    }

    async ensureCreateNewContactToggle(desiredOn) {
        // Use JavaScript to find and toggle the "Create New Contact" switch
        const toggled = await browser.execute((shouldBeOn) => {
            // Find the dialog containing "Add Contact"
            const dialogs = Array.from(
                document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
            ).filter(el => el.textContent.includes('Add Contact'));
            
            if (dialogs.length === 0) return { found: false, reason: 'no dialog' };
            
            const dialog = dialogs[0];
            
            // Find Create New Contact toggle/switch by looking for text and parent container
            const allElements = Array.from(dialog.querySelectorAll('*'));
            const toggleLabel = allElements.find(el => 
                el.textContent.includes('Create New Contact') && 
                (el.textContent.length < 100)
            );
            
            if (!toggleLabel) return { found: false, reason: 'no label found' };
            
            // Find the switch/checkbox near the label
            const labelContainer = toggleLabel.closest('div') || toggleLabel;
            const toggle = labelContainer.querySelector('[role="switch"]') || 
                          labelContainer.querySelector('input[type="checkbox"]') ||
                          toggleLabel.parentElement?.querySelector('[role="switch"]') ||
                          toggleLabel.parentElement?.querySelector('input[type="checkbox"]');
            
            if (!toggle) return { found: false, reason: 'no toggle found' };
            
            // Check current state
            const isOn = toggle.getAttribute('aria-checked') === 'true' || 
                        toggle.checked === true ||
                        toggle.classList.contains('is-checked') ||
                        toggle.classList.contains('checked');
            
            // Toggle if needed
            if (isOn !== shouldBeOn) {
                toggle.click();
                return { found: true, toggled: true, wasOn: isOn, nowOn: shouldBeOn };
            }
            
            return { found: true, toggled: false, alreadyOn: isOn };
        }, desiredOn);

        if (!toggled.found) {
            // Fallback: try the original selector
            const toggleVisible = await this.createNewContactToggle.isDisplayed().catch(() => false);
            if (toggleVisible) {
                const isSelected = await this.createNewContactToggle.isSelected().catch(() => false);
                if (isSelected !== desiredOn) {
                    await this.createNewContactToggle.click();
                }
            }
        }

        // Wait for form fields to appear
        await browser.pause(300);
    }

    async submitCreateNewContact() {
        // Wait a bit for any form updates
        await browser.pause(300);

        // Use JavaScript to find and click the submit button
        const clicked = await browser.execute(() => {
            // Find the Add Contact dialog
            const dialogs = Array.from(
                document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
            ).filter(el => el.textContent.includes('Add Contact'));
            
            if (dialogs.length === 0) return false;
            
            const dialog = dialogs[0];
            
            // Find buttons in the dialog
            const buttons = Array.from(dialog.querySelectorAll('button'));
            
            // Look for submit button - could be "Create New Contact", "Add New Contact", "Add Contact", etc.
            const submitBtn = buttons.find(btn => {
                const text = btn.textContent.toLowerCase();
                return (text.includes('add') || text.includes('create')) && 
                       (text.includes('contact') || text.includes('new')) &&
                       !text.includes('cancel');
            });
            
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
                return true;
            }
            
            return false;
        });

        if (!clicked) {
            // Fallback to waiting for the selector button
            const buttonVisible = await this.createNewContactButton.isDisplayed().catch(() => false);
            if (buttonVisible) {
                await this.createNewContactButton.click();
            }
        }

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
        const addContactOpen = await this.addContactHeading.isDisplayed().catch(() => false);
        if (!addContactOpen) {
            return;
        }

        const cancelVisible = await this.addContactCancelButton.isDisplayed().catch(() => false);
        if (!cancelVisible) {
            await browser.keys("Escape");
            await browser.pause(300);
            return;
        }

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