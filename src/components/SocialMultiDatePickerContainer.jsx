import React from "react";
import { EuiDatePicker } from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import SocialMultiDatePicker from "./SocialMultiDatePicker";

const GET_CENTERS_GAME_DATES = gql`
  query GetCentersGameDates($centers: [bigint!]) {
    selectedSocialStartDate @client
    selectedSocialEndDate @client
  }
`;

export default function SocialMultiDatePickerContainer() {
  const { data, loading, error } = useQuery(GET_CENTERS_GAME_DATES);

  if (loading) return <EuiDatePicker isLoading={true} />;
  if (error) return <EuiDatePicker placeholder="Error" isInvalid={true} />;

  return (
    <SocialMultiDatePicker
      startDate={data.selectedSocialStartDate}
      endDate={data.selectedSocialEndDate}
    />
  );
}
