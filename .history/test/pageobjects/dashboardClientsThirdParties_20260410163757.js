import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardClientsThirdPartiesPage extends Page {
    get clientsSidebarButton() {
        return $('//a[contains(normalize-space(.), "Clients / 3rd Parties")] | //button[contains(normalize-space(.), "Clients / 3rd Parties")]');
    }

    get pageTitle() {
        return $('//h1[contains(normalize-space(.), "Clients / 3rd Parties")] | //h2[contains(normalize-space(.), "Clients / 3rd Parties")]');
    }

    get searchLabel() {
        return $('//label[contains(normalize-space(.), "Search")]');
    }

    get searchInput() {
        return $('input[placeholder*="Search Clients"], input[placeholder*="Clients/3rd Parties"], input[aria-label*="Search Clients"]');
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
        return $$('//div[@role="row"][.//*[@role="gridcell"]]//button | //tr[td]//button');
    }

    get emptyStateMessage() {
        return $('//*[contains(normalize-space(.), "No clients") or contains(normalize-space(.), "No results") or contains(normalize-space(.), "no clients")]');
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

    async waitForClientsSidebarButton() {
        await this.clientsSidebarButton.waitForDisplayed({ timeout: 10000 });
    }

    async isOnClientsThirdPartiesPage() {
        return await this.pageTitle.isDisplayed().catch(() => false);
    }

    async openClientsThirdPartiesFromSidebar() {
        const alreadyOnPage = await this.isOnClientsThirdPartiesPage();

        if (!alreadyOnPage) {
            await this.waitForClientsSidebarButton();
            await this.scrollIntoView(this.clientsSidebarButton);
            await this.clickElement(this.clientsSidebarButton);
        }

        await this.waitForClientsThirdPartiesPage();
    }

    async waitForClientsThirdPartiesPage() {
        await this.pageTitle.waitForDisplayed({ timeout: 10000 });
        await this.searchInput.waitForDisplayed({ timeout: 10000 });
        await this.createButton.waitForDisplayed({ timeout: 10000 });
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

    // ========================================================================
    // Additional Getters or Methods for this test can be added right here
    // ========================================================================

    get clientCheckboxBtns() {
        return $$('//div[@role="row"][.//*[@role="gridcell"]]//input[@type="checkbox"] | //tr[td]//input[@type="checkbox"]');
    }

    async selectClientByName(clientName) {
        const checkboxSelector = `//div[@role="row"][.//*[@role="gridcell"] and .//*[contains(normalize-space(.), "${clientName}")]]//input[@type="checkbox"] | //tr[td][.//*[contains(normalize-space(.), "${clientName}")]]//input[@type="checkbox"]`;
        const checkbox = await $(checkboxSelector);
        await checkbox.waitForDisplayed({ timeout: 10000 });
        await checkbox.click();
    }

    // get deleteSelectedButton() {
    //     return $('//button[normalize-space(.)="Delete Selected" or .//*[contains(normalize-space(.), "Delete Selected")]]');
    // }
    
    // async deleteSelectedClients() {
    //     const deleteBtn = await this.deleteSelectedButton;
    //     await deleteBtn.waitForDisplayed({ timeout: 10000 });
    //     await deleteBtn.click();
    // }

    get uncheckAllCheckboxButton() {
        return $('//input[@aria-label="Select case"]');
    }

    async uncheckAllClientCheckboxes() {
        const uncheckBtn = await this.uncheckAllCheckboxButton;
        await uncheckBtn.waitForDisplayed({ timeout: 10000 });
        const isChecked = await uncheckBtn.isSelected();
        if (isChecked) {
            await uncheckBtn.click();
        }   
    }

    get clientsThreeDotMenuButtons() {
        return $$('//button[@aria-label="More items"]');
    }

    async openClientsThreeDotMenuByName(clientName) {
        const menuButtonSelector = `//div[@role="row"][.//*[@role="gridcell"] and .//*[contains(normalize-space(.), "${clientName}")]]//button[@aria-label="More items"] | //tr[td][.//*[contains(normalize-space(.), "${clientName}")]]//button[@aria-label="More items"]`;
        const menuButton = await $(menuButtonSelector);
        await menuButton.waitForDisplayed({ timeout: 10000 });
        await menuButton.click();
    }

    get hoverOverClientRowName() {
        return $('//div[@role="row"][.//*[@role="gridcell"] and .//*[contains(normalize-space(.), "Client Name")]] | //tr[td][.//*[contains(normalize-space(.), "Client Name")]]');
    }

    async hoverOverClientRow(clientName) {
        const rowSelector = `//div[@role="row"][.//*[@role="gridcell"] and .//*[contains(normalize-space(.), "${clientName}")]] | //tr[td][.//*[contains(normalize-space(.), "${clientName}")]]`;
        const rowElement = await $(rowSelector);
        await rowElement.waitForDisplayed({ timeout: 10000 });
        await rowElement.moveTo();
    }

    get clientEditButton() {
        return $('//button[normalize-space(.)="Edit" or .//*[contains(normalize-space(.), "Edit")]]');
    }

    async clickEditOnClient(clientName) {
        await this.openClientsThreeDotMenuByName(clientName);
        const editBtn = await this.clientEditButton;
        await editBtn.waitForDisplayed({ timeout: 10000 });
        await editBtn.click();
    }

    get clientDeleteButton() {
        return $('//button[normalize-space(.)="Delete" or .//*[contains(normalize-space(.), "Delete")]]');
    }

    async clickDeleteOnClient(clientName) {
        await this.openClientsThreeDotMenuByName(clientName);
        const deleteBtn = await this.clientDeleteButton;
        await deleteBtn.waitForDisplayed({ timeout: 10000 });
        await deleteBtn.click();
    }

    get confirmDeleteButtonCard() {
        return $('//div[@class="fui-DialogBody r1h3qql9"]');
    }
    
    async confirmDeleteClient() {
        const confirmBtn = await this.confirmDeleteButtonCard.$('//button[normalize-space(.)="Delete" or .//*[contains(normalize-space(.), "Delete")]]');
        await confirmBtn.waitForDisplayed({ timeout: 10000 });
        await confirmBtn.click();
    }

    get doNotDeleteButtonCard() {
        return $('//button[contains(text(), "No")]');
    }

    async cancelDeleteClient() {
        const cancelBtn = await this.doNotDeleteButtonCard;
        await cancelBtn.waitForDisplayed({ timeout: 10000 });
        await cancelBtn.click();
    }

    get clientsAndThirdPartiesCard() {
        return $('//div[contains(@style,"colorNeutralCardBackground")][.//span[text()="Somebody Else"]]');
    }

    async openClientCard(clientName) {
        const cardSelector = `//div[contains(@style,"colorNeutralCardBackground")][.//span[contains(normalize-space(.), "${clientName}")]]`;
        const clientCard = await $(cardSelector);
        await clientCard.waitForDisplayed({ timeout: 10000 });
        await clientCard.click();
    }

    get clientsPreviewSizes() {
        return $$('//div[contains(@style,"colorNeutralCardBackground")][.//span[contains(normalize-space(.), "Client Name")]]//span[contains(@class, "fui-Avatar")]');
    }

    // =============================
    // EDIT PAGE - GETTERS
    // =============================

    get editPageHeading() {
        return $('//h1[contains(normalize-space(.), "Edit -")] | //h2[contains(normalize-space(.), "Edit -")]');
    }

    get breadcrumbClientsLink() {
        return $('//a[contains(normalize-space(.), "Clients/Parties")] | //nav//*[contains(normalize-space(.), "Clients/Parties")]');
    }

    get editPartyNameInput() {
        return $('input[data-testid="party-dialog-name-input"]');
    }

    get editUrlInput() {
        return $('input[data-testid="party-dialog-url-input"], input[placeholder="Enter Url"]');
    }

    get editAddressInput() {
        return $('input[data-testid="party-dialog-address1-input"]');
    }

    get editAddress2Input() {
        return $('input[data-testid="party-dialog-address2-input"], input[placeholder="Enter Address 2"]');
    }

    get editCityInput() {
        return $('input[data-testid="party-dialog-city-input"]');
    }

    get editStateInput() {
        return $('input[data-testid="party-dialog-state-input"]');
    }

    get editZipInput() {
        return $('input[data-testid="party-dialog-zip-input"]');
    }

    get previewSizesDropdown() {
        return $('//button[@aria-haspopup and (contains(normalize-space(.), "large") or contains(normalize-space(.), "small") or contains(normalize-space(.), "medium")) or contains(normalize-space(.), )]');
    }

    get contactsSection() {
        return $('//*[contains(normalize-space(.), "Contacts") and not(self::input) and not(self::button) and not(self::span)]');
    }

    get addContactButton() {
        return $('//button[contains(normalize-space(.), "Add Contact")]');
    }

    get contactCards() {
        return $$('.fui-Card');
    }

    get contactRemoveButtons() {
        return $$('//button[@aria-label="close" or @aria-label="Close" or @aria-label="Remove"]');
    }

    get phoneNumbersSection() {
        return $('//*[contains(normalize-space(.), "Phone Numbers") and not(self::input) and not(self::button)]');
    }

    get addPhoneButton() {
        return $('//button[.//*[name()="path" and contains(@d,"M4 3.5C4 2.67")]] | //button[contains(normalize-space(.), "Add Phone Number")]');
    }

    // =============================
    // EDIT PAGE - METHODS
    // =============================

    async waitForEditPage() {
        await this.editPageHeading.waitForDisplayed({ timeout: 10000 });
    }

    async goBackToClientsListPage() {
        await this.breadcrumbClientsLink.waitForDisplayed({ timeout: 10000 });
        await this.scrollIntoView(this.breadcrumbClientsLink);
        await this.clickElement(this.breadcrumbClientsLink);
        await this.waitForClientsThirdPartiesPage();
    }
}

export default new DashboardClientsThirdPartiesPage();
