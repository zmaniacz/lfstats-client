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
    selectedSocialStartDate @client
  }
`;

export default function SocialDaily() {
  const { data, loading, error } = useQuery(GET_SOCIAL_START_DATE);

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;
  if (data && data.selectedSocialStartDate === 0)
    return <EuiLoadingSpinner size="xl" />;

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
              <SocialScorecardListContainer />
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
              <SocialScorecardSummaryContainer />
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
              <SocialMedicHitSummaryContainer />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiAccordion>
      </EuiPageContentBody>
    </>
  );
}
