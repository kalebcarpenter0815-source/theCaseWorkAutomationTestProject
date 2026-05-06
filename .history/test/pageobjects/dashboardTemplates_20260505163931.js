import { $, expect } from "@wdio/globals";
import Page from "./page.js";

class DashboardTemplatesPage extends Page {
    get templatesNavButton() {
        return $('//*[@data-testid="vert-nav-templates"]');
    }

    async open() {
        await this.templatesNavButton.click();
    }

    get caseTemplatesInfoIconBtn() {
        return $('#infolabel-r2mg__infoButton');
    }

    async clickCaseTemplatesInfoIcon() {
        await this.caseTemplatesInfoIconBtn.click();
    }

    get caseTemplatesInformationText() {
        return $('//span[contains(text(), "Easily create new cases with predefined types and data using Case Templates.")]');
    }

    async getCaseTemplatesInformationText() {   
        return await this.caseTemplatesInformationText.getText();
        expect(await this.caseTemplatesInformationText.getText()).toBe("Easily create new cases with predefined types and data using Case Templates.");
    }

    get CaseTemplatesNewTemplateButton() {
        return $('//button[@data-testid="case-templates-new-template-button"]');
    }

    async clickCaseTemplatesNewTemplateButton() {
        await this.CaseTemplatesNewTemplateButton.click();
    }

    get addEditCaseTemplateHeader() {
        return $('//span[contains(text(), "Add/Edit Case Template")]');
    }

    async getAddEditCaseTemplateHeaderText() { 
        return await this.addEditCaseTemplateHeader.getText();
        expect(await this.addEditCaseTemplateHeader.getText()).toBe("Add/Edit Case Template");
    }

    // We will then do Case Type info icon button and text as well as the Allowed Statuses info icon button and text and Engagement Template info icon button and text in the same way as before to make sure that when we are redirected to another page, that we come back, so we dont enter anything first because it is useless since it doesn't save you input.

    get allowedStatusesInfoIconBtn() {
        return $('//button[@id="infolabel-rkr__infoButton"]');
    }

    async clickAllowedStatusesInfoIcon() {
        await this.allowedStatusesInfoIconBtn.click();
    }

    get allowedStatusesClickHereButton() {
        return $('//span[contains(text(), "Click here")]');
    }

    async clickAllowedStatusesClickHereButton() {
        await this.allowedStatusesClickHereButton.click();
        expect(await this.allowedStatusesClickHereButton.getText()).toBe("Click here");
    }

    get descriptionInfoIconBtn() {
        return $('#infolabel-rkt__infoButton');
    }

    async clickDescriptionInfoIcon() {
        await this.descriptionInfoIconBtn.click();
        expect(await this.descriptionInfoIconBtn.isDisplayed()).toBeTruthy();
    }

    get shortDescriptionFieldBtn() {
        return $('#infolabel-rl0__infoButton');
    }

    async clickShortDescriptionField() {
        await this.shortDescriptionFieldBtn.click();
        expect(await this.shortDescriptionFieldBtn.isDisplayed()).toBeTruthy();
    }

    get overviewInfoIconBtn() {
        return $('#infolabel-rl5__infoButton');
    }

    async clickOverviewInfoIcon() {
        await this.overviewInfoIconBtn.click();
        expect(await this.overviewInfoIconBtn.isDisplayed()).toBeTruthy();
    }

    get initialNoteInfoIconBtn() {
        return $('#infolabel-rl7__infoButton');
    }

    async clickInitialNoteInfoIcon() {
        await this.initialNoteInfoIconBtn.click();
        expect(await this.initialNoteInfoIconBtn.isDisplayed()).toBeTruthy();
    }

    get engagementTemplateInfoIconBtn() {
        return $('#infolabel-rla__infoButton');
    }

    async clickEngagementTemplateInfoIcon() {
        await this.engagementTemplateInfoIconBtn.click();
        expect(await this.engagementTemplateInfoIconBtn.isDisplayed()).toBeTruthy();
    }

    get milestoneTemplateInfoIconBtn() {
        return $('#infolabel-rle__infoButton');
    }

    async clickMilestoneTemplateInfoIcon() {
        await this.milestoneTemplateInfoIconBtn.click();
        expect(await this.milestoneTemplateInfoIconBtn.isDisplayed()).toBeTruthy();
    }

    get eventsTemplateInfoIconBtn() {
        return $('#infolabel-rlr__infoButton');
    }

    async clickEventsTemplateInfoIcon() {
        await this.eventsTemplateInfoIconBtn.click();
        expect(await this.eventsTemplateInfoIconBtn.isDisplayed()).toBeTruthy();
    }

    // Now that we have all the info icon buttons and text, we will now do all the text fields and dropdowns to make sure that they are all displayed and enabled when we click on them, but we will not enter any text or select any options because it is useless since it doesn't save your input.

    get caseTemplateNameField() {
        return $('#field-rkl__control');
    }

    async clickCaseTemplateNameField() {
        await this.caseTemplateNameField.click();
        expect(await this.caseTemplateNameField.isDisplayed()).toBeTruthy();
        expect(await this.caseTemplateNameField.isEnabled()).toBeTruthy();
    }

    get templateDescriptionField() {
        return $('[name="templateDescription"]');
    }

    async clickTemplateDescriptionField() {
        await this.templateDescriptionField.click();
        expect(await this.templateDescriptionField.isDisplayed()).toBeTruthy();
        expect(await this.templateDescriptionField.isEnabled()).toBeTruthy();
    }

    get caseTypeDropdownMenuButton() {
        return $('#field-rnh__control');
    }

    async clickCaseTypeDropdownMenuButton() {
        await this.caseTypeDropdownMenuButton.click();
        expect(await this.caseTypeDropdownMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.caseTypeDropdownMenuButton.isEnabled()).toBeTruthy();
    }

    get bigZestyShreckDropdownMenuButton() {
        return $('//button[.//span[contains(normalize-space(), "big zesty shrek")]]');
    }

    async clickBigZestyShreckDropdownMenuButton() {
        await this.bigZestyShreckDropdownMenuButton.click();
        expect(await this.bigZestyShreckDropdownMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.bigZestyShreckDropdownMenuButton.isEnabled()).toBeTruthy();
    }

    get CaseType_1777908064990DropdownMenuButton() {
        return $('//button[.//span[contains(normalize-space(), "CaseType_1777908064990")]]');
    }

    async clickCaseType_1777908064990DropdownMenuButton() {
        await this.CaseType_1777908064990DropdownMenuButton.click();
        expect(await this.CaseType_1777908064990DropdownMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.CaseType_1777908064990DropdownMenuButton.isEnabled()).toBeTruthy();
    }

    get CaseType_1777908679399DropdownMenuButton() {
        return $('//button[.//span[contains(normalize-space(), "CaseType_1777908679399")]]');
    }

    async clickCaseType_1777908679399DropdownMenuButton() {
        await this.CaseType_1777908679399DropdownMenuButton.click();
        expect(await this.CaseType_1777908679399DropdownMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.CaseType_1777908679399DropdownMenuButton.isEnabled()).toBeTruthy();
    }

    get CaseType_1777909408167DropdownMenuButton() {
        return $('//button[.//span[contains(normalize-space(), "CaseType_1777909408167")]]');
    }

    async clickCaseType_1777909408167DropdownMenuButton() {
        await this.CaseType_1777909408167DropdownMenuButton.click();
        expect(await this.CaseType_1777909408167DropdownMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.CaseType_1777909408167DropdownMenuButton.isEnabled()).toBeTruthy();
    }

    get regularDropdownMenuButton() {
        return $('//button[.//span[contains(normalize-space(), "Regular")]]');
    }

    async clickRegularDropdownMenuButton() {
        await this.regularDropdownMenuButton.click();
        expect(await this.regularDropdownMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.regularDropdownMenuButton.isEnabled()).toBeTruthy();
    }

    get allowedStatusesNewDropdownMenuButtonSelection() {
        return $('//button[normalize-space()="New"]');
    }

    async clickAllowedStatusesNewDropdownMenuButtonSelection() {
        await this.allowedStatusesNewDropdownMenuButtonSelection.click();
        expect(await this.allowedStatusesNewDropdownMenuButtonSelection.isDisplayed()).toBeTruthy();
        expect(await this.allowedStatusesNewDropdownMenuButtonSelection.isEnabled()).toBeTruthy();
    }

    get newDropdownMenuButtonVagueDisadvantageSelection() {
        return $('//input[@id="New:vague disadvantage"]');
    }

    async clickNewDropdownMenuButtonVagueDisadvantageSelection() {
        await this.newDropdownMenuButtonVagueDisadvantageSelection.click();
        expect(await this.newDropdownMenuButtonVagueDisadvantageSelection.isDisplayed()).toBeTruthy();
        expect(await this.newDropdownMenuButtonVagueDisadvantageSelection.isEnabled()).toBeTruthy();
    }

    get newDropdownMenuButtonSelectionNew() {
        return $('//input[@id="New:new"]');
    }

    async clickNewDropdownMenuButtonSelectionNew() {
        await this.newDropdownMenuButtonSelectionNew.click();
        expect(await this.newDropdownMenuButtonSelectionNew.isDisplayed()).toBeTruthy();
        expect(await this.newDropdownMenuButtonSelectionNew.isEnabled()).toBeTruthy();
    }

    get newDropdownMenuButtonSelectionLettersTestingP() {
        return $('//input[@id="New:letters testing p"]');
    }

    async clickNewDropdownMenuButtonSelectionLettersTestingP() {
        await this.newDropdownMenuButtonSelectionLettersTestingP.click();
        expect(await this.newDropdownMenuButtonSelectionLettersTestingP.isDisplayed()).toBeTruthy();
        expect(await this.newDropdownMenuButtonSelectionLettersTestingP.isEnabled()).toBeTruthy();
    }

    get newDropdownMenuButtonSelectionSecondaryStranger() {
        return $('//input[@id="New:secondary stranger"]');
    }

    async clickNewDropdownMenuButtonSelectionSecondaryStranger() {
        await this.newDropdownMenuButtonSelectionSecondaryStranger.click();
        expect(await this.newDropdownMenuButtonSelectionSecondaryStranger.isDisplayed()).toBeTruthy();
        expect(await this.newDropdownMenuButtonSelectionSecondaryStranger.isEnabled()).toBeTruthy();
    }

    get newDropdownMenuButtonSelectionAutomationStatus() {
        return $('//input[@id="New:automation status"]');
    }

    async clickNewDropdownMenuButtonSelectionAutomationStatus() {
        await this.newDropdownMenuButtonSelectionAutomationStatus.click();
        expect(await this.newDropdownMenuButtonSelectionAutomationStatus.isDisplayed()).toBeTruthy();
        expect(await this.newDropdownMenuButtonSelectionAutomationStatus.isEnabled()).toBeTruthy();
    }

    // ===================================
    // Active Engagements Dropdown Menu Button and Selections
    // ===================================

    get activeEngagementsDropdownMenuButton() {
        return $('//button[normalize-space()="Active"]');
    }

    async clickActiveEngagementsDropdownMenuButton() {
        await this.activeEngagementsDropdownMenuButton.click();
        expect(await this.activeEngagementsDropdownMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.activeEngagementsDropdownMenuButton.isEnabled()).toBeTruthy();
    }

    get activeEngagementsDropdownMenuButtonSelectionAutomationStatus() {
        return $('//input[@id="Active:Active"]');
    }

    async clickActiveEngagementsDropdownMenuButtonSelectionAutomationStatus() {
        await this.activeEngagementsDropdownMenuButtonSelectionAutomationStatus.click();
        expect(await this.activeEngagementsDropdownMenuButtonSelectionAutomationStatus.isDisplayed()).toBeTruthy();
        expect(await this.activeEngagementsDropdownMenuButtonSelectionAutomationStatus.isEnabled()).toBeTruthy();
    }

    get activeEngagementsDropdownMenuButtonSelectionActiveTest() {
        return $('//input[@id="Active:Active Test"]');
    }

    async clickActiveEngagementsDropdownMenuButtonSelectionActiveTest() {
        await this.activeEngagementsDropdownMenuButtonSelectionActiveTest.click();
        expect(await this.activeEngagementsDropdownMenuButtonSelectionActiveTest.isDisplayed()).toBeTruthy();
        expect(await this.activeEngagementsDropdownMenuButtonSelectionActiveTest.isEnabled()).toBeTruthy();
    }

    get activeEngagementsDropdownMenuButtonSelectionTestifyingSlashDepo() {
        return $('//input[@id="Active:Testifying/Depo"]');
    }

    async clickActiveEngagementsDropdownMenuButtonSelectionTestifyingSlashDepo() {
        await this.activeEngagementsDropdownMenuButtonSelectionTestifyingSlashDepo.click();
        expect(await this.activeEngagementsDropdownMenuButtonSelectionTestifyingSlashDepo.isDisplayed()).toBeTruthy();
        expect(await this.activeEngagementsDropdownMenuButtonSelectionTestifyingSlashDepo.isEnabled()).toBeTruthy();
    }

    get completedDropdownMenuButton() {
        return $('//button[normalize-space()="Completed"]');
    }

    async clickCompletedDropdownMenuButton() {
        await this.completedDropdownMenuButton.click();
        expect(await this.completedDropdownMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.completedDropdownMenuButton.isEnabled()).toBeTruthy();
    }

    get completedDropdownMenuButtonSelectionCompleted() {
        return $('//input[@id="Completed:CompletedTest"]');
    }   

    async clickCompletedDropdownMenuButtonSelectionCompleted() {    
        await this.completedDropdownMenuButtonSelectionCompleted.click();
        expect(await this.completedDropdownMenuButtonSelectionCompleted.isDisplayed()).toBeTruthy();
        expect(await this.completedDropdownMenuButtonSelectionCompleted.isEnabled()).toBeTruthy();  
    }

    get closedDropdownMenuButton() {
        return $('//button[normalize-space()="Closed"]');
    }

    async clickClosedDropdownMenuButton() {
        await this.closedDropdownMenuButton.click();
        expect(await this.closedDropdownMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.closedDropdownMenuButton.isEnabled()).toBeTruthy();
    }

    get closedDropdownMenuButtonSelectionClosedTest() {
        return $('//input[@id="Closed:ClosedTest"]');
    }

    get closedDropdownMenuButtonSelectionClosed() {
        return $('//input[@id="Closed:Closed"]');
    }

    async clickClosedDropdownMenuButtonSelectionClosed() {
        await this.closedDropdownMenuButtonSelectionClosed.click();
        expect(await this.closedDropdownMenuButtonSelectionClosed.isDisplayed()).toBeTruthy();
        expect(await this.closedDropdownMenuButtonSelectionClosed.isEnabled()).toBeTruthy();
    }

    get removedDropdownMenuButton() {
        return $('//button[normalize-space()="Removed"]');
    }

    async clickRemovedDropdownMenuButton() {
        await this.removedDropdownMenuButton.click();
        expect(await this.removedDropdownMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.removedDropdownMenuButton.isEnabled()).toBeTruthy();
    }

    get removedDropdownMenuButtonSelectionRemovedTest() {
        return $('//input[@id="Removed:RemovedTest"]');
    }

    async clickRemovedDropdownMenuButtonSelectionRemovedTest() {
        await this.removedDropdownMenuButtonSelectionRemovedTest.click();
        expect(await this.removedDropdownMenuButtonSelectionRemovedTest.isDisplayed()).toBeTruthy();
        expect(await this.removedDropdownMenuButtonSelectionRemovedTest.isEnabled()).toBeTruthy();
    }

    get descriptionAndOverviewFieldNameTextbox() {
        return $('[name="shortDescription.fieldName"]');
    }

    async clickDescriptionAndOverviewFieldNameTextbox() {
        await this.descriptionAndOverviewFieldNameTextbox.click();
        expect(await this.descriptionAndOverviewFieldNameTextbox.isDisplayed()).toBeTruthy();
        expect(await this.descriptionAndOverviewFieldNameTextbox.isEnabled()).toBeTruthy();
        const input = await $('[name="shortDescription.fieldName"]');

        // Clear existing text
        await input.clearValue()

        // Type it again
        await input.setValue("Description / Action / Proceeding")
    }

    get descriptionAndOverviewFieldNameDefaultTextTextbox() {
        return $('[name="shortDescription.fieldValue"]');
    }

    async clickDescriptionAndOverviewFieldNameDefaultTextTextbox() {
        await this.descriptionAndOverviewFieldNameDefaultTextTextbox.click();
        expect(await this.descriptionAndOverviewFieldNameDefaultTextTextbox.isDisplayed()).toBeTruthy();
        expect(await this.descriptionAndOverviewFieldNameDefaultTextTextbox.isEnabled()).toBeTruthy();
        const input = await this.descriptionAndOverviewFieldNameDefaultTextTextbox;
        await input.setValue("Enter a description, action, or proceeding for this case template.");
    }

    get overviewTextboxField() {
        return $('[name="overview"]');
    }

    async clickOverviewTextboxField() {
        await this.overviewTextboxField.click();
        expect(await this.overviewTextboxField.isDisplayed()).toBeTruthy();
        expect(await this.overviewTextboxField.isEnabled()).toBeTruthy();
        const input = await this.overviewTextboxField;
        await input.setValue("Quagmire is suing the Popeye's in downtown for giving him food poisoning at lunch on 1/1/2020 and the United States District Court for the Southern District of California is hearing the case and the judge is Judge Judy and the opposing counsel is Glenn Quagmire and the plaintiff's counsel is Tom Tucker and the case is about food poisoning and negligence and breach of warranty and the damages are $1,000,000 and the case number is 123456789 and the status of the case is Active and the priority of the case is High");
    }

    get initalNoteNoteTextboxField() {
        return $('#field-ro4__control');
    }

    async clickInitialNoteNoteTextboxField() {
        await this.initalNoteNoteTextboxField.click();
        expect(await this.initalNoteNoteTextboxField.isDisplayed()).toBeTruthy();
        expect(await this.initalNoteNoteTextboxField.isEnabled()).toBeTruthy();
        const input = await this.initalNoteNoteTextboxField;
        await input.setValue("This is the initial note for this case template.");
    }

    get engagementTemplateSelectTemplateDropdown() {
        return $('#field-ro7__control');
    }

    async clickEngagementTemplateSelectTemplateDropdown() {
        await this.engagementTemplateSelectTemplateDropdown.click();
        expect(await this.engagementTemplateSelectTemplateDropdown.isDisplayed()).toBeTruthy();
        expect(await this.engagementTemplateSelectTemplateDropdown.isEnabled()).toBeTruthy();
    }

    get selectTemplateCustomDashCopyButton() {
        return $('//button[contains(text(), "custom-Copy")]');
    }

    async clickSelectTemplateCustomDashCopyButton() {
        await this.selectTemplateCustomDashCopyButton.click();
        expect(await this.selectTemplateCustomDashCopyButton.isDisplayed()).toBeTruthy();
        expect(await this.selectTemplateCustomDashCopyButton.isEnabled()).toBeTruthy();
    }

    get selectTemplateNewCopyButton() {
        return $('//button[contains(text(), "new copy")]');
    }

    async clickSelectTemplateNewCopyButton() {
        await this.selectTemplateNewCopyButton.click();
        expect(await this.selectTemplateNewCopyButton.isDisplayed()).toBeTruthy();
        expect(await this.selectTemplateNewCopyButton.isEnabled()).toBeTruthy();
    }

    get selectTemplateEngagementToWhomMenuButton() {
        return $('//button[contains(text(), "Engagement? To whom?")]');
    }

    async clickSelectTemplateEngagementToWhomMenuButton() {
        await this.selectTemplateEngagementToWhomMenuButton.click();
        expect(await this.selectTemplateEngagementToWhomMenuButton.isDisplayed()).toBeTruthy();
        expect(await this.selectTemplateEngagementToWhomMenuButton.isEnabled()).toBeTruthy();
    }

    get selectTemplateCopyrightDashRetentionAgreementButton() {
        return $('//button[contains(text(), "Copyright-Dash Retention Agreement")]');
    }

    async clickSelectTemplateCopyrightDashRetentionAgreementButton() {
        await this.selectTemplateCopyrightDashRetentionAgreementButton.click();
        expect(await this.selectTemplateCopyrightDashRetentionAgreementButton.isDisplayed()).toBeTruthy();
        expect(await this.selectTemplateCopyrightDashRetentionAgreementButton.isEnabled()).toBeTruthy();
    }

    get selectTemplateStandardBillingAndPaymentTermsButton() {
        return $('//button[contains(text(), "Standard Billing and Payment Terms")]');
    }

    async clickSelectTemplateStandardBillingAndPaymentTermsButton() {
        await this.selectTemplateStandardBillingAndPaymentTermsButton.click();
        expect(await this.selectTemplateStandardBillingAndPaymentTermsButton.isDisplayed()).toBeTruthy();
        expect(await this.selectTemplateStandardBillingAndPaymentTermsButton.isEnabled()).toBeTruthy();
    }
    
    get addMilestoneButton() {
        return $('button[data-testid="link-button-Add Milestone"]');
    }

    async clickAddMilestoneButton() {
        await this.addMilestoneButton.click();
        expect(await this.addMilestoneButton.isDisplayed()).toBeTruthy();
        expect(await this.addMilestoneButton.isEnabled()).toBeTruthy();

        // START THE Create/Edit Milestone Pop UP Card and all the selectors here!!!!
    }

    get addEventButton() {
        return $('button[data-testid="link-button-Add Event"]');
    }

    async clickAddEventButton() {
        await this.addEventButton.click();
        expect(await this.addEventButton.isDisplayed()).toBeTruthy();
        expect(await this.addEventButton.isEnabled()).toBeTruthy();

        // START THE Create/Edit Milestone Pop UP Card and all the selectors here!!!!
    }

       get caseTypeDropdownMenuBtn() {
       return $('//input[@data-testid="case-type-combobox"]');
   }


   async clickCaseTypeDropdownMenuBtn() {
       await this.caseTypeDropdownMenuBtn.click();
   }


   async caseTypeDropdownMenuBtnShowsUp() {
       await expect(this.caseTypeDropdownMenuBtn).toBeDisplayed();
   }


   get bigZestyShreckDropdownOption() {
       return $('//input[@value="big zesty shrek"]');
   }
   async clickBigZestyShreckDropdownOption() {
       await this.bigZestyShreckDropdownOption.click();
   }


   async bigZestyShreckDropdownOptionShowsUp() {
       await expect(this.bigZestyShreckDropdownOption).toBeDisplayed();
   }


   get CaseType_1777908064990() {
       return $('//input[@value="Case Type_1777908064990"]');
   }


   async clickCaseType_1777908064990() {
       await this.CaseType_1777908064990.click();
   }


   async CaseType_1777908064990ShowsUp() {
       await expect(this.CaseType_1777908064990).toBeDisplayed();
   }


   get CaseType_1777908679399() {
       return $('//input[@value="Case Type_1777908679399"]');
   }


   async clickCaseType_1777908679399() {
       await this.CaseType_1777908679399.click();
   }


   async CaseType_1777908679399ShowsUp() {
       await expect(this.CaseType_1777908679399).toBeDisplayed();
   }


   get CaseType_1777909408167() {
       return $('//input[@value="Case Type_1777909408167"]');
   }


   async clickCaseType_1777909408167() {
       await this.CaseType_1777909408167.click();
   }


   async CaseType_1777909408167ShowsUp() {
       await expect(this.CaseType_1777909408167).toBeDisplayed();
   }


   get regularDropdownOption() {
       return $('//input[@value="Regular Dropdown Option"]');
   }


   async clickRegularDropdownOption() {
       await this.regularDropdownOption.click();
   }


   async regularDropdownOptionShowsUp() {
       await expect(this.regularDropdownOption).toBeDisplayed();
   }


   get allowedStatusesInfoIconButton() {
       return $('//button[@id="infolabel-r1e0__infoButton"]');
   }


   async clickAllowedStatusesInfoIconButton() {
       await this.allowedStatusesInfoIconButton.click();
   }


   get allowedStatusesInfoIconButtonShowsUp() {
       return $('//span[contains(text(), "Assign the allowed case statuses for all cases created with this template. Choose from a list of case statuses defined for your account.")]');
   }


   async allowedStatusesInfoIconButtonShowsUp() {
       await expect(this.allowedStatusesInfoIconButton).toBeDisplayed();
   }


   get allowedStatusesClickHereBtn() {
       return $('//button[@data-testid="edit-case-template-case-data-link"]');
   }


   async clickAllowedStatusesClickHereBtn() {
       await this.allowedStatusesClickHereBtn.click();
   }
   // EXPECT TO BE TAKEN BACK TO The Case Data Types PAGE AFTER CLICKING THE "Click here" LINK IN THE Allowed Statuses INFO ICON BUTTON TOOLTIP


   get creatSlashEditMilestoneMilestoneNameInputField() {
       return $('#field-rgo__control');
   }
  
   async enterMilestoneName(milestoneName) {
       await this.creatSlashEditMilestoneMilestoneNameInputField.setValue(milestoneName);
       await this.creatSlashEditMilestoneMilestoneNameInputField.waitForDisplayed();
       await this.creatSlashEditMilestoneMilestoneNameInputField.waitForEnabled();
       await expect(this.creatSlashEditMilestoneMilestoneNameInputField).toBeDisplayed();
       await expect(this.creatSlashEditMilestoneMilestoneNameInputField).toBeEnabled();
       const input = await $('#field-rgo__control')


       // Clear existing text
       await input.clearValue();


       // Type it again
       await input.setValue("Glenn Quagmire's Milestone");
   }
  
   get createSlashEditMilestoneDescriptionInputField() {
       return $('#field-r6o__control');
   }


   async enterMilestoneDescription(description) {
       await this.createSlashEditMilestoneDescriptionInputField.setValue(description);
       await this.createSlashEditMilestoneDescriptionInputField.waitForDisplayed();
       await this.createSlashEditMilestoneDescriptionInputField.waitForEnabled();
       await expect(this.createSlashEditMilestoneDescriptionInputField).toBeDisplayed();
       await expect(this.createSlashEditMilestoneDescriptionInputField).toBeEnabled();
       const input = await $('#field-r6o__control');


       // Clear existing text
       await input.clearValue();


       // Type it again
       await input.setValue("This is the description for Glenn Quagmire's Milestone");
   }


   get createSlashEditMilestoneDueDaysFromCreatedInputField() {
       return $('#field-r6n__control');
   }


   async enterMilestoneDueDaysFromCreated(days) {
       await this.createSlashEditMilestoneDueDaysFromCreatedInputField.setValue(days);
       await this.createSlashEditMilestoneDueDaysFromCreatedInputField.waitForDisplayed();
       await this.createSlashEditMilestoneDueDaysFromCreatedInputField.waitForEnabled();
       await expect(this.createSlashEditMilestoneDueDaysFromCreatedInputField).toBeDisplayed();
       await expect(this.createSlashEditMilestoneDueDaysFromCreatedInputField).toBeEnabled();
       const input = await $('#field-r6n__control');


       // Clear existing text
       await input.clearValue();


       // Type it again
       await input.setValue("5");
   }


   get createSlashEditMilestoneDeliverablesInputField() {
       return $('#field-r6p__control');
   }


   async enterMilestoneDeliverables(deliverables) {
       await this.createSlashEditMilestoneDeliverablesInputField.setValue(deliverables);
       await this.createSlashEditMilestoneDeliverablesInputField.waitForDisplayed();
       await this.createSlashEditMilestoneDeliverablesInputField.waitForEnabled();
       await expect(this.createSlashEditMilestoneDeliverablesInputField).toBeDisplayed();
       await expect(this.createSlashEditMilestoneDeliverablesInputField).toBeEnabled();
       const input = await $('#field-r6p__control');


       // Clear existing text
       await input.clearValue();


       // Type it again
       await input.setValue("These are the deliverables for Glenn Quagmire's Milestone");
   }


   get createSlashEditMilestoneAddEventButton() {
       return $('//label[@id="infolabel-r6u__label"]//button[@data-testid="link-button-Add Event"]');
   }


   async clickCreateSlashEditMilestoneAddEventButton() {
       await this.createSlashEditMilestoneAddEventButton.waitForDisplayed();
       await this.createSlashEditMilestoneAddEventButton.waitForEnabled();
       await expect(this.createSlashEditMilestoneAddEventButton).toBeDisplayed();
       await expect(this.createSlashEditMilestoneAddEventButton).toBeEnabled();
       await this.createSlashEditMilestoneAddEventButton.click();
   }


   get addEventCard() {
       return $('//div[contains(text(), "Add Event")]');
   }


   async addEventCardShowsUp() {  
       await expect(this.addEventCard).toBeDisplayed();
   }


   get addEventCardEventNameInputField() {
       return $('#field-r6v__control');
   }


   async enterAddEventCardEventName(eventName) {
       await this.addEventCardEventNameInputField.setValue(eventName);
       await this.addEventCardEventNameInputField.waitForDisplayed();
       await this.addEventCardEventNameInputField.waitForEnabled();
       await expect(this.addEventCardEventNameInputField).toBeDisplayed();
       await expect(this.addEventCardEventNameInputField).toBeEnabled();
       const input = await $('#field-r6v__control');


       // Clear existing text
       await input.clearValue();
       // Type it again
       await input.setValue("Glenn Quagmire's Event");
   }


   get daysFromCreatedAddEventCardInputField() {
       return $('#field-r8d__control');
   }


   async enterDaysFromCreatedAddEventCard(days) {
       await this.daysFromCreatedAddEventCardInputField.setValue(days);
       await this.daysFromCreatedAddEventCardInputField.waitForDisplayed();
       await this.daysFromCreatedAddEventCardInputField.waitForEnabled();
       await expect(this.daysFromCreatedAddEventCardInputField).toBeDisplayed();
       await expect(this.daysFromCreatedAddEventCardInputField).toBeEnabled();
       const input = await $('#field-r8d__control');


       // Clear existing text
       await input.clearValue();


       // Type it again
       await input.setValue("10");
   }


   get addEventIsDueDateCheckbox() {
       return $('#checkbox-r8e');
   }


   async clickAddEventIsDueDateCheckbox() {
       await this.addEventIsDueDateCheckbox.waitForDisplayed();
       await this.addEventIsDueDateCheckbox.waitForEnabled();
       await expect(this.addEventIsDueDateCheckbox).toBeDisplayed();
       await expect(this.addEventIsDueDateCheckbox).toBeEnabled();
       await this.addEventIsDueDateCheckbox.click();
   }


   get addEventDescriptionInputField() {
       return $('#field-r8f__control');
   }


   async enterAddEventDescription(description) {
       await this.addEventDescriptionInputField.setValue(description);
       await this.addEventDescriptionInputField.waitForDisplayed();
       await this.addEventDescriptionInputField.waitForEnabled();
       await expect(this.addEventDescriptionInputField).toBeDisplayed();
       await expect(this.addEventDescriptionInputField).toBeEnabled();
       const input = await $('#field-r8f__control');


       // Clear existing text
       await input.clearValue();


       // Type it again
       await input.setValue("This is the description for Glenn Quagmire's Event");
   }


   get addEventSaveEventTemplateButton() {
       return $('//button[@data-testid="event-template-dialog-save"]');
   }


   async clickAddEventSaveEventTemplateButton() {
       await this.addEventSaveEventTemplateButton.waitForDisplayed();
       await this.addEventSaveEventTemplateButton.waitForEnabled();
       await expect(this.addEventSaveEventTemplateButton).toBeDisplayed();
       await expect(this.addEventSaveEventTemplateButton).toBeEnabled();
       await this.addEventSaveEventTemplateButton.click();
   }


   get addEventCancelButton() {
       return $('//button[@data-testid="event-template-dialog-cancel"]');
   }


   async clickAddEventCancelButton() {
       await this.addEventCancelButton.waitForDisplayed();
       await this.addEventCancelButton.waitForEnabled();
       await expect(this.addEventCancelButton).toBeDisplayed();
       await expect(this.addEventCancelButton).toBeEnabled();
       await this.addEventCancelButton.click();   
   }


   get tasksAddTaskButton() {
       return $('//button[@data-testid="link-button-Add Task"]');
   }


   async clickTasksAddTaskButton() {
       await this.tasksAddTaskButton.waitForDisplayed();
       await this.tasksAddTaskButton.waitForEnabled();
       await expect(this.tasksAddTaskButton).toBeDisplayed();
       await expect(this.tasksAddTaskButton).toBeEnabled();
       await this.tasksAddTaskButton.click();
   }


   get addSlashEditTaskInMilestoneCard() {
       return $('//div[contains(text(), "Add/Edit Task in Milestone")]');
   }


   async addSlashEditTaskInMilestoneCardShowsUp() {
       await expect(this.addSlashEditTaskInMilestoneCard).toBeDisplayed();
   }


   get addSlashEditTaskInMilestoneBillableCheckboxButton() {
       return $('//button[@data-testid="task-template-dialog-billable-button"]');
   }


   async clickAddSlashEditTaskInMilestoneBillableCheckboxButton() {
       await this.addSlashEditTaskInMilestoneBillableCheckboxButton.waitForDisplayed();
       await this.addSlashEditTaskInMilestoneBillableCheckboxButton.waitForEnabled();
       await expect(this.addSlashEditTaskInMilestoneBillableCheckboxButton).toBeDisplayed();
       await expect(this.addSlashEditTaskInMilestoneBillableCheckboxButton).toBeEnabled();
       await this.addSlashEditTaskInMilestoneBillableCheckboxButton.click();
   }


   get addSlashEditTaskInMilestoneTaskToCompleteInputField() {
       return $('#field-r8p__control');
   }


   async enterAddSlashEditTaskInMilestoneTaskToComplete(task) {
       await this.addSlashEditTaskInMilestoneTaskToCompleteInputField.setValue(task);
       await this.addSlashEditTaskInMilestoneTaskToCompleteInputField.waitForDisplayed();
       await this.addSlashEditTaskInMilestoneTaskToCompleteInputField.waitForEnabled();
       await expect(this.addSlashEditTaskInMilestoneTaskToCompleteInputField).toBeDisplayed();
       await expect(this.addSlashEditTaskInMilestoneTaskToCompleteInputField).toBeEnabled();
       const input = await $('#field-r8p__control');


       // Clear existing text
       await input.clearValue();


       // Type it again
       await input.setValue("This is the task to complete for Glenn Quagmire's Task in Milestone");
   }


   get addSlashEditTaskInMilestoneSaveButton() {
       return $('//button[@data-testid="task-template-dialog-save-button"]');
   }


   async clickAddSlashEditTaskInMilestoneSaveButton() {   
       await this.addSlashEditTaskInMilestoneSaveButton.waitForDisplayed();
       await this.addSlashEditTaskInMilestoneSaveButton.waitForEnabled();
       await expect(this.addSlashEditTaskInMilestoneSaveButton).toBeDisplayed();
       await expect(this.addSlashEditTaskInMilestoneSaveButton).toBeEnabled();
       await this.addSlashEditTaskInMilestoneSaveButton.click();
   }


   get addSlashEditTaskInMilestoneCancelButton() {
       return $('//button[@data-testid="task-template-dialog-cancel-button"]');
   }


   async clickAddSlashEditTaskInMilestoneCancelButton() {
       await this.addSlashEditTaskInMilestoneCancelButton.waitForDisplayed();
       await this.addSlashEditTaskInMilestoneCancelButton.waitForEnabled();
       await expect(this.addSlashEditTaskInMilestoneCancelButton).toBeDisplayed();
       await expect(this.addSlashEditTaskInMilestoneCancelButton).toBeEnabled();
       await this.addSlashEditTaskInMilestoneCancelButton.click();
   }


   get createSlashEditMilestoneAddEventThreeDotsButton() {
       return $('//button[@aria-label="More items"]');
   }


   async clickCreateSlashEditMilestoneAddEventThreeDotsButton() {
       await this.createSlashEditMilestoneAddEventThreeDotsButton.waitForDisplayed();
       await this.createSlashEditMilestoneAddEventThreeDotsButton.waitForEnabled();
       await expect(this.createSlashEditMilestoneAddEventThreeDotsButton).toBeDisplayed();
       await expect(this.createSlashEditMilestoneAddEventThreeDotsButton).toBeEnabled();
       await this.createSlashEditMilestoneAddEventThreeDotsButton.click();
   }


   get creatSlashEditMilestoneAddEventThreeDotButtonEditOption() {
       return $('//div[@data-testid="custom-data-table-context-menu-item-Edit"]');
   }


   async clickCreatSlashEditMilestoneAddEventThreeDotButtonEditOption() {
       await this.creatSlashEditMilestoneAddEventThreeDotButtonEditOption.waitForDisplayed();
       await this.creatSlashEditMilestoneAddEventThreeDotButtonEditOption.waitForEnabled();
       await expect(this.creatSlashEditMilestoneAddEventThreeDotButtonEditOption).toBeDisplayed();
       await expect(this.creatSlashEditMilestoneAddEventThreeDotButtonEditOption).toBeEnabled();
       await this.creatSlashEditMilestoneAddEventThreeDotButtonEditOption.click();
   }


   get creatSlashEditMilestoneAddEventThreeDotButtonRemoveOption() {
       return $('//div[@data-testid="custom-data-table-context-menu-item-Remove"]');
   }


   async clickCreatSlashEditMilestoneAddEventThreeDotButtonRemoveOption() {
       await this.creatSlashEditMilestoneAddEventThreeDotButtonRemoveOption.waitForDisplayed();
       await this.creatSlashEditMilestoneAddEventThreeDotButtonRemoveOption.waitForEnabled();
       await expect(this.creatSlashEditMilestoneAddEventThreeDotButtonRemoveOption).toBeDisplayed();
       await expect(this.creatSlashEditMilestoneAddEventThreeDotButtonRemoveOption).toBeEnabled();
       await this.creatSlashEditMilestoneAddEventThreeDotButtonRemoveOption.click();
   }


   get confirmRemovelOfEventFromMilestoneYesButton() {
       return $('//button[@data-testid="confirmation-dialog-confirm-button"]');
   }


   async clickConfirmRemovelOfEventFromMilestoneYesButton() {
       await this.confirmRemovelOfEventFromMilestoneYesButton.waitForDisplayed();
       await this.confirmRemovelOfEventFromMilestoneYesButton.waitForEnabled();
       await expect(this.confirmRemovelOfEventFromMilestoneYesButton).toBeDisplayed();
       await expect(this.confirmRemovelOfEventFromMilestoneYesButton).toBeEnabled();
       await this.confirmRemovelOfEventFromMilestoneYesButton.click();
   }


    get confirmRemovelOfEventFromMilestoneNoButton() {
       return $('//button[@data-testid="confirmation-dialog-cancel-button"]');
   }


   async clickConfirmRemovelOfEventFromMilestoneNoButton() {
       await this.confirmRemovelOfEventFromMilestoneNoButton.waitForDisplayed();
       await this.confirmRemovelOfEventFromMilestoneNoButton.waitForEnabled();
       await expect(this.confirmRemovelOfEventFromMilestoneNoButton).toBeDisplayed();
       await expect(this.confirmRemovelOfEventFromMilestoneNoButton).toBeEnabled();
       await this.confirmRemovelOfEventFromMilestoneNoButton.click();
   }


   get createSlashEditMilestoneAddTaskThreeDotsButton() {
       return $('//div[@role="row"][.//span[normalize-space()="dfsd"]]//button[@aria-label="More items"]');
   }


   async clickCreateSlashEditMilestoneAddTaskThreeDotsButton() {
       await this.createSlashEditMilestoneAddTaskThreeDotsButton.waitForDisplayed();
       await this.createSlashEditMilestoneAddTaskThreeDotsButton.waitForEnabled();
       await expect(this.createSlashEditMilestoneAddTaskThreeDotsButton).toBeDisplayed();
       await expect(this.createSlashEditMilestoneAddTaskThreeDotsButton).toBeEnabled();
       await this.createSlashEditMilestoneAddTaskThreeDotsButton.click();
   }


   get creatSlashEditMilestoneAddTaskThreeDotButtonEditOption() {
       return $('//div[@data-testid="custom-data-table-context-menu-item-Edit"]');
   }


   async clickCreatSlashEditMilestoneAddTaskThreeDotButtonEditOption() {
       await this.creatSlashEditMilestoneAddTaskThreeDotButtonEditOption.waitForDisplayed();
       await this.creatSlashEditMilestoneAddTaskThreeDotButtonEditOption.waitForEnabled();
       await expect(this.creatSlashEditMilestoneAddTaskThreeDotButtonEditOption).toBeDisplayed();
       await expect(this.creatSlashEditMilestoneAddTaskThreeDotButtonEditOption).toBeEnabled();
       await this.creatSlashEditMilestoneAddTaskThreeDotButtonEditOption.click(); 
   }


   get creatSlashEditMilestoneAddTaskThreeDotButtonRemoveOption() {
       return $('//div[@data-testid="custom-data-table-context-menu-item-Remove"]');
   }
  
   async clickCreatSlashEditMilestoneAddTaskThreeDotButtonRemoveOption() {
       await this.creatSlashEditMilestoneAddTaskThreeDotButtonRemoveOption.waitForDisplayed();
       await this.creatSlashEditMilestoneAddTaskThreeDotButtonRemoveOption.waitForEnabled();
       await expect(this.creatSlashEditMilestoneAddTaskThreeDotButtonRemoveOption).toBeDisplayed();
       await expect(this.creatSlashEditMilestoneAddTaskThreeDotButtonRemoveOption).toBeEnabled();
       await this.creatSlashEditMilestoneAddTaskThreeDotButtonRemoveOption.click();
   }

   get createSlashEditMilestoneSubmitButton() {
       return $('//button[@data-testid="milestone-template-submit-button"]');
   }
  
   async clickCreateSlashEditMilestoneSubmitButton() {
       await this.createSlashEditMilestoneSubmitButton.waitForDisplayed();
       await this.createSlashEditMilestoneSubmitButton.waitForEnabled();
       await expect(this.createSlashEditMilestoneSubmitButton).toBeDisplayed();
       await expect(this.createSlashEditMilestoneSubmitButton).toBeEnabled();
       await this.createSlashEditMilestoneSubmitButton.click();
   }


    get createSlashEditMilestoneCancelButton() {
       return $('//button[@data-testid="milestone-template-cancel-button"]');
   }

   async clickCreateSlashEditMilestoneCancelButton() {
       await this.createSlashEditMilestoneCancelButton.waitForDisplayed();
       await this.createSlashEditMilestoneCancelButton.waitForEnabled();
       await expect(this.createSlashEditMilestoneCancelButton).toBeDisplayed();
       await expect(this.createSlashEditMilestoneCancelButton).toBeEnabled();
       await this.createSlashEditMilestoneCancelButton.click();
   }

   // Now onto the Add/Edit Case Template form for the Events Add Event button to fill out that card next!

   get addSlashEditCaseTemplaeMainCardAddEventButton() {
       return $('//button[@data-testid="link-button-Add Event"]');
   }


   async clickAddSlashEditCaseTemplaeMainCardAddEventButton() {
       await this.addSlashEditCaseTemplaeMainCardAddEventButton.waitForDisplayed();
       await this.addSlashEditCaseTemplaeMainCardAddEventButton.waitForEnabled();
       await expect(this.addSlashEditCaseTemplaeMainCardAddEventButton).toBeDisplayed();
       await expect(this.addSlashEditCaseTemplaeMainCardAddEventButton).toBeEnabled();
       await this.addSlashEditCaseTemplaeMainCardAddEventButton.click();
   }

    get addSlashEditCaseTemplaeMainCardAddEventCard() {
       return $('//div[contains(text(), "Add Event")]');
   }


   async addSlashEditCaseTemplaeMainCardAddEventCardShowsUp() {
       await expect(this.addSlashEditCaseTemplaeMainCardAddEventCard).toBeDisplayed();
   }

// ================================
// Start here WIth part of the test
// ================================

   get addEditEventPopUpCard() {
       return $('//div[contains(text(), "Edit Event")]');
   }
   
   async addEditEventPopUpCardShowsUp() {
       await expect(this.addEditEventPopUpCard).toBeDisplayed();
   }

   get addEventPopUpCardEventNameInputField() {
       return $('#field-ri6__control');
   }

   async enterAddEventPopUpCardEventName(eventName) {
       await this.addEventPopUpCardEventNameInputField.setValue(eventName);
       await this.addEventPopUpCardEventNameInputField.waitForDisplayed();
       await this.addEventPopUpCardEventNameInputField.waitForEnabled();
       await expect(this.addEventPopUpCardEventNameInputField).toBeDisplayed();
       await expect(this.addEventPopUpCardEventNameInputField).toBeEnabled();
       const input = await $('#field-ri6__control');


       // Clear existing text
       await input.clearValue();


       // Type it again
       await input.setValue("Glenn Quagmire's Event from Main Card");
   }


    get daysFromCreatedAddEventPopUpCardInputField() {
       return $('#field-r8d__control');
   }

   async enterDaysFromCreatedAddEventPopUpCard(days) {
       await this.daysFromCreatedAddEventPopUpCardInputField.setValue(days);
       await this.daysFromCreatedAddEventPopUpCardInputField.waitForDisplayed();
       await this.daysFromCreatedAddEventPopUpCardInputField.waitForEnabled();
       await expect(this.daysFromCreatedAddEventPopUpCardInputField).toBeDisplayed();
       await expect(this.daysFromCreatedAddEventPopUpCardInputField).toBeEnabled();
       const input = await $('#field-ri7__control');


       // Clear existing text
       await input.clearValue();


       // Type it again
       await input.setValue("15");
   }

    get addEventPopUpCardIsDueDateCheckbox() {
       return $('#checkbox-ri8');
   }

   async clickAddEventPopUpCardIsDueDateCheckbox() {
       await this.addEventPopUpCardIsDueDateCheckbox.waitForDisplayed();
       await this.addEventPopUpCardIsDueDateCheckbox.waitForEnabled();
       await expect(this.addEventPopUpCardIsDueDateCheckbox).toBeDisplayed();
       await expect(this.addEventPopUpCardIsDueDateCheckbox).toBeEnabled();
       await this.addEventPopUpCardIsDueDateCheckbox.click();
   }

    get addEventPopUpCardDescriptionInputField() {
       return $('#field-ri9__control');
   }

   async enterAddEventPopUpCardDescription(description) {
       await this.addEventPopUpCardDescriptionInputField.setValue(description);
       await this.addEventPopUpCardDescriptionInputField.waitForDisplayed();
       await this.addEventPopUpCardDescriptionInputField.waitForEnabled();
       await expect(this.addEventPopUpCardDescriptionInputField).toBeDisplayed();
       await expect(this.addEventPopUpCardDescriptionInputField).toBeEnabled();
       const input = await $('#field-ri9__control');

       // Clear existing text
       await input.clearValue();

       // Type it again
       await input.setValue("This is the description for Glenn Quagmire's Event from the Main Card");
   }

    get addEventPopUpCardSaveEventTemplateButton() {
       return $('//button[@data-testid="event-template-dialog-save"]');
   }

   async clickAddEventPopUpCardSaveEventTemplateButton() {
       await this.addEventPopUpCardSaveEventTemplateButton.waitForDisplayed();
       await this.addEventPopUpCardSaveEventTemplateButton.waitForEnabled();
       await expect(this.addEventPopUpCardSaveEventTemplateButton).toBeDisplayed();
       await expect(this.addEventPopUpCardSaveEventTemplateButton).toBeEnabled();
       await this.addEventPopUpCardSaveEventTemplateButton.click();
   }

    get addEventPopUpCardCancelButton() {
       return $('//button[@data-testid="event-template-dialog-cancel"]');
   }

   async clickAddEventPopUpCardCancelButton() {
       await this.addEventPopUpCardCancelButton.waitForDisplayed();
       await this.addEventPopUpCardCancelButton.waitForEnabled();
       await expect(this.addEventPopUpCardCancelButton).toBeDisplayed();
       await expect(this.addEventPopUpCardCancelButton).toBeEnabled();
       await this.addEventPopUpCardCancelButton.click();
   }

   get addSlashEditCaseTemplateMainPageSaveButtonAtTopPage(){
        return $('//button[@data-testid="edit-case-template-save-button"]');
   }

    async clickAddSlashEditCaseTemplateMainPageSaveButtonAtTopPage() {
        await this.addSlashEditCaseTemplateMainPageSaveButtonAtTopPage.waitForDisplayed();
        await this.addSlashEditCaseTemplateMainPageSaveButtonAtTopPage.waitForEnabled();
        await expect(this.addSlashEditCaseTemplateMainPageSaveButtonAtTopPage).toBeDisplayed();
        await expect(this.addSlashEditCaseTemplateMainPageSaveButtonAtTopPage).toBeEnabled();
        await this.addSlashEditCaseTemplateMainPageSaveButtonAtTopPage.click();
    }

    get addSlashEditCaseTemplateMainPageCancelButtonAtTopPage(){
        return $('//button[@data-testid="edit-case-template-cancel-button"]');
    }

    async clickAddSlashEditCaseTemplateMainPageCancelButtonAtTopPage() {
        await this.addSlashEditCaseTemplateMainPageCancelButtonAtTopPage.waitForDisplayed();
        await this.addSlashEditCaseTemplateMainPageCancelButtonAtTopPage.waitForEnabled();
        await expect(this.addSlashEditCaseTemplateMainPageCancelButtonAtTopPage).toBeDisplayed();
        await expect(this.addSlashEditCaseTemplateMainPageCancelButtonAtTopPage).toBeEnabled();
        await this.addSlashEditCaseTemplateMainPageCancelButtonAtTopPage.click();
    }

    get addSlashEditCaseTemplateBackToCaseTemplatesButton() {
        return $('//button[contains(text(), "Back to Case Templates")]');
    }

    async clickAddSlashEditCaseTemplateBackToCaseTemplatesButton() {
        await this.addSlashEditCaseTemplateBackToCaseTemplatesButton.waitForDisplayed();
        await this.addSlashEditCaseTemplateBackToCaseTemplatesButton.waitForEnabled();
        await expect(this.addSlashEditCaseTemplateBackToCaseTemplatesButton).toBeDisplayed();
        await expect(this.addSlashEditCaseTemplateBackToCaseTemplatesButton).toBeEnabled();
        await this.addSlashEditCaseTemplateBackToCaseTemplatesButton.click();
    }

    // ===================================
    // Case Templates Page Select an Already Built Template to Create a New Case Tests Start Here
    // ===================================

    get blackWidowTemplateRow() {
        return $('//div[@role="row"][.//span[normalize-space()="Black Widow Template"]]');
    }

    async clickBlackWidowTemplateRow() {
        await this.blackWidowTemplateRow.waitForDisplayed();
        await this.blackWidowTemplateRow.waitForEnabled();
        await expect(this.blackWidowTemplateRow).toBeDisplayed();
        await expect(this.blackWidowTemplateRow).toBeEnabled();
    }

    get blackWidowTemplateRowThreeDotsButton() {
        return $('//div[@role="row"][.//span[normalize-space()="Black Widow Template"]]//button[@aria-label="More items"]');
    }

    async clickBlackWidowTemplateRowThreeDotsButton() {
        await this.blackWidowTemplateRowThreeDotsButton.waitForDisplayed();
        await this.blackWidowTemplateRowThreeDotsButton.waitForEnabled();
        await expect(this.blackWidowTemplateRowThreeDotsButton).toBeDisplayed();
        await expect(this.blackWidowTemplateRowThreeDotsButton).toBeEnabled();
        await this.blackWidowTemplateRowThreeDotsButton.click();
    }

    get blackWidowTemplateRowThreeDotsButtonUseTemplateCopyOption() {
        return $('//div[@data-testid="custom-data-table-context-menu-item-Copy"]');
    
    }
    
    async clickBlackWidowTemplateRowThreeDotsButtonUseTemplateCopyOption() {
        await this.blackWidowTemplateRowThreeDotsButtonUseTemplateCopyOption.waitForDisplayed();
        await this.blackWidowTemplateRowThreeDotsButtonUseTemplateCopyOption.waitForEnabled();
        await expect(this.blackWidowTemplateRowThreeDotsButtonUseTemplateCopyOption).toBeDisplayed();
        await expect(this.blackWidowTemplateRowThreeDotsButtonUseTemplateCopyOption).toBeEnabled();
        await this.blackWidowTemplateRowThreeDotsButtonUseTemplateCopyOption.click();
    }

    get blackWidowTemplateConfirmCopyPopUpCard() {
        return $('//div[contains(text(), "Confirm Copy")]');
    }

    async blackWidowTemplateConfirmCopyPopUpCardShowsUp() {
        await expect(this.blackWidowTemplateConfirmCopyPopUpCard).toBeDisplayed();
    }

    get blackWidowTemplateConfirmCopyPopUpCardYesButton() {
        return $('//button[@data-testid="confirmation-dialog-confirm-button"]');
    }

    async clickBlackWidowTemplateConfirmCopyPopUpCardYesButton() {
        await this.blackWidowTemplateConfirmCopyPopUpCardYesButton.waitForDisplayed();
        await this.blackWidowTemplateConfirmCopyPopUpCardYesButton.waitForEnabled();
        await expect(this.blackWidowTemplateConfirmCopyPopUpCardYesButton).toBeDisplayed();
        await expect(this.blackWidowTemplateConfirmCopyPopUpCardYesButton).toBeEnabled();
        await this.blackWidowTemplateConfirmCopyPopUpCardYesButton.click();
    }

    get blackWidowTemplateConfirmCopyPopUpCardNoButton() {
        return $('//button[@data-testid="confirmation-dialog-cancel-button"]');
    }

    async clickBlackWidowTemplateConfirmCopyPopUpCardNoButton() {
        await this.blackWidowTemplateConfirmCopyPopUpCardNoButton.waitForDisplayed();
        await this.blackWidowTemplateConfirmCopyPopUpCardNoButton.waitForEnabled(); 
        await expect(this.blackWidowTemplateConfirmCopyPopUpCardNoButton).toBeDisplayed();
        await expect(this.blackWidowTemplateConfirmCopyPopUpCardNoButton).toBeEnabled();
        await this.blackWidowTemplateConfirmCopyPopUpCardNoButton.click();
    }

    // ====================================
    // Editing portions of the Black Widow Template Tests Start Here
    // ====================================

    get blackWidowTemplateRowThreeDotsButtonEditButton() {
        return $('//div[@data-testid="custom-data-table-context-menu-item-Edit"]');
    }

    async clickBlackWidowTemplateRowThreeDotsButtonEditButton() {
        await this.blackWidowTemplateRowThreeDotsButtonEditButton.waitForDisplayed();
        await this.blackWidowTemplateRowThreeDotsButtonEditButton.waitForEnabled();
        await expect(this.blackWidowTemplateRowThreeDotsButtonEditButton).toBeDisplayed();
        await expect(this.blackWidowTemplateRowThreeDotsButtonEditButton).toBeEnabled();
        await this.blackWidowTemplateRowThreeDotsButtonEditButton.click();
    }

    // ====================================

    get blackWidowTemplateRowThreeDotsButtonDeleteOption() {
        return $('//div[@data-testid="custom-data-table-context-menu-item-Delete"]');
    }

    async clickBlackWidowTemplateRowThreeDotsButtonDeleteOption() {
        await this.blackWidowTemplateRowThreeDotsButtonDeleteOption.waitForDisplayed();
        await this.blackWidowTemplateRowThreeDotsButtonDeleteOption.waitForEnabled();
        await expect(this.blackWidowTemplateRowThreeDotsButtonDeleteOption).toBeDisplayed();
        await expect(this.blackWidowTemplateRowThreeDotsButtonDeleteOption).toBeEnabled();
        await this.blackWidowTemplateRowThreeDotsButtonDeleteOption.click();
    }
}

export default new DashboardTemplatesPage();
