import React, { Fragment } from "react";
import {
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle
} from "@elastic/eui";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import EventScorecardList from "./EventScorecardList";
import EventScorecardSummary from "./EventScorecardSummary";

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
    }
  }
`;

export default function Event() {
  const { eventId } = useParams();
  console.log("event", eventId);

  const { data } = useQuery(GET_EVENT, {
    variables: { id: eventId * 1 }
  });

  return (
    <Fragment>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Event Stats{data && ` - ${data.events[0].name}`}</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        <EventScorecardList eventId={eventId} />
        <EventScorecardSummary eventId={eventId} />
      </EuiPageContent>
    </Fragment>
  );
}
