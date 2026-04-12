import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardClientsThirdPartiesPage from "../pageobjects/dashboardClientsThirdParties.js";
import loginHelper from "../utils/loginHelper.js";

const CLIENT_SEARCH_TERMS = [
    "Somebody Else",
    "Quagmire",
    "EVERYONE",
    "NO ONE",
    "AUTOTEST",
    "cameron",
    "not-a-real-client-zzzz-123456"
];

// Tests for the Clients / 3rd Parties sidebar page and the Edit client page
describe("Dashboard Clients / 3rd Parties Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await dashboardClientsThirdPartiesPage.openClientsThirdPartiesFromSidebar();
    });

    after(async () => {
        await dashboardPage.logout();
    });

    // =============================
    // SIDEBAR BUTTON & PAGE DISPLAY
    // =============================

    describe("Sidebar Button and Page Display", () => {
        it("should display the sidebar Clients / 3rd Parties button", async () => {
            await dashboardClientsThirdPartiesPage.waitForClientsSidebarButton();
            await expect(dashboardClientsThirdPartiesPage.clientsSidebarButton).toBeDisplayed();
        });

        it("should open and display the Clients / 3rd Parties page", async () => {
            await dashboardClientsThirdPartiesPage.openClientsThirdPartiesFromSidebar();
            await expect(dashboardClientsThirdPartiesPage.pageTitle).toBeDisplayed();
        });

        it("should display the Search label", async () => {
            await dashboardClientsThirdPartiesPage.waitForClientsThirdPartiesPage();
            await expect(dashboardClientsThirdPartiesPage.searchLabel).toBeDisplayed();
        });

        it("should display the Search input", async () => {
            await expect(dashboardClientsThirdPartiesPage.searchInput).toBeDisplayed();
        });

        it("should display the Search info button", async () => {
            await expect(dashboardClientsThirdPartiesPage.searchInfoButton).toBeDisplayed();
        });

        it("should display the Create button", async () => {
            await expect(dashboardClientsThirdPartiesPage.createButton).toBeDisplayed();
        });

        it("should display the Name column header", async () => {
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
            await expect(dashboardClientsThirdPartiesPage.nameColumnHeader).toBeDisplayed();
        });

        it("should display the Address column header", async () => {
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
    });

    // =============================
    // SEARCH FUNCTIONALITY
    // =============================

    describe("Search Functionality", () => {
        it("should search for all provided client names and show results or empty state", async () => {
            for (const term of CLIENT_SEARCH_TERMS) {
                await dashboardClientsThirdPartiesPage.searchForClient(term);
                await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
                await expect(dashboardClientsThirdPartiesPage.pageTitle).toBeDisplayed();
            }
        });

        it("should clear the search and show all clients again", async () => {
            await dashboardClientsThirdPartiesPage.clearSearch();
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
            await expect(dashboardClientsThirdPartiesPage.pageTitle).toBeDisplayed();
        });
    });

    // =============================
    // ROW HOVER & THREE DOT MENU
    // =============================

    describe("Row Hover and Three Dot Menu", () => {
        it("should hover over the 'Somebody Else' client row", async () => {
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
            await dashboardClientsThirdPartiesPage.hoverOverClientRow("Somebody Else");
            await browser.pause(500);
        });

        it("should open the three-dot menu for 'Somebody Else'", async () => {
            await dashboardClientsThirdPartiesPage.openClientsThreeDotMenuByName("Somebody Else");
            await browser.pause(300);
        });

        it("should display the Edit button in the three-dot menu", async () => {
            await expect(dashboardClientsThirdPartiesPage.clientEditButton).toBeDisplayed();
        });

        it("should display the Delete button in the three-dot menu", async () => {
            await expect(dashboardClientsThirdPartiesPage.clientDeleteButton).toBeDisplayed();
        });

        it("should close the three-dot menu by pressing Escape", async () => {
            await browser.keys("Escape");
            await browser.pause(300);
        });
    });

    // =============================
    // DELETE CLIENT - CANCEL FLOW
    // =============================

    describe("Delete Client - Cancel Flow", () => {
        it("should open the three-dot menu and click Delete on 'Somebody Else'", async () => {
            await dashboardClientsThirdPartiesPage.clickDeleteOnClient("Somebody Else");
            await browser.pause(500);
        });

        it("should show a confirmation dialog with a No button", async () => {
            await expect(dashboardClientsThirdPartiesPage.doNotDeleteButtonCard).toBeDisplayed();
        });

        it("should cancel the delete by clicking No", async () => {
            await dashboardClientsThirdPartiesPage.cancelDeleteClient();
            await browser.pause(400);
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        });

        it("should still show the client list page after cancelling the delete", async () => {
            await expect(dashboardClientsThirdPartiesPage.pageTitle).toBeDisplayed();
        });
    });

    // =============================
    // EDIT CLIENT PAGE FLOW
    // =============================

    describe("Edit Client Page Flow", () => {
        it("should open the Edit page for 'Somebody Else' using the three-dot menu", async () => {
            await dashboardClientsThirdPartiesPage.clickEditOnClient("Somebody Else");
            await browser.pause(600);
        });

        it("should display the Edit page heading", async () => {
            await dashboardClientsThirdPartiesPage.waitForEditPage();
            await expect(dashboardClientsThirdPartiesPage.editPageHeading).toBeDisplayed();
        });

        it("should display the breadcrumb link back to Clients/Parties", async () => {
            await expect(dashboardClientsThirdPartiesPage.breadcrumbClientsLink).toBeDisplayed();
        });

        it("should display the Party Name input field", async () => {
            await expect(dashboardClientsThirdPartiesPage.editPartyNameInput).toBeDisplayed();
        });

        it("should display the Url input field", async () => {
            await expect(dashboardClientsThirdPartiesPage.editUrlInput).toBeDisplayed();
        });

        it("should display the Address input field", async () => {
            await expect(dashboardClientsThirdPartiesPage.editAddressInput).toBeDisplayed();
        });

        it("should display the Address 2 input field", async () => {
            await expect(dashboardClientsThirdPartiesPage.editAddress2Input).toBeDisplayed();
        });

        it("should display the City input field", async () => {
            await expect(dashboardClientsThirdPartiesPage.editCityInput).toBeDisplayed();
        });

        it("should display the State input field", async () => {
            await expect(dashboardClientsThirdPartiesPage.editStateInput).toBeDisplayed();
        });

        it("should display the Zip input field", async () => {
            await expect(dashboardClientsThirdPartiesPage.editZipInput).toBeDisplayed();
        });

        it("should display the Phone Numbers section", async () => {
            await expect(dashboardClientsThirdPartiesPage.phoneNumbersSection).toBeDisplayed();
        });

        it("should display the Add Phone Number button", async () => {
            await expect(dashboardClientsThirdPartiesPage.addPhoneButton).toBeDisplayed();
        });

        it("should display the Contacts section", async () => {
            await expect(dashboardClientsThirdPartiesPage.contactsSection).toBeDisplayed();
        });

        it("should display the Add Contact button", async () => {
            await expect(dashboardClientsThirdPartiesPage.addContactButton).toBeDisplayed();
        });

        it("should display the Preview Sizes dropdown", async () => {
            await expect(dashboardClientsThirdPartiesPage.previewSizesDropdown).toBeDisplayed();
        });

        it("should go back to the Clients / 3rd Parties list page using the breadcrumb", async () => {
            await dashboardClientsThirdPartiesPage.goBackToClientsListPage();
            await expect(dashboardClientsThirdPartiesPage.pageTitle).toBeDisplayed();
        });
    });

    // =============================
    // CLIENT ROW CHECKBOX TESTS
    // =============================

    describe("Client Row Checkboxes", () => {
        it("should show checkboxes in the client rows", async () => {
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
            const checkboxes = await dashboardClientsThirdPartiesPage.clientCheckboxBtns;
            if (checkboxes.length > 0) {
                await expect(checkboxes[0]).toBeExisting();
            }
        });

        it("should be able to select the 'Somebody Else' client checkbox", async () => {
            await dashboardClientsThirdPartiesPage.selectClientByName("Somebody Else");
            await browser.pause(300);
        });

        it("should be able to uncheck the 'Somebody Else' client checkbox again", async () => {
            await dashboardClientsThirdPartiesPage.selectClientByName("Somebody Else");
            await browser.pause(300);
        });
    });
});
