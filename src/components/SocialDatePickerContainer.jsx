import React from "react";
import { EuiDatePicker } from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import SocialDatePicker from "./SocialDatePicker";

const GET_CENTERS_GAME_DATES = gql`
  query GetCentersGameDates($centers: [bigint!]) {
    selectedCenters @client @export(as: "centers")
    selectedSocialStartDate @client
    centers(where: { id: { _in: $centers } }) {
      id
      name
      social_game_dates(order_by: { game_date: asc }) {
        game_date
      }
    }
  }
`;

export default function SocialDatePickerContainer() {
  const { data, loading, error } = useQuery(GET_CENTERS_GAME_DATES);

  if (loading) return <EuiDatePicker isLoading={true} />;
  if (error) return <EuiDatePicker placeholder="Error" isInvalid={true} />;

  let availableDates = data.centers
    .reduce((games, item) => {
      return games.concat(item.social_game_dates);
    }, [])
    .map((item) => {
      return item.game_date;
    });

  let startDate = data.selectedSocialStartDate;
  if (availableDates.indexOf(startDate) < 0) {
    startDate = availableDates[availableDates.length - 1];
  }

  return (
    <SocialDatePicker availableDates={availableDates} startDate={startDate} />
  );
}
