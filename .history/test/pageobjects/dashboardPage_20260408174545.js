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

        if (!filters.length) {
            console.warn('No upcoming event filters found.');
            return;
        }

        for (const filter of filters) {
            try {
                const show = await filter.isDisplayed();
                if (show) {
                    await filter.click({ duration });
                }
            } catch (error) {
                console.log('Skipping one filter because it went away.');
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
            const isOpen = await this.filterDropdown.getAttribute('aria-expanded');
            return isOpen === 'true';
        }, {
            timeout: 5000,
            timeoutMsg: 'Filter dropdown did not open'
        });
    }

    async waitForFilterValue(value) {
        await browser.waitUntil(async () => {
            const currentValue = await this.getFilterText();
            return currentValue && currentValue.includes(value);
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
        await browser.pause(1500);
        await this.selectOptionByText('Within 14 days');
        await browser.pause(1500);
        await this.selectOptionByText('Within 30 days');
        await browser.pause(1500);
        await this.selectOptionByText('Within 3 months');
        await browser.pause(1000);
    }

    async getTaskCount() {
        const tasks = await this.taskItems;
        return tasks.length;
    }

    async waitForTaskUpdate(previousCount) {
        await browser.pause(3000);
        await this.filterDropdown.waitForDisplayed({ timeout: 5000 });

        const currentCount = await this.getTaskCount();

        if (currentCount !== previousCount) {
            console.log('Tasks updated.');
        } else {
            console.log('Task count stayed the same.');
        }
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
                dates.push(text);
            }
        }
        return dates;
    }

    async hoverOverEvent(event) {
        console.log('Hovering over event.');
        await event.waitForDisplayed({ timeout: 10000 });
        await event.scrollIntoView();
        await browser.pause(1000);

        await event.moveTo({ x: 50, y: 20 });
        await browser.pause(2000);
        await event.moveTo({ x: 80, y: 15 });
        await browser.pause(2000);
        console.log('Hover done.');
    }

    async clickEditButtonFromEvent(event) {
        console.log('Trying to find the edit button.');

        await browser.pause(4000);

        const selectors = [
            'svg.fui-Icon path[d^="M17.18"]',
            'svg.fui-Icon',
            'svg[aria-hidden="true"]',
            '.fui-Icon',
            'svg',
            '[class*="Icon"]',
            '[data-testid^="case-event-edit"]',
            '[data-testid*="edit"]'
        ];

        let editButton = null;

        for (const selector of selectors) {
            editButton = await event.$(selector);
            if (await editButton.isExisting()) {
                console.log('Edit button found with selector:', selector);
                break;
            }
        }

        if (!editButton || !(await editButton.isExisting())) {
            const eventId = await event.getAttribute('data-testid');
            if (eventId) {
                editButton = await $(`[data-testid*="edit-${eventId.split('-')[3]}"]`);
            }
        }

        if (!editButton || !(await editButton.isExisting())) {
            console.log('Using the right side of the event as a fallback.');
            const rect = await event.getRect();
            await browser.action('pointer')
                .move({ x: rect.width - 20, y: rect.height / 2 })
                .click()
                .perform();
            return;
        }

        await editButton.scrollIntoView();
        await editButton.waitForClickable({ timeout: 5000 });
        await editButton.click();
    }

    async editAllUpcomingEvents() {
        const events = await this.upcomingEventFilters;

        if (!events.length) {
            console.warn('No upcoming events found.');
            return false;
        }

        console.log(`Found ${events.length} event(s).`);

        for (let i = 0; i < events.length; i++) {
            const refreshedEvents = await this.upcomingEventFilters;
            const event = refreshedEvents[i];

            try {
                await this.hoverOverEvent(event);
                await this.clickEditButtonFromEvent(event);
                console.log(`Clicked edit on event ${i + 1}.`);

                const closeButton = await $('[data-testid="event-cancel-button"]');
                if (await closeButton.isExisting()) {
                    await closeButton.click();
                    await this.waitForDashboard();
                }
            } catch (error) {
                console.log(`Could not edit event ${i + 1}.`);
            }
        }

        return true;
    }

    async editFirstEventFullFlow() {
        const events = await this.upcomingEventFilters;

        if (!events.length) {
            console.warn('No events found.');
            return false;
        }

        const firstEvent = events[0];

        await this.hoverOverEvent(firstEvent);
        await this.clickEditButtonFromEvent(firstEvent);

        const eventInput = await $('[data-testid="event-input"]');
        await eventInput.waitForDisplayed({ timeout: 10000 });
        await eventInput.click();
        await browser.keys(['Control', 'a', 'Backspace']);
        await browser.pause(200);
        await eventInput.setValue('test');

        const dateInput = await $('[data-testid="event-date-picker"]');
        await dateInput.waitForDisplayed({ timeout: 5000 });
        await dateInput.click();
        await browser.pause(1000);
        await browser.keys(['ArrowDown']);
        await browser.keys('Enter');

        const checkbox = await $('[data-testid="event-due-checkbox"]');
        await checkbox.waitForDisplayed({ timeout: 5000 });
        await checkbox.click();

        const description = await $('[data-testid="event-description-textarea"]');
        await description.waitForDisplayed({ timeout: 5000 });
        await description.click();
        await browser.keys(['Control', 'a', 'Backspace']);
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

        await description.click();
        await description.setValue('sfshfjksdhk blahblahgibberish123xyz');

        const saveButton = await $('[data-testid="event-save-button"]');
        await saveButton.waitForClickable({ timeout: 10000 });
        await saveButton.click();

        await browser.pause(2000);
        await this.waitForDashboard();

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
            throw new Error('Could not find the edited test event.');
        }

        await this.hoverOverEvent(testEvent);
        await this.clickEditButtonFromEvent(testEvent);

        const reopenedEventInput = await $('[data-testid="event-input"]');
        await reopenedEventInput.waitForDisplayed({ timeout: 10000 });
        expect(await reopenedEventInput.getValue()).toBe('test');

        const reopenedDescription = await $('[data-testid="event-description-textarea"]');
        await reopenedDescription.waitForDisplayed({ timeout: 5000 });
        expect(await reopenedDescription.getValue()).toContain('sfshfjksdhk');

        await notesButton.waitForClickable({ timeout: 5000 });
        await notesButton.click();

        const closeButton = await $('[data-testid="event-cancel-button"]');
        await closeButton.waitForClickable({ timeout: 5000 });
        await closeButton.click();

        await this.waitForDashboard();
        return true;
    }
}

export default new DashboardPage();
