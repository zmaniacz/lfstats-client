import React from "react";
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiLoadingSpinner,
  EuiText,
} from "@elastic/eui";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import LoadError from "./LoadError";
import EuiCustomLink from "./EuiCustomLink";
import EventDaily from "./EventDaily";
import EventGames from "./EventGames";

const GET_EVENT = gql`
  query GetEvent($id: bigint!) {
    event: events_by_pk(id: $id) {
      id
      name
      description
      is_comp
      type
      scoring
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

export default function EventsContainer() {
  let match = useRouteMatch();
  console.log(match);
  const client = useApolloClient();
  const { eventId } = useParams();
  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id: eventId * 1 },
  });

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;
  if (data.event === null) return <LoadError />;

  client.writeQuery({
    query: gql`
      query getSelectedEvent {
        selectedEvent
      }
    `,
    data: {
      selectedEvent: {
        id: data.event.id,
        name: data.event.name,
        description: data.event.description,
        is_comp: data.event.is_comp,
      },
    },
  });

  return (
    <>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>{`${data.event.name} @ ${data.event.center.name}`}</h1>
          </EuiTitle>
          <EuiText>
            <h4>
              <EuiCustomLink to="/events">Change</EuiCustomLink>
            </h4>
          </EuiText>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <Switch>
        <Route exact path={`${match.path}/standings`}>
          <EventDaily eventId={eventId} />
        </Route>
        <Route exact path={`${match.path}/games`}>
          <EventGames eventId={eventId} />
        </Route>
        <Route path={[`${match.path}/daily`, `${match.path}`]}>
          <EventDaily eventId={eventId} />
        </Route>
      </Switch>
    </>
  );
}
