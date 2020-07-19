import React from "react";
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiPageContent,
  EuiSpacer,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
} from "@elastic/eui";
import { Outlet } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import LoadError from "./LoadError";
import CenterSelect from "./CenterSelect";
import SocialDatePickerContainer from "./SocialDatePickerContainer";

const GET_SELECTED_CENTERS_IDS = gql`
  query GetCentersOptions {
    selectedCenters @client
    selectedSocialStartDate @client
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_SELECTED_CENTERS_IDS);

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  return (
    <>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Social Stats</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow label="Filter by Center">
              <CenterSelect />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow label="Filter by Date">
              <SocialDatePickerContainer
                centerFilter={data.selectedCenters}
                startDate={data.selectedSocialStartDate}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
        <Outlet />
      </EuiPageContent>
    </>
  );
};
