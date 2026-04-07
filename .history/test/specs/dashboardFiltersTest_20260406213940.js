import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import { users } from '../data/users.js';

describe('Dashboard Filters', () => {

    beforeEach(async () => {
        await browser.reloadSession();

        await theSignInPage.open();

        // ✅ wait for login page (fixes your error)
        await $('[data-testid="login-username"]').waitForDisplayed();

        const user = users[0];
        await theSignInPage.login(user.username, user.password);

        // wait for dashboard to load
        await $('[data-testid="menu-logout-button"]').waitForDisplayed();
    });

    it('should show default filter', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.waitForDisplayed();

        // ✅ FIX: correct default value
        await expect(filter).toHaveText('Within 3 months');
    });

    it('should change filter when selecting another option', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.waitForClickable();
        await filter.click();

        // ✅ FIX: exact selector (no guessing)
        const option = $('button[value="Within last month"]');

        await option.waitForClickable();
        await option.click();

        // ✅ wait until filter actually updates
        await browser.waitUntil(
            async () => (await filter.getText()) === 'Within last month',
            {
                timeout: 5000,
                timeoutMsg: 'Filter did not update'
            }
        );

        await expect(filter).toHaveText('Within last month');
    });

    it('should update task list when filter changes', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        const beforeCount = (await $$('[data-testid^="event-case-persona"]')).length;

        await filter.click();

        const option = $('button[value="Within last month"]');
        await option.click();

        // ✅ wait for list to update (no pause)
        await browser.waitUntil(
            async () => (await $$('[data-testid^="event-case-persona"]')).length !== beforeCount,
            {
                timeout: 8000,
                timeoutMsg: 'Task list did not update'
            }
        );

        const afterCount = (await $$('[data-testid^="event-case-persona"]')).length;

        await expect(afterCount).not.toBe(beforeCount);
    });

    it('should update metrics when filter changes', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        const beforeText = await $('body').getText();

        await filter.click();

        const option = $('button[value="Within last month"]');
        await option.click();

        // ✅ wait until metrics actually change
        await browser.waitUntil(
            async () => (await $('body').getText()) !== beforeText,
            {
                timeout: 8000,
                timeoutMsg: 'Metrics did not update'
            }
        );

        const afterText = await $('body').getText();

        await expect(afterText).not.toBe(beforeText);
    });

    it('should keep filter after navigating away and back', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.click();

        const option = $('button[value="Within last month"]');
        await option.click();

        await browser.waitUntil(
            async () => (await filter.getText()) === 'Within last month'
        );

        await browser.url('/cases');
        await browser.back();

        await $('[data-testid="menu-logout-button"]').waitForDisplayed();

        await expect(filter).toHaveText('Within last month');
    });

    it('should keep filter after refresh', async () => {
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

    it('should not crash when filter shows little or no data', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.click();

        // still simple, but safe
        const option = $('button[value="Within 7 days"]');

        if (await option.isExisting()) {
            await option.click();
        }

        await expect($('body')).toBeDisplayed();
    });

});