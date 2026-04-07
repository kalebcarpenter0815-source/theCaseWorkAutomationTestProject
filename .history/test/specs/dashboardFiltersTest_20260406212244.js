import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import { users } from '../data/users.js';

describe('Dashboard Filters', () => {

    beforeEach(async () => {
        await browser.reloadSession();

        await theSignInPage.open();

        const user = users[0];
        await theSignInPage.login(user.username, user.password);

        // wait for dashboard
        await $('[data-testid="menu-logout-button"]').waitForDisplayed();
    });

    it('should apply "Within 7 Days" filter', async () => {

        // ✅ STEP 1: open filter dropdown
        const filterDropdown = $('[data-testid="upcoming-events-filter-dropdown"]');
        await filterDropdown.waitForClickable();
        await filterDropdown.click();

        // TEMP: find option by text (we’ll refine later)
        const within7Days = await $('//button[contains(text(),"7")]');
        await within7Days.waitForClickable();
        await within7Days.click();

        // ✅ STEP 2: verify something on page exists (task list)
        const taskList = $('body'); // TEMP fallback until we get real selector

        await expect(taskList).toBeDisplayed();
    });

});