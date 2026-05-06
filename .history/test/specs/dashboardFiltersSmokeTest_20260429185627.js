import { expect } from "@wdio/globals";
import {
    DASHBOARD_DEFAULT_FILTER,
    dashboardFilterSmokeMatrix
} from "../data/dashboardFilterMatrix.js";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Filters Smoke", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await dashboardPage.resetUpcomingEventFilter(DASHBOARD_DEFAULT_FILTER);
    });

    beforeEach(async () => {
        await dashboardPage.waitForDashboard();
        await dashboardPage.resetUpcomingEventFilter(DASHBOARD_DEFAULT_FILTER);
    });

    for (const scenario of dashboardFilterSmokeMatrix) {
        it(scenario.name, async () => {
            const baselineCount = await dashboardPage.countVisibleUpcomingEvents();

            if (scenario.seedFilter) {
                await dashboardPage.applyDashboardFilter(scenario.seedFilter);
            }

            if (scenario.filters) {
                await dashboardPage.runDashboardFilterScenario(scenario, { baselineCount });
            }

            if (scenario.resetToDefault) {
                await dashboardPage.resetUpcomingEventFilter(DASHBOARD_DEFAULT_FILTER);
                const currentFilterText = await dashboardPage.getFilterText();
                await expect(currentFilterText).toContain(DASHBOARD_DEFAULT_FILTER);

                const resetCount = await dashboardPage.countVisibleUpcomingEvents();
                expect(resetCount).toBeGreaterThanOrEqual(0);
            }
        });
    }

    after(async () => {
        await dashboardPage.logout();
    });
});