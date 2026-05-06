import { DASHBOARD_DEFAULT_FILTER, dashboardFilterRegressionMatrix } from "../data/dashboardFilterMatrix.js";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Filters Regression", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await dashboardPage.resetUpcomingEventFilter(DASHBOARD_DEFAULT_FILTER);
    });

    beforeEach(async () => {
        await dashboardPage.waitForDashboard();
    });

    for (const scenario of dashboardFilterRegressionMatrix) {
        it(scenario.name, async () => {
            const baselineCount = await dashboardPage.countVisibleUpcomingEvents();
            await dashboardPage.runDashboardFilterScenario(scenario, { baselineCount });
        });
    }

    after(async () => {
        await dashboardPage.logout();
    });
});