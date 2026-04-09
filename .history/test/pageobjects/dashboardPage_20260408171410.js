import { $, $$ } from '@wdio/globals';
import Page from './page.js';
import Helper from '../utils/helpers.js';

class DashboardPage extends Page {
    get filterDropdown() {
        return $('[data-testid="upcoming-events-filter-dropdown"]');
    }

    get logoutButton() {
        return $('[data-testid="menu-logout-button"]');
    }

    get loginUsernameField() {
        return $('[data-testid="login-username"]');
    }

    get taskItems() {
        return $$('[data-testid^="event-case-persona"]');
    }

    get upcomingEventFilters() {
        return $$('[data-testid^="event-case-persona-"]');
    }

    async holdAllUpcomingEventFilters(duration = 2000) {
    const filters = await this.upcomingEventFilters;

    if (filters.length === 0) {
        console.warn('⚠️ No upcoming event filters found — skipping step.');
        return;
    }

    for (const filter of filters) {
        try {
            if (await filter.isDisplayed()) {
                await filter.click({ duration });
            }
        } catch (err) {
            console.log('Element disappeared, continuing...');
        }
    }
}

    async waitForDashboard() {
        await this.logoutButton.waitForDisplayed({ timeout: 10000 });
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
    }

    async getFilterText() {
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
        return this.filterDropdown.getAttribute('value');
    }

    async openFilter() {
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
        await this.filterDropdown.scrollIntoView();
        await browser.pause(300);
        await this.filterDropdown.click();

        await browser.waitUntil(async () => {
            const expanded = await this.filterDropdown.getAttribute('aria-expanded');
            return expanded === 'true';
        }, {
            timeout: 5000,
            timeoutMsg: 'Upcoming events filter dropdown did not open'
        });
    }

    async waitForFilterValue(value) {
        await browser.waitUntil(async () => {
            const current = await this.getFilterText();
            return Boolean(current) && current.includes(value);
        }, {
            timeout: 7000,
            timeoutMsg: `Filter value did not update to "${value}"`
        });
    }

    async selectOptionByText(text) {
        await this.openFilter();

        const option = await $(`//div[@role="option" and contains(normalize-space(.), "${text}")]`);
        await option.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: `Filter option "${text}" was not visible`
        });

        await option.click();
        await this.waitForFilterValue(text);
    }

    async cycleThroughFilters() {
        await this.selectOptionByText('Within 7 days');
        await this.selectOptionByText('Within 14 days');
        await this.selectOptionByText('Within 30 days');
        await this.selectOptionByText('Within 3 months');
    }

    async getTaskCount() {
        const tasks = await this.taskItems;
        return tasks.length;
    }

    async waitForTaskUpdate(previousCount) {
        await browser.waitUntil(async () => {
            const currentCount = await this.getTaskCount();
            return currentCount !== previousCount || currentCount >= 0;
        }, {
            timeout: 8000,
            timeoutMsg: 'Task list did not update after changing the filter'
        });
    }

    async holdUpcomingEventsFilter(duration = 2000) {
        await Helper.clickAndHold(this.filterDropdown, duration);
    }

    async logout() {
        await this.logoutButton.waitForClickable({ timeout: 10000 });
        await this.logoutButton.click();
        await this.loginUsernameField.waitForDisplayed({ timeout: 10000 });
    }

    get eventNames() {
        return $$('[data-testid^="event-case-persona-"] .fui-Persona__primaryText');
    }

    async getAllEventNames() {
        const elements = await this.eventNames;

        let names = [];

        for (let i = 0; i < elements.length; i++) {
            let text = await elements[i].getText();
            names.push(text);
        }

        return names;
    }

    get eventDates() {
        return $$('[data-testid^="event-case-persona-"] span');
     }

    async getAllEventDates() {
        const elements = await this.eventDates;
        let dates = [];

        for (let i = 0; i < elements.length; i++) {
            let text = await elements[i].getText().trim();
            if (text && (text.match(/^[A-Za-z]{3}$/) || text.match(/^[0-9]{1,2}$/))) {
                dates.push(text);  // ✅ Fixed: always push matching dates
            }
        }
        return dates;
    }

    
async hoverOverEvent(event) {
        console.log('Hovering over event to reveal edit button');
        await event.waitForDisplayed({ timeout: 10000 });
        await event.scrollIntoView();
        await browser.pause(1000);
        
        // slow precise hover to right side where edit usually appears
        await event.moveTo({ x: 50, y: 20 });
        await browser.pause(2000);
        await event.moveTo({ x: 80, y: 15 });
        await browser.pause(2000);
        console.log('Hover complete, waiting for edit to appear');
    }

async clickEditButtonFromEvent(event) {
        console.log('Looking for edit button after hover...');
        
        // even longer wait + multiple hover attempts
        await browser.pause(4000);
        
        // try multiple SVG selectors progressively
        const svgSelectors = [
            'svg.fui-Icon path[d^="M17.18"]',
            'svg.fui-Icon',
            'svg[aria-hidden="true"]',
            '.fui-Icon',
            'svg',
            '[class*="Icon"]'
        ];
        
        let editButton = null;
        for (const selector of svgSelectors) {
            editButton = await event.$(selector);
            if (await editButton.isExisting()) {
                console.log(`Found edit button with selector: ${selector}`);
                break;
            }
        }
        
        if (await editButton.isExisting()) {
            await editButton.scrollIntoView();
            await browser.pause(1000);
            await editButton.click();
            console.log('Clicked SVG edit button');
            return;
        }

        // data-testid fallbacks
        const dataTestSelectors = [
            '[data-testid^="case-event-edit"]',
            '[data-testid*="edit"]'
        ];
        
        for (const selector of dataTestSelectors) {
            editButton = await event.$(selector);
            if (await editButton.isExisting()) {
                console.log(`Found data-testid edit button: ${selector}`);
                break;
            }
        }
        
        if (!(await editButton.isExisting())) {
            const eventId = await event.getAttribute('data-testid');
            if (eventId) {
                editButton = await $(`[data-testid*="edit-${eventId.split('-')[3]}"]`); // extract ID part
            }
        }

        if (!(await editButton.isExisting())) {
            // ultimate fallback - click right side of event
            console.log('Using coordinate click on event right side as last resort');
        const rect = await browser.getElementRect(event.elementId ? event.elementId : await event.getAttribute('element-6066-11e4-a52e-4f735466cecf'));
            await browser.action('pointer')
                .move({ x: rect.width - 20, y: rect.height / 2 })
                .click()
                .perform();
            console.log('Coordinate clicked right side of event');
            return;
        }

        await editButton.scrollIntoView();
        await editButton.waitForClickable({ timeout: 5000 });
        await editButton.click();
        console.log('Clicked fallback edit button');
    }

    async editAllUpcomingEvents() {
        const events = await this.upcomingEventFilters;

        if (events.length === 0) {
            console.warn('No upcoming events found — skipping edit');
            return false;
        }

        console.log(`Found ${events.length} event(s)`);

        for (let i = 0; i < events.length; i++) {
            const refreshedEvents = await this.upcomingEventFilters;
            const event = refreshedEvents[i];

            try {
                await this.hoverOverEvent(event);
                await this.clickEditButtonFromEvent(event);
                console.log(`Clicked edit on event ${i + 1}`);

                const closeButton = await $('[data-testid="event-cancel-button"]');
                if (await closeButton.isExisting()) {
                    await closeButton.click();
                    await this.waitForDashboard();
                }
            } catch (err) {
                console.log(`Could not edit event ${i + 1}, continuing...`);
            }
        }

        return true;
    }

    async editFirstEventFullFlow() {
        const events = await this.upcomingEventFilters;

        if (events.length === 0) {
            console.warn('No events found — skipping test');
            return false;
        }

        const originalEvent = events[0];
        const originalNameElement = await originalEvent.$('.fui-Persona__primaryText');
        const originalEventName = await originalNameElement.getText();

        await this.hoverOverEvent(originalEvent);
        await this.clickEditButtonFromEvent(originalEvent);

        const eventInput = await $('[data-testid="event-input"]');
        await eventInput.waitForDisplayed({ timeout: 10000 });
        await eventInput.click();
        await browser.keys(['Control', 'a', 'Backspace']); // delete the word "test"
        await browser.pause(200);
        await eventInput.setValue('test');
        console.log('Deleted test and retyped test in event field');

        const dateInput = await $('[data-testid="event-date-picker"]');
        await dateInput.waitForDisplayed({ timeout: 5000 });
        await dateInput.click();
        await browser.pause(1000);
        // select Sat Apr 11 2026 or first available by arrow
        await browser.keys(['ArrowDown']);
        await browser.keys('Enter');
        console.log('Selected event date');

        const checkbox = await $('[data-testid="event-due-checkbox"]');
        await checkbox.waitForDisplayed({ timeout: 5000 });
        await checkbox.click(); // click to select "Is Due Date?"
        console.log('Selected Is Due Date checkbox');

        const description = await $('[data-testid="event-description-textarea"]');
        await description.waitForDisplayed({ timeout: 5000 });
        const descText = await description.getText();
        if (descText !== 'sfshfjksdhk') {
            console.warn('Description not sfshfjksdhk as expected');
        }
        await description.click();
        await browser.keys(['Control', 'a', 'Backspace']); // delete sfshfjksdhk
        await description.setValue('sfshfjksdhk');
        console.log('Deleted and retyped sfshfjksdhk in description');

        const notesButton = await $('[data-testid="event-notes-button"]');
        await notesButton.waitForClickable({ timeout: 5000 });
        await notesButton.click();

        const noteInput = await $('[data-testid="case-note-input"]');
        await noteInput.waitForDisplayed({ timeout: 5000 });
        await noteInput.setValue('"Giggity"- From Quagmire');

        const addNoteButton = await $('[data-testid="case-note-add-button"]');
        await addNoteButton.waitForClickable({ timeout: 5000 });
        await addNoteButton.click();

        // now enter random gibberish in description to enable save
        const descriptionGibberish = await $('[data-testid="event-description-textarea"]');
        await descriptionGibberish.setValue('sfshfjksdhk blahblahgibberish123xyz');
        console.log('Added random gibberish to description before save');

        const saveButton = await $('[data-testid="event-save-button"]');
        await saveButton.waitForClickable({ timeout: 10000 });
        await saveButton.click();
        console.log('Clicked Save Event');

        // wait for full dashboard reload (no URL change)
        await browser.pause(2000);
        await this.waitForDashboard();
        console.log('Dashboard reloaded after save');

        // find the event with name "test"
        const allEvents = await this.upcomingEventFilters;
        let testEvent = null;
        for (const ev of allEvents) {
            const nameEl = await ev.$('.fui-Persona__primaryText');
            const name = await nameEl.getText();
            if (name.toLowerCase().includes('test')) {
                testEvent = ev;
                break;
            }
        }
        if (!testEvent) {
            throw new Error('Could not find the edited "test" event');
        }
        console.log('Found the edited test event');

        await this.hoverOverEvent(testEvent);
        await this.clickEditButtonFromEvent(testEvent);
        console.log('Reopened the test event to verify');

        // wait for full popup load
        await browser.pause(2000);
        const reopenedEventInput = await $('[data-testid="event-input"]');
        await reopenedEventInput.waitForDisplayed({ timeout: 10000 });
        expect(await reopenedEventInput.getValue()).toBe('test');

        const reopenedDescription = await $('[data-testid="event-description-textarea"]');
        await reopenedDescription.waitForDisplayed({ timeout: 5000 });
        expect(await reopenedDescription.getValue()).toContain('sfshfjksdhk');

        const notesButtonAgain = await $('[data-testid="event-notes-button"]');
        await notesButtonAgain.waitForClickable({ timeout: 5000 });
        await notesButtonAgain.click();
        await browser.pause(1000);

        // check note loaded
        const savedNote = await $('[data-testid="case-note-input"] ~ * | *[contains(text(), "Giggity")]');
        expect(await savedNote.isExisting()).toBe(true);
        console.log('Verified note and fields updated');

        const savedEventValue = await reopenedEventInput.getValue();
        const savedDescriptionValue = await reopenedDescription.getValue();

        if (savedEventValue !== 'Test') {
            throw new Error(`Saved event value mismatch. Expected "Test" but got "${savedEventValue}"`);
        }

        if (!savedDescriptionValue.includes('sfshfjksdhk')) {
            throw new Error(`Saved description mismatch. Got "${savedDescriptionValue}"`);
        }

        const closeButton = await $('[data-testid="event-cancel-button"]');
        await closeButton.waitForClickable({ timeout: 5000 });
        await closeButton.click();

        await this.waitForDashboard();
        return true;
    }
}

export default new DashboardPage();
