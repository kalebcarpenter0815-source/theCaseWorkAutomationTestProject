import { $ } from '@wdio/globals';
import Page from './page.js';

class DashboardPage extends Page {

    // ===== SELECTORS =====
    get filterDropdown () {
        return $('[data-testid="upcoming-events-filter-dropdown"]');
    }

    get logoutButton () {
        return $('[data-testid="menu-logout-button"]');
    }

    get taskItems () {
        return $$('[data-testid^="event-case-persona"]');
    }

    get loginUsernameField () {
        return $('[data-testid="login-username"]');
    }

    // ===== ACTIONS =====

    async waitForDashboard() {
        await this.logoutButton.waitForDisplayed();
    }

    async logout() {
    const logoutBtn = $('[data-testid="menu-logout-button"]');

    await logoutBtn.waitForClickable();
    await logoutBtn.click();

    // wait until back on login page
    await $('[data-testid="login-username"]').waitForDisplayed();
    }

    async openFilter() {
        await this.filterDropdown.waitForClickable();
        await this.filterDropdown.click();
    }

    async selectLastMonthFilter() {
        const option = $('button[value="Within last month"]');
        await option.waitForClickable();
        await option.click();

        // wait until filter updates
        await browser.waitUntil(
            async () => (await this.filterDropdown.getText()) === 'Within last month',
            {
                timeout: 5000,
                timeoutMsg: 'Filter did not update'
            }
        );
    }

    async getFilterText() {
        return await this.filterDropdown.getText();
    }

    async getTaskCount() {
        const tasks = await this.taskItems;
        return tasks.length;
    }

    async waitForTaskUpdate(previousCount) {
        await browser.waitUntil(
            async () => (await this.getTaskCount()) !== previousCount,
            {
                timeout: 8000,
                timeoutMsg: 'Task list did not update'
            }
        );
    }

    async getPageText() {
        return await $('body').getText();
    }

    async waitForMetricsUpdate(previousText) {
        await browser.waitUntil(
            async () => (await this.getPageText()) !== previousText,
            {
                timeout: 8000,
                timeoutMsg: 'Metrics did not update'
            }
        );
    }
}

export default new DashboardPage();