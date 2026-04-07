// import { expect } from '@wdio/globals';
// import theSignInPage from '../pageobjects/theSignInPage.js';
// import dashboardPage from '../pageobjects/dashboardPage.js';
// import { users } from '../data/users.js';

// describe('Dashboard Filters', () => {

//     beforeEach(async () => {

//         console.log('\nSTARTING TEST\n');

//         await browser.reloadSession();

//         await theSignInPage.open();

//         const user = users[0];

//         console.log('Logging in as:', user.username);

//         await theSignInPage.login(user.username, user.password);

//         await browser.waitUntil(async () => {
//             return await dashboardPage.filterDropdown.isDisplayed();
//         }, { timeout: 10000 });

//         await dashboardPage.waitForDashboard();
//     });

//     it('should cycle through all filters in order', async () => {

//         console.log('Running filter test');

//         await dashboardPage.cycleThroughFilters();

//         const finalValue = await dashboardPage.getFilterText();

//         console.log('FINAL VALUE:', finalValue);

//         await expect(finalValue).toBe('Within 3 months');

//     }, 2);

// });
import { expect } from '@wdio/globals';
import theSignInPage from '../pageobjects/theSignInPage.js';
import dashboardPage from '../pageobjects/dashboardPage.js';
import { users } from '../data/users.js';

describe('Dashboard Filters', () => {

    beforeEach(async () => {

        console.log('Starting test...');

        await browser.reloadSession();

        await theSignInPage.open();

        const user = users[0];

        console.log('Logging in user:', user.username);

        await theSignInPage.login(user.username, user.password);

        await browser.waitUntil(async () => {
            return await dashboardPage.filterDropdown.isDisplayed();
        }, { timeout: 10000 });

        await dashboardPage.waitForDashboard();
    });

    it('should cycle through all filters in order', async () => {

        console.log('Running filter cycle test');

        await dashboardPage.cycleThroughFilters();

        const finalValue = await dashboardPage.getFilterText();

        console.log('Final filter value:', finalValue);

        await expect(finalValue).toBe('Within 3 months');

    }, 2);

    it('should update tasks when filters change', async () => {

        const before = await dashboardPage.getTaskCount();

        await dashboardPage.cycleThroughFilters();

        await dashboardPage.waitForTaskUpdate(before);

        const after = await dashboardPage.getTaskCount();

        await expect(after).not.toBe(before);
    });

});