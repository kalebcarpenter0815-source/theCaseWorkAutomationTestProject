import Page from './page.js';

class DashboardAddTaskModal extends Page {
    // ==================== MODAL CONTAINER ====================
    get addTaskModalContainer() {
        return $('[role="dialog"]');
    }

    // ==================== CASE DROPDOWN ====================
    get caseDropdown() {
        return $('[data-testid="case-combobox"]');
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
        return $('[data-testid="user-combobox"]');
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
        return $('[data-testid="milestone-combobox"]');
    }

    get milestoneNewMilestoneOption() {
        return this.getMilestoneOption('#1 - New Milestone');
    }

    get milestoneOurVeryFirstNewMilestoneOption() {
        return this.getMilestoneOption('#1 - Our Very First New Milestone');
    }

    get milestoneSecondNewMilestoneOption() {
        return this.getMilestoneOption('#2 - New Milestone');
    }

    // ==================== TASK TO COMPLETE FIELD ====================
    get taskToCompleteField() {
        return $('[data-testid="task-dialog-textarea"]');
    }

    // ==================== BILLABLE CHECKBOX ====================
    get billableCheckbox() {
        return $('input[name="billable"]');
    }

    get billableCheckboxControl() {
        return $('[data-testid="task-dialog-billable-checkbox"], label[for*="billable"]');
    }

    get billableLabel() {
        return $('//*[@role="dialog"]//*[self::label or self::span or self::div][contains(normalize-space(.), "Billable")][1]');
    }

    // ==================== DUE BY CHECKBOX & DATE PICKER ====================
    get dueByCheckbox() {
        return $('[data-testid="task-dialog-dueby-checkbox"], input[name="dueBy"], input[id*="due"]');
    }

    get dueByLabel() {
        return $('//*[@role="dialog"]//*[self::label or self::span or self::div][contains(normalize-space(.), "Due By")][1]');
    }

    get datePickerButton() {
        return $('[data-testid="task-dialog-datepicker"]');
    }

    // ==================== ACTION BUTTONS ====================
    get cancelButton() {
        return $('[data-testid="task-dialog-cancel-button"]');
    }

    get assignToKalebCarpenterOption() {
        return this.getAssignToOption('KALEB CARPENTER');
    }

    get assignToRhondaLeaOption() {
        return this.getAssignToOption('Rhonda Lea');
    }

    get assignToIsraelAgulaOption() {
        return this.getAssignToOption('ISRAEL AGUILA');
    }

    get assignToJenniferApplentonOption() {
        return this.getAssignToOption('JENNIFER APPLETON');
    }

    get assignToKeonAsuaoOption() {
        return this.getAssignToOption('KEON ASUAO');
    }

    get assignToCraigBailieOption() {
        return this.getAssignToOption('CRAIG BAILIE');
    }

    get assignToMichaelBeckstrandOption() {
        return this.getAssignToOption('MICHAEL BECKSTRAND');
    }

    get assignToConnerBowdenOption() {
        return this.getAssignToOption('CONNER BOWDEN');
    }

    get assignToCameronEdmundsOption() {
        return this.getAssignToOption('CAMERON EDMUNDS');
    }

    get assignToGabrielErmiszOption() {
        return this.getAssignToOption('GABRIEL ERMISZ');
    }

    get assignToDillonFullerOption() {
        return this.getAssignToOption('DILLON FULLER');
    }

    get assignToCamilaGallegosOption() {
        return this.getAssignToOption('CAMILA GALLEGOS');
    }

    get assignToCodyHigginsOption() {
        return this.getAssignToOption('Cody Higgins');
    }

    get assignToGeneralQALoginOption() {
        return this.getAssignToOption('General QA Login');
    }

    get assignToOwenShawOption() {
        return this.getAssignToOption('OWEN SHAW');
    }

    get assignToJoshuaWorkmanOption() {
        return this.getAssignToOption('JOSHUA WORKMAN');
    }

    get assignToSamuelRipplingerOption() {
        return this.getAssignToOption('Samuel Ripplinger');
    }

    get assignToBryceHollowayOption() {
        return this.getAssignToOption('Bryce Holloway');
    }

    get submitAddTaskButton() {
        return $('button=Add Task');
    }

    // ==================== HELPER METHODS ====================
    async openCaseDropdown() {
        const dropdown = await this.caseDropdown;
        await dropdown.waitForDisplayed({ timeout: 10000 });
        await dropdown.waitForClickable({ timeout: 10000 });

        const isExpanded = await dropdown.getAttribute('aria-expanded');
        
        if (isExpanded !== 'true') {
            try {
                await dropdown.click();
            } catch (e) {
                await browser.execute((el) => el.click(), dropdown);
            }

            await browser.waitUntil(async () => (await dropdown.getAttribute('aria-expanded')) === 'true', {
                timeout: 5000,
                timeoutMsg: 'Case dropdown did not open',
            });
        }
    }

    async openAssignToDropdown() {
        const dropdown = await this.assignToDropdown;
        await dropdown.waitForDisplayed({ timeout: 10000 });
        await dropdown.waitForClickable({ timeout: 10000 });

        const isExpanded = await dropdown.getAttribute('aria-expanded');
        
        if (isExpanded !== 'true') {
            try {
                await dropdown.click();
            } catch (e) {
                await browser.execute((el) => el.click(), dropdown);
            }

            await browser.waitUntil(async () => (await dropdown.getAttribute('aria-expanded')) === 'true', {
                timeout: 5000,
                timeoutMsg: 'Assign To dropdown did not open',
            });
        }
    }

    async openMilestoneDropdown() {
        const dropdown = await this.milestoneDropdown;
        await dropdown.waitForDisplayed({ timeout: 10000 });
        await dropdown.waitForClickable({ timeout: 10000 });

        const isExpanded = await dropdown.getAttribute('aria-expanded');
        
        if (isExpanded !== 'true') {
            try {
                await dropdown.click();
            } catch (e) {
                await browser.execute((el) => el.click(), dropdown);
            }

            await browser.waitUntil(async () => (await dropdown.getAttribute('aria-expanded')) === 'true', {
                timeout: 5000,
                timeoutMsg: 'Milestone dropdown did not open',
            });
        }
    }

    async selectCaseOption(label) {
        await this.openCaseDropdown();
        const option = await this.getCaseOption(label);

        const optionFound = await browser.waitUntil(async () => {
            return await option.isDisplayed().catch(() => false);
        }, {
            timeout: 2500,
            interval: 200,
            timeoutMsg: `Case option not available: ${label}`,
        }).catch(() => false);

        if (!optionFound) {
            await browser.keys('Escape').catch(() => null);
            return false;
        }
        
        try {
            await option.click();
        } catch (e) {
            // Click fallback for flaky UI
            await browser.execute((el) => el.click(), option);
        }
        
        await browser.pause(300);
        return true;
    }

    async selectAssignToOption(name) {
        const dropdown = await this.assignToDropdown;
        const currentValue = await dropdown.getAttribute('value').catch(() => null);
        const currentText = await dropdown.getText().catch(() => '');

        if ((currentValue && currentValue.includes(name)) || (currentText && currentText.includes(name))) {
            return true;
        }

        await this.openAssignToDropdown();
        const option = await this.getAssignToOption(name);

        const optionFound = await browser.waitUntil(async () => {
            return await option.isDisplayed().catch(() => false);
        }, {
            timeout: 2500,
            interval: 200,
            timeoutMsg: `Assign To option not available: ${name}`,
        }).catch(() => false);

        if (!optionFound) {
            await browser.keys('Escape').catch(() => null);
            return false;
        }
        
        try {
            await option.click();
        } catch (e) {
            // Click fallback for flaky UI
            await browser.execute((el) => el.click(), option);
        }
        
        await browser.pause(300);
        return true;
    }

    async selectMilestoneOption(label) {
        await this.openMilestoneDropdown();
        const option = await this.getMilestoneOption(label);

        const optionFound = await browser.waitUntil(async () => {
            return await option.isDisplayed().catch(() => false);
        }, {
            timeout: 2500,
            interval: 200,
            timeoutMsg: `Milestone option not available: ${label}`,
        }).catch(() => false);

        if (!optionFound) {
            await browser.keys('Escape').catch(() => null);
            return false;
        }
        
        try {
            await option.click();
        } catch (e) {
            // Click fallback for flaky UI
            await browser.execute((el) => el.click(), option);
        }
        
        await browser.pause(300);
        return true;
    }

    /**
     * Dynamically discover all available milestone options and select each one.
     * Opens the dropdown once to read the list, then re-opens for each selection.
     * Skips entirely if no options are present (e.g. case has no milestones).
     */
    async selectAllAvailableMilestones() {
        // Open the dropdown to inspect available options
        await this.openMilestoneDropdown();
        await browser.pause(300);

        // Collect labels of all visible, non-disabled options currently showing
        const allOptionEls = await $$('[role="option"]');
        const labels = [];

        for (const opt of allOptionEls) {
            const visible = await opt.isDisplayed().catch(() => false);
            if (!visible) continue;
            const disabled = await opt.getAttribute('aria-disabled').catch(() => null);
            if (disabled === 'true') continue;
            const text = (await opt.getText().catch(() => '')).trim();
            if (text) labels.push(text);
        }

        // Close the discovery dropdown before re-opening per selection
        await browser.keys('Escape').catch(() => null);
        await browser.pause(200);

        if (labels.length === 0) {
            // No milestone options available — skip silently
            console.log('  (no milestone options available, skipping)');
            return;
        }

        console.log(`  Milestones available: ${labels.join(', ')}`);

        // Select each option by re-opening the dropdown for each
        for (const label of labels) {
            await this.selectMilestoneOption(label);
        }
    }

    async fillTaskToCompleteField(text) {
        const field = await this.taskToCompleteField;
        await field.clearValue();
        await field.setValue(text);
    }

    async checkBillableCheckbox() {
        const checkbox = await this.billableCheckbox;
        const exists = await checkbox.isExisting().catch(() => false);

        if (!exists) {
            // Hidden input not found; click the visible label instead.
            const label = await this.billableLabel;
            try {
                await label.click();
            } catch (e) {
                await browser.execute((el) => el.click(), label);
            }
            await browser.pause(200);
            return;
        }

        const isChecked = await checkbox.isSelected().catch(() => false);
        if (!isChecked) {
            try {
                await checkbox.click();
            } catch (e) {
                const control = await this.billableCheckboxControl;
                try {
                    await control.click();
                } catch (innerError) {
                    await browser.execute((el) => el.click(), control);
                }
            }
            await browser.pause(200);
        }
    }

    async checkDueByCheckbox() {
        const checkbox = await this.dueByCheckbox;
        const exists = await checkbox.isExisting().catch(() => false);

        if (!exists) {
            // Hidden input not found; click the visible Due By label instead.
            const label = await this.dueByLabel;
            try {
                await label.click();
            } catch (e) {
                await browser.execute((el) => el.click(), label);
            }
            await browser.pause(200);
            return;
        }

        const isChecked = await checkbox.isSelected().catch(() => false);
        if (!isChecked) {
            try {
                await checkbox.click();
            } catch (e) {
                const label = await this.dueByLabel;
                try {
                    await label.click();
                } catch (innerError) {
                    await browser.execute((el) => el.click(), label);
                }
            }
            await browser.pause(200);
        }
    }

    async selectDateFromPicker(month, day) {
        // Step 1: Click the "Select a date..." datepicker input to open the calendar.
        const datepicker = await this.datePickerButton;
        const dpExists = await datepicker.isExisting().catch(() => false);

        if (dpExists) {
            try {
                await datepicker.click();
            } catch (e) {
                await browser.execute((el) => el.click(), datepicker);
            }
        } else {
            const fallbackInput = await $('[role="dialog"] input[placeholder*="date" i]');
            await browser.execute((el) => el.click(), fallbackInput);
        }

        await browser.pause(600);

        // Step 2: Click the month button/header (e.g., "May") in the calendar.
        // The calendar may show the month as a direct button (two-panel view) or as a month-grid option.
        const monthBtn = await $(`button=${month}`);
        const monthBtnExists = await monthBtn.isExisting().catch(() => false);

        if (monthBtnExists) {
            try {
                await monthBtn.click();
            } catch (e) {
                await browser.execute((el) => el.click(), monthBtn);
            }
            await browser.pause(400);
        } else {
            const monthFallback = await $(
                `//*[normalize-space(text())="${month}" and (self::button or @role="button" or @role="option")]`
            );
            const fallbackExists = await monthFallback.isExisting().catch(() => false);
            if (fallbackExists) {
                await browser.execute((el) => el.click(), monthFallback);
                await browser.pause(400);
            }
        }

        // Step 3: Click the day number (e.g., "23") in the calendar grid.
        // Try aria-label first (e.g., aria-label="May 23, 2026"), then grid cell button, then any matching button.
        const dayByAria = await $(`//button[contains(@aria-label, "${month} ${day},")]`);
        const ariaExists = await dayByAria.isExisting().catch(() => false);

        if (ariaExists) {
            try {
                await dayByAria.click();
            } catch (e) {
                await browser.execute((el) => el.click(), dayByAria);
            }
        } else {
            const dayCell = await $(
                `//td[@role="gridcell"]//button[normalize-space(text())="${day}"] | ` +
                `//button[@role="gridcell" and normalize-space(text())="${day}"]`
            );
            const dayCellExists = await dayCell.isExisting().catch(() => false);

            if (dayCellExists) {
                await browser.execute((el) => el.click(), dayCell);
            } else {
                const anyDayBtn = await $(`//button[normalize-space(text())="${day}"]`);
                const anyExists = await anyDayBtn.isExisting().catch(() => false);
                if (anyExists) {
                    await browser.execute((el) => el.click(), anyDayBtn);
                }
            }
        }

        await browser.pause(300);
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
        await browser.keys('Escape').catch(() => null);
        await browser.pause(100);

        const button = await this.cancelButton;

        try {
            await button.click();
        } catch (e) {
            await browser.execute((el) => el.click(), button);
        }

        await browser.waitUntil(async () => {
            const modalVisible = await this.addTaskModalContainer.isDisplayed().catch(() => false);
            return !modalVisible;
        }, {
            timeout: 8000,
            timeoutMsg: 'Add Task modal did not close after clicking Cancel',
        });
    }

    // ==================== PRIVATE HELPER GETTERS ====================
    getCaseOption(label) {
        return $(`//*[@role="option" and contains(normalize-space(.), "${label}")]`);
    }

    getAssignToOption(name) {
        return $(`//*[@role="option" and contains(normalize-space(.), "${name}")]`);
    }

    getMilestoneOption(label) {
        return $(`//*[@role="option" and contains(normalize-space(.), "${label}")]`);
    }

    open() {
        // Modal is opened via Add Task button, not direct navigation
        return super.open();
    }
}

export default new DashboardAddTaskModal();
