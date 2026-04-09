import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

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

    async waitForDashboard() {
        await this.logoutButton.waitForDisplayed({ timeout: 10000 });
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
    }

    async getFilterText() {
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
        return this.filterDropdown.getAttribute("value");
    }

    async openFilter() {
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
        await this.filterDropdown.scrollIntoView({ block: "center", inline: "center" });
        await browser.pause(300);

        try {
            await browser.keys("Escape");
            await browser.pause(200);
        } catch (error) {
            console.log("No tooltip or popup needed closing.");
        }

        try {
            await this.filterDropdown.click();
        } catch (error) {
            await browser.pause(300);
            await browser.execute((el) => el.click(), await this.filterDropdown);
        }

        await browser.waitUntil(async () => {
            const isOpen = await this.filterDropdown.getAttribute("aria-expanded");
            return isOpen === "true";
        }, {
            timeout: 5000,
            timeoutMsg: "Filter dropdown did not open"
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
        await this.selectOptionByText("Within 7 days");
        await browser.pause(1500);
        await this.selectOptionByText("Within 14 days");
        await browser.pause(1500);
        await this.selectOptionByText("Within 30 days");
        await browser.pause(1500);
        await this.selectOptionByText("Within 3 months");
        await browser.pause(1000);
    }

    async getTaskCount() {
        const tasks = await this.taskItems;
        return tasks.length;
    }

    async waitForTaskUpdate() {
        await browser.pause(3000);
        await this.filterDropdown.waitForDisplayed({ timeout: 5000 });
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
        const names = [];

        for (let i = 0; i < elements.length; i++) {
            const text = await elements[i].getText();
            names.push(text);
        }

        return names;
    }

    get eventDates() {
        return $$('[data-testid^="event-case-persona-"] span');
    }

    async getAllEventDates() {
        const elements = await this.eventDates;
        const dates = [];

        for (let i = 0; i < elements.length; i++) {
            const text = await elements[i].getText().trim();
            if (text && (text.match(/^[A-Za-z]{3}$/) || text.match(/^[0-9]{1,2}$/))) {
                dates.push(text);
            }
        }

        return dates;
    }

    async clickEditButtonFromEvent(event) {
        console.log("Trying to find the edit button.");

        await event.scrollIntoView();
        await browser.pause(300);

        const editButton = await event.$('button[aria-label="Edit"], [data-testid^="case-event-edit"], [data-testid*="event-edit"]');
        if (await editButton.isExisting()) {
            await browser.execute((el) => el.click(), editButton);
            return;
        }

        const svgEdit = await event.$("svg.fui-Icon, .fui-Icon");
        if (await svgEdit.isExisting()) {
            await browser.execute((el) => {
                const clickable = el.closest("button,[role='button']") || el;
                clickable.click();
            }, svgEdit);
            return;
        }

        const fallbackButton = await event.$("button, [role='button']");
        if (await fallbackButton.isExisting()) {
            await browser.execute((el) => el.click(), fallbackButton);
            return;
        }

        throw new Error("Could not locate the event edit button.");
    }

    async editAllUpcomingEvents() {
        const events = await this.upcomingEventFilters;

        if (!events.length) {
            console.warn("No upcoming events found.");
            return false;
        }

        console.log(`Found ${events.length} event(s).`);

        for (let i = 0; i < events.length; i++) {
            const refreshedEvents = await this.upcomingEventFilters;
            const event = refreshedEvents[i];

            try {
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
            console.warn("No events found.");
            return false;
        }

        const firstEvent = events[0];
        await this.clickEditButtonFromEvent(firstEvent);

        const eventInput = await $('[data-testid="event-input"]');
        await eventInput.waitForDisplayed({ timeout: 10000 });
        await eventInput.click();
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");
        await eventInput.setValue("test");

        const dateInput = await $('[data-testid="event-date-picker"]');
        await dateInput.waitForDisplayed({ timeout: 5000 });
        await dateInput.click();
        await browser.pause(500);

        const dateOptions = await $$('[role="option"]');
        if (dateOptions.length > 0) {
            await dateOptions[0].click();
        } else {
            await browser.keys("ArrowDown");
            await browser.keys("Enter");
        }

        const checkbox = await $('[data-testid="event-due-checkbox"]');
        await checkbox.waitForDisplayed({ timeout: 5000 });
        if (!(await checkbox.isSelected())) {
            await checkbox.click();
        }

        const description = await $('[data-testid="event-description-textarea"]');
        await description.waitForDisplayed({ timeout: 5000 });
        await description.click();
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");
        await description.setValue("sfshfjksdhk");

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
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");
        await description.setValue("sfshfjksdhk random gibberish xyz");

        const saveButton = await $('[data-testid="event-save-button"]');
        await saveButton.waitForClickable({ timeout: 15000 });
        await saveButton.click();

        await browser.waitUntil(async () => {
            return await this.logoutButton.isDisplayed();
        }, {
            timeout: 15000,
            timeoutMsg: "Dashboard did not return after saving the event"
        });

        const allEvents = await this.upcomingEventFilters;
        let testEvent = null;

        for (const ev of allEvents) {
            const nameEl = await ev.$(".fui-Persona__primaryText");
            const name = await nameEl.getText();

            if (name.toLowerCase().includes("test")) {
                testEvent = ev;
                break;
            }
        }

        if (!testEvent) {
            throw new Error('Could not find the edited test event.');
        }

        await this.clickEditButtonFromEvent(testEvent);

        const reopenedEventInput = await $('[data-testid="event-input"]');
        await reopenedEventInput.waitForDisplayed({ timeout: 10000 });
        const reopenedName = await reopenedEventInput.getValue();
        if (!reopenedName.toLowerCase().includes("test")) {
            throw new Error(`Expected event name to include "test", got "${reopenedName}"`);
        }

        const reopenedDescription = await $('[data-testid="event-description-textarea"]');
        await reopenedDescription.waitForDisplayed({ timeout: 5000 });
        const reopenedDescriptionValue = await reopenedDescription.getValue();
        if (!reopenedDescriptionValue.toLowerCase().includes("sfshfjksdhk")) {
            throw new Error(`Expected description to include "sfshfjksdhk", got "${reopenedDescriptionValue}"`);
        }

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
