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

        async isTemplatePresent(templateName) { 
        const templateSelector = `//div[@data-testid="template-card-${templateName}"]`;
        const templateElement = await $(templateSelector);
        return templateElement.isExisting();

}

export default new DashboardTemplatesPage();
