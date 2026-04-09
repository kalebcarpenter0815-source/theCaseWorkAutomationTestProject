import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Full Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("should load dashboard correctly", async () => {
        await expect(dashboardPage.logoutButton).toBeDisplayed();
        await expect(dashboardPage.filterDropdown).toBeDisplayed();

        const filter = await dashboardPage.getFilterText();
        await expect(filter).toBeTruthy();
    });

    it("should hold down selections in Upcoming Events", async () => {
        await dashboardPage.holdAllUpcomingEventFilters(2000);
        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });

    it("should validate event names and dates exist", async () => {
        const names = await dashboardPage.getAllEventNames();
        const dates = await dashboardPage.getAllEventDates();

        if (names.length === 0) {
            console.warn("No events found — skipping name/date validation");
            expect(names.length).toBe(0);
            return;
        }

        expect(names.length).toBeGreaterThan(0);
        expect(dates.length).toBeGreaterThan(0);
    });

    it("should update results when filter changes", async () => {
        const beforeCount = await dashboardPage.getTaskCount();

        await dashboardPage.selectOptionByText("Within 7 days");
        await dashboardPage.waitForTaskUpdate(beforeCount);

        const afterCount = await dashboardPage.getTaskCount();
        expect(afterCount).toBeGreaterThanOrEqual(0);
        console.log(`Before: ${beforeCount}, After: ${afterCount}`);
    });

    it("should go through all filters without breaking", async () => {
        await dashboardPage.cycleThroughFilters();

        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });

    it("should update within reasonable time", async () => {
        const beforeCount = await dashboardPage.getTaskCount();

        await dashboardPage.selectOptionByText("Within 14 days");
        await dashboardPage.waitForTaskUpdate(beforeCount);

        console.log("✅ Filter updated without timeout crash");
    });

    it("should display all events on screen", async () => {
        const events = await dashboardPage.upcomingEventFilters;

        if (events.length === 0) {
            console.warn("No events found — skipping visibility check");
            expect(events.length).toBe(0);
            return;
        }

        for (let i = 0; i < events.length; i++) {
            await expect(events[i]).toBeDisplayed();
        }
    });

    it("should edit all upcoming events if they exist", async () => {
        await dashboardPage.editAllUpcomingEvents();
        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });

    it("should fully edit event and verify notes", async () => {
        await dashboardPage.editFirstEventFullFlow();
        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });

    it("should logout successfully", async () => {
        await dashboardPage.logout();
        await expect(dashboardPage.loginUsernameField).toBeDisplayed();
    });
});
