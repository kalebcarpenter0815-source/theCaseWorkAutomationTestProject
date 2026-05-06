import { expect } from "@wdio/globals";
import dashboardBillableTimePage from "../pageobjects/dashboardBillableTime.js";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Billable Time Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("should load the billable time section on the dashboard", async () => {
        await dashboardBillableTimePage.waitForBillableTimeSection();
        await expect(dashboardBillableTimePage.billableTimeSection).toBeDisplayed();
    });

    it("should cycle time periods and view options in order", async () => {
        await dashboardBillableTimePage.waitForBillableTimeSection();
        await dashboardBillableTimePage.cycleBillableTimeAndViewOptions();

        await expect(dashboardBillableTimePage.timePeriodDropdown).toHaveText(expect.stringContaining("Last 6 Months"));
        await expect(dashboardBillableTimePage.viewDropdown).toHaveText(expect.stringContaining("All Users Time"));
    });
});
