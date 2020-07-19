import React from "react";
import { EuiLoadingSpinner } from "@elastic/eui";
import { useQuery, gql } from "@apollo/client";
import LoadError from "./LoadError";
import GameList from "./GameList";

const GET_SOCIAL_GAMES = gql`
  query GetSocialGamesByCenter(
    $centers: [bigint!]
    $startDate: timestamptz
    $endDate: timestamptz
  ) {
    centers(where: { id: { _in: $centers } }) {
      id
      name
      games(
        where: {
          _and: {
            game_datetime: { _gte: $startDate, _lte: $endDate }
            type: { _eq: "social" }
          }
        }
      ) {
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

export default ({ centerFilter, startDateFilter, endDateFilter }) => {
  const { data, loading, error } = useQuery(GET_SOCIAL_GAMES, {
    variables: {
      centers: centerFilter.length > 0 ? centerFilter : null,
      startDate: startDateFilter.format("YYYY-MM-DD"),
      endDate: endDateFilter.format("YYYY-MM-DD"),
    },
  });

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  let games = data.centers.reduce((games, item) => {
    return games.concat(item.games);
  }, []);
  return <GameList data={games} />;
};
