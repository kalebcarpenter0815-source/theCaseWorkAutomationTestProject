import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardTemplatesPage extends Page {
    // =============================
    // COACHING NOTES (READ FIRST)
    // =============================
    // WHAT I WOULD FIX FROM WHAT YOU CURRENTLY ADDED:
    // 1) You currently have rowTemplatePikachu defined twice.
    //    - Keep only one real getter in final code.
    //    - If you want dynamic behavior, prefer getTemplateRowByName(templateName).
    // 2) This pageobject references TEMPLATE_TO_VALIDATE in one getter.
    //    - That constant lives in the spec file, not here.
    //    - Pageobjects should not depend on spec constants.
    // 3) You have both templatesNavButton and blueSidebarTemplatesBtn.
    //    - Pick one stable selector and keep one getter for nav.
    // 4) For long-term maintainability, prefer data-testid selectors over long XPath.
    //
    // HOW TO ORGANIZE THIS FILE:
    // - Section 1: getters only (no assertions).
    // - Section 2: helper actions (safeClick, waits, text reads).
    // - Section 3: flow methods (goToTemplatesPage, open tab, create template).
    //
    // COMMENTED EXAMPLES YOU CAN UNCOMMENT LATER:
    // get templatesNavButton() {
    //     return $('[data-testid="vert-nav-templates"]');
    // }
    //
    // getTemplateRowByName(templateName) {
    //     return $(`//div[@role="row"][.//*[normalize-space()="${templateName}"]]`);
    // }
    //
    // async clickTemplateRowByName(templateName) {
    //     const row = this.getTemplateRowByName(templateName);
    //     await this.safeClick(row);
    // }

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
    // get caseDataTypesTab() {
    //     return $('//span[normalize-space()="Case Data Types"]');  THIS CURRENT GETTER IS NOT NEEDED FOR MY CURRENT TESTS, BUT I CAN ASK THE TEACHER TO SEE IF I CAN KEEP THIS AND ADD IT TO MY TEST LATER?
    // }

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

    // SUGGESTED NEXT GETTERS TO ADD WHEN YOU BUILD CREATE TEMPLATE:
    // get newTemplateModal() {
    //     return $('[data-testid="template-modal"]');
    // }
    //
    // get templateNameInput() {
    //     return $('[data-testid="template-name-input"]');
    // }
    //
    // get caseTypeDropdown() {
    //     return $('[data-testid="template-case-type-dropdown"]');
    // }
    //
    // get descriptionInput() {
    //     return $('[data-testid="template-description-input"]');
    // }
    //
    // get saveTemplateButton() {
    //     return $('[data-testid="template-save-button"]');
    // }

    get rowTemplatePikachu() {
        return $('//div[@role="row"][.//span[contains(text(), "Pikachu")]]');
    }

    get rowTemplateYoureTheBestAround() {
        return $('//div[@role="row"][.//span[normalize-space(.)="You\'re the Best Around"]]');
    }

    get rowTemplateYoureTheBestAroundCopy() {
        return $('//div[@role="row"][.//span[normalize-space(.)="You\'re the Best Around-Copy"]]');
    }

    get rowTemplatePikachu() {
        // Example of a dynamic getter for a specific row based on template name.
        // FIX NOTE: this line uses TEMPLATE_TO_VALIDATE, but that constant is in spec.
        // In final cleanup, remove this getter OR pass the name as a function argument.
        return this.getTemplateRowByName(TEMPLATE_TO_VALIDATE);
    }

    get caseTemplateRows() {
        // Support either <table> rows or div-based grid rows.
        return $$('//h2[normalize-space()="Case Templates"]/ancestor::section[1]//tbody/tr | //h2[normalize-space()="Case Templates"]/ancestor::div[1]//div[@role="rowgroup"]//div[@role="row"]');
    }

    get blueSidebarTemplatesBtn() {
        return $('//button[@data-testid="vert-nav-templates"]');
    }

    get templatesInfoButton() {
        return $('#infolabel-r4u__infoButton');
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

    // SUGGESTED FLOW FUNCTIONS TO ADD WHEN YOU START CREATE TEMPLATE TESTING:
    // async waitForNewTemplateModal() {
    //     await this.newTemplateModal.waitForDisplayed({ timeout: 10000 });
    // }
    //
    // async fillTemplateName(templateName) {
    //     await this.templateNameInput.waitForDisplayed({ timeout: 10000 });
    //     await this.templateNameInput.setValue(templateName);
    // }
    //
    // async fillTemplateDescription(description) {
    //     await this.descriptionInput.waitForDisplayed({ timeout: 10000 });
    //     await this.descriptionInput.setValue(description);
    // }
    //
    // async selectCaseType(caseTypeText) {
    //     await this.safeClick(this.caseTypeDropdown);
    //     const option = $(`//div[@role="option" and normalize-space()="${caseTypeText}"]`);
    //     await this.safeClick(option);
    // }
    //
    // async saveNewTemplate() {
    //     await this.safeClick(this.saveTemplateButton);
    // }
    //
    // async createTemplate({ name, caseType, description }) {
    //     await this.clickNewTemplate();
    //     await this.waitForNewTemplateModal();
    //     await this.fillTemplateName(name);
    //     await this.selectCaseType(caseType);
    //     await this.fillTemplateDescription(description);
    //     await this.saveNewTemplate();
    // }

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

    // ASSERTION-HELPER STYLE EXAMPLES (KEEP ASSERTIONS IN SPEC FILE):
    // async doesTemplateExistByName(templateName) {
    //     const row = this.getTemplateRowByName(templateName);
    //     return await row.isExisting();
    // }
    //
    // async waitForTemplateToAppear(templateName) {
    //     await browser.waitUntil(async () => {
    //         const row = this.getTemplateRowByName(templateName);
    //         return await row.isDisplayed().catch(() => false);
    //     }, {
    //         timeout: 10000,
    //         timeoutMsg: `Template row did not appear for: ${templateName}`,
    //     });
    // }
}

export default new DashboardTemplatesPage();
