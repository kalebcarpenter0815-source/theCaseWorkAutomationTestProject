import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardTemplatesPage extends Page {
    // =============================
    // NAV + PAGE GETTERS
    // =============================

    // Keep selectors in this pageobject file (not in spec files).
    // If a selector changes in the app, you only fix it here once.
    get templatesNavButton() {
        return $('//span[normalize-space()="Templates"]/ancestor::*[self::a or @role="button" or self::div][1]');
    }

    get templatesHeader() {
        return $('//h1[normalize-space()="Templates"]');
    }

    // Tabs under the Templates page (left side inside the page).
    get caseDataTypesTab() {
        return $('//span[normalize-space()="Case Data Types"]');
    }

    get engagementTemplatesTab() {
        return $('//span[normalize-space()="Engagement Templates"]');
    }

    get caseTemplatesTab() {
        return $('//span[normalize-space()="Case Templates"]');
    }

    // Main card for this test area.
    get caseTemplatesCardTitle() {
        return $('//h2[normalize-space()="Case Templates"]');
    }

    get newTemplateButton() {
        // Use a data-testid if your app has one (more stable than text/XPath).
        // Replace this with your real test id once confirmed in DevTools.
        return $('[data-testid="new-template-button"], //button[.//span[normalize-space()="New Template"] or normalize-space()="New Template"]');
    }

    get 

    // get caseTemplateRows() {
    //     // Support either <table> rows or div-based grid rows.
    //     return $$('//h2[normalize-space()="Case Templates"]/ancestor::section[1]//tbody/tr | //h2[normalize-space()="Case Templates"]/ancestor::div[1]//div[@role="rowgroup"]//div[@role="row"]');
    // }

    get blueSidebarTemplatesBtn() {
        return $('//button[@data-testid="vert-nav-templates"]');
    }

    // =============================
    // REUSABLE HELPER METHODS
    // =============================

    async jsScrollIntoView(element) {
        const resolvedElement = await element;
        await browser.execute((el) => {
            el.scrollIntoView({ block: "center", inline: "center" });
        }, resolvedElement);
    }

    async safeClick(element) {
        // A reusable click helper:
        // 1) normal WebDriver click first
        // 2) JavaScript click fallback if UI overlay blocks normal click
        const resolvedElement = await element;
        await resolvedElement.waitForDisplayed({ timeout: 10000 });
        await this.jsScrollIntoView(resolvedElement);

        try {
            await resolvedElement.waitForClickable({ timeout: 5000 });
            await resolvedElement.click();
        } catch (error) {
            await browser.execute((el) => el.click(), resolvedElement);
        }
    }

    async goToTemplatesPage() {
        // Keep page navigation steps in pageobjects.
        await this.safeClick(this.templatesNavButton);
        await this.templatesHeader.waitForDisplayed({ timeout: 10000 });
    }

    async openCaseTemplatesTab() {
        await this.safeClick(this.caseTemplatesTab);
        await this.caseTemplatesCardTitle.waitForDisplayed({ timeout: 10000 });
    }

    async waitForCaseTemplatesCard() {
        await this.caseTemplatesCardTitle.waitForDisplayed({ timeout: 10000 });
    }

    async clickNewTemplate() {
        await this.safeClick(this.newTemplateButton);
    }

    getTemplateRowByName(templateName) {
        // Dynamic function example:
        // Pass in text so this method can target any row by name.
        return $(`//tr[.//*[normalize-space()="${templateName}"]] | //div[@role="row"][.//*[normalize-space()="${templateName}"]]`);
    }

    getTemplateRowMenuButtonByName(templateName) {
        // This assumes each row has a trailing menu (kebab) button.
        return $(`(//tr[.//*[normalize-space()="${templateName}"]]//button)[last()] | (//div[@role="row"][.//*[normalize-space()="${templateName}"]]//button)[last()]`);
    }

    async openTemplateRowMenuByName(templateName) {
        const rowMenuButton = this.getTemplateRowMenuButtonByName(templateName);
        await this.safeClick(rowMenuButton);
    }

    async getAllTemplateNames() {
        // Useful helper for assertions.
        const nameCells = await $$('//h2[normalize-space()="Case Templates"]/ancestor::div[1]//tbody/tr/td[1] | //div[@role="row"]/*[1]');
        const names = [];

        for (const cell of nameCells) {
            names.push((await cell.getText()).trim());
        }

        return names.filter((name) => name.length > 0);
    }
}

export default new DashboardTemplatesPage();
