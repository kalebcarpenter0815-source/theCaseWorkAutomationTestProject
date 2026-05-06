import { $ } from "@wdio/globals";
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

    // We will then do Case Type info icon button and text as well as the Allowed Statuses info icon button and text in the next sprint as part of the Case Template creation flow.

}

export default new DashboardTemplatesPage();
