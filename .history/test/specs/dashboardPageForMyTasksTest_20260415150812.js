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
        await expect(dashboardMyTasksPage.sortDropdown).toHaveText(expect.stringContaining("Due By - Ascending"));
    });

    // =============================
    // STARTER MY TASKS CARD CONTENT CHECKS
    // =============================

    it("should check basic My Tasks card content fields", async () => {
        await dashboardMyTasksPage.waitForMyTasksSection();

        const rows = await dashboardMyTasksPage.taskRows;

        if (rows.length === 0) {
            await expect(dashboardMyTasksPage.emptyStateMessage).toBeDisplayed();
            return;
        }

        const firstRow = rows[0];
        await expect(firstRow).toBeDisplayed();

        // These are optional checks based on what exists in your account data.
        const titleEl = await dashboardMyTasksPage.getTaskTitle(firstRow);
        const caseEl = await dashboardMyTasksPage.getTaskCaseName(firstRow);
        const assigneeEl = await dashboardMyTasksPage.getTaskAssignee(firstRow);
        const dueDateEl = await dashboardMyTasksPage.getTaskDueDate(firstRow);

        if (await titleEl.isExisting()) {
            await expect(titleEl).toBeDisplayed();
        }

        if (await caseEl.isExisting()) {
            await expect(caseEl).toBeDisplayed();
        }

        if (await assigneeEl.isExisting()) {
            await expect(assigneeEl).toBeDisplayed();
        }

        if (await dueDateEl.isExisting()) {
            await expect(dueDateEl).toBeDisplayed();
        }
    });

    // =============================
    // CASE -> SORT FLOW
    // =============================

    it("should run all Sort selections for each case getter in order", async () => {
        // Keep this first, then move down the list in the same order as your case getters.
        const caseSteps = [
            { label: "All Cases", getOption: () => dashboardMyTasksPage.caseAllCasesOption },
            { label: "John Doe", getOption: () => dashboardMyTasksPage.caseJohnDoeOption },
            { label: "Jane Doe", getOption: () => dashboardMyTasksPage.caseJaneDoeOption },
            { label: "Mickey Mouse", getOption: () => dashboardMyTasksPage.caseMickeyMouseOption },
            { label: "CASE No. 006", getOption: () => dashboardMyTasksPage.caseCASE_No_006Option },
            { label: "Thanos", getOption: () => dashboardMyTasksPage.caseThanosOption },
            { label: "EVERYONE v. NO ONE", getOption: () => dashboardMyTasksPage.caseEVERYONE_v_NO_ONEOption },
            { label: "Squarepants v. Krabs", getOption: () => dashboardMyTasksPage.caseSquarepants_v_KrabsOption },
            { label: "Black Widow", getOption: () => dashboardMyTasksPage.caseBlackWidowOption },
            { label: "EDNA MAE VAVOOM v. HAROLD (NICKNAME HAL) P BOTTOM", getOption: () => dashboardMyTasksPage.caseEDNA_MAE_VAVOOM_v_HAROLD_NICKNAME_HAL_P_BOTTOMOption },
            { label: "AUTOTEST Create Min 2026-04-01 19:35:39", getOption: () => dashboardMyTasksPage.caseAUTOTEST_Create_Min_2026_04_01_19_35_39Option },
            { label: "AUTOTEST Create All Fields 2026-04-01 19:35:39", getOption: () => dashboardMyTasksPage.caseAUTOTEST_Create_All_Fields_2026_04_01_19_35_39Option },
            { label: "Karen's Cat vs. The Entire Neighborhood", getOption: () => dashboardMyTasksPage.caseKarens_Cat_vs_The_Entire_NeighborhoodOption },
            { label: "asdfasdf", getOption: () => dashboardMyTasksPage.caseasdfasdfOption },
            { label: "Schmuck v. United States", getOption: () => dashboardMyTasksPage.caseSchmuck_v_United_StatesOption },
            { label: "Gannondorf", getOption: () => dashboardMyTasksPage.caseGannondorfOption },
            { label: "Shy Guy", getOption: () => dashboardMyTasksPage.caseShy_GuyOption },
            { label: "Pipun", getOption: () => dashboardMyTasksPage.casePipunOption },
            { label: "dfsdsdf", getOption: () => dashboardMyTasksPage.casedfsdsdfOption },
            { label: "Luigi", getOption: () => dashboardMyTasksPage.caseLuigiOption },
        ];

        const sortSequence = [
            "Created - Ascending",
            "Created - Descending",
            "Due By - Ascending",
            "Due By - Descending",
        ];

        for (const caseStep of caseSteps) {
            await dashboardMyTasksPage.openCaseDropdown();
            const caseOptionElement = caseStep.getOption();

            // Keep it beginner-friendly: if a case option is not present in this account, skip and continue.
            const caseExists = await caseOptionElement.isExisting();

            if (!caseExists) {
                console.warn(`[MY TASKS] Case option not found, skipping: ${caseStep.label}`);
                await dashboardMyTasksPage.caseDropdown.click();
                continue;
            }

            await caseOptionElement.waitForDisplayed({ timeout: 10000 });

            try {
                await caseOptionElement.waitForClickable({ timeout: 3000 });
                await caseOptionElement.click();
            } catch (error) {
                await browser.execute((el) => el.click(), await caseOptionElement);
            }

            await expect(dashboardMyTasksPage.caseDropdown).toHaveAttribute("value", caseStep.label);

            for (const sortOptionText of sortSequence) {
                await dashboardMyTasksPage.selectSortOption(sortOptionText);
                await expect(dashboardMyTasksPage.sortDropdown).toHaveAttribute("value", sortOptionText);
            }
        }
    });
});
