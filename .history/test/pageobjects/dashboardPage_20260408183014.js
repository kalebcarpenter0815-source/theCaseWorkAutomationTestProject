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
            const dateNode = await event.$('[data-testid*="date"], time, .fui-Text');
            if (await dateNode.isExisting()) {
                dates.push(await dateNode.getText());
            }
        }

        return dates;
    }

    async waitForTaskUpdate() {
        await browser.pause(1000);
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
        await eventInput.setValue("test");

        const description = await $('[data-testid="event-description-textarea"]');
        await description.waitForDisplayed({ timeout: 5000 });
        await description.setValue("friendly beginner test note");

        const saveButton = await $('[data-testid="event-save-button"]');
        await saveButton.waitForClickable({ timeout: 15000 });
        await saveButton.click();

        await this.waitForDashboard();
        return true;
    }
}

export default new DashboardPage();
