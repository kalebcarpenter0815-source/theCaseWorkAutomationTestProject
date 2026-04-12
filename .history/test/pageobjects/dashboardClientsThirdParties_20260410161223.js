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

    get 

    get clientEditButton() {
        return $('//button[normalize-space(.)="Edit" or .//*[contains(normalize-space(.), "Edit")]]');
    }
}

export default new DashboardClientsThirdPartiesPage();
