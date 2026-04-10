import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardMyCasesPage from "../pageobjects/dashboardMyCases.js";
import loginHelper from "../utils/loginHelper.js";

// Starter scaffold for the My Cases card.
// Remove .skip after you confirm the selectors against the real UI.
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

    it("should display the Case dropdown if that control exists", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();
        await expect(dashboardMyCasesPage.caseDropdown).toBeDisplayed();
    });

    it("should display the Sort dropdown if that control exists", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();
        await expect(dashboardMyCasesPage.sortDropdown).toBeDisplayed();
    });

    it("should open the Case dropdown and show options", async () => {
        await dashboardMyCasesPage.openCaseDropdown();
        const options = await dashboardMyCasesPage.caseDropdownOptions;
        expect(options.length).toBeGreaterThan(0);
    });

    it("should open the Sort dropdown and show options", async () => {
        await dashboardMyCasesPage.openSortDropdown();
        const options = await dashboardMyCasesPage.sortDropdownOptions;
        expect(options.length).toBeGreaterThan(0);
    });

    it("should check the My Cases card content or empty state", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();

        const rows = await dashboardMyCasesPage.caseRows;
        if (rows.length === 0) {
            await expect(dashboardMyCasesPage.emptyStateMessage).toBeDisplayed();
            return;
        }

        const firstRow = rows[0];
        await expect(firstRow).toBeDisplayed();

        const titleEl = await dashboardMyCasesPage.getCaseTitle(firstRow);
        const numberEl = await dashboardMyCasesPage.getCaseNumber(firstRow);
        const statusEl = await dashboardMyCasesPage.getCaseStatus(firstRow);
        const ownerEl = await dashboardMyCasesPage.getCaseOwner(firstRow);
        const updatedDateEl = await dashboardMyCasesPage.getCaseUpdatedDate(firstRow);

        if (await titleEl.isExisting()) {
            await expect(titleEl).toBeDisplayed();
        }

        if (await numberEl.isExisting()) {
            await expect(numberEl).toBeDisplayed();
        }

        if (await statusEl.isExisting()) {
            await expect(statusEl).toBeDisplayed();
        }

        if (await ownerEl.isExisting()) {
            await expect(ownerEl).toBeDisplayed();
        }

        if (await updatedDateEl.isExisting()) {
            await expect(updatedDateEl).toBeDisplayed();
        }
    });

    it("should let you add real My Cases filter and sort tests later", async () => {
        // Example starter lines for later use:
        // await dashboardMyCasesPage.selectCaseDropdownOption("All Cases");
        // await dashboardMyCasesPage.selectSortOption("Created - Ascending");
    });
});