import React from "react";
import { EuiDatePicker } from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import { selectedSocialStartDateVar, selectedSocialEndDateVar } from "../cache";
import SocialMultiDatePicker from "./SocialMultiDatePicker";

const GET_CENTERS_GAME_DATES = gql`
  query GetCentersGameDates($centers: [bigint!]) {
    selectedCenters @client @export(as: "centers")
    selectedSocialStartDate @client
    selectedSocialEndDate @client
    v_social_game_dates(
      where: { center_id: { _in: $centers } }
      order_by: { game_date: asc }
    ) {
      game_date
    }
  }
`;

export default function SocialMultiDatePickerContainer() {
  const { data, loading, error } = useQuery(GET_CENTERS_GAME_DATES);

  if (loading) return <EuiDatePicker isLoading={true} />;
  if (error) return <EuiDatePicker placeholder="Error" isInvalid={true} />;

  let availableDates = data.v_social_game_dates.map((item) => {
    return item.game_date;
  });

  let startDate = data.selectedSocialStartDate;
  let endDate = data.selectedSocialEndDate;
  if (availableDates.indexOf(startDate) < 0) {
    startDate = availableDates[0];
    selectedSocialStartDateVar(startDate);
  }
  if (availableDates.indexOf(endDate) < 0) {
    endDate = availableDates[availableDates.length - 1];
    selectedSocialEndDateVar(endDate);
  }

  return (
    <SocialMultiDatePicker
      availableDates={availableDates}
      startDate={startDate}
      endDate={endDate}
    />
  );
}
