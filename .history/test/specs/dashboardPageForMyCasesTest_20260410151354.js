import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardMyCasesPage from "../pageobjects/dashboardMyCases.js";
import loginHelper from "../utils/loginHelper.js";

const CASE_SEARCH_TERMS = [
    "John doe",
    "Jane doe",
    "Mickey Mouse",
    "CASE No. 006",
    "Thanos",
    "EVERYONE v NO ONE",
    "Squarepants v Krabs",
    "Black Widow",
    "EDNA MAE VAVOOM v. HAROLD HAL P. BOTTOM",
    "AUTOTEST Create Min 2026-04-01 19:35:39",
    "AUTOTEST Create All Fields 2026-04-01 19:35:39",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "' OR '1'='1",
    "AUTOTEST Create Min 2026-04-01 20:32:58",
    "AUTOTEST Create All Fields 2026-04-01 20:32:58",
    "Karen's Cat vs. The Entire Neighborhood",
    "asdfasdf",
    "Schmuck v. United States",
    "Gannondorf",
    "Shy Guy",
    "Pipu",
    "dfsdsdf",
    "Luigi"
];

const ASSIGN_CASE_USERS = [
    "Rhonda Lea",
    "ISRAEL AQUILA",
    "JENNIFER APPLETON",
    "KEON ASUAO",
    "CRAIG BAILIE",
    "MICHAEL BECKSTRAND",
    "CONNDER BOWDEN",
    "KALEB CARPENTER",
    "CAMERON EDMUNDS",
    "GABRIEL ERMISZ",
    "DILLON FULLER",
    "CAMILA GALLEGOS",
    "Cody Higgins",
    "General QA Login",
    "OWEN SHAW",
    "JOSHUA WORKMAN",
    "Samuel Ripplinger",
    "Bryce Holloway"
];

// My Cases card tests with real selectors from Fluent UI DataGrid and Create Case form.
describe("Dashboard My Cases Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    after(async () => {
        await dashboardPage.logout();
    });

    // =============================
    // SECTION & DISPLAY TESTS
    // =============================

    describe("My Cases Section Display", () => {
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

        it("should display the search info button", async () => {
            await dashboardMyCasesPage.waitForMyCasesSection();
            await expect(dashboardMyCasesPage.searchInfoButton).toBeDisplayed();
        });

        it("should display the Create Case button", async () => {
            await dashboardMyCasesPage.waitForMyCasesSection();
            await expect(dashboardMyCasesPage.createCaseButton).toBeDisplayed();
        });

        it("should display the case list table", async () => {
            await dashboardMyCasesPage.waitForCaseTable();
            await expect(dashboardMyCasesPage.caseTable).toBeDisplayed();
        });
    });

    // =============================
    // SEARCH TESTS
    // =============================

    describe("Search Functionality", () => {
        it("should search for all provided case names", async () => {
            for (const caseName of CASE_SEARCH_TERMS) {
                await dashboardMyCasesPage.searchCases(caseName);
                await dashboardMyCasesPage.waitForCaseTable();
                const tableVisible = await dashboardMyCasesPage.isCaseTableVisible();
                const emptyVisible = await dashboardMyCasesPage.isEmptyStateVisible();
                expect(tableVisible || emptyVisible).toBe(true);
            }
        });

        it("should handle random gibberish search - should return no results", async () => {
            await dashboardMyCasesPage.searchCases("fsdfidsfsdsjkdsajklkjlf9258942");
            await dashboardMyCasesPage.waitForCaseTable();
            const emptyVisible = await dashboardMyCasesPage.isEmptyStateVisible();
            expect(emptyVisible).toBe(true);
        });

        it("should click the search info button and display information", async () => {
            await dashboardMyCasesPage.clickSearchInfoButton();
            await browser.pause(500);
        });

        it("should clear search and display all cases again", async () => {
            await dashboardMyCasesPage.searchCases("");
            await dashboardMyCasesPage.waitForCaseTable();
            const tableVisible = await dashboardMyCasesPage.isCaseTableVisible();
            const emptyVisible = await dashboardMyCasesPage.isEmptyStateVisible();
            expect(tableVisible || emptyVisible).toBe(true);
        });
    });

    // =============================
    // CREATE CASE FLOW TESTS
    // =============================

    describe("Create Case Button & Modal", () => {
        it("should click Create Case button and open modal", async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
            await expect(dashboardMyCasesPage.createCaseModal).toBeDisplayed();
        });
    });

    describe("Apply Template Selection", () => {
        before(async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
        });

        it("should select 'Pikachu' template", async () => {
            await dashboardMyCasesPage.selectTemplate("Pikachu");
            await browser.pause(500);
        });

        it("should click Create Case button again to test next template", async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
        });

        it("should select 'You're the Best Around' template", async () => {
            await dashboardMyCasesPage.selectTemplate("You're the Best Around");
            await browser.pause(500);
        });

        it("should click Create Case button again to test third template", async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
        });

        it("should select 'You're the Best Around-Copy' template", async () => {
            await dashboardMyCasesPage.selectTemplate("You're the Best Around-Copy");
            await browser.pause(500);
        });
    });

    // =============================
    // CASE INFO FORM TESTS
    // =============================

    describe("Case Information Form", () => {
        before(async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
        });

        it("should enter case name", async () => {
            await dashboardMyCasesPage.enterCaseName("dfsdsdf");
            await expect(dashboardMyCasesPage.caseNameInput).toHaveValue(/.+/);
        });

        it("should select retained date - May 23", async () => {
            await dashboardMyCasesPage.selectRetainedDate("May", "23");
            await browser.pause(500);
        });

        it("should select case type - 'Class Action'", async () => {
            await dashboardMyCasesPage.selectCaseType("Class Action");
            await browser.pause(300);
        });

        it("should select case type - 'a'", async () => {
            await dashboardMyCasesPage.selectCaseType("a");
            await browser.pause(300);
        });

        it("should select case type - 'Samsonite'", async () => {
            await dashboardMyCasesPage.selectCaseType("Samsonite");
            await browser.pause(300);
        });

        it("should select case type - 'Uncivil Litigation'", async () => {
            await dashboardMyCasesPage.selectCaseType("Uncivil Litigation");
            await browser.pause(300);
        });

        it("should toggle fixed fee billing switch", async () => {
            await dashboardMyCasesPage.toggleFixedFeeSwitch();
            await browser.pause(300);
        });

        it("should enter fixed fee amount - '1000000'", async () => {
            await dashboardMyCasesPage.enterFixedFeeAmount("1000000");
            await browser.pause(300);
        });

        it("should enter description", async () => {
            const description = "This is a test case for automated testing of the Create Case form.";
            await dashboardMyCasesPage.enterDescription(description);
            await browser.pause(300);
        });

        it("should enter overview field with random gibberish", async () => {
            await dashboardMyCasesPage.enterOverview("fslsdkfsdlskfjkldsjkldj239849423980");
            await browser.pause(300);
        });
    });

    // =============================
    // NOTES & EVENTS FLOW
    // =============================

    describe("Notes and Events Card Flow", () => {
        before(async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
        });

        it("should add note text to Notes card", async () => {
            await dashboardMyCasesPage.addCaseNote("Hey, this is getting quite interesting for these cases.");
            await browser.pause(400);
        });

        it("should create event with May 23 due date and description", async () => {
            await dashboardMyCasesPage.enterEventName("Quagmires birthday to it");
            await dashboardMyCasesPage.selectEventDate("May", "23");
            await dashboardMyCasesPage.toggleEventDueCheckbox();
            await dashboardMyCasesPage.enterEventDescription("Quagmire is suing everyone on his birthday.");
            await dashboardMyCasesPage.saveEvent();
        });

        it("should hover events and open edit, then close", async () => {
            await dashboardMyCasesPage.clickEditEvent();
            await browser.pause(400);
            await dashboardMyCasesPage.closeEventEditor();
            await browser.pause(400);
        });

        it("should click trash and cancel delete with No", async () => {
            await dashboardMyCasesPage.clickDeleteEvent();
            await browser.pause(300);
            await dashboardMyCasesPage.cancelDeleteEvent();
            await browser.pause(400);
        });

        it("should click trash again and confirm delete with Yes", async () => {
            await dashboardMyCasesPage.clickDeleteEvent();
            await browser.pause(300);
            await dashboardMyCasesPage.confirmDeleteEvent();
            await browser.pause(500);
        });

        it("should run Apply Template refresh sequence for immediate page update", async () => {
            await dashboardMyCasesPage.runTemplateRefreshSequence();
        });

        it("should go back to dashboard with browser back, logout, login, and continue", async () => {
            await dashboardMyCasesPage.closeOpenDialogs();
            await dashboardMyCasesPage.ensureEventDialogClosed();
            await dashboardMyCasesPage.goBackToDashboardWithBrowserBack();
            await dashboardPage.waitForDashboard();

            await dashboardPage.logout();
            await loginHelper.loginAsDefaultUser();
            await dashboardPage.waitForDashboard();
        });
    });

    // =============================
    // RETAINED BY / PARTY TESTS
    // =============================

    describe("Retained By (Party) Selection", () => {
        before(async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
        });

        it("should click the info button for the Retained By field", async () => {
            await dashboardMyCasesPage.clickRetainedByInfoButton();
        });

        it("should select 'Somebody Else' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("Somebody Else");
            await dashboardMyCasesPage.clickAddContactButton();
            await dashboardMyCasesPage.closeAddContactModal();
            await browser.pause(500);
        });

        it("should select 'Quagmire Giggity' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("Quagmire Giggity");
            await dashboardMyCasesPage.clickAddContactButton();
            await dashboardMyCasesPage.closeAddContactModal();
            await browser.pause(500);
        });

        it("should select 'EVERYONE LLC' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("EVERYONE LLC");
            await dashboardMyCasesPage.clickAddContactButton();
            await dashboardMyCasesPage.closeAddContactModal();
            await browser.pause(500);
        });

        it("should select 'NO ONE Corps' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("NO ONE Corps");
            await dashboardMyCasesPage.clickAddContactButton();
            await dashboardMyCasesPage.closeAddContactModal();
            await browser.pause(500);
        });

        it("should select first 'AUTOTEST Client' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("AUTOTEST Client");
            await dashboardMyCasesPage.clickAddContactButton();
            await dashboardMyCasesPage.closeAddContactModal();
            await browser.pause(500);
        });

        it("should select second 'AUTOTEST Client' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("AUTOTEST Client");
            await dashboardMyCasesPage.clickAddContactButton();
            await dashboardMyCasesPage.closeAddContactModal();
            await browser.pause(500);
        });

        it("should select 'cameron' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("cameron");
            await dashboardMyCasesPage.clickAddContactButton();
            await dashboardMyCasesPage.closeAddContactModal();
            await browser.pause(500);
        });
    });

    // =============================
    // STATUS SELECTION TESTS
    // =============================

    describe("Status Dropdown Selection", () => {
        before(async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
        });

        it("should click the info button for the Status field", async () => {
            await dashboardMyCasesPage.clickStatusInfoButton();
        });
    });

    // =============================
    // ASSIGN TO / USER SELECTION TESTS
    // =============================

    describe("Assign To Users", () => {
        before(async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
        });

        it("should click Assign Case button to open user selection dialog", async () => {
            await dashboardMyCasesPage.clickAssignCaseButton();
            await browser.pause(500);
        });

        it("should select all possible users in the dialog", async () => {
            await dashboardMyCasesPage.selectAllAssignableUsers();
            await browser.pause(300);
        });

        it("should click Select Users button to confirm selection", async () => {
            await dashboardMyCasesPage.clickSelectUsersButton();
            await browser.pause(500);
        });

        it("should click Assign Case button again and then cancel", async () => {
            await dashboardMyCasesPage.clickAssignCaseButton();
            await dashboardMyCasesPage.clickCancelUsersButton();
            await browser.pause(500);
        });
    });

    // =============================
    // AFFILIATED PARTY TESTS
    // =============================

    describe("Add Affiliated Party", () => {
        before(async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
        });

        it("should click Add Affiliated Party button", async () => {
            await dashboardMyCasesPage.clickAddAffiliatedPartyButton();
            await browser.pause(500);
        });

        it("should select all possible affiliated parties in the dialog", async () => {
            await dashboardMyCasesPage.selectAllAffiliatedParties();
            await browser.pause(300);
        });

        it("should click Submit Affiliated Party button", async () => {
            await dashboardMyCasesPage.clickSubmitAffiliatedPartyButton();
            await browser.pause(500);
        });

        it("should click Add Affiliated Party again and then cancel", async () => {
            await dashboardMyCasesPage.clickAddAffiliatedPartyButton();
            await dashboardMyCasesPage.clickCancelAffiliatedPartyButton();
            await browser.pause(500);
        });

        it("should click Add Affiliated Party and then select Add Party button", async () => {
            await dashboardMyCasesPage.clickAddAffiliatedPartyButton();
            await dashboardMyCasesPage.clickAddNewPartyButton();
            await browser.pause(500);
        });
    });

    // =============================
    // CREATE NEW PARTY / CLIENT FORM
    // =============================

    describe("Create New Party / Client", () => {
        before(async () => {
            await dashboardMyCasesPage.ensureCreateNewPartyDialogOpen();
        });

        it("should fill in party name", async () => {
            await dashboardMyCasesPage.fillPartyName("Test Party Inc");
            await browser.pause(300);
        });

        it("should fill in party address", async () => {
            await dashboardMyCasesPage.fillPartyAddress("123 Main Street");
            await browser.pause(300);
        });

        it("should fill in party address 2", async () => {
            await dashboardMyCasesPage.fillPartyAddress2("Suite 100");
            await browser.pause(300);
        });

        it("should fill in party city", async () => {
            await dashboardMyCasesPage.fillPartyCity("Test City");
            await browser.pause(300);
        });

        it("should fill in party state", async () => {
            await dashboardMyCasesPage.fillPartyState("UT");
            await browser.pause(300);
        });

        it("should fill in party zip", async () => {
            await dashboardMyCasesPage.fillPartyZip("84111");
            await browser.pause(300);
        });

        it("should fill in party URL", async () => {
            await dashboardMyCasesPage.fillPartyUrl("https://example.com");
            await browser.pause(300);
        });

        it("should click Add Phone Number button", async () => {
            await dashboardMyCasesPage.clickAddPhoneNumberButton();
            await browser.pause(500);
        });
    });

    // =============================
    // PHONE NUMBER MANAGEMENT
    // =============================

    describe("Phone Number Management", () => {
        before(async () => {
            await dashboardMyCasesPage.ensureCreateNewPartyDialogOpen();
            await dashboardMyCasesPage.ensurePhoneDialogOpen();
        });

        it("should toggle primary phone switch", async () => {
            await dashboardMyCasesPage.togglePhonePrimary();
            await browser.pause(300);
        });

        it("should enter phone number", async () => {
            await dashboardMyCasesPage.enterPhoneNumber("8015559999");
            await browser.pause(300);
        });

        it("should select phone type - 'Cell'", async () => {
            await dashboardMyCasesPage.selectPhoneType("Cell");
            await browser.pause(300);
        });

        it("should click Submit Phone button", async () => {
            await dashboardMyCasesPage.clickSubmitPhoneButton();
            await browser.pause(500);
        });

        it("should click Add Phone Number again and then cancel", async () => {
            await dashboardMyCasesPage.clickAddPhoneNumberButton();
            await dashboardMyCasesPage.clickCancelPhoneButton();
            await browser.pause(500);
        });

        it("should click Add Phone Number again and select 'Office' type", async () => {
            await dashboardMyCasesPage.clickAddPhoneNumberButton();
            await dashboardMyCasesPage.enterPhoneNumber("8015551234");
            await dashboardMyCasesPage.selectPhoneType("Office");
            await dashboardMyCasesPage.clickSubmitPhoneButton();
            await browser.pause(500);
        });

        it("should click Add Phone Number again and select 'Other' type", async () => {
            await dashboardMyCasesPage.clickAddPhoneNumberButton();
            await dashboardMyCasesPage.enterPhoneNumber("8015557890");
            await dashboardMyCasesPage.selectPhoneType("Other");
            await dashboardMyCasesPage.clickSubmitPhoneButton();
            await browser.pause(500);
        });
    });
});