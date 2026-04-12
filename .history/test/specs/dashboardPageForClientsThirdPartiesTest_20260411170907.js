// import { expect } from "@wdio/globals";
// import dashboardPage from "../pageobjects/dashboardPage.js";
// import dashboardClientsThirdPartiesPage from "../pageobjects/dashboardClientsThirdParties.js";
// import loginHelper from "../utils/loginHelper.js";
//
// const SEARCH_NAMES = [
//     "Quagmire Giggity",
//     "EVERYONE LLC",
//     "NO ONE Corps",
//     "AUTOTEST Client",
//     "cameron"
// ];
//
// const CLIENT_ORDER = [
//     "Somebody Else",
//     "Quagmire Giggity",
//     "EVERYONE LLC",
//     "NO ONE Corps",
//     "AUTOTEST Client",
//     "AUTOTEST Client",
//     "cameron"
// ];
//
// const UTAH_CITIES = [
//     "Salt Lake City",
//     "Provo",
//     "Ogden",
//     "St George",
//     "Lehi",
//     "Sandy",
//     "Draper"
// ];
//
// const US_STATES = ["UT", "AZ", "CO", "ID", "NV", "CA", "TX"];
//
// function hashText(text) {
//     let hash = 0;
//     for (let i = 0; i < text.length; i += 1) {
//         hash = (hash * 31 + text.charCodeAt(i)) % 1000000;
//     }
//     return hash;
// }
//
// function buildPartyData(clientName, index) {
//     const safeName = clientName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
//     const seed = hashText(`${clientName}-${index}`);
//     const city = UTAH_CITIES[seed % UTAH_CITIES.length];
//     const state = US_STATES[seed % US_STATES.length];
//     const zip = String(10000 + (seed % 89999));
//
//     return {
//         partyName: clientName,
//         url: `https://${safeName}-${index}.example.com`,
//         address1: `${100 + index} ${city} Test Ave`,
//         address2: `${index + 1}B`,
//         city,
//         state,
//         zip,
//         phones: [
//             { number: `8015551${String(100 + index).slice(-3)}`, type: "Cell", makePrimary: seed % 3 === 0 },
//             { number: `3855552${String(100 + index).slice(-3)}`, type: "Office", makePrimary: seed % 3 === 1 },
//             { number: `4355553${String(100 + index).slice(-3)}`, type: "Other", makePrimary: seed % 3 === 2 }
//         ],
//         contact: {
//             name: `${clientName} Contact ${index + 1}`,
//             title: `Coordinator ${index + 1}`,
//             email: `${safeName}.contact${index + 1}@example.com`,
//             address1: `${200 + index} ${city} Contact Rd`,
//             address2: `${index + 11}A`,
//             city,
//             state,
//             zip: String(20000 + (seed % 70000))
//         }
//     };
// }
//
// async function runFullEditFlowForClient(clientName, occurrence, index) {
//     const data = buildPartyData(clientName, index);
//
//     await dashboardClientsThirdPartiesPage.clickEditOnClient(clientName, occurrence);
//     await dashboardClientsThirdPartiesPage.waitForEditPage();
//
//     await dashboardClientsThirdPartiesPage.fillClientCoreFields(data);
//
//     for (const phone of data.phones) {
//         await dashboardClientsThirdPartiesPage.addPhoneNumberEntry(phone);
//     }
//
//     await dashboardClientsThirdPartiesPage.openAddPhoneNumberDialog();
//     await dashboardClientsThirdPartiesPage.closeAddPhoneNumberDialog();
//
//     await dashboardClientsThirdPartiesPage.setPreviewSizesInOrder(["option", "small", "medium", "large"]);
//
//     await dashboardClientsThirdPartiesPage.closeAnyContactCardAndCancelDeleteIfShown();
//
//     await dashboardClientsThirdPartiesPage.openAddContactDialog();
//     await dashboardClientsThirdPartiesPage.ensureCreateNewContactToggle(true);
//     await dashboardClientsThirdPartiesPage.fillAddContactForm(data.contact);
//
//     for (const phone of data.phones) {
//         await dashboardClientsThirdPartiesPage.addPhoneNumberEntry(phone);
//     }
//
//     await dashboardClientsThirdPartiesPage.openAddPhoneNumberDialog();
//     await dashboardClientsThirdPartiesPage.closeAddPhoneNumberDialog();
//
//     await dashboardClientsThirdPartiesPage.submitCreateNewContact();
//     await dashboardClientsThirdPartiesPage.cancelAddContactDialog();
//
//     await dashboardClientsThirdPartiesPage.openAddContactDialog();
//     await dashboardClientsThirdPartiesPage.selectExistingContactsIfAny();
//
//     const addContactStillOpen = await dashboardClientsThirdPartiesPage.addContactHeading.isDisplayed().catch(() => false);
//     if (addContactStillOpen) {
//         await dashboardClientsThirdPartiesPage.cancelAddContactDialog();
//     }
//
//     const submitVisible = await dashboardClientsThirdPartiesPage.submitEditButton.isDisplayed().catch(() => false);
//     if (submitVisible) {
//         await dashboardClientsThirdPartiesPage.submitEditButton.click();
//         await browser.pause(500);
//     }
//
//     await dashboardClientsThirdPartiesPage.goBackToClientsListPage();
//     await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
// }
//
// describe("Dashboard Clients / 3rd Parties Tests", () => {
//     before(async () => {
//         await loginHelper.loginAsDefaultUser();
//         await dashboardPage.waitForDashboard();
//         await dashboardClientsThirdPartiesPage.openClientsThirdPartiesFromSidebar();
//     });
//
//     after(async () => {
//         await dashboardPage.logout();
//     });
//
//     it("should complete the full Clients / 3rd Parties workflow for all requested clients", async () => {
//         await dashboardClientsThirdPartiesPage.waitForClientsThirdPartiesPage();
//         await expect(dashboardClientsThirdPartiesPage.searchLabel).toBeDisplayed();
//         await expect(dashboardClientsThirdPartiesPage.searchInput).toBeDisplayed();
//         await expect(dashboardClientsThirdPartiesPage.createButton).toBeDisplayed();
//         await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
//         await expect(dashboardClientsThirdPartiesPage.nameColumnHeader).toBeDisplayed();
//         await expect(dashboardClientsThirdPartiesPage.addressColumnHeader).toBeDisplayed();
//
//         for (const searchName of SEARCH_NAMES) {
//             await dashboardClientsThirdPartiesPage.searchForClient(searchName);
//             await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
//         }
//
//         await browser.refresh();
//         await dashboardClientsThirdPartiesPage.waitForClientsThirdPartiesPage();
//         await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
//
//         await dashboardClientsThirdPartiesPage.clearSearch();
//         await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
//
//         await dashboardClientsThirdPartiesPage.clickSearchInfoAndDismiss();
//
//         await dashboardClientsThirdPartiesPage.hoverOverClientRow("Somebody Else", 1);
//         await dashboardClientsThirdPartiesPage.openClientsThreeDotMenuByName("Somebody Else", 1);
//         await browser.keys("Escape");
//
//         await dashboardClientsThirdPartiesPage.clickDeleteOnClient("Somebody Else", 1);
//         await expect(dashboardClientsThirdPartiesPage.doNotDeleteButtonCard).toBeDisplayed();
//         await dashboardClientsThirdPartiesPage.cancelDeleteClient();
//
//         const occurrenceMap = new Map();
//
//         for (let i = 0; i < CLIENT_ORDER.length; i += 1) {
//             const clientName = CLIENT_ORDER[i];
//             const nextOccurrence = (occurrenceMap.get(clientName) ?? 0) + 1;
//             occurrenceMap.set(clientName, nextOccurrence);
//
//             await dashboardClientsThirdPartiesPage.openClientsThirdPartiesFromSidebar();
//             await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
//             await runFullEditFlowForClient(clientName, nextOccurrence, i);
//         }
//
//         await dashboardClientsThirdPartiesPage.openClientsThirdPartiesFromSidebar();
//         await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
//
//         const checkboxes = await dashboardClientsThirdPartiesPage.clientCheckboxBtns;
//         if (checkboxes.length > 0) {
//             await expect(checkboxes[0]).toBeExisting();
//             await checkboxes[0].click();
//             await checkboxes[0].click();
//         }
//     });
// });

import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardClientsThirdPartiesPage from "../pageobjects/dashboardClientsThirdParties.js";
import loginHelper from "../utils/loginHelper.js";

const searchNames = ["Quagmire Giggity", "EVERYONE LLC", "NO ONE Corps", "AUTOTEST Client", "cameron"];
const clientOrder = ["Somebody Else", "Quagmire Giggity", "EVERYONE LLC", "NO ONE Corps", "AUTOTEST Client", "AUTOTEST Client", "cameron"];
const cities = ["Salt Lake City", "Provo", "Ogden", "St George", "Lehi", "Sandy", "Draper"];
const states = ["UT", "AZ", "CO", "ID", "NV", "CA", "TX"];

function makeHash(text) {
    let number = 0;
    for (let i = 0; i < text.length; i += 1) {
        number = (number * 31 + text.charCodeAt(i)) % 1000000;
    }
    return number;
}

function makeClientData(clientName, index) {
    const safeName = clientName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const seed = makeHash(`${clientName}-${index}`);
    const city = cities[seed % cities.length];
    const state = states[seed % states.length];
    const zip = String(10000 + (seed % 89999));
    const ending = String(100 + index).slice(-3);

    return {
        partyName: clientName,
        url: `https://${safeName}-${index}.example.com`,
        address1: `${100 + index} ${city} Test Ave`,
        address2: `${index + 1}B`,
        city,
        state,
        zip,
        phones: [
            { number: `8015551${ending}`, type: "Cell", makePrimary: seed % 3 === 0 },
            { number: `3855552${ending}`, type: "Office", makePrimary: seed % 3 === 1 },
            { number: `4355553${ending}`, type: "Other", makePrimary: seed % 3 === 2 }
        ],
        contact: {
            name: `${clientName} Contact ${index + 1}`,
            title: `Coordinator ${index + 1}`,
            email: `${safeName}.contact${index + 1}@example.com`,
            address1: `${200 + index} ${city} Contact Rd`,
            address2: `${index + 11}A`,
            city,
            state,
            zip: String(20000 + (seed % 70000))
        }
    };
}

async function runOneClient(clientName, occurrence, index) {
    const data = makeClientData(clientName, index);

    await dashboardClientsThirdPartiesPage.clickEditOnClient(clientName, occurrence);
    await dashboardClientsThirdPartiesPage.waitForEditPage();
    await dashboardClientsThirdPartiesPage.fillClientCoreFields(data);

    for (const phone of data.phones) {
        await dashboardClientsThirdPartiesPage.addPhoneNumberEntry(phone);
    }

    await dashboardClientsThirdPartiesPage.openAddPhoneNumberDialog();
    await dashboardClientsThirdPartiesPage.closeAddPhoneNumberDialog();
    await dashboardClientsThirdPartiesPage.setPreviewSizesInOrder(["option", "small", "medium", "large"]);
    await dashboardClientsThirdPartiesPage.closeAnyContactCardAndCancelDeleteIfShown();

    await dashboardClientsThirdPartiesPage.openAddContactDialog();
    await expect(dashboardClientsThirdPartiesPage.addContactHeading).toBeDisplayed();
    await dashboardClientsThirdPartiesPage.ensureCreateNewContactToggle(true);
    await dashboardClientsThirdPartiesPage.fillAddContactForm(data.contact);

    const addContactReadyBeforePhones = await dashboardClientsThirdPartiesPage.verifyAddContactDialogReadyForPhoneNumbers();
    await expect(addContactReadyBeforePhones).toBe(true);

    for (let phoneIndex = 0; phoneIndex < data.phones.length; phoneIndex += 1) {
        if (phoneIndex === 1) {
            const readyBeforeSecondPhone = await dashboardClientsThirdPartiesPage.verifyAddContactDialogReadyForPhoneNumbers();
            await expect(readyBeforeSecondPhone).toBe(true);
        }

        await dashboardClientsThirdPartiesPage.addPhoneNumberEntry(data.phones[phoneIndex]);
    }

    const addContactReadyBeforeCancel = await dashboardClientsThirdPartiesPage.verifyAddContactDialogReadyForPhoneNumbers();
    await expect(addContactReadyBeforeCancel).toBe(true);
    await dashboardClientsThirdPartiesPage.cancelAddContactDialog();

    await dashboardClientsThirdPartiesPage.openAddContactDialog();
    await expect(dashboardClientsThirdPartiesPage.addContactHeading).toBeDisplayed();
    await dashboardClientsThirdPartiesPage.ensureCreateNewContactToggle(true);
    await dashboardClientsThirdPartiesPage.ensureCreateNewContactToggle(false);
    await dashboardClientsThirdPartiesPage.cancelAddContactDialog();

    const submitButtonIsVisible = await dashboardClientsThirdPartiesPage.submitEditButton.isDisplayed().catch(() => false);
    if (submitButtonIsVisible) {
        await dashboardClientsThirdPartiesPage.submitEditButton.click();
        await browser.pause(500);
    }

    await dashboardClientsThirdPartiesPage.goBackToClientsListPage();
    await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
}

describe("Dashboard Clients / 3rd Parties Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await dashboardClientsThirdPartiesPage.openClientsThirdPartiesFromSidebar();
    });

    after(async () => {
        for (let i = 0; i < 3; i += 1) {
            await browser.keys("Escape").catch(() => null);
            await browser.pause(150);
        }
        await dashboardClientsThirdPartiesPage.dismissBlockingBackdrops().catch(() => null);
        await dashboardPage.logout();
    });

    it("should complete the full Clients / 3rd Parties workflow for all requested clients", async () => {
        await dashboardClientsThirdPartiesPage.waitForClientsThirdPartiesPage();
        await expect(dashboardClientsThirdPartiesPage.searchLabel).toBeDisplayed();
        await expect(dashboardClientsThirdPartiesPage.searchInput).toBeDisplayed();
        await expect(dashboardClientsThirdPartiesPage.createButton).toBeDisplayed();
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        await expect(dashboardClientsThirdPartiesPage.nameColumnHeader).toBeDisplayed();
        await expect(dashboardClientsThirdPartiesPage.addressColumnHeader).toBeDisplayed();

        for (const name of searchNames) {
            await dashboardClientsThirdPartiesPage.searchForClient(name);
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        }

        await browser.refresh();
        await dashboardClientsThirdPartiesPage.waitForClientsThirdPartiesPage();
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        await dashboardClientsThirdPartiesPage.clearSearch();
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        await dashboardClientsThirdPartiesPage.clickSearchInfoAndDismiss();

        await dashboardClientsThirdPartiesPage.hoverOverClientRow("Somebody Else", 1);
        await dashboardClientsThirdPartiesPage.openClientsThreeDotMenuByName("Somebody Else", 1);
        await browser.keys("Escape");

        await dashboardClientsThirdPartiesPage.clickDeleteOnClient("Somebody Else", 1);
        await expect(dashboardClientsThirdPartiesPage.doNotDeleteButtonCard).toBeDisplayed();
        await dashboardClientsThirdPartiesPage.cancelDeleteClient();

        const seenCounts = new Map();

        for (let i = 0; i < clientOrder.length; i += 1) {
            const clientName = clientOrder[i];
            const countSoFar = seenCounts.get(clientName) ?? 0;
            const occurrence = countSoFar + 1;
            seenCounts.set(clientName, occurrence);

            await dashboardClientsThirdPartiesPage.openClientsThirdPartiesFromSidebar();
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
            await runOneClient(clientName, occurrence, i);
        }

        await dashboardClientsThirdPartiesPage.openClientsThirdPartiesFromSidebar();
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();

        const checkboxes = await dashboardClientsThirdPartiesPage.clientCheckboxBtns;
        if (checkboxes.length > 0) {
            await expect(checkboxes[0]).toBeExisting();
            await checkboxes[0].click();
            await checkboxes[0].click();
        }
    });
});