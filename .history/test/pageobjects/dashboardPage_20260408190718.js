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

    get eventCards() {
        return $$('[data-testid^="event-case-persona-"]');
    }

    get eventTitles() {
        return $$('[data-testid^="event-case-persona-"] .fui-Persona__primaryText');
    }

    get eventEditButtons() {
        return $$('[data-testid^="case-event-edit-"]');
    }

    get eventEditor() {
        return $('[data-testid="event-input"]');
    }

    get eventDatePicker() {
        return $('[data-testid="event-date-picker"]');
    }

    get eventDueCheckbox() {
        return $('[data-testid="event-due-checkbox"]');
    }

    get eventDescriptionTextarea() {
        return $('[data-testid="event-description-textarea"]');
    }

    get eventNoteInput() {
        return $('[data-testid="case-note-input"]');
    }

    get addNoteButton() {
        return $('[data-testid="case-note-add-button"]');
    }

    get saveEventButton() {
        return $('[data-testid="event-save-button"]');
    }

    get cancelEventButton() {
        return $('[data-testid="event-cancel-button"]');
    }

    get notesButton() {
        return $('[data-testid="event-notes-button"]');
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
            await browser.pause(250);
        } catch (error) {
            console.log("No popup was open to dismiss.");
        }

        const dropdown = await this.filterDropdown;
        await dropdown.waitForClickable({ timeout: 10000 });

        try {
            await dropdown.click();
        } catch (error) {
            await browser.execute((el) => el.click(), dropdown);
        }

        await browser.waitUntil(async () => (await this.filterDropdown.getAttribute("aria-expanded")) === "true", {
            timeout: 5000,
            timeoutMsg: "Filter dropdown did not open"
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

        await browser.waitUntil(async () => {
            const currentValue = await this.getFilterText();
            return currentValue && currentValue.includes(text);
        }, {
            timeout: 7000,
            timeoutMsg: `Filter value did not update to "${text}"`
        });
    }

    async cycleThroughFilters() {
        const filterNames = ["Within 7 days", "Within 14 days", "Within 30 days", "Within 3 months"];
        for (const filterName of filterNames) {
            await this.selectOptionByText(filterName);
            await browser.pause(1000);
        }
    }

    async logout() {
        await this.logoutButton.waitForClickable({ timeout: 10000 });
        await this.logoutButton.click();
        await this.loginUsernameField.waitForDisplayed({ timeout: 10000 });
    }

    async getAllEventNames() {
        const elements = await this.eventTitles;
        const names = [];

        for (const element of elements) {
            names.push(await element.getText());
        }

        return names;
    }

    async getAllEventDates() {
        const events = await this.eventCards;
        const dates = [];

        for (const event of events) {
            const textNodes = await event.$$(".fui-Text");
            for (const node of textNodes) {
                const text = (await node.getText()).trim();
                if (text && /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}$/.test(text)) {
                    dates.push(text);
                }
            }
        }

        return dates;
    }

    async waitForTaskUpdate() {
        await browser.pause(1000);
    }

    async waitForEventEditor() {
        await this.eventEditor.waitForDisplayed({ timeout: 10000 });
    }

    async openFirstEditableEvent() {
        const target = await this.findFirstEditableEvent();

        if (!target) {
            console.warn("No events with an edit button were found.");
            return null;
        }

        await browser.execute((el) => el.click(), target.editButton);
        await this.waitForEventEditor();

        return target;
    }

    async replaceInputValue(element, value) {
        await element.waitForDisplayed({ timeout: 5000 });
        await element.click();
        await element.clearValue();
        await element.setValue(value);
    }

    async selectDateMonthAndDay(monthName, dayNumber) {
        await this.eventDatePicker.waitForClickable({ timeout: 5000 });
        await this.eventDatePicker.click();

        const monthButton = await $(`button[role="gridcell"][aria-label="${monthName}"]`);
        await monthButton.waitForClickable({ timeout: 5000 });
        await monthButton.click();

        const dayButton = await $(`//button[normalize-space(.)="${dayNumber}"]`);
        await dayButton.waitForClickable({ timeout: 5000 });
        await dayButton.click();
    }

    async addNoteAndSave(noteText) {
        await this.notesButton.waitForClickable({ timeout: 5000 });
        await this.notesButton.click();

        await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
        await this.eventNoteInput.setValue(noteText);

        await this.addNoteButton.waitForClickable({ timeout: 5000 });
        await this.addNoteButton.click();

        await this.saveEventButton.waitForClickable({ timeout: 15000 });
        await this.saveEventButton.click();

        await this.waitForDashboard();
    }
    async waitForTaskUpdate() {
        await browser.pause(1000);
    }

    async waitForEventEditor() {
        await this.eventEditor.waitForDisplayed({ timeout: 10000 });
    }

    async openFirstEditableEvent() {
        const target = await this.findFirstEditableEvent();

        if (!target) {
            console.warn("No events with an edit button were found.");
            return null;
        }

        await browser.execute((el) => el.click(), target.editButton);
        await this.waitForEventEditor();

        return target;
    }

    async replaceInputValue(element, value) {
        await element.waitForDisplayed({ timeout: 5000 });
        await element.click();
        await element.clearValue();
        await element.setValue(value);
    }

    async selectDateMonthAndDay(monthName, dayNumber) {
        await this.eventDatePicker.waitForClickable({ timeout: 5000 });
        await this.eventDatePicker.click();

        const monthButton = await $(`button[role="gridcell"][aria-label="${monthName}"]`);
        await monthButton.waitForClickable({ timeout: 5000 });
        await monthButton.click();

        const dayButton = await $(`//button[normalize-space(.)="${dayNumber}"]`);
        await dayButton.waitForClickable({ timeout: 5000 });
        await dayButton.click();
    }

    async addNoteAndSave(noteText) {
        await this.notesButton.waitForClickable({ timeout: 5000 });
        await this.notesButton.click();

        await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
        await this.eventNoteInput.setValue(noteText);

        await this.addNoteButton.waitForClickable({ timeout: 5000 });
        await this.addNoteButton.click();

        await this.saveEventButton.waitForClickable({ timeout: 15000 });
        await this.saveEventButton.click();

        await this.waitForDashboard();
    }

    async getTaskCount() {
        const events = await this.eventCards;
        return events.length;
    }

    async countUpcomingEvents() {
        const events = await this.eventCards;
        return events.length;
    }

    async editAllUpcomingEvents() {
        const events = await this.eventCards;

        if (!events.length) {
            console.warn("No upcoming events found.");
            return 0;
        }

        let editedCount = 0;

        for (let i = 0; i < events.length; i++) {
            const refreshedEvents = await this.eventCards;
            const event = refreshedEvents[i];

            if (!event) {
                continue;
            }

            await event.scrollIntoView({ block: "center", inline: "center" });

            const editButton = await event.$('button[aria-label="Edit"], [data-testid^="case-event-edit"], [data-testid*="event-edit"]');

            if (await editButton.isExisting()) {
                await browser.execute((el) => el.click(), editButton);

                const closeButton = await $('[data-testid="event-cancel-button"]');
                if (await closeButton.isExisting()) {
                    await closeButton.click();
                    await this.waitForDashboard();
                    editedCount += 1;
                }
            }
        }

        return editedCount;
    }

    async findFirstEditableEvent() {
        const events = await this.eventCards;

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (!event) {
                continue;
            }

            await event.scrollIntoView({ block: "center", inline: "center" });

            const editButton = await event.$('button[aria-label="Edit"], [data-testid^="case-event-edit"], [data-testid*="event-edit"]');
            if (await editButton.isExisting()) {
                return { event, editButton };
            }
        }

        return null;
    }

    async editFirstEventFullFlow() {
        const target = await this.findFirstEditableEvent();

        if (!target) {
            console.warn("No events with an edit button were found.");
            return false;
        }

        await browser.execute((el) => el.click(), target.editButton);

        const eventInput = await $('[data-testid="event-input"]');
        await eventInput.waitForDisplayed({ timeout: 10000 });
        await eventInput.setValue("Test");

        const datePicker = await $('[data-testid="event-date-picker"]');
        await datePicker.waitForDisplayed({ timeout: 5000 });

        const dueCheckbox = await $('[data-testid="event-due-checkbox"]');
        if (await dueCheckbox.isExisting()) {
            await dueCheckbox.click();
        }

        const description = await $('[data-testid="event-description-textarea"]');
        await description.waitForDisplayed({ timeout: 5000 });
        await description.setValue("friendly beginner test note");

        const notesButton = await $('[data-testid="event-notes-button"]');
        await notesButton.waitForClickable({ timeout: 5000 });
        await notesButton.click();

        const noteInput = await $('[data-testid="case-note-input"]');
        await noteInput.waitForDisplayed({ timeout: 5000 });
        await noteInput.setValue("random note text");

        const addNoteButton = await $('[data-testid="case-note-add-button"]');
        await addNoteButton.waitForClickable({ timeout: 5000 });
        await addNoteButton.click();

        await description.setValue("random gibberish description for saving");

        const saveButton = await $('[data-testid="event-save-button"]');
        await saveButton.waitForClickable({ timeout: 15000 });
        await saveButton.click();

        await this.waitForDashboard();

        const reopened = await this.findFirstEditableEvent();
        if (reopened) {
            await browser.execute((el) => el.click(), reopened.editButton);

            const updatedDescription = await $('[data-testid="event-description-textarea"]');
            await updatedDescription.waitForDisplayed({ timeout: 5000 });
            await updatedDescription.getValue();

            const closeButton = await $('[data-testid="event-cancel-button"]');
            await closeButton.waitForClickable({ timeout: 5000 });
            await closeButton.click();
        }

        return true;
    }

    async editFirstUpcomingTestEventBeginnerFlow() {
        const target = await this.findFirstEditableEvent();

        if (!target) {
            console.warn("No events with an edit button were found.");
            return false;
        }

        const title = await target.$('.fui-Persona__primaryText');
        if (!(await title.getText()).includes("Test")) {
            console.warn("The first editable event was not the expected Test event, so this step was skipped.");
            return false;
        }

        await browser.execute((el) => el.click(), target.editButton);
        await this.waitForEventEditor();

        await this.replaceInputValue(this.eventEditor, "Test");
        await this.selectDateMonthAndDay("May", "2");

        if (await this.eventDueCheckbox.isExisting()) {
            await this.eventDueCheckbox.click();
        }

        await this.replaceInputValue(this.eventDescriptionTextarea, "Quagmire was here");
        await this.addNoteAndSave("Giggity-Giggity");

        const reopened = await this.openFirstEditableEvent();
        if (!reopened) {
            return true;
        }

        await this.notesButton.waitForClickable({ timeout: 5000 });
        await this.notesButton.click();

        await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
        await this.eventNoteInput.setValue("fjdskfsldd");

        await this.cancelEventButton.waitForClickable({ timeout: 5000 });
        await this.cancelEventButton.click();

        await this.waitForDashboard();
        return true;
    }
}

export default new DashboardPage();
