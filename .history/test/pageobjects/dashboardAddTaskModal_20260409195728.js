import Page from './page.js';

class DashboardAddTaskModal extends Page {
    // ==================== MODAL CONTAINER ====================
    get addTaskModalContainer() {
        return $('[role="dialog"]');
    }

    // ==================== CASE DROPDOWN ====================
    get caseDropdown() {
        return $('[data-testid="add-task-case-dropdown"]'); // Placeholder selector
    }

    get caseDropdownOptions() {
        return $$('[role="option"][data-testid*="case"]');
    }

    // Case option getters (same 19 cases as My Tasks)
    get caseAllCasesOption() {
        return this.getCaseOption('All Cases');
    }

    get caseJohnDoeOption() {
        return this.getCaseOption('John Doe');
    }

    get caseJaneDoeOption() {
        return this.getCaseOption('Jane Doe');
    }

    get caseCASE_No_006Option() {
        return this.getCaseOption('CASE_No_006');
    }

    get caseThanosOption() {
        return this.getCaseOption('Thanos');
    }

    get caseEVERYONE_v_NO_ONEOption() {
        return this.getCaseOption('EVERYONE_v_NO_ONE');
    }

    get caseSquarepants_v_KrabsOption() {
        return this.getCaseOption('Squarepants_v_Krabs');
    }

    get caseBlackWidowOption() {
        return this.getCaseOption('Black Widow');
    }

    get caseEDNA_MAE_VAVOOM_v_HAROLD_NICKNAME_HAL_P_BOTTOMOption() {
        return this.getCaseOption('EDNA_MAE_VAVOOM_v_HAROLD_NICKNAME_HAL_P_BOTTOM');
    }

    get caseAUTOTEST_Create_Min_2026_04_01_19_35_39Option() {
        return this.getCaseOption('AUTOTEST_Create_Min_2026_04_01_19_35_39');
    }

    get caseAUTOTEST_Create_All_Fields_2026_04_01_19_35_39Option() {
        return this.getCaseOption('AUTOTEST_Create_All_Fields_2026_04_01_19_35_39');
    }

    get caseKarens_Cat_vs_The_Entire_NeighborhoodOption() {
        return this.getCaseOption('Karens_Cat_vs_The_Entire_Neighborhood');
    }

    get caseasdfasdfOption() {
        return this.getCaseOption('asdfasdf');
    }

    get caseSchmuck_v_United_StatesOption() {
        return this.getCaseOption('Schmuck_v_United_States');
    }

    get caseGannondorfOption() {
        return this.getCaseOption('Ganondorf');
    }

    get caseShy_GuyOption() {
        return this.getCaseOption('Shy Guy');
    }

    get casePipunOption() {
        return this.getCaseOption('Piпun');
    }

    get casedfsdsdfOption() {
        return this.getCaseOption('dfsdsdf');
    }

    get caseLuigiOption() {
        return this.getCaseOption('Luigi');
    }

    // ==================== ASSIGN TO DROPDOWN ====================
    get assignToDropdown() {
        return $('[data-testid="add-task-assign-to-dropdown"]'); // Placeholder selector
    }

    get assignToDropdownOptions() {
        return $$('[role="option"][data-testid*="assign"]');
    }

    // Assign To person getters will be populated after inspection
    // Placeholder: these will be updated with real names
    get assignToKalebCarpenterOption() {
        return this.getAssignToOption('KALEB CARPENTER');
    }

    // ==================== MILESTONE DROPDOWN ====================
    get milestoneDropdown() {
        return $('[data-testid="add-task-milestone-dropdown"]'); // Placeholder selector
    }

    get milestoneNewMilestoneOption() {
        return this.getMilestoneOption('#1 - New Milestone');
    }

    // ==================== TASK TO COMPLETE FIELD ====================
    get taskToCompleteField() {
        return $('[data-testid="add-task-task-complete-field"]'); // Placeholder selector
    }

    // ==================== BILLABLE CHECKBOX ====================
    get billableCheckbox() {
        return $('[data-testid="add-task-billable-checkbox"]'); // Placeholder selector
    }

    // ==================== DUE BY CHECKBOX & DATE PICKER ====================
    get dueByCheckbox() {
        return $('[data-testid="add-task-due-by-checkbox"]'); // Placeholder selector
    }

    get datePickerButton() {
        return $('[data-testid="add-task-date-picker"]'); // Placeholder selector
    }

    // ==================== ACTION BUTTONS ====================
    get cancelButton() {
        return $('button=Cancel');
    }

    get submitAddTaskButton() {
        return $('button=Add Task');
    }

    // ==================== HELPER METHODS ====================
    async openCaseDropdown() {
        const dropdown = await this.caseDropdown;
        const isExpanded = await dropdown.getAttribute('aria-expanded');
        
        if (isExpanded !== 'true') {
            await dropdown.click();
            await browser.pause(300);
        }
    }

    async openAssignToDropdown() {
        const dropdown = await this.assignToDropdown;
        const isExpanded = await dropdown.getAttribute('aria-expanded');
        
        if (isExpanded !== 'true') {
            await dropdown.click();
            await browser.pause(300);
        }
    }

    async openMilestoneDropdown() {
        const dropdown = await this.milestoneDropdown;
        const isExpanded = await dropdown.getAttribute('aria-expanded');
        
        if (isExpanded !== 'true') {
            await dropdown.click();
            await browser.pause(300);
        }
    }

    async selectCaseOption(label) {
        await this.openCaseDropdown();
        const option = await this.getCaseOption(label);
        
        try {
            await option.click();
        } catch (e) {
            // Click fallback for flaky UI
            await browser.execute((el) => el.click(), option);
        }
        
        await browser.pause(300);
    }

    async selectAssignToOption(name) {
        await this.openAssignToDropdown();
        const option = await this.getAssignToOption(name);
        
        try {
            await option.click();
        } catch (e) {
            // Click fallback for flaky UI
            await browser.execute((el) => el.click(), option);
        }
        
        await browser.pause(300);
    }

    async selectMilestoneOption(label) {
        await this.openMilestoneDropdown();
        const option = await this.getMilestoneOption(label);
        
        try {
            await option.click();
        } catch (e) {
            // Click fallback for flaky UI
            await browser.execute((el) => el.click(), option);
        }
        
        await browser.pause(300);
    }

    async fillTaskToCompleteField(text) {
        const field = await this.taskToCompleteField;
        await field.clearValue();
        await field.setValue(text);
    }

    async checkBillableCheckbox() {
        const checkbox = await this.billableCheckbox;
        const isChecked = await checkbox.isSelected();
        
        if (!isChecked) {
            await checkbox.click();
            await browser.pause(200);
        }
    }

    async checkDueByCheckbox() {
        const checkbox = await this.dueByCheckbox;
        const isChecked = await checkbox.isSelected();
        
        if (!isChecked) {
            await checkbox.click();
            await browser.pause(200);
        }
    }

    async selectDateFromPicker(dateString) {
        // dateString format: "May 23, 2026" or similar
        await this.datePickerButton.click();
        await browser.pause(500);
        
        // Find and click the date in the calendar
        const dateButton = await $(`button=${dateString}`).catch(() => null);
        if (dateButton) {
            await dateButton.click();
            await browser.pause(300);
        }
    }

    async submitForm() {
        const button = await this.submitAddTaskButton;
        
        try {
            await button.click();
        } catch (e) {
            // Click fallback
            await browser.execute((el) => el.click(), button);
        }
        
        await browser.pause(500);
    }

    async cancelForm() {
        const button = await this.cancelButton;
        await button.click();
        await browser.pause(500);
    }

    // ==================== PRIVATE HELPER GETTERS ====================
    getCaseOption(label) {
        return $(`//*[@role="option" and contains(text(), "${label}")]`);
    }

    getAssignToOption(name) {
        return $(`//*[@role="option" and contains(text(), "${name}")]`);
    }

    getMilestoneOption(label) {
        return $(`//*[@role="option" and contains(text(), "${label}")]`);
    }

    open() {
        // Modal is opened via Add Task button, not direct navigation
        return super.open();
    }
}

export default new DashboardAddTaskModal();
