import { expect } from '@wdio/globals';
import loginHelper from '../utils/loginHelper.js';
import dashboardPage from '../pageobjects/dashboardPage.js';
import dashboardMyTasksPage from '../pageobjects/dashboardMyTasks.js';
import dashboardAddTaskModal from '../pageobjects/dashboardAddTaskModal.js';

describe('Dashboard Add Task Modal Tests', () => {
    const TASK_TO_COMPLETE_TEXT = 'This task you gotta complete haha (lol)';

    async function ensureAddTaskButtonReady() {
        await dashboardPage.waitForDashboard();

        try {
            await dashboardMyTasksPage.addTaskButton.waitForDisplayed({ timeout: 15000 });
        } catch (error) {
            // One retry for occasional late My Tasks render in the current session.
            await browser.refresh();
            await dashboardPage.waitForDashboard();
            await dashboardMyTasksPage.addTaskButton.waitForDisplayed({ timeout: 15000 });
        }
    }

    async function clickAddTaskButtonSafely() {
        const addTaskButton = await dashboardMyTasksPage.addTaskButton;
        await addTaskButton.waitForDisplayed({ timeout: 15000 });

        try {
            await addTaskButton.waitForClickable({ timeout: 5000 });
            await addTaskButton.click();
        } catch (error) {
            await browser.execute((el) => {
                el.scrollIntoView({ block: 'center', inline: 'center' });
                el.click();
            }, addTaskButton);
        }
    }

    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await ensureAddTaskButtonReady();
    });

    after(async () => {
        await dashboardAddTaskModal.cancelForm().catch(() => null);
        await dashboardPage.logout();
    });

    it('should display the Add Task button on the My Tasks card', async () => {
        await ensureAddTaskButtonReady();

        const addTaskButton = await dashboardMyTasksPage.addTaskButton;
        await expect(addTaskButton).toBeDisplayed();
    });

    it('should open the Add Task modal when clicking Add Task button', async () => {
        await ensureAddTaskButtonReady();
        await clickAddTaskButtonSafely();
        await browser.pause(1000);

        const modal = await dashboardAddTaskModal.addTaskModalContainer;
        await expect(modal).toBeDisplayed();

        // Close modal
        await dashboardAddTaskModal.cancelForm();
    });

    it('should display Add Task modal form fields', async () => {
        await ensureAddTaskButtonReady();
        await clickAddTaskButtonSafely();
        await browser.pause(1000);

        // Verify form elements exist
        const caseDropdown = await dashboardAddTaskModal.caseDropdown;
        const assignToDropdown = await dashboardAddTaskModal.assignToDropdown;
        const taskField = await dashboardAddTaskModal.taskToCompleteField;
        const billableLabel = await dashboardAddTaskModal.billableLabel;
        const dueByCheckbox = await dashboardAddTaskModal.dueByCheckbox;

        await expect(caseDropdown).toBeDisplayed();
        await expect(assignToDropdown).toBeDisplayed();
        await expect(taskField).toBeDisplayed();
        await expect(billableLabel).toBeDisplayed();
        await expect(dueByCheckbox).toBeDisplayed();

        // Close modal
        await dashboardAddTaskModal.cancelForm();
    });

    /**
     * PRIMARY TEST: Add Task Modal Form Completion Flow
     * 
     * This test performs the complete Add Task workflow for each Assign To person:
     * 1. For each Assign To person (starting with KALEB CARPENTER)
     * 2.   For each Case (All Cases → Luigi)
     * 3.     a) Select the Case
     * 4.     b) Select the Assign To person
     * 5.     c) Select Milestone (#1 - New Milestone)
     * 6.     d) Fill Task to Complete field with: "This task you gotta complete haha (lol)"
     * 7.     e) Check Billable checkbox
     * 8.     f) Check Due By checkbox
     * 9.     g) Select date: May 23, 2026
     * 10.    h) Click Cancel button
     */
    it('should complete Add Task form for each Assign To person with all Case selections', async () => {
        const targetDate = 'May 23, 2026';

        // Define all Assign To people in order
        // USER WILL PROVIDE ACTUAL NAMES - these are placeholders
        const assignToPersons = [
            { name: 'KALEB CARPENTER', getOption: () => dashboardAddTaskModal.assignToKalebCarpenterOption },
            // Add more Assign To persons here after inspection:
            // { name: 'Person Name', getOption: () => dashboardAddTaskModal.assignToPerson NameOption },
        ];

        // Define all Case options in order (same as My Tasks test)
        const cases = [
            { label: 'All Cases', getOption: () => dashboardMyTasksPage.caseAllCasesOption },
            { label: 'John Doe', getOption: () => dashboardMyTasksPage.caseJohnDoeOption },
            { label: 'Jane Doe', getOption: () => dashboardMyTasksPage.caseJaneDoeOption },
            { label: 'CASE_No_006', getOption: () => dashboardMyTasksPage.caseCASE_No_006Option },
            { label: 'Thanos', getOption: () => dashboardMyTasksPage.caseThanosOption },
            { label: 'EVERYONE_v_NO_ONE', getOption: () => dashboardMyTasksPage.caseEVERYONE_v_NO_ONEOption },
            { label: 'Squarepants_v_Krabs', getOption: () => dashboardMyTasksPage.caseSquarepants_v_KrabsOption },
            { label: 'Black Widow', getOption: () => dashboardMyTasksPage.caseBlackWidowOption },
            { label: 'EDNA_MAE_VAVOOM_v_HAROLD_NICKNAME_HAL_P_BOTTOM', getOption: () => dashboardMyTasksPage.caseEDNA_MAE_VAVOOM_v_HAROLD_NICKNAME_HAL_P_BOTTOMOption },
            { label: 'AUTOTEST_Create_Min_2026_04_01_19_35_39', getOption: () => dashboardMyTasksPage.caseAUTOTEST_Create_Min_2026_04_01_19_35_39Option },
            { label: 'AUTOTEST_Create_All_Fields_2026_04_01_19_35_39', getOption: () => dashboardMyTasksPage.caseAUTOTEST_Create_All_Fields_2026_04_01_19_35_39Option },
            { label: 'Karens_Cat_vs_The_Entire_Neighborhood', getOption: () => dashboardMyTasksPage.caseKarens_Cat_vs_The_Entire_NeighborhoodOption },
            { label: 'asdfasdf', getOption: () => dashboardMyTasksPage.caseasdfasdfOption },
            { label: 'Schmuck_v_United_States', getOption: () => dashboardMyTasksPage.caseSchmuck_v_United_StatesOption },
            { label: 'Ganondorf', getOption: () => dashboardMyTasksPage.caseGannondorfOption },
            { label: 'Shy Guy', getOption: () => dashboardMyTasksPage.caseShy_GuyOption },
            { label: 'Piпun', getOption: () => dashboardMyTasksPage.casePipunOption },
            { label: 'dfsdsdf', getOption: () => dashboardMyTasksPage.casedfsdsdfOption },
            { label: 'Luigi', getOption: () => dashboardMyTasksPage.caseLuigiOption },
        ];

        // Loop through each Assign To person
        for (const assignToPerson of assignToPersons) {
            console.log(`\n=== Testing with Assign To: ${assignToPerson.name} ===`);

            // Loop through each Case
            for (const caseItem of cases) {
                console.log(`--- Testing Case: ${caseItem.label} ---`);

                // ===== Step 1: Click Add Task Button =====
                await ensureAddTaskButtonReady();
                await clickAddTaskButtonSafely();
                await browser.pause(1500);

                // ===== Step 2: Select Case =====
                await dashboardAddTaskModal.selectCaseOption(caseItem.label);

                // ===== Step 3: Select Assign To Person =====
                await dashboardAddTaskModal.selectAssignToOption(assignToPerson.name);

                // ===== Step 4: Select Milestone (#1 - New Milestone) =====
                await dashboardAddTaskModal.selectMilestoneOption('#1 - New Milestone');

                // ===== Step 5: Fill Task to Complete Field =====
                await dashboardAddTaskModal.fillTaskToCompleteField(TASK_TO_COMPLETE_TEXT);

                // ===== Step 6: Check Billable Checkbox =====
                await dashboardAddTaskModal.checkBillableCheckbox();

                // ===== Step 7: Check Due By Checkbox =====
                await dashboardAddTaskModal.checkDueByCheckbox();

                // ===== Step 8: Select Date from Calendar (May 23, 2026) =====
                await dashboardAddTaskModal.selectDateFromPicker(targetDate);

                // ===== Step 9: Click Cancel Button =====
                await dashboardAddTaskModal.cancelForm();

                // Verify we're back on the dashboard
                await expect(dashboardMyTasksPage.addTaskButton).toBeDisplayed();

                console.log(`✓ Completed Add Task form for ${assignToPerson.name} with Case: ${caseItem.label}`);
            }

            console.log(`\n✓ Completed all Cases for Assign To: ${assignToPerson.name}`);
        }

        console.log('\n✓ PASSED: Add Task modal test completed for all Assign To persons and all Cases');
    });
});
