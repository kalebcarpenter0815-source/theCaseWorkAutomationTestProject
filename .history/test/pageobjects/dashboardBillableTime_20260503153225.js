import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardBillableTimePage extends Page {

    // =============================
    // BILLABLE TIME SECTION GETTERS
    // =============================

    get billableTimeSection() {
        return $('//*[self::section or self::div][.//*[self::h1 or self::h2 or self::h3 or self::span][normalize-space()="Quick Insights"] and .//button[contains(normalize-space(),"Time Span") or @data-testid="billable-time-stats-time-period-dropdown"] and .//button[contains(normalize-space(),"View -") or @data-testid="billable-time-stats-view-dropdown"]][1]');
    }

    get quickInsightsHeading() {
        return $('//*[self::h1 or self::h2 or self::h3 or self::span][normalize-space()="Quick Insights"]');
    }

    get addBillableTimeButton() {
        return this.timePeriodDropdown;
    }

    get billableTimeRows() {
        return $$('//button[@data-testid="billable-time-stats-time-period-dropdown"]/ancestor::div[.//span[normalize-space()="Time Period"]][1]/*');
    }

    get billableTimeFilterDropdown() {
        return this.timePeriodDropdown;
    }

    get timePeriodDropdown() {
        return $('//*[@data-testid="billable-time-stats-time-period-dropdown" or (self::button and contains(normalize-space(),"Time Span"))][1]');
    }

    get viewDropdown() {
        return $('//*[@data-testid="billable-time-stats-view-dropdown" or (self::button and contains(normalize-space(),"View -"))][1]');
    }

    get billableChartLegend() {
        return $('//span[contains(@class,"MuiChartsLegend-label") and normalize-space()="billable time"]');
    }

    get nonBillableChartLegend() {
        return $('//span[contains(@class,"MuiChartsLegend-label") and normalize-space()="non-billable time"]');
    }

    get percentBillableGauge() {
        return $('svg[role="meter"].MuiGauge-root');
    }

    get billableHoursText() {
        return $('//span[starts-with(normalize-space(),"Billable:")]');
    }

    get nonBillableHoursText() {
        return $('//span[starts-with(normalize-space(),"Non-Billable:")]');
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
        await this.quickInsightsHeading.waitForDisplayed({ timeout: 10000 });
        await this.timePeriodDropdown.waitForDisplayed({ timeout: 10000 });
        await this.viewDropdown.waitForDisplayed({ timeout: 10000 });
    }

    getTimePeriodOption(optionText) {
        return $(`//div[@role="option" and normalize-space()="${optionText}"]`);
    }

    getViewOption(optionText) {
        return $(`//div[@role="option" and normalize-space()="${optionText}"]`);
    }

    async openTimePeriodDropdown() {
        await this.timePeriodDropdown.waitForClickable({ timeout: 10000 });
        await this.jsScrollIntoView(this.timePeriodDropdown);
        await this.timePeriodDropdown.click();
    }

    async openViewDropdown() {
        await this.viewDropdown.waitForClickable({ timeout: 10000 });
        await this.jsScrollIntoView(this.viewDropdown);
        await this.viewDropdown.click();
    }

    async selectTimePeriod(optionText) {
        await this.openTimePeriodDropdown();
        const option = this.getTimePeriodOption(optionText);
        await option.waitForClickable({ timeout: 10000 });
        await option.click();

        await browser.waitUntil(async () => {
            const dropdownText = await this.timePeriodDropdown.getText();
            return dropdownText.includes(optionText);
        }, {
            timeout: 10000,
            timeoutMsg: `Time Period did not update to ${optionText}`,
        });
    }

    async selectView(optionText) {
        await this.openViewDropdown();
        const option = this.getViewOption(optionText);
        await option.waitForClickable({ timeout: 10000 });
        await option.click();

        await browser.waitUntil(async () => {
            const dropdownText = await this.viewDropdown.getText();
            return dropdownText.includes(optionText);
        }, {
            timeout: 10000,
            timeoutMsg: `View did not update to ${optionText}`,
        });
    }

    async pauseForVisualGraphChange(ms = 500) {
        await browser.pause(ms);
    }

    async cycleBillableTimeAndViewOptions() {
        const orderedTimePeriods = ["This Month", "Last 3 Months", "Last 6 Months"];
        const orderedViews = ["My Time", "All Users Time"];

        for (const timePeriod of orderedTimePeriods) {
            await this.selectTimePeriod(timePeriod);
            await this.pauseForVisualGraphChange();

            for (const view of orderedViews) {
                await this.selectView(view);
                await this.pauseForVisualGraphChange();
            }
        }
    }

}

export default new DashboardBillableTimePage();
