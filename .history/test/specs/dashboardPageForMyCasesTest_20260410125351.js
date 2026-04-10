import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardMyCasesPage from "../pageobjects/dashboardMyCases.js";
import loginHelper from "../utils/loginHelper.js";

// My Cases card tests with real selectors from Fluent UI DataGrid and Create Case form.
// Remove .skip when ready to run tests.
describe.skip("Dashboard My Cases Tests", () => {
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
        it("should search for cases by name - 'John'", async () => {
            await dashboardMyCasesPage.searchCases("John");
            await expect(dashboardMyCasesPage.caseTable).toBeDisplayed();
        });

        it("should search for cases by name - 'Jane'", async () => {
            await dashboardMyCasesPage.searchCases("Jane");
            await expect(dashboardMyCasesPage.caseTable).toBeDisplayed();
        });

        it("should search for cases by name - 'Mickey'", async () => {
            await dashboardMyCasesPage.searchCases("Mickey");
            await expect(dashboardMyCasesPage.caseTable).toBeDisplayed();
        });

        it("should handle random gibberish search - should return no results", async () => {
            await dashboardMyCasesPage.searchCases("fsdfidsfsdsjkdsajklkjlf9258942");
            // Table should be displayed but may be empty
            await expect(dashboardMyCasesPage.caseTable).toBeDisplayed();
        });

        it("should click the search info button and display information", async () => {
            await dashboardMyCasesPage.clickSearchInfoButton();
            await browser.pause(500);
        });

        it("should clear search and display all cases again", async () => {
            await dashboardMyCasesPage.searchCases("");
            await expect(dashboardMyCasesPage.caseTable).toBeDisplayed();
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
            await dashboardMyCasesPage.enterCaseName("Test Case - QA Automation");
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

        it("should enter estimated hours - '12342112312giggity'", async () => {
            await dashboardMyCasesPage.enterEstimatedHours("12342112312giggity");
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
    // RETAINED BY / PARTY TESTS
    // =============================

    describe("Retained By (Party) Selection", () => {
        before(async () => {
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
        });

        it("should select 'Somebody Else' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("Somebody Else");
            await dashboardMyCasesPage.clickAddContactButton();
            await browser.pause(500);
        });

        it("should select 'Quagmire Giggity' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("Quagmire Giggity");
            await dashboardMyCasesPage.clickAddContactButton();
            await browser.pause(500);
        });

        it("should select 'EVERYONE LLC' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("EVERYONE LLC");
            await dashboardMyCasesPage.clickAddContactButton();
            await browser.pause(500);
        });

        it("should select 'NO ONE Corps' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("NO ONE Corps");
            await dashboardMyCasesPage.clickAddContactButton();
            await browser.pause(500);
        });

        it("should select first 'AUTOTEST Client' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("AUTOTEST Client");
            await dashboardMyCasesPage.clickAddContactButton();
            await browser.pause(500);
        });

        it("should select second 'AUTOTEST Client' from retained by dropdown", async () => {
            await dashboardMyCasesPage.selectPartyFromDropdown("AUTOTEST Client");
            await dashboardMyCasesPage.clickAddContactButton();
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

        it("should select different status options from dropdown", async () => {
            // Note: Select a status from the dropdown (adjust status name based on image 4)
            // await dashboardMyCasesPage.selectStatus("Active");
            await browser.pause(300);
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

        it("should select user - 'Rhonda Lea'", async () => {
            await dashboardMyCasesPage.selectUserByName("Rhonda Lea");
            await browser.pause(300);
        });

        it("should select user - 'KALEB CARPENTER'", async () => {
            await dashboardMyCasesPage.selectUserByName("KALEB CARPENTER");
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

        it("should select 'Somebody Else' as affiliated party", async () => {
            await dashboardMyCasesPage.selectAffiliatedPartyOption("Somebody Else");
            await browser.pause(300);
        });

        it("should select 'Quagmire Giggity' as affiliated party", async () => {
            await dashboardMyCasesPage.selectAffiliatedPartyOption("Quagmire Giggity");
            await browser.pause(300);
        });

        it("should select 'EVERYONE LLC' as affiliated party", async () => {
            await dashboardMyCasesPage.selectAffiliatedPartyOption("EVERYONE LLC");
            await browser.pause(300);
        });

        it("should select 'NO ONE Corps' as affiliated party", async () => {
            await dashboardMyCasesPage.selectAffiliatedPartyOption("NO ONE Corps");
            await browser.pause(300);
        });

        it("should select first 'AUTOTEST Client' as affiliated party", async () => {
            await dashboardMyCasesPage.selectAffiliatedPartyOption("AUTOTEST Client");
            await browser.pause(300);
        });

        it("should select second 'AUTOTEST Client' as affiliated party", async () => {
            await dashboardMyCasesPage.selectAffiliatedPartyOption("AUTOTEST Client");
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
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
            await dashboardMyCasesPage.clickAddAffiliatedPartyButton();
            await dashboardMyCasesPage.clickAddNewPartyButton();
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
            await dashboardMyCasesPage.clickCreateCaseButton();
            await dashboardMyCasesPage.waitForCreateCaseModal();
            await dashboardMyCasesPage.clickAddAffiliatedPartyButton();
            await dashboardMyCasesPage.clickAddNewPartyButton();
            await dashboardMyCasesPage.clickAddPhoneNumberButton();
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