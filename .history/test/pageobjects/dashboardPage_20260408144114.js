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

    get loginUsernameField() {
        return $('[data-testid="login-username"]');
    }

    get taskItems() {
        return $$('[data-testid^="event-case-persona"]');
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

    get eventNames() {
        return $$('[data-testid^="event-case-persona-"] .fui-Persona__primaryText');
    }

    async getAllEventNames() {
        const elements = await this.eventNames;

        let names = [];

        for (let i = 0; i < elements.length; i++) {
            let text = await elements[i].getText();
            names.push(text);
        }

        return names;
    }

    get eventDates() {
    return $$('[data-testid^="event-case-persona-"] span');
}

async getAllEventDates() {
    const elements = await this.eventDates;

    let dates = [];

    for (let i = 0; i < elements.length; i++) {
        let text = await elements[i].getText();

        // very simple checks
        if (
            text == 'Jan' || text == 'Feb' || text == 'Mar' ||
            text == 'Apr' || text == 'May' || text == 'Jun' ||
            text == 'Jul' || text == 'Aug' || text == 'Sep' ||
            text == 'Oct' || text == 'Nov' || text == 'Dec' ||
            text == '1' || text == '2' || text == '3' || text == '4' ||
            text == '5' || text == '6' || text == '7' || text == '8' ||
            text == '9' || text == '10' || text == '11' || text == '12' ||
            text == '13' || text == '14' || text == '15' || text == '16' ||
            text == '17' || text == '18' || text == '19' || text == '20' ||
            text == '21' || text == '22' || text == '23' || text == '24' ||
            text == '25' || text == '26' || text == '27' || text == '28' ||
            text == '29' || text == '30' || text == '31'
        ) {
            dates.push(text);
        }
    }

    return dates;
}


}

export default new DashboardPage();
