import { makeVar, InMemoryCache } from "@apollo/client";

export const selectedCentersOptionsVar = makeVar([
  {
    label: "Brisbane",
    value: {
      id: 5,
      name: "Brisbane",
    },
  },
]);
export const selectedEventVar = makeVar(null);

/*
Team Color Enum
0,None
1,Red
2,Green
11,Fire
12,Ice
13,Earth
*/
export const teamColorsVar = makeVar({
  0: "#424242",
  1: "#c62828",
  2: "#2e7d32",
  11: "#c62828",
  12: "#0277bd",
  13: "#2e7d32",
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        selectedCentersOptions: {
          read() {
            return selectedCentersOptionsVar();
          },
        },
        selectedEvent: {
          read() {
            return selectedEventVar();
          },
        },
        teamColors: {
          read() {
            return teamColorsVar();
          },
        },
      },
    },
  },
});
