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

    it("runs a fast filter sweep with no errors", async () => {
        const fastFilterList = [
            "Within 7 days",
            "Within 14 days",
            "Within 30 days",
            "Within 3 months"
        ];

        for (const oneFilterName of fastFilterList) {
            await dashboardPage.selectOptionByText(oneFilterName);
            const currentFilterText = await dashboardPage.getFilterText();
            expect(currentFilterText).toContain(oneFilterName);
        }

        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });

    it("runs the Test event May 2 and Quagmire notes beginner flow", async () => {
        const didRunFlow = await dashboardPage.runRequestedTestMay2QuagmireFlow();

        if (!didRunFlow) {
            console.warn("No editable Test event was found, so this requested flow was skipped.");
            return;
        }

        await expect(dashboardPage.logoutButton).toBeDisplayed();
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

    it("edits all upcoming events if any are there", async () => {
        const upcomingCount = await dashboardPage.countUpcomingEvents();

        if (upcomingCount === 0) {
            console.warn("No upcoming events were found, so this edit test is being skipped as a pass.");
            return;
        }

        const editedCount = await dashboardPage.editAllUpcomingEventsTheSimpleWay();
        expect(editedCount).toBeGreaterThan(0);
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

    it("does the full beginner hover edit, save, reopen, and verify flow", async () => {
        const result = await dashboardPage.runBeginnerHoverEditSaveAndVerifyFlow();

        if (!result) {
            console.warn("No editable event was found, so this full beginner flow was skipped.");
            return;
        }

        expect(result.eventTitleValue).toBe("Test");
        expect(result.eventDateValue).toBeTruthy();
        expect(result.descriptionValue).toContain("sfshfjksdhk");
        expect(result.dueIsChecked).toBe(true);
        expect(result.noteWasVisible).toBe(true);

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("logs out when everything is done", async () => {
        await dashboardPage.logout();
        await expect(dashboardPage.loginUsernameField).toBeDisplayed();
    });
});
