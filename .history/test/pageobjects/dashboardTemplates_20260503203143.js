import { $ } from "@wdio/globals";
import Page from "./page.js";

class DashboardTemplatesPage extends Page {
    get templatesNavButton() {
        return $('//*[@data-testid="vert-nav-templates"]');
    }

    async open() {
        await this.templatesNavButton.click();
    }

    get 
}

export default new DashboardTemplatesPage();
