// import { $ } from '@wdio/globals';
// import Page from './page.js';

// class DashboardPage extends Page {

//     get filterDropdown () {
//         return $('[data-testid="upcoming-events-filter-dropdown"]');
//     }

//     get logoutButton () {
//         return $('[data-testid="menu-logout-button"]');
//     }

//     get taskItems () {
//         return $$('[data-testid^="event-case-persona"]');
//     }

//     get loginUsernameField () {
//         return $('[data-testid="login-username"]');
//     }

//     async waitForDashboard() {
//         await this.logoutButton.waitForDisplayed({ timeout: 10000 });
//         await this.filterDropdown.waitForDisplayed({ timeout: 10000 });

//         console.log('Dashboard loaded');
//     }

//     async getFilterText() {
//         const value = await this.filterDropdown.getAttribute('value');
//         console.log('Current filter:', value);
//         return value;
//     }

//     async openFilter() {
//         await this.filterDropdown.waitForClickable();
//         await this.filterDropdown.click();

//         await browser.waitUntil(async () => {
//             return (await this.filterDropdown.getAttribute('aria-expanded')) === 'true';
//         }, { timeout: 5000 });

//         console.log('Dropdown opened');
//     }

//     async waitForFilterValue(value) {
//         await browser.waitUntil(async () => {
//             const current = await this.getFilterText();
//             return current && current.includes(value);
//         }, {
//             timeout: 7000,
//             timeoutMsg: `Filter did not become ${value}`
//         });

//         console.log('Filter set to:', value);
//     }

//     // 🔥 FIXED METHOD
//     async selectOptionByText(text) {

//         console.log('\nSelecting:', text);

//         await this.openFilter();

//         const option = await $(`//div[@role="option" and contains(normalize-space(.), "${text}")]`);

//         await option.waitForDisplayed({
//             timeout: 5000,
//             timeoutMsg: `Option ${text} not visible`
//         });

//         await option.click();

//         console.log('Clicked:', text);

//         await browser.pause(500);

//         await this.waitForFilterValue(text);
//     }

//     async cycleThroughFilters() {
//         await this.selectOptionByText('Within 7 days');
//         await this.selectOptionByText('Within 14 days');
//         await this.selectOptionByText('Within 30 days');
//         await this.selectOptionByText('Within 3 months');
//     }

//     async getTaskCount() {
//         return (await this.taskItems).length;
//     }

//     async waitForTaskUpdate(previousCount) {
//         await browser.waitUntil(async () => {
//             return (await this.getTaskCount()) !== previousCount;
//         }, { timeout: 8000 });
//     }

//     async getPageText() {
//         return await $('body').getText();
//     }

//     async waitForMetricsUpdate(previousText) {
//         await browser.waitUntil(async () => {
//             return (await this.getPageText()) !== previousText;
//         }, { timeout: 8000 });
//     }

//     async logout() {
//         await this.logoutButton.click();
//         await this.loginUsernameField.waitForDisplayed({ timeout: 10000 });
//     }
// }

// export default new DashboardPage();
import { $ } from '@wdio/globals';
import Page from './page.js';

class DashboardPage extends Page {

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

    async waitForDashboard() {

        const logoutBtn = await this.logoutButton;
        await logoutBtn.waitForDisplayed({ timeout: 10000 });

        const dropdown = await this.filterDropdown;
        await dropdown.waitForDisplayed({ timeout: 10000 });

        console.log('Dashboard loaded');
    }

    async getFilterText() {

        const dropdown = await this.filterDropdown;

        const value = await dropdown.getAttribute('value');

        console.log('Filter value is:', value);

        return value;
    }

    async openFilter() {

        const dropdown = await this.filterDropdown;

        await dropdown.waitForClickable();
        await dropdown.click();

        await browser.waitUntil(async () => {
            const expanded = await dropdown.getAttribute('aria-expanded');
            return expanded === 'true';
        }, { timeout: 5000 });

        console.log('Dropdown opened');
    }

    async waitForFilterValue(value) {

        await browser.waitUntil(async () => {

            const current = await this.getFilterText();

            return current && current.includes(value);

        }, {
            timeout: 7000,
            timeoutMsg: 'Filter did not change to ' + value
        });

        console.log('Filter changed to:', value);
    }

    async selectOptionByText(text) {

        console.log('Trying to select:', text);

        await this.openFilter();

        // find option using role + text
        const option = await $(`//div[@role="option" and contains(normalize-space(.), "${text}")]`);

        await option.waitForDisplayed({ timeout: 5000 });

        await option.click();

        console.log('Clicked option:', text);

        await browser.pause(500);

        await this.waitForFilterValue(text);
    }

    async cycleThroughFilters() {

        // go through each filter manually

        await this.selectOptionByText('Within 7 days');

        await this.selectOptionByText('Within 14 days');

        await this.selectOptionByText('Within 30 days');

        await this.selectOptionByText('Within 3 months');
    }

    async getTaskCount() {

        const tasks = await this.taskItems;

        const count = tasks.length;

        console.log('Task count:', count);

        return count;
    }

    async waitForTaskUpdate(previousCount) {

        await browser.waitUntil(async () => {

            const current = await this.getTaskCount();

            return current !== previousCount;

        }, { timeout: 8000 });

        console.log('Task list updated');
    }

    async getPageText() {

        const body = await $('body');

        const text = await body.getText();

        return text;
    }

    async waitForMetricsUpdate(previousText) {

        await browser.waitUntil(async () => {

            const current = await this.getPageText();

            return current !== previousText;

        }, { timeout: 8000 });

        console.log('Metrics updated');
    }

    async logout() {

        const logoutBtn = await this.logoutButton;

        await logoutBtn.click();

        const username = await this.loginUsernameField;

        await username.waitForDisplayed({ timeout: 10000 });

        console.log('Logged out');
    }
}

export default new DashboardPage();