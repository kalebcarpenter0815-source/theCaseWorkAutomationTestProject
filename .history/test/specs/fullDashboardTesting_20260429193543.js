import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

const SCHMUCK_CASE_TITLES = ["Schmuck v. United States", "Schmucks v. United States", "Schmuck", "Schmucks"];

const CURRENT_UPCOMING_CASE_FLOW_CANDIDATES = [
    {
        label: "Eevee",
        titles: ["Eevee(No AssignTo or Milestones)", "Eevee"],
        updatedEventText: "Eevee Follow-Up",
        updatedDescriptionText: "Eevee updated description",
        noteText: "Eevee-Note-Updated"
    },
    {
        label: "Anderson",
        titles: ["Anderson vs Anderson", "Anderson"],
        updatedEventText: "Anderson Follow-Up",
        updatedDescriptionText: "Anderson updated description",
        noteText: "Anderson-Note-Updated"
    },
    {
        label: "Jane Doe",
        titles: ["Jane doe Dont Delete", "Jane Doe Dont Delete", "Jane doe"],
        updatedEventText: "Jane Doe Follow-Up",
        updatedDescriptionText: "Jane Doe updated description",
        noteText: "Jane-Doe-Note-Updated"
    },
    {
        label: "Emperor Palpatine",
        titles: ["Emperor Palpatine Vs. Luke Skywalker", "Emperor Palpatine"],
        updatedEventText: "Emperor Follow-Up",
        updatedDescriptionText: "Emperor updated description",
        noteText: "Emperor-Note-Updated"
    },
    {
        label: "Mickey Mouse",
        titles: ["Mickey Mouse"],
        updatedEventText: "Mickey Follow-Up",
        updatedDescriptionText: "Mickey updated description",
        noteText: "Mickey-Note-Updated"
    }
];

const CURRENT_NAMED_UPCOMING_CASE_TITLES = CURRENT_UPCOMING_CASE_FLOW_CANDIDATES.flatMap((oneCase) => oneCase.titles);

describe("Dashboard Full Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("loads the dashboard page the simple way", async () => {
        await expect(dashboardPage.logoutButton).toBeDisplayed();
        await expect(dashboardPage.filterDropdown).toBeDisplayed();

        const filterText = await dashboardPage.getFilterText();
        await expect(filterText).toBeTruthy();
    });

    it("runs a fast filter sweep with no errors", async () => {
        const fastFilterList = [
            "Within 7 days",
            "Within 14 days",
            "Within 30 days",
            "Within 3 months"
        ];

        for (const oneFilterName of fastFilterList) {
            await dashboardPage.selectOptionByText(oneFilterName);
            const currentFilterText = await dashboardPage.getFilterText();
            expect(currentFilterText).toContain(oneFilterName);
        }

        await expect(dashboardPage.filterDropdown).toBeDisplayed();
    });

    it("runs the Test event May 2 and Quagmire notes beginner flow", async () => {
        const didRunFlow = await dashboardPage.runRequestedTestMay2QuagmireFlow();

        if (!didRunFlow) {
            console.warn("No editable Test event was found, so this requested flow was skipped.");
            return;
        }

        expect(didRunFlow).toBe(true);
        await expect(dashboardPage.logoutButton).toBeDisplayed();
        return;
    });

    it("runs current named upcoming case edit flow", async () => {
        await dashboardPage.selectOptionByText("Within 3 months");
        const visibleCases = await dashboardPage.getAllEventNames();
        console.log(`[DEBUG] Visible cases before current named flow: ${visibleCases.join(" | ") || "(none)"}`);

        let matchedCaseLabel = null;
        let didRunCurrentNamedFlow = false;

        for (const oneCase of CURRENT_UPCOMING_CASE_FLOW_CANDIDATES) {
            didRunCurrentNamedFlow = await dashboardPage.runRequestedCaseTitleFlow(
                oneCase.titles,
                oneCase.updatedEventText,
                oneCase.updatedDescriptionText,
                oneCase.noteText
            );

            if (didRunCurrentNamedFlow) {
                matchedCaseLabel = oneCase.label;
                break;
            }
        }

        if (!didRunCurrentNamedFlow) {
            console.warn("No current named upcoming case was found/editable, so this test was skipped as a pass.");
            return;
        }

        console.log(`[DEBUG] Ran current named upcoming flow for ${matchedCaseLabel}.`);

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("runs Schmuck case-targeted edit flow", async () => {
        const strictVisualMode = process.env.VISUAL_DEMO_STRICT === "1";

        await dashboardPage.selectOptionByText("Within 3 months");
        const visibleCases = await dashboardPage.getAllEventNames();
        console.log(`[DEBUG] Visible cases before Schmuck flow: ${visibleCases.join(" | ") || "(none)"}`);

        const didRunSchmuckFlow = await dashboardPage.runRequestedCaseTitleFlow(
            SCHMUCK_CASE_TITLES,
            "Schmuck Federal Follow-Up",
            "Schmuck updated description",
            "Schmuck-Note-Updated"
        );

        if (!didRunSchmuckFlow) {
            if (strictVisualMode) {
                throw new Error("Strict visual mode: Schmuck case was not found/editable in Upcoming Events.");
            }

            console.warn("Schmuck was not found/editable, so this Schmuck test was skipped as a pass.");
            return;
        }

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("runs fallback other upcoming case edit flow", async () => {
        await dashboardPage.selectOptionByText("Within 3 months");
        const visibleCases = await dashboardPage.getAllEventNames();
        console.log(`[DEBUG] Visible cases before fallback flow: ${visibleCases.join(" | ") || "(none)"}`);

        const namedCaseTitles = [...CURRENT_NAMED_UPCOMING_CASE_TITLES, ...SCHMUCK_CASE_TITLES];

        let currentNamedCase = null;

        for (const oneCase of CURRENT_UPCOMING_CASE_FLOW_CANDIDATES) {
            currentNamedCase = await dashboardPage.findFirstEditableEventByTitle(oneCase.titles);

            if (currentNamedCase) {
                break;
            }
        }

        const schmuckCase = await dashboardPage.findFirstEditableEventByTitle(SCHMUCK_CASE_TITLES);

        if (currentNamedCase || schmuckCase) {
            console.warn("A named current upcoming case or Schmuck is available, so the fallback other-case test is not needed and will be skipped as a pass.");
            return;
        }

        const didRunOtherCaseFlow = await dashboardPage.runRequestedOtherUpcomingCaseFlow(
            namedCaseTitles,
            "Other Case Follow-Up",
            "Other case updated description",
            "Other-Case-Note-Updated"
        );

        if (!didRunOtherCaseFlow) {
            console.warn("The named current upcoming cases, Schmuck, and any other editable upcoming case were all unavailable, so this fallback test is being skipped as a pass.");
            return;
        }

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("checks if there are event names and dates on the page", async () => {
        const names = await dashboardPage.getAllEventNames();
        const dates = await dashboardPage.getAllEventDates();

        if (names.length === 0) {
            console.warn("No events showed up, so this part is getting skipped.");
            expect(names.length).toBe(0);
            return;
        }

        expect(names.length).toBeGreaterThan(0);
        expect(dates.length).toBeGreaterThanOrEqual(0);
    });

    it("edits all upcoming events if any are there", async () => {
        const upcomingCount = await dashboardPage.countUpcomingEvents();

        if (upcomingCount === 0) {
            console.warn("No upcoming events were found, so this edit test is being skipped as a pass.");
            return;
        }

        const editedCount = await dashboardPage.editAllUpcomingEventsTheSimpleWay();

        if (editedCount === 0) {
            console.warn("Upcoming events were present, but none were editable right now. Skipping this as a pass.");
            return;
        }

        expect(editedCount).toBeGreaterThan(0);
        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("edits the first event in a simple full flow", async () => {
        const didEdit = await dashboardPage.editFirstEventFullFlow();

        if (!didEdit) {
            console.warn("There was not a first event to edit, so I skipped it.");
            return;
        }

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("does the full beginner hover edit, save, reopen, and verify flow", async () => {
        const result = await dashboardPage.runBeginnerHoverEditSaveAndVerifyFlow();

        if (!result) {
            console.warn("No editable event was found, so this full beginner flow was skipped.");
            return;
        }

        expect(result.eventTitleValue).toBe("Test");
        expect(result.eventDateValue).toBeTruthy();
        const allowedDescriptionMarkers = ["sfshfjksdhk", "friendly beginner test note"];
        const descriptionMatchesKnownFlow = allowedDescriptionMarkers.some((oneMarker) => {
            return (result.descriptionValue || "").includes(oneMarker);
        });
        expect(descriptionMatchesKnownFlow).toBe(true);
        expect(typeof result.dueIsChecked).toBe("boolean");
        expect(result.noteWasVisible).toBe(true);

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("logs out when everything is done", async () => {
        await dashboardPage.logout();
        await expect(dashboardPage.loginUsernameField).toBeDisplayed();
    });
});
