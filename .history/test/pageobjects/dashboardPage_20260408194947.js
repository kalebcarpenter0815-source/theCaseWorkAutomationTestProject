import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardPage extends Page {
    async jsScrollIntoView(element) {
        const resolvedElement = await element;
        await browser.execute((el) => {
            el.scrollIntoView({ block: "center", inline: "center" });
        }, resolvedElement);
    }

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

    get noteTextItems() {
        return $$('[data-testid="case-note-item"], [data-testid*="note-text"], [data-testid*="case-note"]');
    }

    async waitForDashboard() {
        await this.logoutButton.waitForDisplayed({ timeout: 10000 });
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
    }

    async getFilterText() {
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
        return await this.filterDropdown.getAttribute("value");
    }

    async openFilter() {
        await this.filterDropdown.waitForDisplayed({ timeout: 10000 });
        await this.jsScrollIntoView(this.filterDropdown);
        await browser.pause(300);

        try {
            await browser.keys("Escape");
            await browser.pause(250);
        } catch (error) {
            console.log("Nothing was open, so escape did nothing.");
        }

        const myDropdown = await this.filterDropdown;
        await myDropdown.waitForExist({ timeout: 10000 });
        await myDropdown.waitForClickable({ timeout: 10000 });

        try {
            await myDropdown.click();
        } catch (error) {
            console.log("Regular click did not work, so I am trying the browser click way.");
            await browser.execute((el) => {
                el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
                el.click();
            }, myDropdown);
        }

        await browser.waitUntil(async () => {
            return (await this.filterDropdown.getAttribute("aria-expanded")) === "true";
        }, {
            timeout: 5000,
            timeoutMsg: "The filter dropdown never opened."
        });
    }

    async selectOptionByText(text) {
        await this.openFilter();

        const option = await $(`//div[@role="option" and contains(normalize-space(.), "${text}")]`);
        await option.waitForDisplayed({ timeout: 5000 });
        await this.jsScrollIntoView(option);

        try {
            await option.click();
        } catch (error) {
            console.log("Regular option click did not work, so I am trying the browser click way.");
            await browser.execute((el) => {
                el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
                el.click();
            }, option);
        }

        await browser.waitUntil(async () => {
            const currentValue = await this.getFilterText();
            return currentValue && currentValue.includes(text);
        }, {
            timeout: 7000,
            timeoutMsg: `The filter never changed to ${text}.`
        });
    }

    async clickEveryMainFilter() {
        const simpleFilterList = [
            "Within 7 days",
            "Within 14 days",
            "Within 30 days",
            "Within 3 months"
        ];

        for (const oneFilterName of simpleFilterList) {
            await this.selectOptionByText(oneFilterName);
            await this.waitForTaskUpdate();
        }
    }

    async cycleThroughFilters() {
        await this.clickEveryMainFilter();
    }

    async logout() {
        await this.logoutButton.waitForClickable({ timeout: 10000 });
        await this.logoutButton.click();
        await this.loginUsernameField.waitForDisplayed({ timeout: 10000 });
    }

    async getAllEventNames() {
        const allTitleElements = await this.eventTitles;
        const allNames = [];

        for (const oneTitleElement of allTitleElements) {
            const text = await oneTitleElement.getText();
            allNames.push(text);
        }

        return allNames;
    }

    // =============================
// GET ALL EVENT DATES (STRING)
// =============================
async getAllEventDates() {
    const eventCards = await this.eventCards;

    let dates = [];

    for (let i = 0; i < eventCards.length; i++) {
        const textParts = await eventCards[i].$$('.fui-Text');

        let month = '';
        let day = '';

        for (let j = 0; j < textParts.length; j++) {
            let text = await textParts[j].getText();
            text = text.trim();

            // check for month
            if (
                text == 'Jan' || text == 'Feb' || text == 'Mar' ||
                text == 'Apr' || text == 'May' || text == 'Jun' ||
                text == 'Jul' || text == 'Aug' || text == 'Sep' ||
                text == 'Oct' || text == 'Nov' || text == 'Dec'
            ) {
                month = text;
            }

            // check for day (number)
            if (!isNaN(text)) {
                day = text;
            }
        }

        // combine month + day
        if (month !== '' && day !== '') {
            dates.push(month + ' ' + day);
        }
    }

    return dates;
}

// =============================
// CONVERT TO DATE OBJECTS
// =============================
async getAllEventDatesAsObjects() {
    const dateStrings = await this.getAllEventDates();

    let dateObjects = [];

    const currentYear = new Date().getFullYear();

    for (let i = 0; i < dateStrings.length; i++) {
        let fullDate = dateStrings[i] + ' ' + currentYear;

        let dateObj = new Date(fullDate);

        dateObjects.push(dateObj);
    }

    return dateObjects;
}

// =============================
// CHECK IF WITHIN X DAYS
// =============================
async areEventsWithinDays(maxDays) {
    const dates = await this.getAllEventDatesAsObjects();

    let today = new Date();

    for (let i = 0; i < dates.length; i++) {
        let eventDate = dates[i];

        let diffTime = eventDate - today;
        let diffDays = diffTime / (1000 * 60 * 60 * 24);

        // ❗ if ANY event is outside range → fail
        if (diffDays > maxDays) {
            return false;
        }
    }

    return true;
}

    async waitForTaskUpdate() {
        await browser.pause(1000);
    }

    async waitForEventEditor() {
        await this.eventEditor.waitForDisplayed({ timeout: 10000 });
    }

    async hoverOnEventCard(oneEventCard) {
        await this.jsScrollIntoView(oneEventCard);
        await oneEventCard.moveTo();
        await browser.pause(200);
    }

    async getEditButtonFromEventCard(oneEventCard) {
        return oneEventCard.$('button[aria-label="Edit"], [data-testid^="case-event-edit"], [data-testid*="event-edit"]');
    }

    async findFirstEditableEvent() {
        const allEvents = await this.eventCards;

        for (let i = 0; i < allEvents.length; i++) {
            const oneEvent = allEvents[i];

            if (!oneEvent) {
                continue;
            }

            await this.hoverOnEventCard(oneEvent);
            const editButton = await this.getEditButtonFromEventCard(oneEvent);

            if (await editButton.isExisting() && await editButton.isDisplayed().catch(() => false)) {
                return { event: oneEvent, editButton };
            }
        }

        return null;
    }

    async openFirstEditableEvent() {
        const thingToEdit = await this.findFirstEditableEvent();

        if (!thingToEdit) {
            console.warn("I could not find an event with an edit button.");
            return null;
        }

        await this.hoverOnEventCard(thingToEdit.event);

        try {
            await thingToEdit.editButton.waitForClickable({ timeout: 5000 });
            await thingToEdit.editButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), thingToEdit.editButton);
        }

        await this.waitForEventEditor();

        return thingToEdit;
    }

    async replaceInputValue(element, value) {
        await element.waitForDisplayed({ timeout: 5000 });
        await element.click();
        await element.clearValue();
        await element.setValue(value);
    }

    async selectFirstSelectableDateFromPicker() {
        await this.eventDatePicker.waitForClickable({ timeout: 5000 });
        await this.eventDatePicker.click();

        const firstDateButton = await $('//button[@role="gridcell" and not(@disabled) and @aria-disabled!="true"]');
        await firstDateButton.waitForClickable({ timeout: 5000 });
        await firstDateButton.click();
    }

    async makeSureDueDateIsChecked() {
        await this.eventDueCheckbox.waitForDisplayed({ timeout: 5000 });
        const alreadyChecked = await this.eventDueCheckbox.isSelected();

        if (!alreadyChecked) {
            await this.eventDueCheckbox.click();
        }
    }

    async openNotesPanel() {
        await this.notesButton.waitForClickable({ timeout: 5000 });
        await this.notesButton.click();
        await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
    }

    async addNoteText(noteText) {
        await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
        await this.eventNoteInput.clearValue();
        await this.eventNoteInput.setValue(noteText);

        await this.addNoteButton.waitForClickable({ timeout: 5000 });
        await this.addNoteButton.click();
    }

    async typeDescriptionAndThenAddGibberish(baseText) {
        await this.replaceInputValue(this.eventDescriptionTextarea, baseText);
        const gibberish = ` ${Date.now()}asdf`;
        await this.eventDescriptionTextarea.addValue(gibberish);
    }

    async clickSaveEventAndWaitForDashboard() {
        await this.saveEventButton.waitForClickable({ timeout: 15000 });
        await this.saveEventButton.click();
        await this.waitForDashboard();
    }

    async closeEventAndWaitForDashboard() {
        await this.cancelEventButton.waitForClickable({ timeout: 10000 });
        await this.cancelEventButton.click();
        await this.waitForDashboard();
    }

    async getCurrentEventTitleValue() {
        await this.eventEditor.waitForDisplayed({ timeout: 5000 });
        return this.eventEditor.getValue();
    }

    async getCurrentEventDescriptionValue() {
        await this.eventDescriptionTextarea.waitForDisplayed({ timeout: 5000 });
        return this.eventDescriptionTextarea.getValue();
    }

    async getCurrentEventDateValue() {
        await this.eventDatePicker.waitForDisplayed({ timeout: 5000 });
        return this.eventDatePicker.getValue();
    }

    async verifyNoteTextVisible(noteText) {
        const noteTextForXpath = noteText.replace(/'/g, "\\'");
        const exactNoteByText = await $(`//*[contains(normalize-space(.), '${noteTextForXpath}')]`);
        await exactNoteByText.waitForDisplayed({ timeout: 10000 });
        return await exactNoteByText.isDisplayed();
    }

    async runBeginnerHoverEditSaveAndVerifyFlow() {
        const opened = await this.openFirstEditableEvent();

        if (!opened) {
            console.warn("I could not find an editable event, so I skipped this flow.");
            return false;
        }

        await this.replaceInputValue(this.eventEditor, "Test");
        await this.selectFirstSelectableDateFromPicker();
        await this.makeSureDueDateIsChecked();
        await this.typeDescriptionAndThenAddGibberish("sfshfjksdhk");

        await this.openNotesPanel();
        await this.addNoteText('"Giggity"- From Quagmire');

        await this.clickSaveEventAndWaitForDashboard();

        const reopened = await this.openFirstEditableEvent();

        if (!reopened) {
            console.warn("I saved the event, but I could not reopen one to verify.");
            return false;
        }

        const eventTitleValue = await this.getCurrentEventTitleValue();
        const eventDateValue = await this.getCurrentEventDateValue();
        const descriptionValue = await this.getCurrentEventDescriptionValue();
        const dueIsChecked = await this.eventDueCheckbox.isSelected();

        await this.openNotesPanel();
        const noteWasVisible = await this.verifyNoteTextVisible('"Giggity"- From Quagmire');

        await this.closeEventAndWaitForDashboard();

        return {
            eventTitleValue,
            eventDateValue,
            descriptionValue,
            dueIsChecked,
            noteWasVisible
        };
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

    async countUpcomingEvents() {
        const allEvents = await this.eventCards;
        return allEvents.length;
    }

    async editAllUpcomingEventsTheSimpleWay() {
        const allEvents = await this.eventCards;

        if (!allEvents.length) {
            console.warn("There were no upcoming events to edit.");
            return 0;
        }

        let numberThatGotEdited = 0;

        for (let i = 0; i < allEvents.length; i++) {
            const refreshedEvents = await this.eventCards;
            const oneEvent = refreshedEvents[i];

            if (!oneEvent) {
                continue;
            }

            await oneEvent.scrollIntoView({ block: "center", inline: "center" });

            const editButton = await oneEvent.$('button[aria-label="Edit"], [data-testid^="case-event-edit"], [data-testid*="event-edit"]');

            if (await editButton.isExisting()) {
                await browser.execute((el) => el.click(), editButton);

                await this.waitForEventEditor();
                await this.replaceInputValue(this.eventEditor, "Test");
                await this.replaceInputValue(this.eventDescriptionTextarea, "simple beginner test text");

                if (await this.eventDueCheckbox.isExisting()) {
                    await this.eventDueCheckbox.click();
                }

                await this.notesButton.waitForClickable({ timeout: 5000 });
                await this.notesButton.click();

                await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
                await this.eventNoteInput.setValue("simple note");

                await this.addNoteButton.waitForClickable({ timeout: 5000 });
                await this.addNoteButton.click();

                await this.saveEventButton.waitForClickable({ timeout: 15000 });
                await this.saveEventButton.click();

                await this.waitForDashboard();
                numberThatGotEdited += 1;
            }
        }

        return numberThatGotEdited;
    }

    async editAllUpcomingEvents() {
        return this.editAllUpcomingEventsTheSimpleWay();
    }

    async editFirstEventFullFlow() {
        const firstEditableThing = await this.findFirstEditableEvent();

        if (!firstEditableThing) {
            console.warn("I could not find a first event to edit.");
            return false;
        }

        await browser.execute((el) => el.click(), firstEditableThing.editButton);
        await this.waitForEventEditor();

        await this.replaceInputValue(this.eventEditor, "Test");
        await this.replaceInputValue(this.eventDescriptionTextarea, "friendly beginner test note");

        if (await this.eventDueCheckbox.isExisting()) {
            await this.eventDueCheckbox.click();
        }

        await this.notesButton.waitForClickable({ timeout: 5000 });
        await this.notesButton.click();

        await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
        await this.eventNoteInput.setValue("random note text");

        await this.addNoteButton.waitForClickable({ timeout: 5000 });
        await this.addNoteButton.click();

        await this.saveEventButton.waitForClickable({ timeout: 15000 });
        await this.saveEventButton.click();

        await this.waitForDashboard();
        return true;
    }

    async editFirstUpcomingTestEventBeginnerFlow() {
        const firstEditableThing = await this.findFirstEditableEvent();

        if (!firstEditableThing) {
            console.warn("I could not find an event with an edit button.");
            return false;
        }

        const title = await firstEditableThing.event.$('.fui-Persona__primaryText');
        const titleText = await title.getText();

        if (!titleText.includes("Test")) {
            console.warn("The first editable event was not a Test event, so I skipped this step.");
            return false;
        }

        await browser.execute((el) => el.click(), firstEditableThing.editButton);
        await this.waitForEventEditor();

        await this.replaceInputValue(this.eventEditor, "Test");
        await this.selectDateMonthAndDay("May", "2");

        if (await this.eventDueCheckbox.isExisting()) {
            await this.eventDueCheckbox.click();
        }

        await this.replaceInputValue(this.eventDescriptionTextarea, "Quagmire was here");
        await this.addNoteAndSave("Giggity-Giggity");

        const reopenedThing = await this.openFirstEditableEvent();

        if (!reopenedThing) {
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
