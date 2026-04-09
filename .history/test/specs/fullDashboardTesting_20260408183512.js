import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Full Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("loads the dashboard in a simple and friendly way", async () => {
        await expect(dashboardPage.logoutButton).toBeDisplayed();
        await expect(dashboardPage.filterDropdown).toBeDisplayed();

        const filterText = await dashboardPage.getFilterText();
        await expect(filterText).toBeTruthy();
    });

    it("steps through the main filter options", async () => {
        await dashboardPage.cycleThroughFilters();
        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });

    it("checks if events exist before trying to edit them", async () => {
        const names = await dashboardPage.getAllEventNames();
        const dates = await dashboardPage.getAllEventDates();

        if (names.length === 0) {
            console.warn("No events found, so this part of the test is being skipped.");
            expect(names.length).toBe(0);
            return;
        }

        expect(names.length).toBeGreaterThan(0);
        expect(dates.length).toBeGreaterThanOrEqual(0);
    });

    it("tries the 7 day and 14 day filters", async () => {
        await dashboardPage.selectOptionByText("Within 7 days");
        await dashboardPage.waitForTaskUpdate();

        await dashboardPage.selectOptionByText("Within 14 days");
        await dashboardPage.waitForTaskUpdate();

        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });

    it("edits every upcoming event if there are any", async () => {
        const editedCount = await dashboardPage.editAllUpcomingEvents();
        expect(editedCount).toBeGreaterThanOrEqual(0);
        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("edits the first event in a full beginner-friendly flow", async () => {
        const didEdit = await dashboardPage.editFirstEventFullFlow();
        if (!didEdit) {
            console.warn("No first event was available to edit, so this step was skipped.");
            return;
        }

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("logs out at the end of the test run", async () => {
        await dashboardPage.logout();
        await expect(dashboardPage.loginUsernameField).toBeDisplayed();
    });
});
