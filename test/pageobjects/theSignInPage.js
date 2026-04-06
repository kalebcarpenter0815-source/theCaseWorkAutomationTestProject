import { $ } from '@wdio/globals'
import Page from './page.js';

class theSignInPage extends Page {

    get inputUsername () {
        return $('[data-testid="login-username"]');
    }

    get inputPassword () {
        return $('[data-testid="login-password"]');
    }

    get btnLoginSubmit () {
        return $('[data-testid="login-submit"]');
    }

    async login (username, password) {
        await this.inputUsername.waitForDisplayed();
        await this.inputUsername.setValue(username);

        await this.inputPassword.setValue(password);
        await this.btnLoginSubmit.click();
    }

    open () {
        return super.open('/');
    }
}

export default new theSignInPage();