import { expect } from '@wdio/globals';
import loginHelper from '../utils/loginHelper.js';
import dashboardPage from '../pageobjects/dashboardPage.js';
import dashboardMyTasksPage from '../pageobjects/dashboardMyTasks.js';
import dashboardAddTaskModal from '../pageobjects/dashboardAddTaskModal.js';

describe('Dashboard Add Task Modal Tests', () => {
    const TASK_TEXT = 'This task you gotta complete haha (lol)';
    const ASSIGNED_TO_NAME = 'KALEB CARPENTER';
    const DATE_MONTH = 'May';
    const DATE_DAY = '23';
    const CASE_NAMES = [
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

    async function waitForAddTaskButton() {
        await dashboardPage.waitForDashboard();

        try {
            await dashboardMyTasksPage.addTaskButton.waitForDisplayed({ timeout: 15000 });
        } catch (error) {
            // If the dashboard loaded slowly, refresh once and try again.
            await browser.refresh();
            await dashboardPage.waitForDashboard();
            await dashboardMyTasksPage.addTaskButton.waitForDisplayed({ timeout: 15000 });
        }
    }

    async function clickAddTaskButton() {
        const addTaskButton = await dashboardMyTasksPage.addTaskButton;

        const modalVisible = await dashboardAddTaskModal.addTaskModalContainer.isDisplayed().catch(() => false);
        if (modalVisible) {
            return;
        }

        try {
            await browser.execute((el) => el.scrollIntoView({ block: 'center' }), addTaskButton);
            await addTaskButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), addTaskButton);
        }

        await browser.waitUntil(async () => {
            return await dashboardAddTaskModal.addTaskModalContainer.isDisplayed().catch(() => false);
        }, {
            timeout: 8000,
            interval: 250,
            timeoutMsg: 'Add Task modal did not appear after clicking Add Task button',
        });
    }

    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await waitForAddTaskButton();
    });

    after(async () => {
        await dashboardAddTaskModal.cancelForm().catch(() => null);
        await dashboardPage.logout();
    });

    it('should display the Add Task button on the My Tasks card', async () => {
        await waitForAddTaskButton();

        const addTaskButton = await dashboardMyTasksPage.addTaskButton;
        await expect(addTaskButton).toBeDisplayed();
    });

    it('should open the Add Task modal when clicking Add Task button', async () => {
        await waitForAddTaskButton();
        await clickAddTaskButton();

        const modal = await dashboardAddTaskModal.addTaskModalContainer;
        await expect(modal).toBeDisplayed();

        // Close modal
        await dashboardAddTaskModal.cancelForm();
    });

    it('should display Add Task modal form fields', async () => {
        await waitForAddTaskButton();
        await clickAddTaskButton();

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

    // This is the main test.
    // It opens Add Task, fills the form, cancels, and repeats for each case name.
    it('should complete Add Task form for each Case from John doe to Luigi', async function () {
        this.timeout(20 * 60 * 1000);

        for (let i = 0; i < CASE_NAMES.length; i++) {
            const caseName = CASE_NAMES[i];
            console.log(`\n--- Case: ${caseName} ---`);

            if (i === 0) {
                await waitForAddTaskButton();
            } else {
                await dashboardMyTasksPage.addTaskButton.waitForDisplayed({ timeout: 15000 });
            }
            await clickAddTaskButton();

            const caseSelected = await dashboardAddTaskModal.selectCaseOption(caseName);
            if (!caseSelected) {
                console.warn(`⚠ Case option not found, skipping: ${caseName}`);
                await dashboardAddTaskModal.cancelForm();
                continue;
            }

            const assignToSelected = await dashboardAddTaskModal.selectAssignToOption(ASSIGNED_TO_NAME);
            if (!assignToSelected) {
                console.warn(`⚠ ${ASSIGNED_TO_NAME} not found in Assign To dropdown, skipping case`);
                await dashboardAddTaskModal.cancelForm();
                continue;
            }

            await dashboardAddTaskModal.selectAllAvailableMilestones();

            await dashboardAddTaskModal.fillTaskToCompleteField(TASK_TEXT);
            await dashboardAddTaskModal.checkBillableCheckbox();
            await dashboardAddTaskModal.checkDueByCheckbox();
            await browser.pause(500);

            await dashboardAddTaskModal.selectDateFromPicker(DATE_MONTH, DATE_DAY);
            await dashboardAddTaskModal.cancelForm();

            console.log(`✓ Completed: ${caseName}`);
        }

        console.log('\n✓ All cases processed from John Doe to Luigi');
    });
});
