// import { expect } from '@wdio/globals';
// import theSignInPage from '../pageobjects/theSignInPage.js';
// import { users } from '../data/users.js';

// describe('Dashboard Tests', () => {

//     beforeEach(async () => {

//         await browser.reloadSession();

//         await theSignInPage.open();

//         const user = users[0];

//         await theSignInPage.login(user.username, user.password);

//         const logoutBtn = await $('[data-testid="menu-logout-button"]');

//         await logoutBtn.waitForDisplayed({ timeout: 10000 });
//     });

//     it('should load the dashboard', async () => {

//         const logoutBtn = await $('[data-testid="menu-logout-button"]');

//         await expect(logoutBtn).toBeDisplayed();
//     });

// });
import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import { users } from '../data/users.js';

describe('Dashboard Tests', () => {

    beforeEach(async () => {

        await browser.reloadSession();

        await theSignInPage.open();

        const user = users[0];

        await theSignInPage.login(user.username, user.password);

        const logoutBtn = await $('[data-testid="menu-logout-button"]');

        await logoutBtn.waitForDisplayed({ timeout: 10000 });
    });

    it('should load dashboard', async () => {

        const logoutBtn = await $('[data-testid="menu-logout-button"]');

        const isVisible = await logoutBtn.isDisplayed();

        await expect(isVisible).toBe(true);
    });

});