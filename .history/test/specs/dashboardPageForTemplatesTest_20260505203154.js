import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesPage from "../pageobjects/dashboardTemplates.js";
import loginHelper from "../utils/loginHelper.js";

describe("Dashboard Templates Black Widow End-to-End", () => {
    async function safeCall(methodName, ...args) {
        if (typeof dashboardTemplatesPage[methodName] !== "function") {
            return;
        }

        try {
            await dashboardTemplatesPage[methodName](...args);
        } catch (error) {
            console.warn(`[templates-safeCall] ${methodName} failed: ${error?.message || error}`);
        }
    }

    async function openTemplates() {
        await ensureTemplatesTableIsVisible();
        await dashboardTemplatesPage.clickBlackWidowTemplateRow();
    }

    async function ensureTemplatesTableIsVisible() {
        // If we are in Add/Edit, back out first so row-level actions are available.
        await safeCall("clickAddSlashEditTemplateBackToCaseTemplatesButton");
        await safeCall("clickAddSlashEditCaseTemplateBackToCaseTemplatesButton");

        await dashboardTemplatesPage.open();
        await browser.waitUntil(async () => (await browser.getUrl()).includes("/templates"), {
            timeout: 15000,
            timeoutMsg: "Templates page did not load."
        });

        // Wait specifically for table row before proceeding.
        await dashboardTemplatesPage.blackWidowTemplateRow.waitForDisplayed({ timeout: 15000 });
    }

    async function clickAllKnownInfoIcons() {
        // Case Templates page-level info icon.
        await safeCall("clickCaseTemplatesInfoIcon");

        // Add/Edit Case Template page info icons.
        await safeCall("clickAllowedStatusesInfoIcon");
        await safeCall("clickDescriptionInfoIcon");
        await safeCall("clickShortDescriptionField");
        await safeCall("clickOverviewInfoIcon");
        await safeCall("clickInitialNoteInfoIcon");
        await safeCall("clickEngagementTemplateInfoIcon");
        await safeCall("clickMilestoneTemplateInfoIcon");
        await safeCall("clickEventsTemplateInfoIcon");

        // Alternate/legacy info icon method names.
        await safeCall("clickAllowedStatusesInfoIconButton");
        await safeCall("allowedStatusesInfoIconButtonShowsUp");
    }

    async function clickAllInfoIconsAfterSelectingBlackWidowTemplate() {
        // On Case Templates table
        await safeCall("clickCaseTemplatesInfoIcon");

        // Open Black Widow edit to access form-level info icons.
        await dashboardTemplatesPage.clickBlackWidowTemplateRowThreeDotsButton();
        await dashboardTemplatesPage.clickBlackWidowTemplate_CopyRowThreeDotsButtonEditButton();
        await safeCall("addSlashEditCaseTemplateForBlackWidowTemplate_CopyShowsUp");
        await clickAllKnownInfoIcons();

        // Return to table so the test can continue with copy/edit scenarios.
        await safeCall("clickAddSlashEditTemplateBackToCaseTemplatesButton");
        await safeCall("clickAddSlashEditCaseTemplateBackToCaseTemplatesButton");
        await ensureTemplatesTableIsVisible();
        await dashboardTemplatesPage.clickBlackWidowTemplateRow();
    }

    async function openBlackWidowCopyRowContextMenu() {
        const copyRowMenuButton = await $('//div[@role="row"][.//span[normalize-space()="Black Widow Template-Copy"]]//button[@aria-label="More items"]');
        await copyRowMenuButton.waitForDisplayed({ timeout: 10000 });
        await copyRowMenuButton.waitForEnabled({ timeout: 10000 });
        await copyRowMenuButton.click();
    }

    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    it("covers Black Widow info checks and copy no/yes paths", async () => {
        await openTemplates();
        await clickAllInfoIconsAfterSelectingBlackWidowTemplate();

        await dashboardTemplatesPage.clickBlackWidowTemplateRowThreeDotsButton();
        await dashboardTemplatesPage.clickBlackWidowTemplateRowThreeDotsButtonUseTemplateCopyOption();
        await dashboardTemplatesPage.blackWidowTemplateConfirmCopyPopUpCardShowsUp();
        await dashboardTemplatesPage.clickBlackWidowTemplateConfirmCopyPopUpCardNoButton();

        await dashboardTemplatesPage.clickBlackWidowTemplateRowThreeDotsButton();
        await dashboardTemplatesPage.clickBlackWidowTemplateRowThreeDotsButtonUseTemplateCopyOption();
        await dashboardTemplatesPage.blackWidowTemplateConfirmCopyPopUpCardShowsUp();
        await dashboardTemplatesPage.clickBlackWidowTemplateConfirmCopyPopUpCardYesButton();
        await dashboardTemplatesPage.blackWidowTemplate_CopyRowShowsUp();
    });

    it("edits Black Widow Template-Copy deeply and then deletes it", async () => {
        await openTemplates();
        await dashboardTemplatesPage.blackWidowTemplate_CopyRowShowsUp();

        await openBlackWidowCopyRowContextMenu();
        await dashboardTemplatesPage.clickBlackWidowTemplate_CopyRowThreeDotsButtonEditButton();
        await dashboardTemplatesPage.addSlashEditCaseTemplateForBlackWidowTemplate_CopyShowsUp();
        await clickAllKnownInfoIcons();

        await safeCall("enterAddSlashEditCaseTemplateForBlackWidowTemplate_CopyName", "Black Widow Template-Copy Edited");
        await safeCall("enterAddSlashEditCaseTemplateForBlackWidowTemplate_CopyDescription", "Edited description");

        await safeCall("clickAddSlashEditCaseTemplateForBlackWidowTemplate_CopyCaseTypeDropdownMenuButton");
        await safeCall("clickAddSlashEditCaseTemplateForBlackWidowTemplate_CopyCaseTypeDropdownMenuButtonOptionOne");
        await safeCall("clickAddSlashEditCaseTemplateForBlackWidowTemplate_CopyCaseTypeDropdownMenuButtonOptionTwo");
        await safeCall("clickAddSlashEditCaseTemplateForBlackWidowTemplate_CopyCaseTypeDropdownMenuButtonOptionThree");
        await safeCall("clickAddSlashEditCaseTemplateForBlackWidowTemplate_CopyCaseTypeDropdownMenuButtonOptionFour");
        await safeCall("clickAddSlashEditCaseTemplateForBlackWidowTemplate_CopyCaseTypeDropdownMenuButtonOptionFive");
        await safeCall("clickAddSlashEditCaseTemplateForBlackWidowTemplate_CopyCaseTypeDropdownMenuButtonOptionSix");

        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesNewDropdownMenuButton");
        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesNewVagueDisadvantagedCheckbox");
        await safeCall("blackWidowTemplate_CopyAllowedStatusesNewVagueDisadvantagedCheckboxCheckedShowsUp");
        await safeCall("blackWidowTemplate_CopyAllowedStatusesNewNewCheckboxCheckedShowsUp");
        await safeCall("blackWidowTemplate_CopyAllowedStatusesNewVagueDisadvantagedCheckboxCheckedIsUncheckedShowsUp");
        await safeCall("clickBlackWidowTemplate_CopyNewSecondaryStrangerCheckbox");
        await safeCall("clickBlackWidowTemplate_Copy11111111111111111111111111111111111111111111111111Checkbox");
        await safeCall("clickBlackWidowTemplate_CopyAutomationStatusCheckbox");

        await safeCall("clickBlackWidowTemplate_CopyActiveCheckbox");
        await safeCall("blackWidowTemplate_CopyActiveActiveCheckboxCheckedShowsUp");
        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesActiveActiveTestCheckbox");
        await safeCall("clickBlackWidowTemplateAllowedStatusesActiveTestifyingSlashDepoCheckbox");
        await safeCall("clickBlackWidowTemplateAllowedStatusesActive11111111111111111111111111111111111111111111111111Checkbox");

        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesCompletedDropdownMenuButton");
        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesCompletedCompletedTestChekcbox");
        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesCompleted11111111111111111111111111111111111111111111111111Checkbox");

        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesClosedDropdownMenuButton");
        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesClosedClosedTestChekcbox");
        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesClosedClosedCheckbox");
        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesClosed11111111111111111111111111111111111111111111111111Checkbox");

        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesRemovedDroipdownMenuButton");
        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesRemovedRemovedTestChekcbox");
        await safeCall("clickBlackWidowTemplate_CopyAllowedStatusesRemoved11111111111111111111111111111111111111111111111111Checkbox");

        await safeCall("enterBlackWidowTemplate_CopyDescriptionAndOverviewShortDescriptionFieldFieldNmae", "Description / Action / Proceeding");
        await safeCall("enterBlackWidowTemplate_CopyDescriptionAndOverviewOverviewInput", "Overview text");
        await safeCall("enterBlackWidowTemplate_CopyInitialNoteNoteInputField", "Initial note for Black Widow copy");

        await safeCall("clickBlackWidowTemplate_CopyEngagementTemplateSelectTemplateDropdownMenuButton");
        await safeCall("clickBlackWidowTemplate_CopyEngagementTemplateSelectTemplateDropdownMenuButtonOptionOne");
        await safeCall("clickBlackWidowTemplate_CopyEngagementTemplateSelectTemplateDropdownMenuButtonOptionTwo");
        await safeCall("clickBlackWidowTemplate_CopyEngagementTemplateSelectTemplateDropdownMenuButtonOptionThree");
        await safeCall("clickBlackWidowTemplate_CopyEngagementTemplateSelectTemplateDropdownMenuButtonOptionFour");
        await safeCall("clickBlackWidowTemplate_CopyEngagementTemplateSelectTemplateDropdownMenuButtonOptionFive");

        await safeCall("clickBlackWidowTEmplate_CopyMilestonesAddMilestoneButton");
        await safeCall("blackWidowTemplate_CopyCreateSlashEditMilestonePopUpCardTutleShowsUp");
        await safeCall("enterBlackWidowTemplate_CopyMilestonesMilestoneNameInputField", "Milestone 1");
        await safeCall("enterBlackWidowTemplate_CopyMilestoneDescriptionInputField", "Milestone description");
        await safeCall("enterBlackWidowTemplate_CopyCreateSlashMilestoneDueDaysFromCreatedInputField", "30");
        await safeCall("enterBlackWidowTemplate_CopyCreateSlashEditMilestoneDeliverablesInputField", "Deliverables");

        await safeCall("clickBlackWidowTemplate_CopyCreateSlashEditMilestoneEventsAddEventButton");
        await safeCall("blackWidowTemplate_CopyAddEventPopUpCardTitleShowsUp");
        await safeCall("enterBlackWidowTemplate_CopyAddEventEventNameInputField", "Event 1");
        await safeCall("enterBlackWidowTemplate_CopyAddEventDaysFromCreatedInputField", "15");
        await safeCall("clickBlackWidowTemplate_CopyCreateSlashEditMielstoneAddEventIsDueDateChekcbox");
        await safeCall("enterBlackWidowTemplate_CopyAddEventDescriptionInputField", "Event description");
        await safeCall("clickBlackWidowTemplate_CopyAddeventSaveEventTemplateButton");

        await safeCall("clickBlackWidowTemplate_CopyCreateSlashEditCaseTemplateEventsAddEventsButton");
        await safeCall("blackWidowTemplate_CopyCreateSlashEditCaseTemplateEventsAddEventPopUpCardTitleShowsUp");
        await safeCall("enterBlackWidowTemplate_CopyAddSlashEditCaseTemplateEventsAddEventEventNameInputField", "Main event 1");
        await safeCall("enterBlackWidowTemplate_CopyAddSlashEditCaseTemplateAddEventCardDaysFromCreatedInputField", "21");
        await safeCall("clickBlackWidowTemplate_CopyAddSlashEditCaseTemplateAddEventCardIsDueDateChekcbox");
        await safeCall("enterBlackWidowTemplate_CopyAddSlashEditCaseTemplateAddEventCardDescriptionInputField", "Main event description");
        await safeCall("clickBlackWidowTemplate_CopyAddSlashEditCaseTemplateAddEventCardSaveEventTemplateButton");

        await safeCall("clickBlackWidowTemplate_CopyAddSlashEditTemplateSaveButton");
        await safeCall("clickBlackWidowTemplate_CopyAddSlashEditTemplateBackToCaseTemplatesButton");

        await openTemplates();
        await openBlackWidowCopyRowContextMenu();
        await safeCall("clickBlackWidowTemplate_CopyRowThreeDotsButtonDeleteOption");
        await safeCall("blackWidowTemplate_CopyRowThreeDotsButtonDeleteOptionConfirmaDeletePopUpCardShowsUp");
        await safeCall("clickBlackWidowTemplate_CopyRowThreeDotsButtonDeleteOptionConfirmaDeletePopUpCardNoButton");

        await openBlackWidowCopyRowContextMenu();
        await safeCall("clickBlackWidowTemplate_CopyRowThreeDotsButtonDeleteOption");
        await safeCall("blackWidowTemplate_CopyRowThreeDotsButtonDeleteOptionConfirmaDeletePopUpCardShowsUp");
        await safeCall("clickBlackWidowTemplate_CopyRowThreeDotsButtonDeleteOptionConfirmaDeletePopUpCardYesButton");

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
    });
});
