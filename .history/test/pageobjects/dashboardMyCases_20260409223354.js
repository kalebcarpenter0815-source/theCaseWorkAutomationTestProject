import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardMyCasesPage extends Page {
    // =============================
    // MY CASES CARD / SECTION
    // =============================

    // This tries a few common ways the My Cases card might appear on the dashboard.
    get myCasesSection() {
        return $('//*[self::section or self::div][.//*[contains(normalize-space(.), "My Cases")]][1]');
    }

    get myCasesHeading() {
        return this.myCasesSection.$('.//*[self::h1 or self::h2 or self::h3 or self::span][contains(normalize-space(.), "My Cases")]');
    }

    get caseCards() {
        return this.myCasesSection.$$('[data-testid*="case-card"], [data-testid*="my-case"], article, [role="listitem"]');
    }

    get caseRows() {
        return this.caseCards;
    }

    get emptyStateMessage() {
        return this.myCasesSection.$('//*[contains(normalize-space(.), "no cases") or contains(normalize-space(.), "No Cases")]');
    }

    // =============================
    // CONTROLS
    // =============================

    get caseDropdown() {
        return this.myCasesSection.$('[data-testid*="case-filter"], button[aria-haspopup="listbox"]');
    }

    get sortDropdown() {
        return this.myCasesSection.$('[data-testid*="sort-dropdown"], [data-testid*="sort"], button[aria-label*="Sort"]');
    }

    get caseDropdownOptions() {
        return $$('[role="option"]');
    }

    get sortDropdownOptions() {
        return $$('[role="option"]');
    }

    // =============================
    // CARD CONTENT HELPERS
    // =============================

    getCaseTitle(caseRow) {
        return caseRow.$('[data-testid*="title"], [class*="title"], h3, h4');
    }

    getCaseNumber(caseRow) {
        return caseRow.$('[data-testid*="number"], [class*="number"], [class*="case-number"]');
    }

    getCaseStatus(caseRow) {
        return caseRow.$('[data-testid*="status"], [class*="status"]');
    }

    getCaseOwner(caseRow) {
        return caseRow.$('[data-testid*="owner"], [data-testid*="assignee"], [class*="owner"]');
    }

    getCaseUpdatedDate(caseRow) {
        return caseRow.$('[data-testid*="updated"], [data-testid*="date"], [class*="date"]');
    }

    // =============================
    // HELPER METHODS
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

    async waitForMyCasesSection() {
        await this.myCasesSection.waitForDisplayed({ timeout: 10000 });
    }

    async openCaseDropdown() {
        const dropdown = await this.caseDropdown;
        await dropdown.waitForDisplayed({ timeout: 10000 });
        await this.scrollIntoView(dropdown);
        await this.clickElement(dropdown);
    }

    async openSortDropdown() {
        const dropdown = await this.sortDropdown;
        await dropdown.waitForDisplayed({ timeout: 10000 });
        await this.scrollIntoView(dropdown);
        await this.clickElement(dropdown);
    }

    getOptionByText(optionText) {
        return $(`//*[@role="option" and contains(normalize-space(.), "${optionText}")]`);
    }

    async selectCaseDropdownOption(optionText) {
        await this.openCaseDropdown();
        const option = await this.getOptionByText(optionText);
        await option.waitForDisplayed({ timeout: 10000 });
        await this.clickElement(option);
    }

    async selectSortOption(optionText) {
        await this.openSortDropdown();
        const option = await this.getOptionByText(optionText);
        await option.waitForDisplayed({ timeout: 10000 });
        await this.clickElement(option);
    }
}

export default new DashboardMyCasesPage();