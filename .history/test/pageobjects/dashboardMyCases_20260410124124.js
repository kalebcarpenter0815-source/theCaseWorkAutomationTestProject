import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardMyCasesPage extends Page {
    // =============================
    // MY CASES CARD / SECTION
    // =============================

    // The My Cases card container
    get myCasesSection() {
        return $('//*[contains(normalize-space(.), "My Cases")]//ancestor::div[.//*[@role="grid"]][1]');
    }

    get myCasesHeading() {
        return $('//label//*[contains(normalize-space(.), "My Cases")]');
    }

    get searchInput() {
        return $('input[data-testid="search-input"]');
    }

    get createCaseButton() {
        return $('button[data-testid="my-cases-create-case-button"]');
    }

    // Table data grid and rows
    get caseTable() {
        return $('[role="grid"]');
    }

    get caseRows() {
        return $('[role="gridcell"]')
            .then((elem) => elem.parentElement)
            .then((parent) => parent.$$('[role="row"]'));
    }

    // Get all case name links from the table
    get caseNameLinks() {
        return $$('[role="grid"] button.fui-Link');
    }

    get emptyStateMessage() {
        return $('//*[contains(normalize-space(.), "no cases") or contains(normalize-space(.), "No Cases")]');
    }

    // =============================
    // CONTROLS
    // =============================

    get caseFilterDropdown() {
        return $('[data-testid*="case-filter"], button[aria-haspopup="listbox"]');
    }

    get sortDropdown() {
        return $('[data-testid*="sort"], button[aria-label*="Sort"]');
    }

    get dropdownOptions() {
        return $$('[role="option"]');
    }

    // =============================
    // TABLE ROW CELL HELPERS
    // =============================

    // Get cells from a table row (by role="gridcell")
    getRowCells(rowElement) {
        return rowElement.$$('[role="gridcell"]');
    }

    // Get case name (first cell in row, contains link)
    getCaseName(rowElement) {
        return rowElement.$('[role="gridcell"]:first-child button.fui-Link');
    }

    // Get case type (second cell)
    getCaseType(rowElement) {
        return rowElement.$$('[role="gridcell"]')[1].$('span');
    }

    // Get retained by (third cell, has Persona component)
    getRetainedBy(rowElement) {
        return rowElement.$$('[role="gridcell"]')[2].$('.fui-Persona__primaryText');
    }

    // Get status (fourth cell)
    getStatus(rowElement) {
        return rowElement.$$('[role="gridcell"]')[3].$('span');
    }

    // =============================
    // HELPER METHODS
    // =============================

    async clickElement(element) {
        try {
            await element.click();
        } catch (error) {
            // Fallback to JS click if WDIO click fails
            await browser.execute((el) => el.click(), element);
        }
    }

    async scrollIntoView(element) {
        const resolvedElement = await element;
        await browser.execute((el) => {
            el.scrollIntoView({ block: "center", inline: "center" });
        }, resolvedElement);
    }

    async waitForMyCasesSection() {
        await this.myCasesSection.waitForDisplayed({ timeout: 10000 });
    }

    async waitForCaseTable() {
        await this.caseTable.waitForDisplayed({ timeout: 10000 });
    }

    async searchCases(searchText) {
        const input = await this.searchInput;
        await input.waitForDisplayed({ timeout: 10000 });
        await input.clearValue();
        await input.setValue(searchText);
        await browser.pause(500); // Wait for search results
    }

    async clickCreateCaseButton() {
        const button = await this.createCaseButton;
        await button.waitForDisplayed({ timeout: 10000 });
        await this.scrollIntoView(button);
        await this.clickElement(button);
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
        const rows = await this.caseRows;
        return rows.length;
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