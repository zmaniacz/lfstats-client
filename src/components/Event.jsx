import React, { Fragment } from "react";
import {
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiLoadingSpinner
} from "@elastic/eui";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import LoadError from "./LoadError";
import EventScorecardListContainer from "./EventScorecardListContainer";
import EventScorecardSummaryContainer from "./EventScorecardSummaryContainer";
import EventMedicHitSummaryContainer from "./EventMedicHitSummaryContainer";

const GET_EVENT = gql`
  query GetEvent($id: bigint) {
    events(where: { id: { _eq: $id } }) {
      id
      name
      description
      is_comp
      games_aggregate {
        aggregate {
          max {
            game_datetime
          }
        }
      }
      center {
        name
      }
    }
  }
`;

export default function Event() {
  const { eventId } = useParams();

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id: eventId * 1 }
  });

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  return (
    <Fragment>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>{`${data.events[0].name} @ ${data.events[0].center.name}`}</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Scorecards</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EventScorecardListContainer eventId={eventId} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
        <EuiHorizontalRule margin="xxl" />
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Summary Stats</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EventScorecardSummaryContainer eventId={eventId} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
        <EuiHorizontalRule margin="xxl" />
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>Medic Hits</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EventMedicHitSummaryContainer eventId={eventId} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageContent>
    </Fragment>
  );
}
