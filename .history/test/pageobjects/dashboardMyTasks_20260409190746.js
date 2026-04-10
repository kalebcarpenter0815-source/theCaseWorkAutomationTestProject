import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardMyTasksPage extends Page {

    // =============================
    // MY TASKS CARD / SECTION
    // =============================

    /** The entire My Tasks card/panel container */
    get myTasksSection() {
        return $('[data-testid="my-tasks-section"]');
    }

    /** All individual task item cards within the My Tasks section */
    get taskCards() {
        return $$('[data-testid^="my-task-item-"]');
    }

    // =============================================
    // TASK CARDS GETTERS FOR SPECIFIC FIELDS                 
    // =============================================

    

    get caseJohnDoeBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseJaneDoeBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseMickeyMouseBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseCASE_No_006Btn() {
        return (caseCard) => caseCard.$('.my-task-item-case-number');
    }

    get caseThanosBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }   

    get caseEVERYONE_v_NO_ONEBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseSquarepants_v_KrabsBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseBlackWidowBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseEDNA_MAE_VAVOOM_V_HAROLD_NICKNAME_HAL_P_BOTTOMBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseAUTOTEST_Create_Min_2026_04_01_19_35_39Btn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseAUTOTEST_Create_All_Fields_2026_04_01_19_35_39Btn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get case_OR_1_equals_1Btn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseAUTOTEST_Create_Min_2026_04_01_20_32_58Btn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseAUTOTEST_Create_All_Fields_2026_04_01_20_32_58Btn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaBtn() { // There is 2 of these. Check to see what text is in the case number field to differentiate if needed?
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get case_OR_1_equals_1Btn() { // There is 2 of these. Check to see what text is in the case number field to differentiate if needed?
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseKarens_Cat_vs_The_Entire_NeighborhoodBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseasdfasdfBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseSchmuck_v_United_StatesBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseGannondorfBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseShy_GuyBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get casePipunBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get casedfsdsdfBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    get caseLuigiBtn() {
        return (caseCard) => caseCard.$('.my-task-item-title');
    }

    // =============================
    // ADD TASK BUTTON
    // =============================

    get addTaskButton() {
        return $('button[data-testid="tasks-card-add-task-button"]');
    }

    // =============================
    // CASE DROPDOWN
    // =============================

    /** The Case filter/sort dropdown trigger button */
    get caseDropdown() {
        return $('[data-testid="my-tasks-case-dropdown"]');
    }

    /** All option items rendered inside the open Case dropdown */
    get caseDropdownOptions() {
        return $$('[data-testid^="my-tasks-case-option-"]');
    }

    /**
     * Returns a single option inside the Case dropdown by its visible label text.
     * @param {string} optionText
     */
    getCaseOption(optionText) {
        return $(`//div[@role="option" and normalize-space()="${optionText}"]`);
    }

    // =============================
    // SORT DROPDOWN
    // =============================

    /** The Sort dropdown trigger button */
    get sortDropdown() {
        return $('[data-testid="my-tasks-sort-dropdown"]');
    }

    /** All option items rendered inside the open Sort dropdown */
    get sortDropdownOptions() {
        return $$('[data-testid^="my-tasks-sort-option-"]');
    }

    /**
     * Returns a single option inside the Sort dropdown by its visible label text.
     * @param {string} optionText
     */
    getSortOption(optionText) {
        return $(`//div[@role="option" and normalize-space()="${optionText}"]`);
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

    async waitForMyTasksSection() {
        await this.myTasksSection.waitForDisplayed({ timeout: 10000 });
    }

    async openCaseDropdown() {
        await this.caseDropdown.waitForClickable({ timeout: 10000 });
        await this.jsScrollIntoView(this.caseDropdown);
        await this.caseDropdown.click();
    }

    async openSortDropdown() {
        await this.sortDropdown.waitForClickable({ timeout: 10000 });
        await this.jsScrollIntoView(this.sortDropdown);
        await this.sortDropdown.click();
    }
}

export default new DashboardMyTasksPage();
