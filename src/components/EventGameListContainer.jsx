import React from "react";
import { useQuery, gql } from "@apollo/client";
import { LoadError, LoadSpinner } from "./LFLoad";
import GameList from "./GameList";

const GET_EVENT_GAMES = gql`
  query GetEvent($id: bigint!) {
    event: events_by_pk(id: $id) {
      id
      name
      games {
        id
        game_name
        game_datetime
        game_length
        winner {
          id
          color_enum
          total_score
        }
        loser {
          id
          color_enum
          total_score
        }
        center {
          id
          name
        }
      }
    }
  }
`;

export default function EventGameListContainer({ eventId }) {
  const { data, loading, error } = useQuery(GET_EVENT_GAMES, {
    variables: { id: eventId * 1 },
  });

  if (loading) return <LoadSpinner />;
  if (error) return <LoadError />;

  return <GameList data={data.event.games} />;
}
