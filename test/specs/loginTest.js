import { expect } from '@wdio/globals';
import dashboardPage from '../pageobjects/dashboardPage.js';
import theSignInPage from '../pageobjects/theSignInPage.js';
import loginHelper from '../utils/loginHelper.js';

describe('Login and Logout Test', () => {
    it('should login and logout user', async () => {
        await loginHelper.loginAsDefaultUser();
        await expect(dashboardPage.logoutButton).toBeDisplayed();

        await dashboardPage.logout();

        await expect(theSignInPage.inputUsername).toBeDisplayed();
    });
});
