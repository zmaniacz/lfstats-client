import { makeVar, InMemoryCache } from "@apollo/client";
import moment from "moment";

//default to Brisbane
export const selectedCentersVar = makeVar([5]);
export const selectedEventVar = makeVar(null);
export const selectedSocialStartDateVar = makeVar(moment());
export const selectedSocialEndDateVar = makeVar(moment().add(1, "d"));

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
        selectedCenters: {
          read() {
            return selectedCentersVar();
          },
        },
        selectedEvent: {
          read() {
            return selectedEventVar();
          },
        },
        selectedSocialStartDate: {
          read() {
            return selectedSocialStartDateVar();
          },
        },
        selectedSocialEndDate: {
          read() {
            return selectedSocialEndDateVar();
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
