import { expect } from "@wdio/globals";
import dashboardMyTasksPage from "../pageobjects/dashboardMyTasks.js";
import dashboardPage from "../pageobjects/dashboardPage.js";
import loginHelper from "../utils/loginHelper.js";

const SORT_SEQUENCE = [
    "Created - Ascending",
    "Created - Descending",
    "Due By - Ascending",
    "Due By - Descending",
];

const REQUESTED_FILTER_CASE_NAMES = [
    "Jane doe Dont Delete",
    "Thanos",
    "EVERYONE v NO ONE",
    "Squarepants v Krabs",
    "EDNA MAE VAVOOM v. HAROLD \"HAL\" P. BOTTOM",
    "Karen's Cat vs. The Entire Neighborhood",
    "Schmuck v. United States",
    "Luigi",
    "Emperor Palpatine Vs. Luke Skywalker",
    "Medical Malpractice Suit - Smith vs. General Hospital and All Associated Pr",
    "Triscuit Family Trust",
    "Real Fast",
    "Meow said the cat",
    "Whats Hername (dont delete or edit please)",
    "example input",
    "This Case Name",
    "Kmart",
    "The Big Case",
    "thursday",
    "fvdfvsd",
    "Eevee(No AssignTo or Milestones)",
    "secret case",
    "new guy",
    "mama",
    "papa",
    "sis",
    "TEST CASE(For Adding TASK)",
    "t",
    "f",
    "g",
    "h",
    "x",
    "w",
    "j",
    "u",
    "ii",
    "jj",
    "ss",
    "xx",
    "vv",
    "ef",
    "er",
    "ty",
    "Something",
    "Jerry",
    "Whats hisname (dont delete or change please)",
    "Whats Thier name (dont delete please)",
    "Whats Whosname (dont delete please)",
    "Whats Whysname (dont delete please)",
    "Whys Hername (dont delete please)",
    "Whos Whatsname (dont delete please)",
    "What (dont delete or edit please)",
    "Walter White (dont delete please)",
    "Whitney (dont delete please)",
    "Whitey (dont delete please)",
    "Why (dont delete please)",
    "Watt (dont delete please)",
    "This Case Name is a Test",
    "Flavor Flave",
    "WILL I AM (DONT DELETE)",
    "Whats My Name (DONT DELETE)",
    "William (DONT DELETE)",
    "WAM (DONT DELETE)",
    "Apps vs Game cube",
    "Harry and The Hendersons",
    "Z no touchy please Don't delete",
    "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",
    "AppleJacks vs Cheerios",
    "Anna The Banana vs Cherry the Grape",
    "Ankle Brace vs Knee Brace",
    "Ants vs Bee's",
    "Arnold Palmer Family Trust vs Arizona Tea Company",
    "Arizona Tea Company vs Arnold Palmer Family Trust",
];

const normalizeCaseLabel = (value) => String(value || "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

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
        const rawLabels = await dashboardMyTasksPage.getCaseOptionTexts();

        // Always start with "All Cases", then the remaining options in their original order.
        const caseLabels = [
            ...rawLabels.filter((l) => l === "All Cases"),
            ...rawLabels.filter((l) => l !== "All Cases"),
        ];

        expect(caseLabels.length).toBeGreaterThan(0);

        for (const caseLabel of caseLabels) {
            await dashboardMyTasksPage.selectCaseOption(caseLabel);
            await expect(dashboardMyTasksPage.caseDropdown).toHaveText(expect.stringContaining(caseLabel));

            for (const sortOptionText of SORT_SEQUENCE) {
                await dashboardMyTasksPage.selectSortOption(sortOptionText);
                await expect(dashboardMyTasksPage.sortDropdown).toHaveText(expect.stringContaining(sortOptionText));
            }
        }
    });

    it("should run requested Filter Case names with full sort sequence", async () => {
        const availableLabels = await dashboardMyTasksPage.getCaseOptionTexts();
        const availableByNormalized = new Map();

        for (const label of availableLabels) {
            const normalized = normalizeCaseLabel(label);
            if (!availableByNormalized.has(normalized)) {
                availableByNormalized.set(normalized, label);
            }
        }

        const requestedUnique = [...new Set(REQUESTED_FILTER_CASE_NAMES)];
        const selectedLabels = [];
        const missingRequested = [];

        const runOrder = ["All Cases", ...requestedUnique];

        for (const requestedLabel of runOrder) {
            const actualLabel = availableByNormalized.get(normalizeCaseLabel(requestedLabel));

            if (!actualLabel) {
                if (requestedLabel !== "All Cases") {
                    missingRequested.push(requestedLabel);
                }
                continue;
            }

            if (selectedLabels.includes(actualLabel)) {
                continue;
            }

            await dashboardMyTasksPage.selectCaseOption(actualLabel);
            await expect(dashboardMyTasksPage.caseDropdown).toHaveText(expect.stringContaining(actualLabel));

            for (const sortOptionText of SORT_SEQUENCE) {
                await dashboardMyTasksPage.selectSortOption(sortOptionText);
                await expect(dashboardMyTasksPage.sortDropdown).toHaveText(expect.stringContaining(sortOptionText));
            }

            selectedLabels.push(actualLabel);
        }

        expect(selectedLabels.length).toBeGreaterThan(0);
        expect(selectedLabels[0]).toBe("All Cases");

        if (missingRequested.length > 0) {
            // Helpful visibility while still allowing account-specific dropdown differences.
            // eslint-disable-next-line no-console
            console.warn(`Requested Filter Case names not present in dropdown: ${missingRequested.join(" | ")}`);
        }
    });
});
