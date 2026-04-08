class Helper {
    // =========================
    // BASIC ACTIONS
    // =========================

    async waitForElement(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
        return element;
    }

    async waitAndClick(element, timeout = 10000) {
        await element.waitForClickable({ timeout });
        await element.click();
    }

    async waitAndType(element, text, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
        await element.setValue(text);
    }

    async clearAndType(element, text, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
        await element.clearValue();
        await element.setValue(text);
    }

    async getText(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
        return element.getText();
    }

    async isDisplayed(element) {
        return element.isDisplayed();
    }

    // =========================
    // ADVANCED ACTIONS
    // =========================

    async clickAndHold(element, duration = 2000) {
        await element.waitForDisplayed({ timeout: 10000 });

        await element.moveTo();

        await browser.performActions([
            {
                type: 'pointer',
                id: 'mouse',
                parameters: { pointerType: 'mouse' },
                actions: [
                    { type: 'pointerMove', origin: 'pointer', x: 0, y: 0 },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);

        await browser.releaseActions();
    }

    // =========================
    // PAGE VALIDATION
    // =========================

    async verifyUrlContains(text) {
        await expect(browser).toHaveUrlContaining(text);
    }

    async verifyElementText(element, expectedText) {
        await expect(element).toHaveText(expectedText);
    }

    async verifyElementDisplayed(element) {
        await expect(element).toBeDisplayed();
    }

    // =========================
    // LIST / COLLECTION HELPERS
    // =========================

    async getElements(selector) {
        return $$(selector);
    }

    async getElementsCount(selector) {
        const elements = await $$(selector);
        return elements.length;
    }

    async clickElementByText(text) {
        const element = await $(`//*[text()="${text}"]`);
        await this.waitAndClick(element);
    }

    async getAllTexts(elements) {
        const texts = [];

        for (const element of elements) {
            texts.push(await element.getText());
        }

        return texts;
    }

    // =========================
    // DASHBOARD / FILTER HELPERS
    // =========================

    async applyFilter(filterBtn) {
        await this.waitAndClick(filterBtn);
    }

    async resetFilter(resetBtn) {
        await this.waitAndClick(resetBtn);
    }

    async verifyListNotEmpty(elements) {
        if (elements.length === 0) {
            throw new Error('Expected list to have items, but it is empty');
        }
    }

    async verifyNoResults(elements) {
        if (elements.length > 0) {
            throw new Error('Expected no results, but items were found');
        }
    }

    // =========================
    // NAVIGATION HELPERS
    // =========================

    async openPage(url) {
        await browser.url(url);
    }

    async refreshPage() {
        await browser.refresh();
    }

    // =========================
    // SAFE ACTIONS (ANTI-FLAKY)
    // =========================

    async safeClick(element) {
        try {
            await element.waitForClickable({ timeout: 5000 });
            await element.click();
        } catch (error) {
            console.warn('Retrying click after initial failure');
            await element.click();
        }
    }

    async safeSetValue(element, text) {
        try {
            await element.waitForDisplayed({ timeout: 5000 });
            await element.setValue(text);
        } catch (error) {
            console.warn('Retrying setValue after initial failure');
            await element.setValue(text);
        }
    }

    // =========================
    // DEBUGGING HELPERS
    // =========================

    async pause(ms = 2000) {
        await browser.pause(ms);
    }

    log(message) {
        console.log(`[Helper] ${message}`);
    }
}

export default new Helper();
