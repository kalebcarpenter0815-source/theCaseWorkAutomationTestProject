import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import dashboardPage from '../pageobjects/dashboardPage.js';
import { user } from '../data/users.js';

class LoginHelper {
    async loginAsDefaultUser() {

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

        try {
            await dashboardPage.waitForDashboard();
        } catch (error) {
            // The dashboard shell can occasionally load slowly after submit.
            await browser.refresh();
            await dashboardPage.waitForDashboard();
        }

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    }
}

export default new LoginHelper();
