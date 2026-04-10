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

        console.log("[MYTASKS_INSPECT] byTestId:");
        console.log(JSON.stringify(snapshot.byTestId, null, 2));
        console.log("[MYTASKS_INSPECT] myTasksHeaders:");
        console.log(JSON.stringify(snapshot.myTasksHeaders, null, 2));

        await dashboardPage.logout();
    });
});
