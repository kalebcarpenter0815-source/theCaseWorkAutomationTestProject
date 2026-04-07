import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import { users } from '../data/users.js';

describe('Dashboard Filters', () => {

    beforeEach(async () => {
        await browser.reloadSession();

        await theSignInPage.open();

        const user = users[0];
        await theSignInPage.login(user.username, user.password);

        await $('[data-testid="menu-logout-button"]').waitForDisplayed();
    });

    it('should display "Within 7 days" as selected filter', async () => {

        const filterDropdown = $('[data-testid="upcoming-events-filter-dropdown"]');

        await filterDropdown.waitForDisplayed();

        // ✅ ASSERT the correct filter is selected
        await expect(filterDropdown).toHaveText('Within 7 days');
    });

});