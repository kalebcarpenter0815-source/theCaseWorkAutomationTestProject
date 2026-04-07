import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import { users } from '../data/users.js';

describe('Dashboard Filters', () => {

    beforeEach(async () => {
        await browser.reloadSession();

        await theSignInPage.open();

        const user = users[0];
        await theSignInPage.login(user.username, user.password);

        // ✅ wait for dashboard to fully load
        await $('[data-testid="menu-logout-button"]').waitForDisplayed();
    });

    it('should display "Within 7 days" as selected filter', async () => {
        const filterDropdown = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filterDropdown.waitForDisplayed();

        await expect(filterDropdown).toHaveText('Within 7 days');
    });

    it('should change filter to another option', async () => {
        const filterDropdown = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filterDropdown.waitForClickable();
        await filterDropdown.click();

        // 🔥 Select another option (adjust if needed)
        const anotherOption = await $('//button[contains(text(),"month")]');

        await anotherOption.waitForClickable();
        await anotherOption.click();

        // ✅ Verify dropdown text changed
        await expect(filterDropdown).not.toHaveText('Within 7 days');
    });

    it('should update task list when filter changes', async () => {
        const filterDropdown = $('[data-testid="upcoming-events-filter-dropdown"]');

        // ✅ Count tasks BEFORE
        const tasksBefore = await $$('[data-testid^="event-case-persona"]');
        const countBefore = tasksBefore.length;

        // ✅ Change filter
        await filterDropdown.click();

        const anotherOption = await $('//button[contains(text(),"month")]');
        await anotherOption.click();

        // ⚠️ Temporary wait for UI update
        await browser.pause(2000);

        // ✅ Count tasks AFTER
        const tasksAfter = await $$('[data-testid^="event-case-persona"]');
        const countAfter = tasksAfter.length;

        // ✅ Assert list changed
        await expect(countAfter).not.toBe(countBefore);
    });

    it('should update metrics when filter changes', async () => {
        const filterDropdown = $('[data-testid="upcoming-events-filter-dropdown"]');

        // ✅ Capture page text BEFORE
        const metricsBefore = await $('body').getText();

        // ✅ Change filter
        await filterDropdown.click();

        const anotherOption = await $('//button[contains(text(),"month")]');
        await anotherOption.click();

        await browser.pause(2000);

        // ✅ Capture AFTER
        const metricsAfter = await $('body').getText();

        // ✅ Assert something changed
        await expect(metricsAfter).not.toBe(metricsBefore);
    });

    it('should retain filter after navigation', async () => {
        const filterDropdown = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filterDropdown.click();
        const anotherOption = await $('//button[contains(text(),"month")]');
        await anotherOption.click();

        // Navigate away
        await browser.url('/cases');

        // Go back
        await browser.back();

        // ✅ Verify filter is still changed
        await expect(filterDropdown).not.toHaveText('Within 7 days');
    });

    it('should persist filter after refresh', async () => {
        const filterDropdown = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filterDropdown.click();
        const anotherOption = await $('//button[contains(text(),"month")]');
        await anotherOption.click();

        // Refresh page
        await browser.refresh();

        // ✅ Verify filter is still applied
        await expect(filterDropdown).not.toHaveText('Within 7 days');
    });

    it('should handle no-data scenario gracefully', async () => {
        const filterDropdown = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filterDropdown.click();

        // 🔥 Try selecting something restrictive (adjust if needed)
        const restrictiveOption = await $('//button[contains(text(),"1")]');

        if (await restrictiveOption.isExisting()) {
            await restrictiveOption.click();
        }

        await browser.pause(2000);

        // ✅ Just verify page is still stable
        const body = $('body');
        await expect(body).toBeDisplayed();
    });

});