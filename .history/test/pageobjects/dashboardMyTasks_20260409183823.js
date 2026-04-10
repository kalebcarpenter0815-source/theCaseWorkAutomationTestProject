import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardMyTasksPage extends Page {

    // =============================
    // MY TASKS CARD / SECTION
    // =============================

    /** The entire My Tasks card/panel container */
    get myTasksSection() {
        return $('[data-testid="my-tasks-section"]');
    }

    /** All individual task item cards within the My Tasks section */
    get taskCards() {
        return $$('[data-testid^="my-task-item-"]');
    }

    // =============================
    // TASK CARDS                       
    // =============================    

    // =============================
    // ADD TASK BUTTON
    // =============================

    get addTaskButton() {
        return $('[data-testid="my-tasks-add-task-button"]');
    }

    // =============================
    // CASE DROPDOWN
    // =============================

    /** The Case filter/sort dropdown trigger button */
    get caseDropdown() {
        return $('[data-testid="my-tasks-case-dropdown"]');
    }

    /** All option items rendered inside the open Case dropdown */
    get caseDropdownOptions() {
        return $$('[data-testid^="my-tasks-case-option-"]');
    }

    /**
     * Returns a single option inside the Case dropdown by its visible label text.
     * @param {string} optionText
     */
    getCaseOption(optionText) {
        return $(`//div[@role="option" and normalize-space()="${optionText}"]`);
    }

    // =============================
    // SORT DROPDOWN
    // =============================

    /** The Sort dropdown trigger button */
    get sortDropdown() {
        return $('[data-testid="my-tasks-sort-dropdown"]');
    }

    /** All option items rendered inside the open Sort dropdown */
    get sortDropdownOptions() {
        return $$('[data-testid^="my-tasks-sort-option-"]');
    }

    /**
     * Returns a single option inside the Sort dropdown by its visible label text.
     * @param {string} optionText
     */
    getSortOption(optionText) {
        return $(`//div[@role="option" and normalize-space()="${optionText}"]`);
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
    }

    async openCaseDropdown() {
        await this.caseDropdown.waitForClickable({ timeout: 10000 });
        await this.jsScrollIntoView(this.caseDropdown);
        await this.caseDropdown.click();
    }

    async openSortDropdown() {
        await this.sortDropdown.waitForClickable({ timeout: 10000 });
        await this.jsScrollIntoView(this.sortDropdown);
        await this.sortDropdown.click();
    }
}

export default new DashboardMyTasksPage();
