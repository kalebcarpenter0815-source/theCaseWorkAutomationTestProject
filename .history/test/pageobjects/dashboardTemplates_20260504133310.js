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

}

export default new DashboardTemplatesPage();
