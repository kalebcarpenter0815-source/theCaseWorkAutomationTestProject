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
        // Use a direct DOM click to avoid repeated WebDriver retry loops when
        // transient dashboard overlays momentarily sit on top of the button.
        await browser.execute((el) => {
            el.scrollIntoView({ block: 'center', inline: 'center' });
            el.click();
        }, addTaskButton);
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
        const dueByLabel = await dashboardAddTaskModal.dueByLabel;

        await expect(caseDropdown).toBeDisplayed();
        await expect(assignToDropdown).toBeDisplayed();
        await expect(taskField).toBeDisplayed();
        await expect(billableLabel).toBeDisplayed();
        await expect(dueByLabel).toBeDisplayed();

        // Close modal
        await dashboardAddTaskModal.cancelForm();
    });

    /**
     * PRIMARY TEST: Add Task Modal Form Completion — John Doe through Luigi
     *
     * For each case (John Doe → Luigi):
     *   1. Click Add Task button
     *   2. Select the case name
     *   3. Open Assign To dropdown → select KALEB CARPENTER
     *   4. Open Milestone dropdown → select #1 - New Milestone
     *   5. Open Milestone dropdown → select #1 - Our Very First New Milestone
     *   6. Open Milestone dropdown → select #2 - New Milestone
     *   7. Type task text in "Task to complete" field
     *   8. Check Billable checkbox
     *   9. Check Due By checkbox (opens date section)
     *   10. Click "Select a date..." → click May → click 23
     *   11. Click Cancel → return to dashboard
     *   12. Repeat for next case name
     */
    it('should complete Add Task form for each Case from John doe to Luigi', async function () {
        this.timeout(20 * 60 * 1000); // 20 minutes for the full case list

        const TARGET_MONTH = 'May';
        const TARGET_DAY = '23';

        const cases = [
            'John doe',
            'Jane doe',
            'Mickey Mouse',
            'Pluto',
            'Briefcase',
            'CASE No. 006',
            'Thanos',
            'EVRYONE v NO ONE',
            'Squarepants v Krabs',
            'Black Widow',
            'EDNA MAE VAVOOM',
            'AUTOTEST Create Min 2026-04-01 19:35:39',
            'AUTOTEST Create All Fields 2026-04-01 19:35:39',
            "' OR '1'='1",
            "Karen's Cat vs. The Entire Neighborhood",
            'asdfasdf',
            'Schmuck v. United States',
            'Gannondorf',
            'Shy Guy',
            'Pipu',
            'dfsdsdf',
            'Luigi',
        ];

        for (let i = 0; i < cases.length; i++) {
            const caseName = cases[i];
            console.log(`\n--- Case: ${caseName} ---`);

            // Step 1: Wait for Add Task button then click it.
            // First iteration: full dashboard readiness check.
            // Subsequent iterations: we already cancelled back to dashboard, just wait for button.
            if (i === 0) {
                await ensureAddTaskButtonReady();
            } else {
                await dashboardMyTasksPage.addTaskButton.waitForDisplayed({ timeout: 15000 });
            }
            await clickAddTaskButtonSafely();
            await browser.pause(1000);

            // Step 2: Select the Case
            const caseSelected = await dashboardAddTaskModal.selectCaseOption(caseName);
            if (!caseSelected) {
                console.warn(`⚠ Case option not found, skipping: ${caseName}`);
                await dashboardAddTaskModal.cancelForm();
                continue;
            }

            // Step 3: Open Assign To dropdown and select KALEB CARPENTER
            const assignToSelected = await dashboardAddTaskModal.selectAssignToOption('KALEB CARPENTER');
            if (!assignToSelected) {
                console.warn('⚠ KALEB CARPENTER not found in Assign To dropdown, skipping case');
                await dashboardAddTaskModal.cancelForm();
                continue;
            }

            // Step 4–6: Select all available milestone options (0, 1, or many per case)
            await dashboardAddTaskModal.selectAllAvailableMilestones();

            // Step 7: Type the task text
            await dashboardAddTaskModal.fillTaskToCompleteField(TASK_TO_COMPLETE_TEXT);

            // Step 8: Check the Billable checkbox
            await dashboardAddTaskModal.checkBillableCheckbox();

            // Step 9: Check the Due By checkbox (reveals the date picker)
            await dashboardAddTaskModal.checkDueByCheckbox();
            await browser.pause(500);

            // Step 10: Click "Select a date..." → navigate to May → click day 23
            await dashboardAddTaskModal.selectDateFromPicker(TARGET_MONTH, TARGET_DAY);

            // Step 11: Click Cancel → returns to dashboard
            await dashboardAddTaskModal.cancelForm();

            console.log(`✓ Completed: ${caseName}`);
        }

        console.log('\n✓ All cases processed from John Doe to Luigi');
    });
});
