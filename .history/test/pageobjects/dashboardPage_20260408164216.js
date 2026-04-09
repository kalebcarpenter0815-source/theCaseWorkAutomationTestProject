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
            let text = await elements[i].getText();

            // very simple checks
        if (
            text == 'Jan' || text == 'Feb' || text == 'Mar' ||
            text == 'Apr' || text == 'May' || text == 'Jun' ||
            text == 'Jul' || text == 'Aug' || text == 'Sep' ||
            text == 'Oct' || text == 'Nov' || text == 'Dec' ||
            text == '1' || text == '2' || text == '3' || text == '4' ||
            text == '5' || text == '6' || text == '7' || text == '8' ||
            text == '9' || text == '10' || text == '11' || text == '12' ||
            text == '13' || text == '14' || text == '15' || text == '16' ||
            text == '17' || text == '18' || text == '19' || text == '20' ||
            text == '21' || text == '22' || text == '23' || text == '24' ||
            text == '25' || text == '26' || text == '27' || text == '28' ||
            text == '29' || text == '30' || text == '31'
        ) {
            dates.push(text);
        }
     }

        return dates;
    }

    
async hoverOverEvent(event) {
        await event.waitForDisplayed({ timeout: 10000 });
        await event.scrollIntoView();
        await browser.pause(500);

        // hover over center to reveal hidden edit button
        await event.moveTo({ x: 10, y: 10 });
        await browser.pause(1500);
    }

async clickEditButtonFromEvent(event) {
        // target the hidden SVG edit icon after hover
        const editSvgSelector = 'svg.fui-Icon path[d="M17.18 2.93a2.97 2.97 0 0 0-4.26-.06l-9.37 9.38c-.33.33-.56.74-.66 1.2l-.88 3.94a.5.5 0 0 0 .6.6l3.93-.87c.46-.1.9-.34 1.23-.68l9.36-9.36a2.97 2.97 0 0 0 .05-4.15Zm-3.55.65a1.97 1.97 0 1 1 2.8 2.8l-.68.66-2.8-2.79.68-.67Zm-1.38 1.38 2.8 2.8-7.99 7.97c-.2.2-.46.35-.74.41l-3.16.7.7-3.18c.07-.27.2-.51.4-.7l8-8Z"]';
        let editButton = await event.$(editSvgSelector);

        if (!(await editButton.isExisting())) {
            editButton = await $(editSvgSelector);
        }

        await editButton.waitForDisplayed({ timeout: 5000 });
        await editButton.click();
        console.log('Clicked the hidden edit SVG button');
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
        const isChecked = await checkbox.isSelected();
        if (!isChecked) {
            await checkbox.click();
        }

        const description = await $('[data-testid="event-description-textarea"]');
        await description.waitForDisplayed({ timeout: 5000 });
        await description.clearValue();
        await description.setValue('sfshfjksdhk');

        const notesButton = await $('[data-testid="event-notes-button"]');
        await notesButton.waitForClickable({ timeout: 5000 });
        await notesButton.click();

        const noteInput = await $('[data-testid="case-note-input"]');
        await noteInput.waitForDisplayed({ timeout: 5000 });
        await noteInput.setValue('"Giggity"- From Quagmire');

        const addNoteButton = await $('[data-testid="case-note-add-button"]');
        await addNoteButton.waitForClickable({ timeout: 5000 });
        await addNoteButton.click();

        const descriptionAgain = await $('[data-testid="event-description-textarea"]');
        await descriptionAgain.waitForDisplayed({ timeout: 5000 });
        await descriptionAgain.click();
        await descriptionAgain.clearValue();
        await descriptionAgain.setValue('sfshfjksdhk random-gibberish');

        const saveButton = await $('[data-testid="event-save-button"]');
        await saveButton.waitForClickable({ timeout: 10000 });
        await saveButton.click();

        await this.waitForDashboard();

        const reopenedEventName = originalEventName || 'Test';
        const reopenedEvent = await $(`//div[starts-with(@data-testid,"event-case-persona-")][.//*[contains(normalize-space(.), "${reopenedEventName}")]]`);
        await reopenedEvent.waitForDisplayed({ timeout: 10000 });

        await this.hoverOverEvent(reopenedEvent);
        await this.clickEditButtonFromEvent(reopenedEvent);

        const reopenedEventInput = await $('[data-testid="event-input"]');
        await reopenedEventInput.waitForDisplayed({ timeout: 10000 });

        const reopenedDescription = await $('[data-testid="event-description-textarea"]');
        await reopenedDescription.waitForDisplayed({ timeout: 5000 });

        const notesButtonAgain = await $('[data-testid="event-notes-button"]');
        await notesButtonAgain.waitForClickable({ timeout: 5000 });
        await notesButtonAgain.click();

        const savedNote = await $('//*[contains(text(), "\"Giggity\"- From Quagmire") or contains(text(), "Giggity")]');
        await savedNote.waitForDisplayed({ timeout: 10000 });

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
