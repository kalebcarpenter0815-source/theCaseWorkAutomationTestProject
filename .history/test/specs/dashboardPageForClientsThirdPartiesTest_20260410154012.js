import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardClientsThirdPartiesPage from "../pageobjects/dashboardClientsThirdParties.js";
import loginHelper from "../utils/loginHelper.js";

const CLIENT_SEARCH_TERMS = [
    "AUTOTEST",
    "cameron",
    "not-a-real-client-zzzz-123456"
];

describe("Dashboard Clients / 3rd Parties Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await dashboardClientsThirdPartiesPage.openClientsThirdPartiesFromSidebar();
    });

    after(async () => {
        await dashboardPage.logout();
    });

    it("should display the sidebar Clients / 3rd Parties button", async () => {
        await dashboardClientsThirdPartiesPage.waitForClientsSidebarButton();
        await expect(dashboardClientsThirdPartiesPage.clientsSidebarButton).toBeDisplayed();
    });

    it("should open and display the Clients / 3rd Parties page", async () => {
        await dashboardClientsThirdPartiesPage.openClientsThirdPartiesFromSidebar();
        await expect(dashboardClientsThirdPartiesPage.pageTitle).toBeDisplayed();
    });

    it("should display Search label, Search input, and Create button", async () => {
        await dashboardClientsThirdPartiesPage.waitForClientsThirdPartiesPage();
        await expect(dashboardClientsThirdPartiesPage.searchLabel).toBeDisplayed();
        await expect(dashboardClientsThirdPartiesPage.searchInput).toBeDisplayed();
        await expect(dashboardClientsThirdPartiesPage.createButton).toBeDisplayed();
    });

    it("should display Name and Address column headers", async () => {
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        await expect(dashboardClientsThirdPartiesPage.nameColumnHeader).toBeDisplayed();
        await expect(dashboardClientsThirdPartiesPage.addressColumnHeader).toBeDisplayed();
    });

    it("should show rows with action buttons when data is present", async () => {
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();

        const rowCount = await dashboardClientsThirdPartiesPage.getDataRowCount();

        if (rowCount === 0) {
            const emptyVisible = await dashboardClientsThirdPartiesPage.emptyStateMessage.isDisplayed().catch(() => false);
            expect(emptyVisible).toBe(true);
            return;
        }

        const actionButtons = await dashboardClientsThirdPartiesPage.rowActionButtons;
        expect(actionButtons.length).toBeGreaterThan(0);
    });

    it("should run sidebar page search smoke checks", async () => {
        for (const term of CLIENT_SEARCH_TERMS) {
            await dashboardClientsThirdPartiesPage.searchForClient(term);
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
            await expect(dashboardClientsThirdPartiesPage.pageTitle).toBeDisplayed();
        }

        await dashboardClientsThirdPartiesPage.clearSearch();
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
    });

    it("should expose the Search info button", async () => {
        await dashboardClientsThirdPartiesPage.waitForClientsThirdPartiesPage();
        await expect(dashboardClientsThirdPartiesPage.searchInfoButton).toBeDisplayed();
    });
});
