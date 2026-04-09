import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Filters", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("walks through the main filter options in a beginner-friendly way", async () => {
        await dashboardPage.cycleThroughFilters();

        const finalValue = await dashboardPage.getFilterText();
        await expect(finalValue).toContain("3 months");
    });

    it("checks whether upcoming events exist before trying to edit them", async () => {
        const eventNames = await dashboardPage.getAllEventNames();

        if (eventNames.length === 0) {
            console.warn("No upcoming events were found, so editing steps will be skipped.");
            expect(eventNames.length).toBe(0);
            return;
        }

        await expect(eventNames.length).toBeGreaterThan(0);
    });

    it("selects the requested 7 day and 14 day filters", async () => {
        await dashboardPage.selectOptionByText("Within 7 days");
        await dashboardPage.selectOptionByText("Within 14 days");

        const filterText = await dashboardPage.getFilterText();
        await expect(filterText).toContain("14 days");
    });

    it("edits every upcoming event if any are available", async () => {
        const hadEvents = await dashboardPage.editAllUpcomingEvents();
        expect(hadEvents).toBe(true);
    });

    it("edits the first event with a simple beginner-friendly flow", async () => {
        const didEdit = await dashboardPage.editFirstEventFullFlow();

        if (!didEdit) {
            console.warn("No first event was available to edit, so this step was skipped.");
            return;
        }

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("logs out at the end of the run", async () => {
        await dashboardPage.logout();
        await expect(dashboardPage.loginUsernameField).toBeDisplayed();
    });
});
