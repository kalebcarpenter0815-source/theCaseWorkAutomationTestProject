export const DASHBOARD_DEFAULT_FILTER = "Within 3 months";

export const dashboardFilterSmokeMatrix = [
    {
        name: "applies the 7 day filter and keeps only in-range events",
        filters: [
            {
                kind: "upcoming-date",
                label: "Within 7 days",
                maxDays: 7
            }
        ],
        expectVisibleResults: true
    },
    {
        name: "applies the 14 day filter and keeps only in-range events",
        filters: [
            {
                kind: "upcoming-date",
                label: "Within 14 days",
                maxDays: 14
            }
        ],
        expectVisibleResults: true
    },
    {
        name: "reset returns the dashboard to the default filter",
        seedFilter: {
            kind: "upcoming-date",
            label: "Within 7 days",
            maxDays: 7
        },
        resetToDefault: true,
        expectDefaultFilterAfterReset: true
    }
];

export const dashboardFilterRegressionMatrix = [
    {
        name: "applies the 30 day filter and keeps only in-range events",
        filters: [
            {
                kind: "upcoming-date",
                label: "Within 30 days",
                maxDays: 30
            }
        ],
        expectVisibleResults: true
    },
    {
        name: "applies the default 3 month filter and keeps only in-range events",
        filters: [
            {
                kind: "upcoming-date",
                label: DASHBOARD_DEFAULT_FILTER,
                maxDays: 92
            }
        ],
        expectVisibleResults: true
    },
    {
        name: "handles a no-results dashboard state without crashing assertions",
        filters: [
            {
                kind: "upcoming-date",
                label: "Within 7 days",
                maxDays: 7
            }
        ],
        allowNoResults: true,
        expectNoResultsWhenEmpty: true
    }
];