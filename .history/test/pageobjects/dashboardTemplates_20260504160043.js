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
        await input.setValue("Quagmire is suing the Popeye's in downtown for giving him food poisoning at lunch on 1/1/2020 and the United States District Court for the Southern District of California is hearing the case and the judge is Judge Judy and the opposing counsel is Glenn Quagmire and the plaintiff's counsel is Tom Tucker and the case is about food poisoning and negligence and breach of warranty and the damages are $1,000,000 and the case number is 123456789 and the status of the case is Active and the priority of the case is High");
    }

    get overviewTextboxField() {
        return $('[name="overview"]');
    }
}

export default new DashboardTemplatesPage();
