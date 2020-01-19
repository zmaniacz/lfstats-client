import React, { Fragment } from "react";
import {
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiLoadingSpinner
} from "@elastic/eui";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import LoadError from "./LoadError";
import GameList from "./GameList";

const GET_EVENT_GAMES = gql`
  query GetEvent($id: bigint) {
    events(where: { id: { _eq: $id } }) {
      name
      games {
        game_name
        game_datetime
        game_length
        green_score
        green_adj
        red_score
        red_team_id
        green_team_id
        red_adj
        pdf_id
        winner
        id
      }
    }
  }
`;

export default function EventGameListContainer() {
  const { eventId } = useParams();

  const { data, loading, error } = useQuery(GET_EVENT_GAMES, {
    variables: { id: eventId * 1 }
  });

  return (
    <Fragment>
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>Game List{data && ` - ${data.events[0].name}`}</h1>
          </EuiTitle>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageContent>
        {loading && <EuiLoadingSpinner size="xl" />}
        {error && <LoadError />}
        {data && <GameList data={data.events[0].games} />}
      </EuiPageContent>
    </Fragment>
  );
}
