import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardTemplatesPage extends Page {
    // =============================
    // COACHING NOTES (READ FIRST)
    // =============================

    // =============================
    // NAV + PAGE GETTERS
    // =============================

    get templatesNavButton() {
        return $('//span[normalize-space()="Templates"]/ancestor::*[self::a or @role="button" or self::div][1]');
    }

    get templatesHeader() {
        return $('//h1[normalize-space()="Templates"]');
    }

    get engagementTemplatesTab() {
        return $('//span[normalize-space()="Engagement Templates"]');
    }

    get caseTemplatesTab() {
        return $('//span[normalize-space()="Case Templates"]');
    }

    get caseTemplatesCardTitle() {
        return $('//h2[normalize-space()="Case Templates"]');
    }

    get newTemplateButton() {
        return $('//button[.//span[normalize-space()="New Template"] or normalize-space()="New Template"]');
    }

    // Row for a specific template called "Pikachu"
    get rowTemplatePikachu() {
        return $('//div[@role="row"][.//span[contains(text(), "Pikachu")]]');
    }

    get rowTemplateYoureTheBestAround() {
        return $('//div[@role="row"][.//span[normalize-space(.)="You\'re the Best Around"]]');
    }

    get rowTemplateYoureTheBestAroundCopy() {
        return $('//div[@role="row"][.//span[normalize-space(.)="You\'re the Best Around-Copy"]]');
    }

    // All rows inside the Case Templates table
    get caseTemplateRows() {
        return $$('//h2[normalize-space()="Case Templates"]/ancestor::section[1]//tbody/tr | //h2[normalize-space()="Case Templates"]/ancestor::div[1]//div[@role="rowgroup"]//div[@role="row"]');
    }

    get templatesInfoButton() {
        return $('#infolabel-r4u__infoButton');
    }

    // =============================
    // REUSABLE HELPER METHODS
    // =============================

    // Scrolls an element into view so it is visible before clicking
    async jsScrollIntoView(element) {
        const resolvedElement = await element;
        await browser.execute((el) => {
            el.scrollIntoView({ block: "center", inline: "center" });
        }, resolvedElement);
    }

    // Tries a normal click first, then falls back to a JavaScript click
    async safeClick(element) {
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

    // Clicks the Templates nav button and waits for the page to load
    async goToTemplatesPage() {
        await this.safeClick(this.templatesNavButton);
        await this.templatesHeader.waitForDisplayed({ timeout: 10000 });
    }

    // Clicks the Case Templates tab and waits for the card to appear
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

    // Returns a row element for any template by its name
    getTemplateRowByName(templateName) {
        return $(`//tr[.//*[normalize-space()="${templateName}"]] | //div[@role="row"][.//*[normalize-space()="${templateName}"]]`);
    }

    // Returns the menu button (three-dot/kebab) at the end of a template row
    getTemplateRowMenuButtonByName(templateName) {
        return $(`(//tr[.//*[normalize-space()="${templateName}"]]//button)[last()] | (//div[@role="row"][.//*[normalize-space()="${templateName}"]]//button)[last()]`);
    }

    async openTemplateRowMenuByName(templateName) {
        const rowMenuButton = this.getTemplateRowMenuButtonByName(templateName);
        await this.safeClick(rowMenuButton);
    }

    // Returns an array of all template names shown in the table
    async getAllTemplateNames() {
        const nameCells = await $$('//h2[normalize-space()="Case Templates"]/ancestor::div[1]//tbody/tr/td[1] | //div[@role="row"]/*[1]');
        const names = [];

        for (const cell of nameCells) {
            names.push((await cell.getText()).trim());
        }

        return names.filter((name) => name.length > 0);
    }
}

export default new DashboardTemplatesPage();
