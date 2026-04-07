// import { expect } from '@wdio/globals';
// import theSignInPage from '../pageobjects/theSignInPage.js';
// import dashboardPage from '../pageobjects/dashboardPage.js';
// import { users } from '../data/users.js';

// describe('Login + Logout Test', () => {

//     it('should login and logout for each user', async () => {

//         for (let i = 0; i < users.length; i++) {

//             const user = users[i];

//             await browser.reloadSession();

//             await theSignInPage.open();

//             await theSignInPage.login(user.username, user.password);

//             const logoutBtn = await $('[data-testid="menu-logout-button"]');

//             await logoutBtn.waitForDisplayed({ timeout: 10000 });

//             await expect(logoutBtn).toBeDisplayed();

//             await dashboardPage.logout();

//             const usernameField = await $('[data-testid="login-username"]');

//             await usernameField.waitForDisplayed({ timeout: 10000 });

//             await expect(usernameField).toBeDisplayed();
//         }

//     });

// });
import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import dashboardPage from '../pageobjects/dashboardPage.js';
import { users } from '../data/users.js';

describe('Login and Logout Test', () => {

    it('should login and logout users', async () => {

        for (let i = 0; i < users.length; i++) {

            const user = users[i];

            await browser.reloadSession();

            await theSignInPage.open();

            await theSignInPage.login(user.username, user.password);

            const logoutBtn = await $('[data-testid="menu-logout-button"]');

            await logoutBtn.waitForDisplayed({ timeout: 10000 });

            const loggedIn = await logoutBtn.isDisplayed();

            await expect(loggedIn).toBe(true);

            await dashboardPage.logout();

            const usernameField = await $('[data-testid="login-username"]');

            await usernameField.waitForDisplayed({ timeout: 10000 });

            const loggedOut = await usernameField.isDisplayed();

            await expect(loggedOut).toBe(true);
        }

    });

});