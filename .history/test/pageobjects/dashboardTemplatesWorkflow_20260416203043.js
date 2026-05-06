import { $ } from "@wdio/globals";
import Page from "./page.js";

class DashboardTemplatesWorkflowPage extends Page {
    get templatesNavButton() {
        return $('//*[@data-testid="vert-nav-templates"] | //button[@data-testid="vert-nav-templates"] | //a[@data-testid="vert-nav-templates"] | //span[normalize-space()="Templates"]/ancestor::*[self::a or self::button or @role="button" or self::div][1]');
    }

    get caseTemplatesTab() {
        return $('//*[@data-testid="templates-tab-case-templates"] | //span[normalize-space()="Case Templates"]/ancestor::*[self::a or self::button or @role="tab" or @role="button" or self::div][1]');
    }

    get caseTemplatesCardTitle() {
        return $('//h2[contains(normalize-space(),"Case Templates")] | //*[contains(normalize-space(),"Case Templates")]');
    }

    get newTemplateButton() {
        return $('//button[.//span[normalize-space()="New Template"] or normalize-space()="New Template"]');
    }

    get infoIconButton() {
        return $('//*[@data-testid="templates-info-icon"] | //button[@aria-label="Info"] | //button[contains(@aria-label,"info") or contains(@title,"info")]');
    }

    get infoDialog() {
        return $('//div[@role="dialog" and (.//*[contains(normalize-space(),"Template")] or .//*[contains(normalize-space(),"Case Templates")])]');
    }

    get closeInfoButton() {
        return $('//div[@role="dialog"]//button[@aria-label="Close" or normalize-space()="Close" or .//span[normalize-space()="Close"]]');
    }

    async waitForExactTemplatesUrl() {
        await browser.waitUntil(async () => (await browser.getUrl()) === "https://app.thecasework.com/templates", {
            timeout: 15000,
            interval: 400,
            timeoutMsg: "Expected URL to be exactly https://app.thecasework.com/templates",
        });
    }

    async openCaseTemplatesLanding() {
        await this.templatesNavButton.waitForDisplayed({ timeout: 15000 });
        await this.templatesNavButton.click();

        await this.caseTemplatesTab.waitForDisplayed({ timeout: 15000 });
        await this.caseTemplatesTab.click();

        await this.waitForExactTemplatesUrl();
        await this.caseTemplatesCardTitle.waitForDisplayed({ timeout: 15000 });
        await this.newTemplateButton.waitForDisplayed({ timeout: 15000 });
    }

    async openAndCloseCaseTemplatesInfo() {
        await this.infoIconButton.waitForDisplayed({ timeout: 10000 });
        await this.infoIconButton.click();

        await this.infoDialog.waitForDisplayed({ timeout: 10000 });

        if (await this.closeInfoButton.isExisting()) {
            await this.closeInfoButton.click();
        } else {
            await browser.keys("Escape");
        }

        await this.infoDialog.waitForDisplayed({ timeout: 10000, reverse: true });
        return true;
    }
}

export default new DashboardTemplatesWorkflowPage();
