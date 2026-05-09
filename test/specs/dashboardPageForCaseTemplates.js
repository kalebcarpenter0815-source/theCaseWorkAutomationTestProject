import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardTemplatesPage from "../pageobjects/dashboardCaseTemplates.js";
import loginHelper from "../utils/loginHelper.js";

describe("Case Templates full ordered flow", () => {
    const templateName = `Auto Template ${Date.now()}`;
    const copiedTemplateName = `${templateName}-Copy`;

    async function waitTemplatesPage() {
        await browser.waitUntil(async () => (await browser.getUrl()).includes("/templates"), {
            timeout: 20000,
            timeoutMsg: "Templates page URL was not reached."
        });
        await dashboardTemplatesPage.caseTemplatesHeader.waitForDisplayed({ timeout: 20000 });
    }

    async function openTemplatesFromNav() {
        await dashboardTemplatesPage.open();
        await waitTemplatesPage();
    }

    async function openNewTemplateFromTemplatesPage() {
        await dashboardTemplatesPage.clickCaseTemplatesNewTemplateButton();
        await dashboardTemplatesPage.addEditCaseTemplateHeader.waitForDisplayed({ timeout: 20000 });
    }

    async function goToCaseDataTypesAndBack(clickHereMethodName) {
        await dashboardTemplatesPage[clickHereMethodName]();
        await dashboardTemplatesPage.caseDataTypesHeader.waitForDisplayed({ timeout: 20000 });
        await openTemplatesFromNav();
        await openNewTemplateFromTemplatesPage();
    }

    async function setValue(selector, value) {
        const input = await $(selector);
        await input.waitForDisplayed({ timeout: 20000 });
        await input.click();
        await input.clearValue();
        await input.setValue(value);
    }

    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        expect(await browser.getUrl()).toContain("https://app.thecasework.com/");
    });

    it("runs the full Case Templates create copy edit delete flow in order", async () => {
        await openTemplatesFromNav();
        expect(await browser.getUrl()).toContain("https://app.thecasework.com/templates");

        await dashboardTemplatesPage.clickCaseTemplatesInfoIconBtn();
        const caseTemplatesInfoText = await $('//span[contains(text(), "Easily create new cases with predefined types and data using Case Templates.")]');
        await caseTemplatesInfoText.waitForDisplayed({ timeout: 10000 });
        await dashboardTemplatesPage.clickCaseTemplatesInfoIconBtn();
        await caseTemplatesInfoText.waitForDisplayed({ reverse: true, timeout: 10000 });

        await openNewTemplateFromTemplatesPage();

        await dashboardTemplatesPage.clickCaseTypeInfoIconBtn();
        await dashboardTemplatesPage.clickAllowedStatusesInfoIconBtnClickHereButton();
        await dashboardTemplatesPage.caseDataTypesHeader.waitForDisplayed({ timeout: 20000 });

        await openTemplatesFromNav();
        await openNewTemplateFromTemplatesPage();
        await dashboardTemplatesPage.clickCaseTypeInfoIconBtn();
        await dashboardTemplatesPage.clickCaseTypeInfoIconBtn();

        await dashboardTemplatesPage.clickAllowedStatusesInfoIconBtn();
        await dashboardTemplatesPage.clickAllowedStatusesInfoIconBtn();

        await dashboardTemplatesPage.clickDescriptionAndOverviewInfoIconBtn();
        await dashboardTemplatesPage.clickDescriptionAndOverviewInfoIconBtn();

        await dashboardTemplatesPage.clickDescriptionAndOverviewShortDescriptionField();
        await dashboardTemplatesPage.clickDescriptionAndOverviewShortDescriptionField();

        await dashboardTemplatesPage.clickDescriptionAndOverviewOverviewFieldInfoIconBtn();
        await dashboardTemplatesPage.clickDescriptionAndOverviewOverviewFieldInfoIconBtn();

        await dashboardTemplatesPage.clickInitialNoteInfoIconBtn();
        await dashboardTemplatesPage.clickInitialNoteInfoIconBtn();

        await dashboardTemplatesPage.clickEngagementTemplateInfoIconBtn();
        await goToCaseDataTypesAndBack("clickEngagementTemplateInfoIconBtnClickHereButton");
        await dashboardTemplatesPage.clickEngagementTemplateInfoIconBtn();

        await dashboardTemplatesPage.clickMilestoneInfoIconBtn();
        await dashboardTemplatesPage.clickMilestoneInfoIconBtn();
        await dashboardTemplatesPage.clickEventsInfoIconButton();
        await dashboardTemplatesPage.clickEventsInfoIconButton();
        await dashboardTemplatesPage.clickEngagementTemplateInfoIconBtn();

        await dashboardTemplatesPage.clickCaseTemplateNameField();
        await setValue('//label[contains(normalize-space(), "Template Name")]/following::input[1]', templateName);

        await dashboardTemplatesPage.clickTemplateDescriptionField();
        await setValue('[name="templateDescription"]', `${templateName} description`);

        await dashboardTemplatesPage.clickCaseTypeDropdownMenuButton();
        await dashboardTemplatesPage.clickBigZestyShreckDropdownMenuButton();
        await dashboardTemplatesPage.clickCaseTypeDropdownMenuButton();
        await dashboardTemplatesPage.clickCaseType_1777908064990DropdownMenuButton();
        await dashboardTemplatesPage.clickCaseTypeDropdownMenuButton();
        await dashboardTemplatesPage.clickCaseType_1777908679399DropdownMenuButton();
        await dashboardTemplatesPage.clickCaseTypeDropdownMenuButton();
        await dashboardTemplatesPage.clickCaseType_1777909408167DropdownMenuButton();
        await dashboardTemplatesPage.clickCaseTypeDropdownMenuButton();
        await dashboardTemplatesPage.clickRegularDropdownMenuButton();

        await dashboardTemplatesPage.clickAllowedStatusesNewDropdownMenuButtonSelection();
        await dashboardTemplatesPage.clickNewDropdownMenuButtonSelectionNew();

        await dashboardTemplatesPage.clickActiveEngagementsDropdownMenuButton();
        await dashboardTemplatesPage.clickActiveEngagementsDropdownMenuButtonSelectionTestifyingSlashDepo();

        await dashboardTemplatesPage.clickCompletedDropdownMenuButton();
        await dashboardTemplatesPage.clickCompletedDropdownMenuButtonSelectionCompleted();

        await dashboardTemplatesPage.clickClosedDropdownMenuButton();
        await dashboardTemplatesPage.clickClosedDropdownMenuButtonSelectionClosed();

        await dashboardTemplatesPage.clickRemovedDropdownMenuButton();
        await dashboardTemplatesPage.clickRemovedDropdownMenuButtonSelectionRemovedTest();

        await dashboardTemplatesPage.clickDescriptionAndOverviewFieldNameTextbox();

        await dashboardTemplatesPage.clickDescriptionAndOverviewFieldNameDefaultTextTextbox();
        await dashboardTemplatesPage.clickOverviewTextboxField();
        await dashboardTemplatesPage.clickInitialNoteNoteTextboxField();

        await dashboardTemplatesPage.clickEngagementTemplateSelectTemplateDropdown();
        await dashboardTemplatesPage.clickSelectTemplateCustomDashCopyButton();
        await dashboardTemplatesPage.clickEngagementTemplateSelectTemplateDropdown();
        await dashboardTemplatesPage.clickSelectTemplateNewCopyButton();
        await dashboardTemplatesPage.clickEngagementTemplateSelectTemplateDropdown();
        await dashboardTemplatesPage.clickSelectTemplateEngagementToWhomMenuButton();
        await dashboardTemplatesPage.clickEngagementTemplateSelectTemplateDropdown();
        await dashboardTemplatesPage.clickSelectTemplateCopyrightDashRetentionAgreementButton();
        await dashboardTemplatesPage.clickEngagementTemplateSelectTemplateDropdown();
        await dashboardTemplatesPage.clickSelectTemplateStandardBillingAndPaymentTermsButton();

        await dashboardTemplatesPage.clickAddMilestoneButton();
        await $('//div[contains(text(), "Create/Edit Milestone")]').waitForDisplayed({ timeout: 20000 });

        await dashboardTemplatesPage.creatSlashEditMilestoneMilestoneNameInputField.waitForDisplayed({ timeout: 20000 });
        await dashboardTemplatesPage.creatSlashEditMilestoneMilestoneNameInputField.clearValue();
        await dashboardTemplatesPage.creatSlashEditMilestoneMilestoneNameInputField.setValue("New Milestone");
        await dashboardTemplatesPage.enterMilestoneDescription("Milestone description text");
        await dashboardTemplatesPage.enterMilestoneDueDaysFromCreated("5");
        await dashboardTemplatesPage.enterMilestoneDeliverables("Milestone deliverables text");

        await dashboardTemplatesPage.clickCreateSlashEditMilestoneAddEventButton();
        await dashboardTemplatesPage.addEventCardShowsUp();
        await dashboardTemplatesPage.enterAddEventCardEventName("Milestone Event 1");
        await dashboardTemplatesPage.enterDaysFromCreatedAddEventCard("10");
        await dashboardTemplatesPage.clickAddEventIsDueDateCheckbox();
        await dashboardTemplatesPage.enterAddEventDescription("Milestone event description");
        await dashboardTemplatesPage.clickAddEventSaveEventTemplateButton();
        await $('//div[contains(text(), "Create/Edit Milestone")]').waitForDisplayed({ timeout: 20000 });

        await dashboardTemplatesPage.clickCreateSlashEditMilestoneAddEventButton();
        await dashboardTemplatesPage.addEventCardShowsUp();
        await dashboardTemplatesPage.clickAddEventCancelButton();
        await $('//div[contains(text(), "Create/Edit Milestone")]').waitForDisplayed({ timeout: 20000 });

        await dashboardTemplatesPage.clickTasksAddTaskButton();
        await dashboardTemplatesPage.addSlashEditTaskInMilestoneCardShowsUp();
        await dashboardTemplatesPage.clickAddSlashEditTaskInMilestoneBillableCheckboxButton();
        await dashboardTemplatesPage.clickAddSlashEditTaskInMilestoneBillableCheckboxButton();
        await dashboardTemplatesPage.enterAddSlashEditTaskInMilestoneTaskToComplete("Prepare initial filing package");
        await dashboardTemplatesPage.enterAddSlashEditTaskInMilestoneDescription("Task description for initial filing package.");
        await dashboardTemplatesPage.clickAddSlashEditTaskInMilestoneSaveButton();
        await $('//div[contains(text(), "Create/Edit Milestone")]').waitForDisplayed({ timeout: 20000 });

        await dashboardTemplatesPage.clickTasksAddTaskButton();
        await dashboardTemplatesPage.addSlashEditTaskInMilestoneCardShowsUp();
        await dashboardTemplatesPage.clickAddSlashEditTaskInMilestoneCancelButton();
        await $('//div[contains(text(), "Create/Edit Milestone")]').waitForDisplayed({ timeout: 20000 });

        await dashboardTemplatesPage.clickCreateSlashEditMilestoneSubmitButton();
        await dashboardTemplatesPage.addEditCaseTemplateHeader.waitForDisplayed({ timeout: 20000 });

        await dashboardTemplatesPage.clickAddMilestoneButton();
        await $('//div[contains(text(), "Create/Edit Milestone")]').waitForDisplayed({ timeout: 20000 });
        await dashboardTemplatesPage.clickCreateSlashEditMilestoneCancelButton();
        await dashboardTemplatesPage.addEditCaseTemplateHeader.waitForDisplayed({ timeout: 20000 });

        await dashboardTemplatesPage.clickAddSlashEditCaseTemplaeMainCardAddEventButton();
        await $('//div[contains(text(), "Add Event")]').waitForDisplayed({ timeout: 20000 });
        await dashboardTemplatesPage.enterAddEventPopUpCardEventName("Main Template Event");
        await dashboardTemplatesPage.enterDaysFromCreatedAddEventPopUpCard("15");
        await dashboardTemplatesPage.clickAddEventPopUpCardIsDueDateCheckbox();
        await dashboardTemplatesPage.enterAddEventPopUpCardDescription("Main template event description");
        await dashboardTemplatesPage.clickAddEventPopUpCardSaveEventTemplateButton();
        await dashboardTemplatesPage.addEditCaseTemplateHeader.waitForDisplayed({ timeout: 20000 });

        await dashboardTemplatesPage.clickAddSlashEditCaseTemplaeMainCardAddEventButton();
        await $('//div[contains(text(), "Add Event")]').waitForDisplayed({ timeout: 20000 });
        await dashboardTemplatesPage.clickAddEventPopUpCardCancelButton();
        await dashboardTemplatesPage.addEditCaseTemplateHeader.waitForDisplayed({ timeout: 20000 });

        await dashboardTemplatesPage.clickAddSlashEditCaseTemplateMainPageSaveButtonAtTopPage();
        await dashboardTemplatesPage.dismissCaseTemplateSavedToast();
        await dashboardTemplatesPage.addEditCaseTemplateHeader.waitForDisplayed({ timeout: 20000 });

        await dashboardTemplatesPage.clickAddSlashEditCaseTemplateBackToCaseTemplatesButton();
        await waitTemplatesPage();

        await dashboardTemplatesPage.openTemplateRowMenu(templateName);
        await dashboardTemplatesPage.clickTemplateContextMenuCopy();
        await dashboardTemplatesPage.confirmDialogByTitle("Confirm Copy").waitForDisplayed({ timeout: 10000 });
        await dashboardTemplatesPage.clickConfirmDialogNo();

        await dashboardTemplatesPage.openTemplateRowMenu(templateName);
        await dashboardTemplatesPage.clickTemplateContextMenuCopy();
        await dashboardTemplatesPage.confirmDialogByTitle("Confirm Copy").waitForDisplayed({ timeout: 10000 });
        await dashboardTemplatesPage.clickConfirmDialogYes();
        await dashboardTemplatesPage.waitForTemplateRow(copiedTemplateName);

        await dashboardTemplatesPage.openTemplateRowMenu(templateName);
        await dashboardTemplatesPage.clickTemplateContextMenuEdit();
        await dashboardTemplatesPage.addEditCaseTemplateHeader.waitForDisplayed({ timeout: 20000 });
        await dashboardTemplatesPage.clickAddSlashEditCaseTemplateMainPageCancelButtonAtTopPage();
        await waitTemplatesPage();

        await dashboardTemplatesPage.openTemplateRowMenu(templateName);
        await dashboardTemplatesPage.clickTemplateContextMenuDelete();
        await dashboardTemplatesPage.confirmDialogByTitle("Confirm Delete").waitForDisplayed({ timeout: 10000 });
        await dashboardTemplatesPage.clickConfirmDialogNo();
        await waitTemplatesPage();

        await dashboardTemplatesPage.openTemplateRowMenu(templateName);
        await dashboardTemplatesPage.clickTemplateContextMenuDelete();
        await dashboardTemplatesPage.confirmDialogByTitle("Confirm Delete").waitForDisplayed({ timeout: 10000 });
        await dashboardTemplatesPage.clickConfirmDialogYes();
        await waitTemplatesPage();
        await dashboardTemplatesPage.waitForTemplateRowToDisappear(templateName);
    });
});
