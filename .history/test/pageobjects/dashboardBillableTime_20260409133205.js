import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardBillableTimePage extends Page {

    // =============================
    // BILLABLE TIME SECTION GETTERS
    // =============================

    get billableTimeSection() {
        return $('[data-testid="billable-time-section"]');
    }

    get addBillableTimeButton() {
        return $('[data-testid="billable-time-add-button"]');
    }

    get billableTimeRows() {
        return $$('[data-testid^="billable-time-row-"]');
    }

    get billableTimeFilterDropdown() {
        return $('[data-testid="billable-time-filter-dropdown"]');
    }

    get saveBillableTimeButton() {
        return $('[data-testid="billable-time-save-button"]');
    }

    get cancelBillableTimeButton() {
        return $('[data-testid="billable-time-cancel-button"]');
    }

    // =============================
    // HELPER METHODS
    // =============================

    async jsScrollIntoView(element) {
        const resolvedElement = await element;
        await browser.execute((el) => {
            el.scrollIntoView({ block: "center", inline: "center" });
        }, resolvedElement);
    }

    async waitForBillableTimeSection() {
        await this.billableTimeSection.waitForDisplayed({ timeout: 10000 });
    }

}

export default new DashboardBillableTimePage();
