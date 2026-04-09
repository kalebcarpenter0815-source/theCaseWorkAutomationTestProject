import { $, $$ } from '@wdio/globals';
import Page from './page.js';
import Helper from '../utils/helpers.js';

class DashboardPage extends Page {
    get filterDropdown() {
        return $('[data-testid="upcoming-events-filter-dropdown"]');
    }

    get logoutButton() {
        return $('[data-testid="menu-logout-button"]');
    }

    get taskItems() {
        return $$('[data-testid^="event-case-persona"]');
    }

    get loginUsernameField() {
        return $('[data-testid="login-username"]');
    }

    get upcomingEventFilters() {
        return $$('your-selector-here');
    }

    async holdAllUpcomingEventFilters(duration = 2000) {
    const filters = await this.upcomingEventFilters;

    if (filters.length === 0) {
        console.warn('⚠️ No upcoming event filters found — skipping step.');
        return;
    }

    for (const filter of filters) {
        try {
            if (await filter.isDisplayed()) {
                await filter.click({ duration });
            }
        } catch (err) {
            console.log('Element disappeared, continuing...');
        }
    }
  }

    async waitForDashboard() {
        await this.logoutButton.waitForDisplayed({ timeout: 10000 });
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
    }

    async getFilterText() {
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
        return this.filterDropdown.getAttribute('value');
    }

    async openFilter() {
        await this.filterDropdown.waitForClickable({ timeout: 10000 });
        await this.filterDropdown.click();

        await browser.waitUntil(async () => {
            const expanded = await this.filterDropdown.getAttribute('aria-expanded');
            return expanded === 'true';
        }, {
            timeout: 5000,
            timeoutMsg: 'Upcoming events filter dropdown did not open'
        });
    }

    async waitForFilterValue(value) {
        await browser.waitUntil(async () => {
            const current = await this.getFilterText();
            return Boolean(current) && current.includes(value);
        }, {
            timeout: 7000,
            timeoutMsg: `Filter value did not update to "${value}"`
        });
    }

    async selectOptionByText(text) {
        await this.openFilter();

        const option = await $(`//div[@role="option" and contains(normalize-space(.), "${text}")]`);
        await option.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: `Filter option "${text}" was not visible`
        });

        await option.click();
        await this.waitForFilterValue(text);
    }

    async cycleThroughFilters() {
        await this.selectOptionByText('Within 7 days');
        await this.selectOptionByText('Within 14 days');
        await this.selectOptionByText('Within 30 days');
        await this.selectOptionByText('Within 3 months');
    }

    async getTaskCount() {
        const tasks = await this.taskItems;
        return tasks.length;
    }

    async waitForTaskUpdate(previousCount) {
        await browser.waitUntil(async () => {
            const currentCount = await this.getTaskCount();
            return currentCount !== previousCount;
        }, {
            timeout: 8000,
            timeoutMsg: 'Task list did not update after changing the filter'
        });
    }

    async holdUpcomingEventsFilter(duration = 2000) {
        await Helper.clickAndHold(this.filterDropdown, duration);
    }

    async logout() {
        await this.logoutButton.waitForClickable({ timeout: 10000 });
        await this.logoutButton.click();
        await this.loginUsernameField.waitForDisplayed({ timeout: 10000 });
    }
}

export default new DashboardPage();
