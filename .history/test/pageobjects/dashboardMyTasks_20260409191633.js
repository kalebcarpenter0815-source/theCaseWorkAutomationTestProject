import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardMyTasksPage extends Page {

    // =============================
    // MY TASKS CARD / SECTION
    // =============================

    /**
     * The My Tasks card container on Dashboard.
     * There is no stable card testid in prod, so this anchors on the known controls.
     */
    get myTasksSection() {
        return $('//div[.//button[@data-testid="tasks-card-case-filter-dropdown"] and .//button[@data-testid="tasks-card-sort-dropdown"] and .//button[@data-testid="tasks-card-add-task-button"]][1]');
    }

    /**
     * Task cards in the My Tasks section.
     * Uses a few common fallbacks because markup can vary with empty/populated states.
     */
    get taskCards() {
        return $$('[data-testid^="tasks-card-task-"] , [data-testid^="my-task-item-"] , [data-testid*="task-item"]');
    }

    get emptyStateMessage() {
        return $('//span[contains(normalize-space(), "There are no Tasks remaining") or contains(normalize-space(), "up to date")]');
    }

    // =============================
    // ADD TASK BUTTON
    // =============================

    get addTaskButton() {
        return $('button[data-testid="tasks-card-add-task-button"]');
    }

    // =============================
    // CASE DROPDOWN
    // =============================

    /** The Case filter dropdown trigger button */
    get caseDropdown() {
        return $('[data-testid="tasks-card-case-filter-dropdown"]');
    }

    /** All option items rendered inside the open Case dropdown */
    get caseDropdownOptions() {
        return $$('[data-testid^="tasks-card-case-filter-"][data-testid$="-option"]');
    }

    /**
     * Returns a single option inside the Case dropdown by its visible label text.
     * @param {string} optionText
     */
    getCaseOption(optionText) {
        return $(`//div[@role="option" and normalize-space()="${optionText}"] | //div[starts-with(@data-testid,"tasks-card-case-filter-") and contains(@data-testid,"-option") and normalize-space()="${optionText}"]`);
    }

    // =============================
    // SORT DROPDOWN
    // =============================

    /** The Sort dropdown trigger button */
    get sortDropdown() {
        return $('[data-testid="tasks-card-sort-dropdown"]');
    }

    /** All option items rendered inside the open Sort dropdown */
    get sortDropdownOptions() {
        return $$('[data-testid^="tasks-card-sort-"][data-testid$="-option"]');
    }

    /**
     * Returns a single option inside the Sort dropdown by its visible label text.
     * @param {string} optionText
     */
    getSortOption(optionText) {
        return $(`//div[@role="option" and normalize-space()="${optionText}"] | //div[starts-with(@data-testid,"tasks-card-sort-") and contains(@data-testid,"-option") and normalize-space()="${optionText}"]`);
    }

    // =============================
    // HELPER METHODS
    // =============================

    async jsScrollIntoView(element) {
        const resolvedElement = await element;
        await browser.execute((el) => {
            el.scrollIntoView({ block: "center", inline: "center" });
        }, resolvedElement);
    }

    async waitForMyTasksSection() {
        await this.myTasksSection.waitForDisplayed({ timeout: 10000 });
        await this.caseDropdown.waitForDisplayed({ timeout: 10000 });
        await this.sortDropdown.waitForDisplayed({ timeout: 10000 });
        await this.addTaskButton.waitForDisplayed({ timeout: 10000 });
    }

    async openCaseDropdown() {
        await this.caseDropdown.waitForClickable({ timeout: 10000 });
        await this.jsScrollIntoView(this.caseDropdown);
        await this.caseDropdown.click();
        await browser.waitUntil(async () => (await this.caseDropdownOptions.length) > 0, {
            timeout: 10000,
            timeoutMsg: "Case dropdown options did not appear",
        });
    }

    async openSortDropdown() {
        await this.sortDropdown.waitForClickable({ timeout: 10000 });
        await this.jsScrollIntoView(this.sortDropdown);
        await this.sortDropdown.click();
        await browser.waitUntil(async () => (await this.sortDropdownOptions.length) > 0, {
            timeout: 10000,
            timeoutMsg: "Sort dropdown options did not appear",
        });
    }

    async selectSortOption(optionText) {
        await this.openSortDropdown();
        const option = this.getSortOption(optionText);
        await option.waitForClickable({ timeout: 10000 });
        await option.click();

        await browser.waitUntil(async () => {
            return (await this.sortDropdown.getAttribute("value")) === optionText;
        }, {
            timeout: 10000,
            timeoutMsg: `Sort did not update to ${optionText}`,
        });
    }
}

export default new DashboardMyTasksPage();
