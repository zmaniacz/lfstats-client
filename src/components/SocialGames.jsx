import React from "react";
import {
  EuiTitle,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import { LoadError, LoadSpinner } from "./LFLoad";
import SocialGameListContainer from "./SocialGameListContainer";

const GET_SOCIAL_GAMES_FILTER = gql`
  query GetSocialStartDate {
    selectedCenters @client
    selectedSocialStartDate @client
    selectedSocialEndDate @client
  }
`;

export default function SocialGames() {
  const { data, loading, error } = useQuery(GET_SOCIAL_GAMES_FILTER);

  if (loading || !data.selectedSocialStartDate) return <LoadSpinner />;
  if (error) return <LoadError />;

  return (
    <>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Games Played</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
      <EuiPageContentBody>
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={false}>
            <SocialGameListContainer
              centerFilter={data.selectedCenters}
              startDateFilter={data.selectedSocialStartDate}
              endDateFilter={data.selectedSocialEndDate}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentBody>
    </>
  );
}
