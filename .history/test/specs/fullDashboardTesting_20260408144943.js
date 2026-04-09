import { expect } from '@wdio/globals';
import dashboardPage from '../pageobjects/dashboardPage.js';
import loginHelper from '../utils/loginHelper.js';

describe('Dashboard Full Tests', () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
    });

    it('should load dashboard correctly', async () => {
        await expect(dashboardPage.logoutButton).toBeDisplayed();
        await expect(dashboardPage.filterDropdown).toBeDisplayed();

        const filter = await dashboardPage.getFilterText();
        await expect(filter).toBeTruthy();
    });

    it('should hold down selections in Upcoming Events', async () => {
        await dashboardPage.holdAllUpcomingEventFilters(2000);
        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });
    
    it('should validate event names and dates exist', async () => {
        const names = await dashboardPage.getAllEventNames();
        const dates = await dashboardPage.getAllEventDates();

        expect(names.length).toBeGreaterThan(0);
        expect(dates.length).toBeGreaterThan(0);
    });

    // ✅ Filter changes should update results
it('should update results when filter changes', async () => {
    const beforeCount = await dashboardPage.getTaskCount();

    await dashboardPage.selectOptionByText('Within 7 days');
    await browser.pause(2000);

    const afterCount = await dashboardPage.getTaskCount();

    expect(afterCount).not.toBe(beforeCount);
});


});
