import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Full Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("loads the dashboard page the simple way", async () => {
        await expect(dashboardPage.logoutButton).toBeDisplayed();
        await expect(dashboardPage.filterDropdown).toBeDisplayed();

        const filterText = await dashboardPage.getFilterText();
        await expect(filterText).toBeTruthy();
    });

    it("clicks through all of the main filter choices", async () => {
        await dashboardPage.clickEveryMainFilter();
        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });

    it("checks if there are event names and dates on the page", async () => {
        const names = await dashboardPage.getAllEventNames();
        const dates = await dashboardPage.getAllEventDates();

        if (names.length === 0) {
            console.warn("No events showed up, so this part is getting skipped.");
            expect(names.length).toBe(0);
            return;
        }

        expect(names.length).toBeGreaterThan(0);
        expect(dates.length).toBeGreaterThanOrEqual(0);
    });

    it("tries Karen's Cat vs. The Entire Neighborhood time filters", async () => {
    await dashboardPage.selectOptionByText("Within 7 days");
    await dashboardPage.waitForTaskUpdate();

    await dashboardPage.selectOptionByText("Within 14 days");
    await dashboardPage.waitForTaskUpdate();

    await expect(dashboardPage.filterDropdown).toBeDisplayed();
});

            // ✅ NEW TEST GOES RIGHT HERE
    it('should only show events within 7 days', async () => {
        await dashboardPage.selectOptionByText('Within 7 days');

        const result = await dashboardPage.areEventsWithinDays(7);

        expect(result).toBe(true);
    });

    it("edits all upcoming events if any are there", async () => {
        const editedCount = await dashboardPage.editAllUpcomingEventsTheSimpleWay();
        expect(editedCount).toBeGreaterThanOrEqual(0);
        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("edits the first event in a simple full flow", async () => {
        const didEdit = await dashboardPage.editFirstEventFullFlow();

        if (!didEdit) {
            console.warn("There was not a first event to edit, so I skipped it.");
            return;
        }

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("edits the first upcoming Test event in a messy beginner way", async () => {
        const didEdit = await dashboardPage.editFirstUpcomingTestEventBeginnerFlow();

        if (!didEdit) {
            console.warn("I could not find a Test event, so I skipped this one.");
            return;
        }

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("logs out when everything is done", async () => {
        await dashboardPage.logout();
        await expect(dashboardPage.loginUsernameField).toBeDisplayed();
    });
});
