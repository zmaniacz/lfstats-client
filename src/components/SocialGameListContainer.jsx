import React from "react";
import { EuiLoadingSpinner } from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import LoadError from "./LoadError";
import GameList from "./GameList";

const GET_SOCIAL_GAMES = gql`
  query GetSocialGamesByCenter($centers: [bigint!]) {
    centers(where: { id: { _in: $centers } }) {
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
      }
    }
  }
`;

export default ({ filter }) => {
  if (filter.length === 0) filter = null;
  const { data, loading, error } = useQuery(GET_SOCIAL_GAMES, {
    variables: { centers: filter },
  });

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  let games = data.centers.reduce((games, item) => {
    return games.concat(item.games);
  }, []);
  return <GameList data={games} />;
};
