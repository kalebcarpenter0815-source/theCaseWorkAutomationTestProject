import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardEngagementTemplates from "../pageobjects/dashboardEngagementTemplates.js";
import loginHelper from "../utils/loginHelper.js";

async function openEngagementTemplatesPage() {
    await browser.url("https://app.thecasework.com/templates");
    await dashboardEngagementTemplates.clickEngagementTemplatesButton().catch(() => {});
    await dashboardEngagementTemplates.dashboardEngagementTemplatesHeader.waitForDisplayed({ timeout: 20000 });
}

async function ensureAtLeastOneTemplateRow() {
    const initialRows = await $$("//button[@aria-label='More items' or @data-testid='custom-data-table-row-context-menu-button']");
    if (initialRows.length > 0) {
        return;
    }

    const seedName = `Auto ET Seed ${Date.now()}`;
    await dashboardEngagementTemplates.clickEngagementTemplatesNewTemplateButton();
    await dashboardEngagementTemplates.verifyEngagementTemplatesNewTemplateModal();
    await dashboardEngagementTemplates.enterEngagementTemplatesNewTemplateName(seedName);
    await dashboardEngagementTemplates.enterEngagementTemplatesAddSlashEditEngagementTemplateTemplateDescription("Seed description");
    await dashboardEngagementTemplates.enterEngagementTemplatesAddSlashEditEngagementTemplateDocumentTitle("Seed title");
    await dashboardEngagementTemplates.clickAddSlashEditEngagementTemplateSaveButton();

    await dashboardEngagementTemplates.clickAddSlashEditEngagementTemplateBackToEnagementTemplatesButton().catch(async () => {
        await dashboardEngagementTemplates.clickBackToEngagmentTemplatesButton().catch(() => {});
        await openEngagementTemplatesPage();
    });

    await browser.waitUntil(async () => {
        const rows = await $$("//button[@aria-label='More items' or @data-testid='custom-data-table-row-context-menu-button']");
        return rows.length > 0;
    }, {
        timeout: 20000,
        timeoutMsg: "No engagement template row menu buttons found after creating seed template",
    });
}

async function openFirstRowMenu() {
    const rows = await $$("//button[@aria-label='More items' or @data-testid='custom-data-table-row-context-menu-button']");
    if (rows.length === 0) {
        throw new Error("No row menu buttons available");
    }

    let opened = false;

    for (const rowButton of rows) {
        try {
            if (!await rowButton.isDisplayed().catch(() => false)) {
                continue;
            }

            await rowButton.click().catch(async () => {
                await browser.execute((el) => el.click(), rowButton);
            });

            await browser.waitUntil(async () => {
                const menuItems = await $$("//*[contains(@data-testid,'context-menu-item') or contains(@data-testid,'custom-data-table-context-menu-item-') or @role='menuitem']");
                for (const item of menuItems) {
                    if (await item.isDisplayed().catch(() => false)) {
                        return true;
                    }
                }
                return false;
            }, {
                timeout: 5000,
            });

            opened = true;
            break;
        } catch {
            // Try the next visible row-menu button.
        }
    }

    if (!opened) {
        throw new Error("Context menu did not open from any row button");
    }
}

async function clickFirstVisibleSelector(selectors) {
    for (const selector of selectors) {
        const candidates = await $$(selector);
        for (const candidate of candidates) {
            if (!await candidate.isDisplayed().catch(() => false)) {
                continue;
            }

            await candidate.click().catch(async () => {
                await browser.execute((el) => el.click(), candidate);
            });

            return true;
        }
    }

    return false;
}

async function clickCopyAction() {
    const clicked = await clickFirstVisibleSelector([
        "//*[@data-testid='custom-data-table-context-menu-item-Copy' or @data-testid='custom-data-table-context-menu-item-Duplicate']",
        "//*[@role='menuitem' and (contains(normalize-space(.), 'Copy') or contains(normalize-space(.), 'Duplicate'))]",
        "//button[normalize-space(.)='Copy' or normalize-space(.)='Duplicate']",
        "//div[normalize-space(.)='Copy' or normalize-space(.)='Duplicate']",
    ]);

    if (clicked) {
        return;
    }

    // If copy dialog is already open, action was effectively triggered.
    if (await isConfirmCopyDialogOpen()) {
        return;
    }

    throw new Error("Could not find context action: Copy or Duplicate");
}

async function clickDeleteAction() {
    const clicked = await clickFirstVisibleSelector([
        "//*[@data-testid='custom-data-table-context-menu-item-Delete']",
        "//*[@role='menuitem' and contains(normalize-space(.), 'Delete')]",
        "//button[normalize-space(.)='Delete']",
        "//div[normalize-space(.)='Delete']",
    ]);

    if (clicked) {
        return;
    }

    // If delete dialog is already open, action was effectively triggered.
    if (await isConfirmDeleteDialogOpen()) {
        return;
    }

    throw new Error("Could not find context action: Delete");
}

async function isConfirmCopyDialogOpen() {
    const dialog = await $("//div[contains(normalize-space(.), 'Confirm Copy')]");
    return dialog.isDisplayed().catch(() => false);
}

async function clickConfirmCopyDialogButton(label) {
    const button = await $(`//button[normalize-space(.)='${label}']`);
    await button.waitForDisplayed({ timeout: 10000 });
    await button.waitForClickable({ timeout: 10000 });
    await button.click();
}

async function closeConfirmCopyDialogIfOpen() {
    if (await isConfirmCopyDialogOpen()) {
        await clickConfirmCopyDialogButton("No").catch(async () => {
            await browser.keys("Escape");
        });

        await browser.waitUntil(async () => {
            return !(await isConfirmCopyDialogOpen());
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm Copy dialog stayed open",
        });
    }
}

async function isConfirmDeleteDialogOpen() {
    const dialog = await $("//div[contains(normalize-space(.), 'Confirm Delete')]");
    return dialog.isDisplayed().catch(() => false);
}

async function clickConfirmDeleteDialogButton(label) {
    const button = await $(`//button[normalize-space(.)='${label}']`);
    await button.waitForDisplayed({ timeout: 10000 });
    await button.waitForClickable({ timeout: 10000 });
    await button.click();
}

async function closeConfirmDeleteDialogIfOpen() {
    if (await isConfirmDeleteDialogOpen()) {
        await clickConfirmDeleteDialogButton("No").catch(async () => {
            await browser.keys("Escape");
        });

        await browser.waitUntil(async () => {
            return !(await isConfirmDeleteDialogOpen());
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm Delete dialog stayed open",
        });
    }
}

describe("Dashboard Engagement Templates Copy Delete Flow", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await openEngagementTemplatesPage();
        await ensureAtLeastOneTemplateRow();
        await closeConfirmCopyDialogIfOpen();
        await closeConfirmDeleteDialogIfOpen();
    });

    beforeEach(async () => {
        await closeConfirmCopyDialogIfOpen();
        await closeConfirmDeleteDialogIfOpen();
    });

    it("opens row menu and performs copy confirmation path", async () => {
        await dashboardEngagementTemplates.clickEngagementTemplatesCustomCopyThreeDotButton().catch(async () => {
            await openFirstRowMenu();
        });

        await dashboardEngagementTemplates.clickEngagementTemplatesCustomCopyDuplicateOption().catch(async () => {
            await clickCopyAction();
        });

        await browser.waitUntil(async () => {
            return await isConfirmCopyDialogOpen();
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm Copy dialog did not open after selecting copy action",
        });

        await dashboardEngagementTemplates.clickEngagementTemplateCustomCopyConfirmCopyPopUpCardNoButton().catch(async () => {
            await clickConfirmCopyDialogButton("No");
        });

        await browser.waitUntil(async () => {
            return !(await isConfirmCopyDialogOpen());
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm Copy dialog did not close after clicking No",
        });

        await dashboardEngagementTemplates.clickEngagementTemplatesCustomCopyThreeDotButton().catch(async () => {
            await openFirstRowMenu();
        });

        await dashboardEngagementTemplates.clickEngagementTemplatesCustomCopyDuplicateOption().catch(async () => {
            await clickCopyAction();
        });

        await browser.waitUntil(async () => {
            return await isConfirmCopyDialogOpen();
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm Copy dialog did not open for Yes flow",
        });

        await dashboardEngagementTemplates.clickEngagementTemplateCustomCopyConfirmCopyPopUpCardYesButton().catch(async () => {
            await clickConfirmCopyDialogButton("Yes");
        });

        await browser.waitUntil(async () => {
            return !(await isConfirmCopyDialogOpen());
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm Copy dialog did not close after clicking Yes",
        });

        const dismissButton = await $("//button[text()='Dismiss']");
        if (await dismissButton.isExisting()) {
            await dismissButton.click();
        }
    });

    it("opens row menu and handles delete confirmation flow", async () => {
        await closeConfirmCopyDialogIfOpen();
        await closeConfirmDeleteDialogIfOpen();

        await dashboardEngagementTemplates.clickEngagementTemplatesCustomCopyThreeDotButton().catch(async () => {
            await openFirstRowMenu();
        });

        await dashboardEngagementTemplates.clickEngagementTemplatecustomDashCopyDeleteButton().catch(async () => {
            await clickDeleteAction();
        });

        await browser.waitUntil(async () => {
            return await isConfirmDeleteDialogOpen();
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm Delete dialog did not open",
        });

        // First decline delete so test remains safe and repeatable.
        await clickConfirmDeleteDialogButton("No");

        await browser.waitUntil(async () => {
            return !(await isConfirmDeleteDialogOpen());
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm Delete dialog did not close after No",
        });

        await dashboardEngagementTemplates.clickEngagementTemplatesCustomCopyThreeDotButton().catch(async () => {
            await openFirstRowMenu();
        });

        await dashboardEngagementTemplates.clickEngagementTemplatecustomDashCopyDeleteButton().catch(async () => {
            await clickDeleteAction();
        });

        await browser.waitUntil(async () => {
            return await isConfirmDeleteDialogOpen();
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm Delete dialog did not open on second attempt",
        });

        await clickConfirmDeleteDialogButton("Yes");

        await browser.waitUntil(async () => {
            return !(await isConfirmDeleteDialogOpen());
        }, {
            timeout: 10000,
            timeoutMsg: "Confirm Delete dialog did not close after Yes",
        });
    });
});
