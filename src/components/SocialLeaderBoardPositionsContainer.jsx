import React from "react";
import { useQuery, gql } from "@apollo/client";
import { EuiLoadingSpinner } from "@elastic/eui";
import LoadError from "./LoadError";
import LeaderBoardPositions from "./LeaderBoardPositions";

const GET_SOCIAL_LEADERBOARDS = gql`
  query GetSocialLeaderboards(
    $centers: [bigint!]
    $startDate: timestamptz
    $endDate: timestamptz
  ) {
    selectedCenters @client @export(as: "centers")
    selectedSocialDailyStartDate @client @export(as: "startDate")
    selectedSocialDailyEndDate @client @export(as: "endDate")
    players {
      id
      active_player_name
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
      }
    }
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_SOCIAL_LEADERBOARDS);

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  const scorecards = data.players
    .filter((item) => item.scorecards.length > 0)
    .reduce((scorecards, item) => {
      return scorecards.concat(
        item.scorecards.map((scorecard) => ({
          player_id: item.id,
          player_name: item.active_player_name,
          ...scorecard,
        }))
      );
    }, []);

  return <LeaderBoardPositions data={scorecards} />;
};
