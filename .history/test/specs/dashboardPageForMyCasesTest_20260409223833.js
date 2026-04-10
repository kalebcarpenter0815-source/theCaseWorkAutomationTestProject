import { expect } from "@wdio/globals";
import dashboardPage from "../pageobjects/dashboardPage.js";
import dashboardMyCasesPage from "../pageobjects/dashboardMyCases.js";
import loginHelper from "../utils/loginHelper.js";

// Starter scaffold for the My Cases card.
// Remove .skip after you confirm the selectors against the real UI.
describe.skip("Dashboard My Cases Tests", () => {
    before(async () => {
        await loginHelper.loginAsDefaultUser();
        await dashboardPage.waitForDashboard();
    });

    after(async () => {
        await dashboardPage.logout();
    });

    it("should display the My Cases section on the dashboard", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();
        await expect(dashboardMyCasesPage.myCasesSection).toBeDisplayed();
    });

    it("should display the My Cases heading", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();
        await expect(dashboardMyCasesPage.myCasesHeading).toBeDisplayed();
    });

    it("should display the Case dropdown if that control exists", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();
        await expect(dashboardMyCasesPage.caseDropdown).toBeDisplayed();
    });

    it("should display the Sort dropdown if that control exists", async () => {<button type="button" class="fui-Button r1f29ykk ___dbfzid0 ffp7eso f1p3nwhy f11589ue f1q5o8ev f1pdflbu f1phragk f15wkkf3 f1s2uweq fr80ssc f1ukrpxl fecsdlb f1rq72xc f1ksv2xa fhvnf4x fb6swo4 f1klyf7k f232fm2 f1d6mv4x f1nz3ub2 fag2qd2 fmvhcg7 f1o3dhpw f14bpyus fqc85l4 f1h3a8gf fkiggi6 f8gmj8i f1ap8nzx f1igan7k fjag8bx f1v3eptx f1ysmecq faulsx f79t15f fbtzoaq f8qmx7k fd4bjan fh7ncta f1brlhvm f1sl3k7w fneth5b ft85np5 fy9rknc figsok6 fwrc4pm f17t0x8g f194v5ow f1qgg65p fk7jm04 fhgccpy f32wu9k fu5nqqq f13prjl2 f1czftr5 f1nl83rv fixhny3 feygou5 fazmxh f1ni9pe4 f12awlo f177yfvr f1o7qkhw" data-testid="my-cases-create-case-button"><span class="fui-Button__icon rywnvv2 ___14u6ce1 f1nizpg2 fe5j1ua fjamq6b f64fuq3 fbaiahx"><svg fill="currentColor" class="fui-Icon ___9ctc0p0 f1w7gpdv fez10in f1dd5bof" aria-hidden="true" width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM4 6c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm6.5.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 1 0 1 0v-3h3a.5.5 0 1 0 0-1h-3v-3Z" fill="currentColor"></path></svg></span>Create Case</button>
        await dashboardMyCasesPage.waitForMyCasesSection();
        await expect(dashboardMyCasesPage.sortDropdown).toBeDisplayed();
    });

    it("should open the Case dropdown and show options", async () => {
        await dashboardMyCasesPage.openCaseDropdown();
        const options = await dashboardMyCasesPage.caseDropdownOptions;
        expect(options.length).toBeGreaterThan(0);
    });

    it("should open the Sort dropdown and show options", async () => {
        await dashboardMyCasesPage.openSortDropdown();
        const options = await dashboardMyCasesPage.sortDropdownOptions;
        expect(options.length).toBeGreaterThan(0);
    });

    it("should check the My Cases card content or empty state", async () => {
        await dashboardMyCasesPage.waitForMyCasesSection();

        const rows = await dashboardMyCasesPage.caseRows;
        if (rows.length === 0) {
            await expect(dashboardMyCasesPage.emptyStateMessage).toBeDisplayed();
            return;
        }

        const firstRow = rows[0];
        await expect(firstRow).toBeDisplayed();

        const titleEl = await dashboardMyCasesPage.getCaseTitle(firstRow);
        const numberEl = await dashboardMyCasesPage.getCaseNumber(firstRow);
        const statusEl = await dashboardMyCasesPage.getCaseStatus(firstRow);
        const ownerEl = await dashboardMyCasesPage.getCaseOwner(firstRow);
        const updatedDateEl = await dashboardMyCasesPage.getCaseUpdatedDate(firstRow);

        if (await titleEl.isExisting()) {
            await expect(titleEl).toBeDisplayed();
        }

        if (await numberEl.isExisting()) {
            await expect(numberEl).toBeDisplayed();
        }

        if (await statusEl.isExisting()) {
            await expect(statusEl).toBeDisplayed();
        }

        if (await ownerEl.isExisting()) {
            await expect(ownerEl).toBeDisplayed();
        }

        if (await updatedDateEl.isExisting()) {
            await expect(updatedDateEl).toBeDisplayed();
        }
    });

    it("should let you add real My Cases filter and sort tests later", async () => {
        // Example starter lines for later use:
        // await dashboardMyCasesPage.selectCaseDropdownOption("All Cases");
        // await dashboardMyCasesPage.selectSortOption("Created - Ascending");
    });
});