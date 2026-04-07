import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import { users } from '../data/users.js';

describe('Dashboard Filters', () => {

    beforeEach(async () => {
        await browser.reloadSession();

        await theSignInPage.open();

        const user = users[0];
        await theSignInPage.login(user.username, user.password);

        // wait for dashboard to load
        await $('[data-testid="menu-logout-button"]').waitForDisplayed();
    });

    it('should show "Within 7 days" as default filter', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.waitForDisplayed();

        await expect(filter).toHaveText('Within 7 days');
    });

    it('should change filter when selecting another option', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.click();

        const option = $('//button[contains(text(),"month")]');

        await option.waitForClickable();
        await option.click();

        // wait until filter text changes
        await browser.waitUntil(async () => {
            const text = await filter.getText();
            return !text.includes('Within 7 days');
        });

        await expect(filter).not.toHaveText('Within 7 days');
    });

    it('should update task list when filter changes', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        // count tasks before
        const beforeTasks = await $$('[data-testid^="event-case-persona"]');
        const beforeCount = beforeTasks.length;

        await filter.click();

        const option = $('//button[contains(text(),"month")]');
        await option.click();

        // wait until task count changes
        await browser.waitUntil(async () => {
            const afterTasks = await $$('[data-testid^="event-case-persona"]');
            return afterTasks.length !== beforeCount;
        });

        const afterTasks = await $$('[data-testid^="event-case-persona"]');
        const afterCount = afterTasks.length;

        await expect(afterCount).not.toBe(beforeCount);
    });

    it('should update metrics when filter changes', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        const beforeText = await $('body').getText();

        await filter.click();

        const option = $('//button[contains(text(),"month")]');
        await option.click();

        await browser.waitUntil(async () => {
            const afterText = await $('body').getText();
            return afterText !== beforeText;
        });

        const afterText = await $('body').getText();

        await expect(afterText).not.toBe(beforeText);
    });

    it('should keep filter after navigating away and back', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.click();

        const option = $('//button[contains(text(),"month")]');
        await option.click();

        await browser.waitUntil(async () => {
            const text = await filter.getText();
            return !text.includes('Within 7 days');
        });

        await browser.url('/cases');
        await browser.back();

        await $('[data-testid="menu-logout-button"]').waitForDisplayed();

        await expect(filter).not.toHaveText('Within 7 days');
    });

    it('should keep filter after refresh', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.click();

        const option = $('//button[contains(text(),"month")]');
        await option.click();

        await browser.waitUntil(async () => {
            const text = await filter.getText();
            return !text.includes('Within 7 days');
        });

        await browser.refresh();

        await $('[data-testid="menu-logout-button"]').waitForDisplayed();

        await expect(filter).not.toHaveText('Within 7 days');
    });

    it('should not crash when filter shows little or no data', async () => {
        const filter = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filter.click();

        const option = $('//button[contains(text(),"1")]');

        if (await option.isExisting()) {
            await option.click();
        }

        // just make sure page is still working
        await expect($('body')).toBeDisplayed();
    });

});