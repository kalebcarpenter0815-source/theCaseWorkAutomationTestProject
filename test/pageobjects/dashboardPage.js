import { $ } from '@wdio/globals'
import Page from './page.js';

class DashboardPage extends Page {

    get logoutButton () {
        return $('[data-testid="menu-logout-button"]');
    }

    get loginUsernameField () {
        return $('[data-testid="login-username"]');
    }

    async logout () {
        await this.logoutButton.waitForDisplayed();
        await this.logoutButton.scrollIntoView();
        await this.logoutButton.waitForClickable();
        await this.logoutButton.click();

        // Wait until login page appears (REAL check)
        await this.loginUsernameField.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Expected to be back on login page after logout'
        });
    }
}

export default new DashboardPage();