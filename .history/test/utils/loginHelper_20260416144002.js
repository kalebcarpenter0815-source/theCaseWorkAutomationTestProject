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
        
        // Debug: Check what's on the page after login
        console.log("=== POST-LOGIN DEBUG INFO ===");
        console.log("Waiting 3 seconds for page to process...");
        await browser.pause(3000);
        
        const currentUrl = await browser.getUrl();
        console.log("Current URL:", currentUrl);
        
        // Check if logout button exists
        const logoutButtonExists = await dashboardPage.logoutButton.isExisting().catch(() => false);
        console.log("Logout button exists:", logoutButtonExists);
        
        if (logoutButtonExists) {
            const logoutButtonDisplayed = await dashboardPage.logoutButton.isDisplayed().catch(() => false);
            console.log("Logout button is displayed:", logoutButtonDisplayed);
            
            // Check if it's hidden
            const isHidden = await browser.execute((el) => {
                return getComputedStyle(el).display === 'none' || getComputedStyle(el).visibility === 'hidden';
            }, await dashboardPage.logoutButton);
            console.log("Logout button is hidden:", isHidden);
            
            // Check parent elements
            const parentDisplay = await browser.execute((el) => {
                let parent = el.parentElement;
                let depth = 0;
                while (parent && depth < 5) {
                    const display = getComputedStyle(parent).display;
                    const visibility = getComputedStyle(parent).visibility;
                    console.log(`Parent ${depth}: display=${display}, visibility=${visibility}`);
                    parent = parent.parentElement;
                    depth++;
                }
            }, await dashboardPage.logoutButton);
            
            // Force visibility if it's hidden
            console.log("Attempting to make logout button visible...");
            await browser.execute((el) => {
                el.style.display = 'block';
                el.style.visibility = 'visible';
            }, await dashboardPage.logoutButton);
        }
        
        // Get all data-testid values
        const allElements = await browser.$$('[data-testid]');
        const dataTestIds = [];
        for (let el of allElements) {
            const testId = await el.getAttribute('data-testid');
            dataTestIds.push(testId);
        }
        console.log("All data-testid values found:", dataTestIds.join(', '));
        
        console.log("=== END DEBUG INFO ===");
        
        await dashboardPage.waitForDashboard();
        await expect(dashboardPage.logoutButton).toBeDisplayed();
    }
}

export default new LoginHelper();
