import React from "react";
import moment from "moment";
import { EuiDatePicker } from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import { selectedSocialStartDateVar } from "../cache";
import SocialDatePicker from "./SocialDatePicker";

const GET_CENTERS_GAME_DATES = gql`
  query GetCentersGameDates($centerFilter: [bigint!]) {
    centers(where: { id: { _in: $centerFilter } }) {
      id
      name
      social_game_dates {
        game_date
      }
    }
  }
`;

export default ({ centerFilter, startDate }) => {
  const { data, loading, error } = useQuery(GET_CENTERS_GAME_DATES, {
    variables: { centerFilter: centerFilter.length > 0 ? centerFilter : null },
  });

  if (loading) return <EuiDatePicker isLoading={true} />;
  if (error) return <EuiDatePicker placeholder="Error" isInvalid={true} />;

  let availableDates = data.centers
    .reduce((games, item) => {
      return games.concat(item.social_game_dates);
    }, [])
    .map((item) => {
      return moment(item.game_date);
    })
    .sort((a, b) => a - b);

  if (startDate === null) {
    startDate = availableDates[availableDates.length - 1];
    selectedSocialStartDateVar(startDate);
  }

  return (
    <SocialDatePicker
      availableDates={availableDates}
      startDate={selectedSocialStartDateVar()}
    />
  );
};
