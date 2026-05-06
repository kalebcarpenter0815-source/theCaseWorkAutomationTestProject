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
        return $('#infolabel-rkq__infoButton');
    }


}

export default new DashboardTemplatesPage();
