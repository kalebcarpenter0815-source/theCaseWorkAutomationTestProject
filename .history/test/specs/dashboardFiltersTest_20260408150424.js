import { expect } from '@wdio/globals';
import dashboardPage from '../pageobjects/dashboardPage.js';
import loginHelper from '../utils/loginHelper.js';

describe('Dashboard Filters', () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
    });

    it('should cycle through all filters in order', async () => {
        await dashboardPage.cycleThroughFilters();

        const finalValue = await dashboardPage.getFilterText();
        await expect(finalValue).toBe('Within 3 months');
    });

    it('should update tasks when filters change', async () => {
        await dashboardPage.selectOptionByText('Within 7 days');
        const firstCount = await dashboardPage.getTaskCount();

        await dashboardPage.selectOptionByText('Within 3 months');
        await dashboardPage.waitForTaskUpdate(firstCount);

        const updatedCount = await dashboardPage.getTaskCount();
        await expect(updatedCount).not.toBe(firstCount);
    });
});
