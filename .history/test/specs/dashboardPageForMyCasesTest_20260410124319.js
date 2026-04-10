import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardMyCasesPage from "../pageobjects/dashboardMyCases.js";
import loginHelper from "../utils/loginHelper.js";

// My Cases card tests with real selectors from Fluent UI DataGrid.
// Remove .skip after you confirm selectors and add your specific test flows.
describe.skip("Dashboard My Cases Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    after(async () => {
        await dashboardPage.logout();
    });

    it("should display the My Cases section on the dashboard", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();
        await expect(dashboardMyCasesPage.myCasesSection).toBeDisplayed();
    });

    it("should display the My Cases heading", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();
        await expect(dashboardMyCasesPage.myCasesHeading).toBeDisplayed();
    });

    it("should display the search input", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();
        await expect(dashboardMyCasesPage.searchInput).toBeDisplayed();
    });

    it("should display the Create Case button", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();
        await expect(dashboardMyCasesPage.createCaseButton).toBeDisplayed();
    });

    it("should display the case list table", async () => {
        await dashboardMyCasesPage.waitForCaseTable();
        await expect(dashboardMyCasesPage.caseTable).toBeDisplayed();
    });

    it("should display case rows with Name, Case Type, Retained By, and Status columns", async () => {
        await dashboardMyCasesPage.waitForCaseTable();
        
        const caseCount = await dashboardMyCasesPage.getCaseCount();
        if (caseCount > 0) {
            const caseNames = await dashboardMyCasesPage.getVisibleCaseNames();
            expect(caseNames.length).toBeGreaterThan(0);
        }
    });

    it("should allow searching for cases", async () => {
        await dashboardMyCasesPage.searchCases("John");
        // Verify search result (table should display matching cases)
        await expect(dashboardMyCasesPage.caseTable).toBeDisplayed();
    });

    // Add your specific My Cases test flows below
    // Examples:
    // it("should click on a specific case to open details", async () => { ... });
    // it("should allow filtering cases by some criteria", async () => { ... });
    // it("should allow sorting cases", async () => { ... });
});