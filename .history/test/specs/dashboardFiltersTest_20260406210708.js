import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import { users } from '../data/users.js';

describe('Dashboard Filters', () => {

    beforeEach(async () => {
        await browser.reloadSession();

        await theSignInPage.open();

        const user = users[0];
        await theSignInPage.login(user.username, user.password);
    });

    it('should apply "Within 3 months" filter', async () => {
        // STEP 1: locate filter
        const filterDropdown = $('button[value="Within 3 months"]'); // ← we will fix this

        await filterDropdown.click();

        const within3Months = $('SELECTOR_FOR_OPTION'); // ← we will fix this
        await within3Months.click();

        // VERIFY something changed
        const taskList = $('SELECTOR_FOR_TASK_LIST');

        await expect(taskList).toBeDisplayed();


        
        // wait for dashboard
        await $('[data-testid="menu-logout-button"]').waitForDisplayed();
    });

});