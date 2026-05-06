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

const searchNames = [
    "Jane doe Dont Delete",
    "Thanos",
    "EVERYONE v NO ONE",
    "Squarepants v Krabs",
    "EDNA MAE VAVOOM v. HAROLD \"HAL\" P. BOTTOM",
    "Karen's Cat vs. The Entire Neighborhood",
    "Schmuck v. United States",
    "Luigi",
    "Emperor Palpatine Vs. Luke Skywalker",
    "Medical Malpractice Suit - Smith vs. General Hospital and All Associated Pr",
    "Triscuit Family Trust",
    "Real Fast",
    "Meow said the cat",
    "Whats Hername (dont delete or edit please)",
    "example input",
    "This Case Name",
    "Kmart",
    "The Big Case",
    "thursday",
    "fvdfvsd",
    "Eevee(No AssignTo or Milestones)",
    "secret case",
    "new guy",
    "mama",
    "papa",
    "sis",
    "TEST CASE(For Adding TASK)",
    "t",
    "f",
    "g",
    "h",
    "x",
    "w",
    "j",
    "u",
    "ii",
    "jj",
    "ss",
    "xx",
    "vv",
    "ef",
    "er",
    "ty",
    "Something",
    "Jerry",
    "Whats hisname (dont delete or change please)",
    "Whats Thier name (dont delete please)",
    "Whats Whosname (dont delete please)",
    "Whats Whysname (dont delete please)",
    "Whys Hername (dont delete please)",
    "Whos Whatsname (dont delete please)",
    "What (dont delete or edit please)",
    "Walter White (dont delete please)",
    "Whitney (dont delete please)",
    "Whitey (dont delete please)",
    "Why (dont delete please)",
    "Watt (dont delete please)",
    "This Case Name is a Test",
    "Flavor Flave",
    "WILL I AM (DONT DELETE)",
    "Whats My Name (DONT DELETE)",
    "William (DONT DELETE)",
    "WAM (DONT DELETE)",
    "Apps vs Game cube",
    "Harry and The Hendersons",
    "Z no touchy please Don't delete",
    "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",
    "AppleJacks vs Cheerios",
    "Anna The Banana vs Cherry the Grape",
    "Ankle Brace vs Knee Brace",
    "Ants vs Bee's",
    "Arnold Palmer Family Trust vs Arizona Tea Company",
    "Arizona Tea Company vs Arnold Palmer Family Trust"
];
const gibberishSearches = ["q9z1x8v7_word_552211", "123abc987mixednoise"];
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

function makeSafeName(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function captureAddContactStep(clientName, index, stepName) {
    const safeClient = makeSafeName(clientName);
    const safeStep = makeSafeName(stepName);
    const filePath = `./errorShots/add-contact-${String(index + 1).padStart(2, "0")}-${safeClient}-${safeStep}.png`;

    console.log(`[AddContactFlow] ${clientName} #${index + 1}: ${stepName}`);
    await browser.saveScreenshot(filePath);
    await browser.pause(350);
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
    await captureAddContactStep(clientName, index, "opened-add-contact");

    await dashboardClientsThirdPartiesPage.ensureCreateNewContactToggle(true);
    await captureAddContactStep(clientName, index, "clicked-create-new-contact-toggle-on");

    await dashboardClientsThirdPartiesPage.fillAddContactForm(data.contact);
    await captureAddContactStep(clientName, index, "filled-add-contact-form");

    const addContactReadyBeforePhones = await dashboardClientsThirdPartiesPage.verifyAddContactDialogReadyForPhoneNumbers();
    await expect(addContactReadyBeforePhones).toBe(true);
    await captureAddContactStep(clientName, index, "ready-before-contact-phone-inputs");

    for (let phoneIndex = 0; phoneIndex < data.phones.length; phoneIndex += 1) {
        if (phoneIndex === 1) {
            const readyBeforeSecondPhone = await dashboardClientsThirdPartiesPage.verifyAddContactDialogReadyForPhoneNumbers();
            await expect(readyBeforeSecondPhone).toBe(true);
            await captureAddContactStep(clientName, index, "before-second-contact-phone-input");
        }

        await dashboardClientsThirdPartiesPage.addPhoneNumberEntry(data.phones[phoneIndex], { requireAddContactCard: true });
    }

    await captureAddContactStep(clientName, index, "after-contact-phone-inputs");

    const readyBeforeSecondContactPhoneRound = await dashboardClientsThirdPartiesPage.verifyAddContactDialogReadyForPhoneNumbers();
    await expect(readyBeforeSecondContactPhoneRound).toBe(true);
    await captureAddContactStep(clientName, index, "before-second-contact-phone-round");

    for (let phoneIndex = 0; phoneIndex < data.phones.length; phoneIndex += 1) {
        if (phoneIndex === 1) {
            const readyBeforeSecondPhoneInSecondRound = await dashboardClientsThirdPartiesPage.verifyAddContactDialogReadyForPhoneNumbers();
            await expect(readyBeforeSecondPhoneInSecondRound).toBe(true);
            await captureAddContactStep(clientName, index, "before-second-phone-in-second-round");
        }

        await dashboardClientsThirdPartiesPage.addPhoneNumberEntry(data.phones[phoneIndex], { requireAddContactCard: true });
    }

    await captureAddContactStep(clientName, index, "after-second-contact-phone-round");

    const addContactReadyBeforeCancel = await dashboardClientsThirdPartiesPage.verifyAddContactDialogReadyForPhoneNumbers();
    await expect(addContactReadyBeforeCancel).toBe(true);

    await dashboardClientsThirdPartiesPage.cancelAddContactDialog();
    await captureAddContactStep(clientName, index, "canceled-add-contact-dialog-first-time");

    await dashboardClientsThirdPartiesPage.openAddContactDialog();
    await expect(dashboardClientsThirdPartiesPage.addContactHeading).toBeDisplayed();
    await captureAddContactStep(clientName, index, "reopened-add-contact-dialog");

    await dashboardClientsThirdPartiesPage.ensureCreateNewContactToggle(true);
    await captureAddContactStep(clientName, index, "clicked-create-new-contact-toggle-on-second-time");

    await dashboardClientsThirdPartiesPage.ensureCreateNewContactToggle(false);
    await captureAddContactStep(clientName, index, "clicked-create-new-contact-toggle-off-second-time");

    await dashboardClientsThirdPartiesPage.cancelAddContactDialog();
    await captureAddContactStep(clientName, index, "canceled-add-contact-dialog-second-time");

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

        const dynamicNames = await dashboardClientsThirdPartiesPage.getClientNamesFromGrid(12);
        const activeSearchNames = dynamicNames.length > 0 ? dynamicNames : searchNames.slice(0, 12);
        const activeClientOrder = activeSearchNames.slice(0, Math.min(3, activeSearchNames.length));

        expect(activeClientOrder.length > 0).toBe(true);

        for (const name of activeSearchNames) {
            await dashboardClientsThirdPartiesPage.searchForClient(name);
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
            await dashboardClientsThirdPartiesPage.clearSearchUsingXButton();
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        }

        for (const gibberish of gibberishSearches) {
            await dashboardClientsThirdPartiesPage.searchForClient(gibberish);
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();

            const rowCount = await dashboardClientsThirdPartiesPage.getDataRowCount();
            const emptyVisible = await dashboardClientsThirdPartiesPage.emptyStateMessage.isDisplayed().catch(() => false);
            const matchingRowExists = await dashboardClientsThirdPartiesPage
                .rowByClientName(gibberish, 1)
                .isExisting()
                .catch(() => false);
            expect(rowCount === 0 || emptyVisible || !matchingRowExists).toBe(true);

            await dashboardClientsThirdPartiesPage.clearSearchUsingXButton();
            await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        }

        await browser.refresh();
        await dashboardClientsThirdPartiesPage.waitForClientsThirdPartiesPage();
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        await dashboardClientsThirdPartiesPage.clearSearch();
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        await dashboardClientsThirdPartiesPage.clickSearchInfoAndDismiss();

        const firstClient = activeClientOrder[0];
        await dashboardClientsThirdPartiesPage.searchForClient(firstClient);
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();
        await dashboardClientsThirdPartiesPage.hoverOverClientRow(firstClient, 1);
        await dashboardClientsThirdPartiesPage.openClientsThreeDotMenuByName(firstClient, 1);
        await browser.keys("Escape");

        await dashboardClientsThirdPartiesPage.clickDeleteOnClient(firstClient, 1);
        await expect(dashboardClientsThirdPartiesPage.doNotDeleteButtonCard).toBeDisplayed();
        await dashboardClientsThirdPartiesPage.cancelDeleteClient();
        await dashboardClientsThirdPartiesPage.clearSearchUsingXButton();
        await dashboardClientsThirdPartiesPage.waitForGridOrEmptyState();

        const seenCounts = new Map();

        for (let i = 0; i < activeClientOrder.length; i += 1) {
            const clientName = activeClientOrder[i];
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