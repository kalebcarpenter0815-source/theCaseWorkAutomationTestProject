import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import dashboardPage from '../pageobjects/dashboardPage.js';
import { users } from '../data/users.js';

describe('Dashboard Filters', () => {

    beforeEach(async () => {
        await browser.reloadSession();

        await theSignInPage.open();

        await $('[data-testid="login-username"]').waitForDisplayed();

        const user = users[0];
        await theSignInPage.login(user.username, user.password);

        await dashboardPage.waitForDashboard();
    });

    it('should show default filter', async () => {
        const text = await dashboardPage.getFilterText();

        await expect(text).toBe('Within 3 months');
    });

    it('should change filter when selecting another option', async () => {
        await dashboardPage.openFilter();
        await dashboardPage.selectLastMonthFilter();

        const text = await dashboardPage.getFilterText();

        await expect(text).toBe('Within last month');
    });

    it('should update task list when filter changes', async () => {
        const before = await dashboardPage.getTaskCount();

        await dashboardPage.openFilter();
        await dashboardPage.selectLastMonthFilter();

        await dashboardPage.waitForTaskUpdate(before);

        const after = await dashboardPage.getTaskCount();

        await expect(after).not.toBe(before);
    });

    it('should update metrics when filter changes', async () => {
        const before = await dashboardPage.getPageText();

        await dashboardPage.openFilter();
        await dashboardPage.selectLastMonthFilter();

        await dashboardPage.waitForMetricsUpdate(before);

        const after = await dashboardPage.getPageText();

        await expect(after).not.toBe(before);
    });

    it('should keep filter after navigating away and back', async () => {
        await dashboardPage.openFilter();
        await dashboardPage.selectLastMonthFilter();

        await browser.url('/cases');
        await browser.back();

        await dashboardPage.waitForDashboard();

        const text = await dashboardPage.getFilterText();

        await expect(text).toBe('Within last month');
    });

    it('should keep filter after refresh', async () => {
        await dashboardPage.openFilter();
        await dashboardPage.selectLastMonthFilter();

        await browser.refresh();

        await dashboardPage.waitForDashboard();

        const text = await dashboardPage.getFilterText();

        await expect(text).toBe('Within last month');
    });

    it('should not crash when filter shows little or no data', async () => {
        await dashboardPage.openFilter();

        const option = $('button[value="Within 7 days"]');

        if (await option.isExisting()) {
            await option.click();
        }

        await expect($('body')).toBeDisplayed();
    });

});