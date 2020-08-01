import React from "react";
import {
  EuiAccordion,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiLoadingSpinner,
  EuiPageContentBody,
  EuiSpacer,
  EuiTitle,
} from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import LoadError from "./LoadError";
import SocialScorecardListContainer from "./SocialScorecardListContainer";
import SocialScorecardSummaryContainer from "./SocialScorecardSummaryContainer";
import SocialMedicHitSummaryContainer from "./SocialMedicHitSummaryContainer";

const GET_SOCIAL_START_DATE = gql`
  query GetSocialStartDate {
    selectedCenters @client
    selectedSocialStartDate @client
    selectedSocialEndDate @client
  }
`;

export default function SocialDaily() {
  const { data, loading, error } = useQuery(GET_SOCIAL_START_DATE);

  if (loading || !data.selectedSocialStartDate)
    return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  return (
    <>
      <EuiPageContentBody>
        <EuiAccordion
          id="scorecardListAccordion"
          initialIsOpen={true}
          buttonContent={
            <EuiTitle>
              <h2>Scorecards</h2>
            </EuiTitle>
          }
        >
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EuiSpacer />
              <SocialScorecardListContainer
                centerFilter={data.selectedCetners}
                startDateFilter={data.selectedSocialStartDate}
                endDateFilter={data.selectedSocialEndDate}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiAccordion>
        <EuiHorizontalRule margin="xxl" />
        <EuiAccordion
          id="summaryStatsAccordion"
          initialIsOpen={true}
          buttonContent={
            <EuiTitle>
              <h2>Summary Stats</h2>
            </EuiTitle>
          }
        >
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EuiSpacer />
              <SocialScorecardSummaryContainer
                centerFilter={data.selectedCetners}
                startDateFilter={data.selectedSocialStartDate}
                endDateFilter={data.selectedSocialEndDate}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiAccordion>
        <EuiHorizontalRule margin="xxl" />
        <EuiAccordion
          id="medicHitsAccordion"
          initialIsOpen={true}
          buttonContent={
            <EuiTitle>
              <h2>Medic Hits</h2>
            </EuiTitle>
          }
        >
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EuiSpacer />
              <SocialMedicHitSummaryContainer
                centerFilter={data.selectedCetners}
                startDateFilter={data.selectedSocialStartDate}
                endDateFilter={data.selectedSocialEndDate}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiAccordion>
      </EuiPageContentBody>
    </>
  );
}
