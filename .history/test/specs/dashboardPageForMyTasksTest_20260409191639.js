import { expect } from "@wdio/globals";
import dashboardMyTasksPage from "../pageobjects/dashboardMyTasks.js";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard My Tasks Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    after(async () => {
        await dashboardPage.logout();
    });

    // =============================
    // MY TASKS SECTION
    // =============================

    it("should display the My Tasks section on the dashboard", async () => {
        await dashboardMyTasksPage.waitForMyTasksSection();
        await expect(dashboardMyTasksPage.myTasksSection).toBeDisplayed();
    });

    // =============================
    // ADD TASK BUTTON
    // =============================

    it("should display the Add Task button", async () => {
        await expect(dashboardMyTasksPage.addTaskButton).toBeDisplayed();
    });

    // =============================
    // CASE DROPDOWN
    // =============================

    it("should display the Case dropdown", async () => {
        await expect(dashboardMyTasksPage.caseDropdown).toBeDisplayed();
    });

    it("should open the Case dropdown and show options", async () => {
        await dashboardMyTasksPage.openCaseDropdown();
        const options = await dashboardMyTasksPage.caseDropdownOptions;
        expect(options.length).toBeGreaterThan(0);

        const allCasesOption = dashboardMyTasksPage.getCaseOption("All Cases");
        await expect(allCasesOption).toBeDisplayed();
    });

    // =============================
    // SORT DROPDOWN
    // =============================

    it("should display the Sort dropdown", async () => {
        await expect(dashboardMyTasksPage.sortDropdown).toBeDisplayed();
    });

    it("should open the Sort dropdown and show options", async () => {
        await dashboardMyTasksPage.openSortDropdown();
        const options = await dashboardMyTasksPage.sortDropdownOptions;
        expect(options.length).toBeGreaterThanOrEqual(4);

        await expect(dashboardMyTasksPage.getSortOption("Created - Ascending")).toBeDisplayed();
        await expect(dashboardMyTasksPage.getSortOption("Created - Descending")).toBeDisplayed();
        await expect(dashboardMyTasksPage.getSortOption("Due By - Ascending")).toBeDisplayed();
        await expect(dashboardMyTasksPage.getSortOption("Due By - Descending")).toBeDisplayed();
    });

    it("should allow selecting a different Sort option", async () => {
        await dashboardMyTasksPage.selectSortOption("Due By - Ascending");
        await expect(dashboardMyTasksPage.sortDropdown).toHaveAttribute("value", "Due By - Ascending");
    });
});
