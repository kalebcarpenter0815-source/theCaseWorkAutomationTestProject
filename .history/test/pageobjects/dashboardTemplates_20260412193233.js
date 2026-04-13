import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardTemplatesPage extends Page {
    // =============================
    // NAV + PAGE GETTERS
    // =============================

    get templatesNavButton() {
        return $('//*[@data-testid="vert-nav-templates"] | //button[@data-testid="vert-nav-templates"] | //a[@data-testid="vert-nav-templates"] | //span[normalize-space()="Templates"]/ancestor::*[self::a or self::button or @role="button" or self::div][1]');
    }

    get templatesHeader() {
        return $('//h1[normalize-space()="Templates"]');
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

    get confirmCopyDialog() {
        return $('//div[@role="dialog" and .//*[contains(normalize-space(),"Confirm Copy")]]');
    }

    get confirmDeleteDialog() {
        return $('//div[@role="dialog" and .//*[contains(normalize-space(),"Confirm Delete")]]');
    }

    get confirmYesButton() {
        return $('//div[@role="dialog"]//button[normalize-space()="Yes" or .//span[normalize-space()="Yes"]]');
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
        await this.safeClick(this.templatesNavButton);
        await this.templatesHeader.waitForDisplayed({ timeout: 10000 });
    }

    async ensureCaseTemplatesTabIsOpen() {
        const cardIsVisible = await this.caseTemplatesCardTitle.isDisplayed().catch(() => false);

        if (!cardIsVisible) {
            await this.safeClick(this.caseTemplatesTab);
        }

        await this.caseTemplatesCardTitle.waitForDisplayed({ timeout: 10000 });
    }

    async clickNewTemplate() {
        await this.safeClick(this.newTemplateButton);
    }

    getTemplateRowByName(templateName) {
        return $(`//tr[.//*[normalize-space()="${templateName}"]] | //div[@role="row"][.//*[normalize-space()="${templateName}"]]`);
    }

    getActionButtonInsideRow(templateName, actionName) {
        return $(`//tr[.//*[normalize-space()="${templateName}"]]//button[normalize-space()="${actionName}" or .//span[normalize-space()="${actionName}"] or contains(@aria-label,"${actionName}") or contains(@title,"${actionName}")] | //div[@role="row"][.//*[normalize-space()="${templateName}"]]//button[normalize-space()="${actionName}" or .//span[normalize-space()="${actionName}"] or contains(@aria-label,"${actionName}") or contains(@title,"${actionName}")]`);
    }

    getVisibleActionButton(actionName) {
        return $(`(//button[normalize-space()="${actionName}" or .//span[normalize-space()="${actionName}"] or contains(@aria-label,"${actionName}") or contains(@title,"${actionName}")])[last()]`);
    }

    async hoverTemplateRowByName(templateName) {
        const row = this.getTemplateRowByName(templateName);
        await row.waitForDisplayed({ timeout: 10000 });
        await this.jsScrollIntoView(row);
        await row.moveTo();
    }

    async clickTemplateActionByName(templateName, actionName) {
        await this.hoverTemplateRowByName(templateName);

        const rowActionButton = this.getActionButtonInsideRow(templateName, actionName);
        const rowActionVisible = await rowActionButton.isDisplayed().catch(() => false);

        if (rowActionVisible) {
            await this.safeClick(rowActionButton);
            return;
        }

        const visibleActionButton = this.getVisibleActionButton(actionName);
        await this.safeClick(visibleActionButton);
    }

    async confirmDialogYes() {
        await this.confirmYesButton.waitForDisplayed({ timeout: 10000 });
        await this.safeClick(this.confirmYesButton);
        await browser.waitUntil(async () => {
            const copyDialogVisible = await this.confirmCopyDialog.isDisplayed().catch(() => false);
            const deleteDialogVisible = await this.confirmDeleteDialog.isDisplayed().catch(() => false);
            return !copyDialogVisible && !deleteDialogVisible;
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm dialog did not close after clicking Yes",
        });
    }

    async copyTemplateAndConfirm(templateName) {
        await this.clickTemplateActionByName(templateName, "Copy");
        await this.confirmCopyDialog.waitForDisplayed({ timeout: 10000 });
        await this.confirmDialogYes();
        await this.ensureCaseTemplatesTabIsOpen();
    }

    async deleteTemplateAndConfirm(templateName) {
        await this.clickTemplateActionByName(templateName, "Delete");
        await this.confirmDeleteDialog.waitForDisplayed({ timeout: 10000 });
        await this.confirmDialogYes();
        await this.ensureCaseTemplatesTabIsOpen();
    }

    async getAllTemplateNames() {
        const nameCells = await $$('//h2[normalize-space()="Case Templates"]/ancestor::div[1]//tbody/tr/td[1] | //div[@role="row"]/*[1]');
        const names = [];

        for (const cell of nameCells) {
            names.push((await cell.getText()).trim());
        }

        return names.filter((name) => name.length > 0);
    }

    async countTemplatesByExactName(templateName) {
        const names = await this.getAllTemplateNames();
        return names.filter((name) => name === templateName).length;
    }

    async deleteTemplatesUntilCount(templateName, targetCount) {
        for (let i = 0; i < 10; i += 1) {
            const currentCount = await this.countTemplatesByExactName(templateName);
            if (currentCount <= targetCount) {
                break;
            }

            await this.deleteTemplateAndConfirm(templateName);
        }
    }
}

export default new DashboardTemplatesPage();
