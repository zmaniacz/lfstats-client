import React from "react";
import moment from "moment";
import {
  EuiAccordion,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPageContentBody,
  EuiSpacer,
  EuiTitle,
} from "@elastic/eui";
import { useReactiveVar } from "@apollo/client";
import { selectedCentersVar, selectedSocialDailyStartDateVar } from "../cache";
import SocialScorecardListContainer from "./SocialScorecardListContainer";
import SocialScorecardSummaryContainer from "./SocialScorecardSummaryContainer";
import SocialMedicHitSummaryContainer from "./SocialMedicHitSummaryContainer";

export default function SocialDaily() {
  const selectedCenters = useReactiveVar(selectedCentersVar);
  const selectedSocialDailyStartDate = useReactiveVar(
    selectedSocialDailyStartDateVar
  );
  const selectedSocialDailyEndDate = moment(selectedSocialDailyStartDate)
    .add(1, "d")
    .format("YYYY-MM-DD");

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
                centerFilter={selectedCenters}
                startDateFilter={selectedSocialDailyStartDate}
                endDateFilter={selectedSocialDailyEndDate}
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
                centerFilter={selectedCenters}
                startDateFilter={selectedSocialDailyStartDate}
                endDateFilter={selectedSocialDailyEndDate}
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
                centerFilter={selectedCenters}
                startDateFilter={selectedSocialDailyStartDate}
                endDateFilter={selectedSocialDailyEndDate}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiAccordion>
      </EuiPageContentBody>
    </>
  );
}
