// import { $, $$ } from "@wdio/globals";
// import Page from "./page.js";
// 
// class DashboardClientsThirdPartiesPage extends Page {
//     get clientsSidebarButton() {
//         return $(
//             '//button[@data-testid="vert-nav-clients-parties"] | //a[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")] | //button[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")]'
//         );
//     }
// 
//     get pageTitle() {
//         return $('//h1[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")]');
//     }
// 
//     get searchLabel() {
//         return $('//label[contains(normalize-space(.), "Search")] | //span[contains(normalize-space(.), "Search")]');
//     }
// 
//     get searchInput() {
//         return $(
//             '//input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "search clients/3rd parties") or contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "search clients") or contains(translate(@aria-label, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "search")]'
//         );
//     }
// 
//     get searchInfoButton() {
//         return $('//*[contains(normalize-space(.), "Search")]/following::button[1]');
//     }
// 
//     get createButton() {
//         return $('//button[normalize-space(.)="Create" or .//*[contains(normalize-space(.), "Create")]]');
//     }
// 
//     get tableGrid() {
//         return $('[role="grid"], table');
//     }
// 
//     get nameColumnHeader() {
//         return $('//*[(@role="columnheader" or self::th) and contains(normalize-space(.), "Name")]');
//     }
// 
//     get addressColumnHeader() {
//         return $('//*[(@role="columnheader" or self::th) and contains(normalize-space(.), "Address")]');
//     }
// 
//     get dataRows() {
//         return $$('//div[@role="row"][.//*[@role="gridcell"]] | //tr[td]');
//     }
// 
//     get rowActionButtons() {
//         return $$('//button[contains(@aria-label, "More") or contains(@aria-label, "Edit") or contains(@aria-label, "Delete") or @title="Edit" or @title="Delete"]');
//     }
// 
//     get clientCheckboxBtns() {
//         return $$('//div[@role="row"][.//*[@role="gridcell"]]//input[@type="checkbox"] | //tr[td]//input[@type="checkbox"]');
//     }
// 
//     get emptyStateMessage() {
//         return $('//*[contains(normalize-space(.), "No clients") or contains(normalize-space(.), "No results") or contains(normalize-space(.), "No data")]');
//     }
// 
//     get dialogBackdrop() {
//         return $('.fui-DialogSurface__backdrop');
//     }
// 
//     get clientEditButton() {
//         return $('//button[normalize-space(.)="Edit" or contains(@aria-label, "Edit")]');
//     }
// 
//     get clientDeleteButton() {
//         return $('//button[normalize-space(.)="Delete" or contains(@aria-label, "Delete")]');
//     }
// 
//     get doNotDeleteButtonCard() {
//         return $('//button[normalize-space(.)="No" or normalize-space(.)="Cancel"]');
//     }
// 
//     get editPageHeading() {
//         return $('//h1[contains(normalize-space(.), "Edit") or contains(normalize-space(.), "Create New Client / 3rd Party") or contains(normalize-space(.), "Client / 3rd Party")] | //h2[contains(normalize-space(.), "Edit") or contains(normalize-space(.), "Create New Client / 3rd Party") or contains(normalize-space(.), "Client / 3rd Party")]');
//     }
// 
//     get breadcrumbClientsLink() {
//         return $('//a[contains(normalize-space(.), "Clients/Parties") or contains(normalize-space(.), "Clients / 3rd Parties")] | //nav//*[contains(normalize-space(.), "Clients/Parties") or contains(normalize-space(.), "Clients / 3rd Parties")]');
//     }
// 
//     get cancelEditButton() {
//         return $('//button[normalize-space(.)="Cancel" or .//*[contains(normalize-space(.), "Cancel")]]');
//     }
// 
//     get submitEditButton() {
//         return $('//button[normalize-space(.)="Submit" or .//*[contains(normalize-space(.), "Submit")]]');
//     }
// 
//     get editPartyNameInput() {
//         return $('//input[@data-testid="party-dialog-name-input"] | //input[contains(@placeholder, "name of the Client / 3rd Party")] | //label[contains(normalize-space(.), "Party Name")]/following::input[1]');
//     }
// 
//     get editUrlInput() {
//         return $('//input[@data-testid="party-dialog-url-input"] | //input[@placeholder="Enter Url"] | //label[contains(normalize-space(.), "Url")]/following::input[1]');
//     }
// 
//     get editAddressInput() {
//         return $('//input[@data-testid="party-dialog-address1-input"] | //input[@placeholder="Enter Address"] | //label[contains(normalize-space(.), "Address") and not(contains(normalize-space(.), "Address 2"))]/following::input[1]');
//     }
// 
//     get editAddress2Input() {
//         return $('//input[@data-testid="party-dialog-address2-input"] | //input[@placeholder="Enter Address 2"] | //label[contains(normalize-space(.), "Address 2")]/following::input[1]');
//     }
// 
//     get editCityInput() {
//         return $('//input[@data-testid="party-dialog-city-input"] | //input[@placeholder="Enter City"] | //label[contains(normalize-space(.), "City")]/following::input[1]');
//     }
// 
//     get editStateInput() {
//         return $('//input[@data-testid="party-dialog-state-input"] | //input[@placeholder="Enter State"] | //label[contains(normalize-space(.), "State")]/following::input[1]');
//     }
// 
//     get editZipInput() {
//         return $('//input[@data-testid="party-dialog-zip-input"] | //input[@placeholder="Enter Zip"] | //label[contains(normalize-space(.), "Zip")]/following::input[1]');
//     }
// 
//     get phoneNumbersSection() {
//         return $('//*[contains(normalize-space(.), "Phone Numbers")]');
//     }
// 
//     get addPhoneButton() {
//         return $('//*[contains(normalize-space(.), "Phone Numbers")]/following::button[1] | //button[contains(@aria-label, "Add Phone")]');
//     }
// 
//     get addPhoneNumberDialogHeading() {
//         return $('//h2[contains(normalize-space(.), "Add Phone Number")] | //h3[contains(normalize-space(.), "Add Phone Number")]');
//     }
// 
//     get addPhoneNumberDialogContainer() {
//         return $('//div[@role="dialog"][.//h2[contains(normalize-space(.), "Add Phone Number")] or .//h3[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//h2[contains(normalize-space(.), "Add Phone Number")] or .//h3[contains(normalize-space(.), "Add Phone Number")]]');
//     }
// 
//     get addPhoneNumberInput() {
//         return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//label[contains(translate(normalize-space(.), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "phone number")]/following::input[1] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "phone")] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//input[contains(translate(@name, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "phone") and @type="text"] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//input[contains(@data-testid, "phone") and @type="text"]');
//     }
// 
//     get phoneTypeDropdown() {
//         return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//label[contains(normalize-space(.), "Phone type")]/following::button[1] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//button[contains(normalize-space(.), "Select or Enter Phone Type")]');
//     }
// 
//     get phoneTypeInput() {
//         return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//label[contains(normalize-space(.), "Phone type")]/following::input[1]');
//     }
// 
//     get primaryPhoneToggle() {
//         return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//*[@role="switch" or @type="checkbox"][contains(@aria-label, "Primary") or contains(@id, "primary") or contains(@name, "primary")] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//label[contains(normalize-space(.), "Primary")]/following::*[@role="switch" or @type="checkbox"][1]');
//     }
// 
//     get phoneNumberSubmitButton() {
//         return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//button[normalize-space(.)="Submit" or normalize-space(.)="Create" or normalize-space(.)="Add" or @type="submit"]');
//     }
// 
//     get closeAddPhoneDialogButton() {
//         return $('(//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//button[normalize-space(.)="Cancel" or normalize-space(.)="Close"]');
//     }
// 
//     get previewSizesDropdown() {
//         return $('//button[contains(@aria-label, "Preview Sizes") or contains(normalize-space(.), "option") or contains(normalize-space(.), "small") or contains(normalize-space(.), "medium") or contains(normalize-space(.), "large")]');
//     }
// 
//     get addContactButton() {
//         return $('//button[contains(normalize-space(.), "Add Contact")]');
//     }
// 
//     get addContactHeading() {
//         return $('//h2[contains(normalize-space(.), "Add Contact")] | //h3[contains(normalize-space(.), "Add Contact")]');
//     }
// 
//     get addContactNameInput() {
//         return $('//input[contains(@data-testid, "contact") and (contains(@data-testid, "name") or contains(@placeholder, "Name"))] | //label[contains(normalize-space(.), "Name")]/following::input[1]');
//     }
// 
//     get addContactTitleInput() {
//         return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "title")] | //input[@name="title"] | //input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "title")] | //label[contains(normalize-space(.), "Title")]/following::input[1]');
//     }
// 
//     get addContactEmailInput() {
//         return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "email")] | //label[contains(normalize-space(.), "Email")]/following::input[1]');
//     }
// 
//     get addContactAddressInput() {
//         return $('//input[contains(@data-testid, "contact") and (contains(@data-testid, "address1") or contains(@placeholder, "Address"))] | //label[contains(normalize-space(.), "Address")]/following::input[1]');
//     }
// 
//     get addContactAddress2Input() {
//         return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "address2")] | //label[contains(normalize-space(.), "Address 2")]/following::input[1]');
//     }
// 
//     get addContactCityInput() {
//         return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "city")] | //label[contains(normalize-space(.), "City")]/following::input[1]');
//     }
// 
//     get addContactStateInput() {
//         return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "state")] | //label[contains(normalize-space(.), "State")]/following::input[1]');
//     }
// 
//     get addContactZipInput() {
//         return $('//input[contains(@data-testid, "contact") and contains(@data-testid, "zip")] | //label[contains(normalize-space(.), "Zip")]/following::input[1]');
//     }
// 
//     get createNewContactToggle() {
//         return $('//*[@role="switch" or @type="checkbox"][contains(@aria-label, "Create New Contact") or contains(@name, "createNewContact") or contains(@id, "createNewContact")] | //label[contains(normalize-space(.), "Create New Contact")]/preceding::*[@role="switch" or @type="checkbox"][1]');
//     }
// 
//     get createNewContactButton() {
//         return $('//button[contains(normalize-space(.), "Create New Contact") and @type="submit"] | //button[contains(normalize-space(.), "Create New Contact")]');
//     }
// 
//     get selectContactsSubmitButton() {
//         return $('[data-testid="select-contacts-submit-button"]');
//     }
// 
//     get selectableContactCheckboxes() {
//         return $$('//div[contains(@class, "Card") or @role="row"]//input[@type="checkbox"]');
//     }
// 
//     get addContactCancelButton() {
//         return $('//button[normalize-space(.)="Cancel"]');
//     }
// 
//     get contactsSectionCloseButtons() {
//         return $$('//button[@aria-label="Close" or @aria-label="close" or @aria-label="Remove" or @title="Close" or @title="Remove"]');
//     }
// 
//     get deleteConfirmDialogHeading() {
//         return $('//*[contains(normalize-space(.), "Delete?")]');
//     }
// 
//     phoneTypeOption(phoneType) {
//         return $(`//*[(@role="option" or self::span or self::div) and normalize-space(.)="${phoneType}"]`);
//     }
// 
//     previewSizeOption(sizeText) {
//         return $(`//*[(@role="option" or self::span or self::button) and normalize-space(.)="${sizeText}"]`);
//     }
// 
//     escapeXpathText(text) {
//         if (!text.includes('"')) {
//             return `"${text}"`;
//         }
//         if (!text.includes("'")) {
//             return `'${text}'`;
//         }
//         const parts = text.split('"');
//         return `concat("${parts.join('", ' + "'\"'" + ', "')}")`;
//     }
// 
//     rowByClientName(clientName, occurrence = 1) {
//         const safeText = this.escapeXpathText(clientName);
//         return $(`(
//             //div[@role="row"][.//*[contains(normalize-space(.), ${safeText})]]
//             | //tr[td][.//*[contains(normalize-space(.), ${safeText})]]
//             | //*[contains(normalize-space(.), ${safeText})]/ancestor::div[@role="row"][1]
//             | //*[contains(normalize-space(.), ${safeText})]/ancestor::tr[1]
//         )[${occurrence}]`);
//     }
// 
//     async findClientRowWithSearch(clientName, occurrence = 1) {
//         await this.clearSearch();
//         await this.waitForGridOrEmptyState();
// 
//         await this.searchForClient(clientName);
//         await this.waitForGridOrEmptyState();
// 
//         const row = await this.rowByClientName(clientName, occurrence);
//         const exists = await row.isExisting().catch(() => false);
// 
//         if (!exists) {
//             await this.clearSearch();
//             await this.waitForGridOrEmptyState();
//             return this.rowByClientName(clientName, occurrence);
//         }
// 
//         return row;
//     }
// 
//     async clickElement(element) {
//         const resolvedElement = await element;
// 
//         try {
//             await resolvedElement.waitForExist({ timeout: 10000 });
//             await resolvedElement.waitForDisplayed({ timeout: 10000 });
//             await resolvedElement.click();
//         } catch (error) {
//             await browser.execute((el) => el.click(), resolvedElement);
//         }
//     }
// 
//     async clearAndType(element, value) {
//         await this.dismissBlockingBackdrops();
//         await element.waitForDisplayed({ timeout: 10000 });
//         try {
//             await element.click();
//         } catch (error) {
//             await this.dismissBlockingBackdrops();
//             await browser.execute((el) => el.click(), element);
//         }
//         await element.clearValue();
//         await element.setValue(value);
//     }
// 
//     async clearAndTypeIfVisible(element, value) {
//         const visible = await element.isDisplayed().catch(() => false);
//         if (!visible) {
//             return;
//         }
//         await this.clearAndType(element, value);
//     }
// 
//     async dismissBlockingBackdrops() {
//         for (let attempt = 0; attempt < 4; attempt += 1) {
//             const blocking = await this.dialogBackdrop.isDisplayed().catch(() => false);
//             if (!blocking) {
//                 return;
//             }
//             await browser.keys("Escape");
//             await browser.pause(250);
//         }
//     }
// 
//     async waitForClientsSidebarButton() {
//         await this.clientsSidebarButton.waitForDisplayed({ timeout: 10000 });
//     }
// 
//     async isOnClientsThirdPartiesPage() {
//         const onUrl = (await browser.getUrl()).toLowerCase().includes("clientsparties");
//         const hasTitle = await this.pageTitle.isDisplayed().catch(() => false);
//         const hasSearch = await this.searchInput.isDisplayed().catch(() => false);
//         const hasCreate = await this.createButton.isDisplayed().catch(() => false);
//         const hasGrid = await this.tableGrid.isDisplayed().catch(() => false);
//         const hasNameHeader = await this.nameColumnHeader.isDisplayed().catch(() => false);
//         const hasUsablePage = hasTitle || hasSearch || hasCreate || hasGrid || hasNameHeader;
//         return (onUrl && hasUsablePage) || hasUsablePage;
//     }
// 
//     async openClientsThirdPartiesFromSidebar() {
//         if (!(await this.isOnClientsThirdPartiesPage())) {
//             await this.waitForClientsSidebarButton();
//             await this.clickElement(this.clientsSidebarButton);
//         }
// 
//         await this.waitForClientsThirdPartiesPage();
//     }
// 
//     async waitForClientsThirdPartiesPage() {
//         await browser.waitUntil(async () => {
//             const onUrl = (await browser.getUrl()).toLowerCase().includes("clientsparties");
//             const hasTitle = await this.pageTitle.isDisplayed().catch(() => false);
//             const hasSearch = await this.searchInput.isDisplayed().catch(() => false);
//             const hasCreate = await this.createButton.isDisplayed().catch(() => false);
//             const hasGrid = await this.tableGrid.isDisplayed().catch(() => false);
//             const hasNameHeader = await this.nameColumnHeader.isDisplayed().catch(() => false);
//             const hasAddressHeader = await this.addressColumnHeader.isDisplayed().catch(() => false);
//             return onUrl && (hasTitle || hasSearch || hasCreate || hasGrid || hasNameHeader || hasAddressHeader);
//         }, {
//             timeout: 15000,
//             timeoutMsg: "Clients / 3rd Parties page did not load expected controls"
//         });
//     }
// 
//     async waitForGridOrEmptyState() {
//         await browser.waitUntil(async () => {
//             const gridIsVisible = await this.tableGrid.isDisplayed().catch(() => false);
//             const emptyIsVisible = await this.emptyStateMessage.isDisplayed().catch(() => false);
//             return gridIsVisible || emptyIsVisible;
//         }, {
//             timeout: 10000,
//             timeoutMsg: "Clients / 3rd Parties grid or empty state did not appear"
//         });
//     }
// 
//     async searchForClient(searchText) {
//         await this.clearAndType(this.searchInput, searchText);
//         await browser.pause(350);
//     }
// 
//     async clearSearch() {
//         await this.searchForClient("");
//     }
// 
//     async clickSearchInfoAndDismiss() {
//         const isVisible = await this.searchInfoButton.isDisplayed().catch(() => false);
//         if (!isVisible) {
//             return;
//         }
//         await this.searchInfoButton.click();
//         await browser.pause(250);
//         await this.searchLabel.click();
//         await browser.pause(250);
//         await this.dismissBlockingBackdrops();
//     }
// 
//     async getDataRowCount() {
//         const rows = await this.dataRows;
//         return rows.length;
//     }
// 
//     async hoverOverClientRow(clientName, occurrence = 1) {
//         const rowElement = await this.rowByClientName(clientName, occurrence);
//         await rowElement.waitForDisplayed({ timeout: 10000 });
//         await rowElement.moveTo();
//     }
// 
//     async openClientsThreeDotMenuByName(clientName, occurrence = 1) {
//         const row = await this.rowByClientName(clientName, occurrence);
//         await row.waitForDisplayed({ timeout: 10000 });
// 
//         const menuButton = await row.$('.//button[contains(@aria-label, "More") or contains(@aria-label, "Options") or contains(normalize-space(.), "...")]');
//         const menuVisible = await menuButton.isDisplayed().catch(() => false);
// 
//         if (menuVisible) {
//             await menuButton.click();
//         }
//     }
// 
//     async clickEditOnClient(clientName, occurrence = 1) {
//         await browser.keys("Escape");
//         await browser.pause(150);
// 
//         const isEditLoaded = async () => {
//             const headingVisible = await this.editPageHeading.isDisplayed().catch(() => false);
//             const nameVisible = await this.editPartyNameInput.isDisplayed().catch(() => false);
//             const urlVisible = await this.editUrlInput.isDisplayed().catch(() => false);
//             return headingVisible || nameVisible || urlVisible;
//         };
// 
//         const row = await this.findClientRowWithSearch(clientName, occurrence);
//         await row.waitForDisplayed({ timeout: 10000 });
//         await row.moveTo();
// 
//         const inlineEdit = await row.$('.//button[contains(@aria-label, "Edit") or @title="Edit"]');
//         if (await inlineEdit.isDisplayed().catch(() => false)) {
//             try {
//                 await inlineEdit.click();
//             } catch (error) {
//                 await browser.execute((el) => el.click(), inlineEdit);
//             }
// 
//             const loadedAfterInline = await browser.waitUntil(async () => await isEditLoaded(), {
//                 timeout: 4000,
//                 interval: 250,
//                 timeoutMsg: "Edit view not visible yet"
//             }).then(() => true).catch(() => false);
// 
//             if (loadedAfterInline) {
//                 return;
//             }
//         }
// 
//         await this.openClientsThreeDotMenuByName(clientName, occurrence);
//         await this.clientEditButton.waitForDisplayed({ timeout: 10000 });
//         try {
//             await this.clientEditButton.click();
//         } catch (error) {
//             await browser.execute((el) => el.click(), await this.clientEditButton);
//         }
// 
//         await browser.waitUntil(async () => await isEditLoaded(), {
//             timeout: 10000,
//             interval: 250,
//             timeoutMsg: "Edit view did not appear after clicking Edit"
//         });
//     }
// 
//     async clickDeleteOnClient(clientName, occurrence = 1) {
//         await browser.keys("Escape");
//         await browser.pause(150);
// 
//         const row = await this.findClientRowWithSearch(clientName, occurrence);
//         await row.waitForDisplayed({ timeout: 10000 });
//         await row.moveTo();
// 
//         const inlineDelete = await row.$('.//button[contains(@aria-label, "Delete") or @title="Delete"]');
//         if (await inlineDelete.isDisplayed().catch(() => false)) {
//             try {
//                 await inlineDelete.click();
//                 return;
//             } catch (error) {
//                 await browser.execute((el) => el.click(), inlineDelete);
//                 return;
//             }
//         }
// 
//         await this.openClientsThreeDotMenuByName(clientName, occurrence);
//         await this.clientDeleteButton.waitForDisplayed({ timeout: 10000 });
//         try {
//             await this.clientDeleteButton.click();
//         } catch (error) {
//             await browser.execute((el) => el.click(), await this.clientDeleteButton);
//         }
//     }
// 
//     async cancelDeleteClient() {
//         await this.doNotDeleteButtonCard.waitForDisplayed({ timeout: 10000 });
//         await this.doNotDeleteButtonCard.click();
//     }
// 
//     async waitForEditPage() {
//         await browser.waitUntil(async () => {
//             const headingVisible = await this.editPageHeading.isDisplayed().catch(() => false);
//             const nameVisible = await this.editPartyNameInput.isDisplayed().catch(() => false);
//             const urlVisible = await this.editUrlInput.isDisplayed().catch(() => false);
//             const addressVisible = await this.editAddressInput.isDisplayed().catch(() => false);
//             return headingVisible || (nameVisible && urlVisible) || (nameVisible && addressVisible);
//         }, {
//             timeout: 15000,
//             timeoutMsg: "Edit card did not load expected form fields"
//         });
//     }
// 
//     async fillClientCoreFields(data) {
//         await this.clearAndType(this.editPartyNameInput, data.partyName);
//         await this.clearAndType(this.editUrlInput, data.url);
//         await this.clearAndType(this.editAddressInput, data.address1);
// 
//         if (data.address2) {
//             await this.clearAndType(this.editAddress2Input, data.address2);
//         }
// 
//         await this.clearAndType(this.editCityInput, data.city);
//         await this.clearAndType(this.editStateInput, data.state);
//         await this.clearAndType(this.editZipInput, data.zip);
//     }
// 
//     async openAddPhoneNumberDialog() {
//         // Dismiss any blocking backdrops first
//         await this.dismissBlockingBackdrops();
//         await browser.pause(200);
// 
//         // Check if we can find a phone add button
//         const phoneButtonFound = await browser.execute(() => {
//             // Look for phone button - could be on main page or in dialogs
//             const buttons = Array.from(document.querySelectorAll('button'));
//             const phoneBtn = buttons.find(btn => 
//                 btn.getAttribute('data-testid') === 'phone-panel-add-button' ||
//                 btn.getAttribute('aria-label')?.includes('Add Phone') ||
//                 (btn.textContent.includes('Add') && btn.textContent.includes('Phone'))
//             );
//             
//             return !!phoneBtn;
//         });
// 
//         if (!phoneButtonFound) {
//             // Phone button not available (we might be in a contact dialog where phones aren't editable here)
//             throw new Error('Phone add button not available in current context');
//         }
// 
//         // Phone button is available
//             const addPhoneButton = await this.addPhoneButton;
//             try {
//                 await addPhoneButton.waitForDisplayed({ timeout: 5000 });
//             } catch (error) {
//                 await browser.execute((el) => el?.click(), addPhoneButton).catch(() => null);
//             }
// 
//         try {
//                 await addPhoneButton.click();
//         } catch (e) {
//                 await browser.execute((el) => el.click(), addPhoneButton);
//         }
// 
//         // Wait for dialog heading to appear
//         await this.addPhoneNumberDialogHeading.waitForDisplayed({ timeout: 10000 });
//     }
// 
//     async getAddPhoneDialogContainer() {
//         const heading = await this.addPhoneNumberDialogHeading;
//         await heading.waitForDisplayed({ timeout: 10000 });
// 
//         const container = await heading.$('./ancestor::*[@role="dialog" or contains(@class, "Dialog") or contains(@class, "Popover") or contains(@class, "Card")][1]');
//         const containerDisplayed = await container.isDisplayed().catch(() => false);
// 
//         if (containerDisplayed) {
//             return container;
//         }
// 
//         return heading;
//     }
// 
//     async getPhoneInputsFromDialog() {
//         // Use JavaScript to find all visible text inputs within any visible dialog
//         const dialogInputs = await browser.execute(() => {
//             // Find all elements that might be dialogs (containing "Add Phone Number" text)
//             const possibleDialogs = Array.from(
//                 document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
//             ).filter(el => {
//                 const text = el.textContent || '';
//                 return text.includes('Add Phone Number');
//             });
// 
//             if (possibleDialogs.length === 0) {
//                 return [];
//             }
// 
//             const dialog = possibleDialogs[0];
//             
//             // Find all text inputs within the dialog
//             const allInputs = Array.from(dialog.querySelectorAll('input[type="text"]:not([disabled]):not([readonly])'));
//             
//             // Filter out address fields (they'll have address-related names/placeholders)
//             const phoneInputs = allInputs.filter(input => {
//                 const name = (input.name || '').toLowerCase();
//                 const placeholder = (input.placeholder || '').toLowerCase();
//                 const ariaLabel = (input.getAttribute('aria-label') || '').toLowerCase();
//                 const isAddress = name.includes('address') || placeholder.includes('address') || ariaLabel.includes('address');
//                 return !isAddress;
//             });
// 
//             return phoneInputs.map(input => ({
//                 selector: 'element',
//                 index: allInputs.indexOf(input)
//             }));
//         });
// 
//         // Convert indices back to WebdriverIO elements
//         if (dialogInputs.length === 0) {
//             return [];
//         }
// 
//         // Get fresh dialog container and query for inputs
//         const dialogContainer = await this.addPhoneNumberDialogHeading.$(
//             'ancestor::div[1] | ancestor::*[contains(@class, "Dialog") or contains(@class, "Popover") or contains(@class, "Card") or @role="dialog"][1]'
//         ).catch(() => null);
// 
//         if (!dialogContainer) {
//             return [];
//         }
// 
//         // Now get the actual inputs using relative selectors
//         const inputs = await dialogContainer.$$('input[type="text"]:not([disabled]):not([readonly])');
//         
//         // Filter to exclude address inputs
//         const filtered = [];
//         for (const input of inputs) {
//             try {
//                 const name = (await input.getAttribute('name') || '').toLowerCase();
//                 const placeholder = (await input.getAttribute('placeholder') || '').toLowerCase();
//                 const ariaLabel = (await input.getAttribute('aria-label') || '').toLowerCase();
//                 const isAddress = name.includes('address') || placeholder.includes('address') || ariaLabel.includes('address');
//                 
//                 if (!isAddress) {
//                     filtered.push(input);
//                 }
//             } catch (e) {
//                 // Skip if we can't query attributes
//             }
//         }
// 
//         return filtered;
//     }
// 
//     async addPhoneNumberEntry({ number, type, makePrimary = false }) {
//         try {
//             await this.openAddPhoneNumberDialog();
//         } catch (e) {
//             // Phone button not available in this context (e.g., inside "Create New Contact" dialog)
//             // Just skip phone entry
//             return;
//         }
// 
//         // Use JavaScript to fill phone number in the dialog
//         const phoneEntered = await browser.execute((phoneNum) => {
//             // Find the dialog containing "Add Phone Number"
//             const dialogs = Array.from(
//                 document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
//             ).filter(el => el.textContent.includes('Add Phone Number'));
//             
//             if (dialogs.length === 0) return false;
//             
//             const dialog = dialogs[0];
//             const inputs = Array.from(dialog.querySelectorAll('input[type="text"]:not([disabled]):not([readonly])'));
//             
//             // Find first input that's not address-related
//             for (const input of inputs) {
//                 const attrs = (input.name + input.placeholder + input.getAttribute('data-testid')).toLowerCase();
//                 if (!attrs.includes('address')) {
//                     input.focus();
//                     input.value = phoneNum;
//                     input.dispatchEvent(new Event('input', { bubbles: true }));
//                     input.dispatchEvent(new Event('change', { bubbles: true }));
//                     input.dispatchEvent(new Event('blur', { bubbles: true }));
//                     return true;
//                 }
//             }
//             return false;
//         }, number);
// 
//         if (!phoneEntered) {
//             // Fallback: keyboard entry
//             await this.addPhoneNumberDialogHeading.click();
//             await browser.keys(number);
//         }
// 
//         // Handle phone type selection
//         const typeSelected = await browser.execute((phoneType) => {
//             const dialogs = Array.from(
//                 document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
//             ).filter(el => el.textContent.includes('Add Phone Number'));
//             
//             if (dialogs.length === 0) return false;
//             
//             const dialog = dialogs[0];
//             
//             // Try to find and click dropdown button
//             const buttons = Array.from(dialog.querySelectorAll('button'));
//             const typeButton = buttons.find(btn => 
//                 btn.textContent.includes('Select or Enter') || 
//                 btn.textContent.includes('Phone') ||
//                 btn.textContent.includes('Type')
//             );
//             
//             if (typeButton) {
//                 typeButton.click();
//                 return 'dropdown-clicked';
//             }
//             return false;
//         }, type);
// 
//         if (typeSelected === 'dropdown-clicked') {
//             // Wait for options to appear
//             await browser.pause(300);
//             
//             // Try to select the option
//             const optionSelected = await browser.execute((phoneType) => {
//                 const options = Array.from(
//                     document.querySelectorAll('[role="option"], .ms-Button-label')
//                 ).filter(el => el.textContent.trim() === phoneType);
//                 
//                 if (options.length > 0) {
//                     options[0].click();
//                     return true;
//                 }
//                 return false;
//             }, type);
// 
//             if (!optionSelected) {
//                 // Fallback: type the value
//                 await browser.keys(type);
//                 await browser.keys('Enter');
//             }
//         } else {
//             // Fallback: use keyboard
//             await browser.keys(type);
//             await browser.keys('Enter');
//         }
// 
//         // Handle primary toggle
//         if (makePrimary) {
//             await browser.execute(() => {
//                 const dialogs = Array.from(
//                     document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
//                 ).filter(el => el.textContent.includes('Add Phone Number'));
//                 
//                 if (dialogs.length === 0) return;
//                 
//                 const dialog = dialogs[0];
//                 const toggle = dialog.querySelector('[role="switch"][aria-label*="Primary"], input[type="checkbox"][aria-label*="Primary"]');
//                 
//                 if (toggle && !toggle.checked && !toggle.getAttribute('aria-checked') === 'true') {
//                     toggle.click();
//                 }
//             });
//         }
// 
//         // Submit the dialog
//         const submitted = await browser.execute(() => {
//             const dialogs = Array.from(
//                 document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
//             ).filter(el => el.textContent.includes('Add Phone Number'));
//             
//             if (dialogs.length === 0) return false;
//             
//             const dialog = dialogs[0];
//             const buttons = Array.from(dialog.querySelectorAll('button'));
//             const submitBtn = buttons.find(btn => 
//                 btn.textContent.includes('Submit') || 
//                 btn.textContent.includes('Add') || 
//                 btn.textContent.includes('Create') ||
//                 btn.type === 'submit'
//             );
//             
//             if (submitBtn) {
//                 submitBtn.click();
//                 return true;
//             }
//             return false;
//         });
// 
//         if (!submitted) {
//             await browser.keys('Enter');
//         }
// 
//         // Wait for dialog to close
//         await browser.waitUntil(async () => {
//             const dialogOpen = await this.addPhoneNumberDialogHeading.isDisplayed().catch(() => false);
//             return !dialogOpen;
//         }, {
//             timeout: 10000,
//             timeoutMsg: "Add Phone Number dialog did not close after submit"
//         });
//     }
// 
//     async closeAddPhoneNumberDialog() {
//         if (await this.closeAddPhoneDialogButton.isDisplayed().catch(() => false)) {
//             await this.closeAddPhoneDialogButton.click();
//         } else {
//             await browser.keys("Escape");
//         }
// 
//         await browser.waitUntil(async () => {
//             const dialogOpen = await this.addPhoneNumberDialogHeading.isDisplayed().catch(() => false);
//             return !dialogOpen;
//         }, {
//             timeout: 10000,
//             timeoutMsg: "Add Phone Number dialog did not close"
//         });
//     }
// 
//     async setPreviewSizesInOrder(order) {
//         for (const size of order) {
//             await this.previewSizesDropdown.waitForDisplayed({ timeout: 10000 });
//             await this.previewSizesDropdown.click();
//             const option = await this.previewSizeOption(size);
//             if (await option.isDisplayed().catch(() => false)) {
//                 await option.click();
//             } else {
//                 await browser.keys("Escape");
//             }
//             await browser.pause(200);
//         }
//     }
// 
//     async closeAnyContactCardAndCancelDeleteIfShown() {
//         const closeButtons = await this.contactsSectionCloseButtons;
//         if (closeButtons.length === 0) {
//             return;
//         }
// 
//         await closeButtons[0].click();
//         const deletePromptVisible = await this.deleteConfirmDialogHeading.isDisplayed().catch(() => false);
//         if (deletePromptVisible) {
//             await this.cancelDeleteClient();
//         }
//     }
// 
//     async openAddContactDialog() {
//         await this.addContactButton.waitForDisplayed({ timeout: 10000 });
//         await this.addContactButton.click();
//         await this.addContactHeading.waitForDisplayed({ timeout: 10000 });
//     }
// 
//     async fillAddContactForm(data) {
//         // Wait for dialog to be visible
//         await this.addContactHeading.waitForDisplayed({ timeout: 10000 });
//         await browser.pause(200);
// 
//         // Use JavaScript to fill all contact form fields
//         const filled = await browser.execute((contactData) => {
//             // Find the Add Contact dialog
//             const dialogs = Array.from(
//                 document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
//             ).filter(el => el.textContent.includes('Add Contact'));
//             
//             if (dialogs.length === 0) return { success: false, reason: 'no dialog' };
//             
//             const dialog = dialogs[0];
//             const inputs = Array.from(dialog.querySelectorAll('input[type="text"]:not([disabled]):not([readonly])'));
//             
//             if (inputs.length === 0) return { success: false, reason: 'no inputs' };
//             
//             // Map fields by finding which input corresponds to which field
//             const fieldMap = {};
//             for (let i = 0; i < inputs.length; i++) {
//                 const input = inputs[i];
//                 const attrs = (
//                     input.name + 
//                     input.placeholder + 
//                     input.getAttribute('data-testid') + 
//                     input.getAttribute('aria-label')
//                 ).toLowerCase();
//                 
//                 if (attrs.includes('name')) {
//                     fieldMap.name = i;
//                 } else if (attrs.includes('title')) {
//                     fieldMap.title = i;
//                 } else if (attrs.includes('email')) {
//                     fieldMap.email = i;
//                 } else if (attrs.includes('address 2')) {
//                     fieldMap.address2 = i;
//                 } else if (attrs.includes('address')) {
//                     fieldMap.address1 = i;
//                 } else if (attrs.includes('city')) {
//                     fieldMap.city = i;
//                 } else if (attrs.includes('state')) {
//                     fieldMap.state = i;
//                 } else if (attrs.includes('zip')) {
//                     fieldMap.zip = i;
//                 }
//             }
//             
//             // Fill each field that exists
//             const fillField = (value, fieldName) => {
//                 if (!value || fieldMap[fieldName] === undefined) return false;
//                 const input = inputs[fieldMap[fieldName]];
//                 input.focus();
//                 input.value = value;
//                 input.dispatchEvent(new Event('input', { bubbles: true }));
//                 input.dispatchEvent(new Event('change', { bubbles: true }));
//                 return true;
//             };
//             
//             const results = {
//                 name: fillField(contactData.name, 'name'),
//                 title: fillField(contactData.title, 'title'),
//                 email: fillField(contactData.email, 'email'),
//                 address1: fillField(contactData.address1, 'address1'),
//                 address2: fillField(contactData.address2, 'address2'),
//                 city: fillField(contactData.city, 'city'),
//                 state: fillField(contactData.state, 'state'),
//                 zip: fillField(contactData.zip, 'zip'),
//             };
//             
//             return { success: true, filled: results };
//         }, data);
// 
//         // If JavaScript fill didn't work perfectly, try fallbacks for critical fields
//         if (!filled.success || !filled.filled?.email) {
//             // Fall back to clearAndType for email  which is most critical
//             try {
//                 await this.clearAndType(this.addContactEmailInput, data.email);
//             } catch (e) {
//                 // Last resort: keyboard entry
//                 await browser.keys(data.email);
//             }
//         }
//     }
// 
//     async ensureCreateNewContactToggle(desiredOn) {
//         // Use JavaScript to find and toggle the "Create New Contact" switch
//         const toggled = await browser.execute((shouldBeOn) => {
//             // Find the dialog containing "Add Contact"
//             const dialogs = Array.from(
//                 document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
//             ).filter(el => el.textContent.includes('Add Contact'));
//             
//             if (dialogs.length === 0) return { found: false, reason: 'no dialog' };
//             
//             const dialog = dialogs[0];
//             
//             // Find Create New Contact toggle/switch by looking for text and parent container
//             const allElements = Array.from(dialog.querySelectorAll('*'));
//             const toggleLabel = allElements.find(el => 
//                 el.textContent.includes('Create New Contact') && 
//                 (el.textContent.length < 100)
//             );
//             
//             if (!toggleLabel) return { found: false, reason: 'no label found' };
//             
//             // Find the switch/checkbox near the label
//             const labelContainer = toggleLabel.closest('div') || toggleLabel;
//             const toggle = labelContainer.querySelector('[role="switch"]') || 
//                           labelContainer.querySelector('input[type="checkbox"]') ||
//                           toggleLabel.parentElement?.querySelector('[role="switch"]') ||
//                           toggleLabel.parentElement?.querySelector('input[type="checkbox"]');
//             
//             if (!toggle) return { found: false, reason: 'no toggle found' };
//             
//             // Check current state
//             const isOn = toggle.getAttribute('aria-checked') === 'true' || 
//                         toggle.checked === true ||
//                         toggle.classList.contains('is-checked') ||
//                         toggle.classList.contains('checked');
//             
//             // Toggle if needed
//             if (isOn !== shouldBeOn) {
//                 toggle.click();
//                 return { found: true, toggled: true, wasOn: isOn, nowOn: shouldBeOn };
//             }
//             
//             return { found: true, toggled: false, alreadyOn: isOn };
//         }, desiredOn);
// 
//         if (!toggled.found) {
//             // Fallback: try the original selector
//             const toggleVisible = await this.createNewContactToggle.isDisplayed().catch(() => false);
//             if (toggleVisible) {
//                 const isSelected = await this.createNewContactToggle.isSelected().catch(() => false);
//                 if (isSelected !== desiredOn) {
//                     await this.createNewContactToggle.click();
//                 }
//             }
//         }
// 
//         // Wait for form fields to appear
//         await browser.pause(300);
//     }
// 
//     async submitCreateNewContact() {
//         // Wait a bit for any form updates
//         await browser.pause(300);
// 
//         // Use JavaScript to find and click the submit button
//         const clicked = await browser.execute(() => {
//             // Find the Add Contact dialog
//             const dialogs = Array.from(
//                 document.querySelectorAll('[role="dialog"], [class*="Dialog"], [class*="Popover"], [class*="Card"], .fui-DialogSurface')
//             ).filter(el => el.textContent.includes('Add Contact'));
//             
//             if (dialogs.length === 0) return false;
//             
//             const dialog = dialogs[0];
//             
//             // Find buttons in the dialog
//             const buttons = Array.from(dialog.querySelectorAll('button'));
//             
//             // Look for submit button - could be "Create New Contact", "Add New Contact", "Add Contact", etc.
//             const submitBtn = buttons.find(btn => {
//                 const text = btn.textContent.toLowerCase();
//                 return (text.includes('add') || text.includes('create')) && 
//                        (text.includes('contact') || text.includes('new')) &&
//                        !text.includes('cancel');
//             });
//             
//             if (submitBtn && !submitBtn.disabled) {
//                 submitBtn.click();
//                 return true;
//             }
//             
//             return false;
//         });
// 
//         if (!clicked) {
//             // Fallback to waiting for the selector button
//             const buttonVisible = await this.createNewContactButton.isDisplayed().catch(() => false);
//             if (buttonVisible) {
//                 await this.createNewContactButton.click();
//             }
//         }
// 
//         await browser.pause(500);
//     }
// 
//     async selectExistingContactsIfAny() {
//         await this.ensureCreateNewContactToggle(false);
//         await browser.pause(300);
// 
//         const checkboxes = await this.selectableContactCheckboxes;
//         if (checkboxes.length === 0) {
//             return false;
//         }
// 
//         await checkboxes[0].click();
// 
//         const canSubmit = await this.selectContactsSubmitButton.isDisplayed().catch(() => false);
//         if (canSubmit) {
//             await this.selectContactsSubmitButton.click();
//             await browser.pause(500);
//             return true;
//         }
// 
//         return false;
//     }
// 
//     async cancelAddContactDialog() {
//         const addContactOpen = await this.addContactHeading.isDisplayed().catch(() => false);
//         if (!addContactOpen) {
//             return;
//         }
// 
//         const cancelVisible = await this.addContactCancelButton.isDisplayed().catch(() => false);
//         if (!cancelVisible) {
//             await browser.keys("Escape");
//             await browser.pause(300);
//             return;
//         }
// 
//         await this.addContactCancelButton.click();
//         await browser.pause(300);
//     }
// 
//     async selectClientByName(clientName, occurrence = 1) {
//         const row = await this.rowByClientName(clientName, occurrence);
//         await row.waitForDisplayed({ timeout: 10000 });
// 
//         const checkbox = await row.$('.//input[@type="checkbox"]');
//         await checkbox.waitForDisplayed({ timeout: 10000 });
//         await checkbox.click();
//     }
// 
//     async goBackToClientsListPage() {
//         if (await this.breadcrumbClientsLink.isDisplayed().catch(() => false)) {
//             await this.breadcrumbClientsLink.click();
//             const loaded = await this.waitForClientsThirdPartiesPage().then(() => true).catch(() => false);
//             if (loaded) {
//                 return;
//             }
//         }
// 
//         if (await this.cancelEditButton.isDisplayed().catch(() => false)) {
//             await this.cancelEditButton.click();
//             const loaded = await this.waitForClientsThirdPartiesPage().then(() => true).catch(() => false);
//             if (loaded) {
//                 return;
//             }
//         }
// 
//         await this.openClientsThirdPartiesFromSidebar();
// 
//         const loaded = await this.waitForClientsThirdPartiesPage().then(() => true).catch(() => false);
//         if (loaded) {
//             return;
//         }
// 
//         await browser.refresh();
//         await this.openClientsThirdPartiesFromSidebar();
//         await this.waitForClientsThirdPartiesPage();
//     }
// }
// 
// export default new DashboardClientsThirdPartiesPage();

import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardClientsThirdPartiesPage extends Page {
    get clientsSidebarButton() {
        return $('//button[@data-testid="vert-nav-clients-parties"] | //a[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")] | //button[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")]');
    }

    get pageTitle() {
        return $('//h1[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")]');
    }

    get searchLabel() {
        return $('//label[contains(normalize-space(.), "Search")] | //span[contains(normalize-space(.), "Search")]');
    }

    get searchInput() {
        return $('//input[@type="search" or contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "search clients/3rd parties") or contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "search clients") or contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "search") or contains(translate(@aria-label, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "search")]');
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

    get addPhoneButton() {
        return $('//button[@data-testid="phone-panel-add-button"] | //button[contains(@aria-label, "Add Phone")] | //*[contains(normalize-space(.), "Phone Numbers")]/following::button[1]');
    }

    get addPhoneNumberDialogHeading() {
        return $('//h2[contains(normalize-space(.), "Add Phone Number")] | //h3[contains(normalize-space(.), "Add Phone Number")]');
    }

    get closeAddPhoneDialogButton() {
        return $('//button[@data-testid="phone-dialog-cancel-button"] | (//div[@role="dialog"][.//*[contains(normalize-space(.), "Add Phone Number")]] | //div[contains(@class, "fui-DialogSurface")][.//*[contains(normalize-space(.), "Add Phone Number")]])//button[normalize-space(.)="Cancel" or normalize-space(.)="Close"]');
    }

    get previewSizesDropdown() {
        return $('//button[contains(@aria-label, "Preview Sizes") or contains(normalize-space(.), "option") or contains(normalize-space(.), "small") or contains(normalize-space(.), "medium") or contains(normalize-space(.), "large")]');
    }

    get addContactButton() {
        return $('//button[@data-testid="edit-party-add-contact-button"] | //button[contains(normalize-space(.), "Add Contact")]');
    }

    get addContactHeading() {
        return $('//h2[contains(normalize-space(.), "Add Contact")] | //h3[contains(normalize-space(.), "Add Contact")]');
    }

    get createNewContactToggle() {
        return $('//*[@data-testid="select-contacts-create-new-contact-link"] | //label[contains(normalize-space(.), "Create New Contact")]/preceding::*[@role="switch"][1] | //label[contains(normalize-space(.), "Create New Contact")]/following::*[@role="switch"][1] | //*[@role="switch"][contains(@aria-label, "Create New Contact") or contains(@name, "createNewContact") or contains(@id, "createNewContact")]');
    }

    get createNewContactButton() {
        return $('//button[contains(normalize-space(.), "Create New Contact") or contains(normalize-space(.), "Add New Contact") or contains(normalize-space(.), "Add Contact")]');
    }

    get selectContactsSubmitButton() {
        return $('[data-testid="select-contacts-submit-button"]');
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
        return $(`//*[(@role="option" or self::span or self::div or self::button) and normalize-space(.)="${phoneType}"]`);
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

    async isVisible(element) {
        return await element.isDisplayed().catch(() => false);
    }

    async clickElement(element) {
        const realElement = await element;
        await realElement.waitForExist({ timeout: 10000 });
        try {
            await realElement.waitForDisplayed({ timeout: 10000 });
            await realElement.click();
        } catch (error) {
            await browser.execute((item) => item.click(), realElement);
        }
    }

    async typeInto(element, value) {
        const realElement = await element;
        await realElement.waitForExist({ timeout: 10000 });
        await realElement.waitForDisplayed({ timeout: 4000 }).catch(() => null);
        try {
            await realElement.click();
        } catch (error) {
            await browser.execute((item) => item.click(), realElement);
        }
        await realElement.clearValue();
        await realElement.setValue(value);
    }

    async getVisibleElement(elements) {
        for (const element of elements) {
            const realElement = await element;
            if (await realElement.isDisplayed().catch(() => false)) {
                return realElement;
            }
        }
        return null;
    }

    async getDialog(titleText) {
        // Search top-down: find the outermost container that CONTAINS the heading.
        // Using ancestor:: finds the wrong element (fui-DialogTitle wraps the heading
        // and is the closest ancestor matching "Dialog" in its class, but it has no
        // form fields inside it). Searching by containment instead always returns
        // the real dialog body so field selectors work correctly.
        const candidates = [
            $(`//div[@role="dialog"][.//h2[contains(normalize-space(.), "${titleText}")] or .//h3[contains(normalize-space(.), "${titleText}")]]`),
            $(`//div[contains(@class, "fui-DialogSurface")][.//h2[contains(normalize-space(.), "${titleText}")] or .//h3[contains(normalize-space(.), "${titleText}")]]`),
            $(`//div[contains(@class, "fui-DialogBody")][.//h2[contains(normalize-space(.), "${titleText}")] or .//h3[contains(normalize-space(.), "${titleText}")]]`),
            $(`//div[contains(@class, "fui-Dialog")][.//h2[contains(normalize-space(.), "${titleText}")] or .//h3[contains(normalize-space(.), "${titleText}")]]`)
        ];

        for (const candidate of candidates) {
            if (await candidate.isDisplayed().catch(() => false)) {
                return candidate;
            }
        }
        return null;
    }

    async dismissBlockingBackdrops() {
        for (let i = 0; i < 4; i += 1) {
            const backdropShowing = await this.dialogBackdrop.isDisplayed().catch(() => false);
            if (!backdropShowing) {
                return;
            }
            await browser.keys("Escape");
            await browser.pause(250);
        }
    }

    async waitForClientsSidebarButton() {
        await this.clientsSidebarButton.waitForDisplayed({ timeout: 10000 });
    }

    async hasClientsPageControls() {
        const hasTitle = await this.isVisible(this.pageTitle);
        const hasSearch = await this.isVisible(this.searchInput);
        const hasCreate = await this.isVisible(this.createButton);
        const hasGrid = await this.isVisible(this.tableGrid);
        const hasNameHeader = await this.isVisible(this.nameColumnHeader);
        const hasAddressHeader = await this.isVisible(this.addressColumnHeader);
        return hasTitle || hasSearch || hasCreate || hasGrid || hasNameHeader || hasAddressHeader;
    }

    async isOnClientsThirdPartiesPage() {
        const onUrl = (await browser.getUrl()).toLowerCase().includes("clientsparties");
        const goodPage = await this.hasClientsPageControls();
        return (onUrl && goodPage) || goodPage;
    }

    async waitForClientsThirdPartiesPage() {
        await browser.waitUntil(async () => {
            const onUrl = (await browser.getUrl()).toLowerCase().includes("clientsparties");
            const hasControls = await this.hasClientsPageControls();
            return onUrl && hasControls;
        }, {
            timeout: 15000,
            timeoutMsg: "Clients / 3rd Parties page did not load expected controls"
        });
    }

    async openClientsThirdPartiesDirectly() {
        const currentUrl = await browser.getUrl();
        await browser.keys("Escape").catch(() => null);
        const dashboardUrl = new URL('/account/dashboard', currentUrl).toString();
        await browser.url(dashboardUrl);
        await this.waitForClientsSidebarButton();
        await this.clickElement(this.clientsSidebarButton);
        await this.waitForClientsThirdPartiesPage();
    }

    async openClientsThirdPartiesFromSidebar() {
        if (!(await this.isOnClientsThirdPartiesPage())) {
            await this.waitForClientsSidebarButton();
            await this.clickElement(this.clientsSidebarButton);
        }

        const pageLoaded = await this.waitForClientsThirdPartiesPage().then(() => true).catch(() => false);
        if (pageLoaded) {
            return;
        }

        await browser.refresh();
        await this.waitForClientsSidebarButton();
        await this.clickElement(this.clientsSidebarButton);
        const loadedAfterRefresh = await this.waitForClientsThirdPartiesPage().then(() => true).catch(() => false);
        if (loadedAfterRefresh) {
            return;
        }

        await this.openClientsThirdPartiesDirectly();
    }

    async waitForGridOrEmptyState() {
        await browser.waitUntil(async () => {
            const gridIsVisible = await this.isVisible(this.tableGrid);
            const emptyIsVisible = await this.isVisible(this.emptyStateMessage);
            return gridIsVisible || emptyIsVisible;
        }, {
            timeout: 10000,
            timeoutMsg: "Clients / 3rd Parties grid or empty state did not appear"
        }).catch(async () => {
            await this.openClientsThirdPartiesDirectly().catch(() => null);

            const gridIsVisible = await this.isVisible(this.tableGrid);
            const emptyIsVisible = await this.isVisible(this.emptyStateMessage);

            if (gridIsVisible || emptyIsVisible) {
                return;
            }

            throw new Error("Clients / 3rd Parties grid or empty state did not appear");
        });
    }

    async searchForClient(searchText) {
        if (!(await this.isOnClientsThirdPartiesPage())) {
            await this.openClientsThirdPartiesFromSidebar();
            await this.waitForGridOrEmptyState();
        }

        let input = await this.getVisibleElement([
            this.searchInput,
            $('input[placeholder*="Search Clients"], input[placeholder*="Clients/3rd Parties"], input[aria-label*="Search Clients"], input[type="search"]'),
            $('//label[contains(normalize-space(.), "Search")]/following::input[1]')
        ]);

        if (!input) {
            await this.openClientsThirdPartiesFromSidebar();
            await this.waitForClientsThirdPartiesPage();
            input = await this.getVisibleElement([
                this.searchInput,
                $('input[placeholder*="Search Clients"], input[placeholder*="Clients/3rd Parties"], input[aria-label*="Search Clients"], input[type="search"]'),
                $('//label[contains(normalize-space(.), "Search")]/following::input[1]')
            ]);
        }

        if (!input) {
            throw new Error("Could not find a visible Clients / 3rd Parties search input");
        }

        try {
            await this.typeInto(input, searchText);
        } catch (error) {
            await this.openClientsThirdPartiesDirectly();
            await this.waitForGridOrEmptyState();

            const recoveredInput = await this.getVisibleElement([
                this.searchInput,
                $('input[placeholder*="Search Clients"], input[placeholder*="Clients/3rd Parties"], input[aria-label*="Search Clients"], input[type="search"]'),
                $('//label[contains(normalize-space(.), "Search")]/following::input[1]')
            ]);

            if (!recoveredInput) {
                throw error;
            }

            await this.typeInto(recoveredInput, searchText);
        }

        await browser.pause(350);
    }

    async clearSearch() {
        await this.searchForClient("");
    }

    async clickSearchInfoAndDismiss() {
        if (!(await this.isVisible(this.searchInfoButton))) {
            return;
        }
        await this.clickElement(this.searchInfoButton);
        await browser.pause(250);
        await this.clickElement(this.searchLabel);
        await browser.pause(250);
        await this.dismissBlockingBackdrops();
    }

    async findClientRowWithSearch(clientName, occurrence = 1) {
        await this.clearSearch();
        await this.waitForGridOrEmptyState();
        await this.searchForClient(clientName);
        await this.waitForGridOrEmptyState();

        const row = await this.rowByClientName(clientName, occurrence);
        if (await row.isExisting().catch(() => false)) {
            return row;
        }

        await this.clearSearch();
        await this.waitForGridOrEmptyState();
        return this.rowByClientName(clientName, occurrence);
    }

    async getDataRowCount() {
        const rows = await this.dataRows;
        return rows.length;
    }

    async hoverOverClientRow(clientName, occurrence = 1) {
        const row = await this.rowByClientName(clientName, occurrence);
        await row.waitForDisplayed({ timeout: 10000 });
        await row.moveTo();
    }

    async openClientsThreeDotMenuByName(clientName, occurrence = 1) {
        const row = await this.rowByClientName(clientName, occurrence);
        await row.waitForDisplayed({ timeout: 10000 });
        const menuButton = await row.$('.//button[contains(@aria-label, "More") or contains(@aria-label, "Options") or contains(normalize-space(.), "...")]');
        if (await menuButton.isDisplayed().catch(() => false)) {
            await this.clickElement(menuButton);
        }
    }

    async clickEditOnClient(clientName, occurrence = 1) {
        await browser.keys("Escape");
        await browser.pause(150);

        const row = await this.findClientRowWithSearch(clientName, occurrence);
        await row.waitForDisplayed({ timeout: 10000 });
        await row.moveTo();

        const inlineEdit = await row.$('.//button[contains(@aria-label, "Edit") or @title="Edit"]');
        if (await inlineEdit.isDisplayed().catch(() => false)) {
            await this.clickElement(inlineEdit);
        } else {
            await this.openClientsThreeDotMenuByName(clientName, occurrence);
            await this.clickElement(this.clientEditButton);
        }

        await this.waitForEditPage();
    }

    async clickDeleteOnClient(clientName, occurrence = 1) {
        await browser.keys("Escape");
        await browser.pause(150);

        const row = await this.findClientRowWithSearch(clientName, occurrence);
        await row.waitForDisplayed({ timeout: 10000 });
        await row.moveTo();

        const inlineDelete = await row.$('.//button[contains(@aria-label, "Delete") or @title="Delete"]');
        if (await inlineDelete.isDisplayed().catch(() => false)) {
            await this.clickElement(inlineDelete);
            return;
        }

        await this.openClientsThreeDotMenuByName(clientName, occurrence);
        await this.clickElement(this.clientDeleteButton);
    }

    async cancelDeleteClient() {
        await this.clickElement(this.doNotDeleteButtonCard);
    }

    async waitForEditPage() {
        await browser.waitUntil(async () => {
            const headingVisible = await this.isVisible(this.editPageHeading);
            const nameVisible = await this.isVisible(this.editPartyNameInput);
            const urlVisible = await this.isVisible(this.editUrlInput);
            const addressVisible = await this.isVisible(this.editAddressInput);
            return headingVisible || (nameVisible && urlVisible) || (nameVisible && addressVisible);
        }, {
            timeout: 15000,
            timeoutMsg: "Edit card did not load expected form fields"
        });
    }

    async fillClientCoreFields(data) {
        await this.typeInto(this.editPartyNameInput, data.partyName);
        await this.typeInto(this.editUrlInput, data.url);
        await this.typeInto(this.editAddressInput, data.address1);
        if (data.address2) {
            await this.typeInto(this.editAddress2Input, data.address2);
        }
        await this.typeInto(this.editCityInput, data.city);
        await this.typeInto(this.editStateInput, data.state);
        await this.typeInto(this.editZipInput, data.zip);
    }

    async openAddPhoneNumberDialog() {
        await this.dismissBlockingBackdrops();
        await browser.pause(200);

        const addContactDialog = await this.getDialog("Add Contact");
        let button = null;

        if (addContactDialog) {
            button = await this.getVisibleElement([
                addContactDialog.$('.//button[@data-testid="phone-panel-add-button"]'),
                addContactDialog.$('.//button[contains(@aria-label, "Add Phone")]'),
                addContactDialog.$('.//*[contains(normalize-space(.), "Phone Numbers")]/following::button[1]')
            ]);
        }

        if (!button) {
            button = await this.getVisibleElement([
                $('//button[@data-testid="phone-panel-add-button"]'),
                this.addPhoneButton
            ]);
        }

        if (!button) {
            throw new Error("Phone add button not available in current context");
        }

        await this.clickElement(button);
        await this.addPhoneNumberDialogHeading.waitForDisplayed({ timeout: 10000 });
    }

    async addPhoneNumberEntry({ number, type, makePrimary = false }) {
        try {
            await this.openAddPhoneNumberDialog();
        } catch (error) {
            return;
        }

        const dialog = await this.getDialog("Add Phone Number");
        if (!dialog) {
            return;
        }

        const fillPhoneNumber = async () => {
            const currentDialog = await this.getDialog("Add Phone Number");
            if (!currentDialog) {
                return false;
            }

            const phoneNumberWasTyped = await browser.execute((dialogElement, phoneNumber) => {
                const textInputs = Array.from(dialogElement.querySelectorAll('input[type="text"]'));

                function getLabelText(input) {
                    const label = input.closest('div')?.querySelector('label');
                    return (label?.textContent || '').toLowerCase();
                }

                let bestInput = null;

                for (const input of textInputs) {
                    const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
                    const name = (input.getAttribute('name') || '').toLowerCase();
                    const testId = (input.getAttribute('data-testid') || '').toLowerCase();
                    const ariaLabel = (input.getAttribute('aria-label') || '').toLowerCase();
                    const labelText = getLabelText(input);
                    const allText = `${placeholder} ${name} ${testId} ${ariaLabel} ${labelText}`;

                    const looksLikePhoneNumber = testId.includes('phone-dialog-number-input') || allText.includes('phone number') || (allText.includes('phone') && !allText.includes('type'));
                    const looksLikeWrongField = allText.includes('type') || allText.includes('address') || allText.includes('city') || allText.includes('state') || allText.includes('zip');

                    if (looksLikePhoneNumber && !looksLikeWrongField) {
                        bestInput = input;
                        break;
                    }
                }

                if (!bestInput) {
                    for (const input of textInputs) {
                        const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
                        const name = (input.getAttribute('name') || '').toLowerCase();
                        const testId = (input.getAttribute('data-testid') || '').toLowerCase();
                        const ariaLabel = (input.getAttribute('aria-label') || '').toLowerCase();
                        const labelText = getLabelText(input);
                        const allText = `${placeholder} ${name} ${testId} ${ariaLabel} ${labelText}`;

                        const looksLikeWrongField = allText.includes('type') || allText.includes('address') || allText.includes('city') || allText.includes('state') || allText.includes('zip');
                        if (!looksLikeWrongField) {
                            bestInput = input;
                            break;
                        }
                    }
                }

                if (!bestInput) {
                    return false;
                }

                bestInput.focus();
                bestInput.value = '';
                bestInput.dispatchEvent(new Event('input', { bubbles: true }));
                bestInput.value = phoneNumber;
                bestInput.dispatchEvent(new Event('input', { bubbles: true }));
                bestInput.dispatchEvent(new Event('change', { bubbles: true }));
                return bestInput.value === phoneNumber;
            }, currentDialog, number);

            if (phoneNumberWasTyped) {
                return true;
            }

            const phoneInput = await this.getVisibleElement([
                currentDialog.$('.//input[@data-testid="phone-dialog-number-input"]'),
                currentDialog.$('.//label[contains(normalize-space(.), "Phone Number")]/following::input[1]'),
                currentDialog.$('.//input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "phone number")]'),
                currentDialog.$('.//input[contains(translate(@name, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "phone") and not(contains(translate(@name, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "type"))]')
            ]);

            if (phoneInput) {
                await this.typeInto(phoneInput, number);
                return (await phoneInput.getValue().catch(() => "")) === number;
            }

            await browser.keys(number);
            return true;
        };

        const typeInput = await this.getVisibleElement([
            dialog.$('.//input[@data-testid="phone-dialog-type-combobox"]'),
            dialog.$('.//label[contains(normalize-space(.), "Phone type")]/following::input[1]'),
            dialog.$('.//input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "phone type")]'),
            dialog.$('.//input[contains(translate(@name, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "type")]')
        ]);

        if (typeInput) {
            await this.clickElement(typeInput);
            await browser.keys(["Control", "a"]);
            await browser.keys("Backspace");
            await typeInput.clearValue().catch(() => null);
            await typeInput.setValue(type);
            await browser.pause(300);

            const typeOption = await this.getVisibleElement([
                $(`//*[@role="option" and (normalize-space(.)="${type}" or .//*[normalize-space(.)="${type}"])]`),
                $(`//*[(@role="option" or self::span or self::div or self::button) and normalize-space(.)="${type}"]`)
            ]);

            if (typeOption) {
                await this.clickElement(typeOption);
            } else {
                await browser.keys("ArrowDown");
                await browser.pause(150);
                await browser.keys("Enter");
            }
        } else {
            const typeButton = await this.getVisibleElement([
                dialog.$('.//button[contains(normalize-space(.), "Select or Enter Phone Type")]'),
                dialog.$('.//label[contains(normalize-space(.), "Phone type")]/following::button[1]')
            ]);

            if (typeButton) {
                await this.clickElement(typeButton);
                await browser.pause(300);
                const option = await this.getVisibleElement([
                    $(`//*[@role="option" and (normalize-space(.)="${type}" or .//*[normalize-space(.)="${type}"])]`),
                    $(`//*[(@role="option" or self::span or self::div or self::button) and normalize-space(.)="${type}"]`)
                ]);
                if (option) {
                    await this.clickElement(option);
                } else {
                    await browser.keys(type);
                    await browser.keys("Enter");
                }
            } else {
                await browser.keys(type);
                await browser.keys("Enter");
            }
        }

        await browser.pause(200);
        await fillPhoneNumber();

        if (makePrimary) {
            const toggle = await this.getVisibleElement([
                dialog.$('.//*[@role="switch"][contains(@aria-label, "Primary")]'),
                dialog.$('.//input[@type="checkbox"][contains(@aria-label, "Primary")]'),
                dialog.$('.//label[contains(normalize-space(.), "Primary")]/following::*[@role="switch" or @type="checkbox"][1]')
            ]);
            if (toggle) {
                await this.clickElement(toggle);
            }
        }

        const submitButton = await this.getVisibleElement([
            dialog.$('.//button[normalize-space(.)="Submit" or normalize-space(.)="Create" or normalize-space(.)="Add" or @type="submit"]')
        ]);

        if (submitButton) {
            await this.clickElement(submitButton);
        } else {
            await browser.keys("Enter");
        }

        await browser.waitUntil(async () => {
            return !(await this.addPhoneNumberDialogHeading.isDisplayed().catch(() => false));
        }, {
            timeout: 10000,
            timeoutMsg: "Add Phone Number dialog did not close after submit"
        }).catch(() => null);
    }

    async closeAddPhoneNumberDialog() {
        const dialogOpen = await this.addPhoneNumberDialogHeading.isDisplayed().catch(() => false);
        if (!dialogOpen) {
            return;
        }

        if (await this.closeAddPhoneDialogButton.isDisplayed().catch(() => false)) {
            await this.clickElement(this.closeAddPhoneDialogButton);
        } else {
            await browser.keys("Escape");
        }

        await browser.waitUntil(async () => {
            return !(await this.addPhoneNumberDialogHeading.isDisplayed().catch(() => false));
        }, {
            timeout: 10000,
            timeoutMsg: "Add Phone Number dialog did not close"
        }).catch(() => null);
    }

    async setPreviewSizesInOrder(order) {
        for (const size of order) {
            await this.clickElement(this.previewSizesDropdown);
            const option = this.previewSizeOption(size);
            if (await option.isDisplayed().catch(() => false)) {
                await this.clickElement(option);
            } else {
                await browser.keys("Escape");
            }
            await browser.pause(200);
        }
    }

    async closeAnyContactCardAndCancelDeleteIfShown() {
        const buttons = await this.contactsSectionCloseButtons;
        if (buttons.length === 0) {
            return;
        }
        await this.clickElement(buttons[0]);
        if (await this.deleteConfirmDialogHeading.isDisplayed().catch(() => false)) {
            await this.cancelDeleteClient();
        }
    }

    async openAddContactDialog() {
        await this.clickElement(this.addContactButton);
        await this.addContactHeading.waitForDisplayed({ timeout: 10000 });
    }

    async fillDialogInput(dialog, labelText, value, fallbackSelectors = []) {
        if (!value) {
            return false;
        }

        const labelInput = dialog.$(`.//label[contains(normalize-space(.), "${labelText}")]/following::input[1]`);
        const elementList = [labelInput, ...fallbackSelectors];
        const input = await this.getVisibleElement(elementList);
        if (input) {
            await this.typeInto(input, value);
            const typedValue = await input.getValue().catch(() => "");
            return typedValue === value;
        }

        return false;
    }

    async fillRequiredContactField(dialog, fieldName, value, selectors) {
        const input = await this.getVisibleElement(selectors);
        if (!input) {
            throw new Error(`Add Contact missing ${fieldName} textbox`);
        }

        await this.typeInto(input, value);
        const typedValue = await input.getValue().catch(() => "");
        if (typedValue !== value) {
            throw new Error(`Add Contact could not fill ${fieldName} textbox`);
        }
    }

    async fillAddContactForm(data) {
        let dialog = await this.getDialog("Add Contact");
        if (!dialog) {
            throw new Error("Add Contact dialog not open before filling contact form");
        }

        // Wait for the Name field to be visible — it only appears when Create New Contact
        // toggle is ON. If it's not visible yet, give it a moment to render.
        await browser.waitUntil(async () => {
            dialog = await this.getDialog("Add Contact");
            if (!dialog) {
                return false;
            }
            const nameField = await this.getVisibleElement([
                dialog.$('.//input[contains(@placeholder, "name of the Contact")]'),
                dialog.$('.//label[contains(normalize-space(.), "Name")]/following::input[1]')
            ]);
            return Boolean(nameField);
        }, { timeout: 8000, interval: 300, timeoutMsg: "Add Contact Name field did not appear" });

        dialog = await this.getDialog("Add Contact");
        if (!dialog) {
            throw new Error("Add Contact dialog closed before form fill could start");
        }

        await this.fillRequiredContactField(dialog, "Name", data.name, [
            dialog.$('.//label[contains(normalize-space(.), "Name")]/following::input[1]'),
            dialog.$('.//input[@placeholder="Enter the name of the Contact"]'),
            dialog.$('.//input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "name of the contact")]')
        ]);

        await this.fillRequiredContactField(dialog, "Title", data.title, [
            dialog.$('.//label[contains(normalize-space(.), "Title")]/following::input[1]'),
            dialog.$('.//input[@placeholder="Enter the title of the Contact"]'),
            dialog.$('.//input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "title of the contact")]')
        ]);

        await this.fillRequiredContactField(dialog, "Email", data.email, [
            dialog.$('.//label[contains(normalize-space(.), "Email")]/following::input[1]'),
            dialog.$('.//input[@placeholder="Enter the email of the Contact"]'),
            dialog.$('.//input[contains(translate(@placeholder, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "email of the contact")]')
        ]);

        await this.fillRequiredContactField(dialog, "Address", data.address1, [
            dialog.$('.//label[normalize-space(.)="Address"]/following::input[1]'),
            dialog.$('.//input[@placeholder="Enter Address"]')
        ]);

        await this.fillRequiredContactField(dialog, "Address 2", data.address2, [
            dialog.$('.//label[contains(normalize-space(.), "Address 2")]/following::input[1]'),
            dialog.$('.//input[@placeholder="Enter Address 2"]')
        ]);

        await this.fillRequiredContactField(dialog, "City", data.city, [
            dialog.$('.//label[contains(normalize-space(.), "City")]/following::input[1]'),
            dialog.$('.//input[@placeholder="Enter City"]')
        ]);

        await this.fillRequiredContactField(dialog, "State", data.state, [
            dialog.$('.//label[contains(normalize-space(.), "State")]/following::input[1]'),
            dialog.$('.//input[@placeholder="Enter State"]')
        ]);

        await this.fillRequiredContactField(dialog, "Zip", data.zip, [
            dialog.$('.//label[contains(normalize-space(.), "Zip")]/following::input[1]'),
            dialog.$('.//input[@placeholder="Enter Zip"]')
        ]);
    }

    async verifyAddContactDialogReadyForPhoneNumbers() {
        // Step 1: Make sure the Add Contact dialog is open
        let dialog = await this.getDialog("Add Contact");

        if (!dialog) {
            const addContactVisible = await this.addContactButton.isDisplayed().catch(() => false);
            if (addContactVisible) {
                await this.openAddContactDialog();
                dialog = await this.getDialog("Add Contact");
            }
        }

        if (!dialog) {
            return false;
        }

        // Step 2: Ensure "Create New Contact" toggle is ON (top-right of dialog).
        // When OFF the dialog shows a list of existing contacts.
        // When ON it reveals the full form (Name, Title, Email, Address, Phone Numbers).
        const toggle = await this.getVisibleElement([
            dialog.$('.//*[@role="switch"]'),
            dialog.$('.//input[@type="checkbox"]'),
            this.createNewContactToggle
        ]);

        if (toggle) {
            const ariaChecked = await toggle.getAttribute("aria-checked").catch(() => null);
            const isSelected = await toggle.isSelected().catch(() => false);
            const isOn = ariaChecked === "true" || isSelected;

            if (!isOn) {
                await this.clickElement(toggle);
                await browser.pause(300);
                dialog = await this.getDialog("Add Contact");
            }
        }

        if (!dialog) {
            return false;
        }

        // Step 3: Verify the full create-new-contact form is visible (Name, Title, Email, Phone Numbers add button)
        const nameInput = await this.getVisibleElement([
            dialog.$('.//input[contains(@placeholder, "name of the Contact")]'),
            dialog.$('.//label[contains(normalize-space(.), "Name")]/following::input[1]')
        ]);

        const titleInput = await this.getVisibleElement([
            dialog.$('.//input[contains(@placeholder, "title of the Contact")]'),
            dialog.$('.//label[contains(normalize-space(.), "Title")]/following::input[1]')
        ]);

        const emailInput = await this.getVisibleElement([
            dialog.$('.//input[contains(@placeholder, "email of the Contact")]'),
            dialog.$('.//label[contains(normalize-space(.), "Email")]/following::input[1]')
        ]);

        const addPhoneInDialog = await this.getVisibleElement([
            dialog.$('.//button[@data-testid="phone-panel-add-button"]'),
            dialog.$('.//*[contains(normalize-space(.), "Phone Numbers")]/following::button[1]')
        ]);

        const hasCoreFields = Boolean(nameInput || titleInput || emailInput);

        if (!hasCoreFields || !addPhoneInDialog) {
            return false;
        }

        return true;
    }

    async ensureCreateNewContactToggle(desiredOn) {
        const dialog = await this.getDialog("Add Contact");
        if (!dialog) {
            throw new Error("Add Contact dialog is not open when trying to toggle Create New Contact");
        }

        const toggle = await this.getVisibleElement([
            dialog.$('.//*[@data-testid="select-contacts-create-new-contact-link"]'),
            dialog.$('.//label[contains(normalize-space(.), "Create New Contact")]/preceding::*[@role="switch"][1]'),
            dialog.$('.//label[contains(normalize-space(.), "Create New Contact")]/following::*[@role="switch"][1]'),
            dialog.$('.//*[@role="switch"]'),
            this.createNewContactToggle
        ]);

        if (!toggle) {
            throw new Error("Create New Contact toggle was not found in Add Contact dialog");
        }

        const readIsOn = async () => {
            const ariaValue = await toggle.getAttribute("aria-checked").catch(() => null);
            const checkedValue = await toggle.isSelected().catch(() => false);
            return ariaValue === "true" || checkedValue;
        };

        let isOn = await readIsOn();

        if (isOn !== desiredOn) {
            // Retry toggle action because UI occasionally ignores the first click.
            for (let attempt = 0; attempt < 3; attempt += 1) {
                try {
                    await this.clickElement(toggle);
                } catch (error) {
                    await browser.execute((el) => el.click(), toggle).catch(() => null);
                }

                await browser.pause(250);
                isOn = await readIsOn();
                if (isOn === desiredOn) {
                    break;
                }
            }

            if (isOn !== desiredOn) {
                throw new Error("Create New Contact toggle did not switch to the requested state");
            }

            // Wait for the form view to appear after toggling Create New Contact ON,
            // or the contacts-list view to appear after toggling OFF.
            await browser.waitUntil(async () => {
                const refreshedDialog = await this.getDialog("Add Contact");
                if (!refreshedDialog) {
                    return false;
                }
                if (desiredOn) {
                    // Expect Name input to appear (create-new form)
                    const nameField = await this.getVisibleElement([
                        refreshedDialog.$('.//input[contains(@placeholder, "name of the Contact")]'),
                        refreshedDialog.$('.//label[contains(normalize-space(.), "Name")]/following::input[1]')
                    ]);
                    return Boolean(nameField);
                }
                // Expect Select Contacts button to appear (existing-contacts list)
                const selectBtn = await this.getVisibleElement([
                    this.selectContactsSubmitButton,
                    refreshedDialog.$('.//button[contains(normalize-space(.), "Select Contacts")]')
                ]);
                return Boolean(selectBtn);
            }, { timeout: 8000, interval: 300, timeoutMsg: "Add Contact form did not render after toggling" });
        }

        await browser.pause(200);
    }

    async submitCreateNewContact() {
        await browser.pause(300);
        const dialog = await this.getDialog("Add Contact");
        if (!dialog) {
            return;
        }

        const button = await this.getVisibleElement([
            dialog.$('.//button[contains(normalize-space(.), "Add New Contact")]'),
            dialog.$('.//button[contains(normalize-space(.), "Create New Contact")]'),
            dialog.$('.//button[contains(normalize-space(.), "Add Contact")]'),
            this.createNewContactButton
        ]);

        if (button) {
            await this.clickElement(button);
        }

        await browser.pause(500);
    }

    async selectExistingContactsIfAny() {
        await this.ensureCreateNewContactToggle(false);
        await browser.pause(300);

        const dialog = await this.getDialog("Add Contact");
        if (!dialog) {
            return false;
        }

        const checkboxes = await dialog.$$('.//input[@type="checkbox"]');
        let boxToClick = null;
        for (const checkbox of checkboxes) {
            if (await checkbox.isDisplayed().catch(() => false)) {
                boxToClick = checkbox;
                break;
            }
        }

        if (!boxToClick) {
            return false;
        }

        await this.clickElement(boxToClick);

        const submitButton = await this.getVisibleElement([
            this.selectContactsSubmitButton,
            dialog.$('.//button[contains(normalize-space(.), "Select Contacts")]')
        ]);

        if (!submitButton) {
            return false;
        }

        await this.clickElement(submitButton);
        await browser.pause(500);
        return true;
    }

    async cancelAddContactDialog() {
        if (!(await this.addContactHeading.isDisplayed().catch(() => false))) {
            return;
        }

        const dialog = await this.getDialog("Add Contact");
        const cancelButton = await this.getVisibleElement([
            dialog ? dialog.$('.//button[normalize-space(.)="Cancel"]') : this.addContactCancelButton,
            this.addContactCancelButton
        ]);

        if (cancelButton) {
            await this.clickElement(cancelButton);
        } else {
            await browser.keys("Escape");
        }

        await browser.pause(300);
    }

    async goBackToClientsListPage() {
        await browser.keys("Escape").catch(() => null);
        await this.openClientsThirdPartiesDirectly();
    }
}

export default new DashboardClientsThirdPartiesPage();
