import { $ } from '@wdio/globals'
import Page from './page.js';

class theSignInPage extends Page {

    // ===== SELECTORS =====
    get inputUsername () {
        return $('[data-testid="login-username"]');
    }

    get inputPassword () {
        return $('[data-testid="login-password"]');
    }

    get btnLoginSubmit () {
        return $('[data-testid="login-submit"]');
    }

    // ===== ACTIONS =====
    async login (username, password) {
        // wait for login page to fully load
        await this.inputUsername.waitForDisplayed({ timeout: 10000 });

        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLoginSubmit.click();
    }

    open () {
        return super.open('/');
    }
}

export default new theSignInPage();