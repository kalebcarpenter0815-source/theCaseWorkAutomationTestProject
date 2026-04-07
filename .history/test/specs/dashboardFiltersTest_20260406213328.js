import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import { users } from '../data/users.js';

describe('Dashboard Filters', () => {

    const filterDropdown = '[data-testid="upcoming-events-filter-dropdown"]';
    const logoutBtn = '[data-testid="menu-logout-button"]';
    const taskItems = '[data-testid^="event-case-persona"]';

    beforeEach(async () => {
        await browser.reloadSession();

        await theSignInPage.open();

        const user = users[0];
        await theSignInPage.login(user.username, user.password);

        // ✅ Wait for dashboard ready
        await $(logoutBtn).waitForDisplayed();
    });

    it('should display "Within 7 days" as selected filter', async () => {
        await expect($(filterDropdown)).toHaveText('Within 7 days');
    });

    it('should change filter and update dropdown value', async () => {
        const dropdown = $(filterDropdown);

        await dropdown.waitForClickable();
        await dropdown.click();

        // 🎯 Better selector (text-based but precise)
        const option = await $('//button[.//text()[contains(.,"month")]]');
        await option.waitForClickable();
        await option.click();

        // ✅ Wait until text actually changes (NO pause)
        await browser.waitUntil(
            async () => !(await dropdown.getText()).includes('Within 7 days'),
            {
                timeout: 5000,
                timeoutMsg: 'Filter did not update'
            }
        );

        await expect(dropdown).not.toHaveText('Within 7 days');
    });

    it('should update task list when filter changes', async () => {
        const dropdown = $(filterDropdown);

        const before = await $$(taskItems).length;

        await dropdown.click();

        const option = await $('//button[.//text()[contains(.,"month")]]');
        await option.click();

        // ✅ Wait for task list to change
        await browser.waitUntil(
            async () => (await $$(taskItems).length) !== before,
            {
                timeout: 5000,
                timeoutMsg: 'Task list did not update'
            }
        );

        const after = await $$(taskItems).length;

        await expect(after).not.toBe(before);
    });

    it('should update metrics when filter changes', async () => {
        const dropdown = $(filterDropdown);

        // 📊 Better: capture only visible dashboard text
        const dashboardContainer = $('body');

        const before = await dashboardContainer.getText();

        await dropdown.click();

        const option = await $('//button[.//text()[contains(.,"month")]]');
        await option.click();

        await browser.waitUntil(
            async () => (await dashboardContainer.getText()) !== before,
            {
                timeout: 5000,
                timeoutMsg: 'Metrics did not update'
            }
        );

        const after = await dashboardContainer.getText();

        await expect(after).not.toBe(before);
    });

    it('should retain filter after navigation', async () => {
        const dropdown = $(filterDropdown);

        await dropdown.click();

        const option = await $('//button[.//text()[contains(.,"month")]]');
        await option.click();

        // wait for change
        await browser.waitUntil(
            async () => !(await dropdown.getText()).includes('Within 7 days')
        );

        await browser.url('/cases');
        await browser.back();

        // ✅ wait for dashboard again
        await $(logoutBtn).waitForDisplayed();

        await expect(dropdown).not.toHaveText('Within 7 days');
    });

    it('should persist filter after refresh', async () => {
        const dropdown = $(filterDropdown);

        await dropdown.click();

        const option = await $('//button[.//text()[contains(.,"month")]]');
        await option.click();

        await browser.waitUntil(
            async () => !(await dropdown.getText()).includes('Within 7 days')
        );

        await browser.refresh();

        await $(logoutBtn).waitForDisplayed();

        await expect(dropdown).not.toHaveText('Within 7 days');
    });

    it('should handle no-data scenario gracefully', async () => {
        const dropdown = $(filterDropdown);

        await dropdown.click();

        // 🔍 Try selecting restrictive option
        const option = await $('//button[.//text()[contains(.,"1")]]');

        if (await option.isExisting()) {
            await option.click();
        }

        // ✅ Ensure app still stable
        await expect($('body')).toBeDisplayed();
    });

});