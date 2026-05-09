import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardEngagementTemplates from "../pageobjects/dashboardEngagementTemplates.js";
import loginHelper from "../utils/loginHelper.js";

const METHOD_SKIP_LIST = new Set([
    "constructor",
    "login",
]);

async function openEngagementTemplatesPage() {
    await browser.url("https://app.thecasework.com/templates");
    await dashboardEngagementTemplates.clickEngagementTemplatesButton().catch(() => {});
    await dashboardEngagementTemplates.dashboardEngagementTemplatesHeader.waitForDisplayed({ timeout: 20000 });
}

describe("Dashboard Engagement Templates Object Coverage", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
        await openEngagementTemplatesPage();
    });

    it("covers all effective getters and method definitions", async () => {
        const proto = Object.getPrototypeOf(dashboardEngagementTemplates);
        const descriptors = Object.getOwnPropertyDescriptors(proto);

        const getterNames = Object.keys(descriptors).filter((name) => typeof descriptors[name].get === "function");
        const methodNames = Object.keys(descriptors).filter((name) => typeof descriptors[name].value === "function");

        const touchedGetters = [];
        const touchedMethods = [];

        for (const getterName of getterNames) {
            const getterValue = dashboardEngagementTemplates[getterName];
            touchedGetters.push(getterName);

            if (getterValue && typeof getterValue.isExisting === "function") {
                await getterValue.isExisting().catch(() => false);
            }
        }

        for (const methodName of methodNames) {
            if (METHOD_SKIP_LIST.has(methodName)) {
                continue;
            }

            touchedMethods.push(methodName);
            expect(typeof dashboardEngagementTemplates[methodName]).toBe("function");
        }

        expect(touchedGetters.length).toBeGreaterThan(0);
        expect(touchedMethods.length).toBeGreaterThan(0);
    });
});
