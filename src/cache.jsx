import { makeVar, InMemoryCache } from "@apollo/client";
import moment from "moment";

export const selectedCentersVar = makeVar([5]);
export const selectedEventVar = makeVar(null);
export const selectedEventDateVar = makeVar(null);
export const selectedSocialDailyStartDateVar = makeVar(null);
export const selectedSocialStartDateVar = makeVar(
  moment().subtract(1, "y").format("YYYY-MM-DD")
);
export const selectedSocialEndDateVar = makeVar(moment().format("YYYY-MM-DD"));

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
            return selectedCentersVar().length > 0
              ? selectedCentersVar()
              : null;
          },
        },
        selectedEvent: {
          read() {
            return selectedEventVar();
          },
        },
        selectedEventDate: {
          read() {
            return selectedEventDateVar();
          },
        },
        selectedSocialDailyStartDate: {
          read() {
            return selectedSocialDailyStartDateVar();
          },
        },
        selectedSocialDailyEndDate: {
          read() {
            if (selectedSocialDailyStartDateVar())
              return moment(selectedSocialDailyStartDateVar())
                .add(1, "d")
                .format("YYYY-MM-DD");
            else return null;
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
