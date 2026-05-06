export const SCHMUCK_CASE_TITLES = ["Schmuck v. United States", "Schmucks v. United States", "Schmuck", "Schmucks"];

export const CURRENT_UPCOMING_CASE_FLOW_CANDIDATES = [
    {
        label: "Eevee",
        titles: ["Eevee(No AssignTo or Milestones)", "Eevee"],
        updatedEventText: "Eevee Follow-Up",
        updatedDescriptionText: "Eevee updated description",
        noteText: "Eevee-Note-Updated"
    },
    {
        label: "Anderson",
        titles: ["Anderson vs Anderson", "Anderson"],
        updatedEventText: "Anderson Follow-Up",
        updatedDescriptionText: "Anderson updated description",
        noteText: "Anderson-Note-Updated"
    },
    {
        label: "Jane Doe",
        titles: ["Jane doe Dont Delete", "Jane Doe Dont Delete", "Jane doe"],
        updatedEventText: "Jane Doe Follow-Up",
        updatedDescriptionText: "Jane Doe updated description",
        noteText: "Jane-Doe-Note-Updated"
    },
    {
        label: "Emperor Palpatine",
        titles: ["Emperor Palpatine Vs. Luke Skywalker", "Emperor Palpatine"],
        updatedEventText: "Emperor Follow-Up",
        updatedDescriptionText: "Emperor updated description",
        noteText: "Emperor-Note-Updated"
    },
    {
        label: "Mickey Mouse",
        titles: ["Mickey Mouse"],
        updatedEventText: "Mickey Follow-Up",
        updatedDescriptionText: "Mickey updated description",
        noteText: "Mickey-Note-Updated"
    }
];

export const CURRENT_NAMED_UPCOMING_CASE_TITLES = CURRENT_UPCOMING_CASE_FLOW_CANDIDATES.flatMap((oneCase) => oneCase.titles);