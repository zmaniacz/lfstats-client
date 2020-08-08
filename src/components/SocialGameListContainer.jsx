import React from "react";
import { useQuery, gql } from "@apollo/client";
import { LoadError, LoadSpinner } from "./LFLoad";
import GameList from "./GameList";

const GET_SOCIAL_GAMES = gql`
  query GetSocialGamesByCenter(
    $centersFilter: [bigint!]
    $startDate: timestamptz
    $endDate: timestamptz
  ) {
    selectedCenters @client @export(as: "centersFilter")
    selectedSocialStartDate @client @export(as: "startDate")
    selectedSocialEndDate @client @export(as: "endDate")
    centers(where: { id: { _in: $centersFilter } }) {
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

export default () => {
  const { data, loading, error } = useQuery(GET_SOCIAL_GAMES);

  if (loading) return <LoadSpinner />;
  if (error) return <LoadError />;

  let games = data.centers.reduce((games, item) => {
    return games.concat(item.games);
  }, []);
  return <GameList data={games} />;
};
