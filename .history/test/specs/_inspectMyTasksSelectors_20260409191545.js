import loginHelper from "../utils/loginHelper.js";
import dashboardPage from "../pageobjects/dashboardPage.js";

describe("Inspect My Tasks Selectors", () => {
    it("logs selector candidates from dashboard", async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();

        const snapshot = await browser.execute(() => {
            const norm = (s) => (s || "").replace(/\s+/g, " ").trim();

            const byTestId = Array.from(document.querySelectorAll("[data-testid]"))
                .map((el) => ({
                    testid: el.getAttribute("data-testid"),
                    tag: el.tagName,
                    text: norm(el.textContent).slice(0, 120),
                }))
                .filter((x) => /task|tasks|sort|case|dashboard/i.test(x.testid || x.text))
                .slice(0, 300);

            const myTasksHeaders = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,span,div,button"))
                .map((el) => ({
                    tag: el.tagName,
                    text: norm(el.textContent),
                }))
                .filter((x) => /my tasks|add task|sort|case/i.test(x.text))
                .slice(0, 120);

            return { byTestId, myTasksHeaders };
        });

        const caseDropdown = await $('[data-testid="tasks-card-case-filter-dropdown"]');
        await caseDropdown.waitForClickable({ timeout: 10000 });
        await caseDropdown.click();

        const caseOptions = await browser.execute(() => {
            const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
            return Array.from(document.querySelectorAll('[role="option"], [data-testid*="case"][data-testid*="option"]'))
                .map((el) => ({
                    testid: el.getAttribute("data-testid"),
                    role: el.getAttribute("role"),
                    tag: el.tagName,
                    text: norm(el.textContent),
                }))
                .filter((x) => x.text)
                .slice(0, 80);
        });

        await caseDropdown.click();

        const sortDropdown = await $('[data-testid="tasks-card-sort-dropdown"]');
        await sortDropdown.waitForClickable({ timeout: 10000 });
        await sortDropdown.click();

        const sortOptions = await browser.execute(() => {
            const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
            return Array.from(document.querySelectorAll('[role="option"], [data-testid*="sort"][data-testid*="option"]'))
                .map((el) => ({
                    testid: el.getAttribute("data-testid"),
                    role: el.getAttribute("role"),
                    tag: el.tagName,
                    text: norm(el.textContent),
                }))
                .filter((x) => x.text)
                .slice(0, 80);
        });

        console.log("[MYTASKS_INSPECT] byTestId:");
        console.log(JSON.stringify(snapshot.byTestId, null, 2));
        console.log("[MYTASKS_INSPECT] myTasksHeaders:");
        console.log(JSON.stringify(snapshot.myTasksHeaders, null, 2));
        console.log("[MYTASKS_INSPECT] caseOptions:");
        console.log(JSON.stringify(caseOptions, null, 2));
        console.log("[MYTASKS_INSPECT] sortOptions:");
        console.log(JSON.stringify(sortOptions, null, 2));

        await dashboardPage.logout();
    });
});
