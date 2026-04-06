import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import { users } from '../data/users.js';

describe('Dashboard Tests', () => {

    beforeEach(async () => {
        await browser.reloadSession();

        await theSignInPage.open();

        const user = users[0]; // just use your main account

        await theSignInPage.login(user.username, user.password);

        // ✅ Wait until dashboard loads
        await $('[data-testid="menu-logout-button"]').waitForDisplayed();
    });

    it('should load the dashboard', async () => {
        const logoutBtn = $('[data-testid="menu-logout-button"]');

        await expect(logoutBtn).toBeDisplayed();
    });

});