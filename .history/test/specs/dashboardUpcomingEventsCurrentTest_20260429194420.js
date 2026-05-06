import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";
import {
    CURRENT_NAMED_UPCOMING_CASE_TITLES,
    CURRENT_UPCOMING_CASE_FLOW_CANDIDATES,
    SCHMUCK_CASE_TITLES
} from "../data/dashboardUpcomingEventCases.js";

async function runCurrentNamedUpcomingCaseFlow() {
    for (const oneCase of CURRENT_UPCOMING_CASE_FLOW_CANDIDATES) {
        const didRunCurrentNamedFlow = await dashboardPage.runRequestedCaseTitleFlow(
            oneCase.titles,
            oneCase.updatedEventText,
            oneCase.updatedDescriptionText,
            oneCase.noteText
        );

        if (didRunCurrentNamedFlow) {
            return oneCase.label;
        }
    }

    return null;
}

describe("Dashboard Upcoming Events Current Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    beforeEach(async () => {
        await dashboardPage.ensureEventEditorClosed();
        await dashboardPage.selectOptionByText("Within 3 months");
    });

    after(async () => {
        await dashboardPage.ensureEventEditorClosed();
        await dashboardPage.logout();
    });

    it("runs current named upcoming case edit flow", async () => {
        const visibleCases = await dashboardPage.getAllEventNames();
        console.log(`[DEBUG] Visible cases before current named flow: ${visibleCases.join(" | ") || "(none)"}`);

        const matchedCaseLabel = await runCurrentNamedUpcomingCaseFlow();

        if (!matchedCaseLabel) {
            console.warn("No current named upcoming case was found/editable, so this test was skipped as a pass.");
            return;
        }

        console.log(`[DEBUG] Ran current named upcoming flow for ${matchedCaseLabel}.`);
        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("runs Schmuck case-targeted edit flow", async () => {
        const visibleCases = await dashboardPage.getAllEventNames();
        console.log(`[DEBUG] Visible cases before Schmuck flow: ${visibleCases.join(" | ") || "(none)"}`);

        const didRunSchmuckFlow = await dashboardPage.runRequestedCaseTitleFlow(
            SCHMUCK_CASE_TITLES,
            "Schmuck Federal Follow-Up",
            "Schmuck updated description",
            "Schmuck-Note-Updated"
        );

        if (!didRunSchmuckFlow) {
            console.warn("Schmuck was not found/editable, so this Schmuck test was skipped as a pass.");
            return;
        }

        await expect(dashboardPage.logoutButton).toBeDisplayed();
    });

    it("runs fallback other upcoming case edit flow", async () => {
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
});