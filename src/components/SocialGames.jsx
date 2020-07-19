import React from "react";
import {
  EuiTitle,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
} from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import LoadError from "./LoadError";
import SocialGameListContainer from "./SocialGameListContainer";

const GET_SELECTED_CENTERS_IDS = gql`
  query GetCentersOptions {
    selectedCenters @client
    selectedSocialStartDate @client
    selectedSocialEndDate @client
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_SELECTED_CENTERS_IDS);

  if (loading) return <EuiLoadingSpinner size="xl" />;
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
};
