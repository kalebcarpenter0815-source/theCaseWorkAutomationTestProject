import { $ } from '@wdio/globals';
import Page from './page.js';

class SignInPage extends Page {
    get inputUsername() {
        return $('[data-testid="login-username"]');
    }

    get inputPassword() {
        return $('[data-testid="login-password"]');
    }

    get btnLoginSubmit() {
        return $('[data-testid="login-submit"]');
    }

    async waitForPage() {
        await this.inputUsername.waitForDisplayed({ timeout: 15000 });
        await this.inputPassword.waitForDisplayed({ timeout: 15000 });
    }

    async login(username, password) {
        await this.waitForPage();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLoginSubmit.waitForClickable({ timeout: 10000 });
        await this.btnLoginSubmit.click();
    }

    open() {
        return super.open('/');
    }
}

export default new SignInPage();
