import React from "react";
import { useQuery, gql } from "@apollo/client";
import { EuiLoadingSpinner } from "@elastic/eui";
import LoadError from "./LoadError";
import ScorecardList from "./ScorecardList";

const GET_SOCIAL_SCORECARDS = gql`
  query GetSocialScorecards(
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
        scorecards {
          id
          player_name
          position
          game_team {
            id
            color_enum
            rank
          }
          score
          mvp_points
          medic_hits
          accuracy
          shot_team
          hit_diff
          shot_opponent
          times_zapped
          game {
            id
            game_name
            winner {
              id
              color_enum
            }
          }
          player {
            id
            player_name
          }
        }
      }
    }
  }
`;

export default ({ centerFilter, startDateFilter, endDateFilter }) => {
  const { data, loading, error } = useQuery(GET_SOCIAL_SCORECARDS, {
    variables: {
      centers: centerFilter,
      startDate: startDateFilter,
      endDate: endDateFilter,
    },
  });

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  const scorecards = data.centers
    .reduce((games, item) => {
      return games.concat(item.games);
    }, [])
    .reduce((scorecards, item) => {
      return scorecards.concat(item.scorecards);
    }, [])
    .map((item) => {
      return {
        id: item.id,
        player_id: item.player.id,
        player_name: item.player_name,
        position: item.position,
        team_color_enum: item.game_team.color_enum,
        team_rank: item.game_team.rank,
        score: item.score,
        mvp_points: item.mvp_points,
        medic_hits: item.medic_hits,
        accuracy: item.accuracy,
        shot_team: item.shot_team,
        hit_diff: item.hit_diff,
        shot_opponent: item.shot_opponent,
        times_zapped: item.times_zapped,
        game_id: item.game.id,
        game_name: item.game.game_name,
        game_winner_color_enum: item.game.winner[0].color_enum,
      };
    });

  return <ScorecardList data={scorecards} />;
};
