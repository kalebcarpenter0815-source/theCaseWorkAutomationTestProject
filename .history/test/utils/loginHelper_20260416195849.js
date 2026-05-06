import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import dashboardPage from '../pageobjects/dashboardPage.js';
import { users } from '../data/users.js';

class LoginHelper {
    async loginAsDefaultUser() {
        const user = users[0];

        await browser.reloadSession();
        await browser.url('https://app.thecasework.com/');

        let loginPageIsShowing = false;

        for (let i = 0; i < 3; i++) {
            const loginFieldIsShowing = await theSignInPage.inputUsername.isDisplayed().catch(() => false);
            const dashboardIsShowing = await dashboardPage.logoutButton.isDisplayed().catch(() => false);

            if (loginFieldIsShowing) {
                loginPageIsShowing = true;
                break;
            }

            if (dashboardIsShowing) {
                await dashboardPage.logout();
                loginPageIsShowing = true;
                break;
            }

            await browser.pause(2000);
            await browser.refresh();
        }

        if (!loginPageIsShowing) {
            await theSignInPage.open();
        }

        await theSignInPage.waitForPage();
        await theSignInPage.login(user.username, user.password);
        await dashboardPage.waitForDashboard();
        await expect(dashboardPage.logoutButton).toBeDisplayed();
    }
}

export default new LoginHelper();
