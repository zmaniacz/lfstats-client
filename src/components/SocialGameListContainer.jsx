import React from "react";
import moment from "moment";
import { useQuery, gql } from "@apollo/client";
import { LoadError, LoadSpinner } from "./LFLoad";
import GameList from "./GameList";

const GET_SOCIAL_GAMES = gql`
  query GetSocialGamesByCenter(
    $centers: [bigint!]
    $startDate: timestamptz
    $endDate: timestamptz
  ) {
    games(
      where: {
        _and: {
          game_datetime: { _gte: $startDate, _lte: $endDate }
          type: { _eq: "social" }
          center_id: { _in: $centers }
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
`;

export default function SocialGameListContainer({
  centerFilter,
  startDateFilter,
  endDateFilter,
}) {
  const { data, loading, error } = useQuery(GET_SOCIAL_GAMES, {
    variables: {
      centers: centerFilter,
      startDate: startDateFilter,
      endDate: moment(endDateFilter).add(1, "d").format("YYYY-MM-DD"),
    },
  });

  if (loading) return <LoadSpinner />;
  if (error) return <LoadError />;

  return <GameList data={data.games} />;
}
