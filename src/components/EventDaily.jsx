import React from "react";
import { useParams } from "react-router-dom";
import {
  EuiAccordion,
  EuiPageContent,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiSpacer,
} from "@elastic/eui";
import EventScorecardListContainer from "./EventScorecardListContainer";
import EventScorecardSummaryContainer from "./EventScorecardSummaryContainer";
import EventMedicHitSummaryContainer from "./EventMedicHitSummaryContainer";

export default () => {
  const { eventId } = useParams();
  return (
    <EuiPageContent>
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
            <EventScorecardListContainer eventId={eventId} />
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
            <EventScorecardSummaryContainer eventId={eventId} />
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
            <EventMedicHitSummaryContainer eventId={eventId} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiAccordion>
    </EuiPageContent>
  );
};
