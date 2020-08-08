import React from "react";
import { useQuery, gql } from "@apollo/client";
import { LoadError, LoadSpinner } from "./LFLoad";
import LeaderBoardPositions from "./LeaderBoardPositions";

const GET_SOCIAL_LEADERBOARDS = gql`
  query GetSocialLeaderboards(
    $centers: [bigint!]
    $startDate: timestamptz
    $endDate: timestamptz
  ) {
    selectedCenters @client @export(as: "centers")
    selectedSocialStartDate @client @export(as: "startDate")
    selectedSocialEndDate @client @export(as: "endDate")
    scorecards(
      where: {
        game: {
          _and: {
            center_id: { _in: $centers }
            game_datetime: { _lte: $endDate, _gte: $startDate }
            type: { _eq: "social" }
          }
        }
      }
    ) {
      id
      position
      score
      mvp_points
      player {
        id
        active_player_name
      }
      game {
        id
      }
    }
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_SOCIAL_LEADERBOARDS, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <LoadSpinner />;
  if (error) return <LoadError />;

  return <LeaderBoardPositions data={data.scorecards} />;
};
