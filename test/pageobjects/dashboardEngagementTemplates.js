import { $, expect } from "@wdio/globals";
import Page from "./page.js";

class DashboardEngagementTemplates extends Page {
    get dashboardEngagementTemplatesHeader() {
        return $("//span[contains(@class, 'fui-Subtitle1') and normalize-space(.)='Engagement Templates']");
    }

    async verifyDashboardEngagementTemplatesHeader() {
        await expect(this.dashboardEngagementTemplatesHeader).toBeDisplayed();
        await expect(this.dashboardEngagementTemplatesHeader).toHaveText("Engagement Templates");
        await expect(this.dashboardEngagementTemplatesHeader).toHaveClassContaining("fui-Subtitle1");
    }

    get engagementTemplatesNewTemplateButton() {
        return $('//button[@data-testid="engagement-templates-new-template-button"]');
    }

    async clickNewTemplateButton() {
        await this.engagementTemplatesNewTemplateButton.click();
        await browser.pause(2000);
        await expect(page.pageHeader).toBeDisplayed();
        await expect(page.pageHeader).toHaveText("Add/Edit Engagement Template");
    }

    get addSlashEditEngagementTemplatePageHeader() {
        return $("//span[contains(@class, 'fui-Subtitle1') and normalize-space(.)='Add/Edit Engagement Template']");
    }

    async verifyAddSlashEditEngagementTemplatePageHeader() {
        await expect(this.addSlashEditEngagementTemplatePageHeader).toBeDisplayed();
        await expect(this.addSlashEditEngagementTemplatePageHeader).toHaveText("Add/Edit Engagement Template");
        await expect(this.addSlashEditEngagementTemplatePageHeader).toHaveClassContaining("fui-Subtitle1");
    }

    get addSlashEditEngagementTemplatePageTemplateNameInputField() {
        return $('#field-r1pg__control');
    }

    async enterTemplateName(templateName) {
        await this.addSlashEditEngagementTemplatePageTemplateNameInputField.setValue(templateName);
        await expect(this.addSlashEditEngagementTemplatePageTemplateNameInputField).toHaveValue(templateName);
        await browser.pause(1000);
        await this.addSlashEditEngagementTemplatePageTemplateNameInputField.setValue("Giggity Quagmire Goo The 3rd");
        await expect(this.addSlashEditEngagementTemplatePageTemplateNameInputField).toHaveValue("Giggity Quagmire Goo The 3rd");
    }

    get addSlashEditEngagementTemplatePageTemplateDescriptionInputField() {
        return $('#field-r1pi__control');
    }

    async enterTemplateDescription(templateDescription) {
        await this.addSlashEditEngagementTemplatePageTemplateDescriptionInputField.setValue(templateDescription);
        await expect(this.addSlashEditEngagementTemplatePageTemplateDescriptionInputField).toHaveValue(templateDescription);
        await browser.pause(1000);
        await this.addSlashEditEngagementTemplatePageTemplateDescriptionInputField.setValue("Quagmire Giggity Goo The 3rd is having a party");
        await expect(this.addSlashEditEngagementTemplatePageTemplateDescriptionInputField).toHaveValue("Quagmire Giggity Goo The 3rd is having a party");
    }

    get addSlashEditEngagementTemplatePageDocumentTitleInputField() {
        return $('#field-r1ph__control');
    }

    async enterDocumentTitle(documentTitle) {
        await this.addSlashEditEngagementTemplatePageDocumentTitleInputField.setValue(documentTitle);
        await expect(this.addSlashEditEngagementTemplatePageDocumentTitleInputField).toHaveValue(documentTitle);
        await browser.pause(1000);
        await this.addSlashEditEngagementTemplatePageDocumentTitleInputField.setValue("Giggity Goo");
        await expect(this.addSlashEditEngagementTemplatePageDocumentTitleInputField).toHaveValue("Giggity Goo");
    }

    get addSlashEditEngagementTemplatePageAddSignaturesInfoIconButton() {
        return $('#infolabel-r1pk__infoButton');
    }

    async clickAddSignaturesInfoIconButton() {
        await this.addSlashEditEngagementTemplatePageAddSignaturesInfoIconButton.click();
        await browser.pause(1000);
        await expect(this.addSlashEditEngagementTemplatePageAddSignaturesInfoIconButton).toHaveAttribute("aria-expanded", "true");
    }

    get addSlashEditEngagementTemplatePageAddSignaturesCheckboxButton() {
        return $('#checkbox-r1pj');
    }

    async clickAddSignaturesCheckboxButton() {
        await this.addSlashEditEngagementTemplatePageAddSignaturesCheckboxButton.click();
        await browser.pause(1000);
        await expect(this.addSlashEditEngagementTemplatePageAddSignaturesCheckboxButton).toBeSelected();
        await this.addSlashEditEngagementTemplatePageAddSignaturesCheckboxButton.click();
        await browser.pause(1000);
        await expect(this.addSlashEditEngagementTemplatePageAddSignaturesCheckboxButton).not.toBeSelected();
    }

    get addSlashEditEngagementTemplatePageAddFieldDropdownMenuButton() {
        return $('//button[@data-testid="add-engagement-field-dropdown-trigger"]');
    }

    async clickAddFieldDropdownMenuButton() {
        await this.addSlashEditEngagementTemplatePageAddFieldDropdownMenuButton.click();
        await browser.pause(1000);
        await expect(this.addSlashEditEngagementTemplatePageAddFieldDropdownMenuButton).toHaveAttribute("aria-expanded", "true");
        await this.addSlashEditEngagementTemplatePageAddFieldDropdownMenuButton.click();  
        await browser.pause(1000);
        await expect(this.addSlashEditEngagementTemplatePageAddFieldDropdownMenuButton).toHaveAttribute("aria-expanded", "false");
    }

    get addFieldCustomFieldOption() {
        return $('//div[@data-testid="add-engagement-field-dropdown-custom-item"]');
    }

    async clickAddFieldCustomFieldOption() {
        await this.addFieldCustomFieldOption.click();
        await browser.pause(1000);
        await expect(this.addFieldCustomFieldOption).toHaveClassContaining("fui-MenuItem--active");
    }

    get customFiledButtonFieldNameInput() {
        return $('#field-r1pt__control');
    }

    async enterCustomFieldButtonFieldName(fieldName) {
        await this.customFiledButtonFieldNameInput.setValue(fieldName);
        await expect(this.customFiledButtonFieldNameInput).toHaveValue(fieldName);
        await browser.pause(1000);
        await this.customFiledButtonFieldNameInput.setValue("Giggity Field");
        await expect(this.customFiledButtonFieldNameInput).toHaveValue("Giggity Field");
    }

    get addFieldObjectivesOption() {
        return $('//div[@data-testid="add-engagement-field-dropdown-item-objectives"]');
    }

    async clickAddFieldObjectivesOption() {
        await this.addFieldObjectivesOption.click();
        await browser.pause(1000);
        await expect(this.addFieldObjectivesOption).toHaveClassContaining("fui-MenuItem--active");
    }

    get addFieldObjectivesOptionInputTextField() {
        return $('#field-r1qh__control');
    }

    async enterAddFieldObjectivesOptionInputTextField(objectivesText) {
        await this.addFieldObjectivesOptionInputTextField.setValue(objectivesText);
        await expect(this.addFieldObjectivesOptionInputTextField).toHaveValue(objectivesText);
        await browser.pause(1000);
        await this.addFieldObjectivesOptionInputTextField.setValue("Giggity Objectives");
        await expect(this.addFieldObjectivesOptionInputTextField).toHaveValue("Giggity Objectives");
    }

     get engagementTemplatesHeader() {
          return $('//span[contains(@class, "fui-Subtitle1") and normalize-space(.)="Engagement Templates"] | //h1[normalize-space(.)="Engagement Templates"]');
   }


    async login() {
           await theSignInPage.open();
           await theSignInPage.login(users.admin.username, users.admin.password);
           await dashboardPage.waitForDashboardToLoad();
       }
  
       async navigateToCaseTemplates() {
           await expect(browser).toHaveUrlContaining('thecasework.com');
       }
  
       get caseTemplatesInfoIconButton() {
           return $('selector-for-case-templates-info-icon-button');
       }
  
       async clickCaseTemplatesInfoIconButton() {
           await this.caseTemplatesInfoIconButton.click();
       }


   get engagementTempatesButton() {
       return $('//button[@data-testid="templates-engagement-templates-tab"]');
   }
  
   async clickEngagementTemplatesButton() {
       await this.engagementTempatesButton.click();
   }


    async verifyEngagementTemplatesHeader() {
           await expect(this.engagementTemplatesHeader).toBeDisplayed();
       }
   get engagementTemplatesInfoIconButton() {
         return $('//*[contains(normalize-space(.),"Engagement Templates")]/ancestor::*[1]//button[contains(@id,"__infoButton")] | //button[@data-testid="engagement-templates-info-button"] | //button[contains(@id,"__infoButton")][1]');
   }


   async clickEngagementTemplatesInfoIconButton() {
       await this.engagementTemplatesInfoIconButton.click();
   }


   async verifyEngagementTemplatesInfoModal() {
       const infoModal = $('//span[contains(text(), "Create templates for engagement documents used with specific case types.")]');
       await expect(infoModal).toBeDisplayed();
   }


   get engagementTemplatesNewTemplateButton() {
       return $('//button[@data-testid="engagement-templates-new-template-button"]');
   }


   async clickEngagementTemplatesNewTemplateButton() {
       await this.engagementTemplatesNewTemplateButton.click();
   }


   async verifyEngagementTemplatesNewTemplateModal() {
           const newTemplateModal = $('//span[contains(text(), "Add/Edit Engagement Template")]');
           await expect(newTemplateModal).toBeDisplayed();
       }
  
   get engagementTemplatesNewTemplateNameInput() {
         return $('//input[@data-testid="edit-engagement-template-name-input"] | //input[@data-testid="edit-engagement-template-document-title-input"]/preceding::input[1] | //input[contains(@id,"__control")][1]');
   }


   async enterEngagementTemplatesNewTemplateName(TheBestTemplate) {
       await this.engagementTemplatesNewTemplateNameInput.setValue(TheBestTemplate);
   }


   get engagementTemplatesAddSlashEditEngagementTemplateTemplateDescriptionInput() {
       return $('//textarea[@data-testid="edit-engagement-template-description-input"]');
   }


   async enterEngagementTemplatesAddSlashEditEngagementTemplateTemplateDescription(TheBestTemplateDescription) {
       await this.engagementTemplatesAddSlashEditEngagementTemplateTemplateDescriptionInput.setValue(TheBestTemplateDescription);
   }


    async verifyEngagementTemplatesNewTemplateNameInputValue(expectedValue) {
           await expect(this.engagementTemplatesNewTemplateNameInput).toHaveValue(expectedValue);
       }


    async verifyEngagementTemplatesAddSlashEditEngagementTemplateTemplateDescriptionInputValue(expectedValue) {
           await expect(this.engagementTemplatesAddSlashEditEngagementTemplateTemplateDescriptionInput).toHaveValue(expectedValue);
       }
  
   get engagementTemplatesAddSlashEditEngagementTemplateDocumentTitleInput() {
         return $('//input[@data-testid="edit-engagement-template-document-title-input"] | //input[@data-testid="edit-engagement-template-title-input"]');
   }


   async enterEngagementTemplatesAddSlashEditEngagementTemplateDocumentTitle(TheBestTemplateDocumentTitle) {
       await this.engagementTemplatesAddSlashEditEngagementTemplateDocumentTitleInput.setValue(TheBestTemplateDocumentTitle);
   }


    async verifyEngagementTemplatesAddSlashEditEngagementTemplateDocumentTitleInputValue(expectedValue) {
           await expect(this.engagementTemplatesAddSlashEditEngagementTemplateDocumentTitleInput).toHaveValue(expectedValue);
       }


   get engagementTemplatesAddSlashEditEnagementTemplateAddSignaturesInfoIconButton() {
       return $('#infolabel-rbm__infoButton');
   }


   async clickEngagementTemplatesAddSlashEditEnagementTemplateAddSignaturesInfoIconButton() {
       await this.engagementTemplatesAddSlashEditEnagementTemplateAddSignaturesInfoIconButton.click();
   }


   async verifyEngagementTemplatesAddSlashEditEnagementTemplateAddSignaturesInfoModal() {
       const infoModal = $('//div[contains(text(), "This will add the signatures section to the engagement document.")]');
       await expect(infoModal).toBeDisplayed();
   }


   get engagementTemplatesAddSlashEditEnagementTemplateAddSignaturesCheckbox() {
       return $('#checkbox-rbl');
   }


   async clickEngagementTemplatesAddSlashEditEnagementTemplateAddSignaturesCheckbox() {
       await this.engagementTemplatesAddSlashEditEnagementTemplateAddSignaturesCheckbox.click();
   }


   async verifyEngagementTemplatesAddSlashEditEnagementTemplateAddSignaturesCheckboxChecked(expectedChecked) {
           await expect(this.engagementTemplatesAddSlashEditEnagementTemplateAddSignaturesCheckbox).toBeChecked(expectedChecked);
       }
  
   get engagementTemplatesAddSlashEditEngagementTemplateFieldsAddFieldButton() {
       return $('//button[@data-testid="add-engagement-field-dropdown-trigger"]');
   }


   async clickEngagementTemplatesAddSlashEditEngagementTemplateFieldsAddFieldButton() {
       await this.engagementTemplatesAddSlashEditEngagementTemplateFieldsAddFieldButton.click();
   }


   get engagementTemplatesAddSlashEditEngagementTemplateFieldsAddFieldDropdownCustomFieldOption() {
       return $('#menurbr');
   }


   async clickEngagementTemplatesAddSlashEditEngagementTemplateFieldsAddFieldDropdownCustomFieldOption() {
       await this.engagementTemplatesAddSlashEditEngagementTemplateFieldsAddFieldDropdownCustomFieldOption.click();
   }


    async verifyEngagementTemplatesAddSlashEditEngagementTemplateFieldsAddFieldDropdownCustomFieldOption() {
           const customFieldOption = $('#menurbr');
           await expect(customFieldOption).toBeDisplayed();
       }


    async verifyEngagementTemplatesAddSlashEditEngagementTemplateFieldsAddFieldDropdownCustomFieldOptionSelected(expectedSelected) {
           await expect(this.engagementTemplatesAddSlashEditEngagementTemplateFieldsAddFieldDropdownCustomFieldOption).toBeSelected(expectedSelected);
       }
  
   get addFieldCustomFieldFieldNameInput() {
       return $('//input[@data-testid="add-engagement-field-dropdown-custom-input"]');
   }


   async enterAddFieldCustomFieldFieldName(ProperExactness) {
       await this.addFieldCustomFieldFieldNameInput.setValue(ProperExactness);
   }


    async verifyAddFieldCustomFieldFieldNameInputValue(expectedValue) {
           await expect(this.addFieldCustomFieldFieldNameInput).toHaveValue(expectedValue);
       }
   async verifyAddFieldCustomFieldFieldNameInputRequired() {
       await expect(this.addFieldCustomFieldFieldNameInput).toBeRequired();
   }


   get addFieldCustomFieldFieldNameInputProperExactnessTextboxField() {
       return $('//textarea[@data-testid="edit-engagement-template-textarea-Proper Exactness"]');
   }
  
   async enterAddFieldCustomFieldFieldNameProperExactnessTextboxField(ProperExactness) {
       await this.addFieldCustomFieldFieldNameInputProperExactnessTextboxField.setValue(ProperExactness);
   }


    async verifyAddFieldCustomFieldFieldNameInputProperExactnessTextboxFieldValue(expectedValue) {
           await expect(this.addFieldCustomFieldFieldNameInputProperExactnessTextboxField).toHaveValue(expectedValue);
       }


    async verifyAddFieldCustomFieldFieldNameInputProperExactnessTextboxFieldRequired() {
       await expect(this.addFieldCustomFieldFieldNameInputProperExactnessTextboxField).toBeRequired();
   }
  
   get addFieldObjectivesOptionButton() {
       return $('//div[@data-testid="add-engagement-field-dropdown-item-objectives"]');
   }


   async clickAddFieldObjectivesOptionButton() {
       await this.addFieldObjectivesOptionButton.click();
   }


   async addFieldObjectivesOptionButtonSelected(expectedSelected) {
       await expect(this.addFieldObjectivesOptionButton).toBeSelected(expectedSelected);
   }


   get addFieldObjectivesOptionButtonTextboxField() {
       return $('//textarea[@data-testid="edit-engagement-template-textarea-Objectives"]');
   }


   async clickAddFieldObjectivesOptionButtonTextboxField() {
       await this.addFieldObjectivesOptionButtonTextboxField.click();
   }


   // Enter in this: await descriptionField.setValue(
  // 'Glenn Quagmire is suing the United States for $247 million.'
 // );


   get addFieldClientResponsibilitiesOptionButton() {
       return $('//div[@data-testid="add-engagement-field-dropdown-item-client-responsibilities"]');
   }


   async clickAddFieldClientResponsibilitiesOptionButton() {
       await this.addFieldClientResponsibilitiesOptionButton.click();
   }


   async addFieldClientResponsibilitiesOptionButtonSelected(expectedSelected) {
       await expect(this.addFieldClientResponsibilitiesOptionButton).toBeSelected(expectedSelected);
       await expect(this.addFieldClientResponsibilitiesOptionButton).toBeDisplayed();
       await expect(this.addFieldClientResponsibilitiesOptionButton).toBeEnabled();
   }






// !!!!!!!!!!!!!!!!!!!
   //================
// USE THIS EXAMPLE BELOW FOR THE REST OF THE OPTIONS TO CLICK AND ENTER STUFF INTO THE TEXTBOX FIELDS AND VERIFY THEY'RE REQUIRED AND HAVE THE CORRECT VALUES AFTER ENTERING TEXT AND TO ALSO CLICK EACH OF THE BUTTONS TO BE ABLE TO SELECT AND ENTER INTO THE TEXTBOX FIELDS!!!
//====================


// !!!!!!!!!!!!!!!!!!!
 
//
// ADD FIELD DROPDOWN MENU
//
get addFieldDropdownMenuButton() {
   return $('//button[@data-testid="add-engagement-field-dropdown-button"]');
}


async clickAddFieldDropdownMenuButton() {
   await this.addFieldDropdownMenuButton.waitForDisplayed();
   await this.addFieldDropdownMenuButton.waitForClickable();
   await this.addFieldDropdownMenuButton.click();
}


//
// CLIENT RESPONSIBILITIES OPTION BUTTON
//
get addFieldClientResponsibilitiesOptionButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-client-responsibilities"]');
}


async clickAddFieldClientResponsibilitiesOptionButton() {


   // First open the Add Field dropdown menu
   await this.clickAddFieldDropdownMenuButton();


   // Then click the Client Responsibilities option
   await this.addFieldClientResponsibilitiesOptionButton.waitForDisplayed();
   await this.addFieldClientResponsibilitiesOptionButton.waitForClickable();
   await this.addFieldClientResponsibilitiesOptionButton.click();
}


async verifyAddFieldClientResponsibilitiesOptionButtonDisplayed() {
   await expect(this.addFieldClientResponsibilitiesOptionButton).toBeDisplayed();
}


async verifyAddFieldClientResponsibilitiesOptionButtonEnabled() {
   await expect(this.addFieldClientResponsibilitiesOptionButton).toBeEnabled();
}


//
// CLIENT RESPONSIBILITIES TEXTBOX FIELD
//
get addFieldClientResponsibilitiesTextboxField() {
   return $('//textarea[@data-testid="edit-engagement-template-textarea-Client Responsibilities"]');
}


async clickAddFieldClientResponsibilitiesTextboxField() {
   await this.addFieldClientResponsibilitiesTextboxField.waitForDisplayed();
   await this.addFieldClientResponsibilitiesTextboxField.waitForClickable();
   await this.addFieldClientResponsibilitiesTextboxField.click();
}


async enterAddFieldClientResponsibilitiesTextboxField() {


   const clientResponsibilitiesText =
       'Review case documents, organize court exhibits, prepare witness questions, draft motions, communicate with clients regarding hearing dates, and ensure all evidence is properly submitted before court proceedings.';


   await this.addFieldClientResponsibilitiesTextboxField.waitForDisplayed();


   await this.addFieldClientResponsibilitiesTextboxField.setValue(
       clientResponsibilitiesText
   );
}


async verifyAddFieldClientResponsibilitiesTextboxFieldValue() {


   const expectedValue =
       'Review case documents, organize court exhibits, prepare witness questions, draft motions, communicate with clients regarding hearing dates, and ensure all evidence is properly submitted before court proceedings.';


   await expect(this.addFieldClientResponsibilitiesTextboxField).toHaveValue(expectedValue);
}


async verifyAddFieldClientResponsibilitiesTextboxFieldRequired() {
   await expect(this.addFieldClientResponsibilitiesTextboxField).toBeRequired();
}


//
// FULL FLOW METHOD
//
async addClientResponsibilitiesFieldAndEnterText() {


   // Open Add Field dropdown
   await this.clickAddFieldDropdownMenuButton();


   // Select Client Responsibilities option
   await this.clickAddFieldClientResponsibilitiesOptionButton();


   // Click textbox field
   await this.clickAddFieldClientResponsibilitiesTextboxField();


   // Enter text into textbox
   await this.enterAddFieldClientResponsibilitiesTextboxField();


   // Verify text entered correctly
   await this.verifyAddFieldClientResponsibilitiesTextboxFieldValue();
}


//
// ======================================================
// SERVICES PROVIDED
// ======================================================
//


get addFieldServicesProvidedOptionButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-services-provided"]');
}


async clickAddFieldServicesProvidedOptionButton() {


   await this.clickAddFieldDropdownMenuButton();


   await this.addFieldServicesProvidedOptionButton.waitForDisplayed();
   await this.addFieldServicesProvidedOptionButton.waitForClickable();
   await this.addFieldServicesProvidedOptionButton.click();
}


get addFieldServicesProvidedTextboxField() {
   return $('//textarea[@data-testid="edit-engagement-template-textarea-Services Provided"]');
}


async clickAddFieldServicesProvidedTextboxField() {
   await this.addFieldServicesProvidedTextboxField.waitForDisplayed();
   await this.addFieldServicesProvidedTextboxField.click();
}


async enterAddFieldServicesProvidedTextboxField() {


   const servicesProvidedText =
       'Legal consultation, document preparation, evidence review, witness preparation, court filing assistance, and representation during scheduled hearings.';


   await this.addFieldServicesProvidedTextboxField.setValue(servicesProvidedText);
}


async verifyAddFieldServicesProvidedTextboxFieldValue() {


   const expectedValue =
       'Legal consultation, document preparation, evidence review, witness preparation, court filing assistance, and representation during scheduled hearings.';


   await expect(this.addFieldServicesProvidedTextboxField)
       .toHaveValue(expectedValue);
}


async addServicesProvidedFieldAndEnterText() {


   await this.clickAddFieldServicesProvidedOptionButton();
   await this.clickAddFieldServicesProvidedTextboxField();
   await this.enterAddFieldServicesProvidedTextboxField();
   await this.verifyAddFieldServicesProvidedTextboxFieldValue();
}


//
// ======================================================
// CASE DELIVERABLES
// ======================================================
//


get addFieldCaseDeliverablesOptionButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-case-deliverables"]');
}


async clickAddFieldCaseDeliverablesOptionButton() {


   await this.clickAddFieldDropdownMenuButton();


   await this.addFieldCaseDeliverablesOptionButton.waitForDisplayed();
   await this.addFieldCaseDeliverablesOptionButton.waitForClickable();
   await this.addFieldCaseDeliverablesOptionButton.click();
}


get addFieldCaseDeliverablesTextboxField() {
   return $('//textarea[@data-testid="edit-engagement-template-textarea-Case Deliverables"]');
}


async clickAddFieldCaseDeliverablesTextboxField() {
   await this.addFieldCaseDeliverablesTextboxField.waitForDisplayed();
   await this.addFieldCaseDeliverablesTextboxField.click();
}


async enterAddFieldCaseDeliverablesTextboxField() {


   const caseDeliverablesText =
       'Completed legal filings, organized evidence packets, witness statements, court appearance summaries, and final case preparation documents.';


   await this.addFieldCaseDeliverablesTextboxField.setValue(caseDeliverablesText);
}


async verifyAddFieldCaseDeliverablesTextboxFieldValue() {


   const expectedValue =
       'Completed legal filings, organized evidence packets, witness statements, court appearance summaries, and final case preparation documents.';


   await expect(this.addFieldCaseDeliverablesTextboxField)
       .toHaveValue(expectedValue);
}


async addCaseDeliverablesFieldAndEnterText() {


   await this.clickAddFieldCaseDeliverablesOptionButton();
   await this.clickAddFieldCaseDeliverablesTextboxField();
   await this.enterAddFieldCaseDeliverablesTextboxField();
   await this.verifyAddFieldCaseDeliverablesTextboxFieldValue();
}


//
// ======================================================
// MILESTONES
// ======================================================
//


get addFieldMilestonesOptionButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-milestones"]');
}


async clickAddFieldMilestonesOptionButton() {


   await this.clickAddFieldDropdownMenuButton();


   await this.addFieldMilestonesOptionButton.waitForDisplayed();
   await this.addFieldMilestonesOptionButton.waitForClickable();
   await this.addFieldMilestonesOptionButton.click();
}


get addFieldMilestonesTextboxField() {
   return $('//textarea[@data-testid="edit-engagement-template-textarea-Milestones"]');
}


async clickAddFieldMilestonesTextboxField() {
   await this.addFieldMilestonesTextboxField.waitForDisplayed();
   await this.addFieldMilestonesTextboxField.click();
}


async enterAddFieldMilestonesTextboxField() {


   const milestonesText =
       'Initial consultation completed, evidence review finalized, witness interviews conducted, motions submitted, and trial preparation completed.';


   await this.addFieldMilestonesTextboxField.setValue(milestonesText);
}


async verifyAddFieldMilestonesTextboxFieldValue() {


   const expectedValue =
       'Initial consultation completed, evidence review finalized, witness interviews conducted, motions submitted, and trial preparation completed.';


   await expect(this.addFieldMilestonesTextboxField)
       .toHaveValue(expectedValue);
}


async addMilestonesFieldAndEnterText() {


   await this.clickAddFieldMilestonesOptionButton();
   await this.clickAddFieldMilestonesTextboxField();
   await this.enterAddFieldMilestonesTextboxField();
   await this.verifyAddFieldMilestonesTextboxFieldValue();
}


//
// ======================================================
// ASSUMPTIONS
// ======================================================
//


get addFieldAssumptionsOptionButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-assumptions"]');
}


async clickAddFieldAssumptionsOptionButton() {


   await this.clickAddFieldDropdownMenuButton();


   await this.addFieldAssumptionsOptionButton.waitForDisplayed();
   await this.addFieldAssumptionsOptionButton.waitForClickable();
   await this.addFieldAssumptionsOptionButton.click();
}


get addFieldAssumptionsTextboxField() {
   return $('//textarea[@data-testid="edit-engagement-template-textarea-Assumptions"]');
}


async enterAddFieldAssumptionsTextboxField() {


   const assumptionsText =
       'All required legal documentation will be provided by the client before court deadlines and witnesses will remain available for testimony if necessary.';


   await this.addFieldAssumptionsTextboxField.setValue(assumptionsText);
}


async addAssumptionsFieldAndEnterText() {


   await this.clickAddFieldAssumptionsOptionButton();
   await this.enterAddFieldAssumptionsTextboxField();
}


//
// ======================================================
// EXCLUSIONS
// ======================================================
//


get addFieldExclusionsOptionButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-exclusions"]');
}


async clickAddFieldExclusionsOptionButton() {


   await this.clickAddFieldDropdownMenuButton();


   await this.addFieldExclusionsOptionButton.waitForDisplayed();
   await this.addFieldExclusionsOptionButton.waitForClickable();
   await this.addFieldExclusionsOptionButton.click();
}


get addFieldExclusionsTextboxField() {
   return $('//textarea[@data-testid="edit-engagement-template-textarea-Exclusions"]');
}


async enterAddFieldExclusionsTextboxField() {


   const exclusionsText =
       'This agreement excludes appeals, unrelated legal matters, additional expert witness fees, and representation outside agreed court proceedings.';


   await this.addFieldExclusionsTextboxField.setValue(exclusionsText);
}


async addExclusionsFieldAndEnterText() {


   await this.clickAddFieldExclusionsOptionButton();
   await this.enterAddFieldExclusionsTextboxField();
}


//
// ======================================================
// DEPENDENCIES
// ======================================================
//


get addFieldDependenciesOptionButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-dependencies"]');
}


async clickAddFieldDependenciesOptionButton() {


   await this.clickAddFieldDropdownMenuButton();


   await this.addFieldDependenciesOptionButton.waitForDisplayed();
   await this.addFieldDependenciesOptionButton.waitForClickable();
   await this.addFieldDependenciesOptionButton.click();
}


get addFieldDependenciesTextboxField() {
   return $('//textarea[@data-testid="edit-engagement-template-textarea-Dependencies"]');
}


async enterAddFieldDependenciesTextboxField() {


   const dependenciesText =
       'Case progress depends on timely document submission, court scheduling availability, and witness cooperation throughout proceedings.';


   await this.addFieldDependenciesTextboxField.setValue(dependenciesText);
}


async addDependenciesFieldAndEnterText() {


   await this.clickAddFieldDependenciesOptionButton();
   await this.enterAddFieldDependenciesTextboxField();
}


//
// ======================================================
// ACCEPTANCE CRITERIA
// ======================================================
//


get addFieldAcceptanceCriteriaOptionButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-acceptance-criteria"]');
}


async clickAddFieldAcceptanceCriteriaOptionButton() {


   await this.clickAddFieldDropdownMenuButton();


   await this.addFieldAcceptanceCriteriaOptionButton.waitForDisplayed();
   await this.addFieldAcceptanceCriteriaOptionButton.waitForClickable();
   await this.addFieldAcceptanceCriteriaOptionButton.click();
}


get addFieldAcceptanceCriteriaTextboxField() {
   return $('//textarea[@data-testid="edit-engagement-template-textarea-Acceptance Criteria"]');
}


async enterAddFieldAcceptanceCriteriaTextboxField() {


   const acceptanceCriteriaText =
       'All legal documents must be filed successfully, hearings attended as scheduled, and case preparation completed before court deadlines.';


   await this.addFieldAcceptanceCriteriaTextboxField.setValue(acceptanceCriteriaText);
}


async addAcceptanceCriteriaFieldAndEnterText() {


   await this.clickAddFieldAcceptanceCriteriaOptionButton();
   await this.enterAddFieldAcceptanceCriteriaTextboxField();
}


//
// ======================================================
// BILLING TERMS
// ======================================================
//


get addFieldBillingTermsOptionButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-billing-terms"]');
}


async clickAddFieldBillingTermsOptionButton() {


   await this.clickAddFieldDropdownMenuButton();


   await this.addFieldBillingTermsOptionButton.waitForDisplayed();
   await this.addFieldBillingTermsOptionButton.waitForClickable();
   await this.addFieldBillingTermsOptionButton.click();
}


get addFieldBillingTermsTextboxField() {
   return $('//textarea[@data-testid="edit-engagement-template-textarea-Billing Terms"]');
}


async enterAddFieldBillingTermsTextboxField() {


   const billingTermsText =
       'Invoices will be issued bi-weekly and are payable within fifteen business days of receipt unless otherwise agreed upon in writing.';


   await this.addFieldBillingTermsTextboxField.setValue(billingTermsText);
}


async addBillingTermsFieldAndEnterText() {


   await this.clickAddFieldBillingTermsOptionButton();
   await this.enterAddFieldBillingTermsTextboxField();
}


//
// ======================================================
// PAYMENT TERMS
// ======================================================
//


get addFieldPaymentTermsOptionButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-payment-terms"]');
}


async clickAddFieldPaymentTermsOptionButton() {


   await this.clickAddFieldDropdownMenuButton();


   await this.addFieldPaymentTermsOptionButton.waitForDisplayed();
   await this.addFieldPaymentTermsOptionButton.waitForClickable();
   await this.addFieldPaymentTermsOptionButton.click();
}


get addFieldPaymentTermsTextboxField() {
   return $('//textarea[@data-testid="edit-engagement-template-textarea-Payment Terms"]');
}


async enterAddFieldPaymentTermsTextboxField() {


   const paymentTermsText =
       'A fifty percent retainer is due before work begins and remaining balances must be paid upon completion of legal services.';


   await this.addFieldPaymentTermsTextboxField.setValue(paymentTermsText);
}


async addPaymentTermsFieldAndEnterText() {


   await this.clickAddFieldPaymentTermsOptionButton();
   await this.enterAddFieldPaymentTermsTextboxField();
}


   // ======================================================
   // SAVE BUTTON
   // ======================================================


   get addSlashEditEngagementTemplateSaveButton() {
       return $('//button[@data-testid="edit-engagement-template-save-button"]');
   }


   async clickAddSlashEditEngagementTemplateSaveButton() {
       await this.addSlashEditEngagementTemplateSaveButton.click();
   }


   // ======================================================
   // SUCCESS MESSAGE
   // ======================================================


   get addSlashEditEngagementTemplateSuccessMessage() {
       return $('//div[contains(text(), "Engagement template saved successfully.")]');
   }


   async verifyAddSlashEditEngagementTemplateSuccessMessage() {
       await expect(this.addSlashEditEngagementTemplateSuccessMessage).toBeDisplayed();
   }


   // ======================================================
   // CANCEL BUTTON
   // ======================================================


   get addSlashEditEngagementTemplateCancelButton() {
       return $('//button[@data-testid="edit-engagement-template-cancel-button"]');
   }


   async clickAddSlashEditEngagementTemplateCancelButton() {
       await this.addSlashEditEngagementTemplateCancelButton.click();
   }


   // ======================================================
   // BACK TO ENGAGEMENT TEMPLATES BUTTON
   // ======================================================


   get addSlashEditEngagementTemplateBackToEnagementTemplatesButton() {
       return $('//button[@data-testid="link-button-Back to Engagement Templates"]');
   }


   async clickAddSlashEditEngagementTemplateBackToEnagementTemplatesButton() {
       await this.addSlashEditEngagementTemplateBackToEnagementTemplatesButton.click();
   }


   // ======================================================
   // PROPER EXACTNESS FIELD X BUTTON
   // ======================================================
  
   get addSlashEditEngagementTemplateProperExactnessXButton() {
       return $('//button[@data-testid="edit-engagement-template-remove-button-Proper Exactness"]');
   }


   async clickAddSlashEditEngagementTemplateProperExactnessXButton() {
       await this.addSlashEditEngagementTemplateProperExactnessXButton.click();
   }


   //
// ======================================================
// PROPER EXACTNESS FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateProperExactnessXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Proper Exactness"]');
}


async clickAddSlashEditEngagementTemplateProperExactnessXButton() {
   await this.addSlashEditEngagementTemplateProperExactnessXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateProperExactnessXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateProperExactnessXButton.click();
}


//
// ======================================================
// OBJECTIVES FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateObjectivesXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Objectives"]');
}


async clickAddSlashEditEngagementTemplateObjectivesXButton() {
   await this.addSlashEditEngagementTemplateObjectivesXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateObjectivesXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateObjectivesXButton.click();
}


//
// ======================================================
// CLIENT RESPONSIBILITIES FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateClientResponsibilitiesXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Client Responsibilities"]');
}


async clickAddSlashEditEngagementTemplateClientResponsibilitiesXButton() {
   await this.addSlashEditEngagementTemplateClientResponsibilitiesXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateClientResponsibilitiesXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateClientResponsibilitiesXButton.click();
}


//
// ======================================================
// SERVICES PROVIDED FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateServicesProvidedXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Services Provided"]');
}


async clickAddSlashEditEngagementTemplateServicesProvidedXButton() {
   await this.addSlashEditEngagementTemplateServicesProvidedXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateServicesProvidedXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateServicesProvidedXButton.click();
}


//
// ======================================================
// CASE DELIVERABLES FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateCaseDeliverablesXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Case Deliverables"]');
}


async clickAddSlashEditEngagementTemplateCaseDeliverablesXButton() {
   await this.addSlashEditEngagementTemplateCaseDeliverablesXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateCaseDeliverablesXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateCaseDeliverablesXButton.click();
}


//
// ======================================================
// MILESTONES FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateMilestonesXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Milestones"]');
}


async clickAddSlashEditEngagementTemplateMilestonesXButton() {
   await this.addSlashEditEngagementTemplateMilestonesXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateMilestonesXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateMilestonesXButton.click();
}


//
// ======================================================
// ASSUMPTIONS FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateAssumptionsXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Assumptions"]');
}


async clickAddSlashEditEngagementTemplateAssumptionsXButton() {
   await this.addSlashEditEngagementTemplateAssumptionsXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateAssumptionsXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateAssumptionsXButton.click();
}


//
// ======================================================
// EXCLUSIONS FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateExclusionsXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Exclusions"]');
}


async clickAddSlashEditEngagementTemplateExclusionsXButton() {
   await this.addSlashEditEngagementTemplateExclusionsXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateExclusionsXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateExclusionsXButton.click();
}


//
// ======================================================
// DEPENDENCIES FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateDependenciesXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Dependencies"]');
}


async clickAddSlashEditEngagementTemplateDependenciesXButton() {
   await this.addSlashEditEngagementTemplateDependenciesXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateDependenciesXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateDependenciesXButton.click();
}


//
// ======================================================
// ACCEPTANCE CRITERIA FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateAcceptanceCriteriaXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Acceptance Criteria"]');
}


async clickAddSlashEditEngagementTemplateAcceptanceCriteriaXButton() {
   await this.addSlashEditEngagementTemplateAcceptanceCriteriaXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateAcceptanceCriteriaXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateAcceptanceCriteriaXButton.click();
}


//
// ======================================================
// BILLING TERMS FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplateBillingTermsXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Billing Terms"]');
}


async clickAddSlashEditEngagementTemplateBillingTermsXButton() {
   await this.addSlashEditEngagementTemplateBillingTermsXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplateBillingTermsXButton.waitForClickable();
   await this.addSlashEditEngagementTemplateBillingTermsXButton.click();
}


//
// ======================================================
// PAYMENT TERMS FIELD X BUTTON
// ======================================================
//


get addSlashEditEngagementTemplatePaymentTermsXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Payment Terms"]');
}


async clickAddSlashEditEngagementTemplatePaymentTermsXButton() {
   await this.addSlashEditEngagementTemplatePaymentTermsXButton.waitForDisplayed();
   await this.addSlashEditEngagementTemplatePaymentTermsXButton.waitForClickable();
   await this.addSlashEditEngagementTemplatePaymentTermsXButton.click();
}


// ======================================================
// Engagmenet Templates custom-Copy Three Dot Button
// ======================================================


get engagementTemplatesCustomCopyThreeDotButton() {
   return $('(//button[@aria-label="More items"])[1]');
}


async clickEngagementTemplatesCustomCopyThreeDotButton() {
   await this.engagementTemplatesCustomCopyThreeDotButton.waitForDisplayed();
   await this.engagementTemplatesCustomCopyThreeDotButton.waitForClickable();
   await this.engagementTemplatesCustomCopyThreeDotButton.click();
   await expect(this.engagementTemplatesCustomCopyThreeDotButton).toBeDisplayed();
   await expect(this.engagementTemplatesCustomCopyThreeDotButton).toBeEnabled();
}


// ======================================================================
// Engagement Templates custom-Copy Duplicate Option in Three Dot Menu
// ======================================================================


get engagementTemplatesCustomDashCopyCopyOption() {
   return $('//div[@data-testid="custom-data-table-context-menu-item-Copy"]');
}


async clickEngagementTemplatesCustomCopyDuplicateOption() {
   await this.engagementTemplatesCustomDashCopyCopyOption.waitForDisplayed();
   await this.engagementTemplatesCustomDashCopyCopyOption.waitForClickable();
   await this.engagementTemplatesCustomDashCopyCopyOption.click();
   await expect(this.engagementTemplatesCustomDashCopyCopyOption).toBeDisplayed();
   await expect(this.engagementTemplatesCustomDashCopyCopyOption).toBeEnabled();
}


// ============================================================
// Engagement Template custom-Copy Confirm Copy Pop Up Card
// ============================================================


get engagementTemplateCustomCopyConfirmCopyPopUpCard() {
   return $('//div[text()="Confirm Copy"]');
}


async verifyEngagementTemplateCustomCopyConfirmCopyPopUpCard() {
   await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCard).toBeDisplayed();
}


// ============================================================================
// Engagement Template custom-Copy Confirm Copy Pop Up Card Yes Button
// ============================================================================


get engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton() {
   return $('//button[text()="Yes"]');
}


async clickEngagementTemplateCustomCopyConfirmCopyPopUpCardYesButton() {
   await this.engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton.waitForDisplayed();
   await this.engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton.waitForClickable();
   await this.engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton.click();
   await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton).toBeDisplayed();
   await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton).toBeEnabled();
}


// ============================================================================
// Engagement Template custom-Copy Confirm Copy Pop Up Card No Button
// ============================================================================


get engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton() {
   return $('//button[text()="No"]');
}


async clickEngagementTemplateCustomCopyConfirmCopyPopUpCardNoButton() {
   await this.engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton.waitForDisplayed();
   await this.engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton.waitForClickable();
   await this.engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton.click();
   await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton).toBeDisplayed();
   await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton).toBeEnabled();
}


// ==============================================================================
// Engagement Template custom-Copy Duplicate Success Message Dismiss Button
// ==============================================================================


get engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton() {
   return $('//button[text()="Dismiss"]');
}


async clickEngagementTemplateCustomCopyDuplicateSuccessMessageDismissButton() {
   await this.engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton.waitForDisplayed();
   await this.engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton.waitForClickable();
   await this.engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton.click();
   await expect(this.engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton).toBeDisplayed();
   await expect(this.engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton).toBeEnabled();
}


// ======================================================
// Case Engagment Template Saved Successfully Message
// ======================================================


get engagementTemplateSavedSuccessfullyMessage() {
   return $('//div[@class="fui-Toast rhf7k35"]');
}


async verifyEngagementTemplateSavedSuccessfullyMessage() {
   await expect(this.engagementTemplateSavedSuccessfullyMessage).toBeDisplayed();
}


// ====================================================================
// Engagement Templates Dismiss Button for Saved Successfully Message
// ====================================================================


get engagementTemplateSavedSuccessfullyMessageDismissButton() {
   return $('//span[contains(text(), "Dismiss")]');
}


async clickEngagementTemplateSavedSuccessfullyMessageDismissButton() {
   await this.engagementTemplateSavedSuccessfullyMessageDismissButton.waitForDisplayed();
   await this.engagementTemplateSavedSuccessfullyMessageDismissButton.waitForClickable();
   await this.engagementTemplateSavedSuccessfullyMessageDismissButton.click();
   await expect(this.engagementTemplateSavedSuccessfullyMessageDismissButton).toBeDisplayed();
   await expect(this.engagementTemplateSavedSuccessfullyMessageDismissButton).toBeEnabled();
}


// =======================================================
// Engagement Templates The Best Template Three Dot Menu
// =======================================================


get engagementTemplatesTheBestTemplateThreeDotButton() {
   return $('//*[contains(., "The Best Template")]/ancestor::*[@role="row"][1]//button[@aria-label="More items"]');
}


async clickEngagementTemplatesTheBestTemplateThreeDotButton() {
   await this.engagementTemplatesTheBestTemplateThreeDotButton.waitForDisplayed();
   await this.engagementTemplatesTheBestTemplateThreeDotButton.waitForClickable();
   await this.engagementTemplatesTheBestTemplateThreeDotButton.click();
   await expect(this.engagementTemplatesTheBestTemplateThreeDotButton).toBeDisplayed();
   await expect(this.engagementTemplatesTheBestTemplateThreeDotButton).toBeEnabled();
}


// ========================================================
// Engagement Templates Edit Engagement Template Fields 
// ========================================================


get engagementTemplatesCustomDashCopyEditButton() {
   return $('//div[@data-testid="custom-data-table-context-menu-item-Edit"]');
}


async clickEngagementTemplatesCustomCopyEditButton() {
   await this.engagementTemplatesCustomDashCopyEditButton.waitForDisplayed();
   await this.engagementTemplatesCustomDashCopyEditButton.waitForClickable();
   await this.engagementTemplatesCustomDashCopyEditButton.click();
   await expect(this.engagementTemplatesCustomDashCopyEditButton).toBeDisplayed();
   await expect(this.engagementTemplatesCustomDashCopyEditButton).toBeEnabled();
}

// =============================================================
// Engagement Templates Edit Engagement Template Fields - Delete
// =============================================================

get theBestTemplateThreeDotDeleteButtonSelection() {
        return $('//div[@data-testid="custom-data-table-context-menu-item-Delete"]');
}

async clickTheBestTemplateThreeDotDeleteButtonSelection() {
    await this.theBestTemplateThreeDotDeleteButtonSelection.waitForDisplayed();
    await this.theBestTemplateThreeDotDeleteButtonSelection.waitForClickable();
    await this.theBestTemplateThreeDotDeleteButtonSelection.click();
    await expect(this.theBestTemplateThreeDotDeleteButtonSelection).toBeDisplayed();
    await expect(this.theBestTemplateThreeDotDeleteButtonSelection).toBeEnabled();
}





// =========================================================================
// NOW WE ARE WORKING ON custom-Copy template for the following tests:
// =========================================================================

// ==========================================================
// Engagement Templates custom-Copy Three Dot Menu Button
// ==========================================================

get engagementTemplatesCustomCopyThreeDotButton() {
   return $('//*[contains(., "custom-Copy")]/ancestor::*[@role="row"][1]//button[@aria-label="More items"]');
}

async clickEngagementTemplatesCustomCopyThreeDotButton() {
   await this.engagementTemplatesCustomCopyThreeDotButton.waitForDisplayed();
   await this.engagementTemplatesCustomCopyThreeDotButton.waitForClickable();
   await this.engagementTemplatesCustomCopyThreeDotButton.click();
   await expect(this.engagementTemplatesCustomCopyThreeDotButton).toBeDisplayed();
   await expect(this.engagementTemplatesCustomCopyThreeDotButton).toBeEnabled();
}

get engagementTemplatesCustomCopyDuplicateOption() {
   return $('//div[@data-testid="custom-data-table-context-menu-item-Copy"]');
}

async clickEngagementTemplatesCustomCopyDuplicateOption() {
   await this.engagementTemplatesCustomCopyDuplicateOption.waitForDisplayed();
   await this.engagementTemplatesCustomCopyDuplicateOption.waitForClickable();
   await this.engagementTemplatesCustomCopyDuplicateOption.click();
   await expect(this.engagementTemplatesCustomCopyDuplicateOption).toBeDisplayed();
   await expect(this.engagementTemplatesCustomCopyDuplicateOption).toBeEnabled();
}

get engagementTemplateCustomCopyConfirmCopyPopUpCard() {
   return $('//div[text()="Confirm Copy"]');
}

async verifyEngagementTemplateCustomCopyConfirmCopyPopUpCard() {
   await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCard).toBeDisplayed();
   await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCard).toHaveText("Confirm Copy");
}

get engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton() {
   return $('//button[text()="Yes"]');
}

async clickEngagementTemplateCustomCopyConfirmCopyPopUpCardYesButton() {
    await this.engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton.waitForDisplayed();
    await this.engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton.waitForClickable();
    await this.engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton.click();
    await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton).toBeDisplayed();
    await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCardYesButton).toBeEnabled();
}

get engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton() {
   return $('//button[text()="No"]');
}

async clickEngagementTemplateCustomCopyConfirmCopyPopUpCardNoButton() {
    await this.engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton.waitForDisplayed();
    await this.engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton.waitForClickable();
    await this.engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton.click();
    await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton).toBeDisplayed();
    await expect(this.engagementTemplateCustomCopyConfirmCopyPopUpCardNoButton).toBeEnabled();
}

get engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton() {
   return $('//button[text()="Dismiss"]');
}

async clickEngagementTemplateCustomCopyDuplicateSuccessMessageDismissButton() {
    await this.engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton.waitForDisplayed();
    await this.engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton.waitForClickable();
    await this.engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton.click();
    await expect(this.engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton).toBeDisplayed();
    await expect(this.engagementTemplateCustomCopyDuplicateSuccessMessageDismissButton).toBeEnabled();
}

get engagementTemplateSavedSuccessfullyMessage() {
   return $('//div[@class="fui-Toast rhf7k35"]');
}

async verifyEngagementTemplateSavedSuccessfullyMessage() {
    await expect(this.engagementTemplateSavedSuccessfullyMessage).toBeDisplayed();
}

get engagementTemplateSavedSuccessfullyMessageDismissButton() {
   return $('//span[contains(text(), "Dismiss")]');
}

async clickEngagementTemplateSavedSuccessfullyMessageDismissButton() {
    await this.engagementTemplateSavedSuccessfullyMessageDismissButton.waitForDisplayed();
    await this.engagementTemplateSavedSuccessfullyMessageDismissButton.waitForClickable();
    await this.engagementTemplateSavedSuccessfullyMessageDismissButton.click();
    await expect(this.engagementTemplateSavedSuccessfullyMessageDismissButton).toBeDisplayed();
    await expect(this.engagementTemplateSavedSuccessfullyMessageDismissButton).toBeEnabled();
}

get engagementTemplatecustomDashCopyEditButton() {
    return $('//div[@data-testid="custom-data-table-context-menu-item-Edit"]');
}

async clickEngagementTemplatecustomDashCopyEditButton() {
    await this.engagementTemplatecustomDashCopyEditButton.waitForDisplayed();
    await this.engagementTemplatecustomDashCopyEditButton.waitForClickable();
    await this.engagementTemplatecustomDashCopyEditButton.click();
    await expect(this.engagementTemplatecustomDashCopyEditButton).toBeDisplayed();
    await expect(this.engagementTemplatecustomDashCopyEditButton).toBeEnabled();
}

get engagementTemplatecustomDashCopyDeleteButton() {
    return $('//div[@data-testid="custom-data-table-context-menu-item-Delete"]');
}

async clickEngagementTemplatecustomDashCopyDeleteButton() {
      await this.engagementTemplatecustomDashCopyDeleteButton.waitForDisplayed();
      await this.engagementTemplatecustomDashCopyDeleteButton.waitForClickable();
      await this.engagementTemplatecustomDashCopyDeleteButton.click();
      await expect(this.engagementTemplatecustomDashCopyDeleteButton).toBeDisplayed();
      await expect(this.engagementTemplatecustomDashCopyDeleteButton).toBeEnabled();
}

// ========================================================================
// Engagement Template custom-Copy Edit Engagement Template Editing Fields
// ========================================================================

get addSlashEngagementTemplateHeaderNameForcustomDashCopy() {
   return $('//span[text()="Add/Edit Engagement Template"]');
}

async verifyAddSlashEngagementTemplateHeaderNameForcustomDashCopy() {
   await expect(this.addSlashEngagementTemplateHeaderNameForcustomDashCopy).toBeDisplayed();
   await expect(this.addSlashEngagementTemplateHeaderNameForcustomDashCopy).toHaveText("Add/Edit Engagement Template");
}

get addSlashEditEngagementTemplatecustomDashCopyTemplateNameField() {
    return $('//input[@data-testid="edit-engagement-template-name-input"]');
}

async enterAddSlashEditEngagementTemplatecustomDashCopyTemplateNameField() {

    const templateNameField =
        this.addSlashEditEngagementTemplatecustomDashCopyTemplateNameField;

    // Wait until field is visible and clickable
    await templateNameField.waitForDisplayed({ timeout: 10000 });
    await templateNameField.waitForClickable({ timeout: 10000 });

    // Click into the textbox
    await templateNameField.click();

    // Select all existing text
    await browser.keys(['Control', 'a']);

    // Delete selected text
    await browser.keys('Backspace');

    // Enter new text
    const newTemplateName = 'custom-Copy';

    await templateNameField.setValue(newTemplateName);

    // Optional assertion to verify text changed correctly
    await expect(templateNameField).toHaveValue(newTemplateName);
}

get addSlashEditEngagementTemplatecustomDashCopyTemplateDescriptionField() {
    return $('//textarea[@data-testid="edit-engagement-template-description-input"]');
}

async enterAddSlashEditEngagementTemplatecustomDashCopyTemplateDescriptionField() {

    const templateDescriptionField =
        this.addSlashEditEngagementTemplatecustomDashCopyTemplateDescriptionField;
      // Wait until field is visible and clickable
      await templateDescriptionField.waitForDisplayed({ timeout: 10000 });
      await templateDescriptionField.waitForClickable({ timeout: 10000 });

      // Click into the textarea
      await templateDescriptionField.click();
      // Select all existing text
      await browser.keys(['Control', 'a']);
      // Delete selected text
      await browser.keys('Backspace');
      // Enter new text
      const newTemplateDescription = 'This is the description for the custom-Copy template.';
      await templateDescriptionField.setValue(newTemplateDescription);
      // Optional assertion to verify text changed correctly
      await expect(templateDescriptionField).toHaveValue(newTemplateDescription);
}

get addSlashEditEngagementTemplatecustomDashCopyDocumentTitleTextboxField() {
    return $('//input[@data-testid="edit-engagement-template-document-title-input"]');
}

async enterAddSlashEditEngagementTemplatecustomDashCopyDocumentTitleTextboxField() {

    const documentTitleField =
        this.addSlashEditEngagementTemplatecustomDashCopyDocumentTitleTextboxField;
      // Wait until field is visible and clickable
      await documentTitleField.waitForDisplayed({ timeout: 10000 });
      await documentTitleField.waitForClickable({ timeout: 10000 });
      // Click into the textbox
      await documentTitleField.click();
      // Select all existing text
      await browser.keys(['Control', 'a']);
      // Delete selected text
      await browser.keys('Backspace');
      // Enter new text
      const newDocumentTitle = 'Custom-Copy Engagement Letter';
      await documentTitleField.setValue(newDocumentTitle);
      // Optional assertion to verify text changed correctly
      await expect(documentTitleField).toHaveValue(newDocumentTitle);
}

get addSlashEditEngagementTemplateAddSignatureInfoIconButton() {
      return $('#infolabel-rf7__infoButton');
}

async clickAddSlashEditEngagementTemplateAddSignatureInfoIconButton() {
      await this.addSlashEditEngagementTemplateAddSignatureInfoIconButton.waitForDisplayed({ timeout: 10000 });
      await this.addSlashEditEngagementTemplateAddSignatureInfoIconButton.waitForClickable({ timeout: 10000 });
      await this.addSlashEditEngagementTemplateAddSignatureInfoIconButton.click();
      await expect(this.addSlashEditEngagementTemplateAddSignatureInfoIconButton).toBeDisplayed();
      await expect(this.addSlashEditEngagementTemplateAddSignatureInfoIconButton).toBeEnabled();
}

get addSlashEditEngagementTemplateAddSignatureInfoIconInfoCard() {
      return $('#infolabel-rf7__info');
}

async verifyAddSlashEditEngagementTemplateAddSignatureInfoIconInfoCard() {
      await expect(this.addSlashEditEngagementTemplateAddSignatureInfoIconInfoCard).toBeDisplayed();
      await expect(this.addSlashEditEngagementTemplateAddSignatureInfoIconInfoCard).toHaveText("This will add the signatures section to the engagement document."); 
}

get addSlashEditEngagmentTemplateAddSignatureCheckbox() {
      return $('#checkbox-rf6');
}

async clickAddSlashEditEngagmentTemplateAddSignatureCheckbox() {
      await this.addSlashEditEngagmentTemplateAddSignatureCheckbox.waitForDisplayed({ timeout: 10000 });
      await this.addSlashEditEngagmentTemplateAddSignatureCheckbox.waitForClickable({ timeout: 10000 });
      await this.addSlashEditEngagmentTemplateAddSignatureCheckbox.click();
      await expect(this.addSlashEditEngagmentTemplateAddSignatureCheckbox).toBeDisplayed();
      await expect(this.addSlashEditEngagmentTemplateAddSignatureCheckbox).toBeEnabled();
}

get firstOptionBLAHButton() {
   return $('//button[@data-testid="edit-engagement-template-field-tab-BLAH"]');
}

async clickFirstOptionBLAHButton() {
   await this.firstOptionBLAHButton.waitForDisplayed({ timeout: 10000 });
   await this.firstOptionBLAHButton.waitForClickable({ timeout: 10000 });
   await this.firstOptionBLAHButton.click();
   await expect(this.firstOptionBLAHButton).toBeDisplayed();
   await expect(this.firstOptionBLAHButton).toBeEnabled();
}

get addFieldDropdwonMenuButon() {
   return $('//button[@data-testid="add-engagement-field-dropdown-trigger"]');
}

async clickAddFieldDropdownMenuButton() {
   await this.addFieldDropdwonMenuButon.waitForDisplayed({ timeout: 10000 });
   await this.addFieldDropdwonMenuButon.waitForClickable({ timeout: 10000 });
   await this.addFieldDropdwonMenuButon.click();
   await expect(this.addFieldDropdwonMenuButon).toBeDisplayed();
   await expect(this.addFieldDropdwonMenuButon).toBeEnabled();
}

    // ======================================================
    // BLAH LEFT BUTTON
    // ======================================================

    get blahLeftButton() {
        return $('//button[contains(., "BLAH")]');
    }

    async clickBlahLeftButton() {
        await this.blahLeftButton.waitForClickable({
            timeout: 10000
        });

        await this.blahLeftButton.click();
    }

    // ======================================================
    // TA DAAAAH TEXTBOX
    // ======================================================

    get taDaaaahTextbox() {
        return $('//textarea');
    }

    // ======================================================
    // DELETE + RETYPE TEXT
    // ======================================================

    async clearAndRetypeTaDaaaahTextbox() {

        await this.taDaaaahTextbox.waitForDisplayed({
            timeout: 10000
        });

        // Click textbox
        await this.taDaaaahTextbox.click();

        // Select all existing text
        await browser.keys(['Control', 'a']);

        // Delete selected text
        await browser.keys('Backspace');

        // Retype text
        await this.taDaaaahTextbox.setValue('TA DAAAAH');
    }

get customFieldButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-custom-item"]');
}

async clickCustomFieldButton() {
   await this.customFieldButton.waitForDisplayed({ timeout: 10000 });
   await this.customFieldButton.waitForClickable({ timeout: 10000 });
   await this.customFieldButton.click();
   await expect(this.customFieldButton).toBeDisplayed();
   await expect(this.customFieldButton).toBeEnabled();
}

get addCustomFieldTextbox() {
   return $('//input[@data-testid="add-engagement-field-dropdown-custom-input"]');
}

async enterAddCustomFieldTextbox(fieldName = "Custom Field Auto") {

   const addCustomFieldTextbox = this.addCustomFieldTextbox;

   await addCustomFieldTextbox.waitForDisplayed({ timeout: 10000 });

   await addCustomFieldTextbox.waitForClickable({ timeout: 10000 });

   await addCustomFieldTextbox.click();

   // Clear existing text first
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');

   // Enter custom field name and commit it into the fields list.
   await addCustomFieldTextbox.setValue(fieldName);
   await expect(addCustomFieldTextbox).toHaveValue(fieldName);
   await browser.keys('Enter');

   const fieldTab = await $(`//button[contains(@data-testid, "edit-engagement-template-field-tab-") and contains(normalize-space(.), "${fieldName}")] | //button[contains(normalize-space(.), "${fieldName}")]`);

   await fieldTab.waitForDisplayed({ timeout: 15000 });
}

get customDashCopyObjectivesButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-objectives"]');
}

async clickCustomDashCopyObjectivesButton() {
   await this.customDashCopyObjectivesButton.waitForDisplayed({ timeout: 10000 });
   await this.customDashCopyObjectivesButton.waitForClickable({ timeout: 10000 });
   await this.customDashCopyObjectivesButton.click();
   await expect(this.customDashCopyObjectivesButton).toBeDisplayed();
   await expect(this.customDashCopyObjectivesButton).toBeEnabled();
}

// ======================================================
// OBJECTIVES TEXTBOX
// ======================================================

get objectivesTextbox() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Objectives"]');
}

// ======================================================
// ENTER OBJECTIVES TEXT
// ======================================================

async enterObjectivesTextbox() {

   const objectiveText = 'Investigate all client communications, organize supporting evidence, and prepare a detailed legal strategy summary for upcoming litigation review.';

   const objectivesTextbox = this.objectivesTextbox;

   await objectivesTextbox.waitForDisplayed({ timeout: 10000 });

   await objectivesTextbox.waitForClickable({ timeout: 10000 });

   await objectivesTextbox.click();

   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');

   // Enter new objective text
   await objectivesTextbox.setValue(objectiveText);

   // Verify text was entered
   await expect(objectivesTextbox).toHaveValue(objectiveText);
}

get clientResponsibilitiesButtonInTheDropdownMenu() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-client-responsibilities"]');
}

async clickClientResponsibilitiesButtonInTheDropdownMenu() {
   await this.clientResponsibilitiesButtonInTheDropdownMenu.waitForDisplayed({ timeout: 10000 });
   await this.clientResponsibilitiesButtonInTheDropdownMenu.waitForClickable({ timeout: 10000 });
   await this.clientResponsibilitiesButtonInTheDropdownMenu.click();
   await expect(this.clientResponsibilitiesButtonInTheDropdownMenu).toBeDisplayed();
   await expect(this.clientResponsibilitiesButtonInTheDropdownMenu).toBeEnabled();
}

get clientResponsibilitiesButtonOutsideTheDropdownMenu() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Client Responsibilities"]');
}

async clickClientResponsibilitiesButtonOutsideTheDropdownMenu() {
   await this.clientResponsibilitiesButtonOutsideTheDropdownMenu.waitForDisplayed({ timeout: 10000 });
   await this.clientResponsibilitiesButtonOutsideTheDropdownMenu.waitForClickable({ timeout: 10000 });
   await this.clientResponsibilitiesButtonOutsideTheDropdownMenu.click();
   await expect(this.clientResponsibilitiesButtonOutsideTheDropdownMenu).toBeDisplayed();
   await expect(this.clientResponsibilitiesButtonOutsideTheDropdownMenu).toBeEnabled();
}

// ======================================================
// ENTER OBJECTIVES TEXT
// ======================================================

async enterObjectivesTextbox() {

   const objectiveText = 'Investigate all client communications, organize supporting evidence, and prepare a detailed legal strategy summary for upcoming litigation review.';

   const objectivesTextbox = this.objectivesTextbox;

   await objectivesTextbox.waitForDisplayed({ timeout: 10000 });

   await objectivesTextbox.waitForClickable({ timeout: 10000 });

   await objectivesTextbox.click();

   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');

   // Enter new objective text
   await objectivesTextbox.setValue(objectiveText);

   // Verify text was entered
   await expect(objectivesTextbox).toHaveValue(objectiveText);
}

get servicesProvidedInTheDropdownMenuButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-services-provided"]');
}

async clickServicesProvidedInTheDropdownMenuButton() {
   await this.servicesProvidedInTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.servicesProvidedInTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.servicesProvidedInTheDropdownMenuButton.click();
   await expect(this.servicesProvidedInTheDropdownMenuButton).toBeDisplayed();
   await expect(this.servicesProvidedInTheDropdownMenuButton).toBeEnabled();
}

get servicesProvidedOutsideTheDropdownMenuButton() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Services Provided"]');
}

async clickServicesProvidedOutsideTheDropdownMenuButton() {
   await this.servicesProvidedOutsideTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.servicesProvidedOutsideTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.servicesProvidedOutsideTheDropdownMenuButton.click();
   await expect(this.servicesProvidedOutsideTheDropdownMenuButton).toBeDisplayed();
   await expect(this.servicesProvidedOutsideTheDropdownMenuButton).toBeEnabled();
}

get enterServicesProvidedTextbox() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Services Provided"]');
}

async enterServicesProvidedTextbox() {

   const servicesProvidedText = 'Comprehensive legal counsel encompassing contract review, risk assessment, and strategic guidance to ensure informed decision-making and mitigate potential liabilities.';
   const servicesProvidedTextbox = this.enterServicesProvidedTextbox;
   await servicesProvidedTextbox.waitForDisplayed({ timeout: 10000 });
   await servicesProvidedTextbox.waitForClickable({ timeout: 10000 });
   await servicesProvidedTextbox.click();
   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');
   // Enter new services provided text
   await servicesProvidedTextbox.setValue(servicesProvidedText);
   // Verify text was entered
   await expect(servicesProvidedTextbox).toHaveValue(servicesProvidedText);
}

get addFIeldCaseDeliverablesWithinTheDropdownMenuButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-case-deliverables"]');
}

async clickAddFIeldCaseDeliverablesWithinTheDropdownMenuButton() {
   await this.addFIeldCaseDeliverablesWithinTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.addFIeldCaseDeliverablesWithinTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.addFIeldCaseDeliverablesWithinTheDropdownMenuButton.click();
   await expect(this.addFIeldCaseDeliverablesWithinTheDropdownMenuButton).toBeDisplayed();
   await expect(this.addFIeldCaseDeliverablesWithinTheDropdownMenuButton).toBeEnabled();
}

get caseDeliverablesOutsideTheDropdownMenuButton() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Case Deliverables"]');
}

async clickCaseDeliverablesOutsideTheDropdownMenuButton() {
   await this.caseDeliverablesOutsideTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.caseDeliverablesOutsideTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.caseDeliverablesOutsideTheDropdownMenuButton.click();
   await expect(this.caseDeliverablesOutsideTheDropdownMenuButton).toBeDisplayed();
   await expect(this.caseDeliverablesOutsideTheDropdownMenuButton).toBeEnabled();
}

get enterCaseDeliverablesTextbox() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Case Deliverables"]');
}

async enterCaseDeliverablesTextbox() {
   const caseDeliverablesText = 'Drafting of comprehensive legal briefs, meticulous evidence compilation, and strategic courtroom representation to achieve favorable outcomes in complex litigation matters.';
   const caseDeliverablesTextbox = this.enterCaseDeliverablesTextbox;
   await caseDeliverablesTextbox.waitForDisplayed({ timeout: 10000 });
   await caseDeliverablesTextbox.waitForClickable({ timeout: 10000 });
   await caseDeliverablesTextbox.click();
   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');
   // Enter new case deliverables text
   await caseDeliverablesTextbox.setValue(caseDeliverablesText);
   // Verify text was entered
   await expect(caseDeliverablesTextbox).toHaveValue(caseDeliverablesText);
}

get addFieldMielstonesButtonWithinTheDropdownMenu() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-milestones"]');
}

async clickAddFieldMielstonesButtonWithinTheDropdownMenu() {
   await this.addFieldMielstonesButtonWithinTheDropdownMenu.waitForDisplayed({ timeout: 10000 });
   await this.addFieldMielstonesButtonWithinTheDropdownMenu.waitForClickable({ timeout: 10000 });
   await this.addFieldMielstonesButtonWithinTheDropdownMenu.click();
   await expect(this.addFieldMielstonesButtonWithinTheDropdownMenu).toBeDisplayed();
   await expect(this.addFieldMielstonesButtonWithinTheDropdownMenu).toBeEnabled();
}

get milestonesOutsideTheDropdownMenuButton() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Milestones"]');
}

async clickMilestonesOutsideTheDropdownMenuButton() {
   await this.milestonesOutsideTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.milestonesOutsideTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.milestonesOutsideTheDropdownMenuButton.click();
   await expect(this.milestonesOutsideTheDropdownMenuButton).toBeDisplayed();
   await expect(this.milestonesOutsideTheDropdownMenuButton).toBeEnabled();
}

get enterMilestonesTextbox() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Milestones"]');
}

async enterMilestonesTextbox() {
   const milestonesText = 'Drafting of comprehensive legal briefs, meticulous evidence compilation, and strategic courtroom representation to achieve favorable outcomes in complex litigation matters.';
   const milestonesTextbox = this.enterMilestonesTextbox;
   await milestonesTextbox.waitForDisplayed({ timeout: 10000 });
   await milestonesTextbox.waitForClickable({ timeout: 10000 });
   await milestonesTextbox.click();
   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');
   // Enter new milestones text
   await milestonesTextbox.setValue(milestonesText);
   // Verify text was entered
   await expect(milestonesTextbox).toHaveValue(milestonesText);
}

get addFieldAssumptionsButtonWithinTheDropdownMenu() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-assumptions"]');
}

async clickAddFieldAssumptionsButtonWithinTheDropdownMenu() {
   await this.addFieldAssumptionsButtonWithinTheDropdownMenu.waitForDisplayed({ timeout: 10000 });
   await this.addFieldAssumptionsButtonWithinTheDropdownMenu.waitForClickable({ timeout: 10000 });
   await this.addFieldAssumptionsButtonWithinTheDropdownMenu.click();
   await expect(this.addFieldAssumptionsButtonWithinTheDropdownMenu).toBeDisplayed();
   await expect(this.addFieldAssumptionsButtonWithinTheDropdownMenu).toBeEnabled();
}

get assumptionsOutsideTheDropdownMenuButton() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Assumptions"]');
}

async clickAssumptionsOutsideTheDropdownMenuButton() {
   await this.assumptionsOutsideTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.assumptionsOutsideTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.assumptionsOutsideTheDropdownMenuButton.click();
   await expect(this.assumptionsOutsideTheDropdownMenuButton).toBeDisplayed();
   await expect(this.assumptionsOutsideTheDropdownMenuButton).toBeEnabled();
}

get enterAssumptionsTextbox() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Assumptions"]');
}

async enterAssumptionsTextbox() {
   const assumptionsText = 'Assumption 1, Assumption 2, Assumption 3';
   const assumptionsTextbox = this.enterAssumptionsTextbox;
   await assumptionsTextbox.waitForDisplayed({ timeout: 10000 });
   await assumptionsTextbox.waitForClickable({ timeout: 10000 });
   await assumptionsTextbox.click();
   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');
   // Enter new assumptions text
   await assumptionsTextbox.setValue(assumptionsText);
   // Verify text was entered
   await expect(assumptionsTextbox).toHaveValue(assumptionsText);
}

get addFieldExclusionsButtonWithinTheDropdownMenu() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-exclusions"]');
}

async clickAddFieldExclusionsButtonWithinTheDropdownMenu() {
   await this.addFieldExclusionsButtonWithinTheDropdownMenu.waitForDisplayed({ timeout: 10000 });
   await this.addFieldExclusionsButtonWithinTheDropdownMenu.waitForClickable({ timeout: 10000 });
   await this.addFieldExclusionsButtonWithinTheDropdownMenu.click();
   await expect(this.addFieldExclusionsButtonWithinTheDropdownMenu).toBeDisplayed();
   await expect(this.addFieldExclusionsButtonWithinTheDropdownMenu).toBeEnabled();
}

get exclusionsOutsideTheDropdownMenuButton() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Exclusions"]');
}

async clickExclusionsOutsideTheDropdownMenuButton() {
   await this.exclusionsOutsideTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.exclusionsOutsideTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.exclusionsOutsideTheDropdownMenuButton.click();
   await expect(this.exclusionsOutsideTheDropdownMenuButton).toBeDisplayed();
   await expect(this.exclusionsOutsideTheDropdownMenuButton).toBeEnabled();
}

get enterExclusionsTextbox() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Exclusions"]');
}

async enterExclusionsTextbox() {
   const exclusionsText = 'Exclusion 1, Exclusion 2, Exclusion 3';
   const exclusionsTextbox = this.enterExclusionsTextbox;
   await exclusionsTextbox.waitForDisplayed({ timeout: 10000 });
   await exclusionsTextbox.waitForClickable({ timeout: 10000 });
   await exclusionsTextbox.click();
   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');
   // Enter new exclusions text
   await exclusionsTextbox.setValue(exclusionsText);
   // Verify text was entered
   await expect(exclusionsTextbox).toHaveValue(exclusionsText);
}

get addFieldDependenciesButtonWithinTheDropdownMenu() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-dependencies"]');
}

async clickAddFieldDependenciesButtonWithinTheDropdownMenu() {
   await this.addFieldDependenciesButtonWithinTheDropdownMenu.waitForDisplayed({ timeout: 10000 });
   await this.addFieldDependenciesButtonWithinTheDropdownMenu.waitForClickable({ timeout: 10000 });
   await this.addFieldDependenciesButtonWithinTheDropdownMenu.click();
   await expect(this.addFieldDependenciesButtonWithinTheDropdownMenu).toBeDisplayed();
   await expect(this.addFieldDependenciesButtonWithinTheDropdownMenu).toBeEnabled();
}

get dependenciesOutsideTheDropdownMenuButton() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Dependencies"]');
}

async clickDependenciesOutsideTheDropdownMenuButton() {
   await this.dependenciesOutsideTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.dependenciesOutsideTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.dependenciesOutsideTheDropdownMenuButton.click();
   await expect(this.dependenciesOutsideTheDropdownMenuButton).toBeDisplayed();
   await expect(this.dependenciesOutsideTheDropdownMenuButton).toBeEnabled();
}

get enterDependenciesTextbox() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Dependencies"]');
}

async enterDependenciesTextbox() {
   const dependenciesText = 'Dependency 1, Dependency 2, Dependency 3';
   const dependenciesTextbox = this.enterDependenciesTextbox;
   await dependenciesTextbox.waitForDisplayed({ timeout: 10000 });
   await dependenciesTextbox.waitForClickable({ timeout: 10000 });
   await dependenciesTextbox.click();
   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');
   // Enter new dependencies text
   await dependenciesTextbox.setValue(dependenciesText);
   // Verify text was entered
   await expect(dependenciesTextbox).toHaveValue(dependenciesText);
}

get addFIeldAcceptanceCriteriaButtonWithinTheDropdownMenu() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-acceptance-criteria"]');
}

async clickAddFIeldAcceptanceCriteriaButtonWithinTheDropdownMenu() {
   await this.addFIeldAcceptanceCriteriaButtonWithinTheDropdownMenu.waitForDisplayed({ timeout: 10000 });
   await this.addFIeldAcceptanceCriteriaButtonWithinTheDropdownMenu.waitForClickable({ timeout: 10000 });
   await this.addFIeldAcceptanceCriteriaButtonWithinTheDropdownMenu.click();
   await expect(this.addFIeldAcceptanceCriteriaButtonWithinTheDropdownMenu).toBeDisplayed();
   await expect(this.addFIeldAcceptanceCriteriaButtonWithinTheDropdownMenu).toBeEnabled();
}

get acceptanceCriteriaOutsideTheDropdownMenuButton() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Acceptance Criteria"]');
}

async clickAcceptanceCriteriaOutsideTheDropdownMenuButton() {
   await this.acceptanceCriteriaOutsideTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.acceptanceCriteriaOutsideTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.acceptanceCriteriaOutsideTheDropdownMenuButton.click();
   await expect(this.acceptanceCriteriaOutsideTheDropdownMenuButton).toBeDisplayed();
   await expect(this.acceptanceCriteriaOutsideTheDropdownMenuButton).toBeEnabled();
}

get enterAcceptanceCriteriaTextbox() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Acceptance Criteria"]');
}

async enterAcceptanceCriteriaTextbox() {
   const acceptanceCriteriaText = 'Acceptance Criteria 1, Acceptance Criteria 2, Acceptance Criteria 3';
   const acceptanceCriteriaTextbox = this.enterAcceptanceCriteriaTextbox;
   await acceptanceCriteriaTextbox.waitForDisplayed({ timeout: 10000 });
   await acceptanceCriteriaTextbox.waitForClickable({ timeout: 10000 });
   await acceptanceCriteriaTextbox.click();
   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');
   // Enter new acceptance criteria text
   await acceptanceCriteriaTextbox.setValue(acceptanceCriteriaText);
   // Verify text was entered
   await expect(acceptanceCriteriaTextbox).toHaveValue(acceptanceCriteriaText);
}

get addFieldBillingTermsWithinTheDropdownMenuButton() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-billing-terms"]');
}

async clickAddFieldBillingTermsWithinTheDropdownMenuButton() {
   await this.addFieldBillingTermsWithinTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.addFieldBillingTermsWithinTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.addFieldBillingTermsWithinTheDropdownMenuButton.click();
   await expect(this.addFieldBillingTermsWithinTheDropdownMenuButton).toBeDisplayed();
   await expect(this.addFieldBillingTermsWithinTheDropdownMenuButton).toBeEnabled();
}

get billingTermsOutsideTheDropdownMenuButton() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Billing Terms"]');
}

async clickBillingTermsOutsideTheDropdownMenuButton() {
   await this.billingTermsOutsideTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.billingTermsOutsideTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.billingTermsOutsideTheDropdownMenuButton.click();
   await expect(this.billingTermsOutsideTheDropdownMenuButton).toBeDisplayed();
   await expect(this.billingTermsOutsideTheDropdownMenuButton).toBeEnabled(); 
}

get enterBillingTermsTextbox() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Billing Terms"]');
}

async enterBillingTermsTextbox() {
   const billingTermsText = 'Billing Terms 1, Billing Terms 2, Billing Terms 3';
   const billingTermsTextbox = this.enterBillingTermsTextbox;
   await billingTermsTextbox.waitForDisplayed({ timeout: 10000 });
   await billingTermsTextbox.waitForClickable({ timeout: 10000 });
   await billingTermsTextbox.click();
   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');
   // Enter new billing terms text
   await billingTermsTextbox.setValue(billingTermsText);
   // Verify text was entered
   await expect(billingTermsTextbox).toHaveValue(billingTermsText);
}

get addFIeldPaymentTermsButtonWithinTheDropdownMenu() {
   return $('//div[@data-testid="add-engagement-field-dropdown-item-payment-terms"]');
}

async clickAddFIeldPaymentTermsButtonWithinTheDropdownMenu() {
   await this.addFIeldPaymentTermsButtonWithinTheDropdownMenu.waitForDisplayed({ timeout: 10000 });
   await this.addFIeldPaymentTermsButtonWithinTheDropdownMenu.waitForClickable({ timeout: 10000 });
   await this.addFIeldPaymentTermsButtonWithinTheDropdownMenu.click();
   await expect(this.addFIeldPaymentTermsButtonWithinTheDropdownMenu).toBeDisplayed();
   await expect(this.addFIeldPaymentTermsButtonWithinTheDropdownMenu).toBeEnabled();
}

get paymentTermsOutsideTheDropdownMenuButton() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Payment Terms"]');
}

async clickPaymentTermsOutsideTheDropdownMenuButton() {
   await this.paymentTermsOutsideTheDropdownMenuButton.waitForDisplayed({ timeout: 10000 });
   await this.paymentTermsOutsideTheDropdownMenuButton.waitForClickable({ timeout: 10000 });
   await this.paymentTermsOutsideTheDropdownMenuButton.click();
   await expect(this.paymentTermsOutsideTheDropdownMenuButton).toBeDisplayed();
   await expect(this.paymentTermsOutsideTheDropdownMenuButton).toBeEnabled(); 
}

get enterPaymentTermsTextbox() {
   return $('//textarea[@data-testid="edit-engagement-template-field-textarea-Payment Terms"]');
}

async enterPaymentTermsTextbox() {
   const paymentTermsText = 'Payment Terms 1, Payment Terms 2, Payment Terms 3';
   const paymentTermsTextbox = this.enterPaymentTermsTextbox;
   await paymentTermsTextbox.waitForDisplayed({ timeout: 10000 });
   await paymentTermsTextbox.waitForClickable({ timeout: 10000 });
   await paymentTermsTextbox.click();
   // Clear existing text
   await browser.keys(['Control', 'a']);
   await browser.keys('Backspace');
   // Enter new payment terms text
   await paymentTermsTextbox.setValue(paymentTermsText);
   // Verify text was entered
   await expect(paymentTermsTextbox).toHaveValue(paymentTermsText);
}

get objectivesXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Objectives"]');
}

async   clickObjectivesXButton() {
   await this.objectivesXButton.waitForDisplayed({ timeout: 10000 });
   await this.objectivesXButton.waitForClickable({ timeout: 10000 });
   await this.objectivesXButton.click();
   await expect(this.objectivesXButton).toBeDisplayed();
   await expect(this.objectivesXButton).toBeEnabled();
}

async verifyObjectivesFieldIsDeleted() {
   const objectivesField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Objectives"]');
   await expect(objectivesField).not.toBeExisting();
}

get clientResponsibilitiesXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Client Responsibilities"]');
}

async clickClientResponsibilitiesXButton() {
   await this.clientResponsibilitiesXButton.waitForDisplayed({ timeout: 10000 });
   await this.clientResponsibilitiesXButton.waitForClickable({ timeout: 10000 });
   await this.clientResponsibilitiesXButton.click();
   await expect(this.clientResponsibilitiesXButton).toBeDisplayed();
   await expect(this.clientResponsibilitiesXButton).toBeEnabled();
}

async verifyClientResponsibilitiesFieldIsDeleted() {
   const clientResponsibilitiesField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Client Responsibilities"]');
   await expect(clientResponsibilitiesField).not.toBeExisting();
}

get servicesProvidedXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Services Provided"]');
}

async clickServicesProvidedXButton() {
   await this.servicesProvidedXButton.waitForDisplayed({ timeout: 10000 });
   await this.servicesProvidedXButton.waitForClickable({ timeout: 10000 });
   await this.servicesProvidedXButton.click();
   await expect(this.servicesProvidedXButton).toBeDisplayed();
   await expect(this.servicesProvidedXButton).toBeEnabled();
}

async verifyServicesProvidedFieldIsDeleted() {
   const servicesProvidedField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Services Provided"]');
   await expect(servicesProvidedField).not.toBeExisting();
}

get servicesProvidedXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Services Provided"]');
}

async clickServicesProvidedXButton() {
   await this.servicesProvidedXButton.waitForDisplayed({ timeout: 10000 });
   await this.servicesProvidedXButton.waitForClickable({ timeout: 10000 });
   await this.servicesProvidedXButton.click();
   await expect(this.servicesProvidedXButton).toBeDisplayed();
   await expect(this.servicesProvidedXButton).toBeEnabled();
}

async verifyServicesProvidedFieldIsDeleted() {
   const servicesProvidedField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Services Provided"]');
   await expect(servicesProvidedField).not.toBeExisting();
}

get caseDeliverablesXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Case Deliverables"]');
}

async clickCaseDeliverablesXButton() {
   await this.caseDeliverablesXButton.waitForDisplayed({ timeout: 10000 });
   await this.caseDeliverablesXButton.waitForClickable({ timeout: 10000 });
   await this.caseDeliverablesXButton.click();
   await expect(this.caseDeliverablesXButton).toBeDisplayed();
   await expect(this.caseDeliverablesXButton).toBeEnabled();
}

async verifyCaseDeliverablesFieldIsDeleted() {
   const caseDeliverablesField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Case Deliverables"]');
   await expect(caseDeliverablesField).not.toBeExisting();
}

get milestonesXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Milestones"]');
}

async clickMilestonesXButton() {
   await this.milestonesXButton.waitForDisplayed({ timeout: 10000 });
   await this.milestonesXButton.waitForClickable({ timeout: 10000 });
   await this.milestonesXButton.click();
   await expect(this.milestonesXButton).toBeDisplayed();
   await expect(this.milestonesXButton).toBeEnabled();
}

async verifyMilestonesFieldIsDeleted() {
   const milestonesField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Milestones"]');
   await expect(milestonesField).not.toBeExisting();
}

get assumptionsXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Assumptions"]');
}

async clickAssumptionsXButton() {
   await this.assumptionsXButton.waitForDisplayed({ timeout: 10000 });
   await this.assumptionsXButton.waitForClickable({ timeout: 10000 });
   await this.assumptionsXButton.click();
   await expect(this.assumptionsXButton).toBeDisplayed();
   await expect(this.assumptionsXButton).toBeEnabled();
}

async verifyAssumptionsFieldIsDeleted() {
   const assumptionsField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Assumptions"]');
   await expect(assumptionsField).not.toBeExisting();
}

get exclusionsXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Exclusions"]');
}

async clickExclusionsXButton() {
   await this.exclusionsXButton.waitForDisplayed({ timeout: 10000 });
   await this.exclusionsXButton.waitForClickable({ timeout: 10000 });
   await this.exclusionsXButton.click();
   await expect(this.exclusionsXButton).toBeDisplayed();
   await expect(this.exclusionsXButton).toBeEnabled();
}

async verifyExclusionsFieldIsDeleted() {
   const exclusionsField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Exclusions"]');
   await expect(exclusionsField).not.toBeExisting();
}

get dependenciesXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Dependencies"]');
}

async clickDependenciesXButton() {
   await this.dependenciesXButton.waitForDisplayed({ timeout: 10000 });
   await this.dependenciesXButton.waitForClickable({ timeout: 10000 });
   await this.dependenciesXButton.click();
   await expect(this.dependenciesXButton).toBeDisplayed();
   await expect(this.dependenciesXButton).toBeEnabled();
}

async verifyDependenciesFieldIsDeleted() {
   const dependenciesField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Dependencies"]');
   await expect(dependenciesField).not.toBeExisting();
}

get acceptanceCriteriaXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Acceptance Criteria"]');
}

async clickAcceptanceCriteriaXButton() {
   await this.acceptanceCriteriaXButton.waitForDisplayed({ timeout: 10000 });
   await this.acceptanceCriteriaXButton.waitForClickable({ timeout: 10000 });
   await this.acceptanceCriteriaXButton.click();
   await expect(this.acceptanceCriteriaXButton).toBeDisplayed();
   await expect(this.acceptanceCriteriaXButton).toBeEnabled();
}

async verifyAcceptanceCriteriaFieldIsDeleted() {
   const acceptanceCriteriaField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Acceptance Criteria"]');
   await expect(acceptanceCriteriaField).not.toBeExisting();
}

get billingTermsXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Billing Terms"]');
}

async clickBillingTermsXButton() {
   await this.billingTermsXButton.waitForDisplayed({ timeout: 10000 });
   await this.billingTermsXButton.waitForClickable({ timeout: 10000 });
   await this.billingTermsXButton.click();
   await expect(this.billingTermsXButton).toBeDisplayed();
   await expect(this.billingTermsXButton).toBeEnabled();
}

async verifyBillingTermsFieldIsDeleted() {
   const billingTermsField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Billing Terms"]');
   await expect(billingTermsField).not.toBeExisting();
}

get paymentTermsXButton() {
   return $('//button[@data-testid="edit-engagement-template-remove-button-Payment Terms"]');
}

async clickPaymentTermsXButton() {
   await this.paymentTermsXButton.waitForDisplayed({ timeout: 10000 });
   await this.paymentTermsXButton.waitForClickable({ timeout: 10000 });
   await this.paymentTermsXButton.click();
   await expect(this.paymentTermsXButton).toBeDisplayed();
   await expect(this.paymentTermsXButton).toBeEnabled();
}

async verifyPaymentTermsFieldIsDeleted() {
   const paymentTermsField = $('//textarea[@data-testid="edit-engagement-template-field-textarea-Payment Terms"]');
   await expect(paymentTermsField).not.toBeExisting();
}

get customDashCopySaveButton() {
   return $('//button[@data-testid="edit-engagement-template-save-button"]');
}

async clickCustomDashCopySaveButton() {
   await this.customDashCopySaveButton.waitForDisplayed({ timeout: 10000 });
   await this.customDashCopySaveButton.waitForClickable({ timeout: 10000 });
   await this.customDashCopySaveButton.click();
   await expect(this.customDashCopySaveButton).toBeDisplayed();
   await expect(this.customDashCopySaveButton).toBeEnabled();
}

get customDashCopyCancelButton() {
   return $('//button[@data-testid="edit-engagement-template-cancel-button"]');
}

async clickCustomDashCopyCancelButton() {
   await this.customDashCopyCancelButton.waitForDisplayed({ timeout: 10000 });
   await this.customDashCopyCancelButton.waitForClickable({ timeout: 10000 });
   await this.customDashCopyCancelButton.click();
   await expect(this.customDashCopyCancelButton).toBeDisplayed();
   await expect(this.customDashCopyCancelButton).toBeEnabled();
}

get backToEngagmentTemplatesButton() {
   return $('//button[@data-testid="back-to-engagement-templates-button"]');
}

async clickBackToEngagmentTemplatesButton() {
   await this.backToEngagmentTemplatesButton.waitForDisplayed({ timeout: 10000 });
   await this.backToEngagmentTemplatesButton.waitForClickable({ timeout: 10000 });
   await this.backToEngagmentTemplatesButton.click();
   await expect(this.backToEngagmentTemplatesButton).toBeDisplayed();
   await expect(this.backToEngagmentTemplatesButton).toBeEnabled();
}
}
export default new DashboardEngagementTemplates();