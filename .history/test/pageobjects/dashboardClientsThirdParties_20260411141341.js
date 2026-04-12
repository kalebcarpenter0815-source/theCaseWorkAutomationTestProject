import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardClientsThirdPartiesPage extends Page {
    get clientsSidebarButton() {
        return $('//a[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")] | //button[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties") or @data-testid="vert-nav-clients-parties"]');
    }

    get pageTitle() {
        return $('//h1[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")] | //h2[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")] | //div[contains(normalize-space(.), "Clients / 3rd Parties") or contains(normalize-space(.), "Clients/3rd Parties")]');
    }

    get searchLabel() {
        return $('//label[contains(normalize-space(.), "Search")]');
    }

    get searchInput() {
        return $('input[placeholder*="Search Clients/3rd Parties"], input[placeholder*="Search Clients"], input[aria-label*="Search"]');
    }

    get searchInfoButton() {
        return $('//label[contains(normalize-space(.), "Search")]/following::button[1]');
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
        return $$(
            '//div[@role="row"][.//*[@role="gridcell"]]//button[@aria-label] | //tr[td]//button[@aria-label] | //button[@aria-label="More items"]'
        );
    }

    get emptyStateMessage() {
        return $('//*[contains(normalize-space(.), "No clients") or contains(normalize-space(.), "No results") or contains(normalize-space(.), "No data")]');
    }

    get clientCheckboxBtns() {
        return $$('//div[@role="row"][.//*[@role="gridcell"]]//input[@type="checkbox"] | //tr[td]//input[@type="checkbox"]');
    }

    get clientEditButton() {
        return $('//button[normalize-space(.)="Edit" or .//*[contains(normalize-space(.), "Edit")] or contains(@aria-label, "Edit")]');
    }

    get clientDeleteButton() {
        return $('//button[normalize-space(.)="Delete" or .//*[contains(normalize-space(.), "Delete")] or contains(@aria-label, "Delete")]');
    }

    get doNotDeleteButtonCard() {
        return $('//button[normalize-space(.)="No" or normalize-space(.)="Cancel"]');
    }

    get editPageHeading() {
        return $('//h1[contains(normalize-space(.), "Edit") or contains(normalize-space(.), "Create New Client / 3rd Party")] | //h2[contains(normalize-space(.), "Edit") or contains(normalize-space(.), "Create New Client / 3rd Party")]');
    }

    get breadcrumbClientsLink() {
        return $('//a[contains(normalize-space(.), "Clients/Parties") or contains(normalize-space(.), "Clients / 3rd Parties")] | //nav//*[contains(normalize-space(.), "Clients/Parties") or contains(normalize-space(.), "Clients / 3rd Parties")]');
    }

    get cancelEditButton() {
        return $('//button[normalize-space(.)="Cancel" or .//*[contains(normalize-space(.), "Cancel")]]');
    }

    get editPartyNameInput() {
        return $('input[data-testid="party-dialog-name-input"], input[placeholder*="name of the Client / 3rd Party"]');
    }

    get editUrlInput() {
        return $('input[data-testid="party-dialog-url-input"], input[placeholder="Enter Url"]');
    }

    get editAddressInput() {
        return $('input[data-testid="party-dialog-address1-input"], input[placeholder="Enter Address"]');
    }

    get editAddress2Input() {
        return $('input[data-testid="party-dialog-address2-input"], input[placeholder="Enter Address 2"]');
    }

    get editCityInput() {
        return $('input[data-testid="party-dialog-city-input"], input[placeholder="Enter City"]');
    }

    get editStateInput() {
        return $('input[data-testid="party-dialog-state-input"], input[placeholder="Enter State"]');
    }

    get editZipInput() {
        return $('input[data-testid="party-dialog-zip-input"], input[placeholder="Enter Zip"]');
    }

    get phoneNumbersSection() {
        return $('//*[contains(normalize-space(.), "Phone Numbers")]');
    }

    get addPhoneButton() {
        return $('//button[contains(@aria-label, "Add Phone") or contains(@title, "Add Phone") or contains(normalize-space(.), "Add Phone Number")] | //*[contains(normalize-space(.), "Phone Numbers")]/following::button[1]');
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
        return $('//label[contains(normalize-space(.), "Primary")]/following::input[@type="checkbox"][1] | //*[@role="switch"]');
    }

    phoneTypeOption(phoneType) {
        return $(`//*[(@role="option" or self::span) and normalize-space(.)="${phoneType}"]`);
    }

    get closeAddPhoneDialogButton() {
        return $('//button[normalize-space(.)="Cancel" or normalize-space(.)="Close"]');
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

    async scrollIntoView(element) {
        const resolvedElement = await element;
        await browser.execute((el) => {
            el.scrollIntoView({ block: "center", inline: "center" });
        }, resolvedElement);
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

    rowByClientName(clientName) {
        const safeText = this.escapeXpathText(clientName);
        return $(`//div[@role="row"][.//*[@role="gridcell"] and .//*[contains(normalize-space(.), ${safeText})]] | //tr[td][.//*[contains(normalize-space(.), ${safeText})]]`);
    }

    async waitForClientsSidebarButton() {
        await this.clientsSidebarButton.waitForDisplayed({ timeout: 10000 });
    }

    async isOnClientsThirdPartiesPage() {
        const titleVisible = await this.pageTitle.isDisplayed().catch(() => false);
        const searchVisible = await this.searchInput.isDisplayed().catch(() => false);
        return titleVisible || searchVisible;
    }

    async openClientsThirdPartiesFromSidebar() {
        const alreadyOnPage = await this.isOnClientsThirdPartiesPage();

        if (!alreadyOnPage) {
            await this.waitForClientsSidebarButton();
            await this.scrollIntoView(this.clientsSidebarButton);
            await this.clickElement(this.clientsSidebarButton);

            const landedOnPage = await this.isOnClientsThirdPartiesPage();
            if (!landedOnPage) {
                await this.clickElement(this.clientsSidebarButton);
            }
        }

        await this.waitForClientsThirdPartiesPage();
    }

    async waitForClientsThirdPartiesPage() {
        await browser.waitUntil(async () => {
            const titleVisible = await this.pageTitle.isDisplayed().catch(() => false);
            const searchVisible = await this.searchInput.isDisplayed().catch(() => false);
            const createVisible = await this.createButton.isDisplayed().catch(() => false);
            return (titleVisible && searchVisible) || (searchVisible && createVisible);
        }, {
            timeout: 10000,
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
        const input = await this.searchInput;
        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();
        await input.clearValue();
        await input.setValue(searchText);
        await browser.pause(400);
    }

    async clearSearch() {
        await this.searchForClient("");
    }

    async getDataRowCount() {
        const rows = await this.dataRows;
        return rows.length;
    }

    async selectClientByName(clientName) {
        const row = await this.rowByClientName(clientName);
        await row.waitForDisplayed({ timeout: 10000 });

        const checkbox = await row.$('.//input[@type="checkbox"]');
        await checkbox.waitForDisplayed({ timeout: 10000 });
        await checkbox.click();
    }

    async hoverOverClientRow(clientName) {
        const rowElement = await this.rowByClientName(clientName);
        await rowElement.waitForDisplayed({ timeout: 10000 });
        await rowElement.moveTo();
    }

    async openClientsThreeDotMenuByName(clientName) {
        const row = await this.rowByClientName(clientName);
        await row.waitForDisplayed({ timeout: 10000 });

        const menuButton = await row.$('.//button[@aria-label="More items" or contains(@aria-label, "More") or contains(@aria-label, "Options")]');
        const menuVisible = await menuButton.isDisplayed().catch(() => false);

        if (menuVisible) {
            await menuButton.click();
        }
    }

    async clickEditOnClient(clientName) {
        const row = await this.rowByClientName(clientName);
        await row.waitForDisplayed({ timeout: 10000 });
        await row.moveTo();

        const inlineEditBtn = await row.$('.//button[contains(@aria-label, "Edit") or @title="Edit"]');
        const inlineVisible = await inlineEditBtn.isDisplayed().catch(() => false);

        if (inlineVisible) {
            await inlineEditBtn.click();
            return;
        }

        await this.openClientsThreeDotMenuByName(clientName);
        await this.clientEditButton.waitForDisplayed({ timeout: 10000 });
        await this.clientEditButton.click();
    }

    async clickDeleteOnClient(clientName) {
        const row = await this.rowByClientName(clientName);
        await row.waitForDisplayed({ timeout: 10000 });
        await row.moveTo();

        const inlineDeleteBtn = await row.$('.//button[contains(@aria-label, "Delete") or @title="Delete"]');
        const inlineVisible = await inlineDeleteBtn.isDisplayed().catch(() => false);

        if (inlineVisible) {
            await inlineDeleteBtn.click();
            return;
        }

        await this.openClientsThreeDotMenuByName(clientName);
        await this.clientDeleteButton.waitForDisplayed({ timeout: 10000 });
        await this.clientDeleteButton.click();
    }

    async cancelDeleteClient() {
        await this.doNotDeleteButtonCard.waitForDisplayed({ timeout: 10000 });
        await this.doNotDeleteButtonCard.click();
    }

    async waitForEditPage() {
        await this.editPageHeading.waitForDisplayed({ timeout: 10000 });
    }

    async openAddPhoneNumberDialog() {
        await this.addPhoneButton.waitForDisplayed({ timeout: 10000 });
        await this.addPhoneButton.click();
        await this.addPhoneNumberDialogHeading.waitForDisplayed({ timeout: 10000 });
    }

    async closeAddPhoneNumberDialog() {
        const hasCloseOrCancel = await this.closeAddPhoneDialogButton.isDisplayed().catch(() => false);

        if (hasCloseOrCancel) {
            await this.closeAddPhoneDialogButton.click();
            return;
        }

        await browser.keys("Escape");
    }

    async goBackToClientsListPage() {
        const hasBreadcrumb = await this.breadcrumbClientsLink.isDisplayed().catch(() => false);

        if (hasBreadcrumb) {
            await this.scrollIntoView(this.breadcrumbClientsLink);
            await this.clickElement(this.breadcrumbClientsLink);
            await this.waitForClientsThirdPartiesPage();
            return;
        }

        const hasCancelButton = await this.cancelEditButton.isDisplayed().catch(() => false);

        if (hasCancelButton) {
            await this.cancelEditButton.click();
            await this.waitForClientsThirdPartiesPage();
            return;
        }

        await browser.keys("Escape");
        await this.waitForClientsThirdPartiesPage();
    }
}

export default new DashboardClientsThirdPartiesPage();