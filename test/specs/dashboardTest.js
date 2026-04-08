import { expect } from '@wdio/globals';
import dashboardPage from '../pageobjects/dashboardPage.js';
import loginHelper from '../utils/loginHelper.js';

describe('Dashboard Tests', () => {
    beforeEach(async () => {
        await loginHelper.loginAsDefaultUser();
    });

    it('should load dashboard', async () => {
        await expect(dashboardPage.logoutButton).toBeDisplayed();
        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });
});
