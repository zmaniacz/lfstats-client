import React from "react";
import { EuiDatePicker } from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import { selectedSocialDailyStartDateVar } from "../cache";
import SocialDatePicker from "./SocialDatePicker";

const GET_CENTERS_GAME_DATES = gql`
  query GetCentersGameDates($centers: [bigint!]) {
    selectedCenters @client @export(as: "centers")
    selectedSocialDailyStartDate @client
    v_social_game_dates(
      where: { center_id: { _in: $centers } }
      order_by: { game_date: asc }
    ) {
      game_date
    }
  }
`;

export default function SocialDatePickerContainer() {
  const { data, loading, error } = useQuery(GET_CENTERS_GAME_DATES);

  if (loading) return <EuiDatePicker isLoading={true} />;
  if (error) return <EuiDatePicker placeholder="Error" isInvalid={true} />;

  let availableDates = data.v_social_game_dates.map((item) => {
    return item.game_date;
  });

  let startDate = data.selectedSocialDailyStartDate;
  if (availableDates.indexOf(startDate) < 0) {
    startDate = availableDates[availableDates.length - 1];
    selectedSocialDailyStartDateVar(startDate);
  }

  return (
    <SocialDatePicker availableDates={availableDates} startDate={startDate} />
  );
}
