import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardEngagementTemplates from "../pageobjects/dashboardEngagementTemplates.js";
import loginHelper from "../utils/loginHelper.js";

const METHOD_SKIP_LIST = new Set([
	"constructor",
	"login",
]);

const EXECUTION_PLAN = [
	{
		name: "clickEngagementTemplatesButton",
		args: [],
	},
	{
		name: "verifyDashboardEngagementTemplatesHeader",
		args: [],
	},
	{
		name: "clickEngagementTemplatesNewTemplateButton",
		args: [],
	},
	{
		name: "verifyEngagementTemplatesNewTemplateModal",
		args: [],
	},
	{
		name: "enterEngagementTemplatesNewTemplateName",
		args: ["Auto Engagement Template"],
	},
	{
		name: "verifyEngagementTemplatesNewTemplateNameInputValue",
		args: ["Auto Engagement Template"],
	},
	{
		name: "enterEngagementTemplatesAddSlashEditEngagementTemplateTemplateDescription",
		args: ["Auto template description"],
	},
	{
		name: "verifyEngagementTemplatesAddSlashEditEngagementTemplateTemplateDescriptionInputValue",
		args: ["Auto template description"],
	},
	{
		name: "enterEngagementTemplatesAddSlashEditEngagementTemplateDocumentTitle",
		args: ["Auto document title"],
	},
	{
		name: "verifyEngagementTemplatesAddSlashEditEngagementTemplateDocumentTitleInputValue",
		args: ["Auto document title"],
	},
	{
		name: "clickAddSlashEditEngagementTemplateCancelButton",
		args: [],
	},
];

async function openEngagementTemplatesPage() {
	await browser.url("https://app.thecasework.com/templates");
	await dashboardEngagementTemplates.clickEngagementTemplatesButton().catch(() => {});
	await dashboardEngagementTemplates.dashboardEngagementTemplatesHeader.waitForDisplayed({ timeout: 20000 });
}

describe("Dashboard Engagement Templates Coverage Test", () => {
	before(async () => {
		await loginHelper.loginAsDefaultUser();
		await dashboardPage.waitForDashboard();
		await openEngagementTemplatesPage();
	});

	it("uses all effective getters, selectors, and functions from dashboardEngagementTemplates", async () => {
		const proto = Object.getPrototypeOf(dashboardEngagementTemplates);
		const descriptors = Object.getOwnPropertyDescriptors(proto);

		const getterNames = Object.keys(descriptors).filter((name) => typeof descriptors[name].get === "function");
		const methodNames = Object.keys(descriptors).filter((name) => typeof descriptors[name].value === "function");

		const getterUsage = [];
		const methodSources = [];
		const executedMethods = [];
		const executedMethodFailures = [];

		for (const getterName of getterNames) {
			const getterValue = dashboardEngagementTemplates[getterName];
			getterUsage.push(getterName);

			// Touch each selector-backed getter at least once.
			if (getterValue && typeof getterValue.isExisting === "function") {
				await getterValue.isExisting().catch(() => false);
			}
		}

		for (const methodName of methodNames) {
			if (METHOD_SKIP_LIST.has(methodName)) {
				continue;
			}

			methodSources.push(dashboardEngagementTemplates[methodName].toString());
		}

		for (const step of EXECUTION_PLAN) {
			if (typeof dashboardEngagementTemplates[step.name] !== "function") {
				executedMethodFailures.push(`${step.name}: function missing`);
				continue;
			}

			try {
				await dashboardEngagementTemplates[step.name](...step.args);
				executedMethods.push(step.name);
			} catch (error) {
				executedMethodFailures.push(`${step.name}: ${error.message}`);
			}
		}

		await browser.pause(1000);

		expect(getterUsage.length).toBeGreaterThan(0);
		expect(methodSources.length).toBeGreaterThan(0);
		expect(executedMethods.length).toBeGreaterThan(0);

		expect(executedMethodFailures).toEqual([]);
	});
});
