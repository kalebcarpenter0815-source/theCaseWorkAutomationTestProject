import { $, expect } from "@wdio/globals";
import dashboardTemplatesPage from "./dashboardTemplates.js";

class DashboardTemplatesComprehensivePage {
    async openCaseTemplatesLanding() {
        await dashboardTemplatesPage.goToTemplatesPage();
        await dashboardTemplatesPage.ensureCaseTemplatesTabIsOpen();

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    }

    async ensureTemplateExists(templateName) {
        const count = await dashboardTemplatesPage.countTemplatesByExactName(templateName);
        if (count > 0) {
            return;
        }

        if (templateName === "You're the Best Around-Copy") {
            await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around");
        }
    }

    async ensureBaselineRows() {
        await this.openCaseTemplatesLanding();

        await dashboardTemplatesPage.deleteTemplatesUntilCount("Pikachu", 1);
        await dashboardTemplatesPage.deleteTemplatesUntilCount("You're the Best Around", 1);

        await this.ensureTemplateExists("You're the Best Around-Copy");
        await dashboardTemplatesPage.deleteTemplatesUntilCount("You're the Best Around-Copy", 1);

        const allNames = await dashboardTemplatesPage.getAllTemplateNames();
        const nestedCopyNames = [...new Set(allNames.filter((name) => (
            name.startsWith("Pikachu-Copy")
            || name.startsWith("You're the Best Around-Copy-Copy")
        )))];

        for (const rowName of nestedCopyNames) {
            await dashboardTemplatesPage.deleteTemplatesUntilCount(rowName, 0);
        }
    }

    async openAndCloseCaseTemplatesInfo() {
        const infoButton = $(
            '//*[self::h1 or self::h2 or self::h3 or @role="heading" or self::span][normalize-space()="Case Templates"]'
            + '/following::*[self::button or @role="button"][1]'
            + ' | //*[contains(normalize-space(),"Case Templates")]/ancestor::*[self::div][1]//button[contains(@class,"InfoButton") or starts-with(@id,"infolabel-") or @aria-label="information"][1]'
        );

        const directInfoExists = await infoButton.isDisplayed().catch(() => false);
        if (directInfoExists) {
            await infoButton.waitForClickable({ timeout: 5000 });

            const wasExpanded = await infoButton.getAttribute("aria-expanded").catch(() => null);
            const hadDescribedBy = await infoButton.getAttribute("aria-describedby").catch(() => null);

            await dashboardTemplatesPage.safeClick(infoButton);

            const infoPopup = $(
                '//div[@role="tooltip" or @role="dialog" or contains(@class,"Popover") or contains(@class,"Tooltip")]'
            );

            // Different UI builds expose info as tooltip, dialog, or button state changes.
            const opened = await browser.waitUntil(async () => {
                const popupVisible = await infoPopup.isDisplayed().catch(() => false);
                const isExpanded = await infoButton.getAttribute("aria-expanded").catch(() => null);
                const describedBy = await infoButton.getAttribute("aria-describedby").catch(() => null);
                return popupVisible
                    || (isExpanded !== null && isExpanded !== wasExpanded)
                    || (!!describedBy && describedBy !== hadDescribedBy);
            }, {
                timeout: 5000,
                interval: 150,
            }).catch(() => false);

            expect(opened).toBe(true);

            // Toggle the same info button again to close.
            await dashboardTemplatesPage.safeClick(infoButton);

            await browser.waitUntil(async () => {
                const popupVisible = await infoPopup.isDisplayed().catch(() => false);
                const isExpanded = await infoButton.getAttribute("aria-expanded").catch(() => null);
                return !popupVisible || isExpanded === "false";
            }, {
                timeout: 5000,
                interval: 150,
            }).catch(() => false);
            return;
        }

        // Fallback for UI variants where the icon structure changed.
        const toggled = await dashboardTemplatesPage.clickInfoIconByNearbyTextIfPresent("Case Templates");
        expect(toggled).toBe(true);
    }

    async performCopyDeleteSequence() {
        await this.ensureBaselineRows();

        await dashboardTemplatesPage.copyTemplateAndConfirm("Pikachu");
        await dashboardTemplatesPage.copyTemplateWithDeclineThenConfirm("You're the Best Around");
        await dashboardTemplatesPage.copyTemplateAndConfirm("You're the Best Around-Copy");

        await dashboardTemplatesPage.deleteTemplateWithDeclineThenConfirm("Pikachu-Copy");

        const ytbaCopyCount = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy");
        if (ytbaCopyCount > 1) {
            await dashboardTemplatesPage.deleteTemplateWithDeclineThenConfirm("You're the Best Around-Copy");
        }

        const ytbaCopyCopyCount = await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy-Copy");
        if (ytbaCopyCopyCount > 0) {
            await dashboardTemplatesPage.deleteTemplateWithDeclineThenConfirm("You're the Best Around-Copy-Copy");
        }

        await expect(await dashboardTemplatesPage.countTemplatesByExactName("Pikachu")).toBe(1);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around")).toBe(1);
        await expect(await dashboardTemplatesPage.countTemplatesByExactName("You're the Best Around-Copy")).toBeGreaterThan(0);
    }

    async runFullEditFlowForTemplate(templateName) {
        await this.openCaseTemplatesLanding();
        await this.ensureTemplateExists(templateName);
        await dashboardTemplatesPage.runFullTemplateEditFlow(templateName);

        const currentUrl = await browser.getUrl();
        expect(currentUrl).toContain("/templates");
        await expect(dashboardTemplatesPage.caseTemplatesCardTitle).toBeDisplayed();
    }

    async getTailTemplateNamesFrom(startName) {
        await this.openCaseTemplatesLanding();
        const allNames = await dashboardTemplatesPage.getAllTemplateNames();
        const uniqueNames = [...new Set(allNames)];
        const startIndex = uniqueNames.indexOf(startName);

        if (startIndex >= 0) {
            return uniqueNames.slice(startIndex);
        }

        return [startName];
    }
}

export default new DashboardTemplatesComprehensivePage();
