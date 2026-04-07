import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import { users } from '../data/users.js';

describe('Dashboard Filters', () => {

    beforeEach(async () => {
        await browser.reloadSession();

        await theSignInPage.open();

        await $('[data-testid="login-username"]').waitForDisplayed();

        const user = users[0];
        await theSignInPage.login(user.username, user.password);

        await $('[data-testid="menu-logout-button"]').waitForDisplayed();
    });

    it('should show default filter', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.waitForDisplayed();

        await expect(filter).toHaveText('Within 3 months');
    });

    it('should change filter correctly', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.click();

        const option = $('button[value="Within last month"]');

        await option.waitForClickable();
        await option.click();

        await browser.waitUntil(
            async () => (await filter.getText()) === 'Within last month',
            {
                timeout: 5000,
                timeoutMsg: 'Filter did not change properly'
            }
        );

        await expect(filter).toHaveText('Within last month');
    });

    it('should update task list when filter changes', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        const before = await $$(('[data-testid^="event-case-persona"]')).length;

        await filter.click();

        const option = $('button[value="Within last month"]');
        await option.click();

        await browser.waitUntil(
            async () => (await $$(('[data-testid^="event-case-persona"]')).length) !== before,
            {
                timeout: 8000,
                timeoutMsg: 'Task list did not update'
            }
        );

        const after = await $$(('[data-testid^="event-case-persona"]')).length;

        await expect(after).not.toBe(before);
    });

    it('should persist filter after refresh', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.click();

        const option = $('button[value="Within last month"]');
        await option.click();

        await browser.waitUntil(
            async () => (await filter.getText()) === 'Within last month'
        );

        await browser.refresh();

        await $('[data-testid="menu-logout-button"]').waitForDisplayed();

        await expect(filter).toHaveText('Within last month');
    });

});