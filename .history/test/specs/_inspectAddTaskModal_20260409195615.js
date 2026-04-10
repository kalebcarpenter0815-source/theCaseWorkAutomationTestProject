import { expect } from '@wdio/globals';
import loginHelper from '../utils/loginHelper.js';
import dashboardPage from '../pageobjects/dashboardPage.js';

describe('Inspect Add Task Modal Selectors', () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
    });

    after(async () => {
        await dashboardPage.logout();
    });

    it('should inspect Add Task modal selectors and extract Assign To names', async () => {
        // Navigate to My Tasks section
        await browser.url('https://app.thecasework.com/dashboard');
        await browser.pause(3000);

        // Find and click Add Task button
        const addTaskButton = await $('[data-testid="tasks-card-add-task-button"]');
        
        try {
            await addTaskButton.click();
            await browser.pause(2000);

            // Extract all modal element selectors and information
            const modalInfo = await browser.execute(() => {
                const info = {};

                // Find all form elements in the modal
                const allElements = document.querySelectorAll('[role="dialog"] *, [class*="modal"] *');
                
                // Case dropdown
                const caseDropdown = Array.from(allElements).find(el => 
                    el.getAttribute?.('data-testid')?.includes('case') ||
                    el.getAttribute?.('aria-label')?.includes('Case') ||
                    el.textContent?.includes('Case')
                );
                info.caseDropdown = caseDropdown ? caseDropdown.getAttribute('data-testid') || caseDropdown.id : 'NOT FOUND';

                // Assign To dropdown  
                const assignToDropdown = Array.from(allElements).find(el => 
                    el.getAttribute?.('data-testid')?.includes('assign') ||
                    el.getAttribute?.('aria-label')?.includes('Assign') ||
                    el.textContent?.trim()?.startsWith('Assign To') ||
                    el.textContent?.includes('KALEB') ||
                    el.textContent?.includes('CARPENTER')
                );
                info.assignToDropdown = assignToDropdown ? assignToDropdown.getAttribute('data-testid') || assignToDropdown.id || 'FOUND_NO_ID' : 'NOT FOUND';

                // Get all person names from Assign To dropdown if it exists
                const assignToOptions = Array.from(document.querySelectorAll('[role="option"], li, button, div[class*="option"]'))
                    .filter(el => el.textContent && el.textContent.length > 2 && el.textContent.length < 100)
                    .map(el => el.textContent.trim())
                    .filter((v, i, a) => a.indexOf(v) === i) // unique
                    .slice(0, 30);
                info.assignToOptions = assignToOptions;

                // Milestone dropdown
                const milestoneDropdown = Array.from(allElements).find(el => 
                    el.getAttribute?.('data-testid')?.includes('milestone') ||
                    el.getText?.()?.includes('#1') ||
                    el.textContent?.includes('Milestone') ||
                    el.textContent?.includes('#1')
                );
                info.milestoneDropdown = milestoneDropdown ? milestoneDropdown.getAttribute('data-testid') || milestoneDropdown.id : 'NOT FOUND';

                // Task to Complete text field
                const taskField = document.querySelector('[placeholder*="task"], [placeholder*="Task"], textarea, input[type="text"][id*="task"]');
                info.taskField = taskField ? taskField.getAttribute('data-testid') || taskField.id || taskField.getAttribute('placeholder') || taskField.name : 'NOT FOUND';

                // Billable checkbox
                const billableCheckbox = Array.from(document.querySelectorAll('input[type="checkbox"], label')).find(el => 
                    el.textContent?.includes('Billable') ||
                    el.getAttribute?.('aria-label')?.includes('Billable') ||
                    el.name?.includes('billable')
                );
                info.billableCheckbox = billableCheckbox ? billableCheckbox.getAttribute('data-testid') || billableCheckbox.id || billableCheckbox.name : 'NOT FOUND';

                // Due By checkbox
                const dueByCheckbox = Array.from(document.querySelectorAll('input[type="checkbox"], label')).find(el => 
                    el.textContent?.includes('Due By') ||
                    el.getAttribute?.('aria-label')?.includes('Due') ||
                    el.name?.includes('due')
                );
                info.dueByCheckbox = dueByCheckbox ? dueByCheckbox.getAttribute('data-testid') || dueByCheckbox.id || dueByCheckbox.name : 'NOT FOUND';

                // Date picker button or field
                const datePickerButton = Array.from(document.querySelectorAll('button, input')).find(el => 
                    el.textContent?.includes('Select a date') ||
                    el.getAttribute?.('aria-label')?.includes('date') ||
                    el.id?.includes('date') ||
                    el.type === 'date'
                );
                info.datePickerButton = datePickerButton ? datePickerButton.getAttribute('data-testid') || datePickerButton.id || datePickerButton.type : 'NOT FOUND';

                // Cancel button
                const cancelButton = Array.from(document.querySelectorAll('button')).find(el => 
                    el.textContent?.toLowerCase().includes('cancel')
                );
                info.cancelButton = cancelButton ? cancelButton.getAttribute('data-testid') || cancelButton.id || 'FOUND_NO_ID' : 'NOT FOUND';

                // Add Task button (inside modal to submit)
                const submitButton = Array.from(document.querySelectorAll('button')).find(el => 
                    el.textContent?.toLowerCase().includes('add task') ||
                    el.textContent?.toLowerCase().includes('create') || 
                    el.textContent?.toLowerCase().includes('submit')
                );
                info.submitButton = submitButton ? submitButton.getAttribute('data-testid') || submitButton.id || 'FOUND_NO_ID' : 'NOT FOUND';

                console.log('=== ADD TASK MODAL SELECTORS ===');
                console.log(JSON.stringify(info, null, 2));

                return info;
            });

            console.log('\n=== EXTRACTED MODAL INFO ===');
            console.log(JSON.stringify(modalInfo, null, 2));

            expect(modalInfo).toBeDefined();
        } catch (err) {
            console.error('Error during modal inspection:', err.message);
            throw err;
        }
    });
});
import { expect } from '@wdio/globals';
import loginHelper from '../utils/loginHelper.js';
import dashboardPage from '../pageobjects/dashboardPage.js';

describe('Inspect Add Task Modal Selectors', () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await browser.url('https://app.thecasework.com');
    });

    after(async () => {
        await dashboardPage.logout();
    });

    it('should inspect Add Task modal selectors and extract Assign To names', async () => {
        // Navigate to My Tasks section
        await browser.url('https://app.thecasework.com/dashboard');
        
        // Wait for My Tasks section to load
        const myTasksSection = await $('xpath=//button[contains(@data-testid, "tasks-card-case-filter-dropdown")]');
        await myTasksSection.waitForDisplayed({ timeout: 15000 });
        await browser.pause(2000);

        // Scroll to ensure Add Task button is visible
        const addTaskButton = await $('[data-testid="tasks-card-add-task-button"]');
        await addTaskButton.scrollIntoView();
        await addTaskButton.waitForDisplayed({ timeout: 10000 });
        await browser.pause(1000);

        // Click Add Task button
        await addTaskButton.click();
        await browser.pause(3000);

        // Extract all modal element selectors and information
        const modalInfo = await browser.execute(() => {
            const info = {};

            // Add Task Modal main container
            const modal = document.querySelector('[role="dialog"]') || document.querySelector('.modal') || document.querySelector('[class*="modal"]');
            info.modalSelector = modal ? modal.getAttribute('data-testid') || modal.className : 'NOT FOUND';

            // Case dropdown
            const caseDropdown = document.querySelector('[data-testid*="case"]') || document.querySelector('[id*="case"]') || Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Select a Case'));
            info.caseDropdownSelector = caseDropdown ? (caseDropdown.getAttribute('data-testid') || caseDropdown.id || caseDropdown.className) : 'NOT FOUND';

            // Assign To dropdown - extract all names
            const assignToDropdown = Array.from(document.querySelectorAll('button, select, [role="combobox"]')).find(el => el.textContent.includes('Assign To') || el.textContent.includes('KALEB') || el.setAttribute?.('aria-label')?.includes('Assign'));
            info.assignToDropdownSelector = assignToDropdown ? (assignToDropdown.getAttribute('data-testid') || assignToDropdown.id || assignToDropdown.className) : 'NOT FOUND';

            // Look for all Assign To people in any dropdown/select/list
            const allButtonsAndSelects = Array.from(document.querySelectorAll('button, option, [role="option"], li, div[class*="option"]'));
            const assignToNames = [];
            allButtonsAndSelects.forEach(el => {
                const text = el.textContent?.trim();
                if (text && (text.includes('CARPENTER') || text.includes('KALEB') || text.match(/^[A-Z\s]+$/) && text.length > 3)) {
                    if (!assignToNames.includes(text)) {
                        assignToNames.push(text);
                    }
                }
            });
            info.assignToNames = assignToNames.slice(0, 20); // First 20 found

            // Milestone dropdown
            const milestoneDropdown = Array.from(document.querySelectorAll('button, select, [role="combobox"]')).find(el => el.textContent.includes('Milestone') || el.textContent.includes('#1'));
            info.milestoneDropdownSelector = milestoneDropdown ? (milestoneDropdown.getAttribute('data-testid') || milestoneDropdown.id || milestoneDropdown.className) : 'NOT FOUND';

            // Task to Complete field
            const taskField = document.querySelector('[placeholder*="task"], [placeholder*="Task"], textarea, input[type="text"]');
            info.taskFieldSelector = taskField ? (taskField.getAttribute('data-testid') || taskField.id || taskField.getAttribute('placeholder') || taskField.className) : 'NOT FOUND';

            // Billable checkbox
            const billableCheckbox = Array.from(document.querySelectorAll('input[type="checkbox"], label')).find(el => el.textContent.includes('Billable') || el.getAttribute?.('aria-label')?.includes('Billable'));
            info.billableCheckboxSelector = billableCheckbox ? (billableCheckbox.getAttribute('data-testid') || billableCheckbox.id || billableCheckbox.className) : 'NOT FOUND';

            // Due By checkbox
            const dueByCheckbox = Array.from(document.querySelectorAll('input[type="checkbox"], label')).find(el => el.textContent.includes('Due By') || el.getAttribute?.('aria-label')?.includes('Due'));
            info.dueByCheckboxSelector = dueByCheckbox ? (dueByCheckbox.getAttribute('data-testid') || dueByCheckbox.id || dueByCheckbox.className) : 'NOT FOUND';

            // Date picker / Calendar button
            const datePickerButton = Array.from(document.querySelectorAll('button, [role="button"]')).find(el => el.textContent.includes('Select a date') || el.getAttribute?.('aria-label')?.includes('date') || el.className.includes('calendar'));
            info.datePickerSelector = datePickerButton ? (datePickerButton.getAttribute('data-testid') || datePickerButton.id || datePickerButton.className) : 'NOT FOUND';

            // Cancel button
            const cancelButton = Array.from(document.querySelectorAll('button')).find(el => el.textContent.toLowerCase().includes('cancel'));
            info.cancelButtonSelector = cancelButton ? (cancelButton.getAttribute('data-testid') || cancelButton.id || cancelButton.className) : 'NOT FOUND';

            // Log all collected info
            console.log('=== ADD TASK MODAL SELECTORS ===');
            console.log(JSON.stringify(info, null, 2));

            return info;
        });

        console.log('\n=== EXTRACTED MODAL INFO ===');
        console.log(JSON.stringify(modalInfo, null, 2));

        // Try to click Cancel to close modal safely
        const cancelBtn = await $('button=Cancel').catch(() => null);
        if (cancelBtn) {
            await cancelBtn.click();
        }

        expect(modalInfo).toBeDefined();
    });
});
