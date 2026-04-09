import { $, $$ } from "@wdio/globals";
import Page from "./page.js";

class DashboardPage extends Page {
    get editIconPathD() {
        return "M17.18 2.93a2.97 2.97 0 0 0-4.26-.06l-9.37 9.38c-.33.33-.56.74-.66 1.2l-.88 3.94a.5.5 0 0 0 .6.6l3.93-.87c.46-.1.9-.34 1.23-.68l9.36-9.36a2.97 2.97 0 0 0 .05-4.15Zm-3.55.65a1.97 1.97 0 1 1 2.8 2.8l-.68.66-2.8-2.79.68-.67Zm-1.38 1.38 2.8 2.8-7.99 7.97c-.2.2-.46.35-.74.41l-3.16.7.7-3.18c.07-.27.2-.51.4-.7l8-8Z";
    }

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
        await myDropdown.waitForDisplayed({ timeout: 10000 });

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
        await this.logoutButton.waitForDisplayed({ timeout: 10000 });

        try {
            await this.logoutButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), await this.logoutButton);
        }

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
        const eventScopedEditButton = await oneEventCard.$('[data-testid^="case-event-edit"], [data-testid*="case-event-edit"]');

        if (await eventScopedEditButton.isExisting()) {
            return eventScopedEditButton;
        }

        const pathBasedEditButton = await oneEventCard.$(`.//button[.//*[name()="path" and @d="${this.editIconPathD}"]]`);

        if (await pathBasedEditButton.isExisting()) {
            return pathBasedEditButton;
        }

        return oneEventCard.$('button[aria-label="Edit"], [data-testid*="event-edit"]');
    }

    async getVisibleEditButtons() {
        const eventEditButtons = await $$('[data-testid^="case-event-edit"], [data-testid*="case-event-edit"]');
        const pathBasedEditButtons = await $$(`//button[.//*[name()="path" and @d="${this.editIconPathD}"]]`);
        const genericEditButtons = await $$('[data-testid*="event-edit"], button[aria-label="Edit"]');

        const visibleButtons = [];

        for (const oneButton of eventEditButtons) {
            if (await oneButton.isDisplayed().catch(() => false)) {
                visibleButtons.push(oneButton);
            }
        }

        if (visibleButtons.length > 0) {
            return visibleButtons;
        }

        for (const oneButton of pathBasedEditButtons) {
            if (await oneButton.isDisplayed().catch(() => false)) {
                visibleButtons.push(oneButton);
            }
        }

        if (visibleButtons.length > 0) {
            return visibleButtons;
        }

        for (const oneButton of genericEditButtons) {
            if (await oneButton.isDisplayed().catch(() => false)) {
                visibleButtons.push(oneButton);
            }
        }

        return visibleButtons;
    }

    async getVisibleEditButtonAfterHover(oneEventCard) {
        await this.hoverOnEventCard(oneEventCard);

        await browser.waitUntil(async () => {
            const eventScopedButton = await this.getEditButtonFromEventCard(oneEventCard);

            if (await eventScopedButton.isDisplayed().catch(() => false)) {
                return true;
            }

            const visibleButtons = await this.getVisibleEditButtons();
            return visibleButtons.length > 0;
        }, {
            timeout: 3000,
            interval: 200,
            timeoutMsg: "No visible edit button appeared after hover."
        }).catch(() => false);

        const eventScopedButton = await this.getEditButtonFromEventCard(oneEventCard);

        if (await eventScopedButton.isDisplayed().catch(() => false)) {
            return eventScopedButton;
        }

        const visibleButtons = await this.getVisibleEditButtons();
        return visibleButtons[0] || null;
    }

    async findFirstEditableEvent() {
        const allEvents = await this.eventCards;

        for (let i = 0; i < allEvents.length; i++) {
            const oneEvent = allEvents[i];

            if (!oneEvent) {
                continue;
            }

            const editButton = await this.getVisibleEditButtonAfterHover(oneEvent);

            if (editButton) {
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
        const dueCheckbox = await this.eventDueCheckbox;

        if (!await dueCheckbox.isExisting()) {
            console.warn("Due checkbox was not found in this editor.");
            return false;
        }

        try {
            await dueCheckbox.waitForDisplayed({ timeout: 7000 });
        } catch (error) {
            await this.jsScrollIntoView(dueCheckbox);
            await browser.pause(200);
        }

        const alreadyChecked = await dueCheckbox.isSelected().catch(() => false);

        if (!alreadyChecked) {
            try {
                await dueCheckbox.click();
            } catch (error) {
                const dueLabel = await $('//label[contains(normalize-space(.), "Is Due Date")]');

                if (await dueLabel.isExisting()) {
                    await browser.execute((el) => el.click(), dueLabel);
                } else {
                    await browser.execute((el) => el.click(), dueCheckbox);
                }
            }
        }

        return await dueCheckbox.isSelected().catch(() => false);
    }

    async openNotesPanel() {
        const noteInput = await this.eventNoteInput;

        if (await noteInput.isDisplayed().catch(() => false)) {
            return true;
        }

        if (await noteInput.isExisting()) {
            await this.jsScrollIntoView(noteInput);
            await browser.pause(200);

            if (await noteInput.isDisplayed().catch(() => false)) {
                return true;
            }
        }

        let notesButton = await this.notesButton;

        if (!await notesButton.isExisting()) {
            notesButton = await $('//button[contains(normalize-space(.), "Notes")] | //*[contains(@role, "tab") and contains(normalize-space(.), "Notes")]');
        }

        if (await notesButton.isExisting()) {
            await notesButton.waitForDisplayed({ timeout: 5000 });

            try {
                await notesButton.click();
            } catch (error) {
                await browser.execute((el) => el.click(), notesButton);
            }
        }

        await browser.waitUntil(async () => {
            return await this.eventNoteInput.isDisplayed().catch(() => false);
        }, {
            timeout: 7000,
            interval: 200,
            timeoutMsg: "Notes input did not appear."
        });

        return true;
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
        await this.saveEventButton.waitForDisplayed({ timeout: 15000 });
        await this.jsScrollIntoView(this.saveEventButton);

        try {
            await this.saveEventButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), await this.saveEventButton);
        }

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
        await this.openNotesPanel();

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

            await this.hoverOnEventCard(oneEvent);

            const editButton = await this.getVisibleEditButtonAfterHover(oneEvent);

            if (editButton) {
                try {
                    await editButton.waitForClickable({ timeout: 5000 });
                    await editButton.click();
                } catch (error) {
                    await browser.execute((el) => el.click(), editButton);
                }

                await this.waitForEventEditor();
                await this.replaceInputValue(this.eventEditor, "Test");
                await this.replaceInputValue(this.eventDescriptionTextarea, "simple beginner test text");

                if (await this.eventDueCheckbox.isExisting()) {
                    await this.eventDueCheckbox.click();
                }

                await this.notesButton.waitForClickable({ timeout: 5000 });
                await this.notesButton.click();

                await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
                await this.eventNoteInput.clearValue();
                await this.eventNoteInput.setValue("Giggity-Giggity");

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

        await this.openNotesPanel();

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

        await this.openNotesPanel();

        await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
        await this.eventNoteInput.setValue("fjdskfsldd");

        await this.cancelEventButton.waitForClickable({ timeout: 5000 });
        await this.cancelEventButton.click();

        await this.waitForDashboard();
        return true;
    }

    async findFirstEditableTestEvent() {
        const allEvents = await this.eventCards;

        for (let i = 0; i < allEvents.length; i++) {
            const oneEvent = allEvents[i];

            if (!oneEvent) {
                continue;
            }

            const title = await oneEvent.$('.fui-Persona__primaryText');
            const titleText = (await title.getText()).trim();

            if (!titleText.includes("Test")) {
                continue;
            }

            const editButton = await this.getVisibleEditButtonAfterHover(oneEvent);

            if (editButton) {
                return { event: oneEvent, editButton };
            }
        }

        return null;
    }

    async clearFieldWithBackspaceFromEnd(element) {
        await element.waitForDisplayed({ timeout: 5000 });
        await element.click();

        const currentValue = await element.getValue();

        if (!currentValue) {
            return;
        }

        await browser.keys("End");

        for (let i = 0; i < currentValue.length; i++) {
            await browser.keys("Backspace");
        }
    }

    async runRequestedTestMay2QuagmireFlow() {
        let testEventThing = await this.findFirstEditableTestEvent();

        if (!testEventThing) {
            testEventThing = await this.findFirstEditableEvent();
        }

        if (!testEventThing) {
            console.warn("I could not find a Test event with a visible edit button.");
            return false;
        }

        await this.hoverOnEventCard(testEventThing.event);

        try {
            await testEventThing.editButton.waitForClickable({ timeout: 5000 });
            await testEventThing.editButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), testEventThing.editButton);
        }

        await this.waitForEventEditor();

        await this.clearFieldWithBackspaceFromEnd(this.eventEditor);
        await this.eventEditor.setValue("Test");

        await this.selectDateMonthAndDay("May", "2");
        await this.makeSureDueDateIsChecked();

        await this.clearFieldWithBackspaceFromEnd(this.eventDescriptionTextarea);
        await this.eventDescriptionTextarea.setValue("Quagmire was here");

        await this.openNotesPanel();

        await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
        await this.eventNoteInput.setValue("Giggity-Giggity");

        await this.addNoteButton.waitForClickable({ timeout: 5000 });
        await this.addNoteButton.click();

        await this.clickSaveEventAndWaitForDashboard();

        // Save should return us to dashboard before reopening for verification.
        await this.waitForDashboard();

        let reopenedTestEventThing = await this.findFirstEditableTestEvent();

        if (!reopenedTestEventThing) {
            reopenedTestEventThing = await this.findFirstEditableEvent();
        }

        if (!reopenedTestEventThing) {
            console.warn("I saved the Test event, but I could not reopen it.");
            return false;
        }

        await this.hoverOnEventCard(reopenedTestEventThing.event);

        try {
            await reopenedTestEventThing.editButton.waitForClickable({ timeout: 5000 });
            await reopenedTestEventThing.editButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), reopenedTestEventThing.editButton);
        }

        await this.waitForEventEditor();

        await this.openNotesPanel();

        const savedNoteWasVisible = await this.verifyNoteTextVisible("Giggity-Giggity");

        const closeButton = await $('button[aria-label="Close"], [data-testid="event-close-button"], [data-testid*="dialog-close"]');

        if (await closeButton.isExisting()) {
            try {
                await closeButton.waitForClickable({ timeout: 5000 });
                await closeButton.click();
            } catch (error) {
                await browser.execute((el) => el.click(), closeButton);
            }
        } else {
            await this.cancelEventButton.waitForClickable({ timeout: 5000 });
            await this.cancelEventButton.click();
        }

        await this.waitForDashboard();
        return savedNoteWasVisible;
    }

    async findFirstEditableEventByTitle(titleText) {
        const normalize = (value) => (value || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, " ")
            .trim();

        const wantedTitles = Array.isArray(titleText) ? titleText : [titleText];
        const normalizedWantedTitles = wantedTitles.map((oneTitle) => normalize(oneTitle)).filter(Boolean);

        const allEvents = await this.eventCards;

        for (let i = 0; i < allEvents.length; i++) {
            const oneEvent = allEvents[i];

            if (!oneEvent) {
                continue;
            }

            const title = await oneEvent.$('.fui-Persona__primaryText');
            const titleValue = (await title.getText()).trim();
            const fullCardText = await oneEvent.getText().catch(() => "");
            const normalizedTitleValue = normalize(`${titleValue} ${fullCardText}`);

            const matched = normalizedWantedTitles.some((oneWanted) => {
                return normalizedTitleValue.includes(oneWanted) || oneWanted.includes(normalizedTitleValue);
            });

            if (!matched) {
                continue;
            }

            const editButton = await this.getVisibleEditButtonAfterHover(oneEvent);

            if (editButton) {
                return { event: oneEvent, editButton };
            }
        }

        return null;
    }

    async findFirstEditableEventExcludingTitles(excludedTitles) {
        const normalize = (value) => (value || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, " ")
            .trim();

        const excludedTitleList = Array.isArray(excludedTitles) ? excludedTitles : [excludedTitles];
        const normalizedExcludedTitles = excludedTitleList.map((oneTitle) => normalize(oneTitle)).filter(Boolean);

        const allEvents = await this.eventCards;

        for (let i = 0; i < allEvents.length; i++) {
            const oneEvent = allEvents[i];

            if (!oneEvent) {
                continue;
            }

            const title = await oneEvent.$('.fui-Persona__primaryText');
            const titleValue = (await title.getText()).trim();
            const fullCardText = await oneEvent.getText().catch(() => "");
            const normalizedTitleValue = normalize(`${titleValue} ${fullCardText}`);

            const isExcluded = normalizedExcludedTitles.some((oneExcluded) => {
                return normalizedTitleValue.includes(oneExcluded) || oneExcluded.includes(normalizedTitleValue);
            });

            if (isExcluded) {
                continue;
            }

            const editButton = await this.getVisibleEditButtonAfterHover(oneEvent);

            if (editButton) {
                return { event: oneEvent, editButton, titleValue };
            }
        }

        return null;
    }

    async runRequestedCaseTitleFlow(titleToFind, updatedEventText, updatedDescriptionText, noteText) {
        let selectedCase = await this.findFirstEditableEventByTitle(titleToFind);

        const caseTitleLabel = Array.isArray(titleToFind) ? titleToFind.join(" / ") : titleToFind;

        if (!selectedCase) {
            console.warn(`I could not find an editable case titled ${caseTitleLabel}.`);
            return false;
        }

        await this.hoverOnEventCard(selectedCase.event);
        await browser.pause(600);

        try {
            await selectedCase.editButton.waitForClickable({ timeout: 5000 });
            await selectedCase.editButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), selectedCase.editButton);
        }

        await this.waitForEventEditor();

        await this.clearFieldWithBackspaceFromEnd(this.eventEditor);
        await this.eventEditor.setValue(updatedEventText);

        await this.selectDateMonthAndDay("May", "2");
        await this.makeSureDueDateIsChecked();

        await this.clearFieldWithBackspaceFromEnd(this.eventDescriptionTextarea);
        await this.eventDescriptionTextarea.setValue(updatedDescriptionText);

        await this.openNotesPanel();

        await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
        await this.eventNoteInput.clearValue();
        await this.eventNoteInput.setValue(noteText);

        await this.addNoteButton.waitForClickable({ timeout: 5000 });
        await this.addNoteButton.click();

        await this.clickSaveEventAndWaitForDashboard();
        await this.waitForDashboard();

        let reopenedCase = await this.findFirstEditableEventByTitle(titleToFind);

        if (!reopenedCase) {
            reopenedCase = await this.findFirstEditableEventByTitle(updatedEventText);
        }

        if (!reopenedCase) {
            console.warn(`I saved ${caseTitleLabel}, but could not reopen it for note verification.`);
            return false;
        }

        await this.hoverOnEventCard(reopenedCase.event);

        try {
            await reopenedCase.editButton.waitForClickable({ timeout: 5000 });
            await reopenedCase.editButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), reopenedCase.editButton);
        }

        await this.waitForEventEditor();
        await this.openNotesPanel();

        const savedNoteWasVisible = await this.verifyNoteTextVisible(noteText);

        const closeButton = await $('button[aria-label="Close"], [data-testid="event-close-button"], [data-testid*="dialog-close"]');

        if (await closeButton.isExisting()) {
            try {
                await closeButton.waitForClickable({ timeout: 5000 });
                await closeButton.click();
            } catch (error) {
                await browser.execute((el) => el.click(), closeButton);
            }
        } else {
            await this.cancelEventButton.waitForClickable({ timeout: 5000 });
            await this.cancelEventButton.click();
        }

        await this.waitForDashboard();
        return savedNoteWasVisible;
    }

    async runRequestedOtherUpcomingCaseFlow(excludedTitles, updatedEventText, updatedDescriptionText, noteText) {
        const selectedCase = await this.findFirstEditableEventExcludingTitles(excludedTitles);

        if (!selectedCase) {
            console.warn("I could not find any other editable upcoming case outside the named case list.");
            return false;
        }

        const caseTitleLabel = selectedCase.titleValue || "other upcoming case";

        await this.hoverOnEventCard(selectedCase.event);
        await browser.pause(600);

        try {
            await selectedCase.editButton.waitForClickable({ timeout: 5000 });
            await selectedCase.editButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), selectedCase.editButton);
        }

        await this.waitForEventEditor();

        await this.clearFieldWithBackspaceFromEnd(this.eventEditor);
        await this.eventEditor.setValue(updatedEventText);

        await this.selectDateMonthAndDay("May", "2");
        await this.makeSureDueDateIsChecked();

        await this.clearFieldWithBackspaceFromEnd(this.eventDescriptionTextarea);
        await this.eventDescriptionTextarea.setValue(updatedDescriptionText);

        await this.openNotesPanel();

        await this.eventNoteInput.waitForDisplayed({ timeout: 5000 });
        await this.eventNoteInput.clearValue();
        await this.eventNoteInput.setValue(noteText);

        await this.addNoteButton.waitForClickable({ timeout: 5000 });
        await this.addNoteButton.click();

        await this.clickSaveEventAndWaitForDashboard();
        await this.waitForDashboard();

        let reopenedCase = await this.findFirstEditableEventByTitle(updatedEventText);

        if (!reopenedCase) {
            reopenedCase = await this.findFirstEditableEventByTitle(caseTitleLabel);
        }

        if (!reopenedCase) {
            console.warn(`I saved ${caseTitleLabel}, but could not reopen it for note verification.`);
            return false;
        }

        await this.hoverOnEventCard(reopenedCase.event);

        try {
            await reopenedCase.editButton.waitForClickable({ timeout: 5000 });
            await reopenedCase.editButton.click();
        } catch (error) {
            await browser.execute((el) => el.click(), reopenedCase.editButton);
        }

        await this.waitForEventEditor();
        await this.openNotesPanel();

        const savedNoteWasVisible = await this.verifyNoteTextVisible(noteText);

        const closeButton = await $('button[aria-label="Close"], [data-testid="event-close-button"], [data-testid*="dialog-close"]');

        if (await closeButton.isExisting()) {
            try {
                await closeButton.waitForClickable({ timeout: 5000 });
                await closeButton.click();
            } catch (error) {
                await browser.execute((el) => el.click(), closeButton);
            }
        } else {
            await this.cancelEventButton.waitForClickable({ timeout: 5000 });
            await this.cancelEventButton.click();
        }

        await this.waitForDashboard();
        return savedNoteWasVisible;
    }
}

export default new DashboardPage();
