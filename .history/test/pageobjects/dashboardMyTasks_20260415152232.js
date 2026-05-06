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
        return $('//div[.//button[@data-testid="tasks-card-case-filter-dropdown"] and .//button[@data-testid="tasks-card-sort-dropdown"] and .//*[@data-testid="link-button-Add Task"]][1]');
    }

    /**
     * Task cards in the My Tasks section.
     * Uses a few common fallbacks because markup can vary with empty/populated states.
     */
    get taskCards() {
        return $$('[data-testid^="tasks-card-task-"] , [data-testid^="my-task-item-"] , [data-testid*="task-item"]');
    }

    // Same idea as taskCards, just named taskRows for easier test readability.
    get taskRows() {
        return this.taskCards;
    }

    get emptyStateMessage() {
        return $('//span[contains(normalize-space(), "There are no Tasks remaining") or contains(normalize-space(), "up to date")]');
    }

    // =============================
    // TASK ROW CONTENT GETTERS
    // =============================

    getTaskTitle(taskRow) {
        return taskRow.$('[data-testid*="title"], .my-task-item-title, [class*="title"]');
    }

    getTaskCaseName(taskRow) {
        return taskRow.$('[data-testid*="case"], .my-task-item-case-name, [class*="case"]');
    }

    getTaskAssignee(taskRow) {
        return taskRow.$('[data-testid*="assignee"], .my-task-item-assignee, [class*="assignee"]');
    }

    getTaskDueDate(taskRow) {
        return taskRow.$('[data-testid*="due"], .my-task-item-due-date, [class*="due"]');
    }

    // =============================
    // ADD TASK BUTTON
    // =============================

    get addTaskButton() {
        return $('[data-testid="link-button-Add Task"]');
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

    // Beginner-friendly explicit sort option getters.
    get sortCreatedAscendingOption() {
        return this.getSortOption("Created - Ascending");
    }

    get sortCreatedDescendingOption() {
        return this.getSortOption("Created - Descending");
    }

    get sortDueByAscendingOption() {
        return this.getSortOption("Due By - Ascending");
    }

    get sortDueByDescendingOption() {
        return this.getSortOption("Due By - Descending");
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

        const isExpanded = (await this.caseDropdown.getAttribute("aria-expanded")) === "true";
        if (!isExpanded) {
            await this.caseDropdown.click();
        }

        await browser.waitUntil(async () => (await this.caseDropdownOptions.length) > 0, {
            timeout: 10000,
            timeoutMsg: "Case dropdown options did not appear",
        });
    }

    async openSortDropdown() {
        await this.sortDropdown.waitForClickable({ timeout: 10000 });
        await this.jsScrollIntoView(this.sortDropdown);

        const isExpanded = (await this.sortDropdown.getAttribute("aria-expanded")) === "true";
        if (!isExpanded) {
            await this.sortDropdown.click();
        }

        await browser.waitUntil(async () => (await this.sortDropdownOptions.length) > 0, {
            timeout: 10000,
            timeoutMsg: "Sort dropdown options did not appear",
        });
    }

    async selectSortOption(optionText) {
        await this.openSortDropdown();
        const option = this.getSortOption(optionText);
        await option.waitForDisplayed({ timeout: 10000 });

        try {
            await option.waitForClickable({ timeout: 3000 });
            await option.click();
        } catch (error) {
            await browser.execute((el) => {
                const menu = el.closest('[role="menu"]');
                if (menu) {
                    menu.scrollTop = Math.max(0, el.offsetTop - (menu.clientHeight / 2));
                }

                el.scrollIntoView({ block: "nearest", inline: "nearest" });
                el.click();
            }, await option);
        }

        await browser.waitUntil(async () => {
            return (await this.sortDropdown.getText()).includes(optionText);
        }, {
            timeout: 10000,
            timeoutMsg: `Sort did not update to ${optionText}`,
        });
    }

    async selectCaseOption(optionText) {
        await this.openCaseDropdown();
        const option = this.getCaseOption(optionText);
        await option.waitForDisplayed({ timeout: 10000 });

        try {
            await option.waitForClickable({ timeout: 3000 });
            await option.click();
        } catch (error) {
            await browser.execute((el) => {
                const menu = el.closest('[role="menu"]');
                if (menu) {
                    menu.scrollTop = Math.max(0, el.offsetTop - (menu.clientHeight / 2));
                }

                el.scrollIntoView({ block: "nearest", inline: "nearest" });
                el.click();
            }, await option);
        }

        await browser.waitUntil(async () => {
            return (await this.caseDropdown.getText()).includes(optionText);
        }, {
            timeout: 10000,
            timeoutMsg: `Case filter did not update to ${optionText}`,
        });
    }

    async getCaseOptionTexts() {
        await this.openCaseDropdown();
        const options = await this.caseDropdownOptions;
        const optionTexts = [];

        for (const option of options) {
            const text = (await option.getText()).trim();
            if (text) {
                optionTexts.push(text);
            }
        }

        await this.caseDropdown.click();
        return [...new Set(optionTexts)];
    }
}

export default new DashboardMyTasksPage();
