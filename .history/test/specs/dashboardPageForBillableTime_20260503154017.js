import { expect } from "@wdio/globals";
import dashboardBillableTimePage from "../pageobjects/dashboardBillableTime.js";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

const QUICK_INSIGHTS_TIME_SPANS = ["This Month", "Last 3 Months", "Last 6 Months"];
const QUICK_INSIGHTS_VIEWS = ["My Time", "All Users Time"];

describe("Dashboard Billable Time Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("should load the billable time section on the dashboard", async () => {
        await dashboardBillableTimePage.waitForBillableTimeSection();
        await expect(dashboardBillableTimePage.billableTimeSection).toBeDisplayed();
    });

    it("should validate every Quick Insights time-span and view combination", async () => {
        await dashboardBillableTimePage.waitForBillableTimeSection();

        for (const timeSpan of QUICK_INSIGHTS_TIME_SPANS) {
            await dashboardBillableTimePage.selectTimePeriod(timeSpan);

            for (const view of QUICK_INSIGHTS_VIEWS) {
                await dashboardBillableTimePage.selectView(view);
                await dashboardBillableTimePage.pauseForVisualGraphChange();

                await expect(dashboardBillableTimePage.timePeriodDropdown).toHaveText(expect.stringContaining(timeSpan));
                await expect(dashboardBillableTimePage.viewDropdown).toHaveText(expect.stringContaining(view));
            }
        }
    });
});
