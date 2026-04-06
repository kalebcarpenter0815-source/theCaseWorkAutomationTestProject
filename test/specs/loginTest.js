import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import dashboardPage from '../pageobjects/dashboardPage.js';
import { users } from '../data/users.js';

describe('Login + Logout Test', () => {

    it('should login and logout for each user', async () => {

        for (const user of users) {

            await browser.reloadSession();

            await theSignInPage.open();

            await theSignInPage.login(user.username, user.password);

            // ✅ ASSERT LOGIN SUCCESS (dashboard visible)
            const logoutBtn = $('[data-testid="menu-logout-button"]');
            await logoutBtn.waitForDisplayed();
            await expect(logoutBtn).toBeDisplayed();

            // ✅ LOGOUT
            await dashboardPage.logout();

            // ✅ ASSERT LOGOUT SUCCESS (back to login page)
            const usernameField = $('[data-testid="login-username"]');
            await expect(usernameField).toBeDisplayed();
        }

    });

});