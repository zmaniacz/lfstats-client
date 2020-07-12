import React from "react";
import { EuiSpacer, EuiLoadingSpinner } from "@elastic/eui";
import LoadError from "./LoadError";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Game from "./Game.jsx";

const GET_GAME = gql`
  query GetGame($id: bigint!) {
    game: games_by_pk(id: $id) {
      id
      game_name
      game_datetime
      game_length
      pdf_id
      tdf_key
      center {
        name
      }
      winner {
        id
        color_desc
        color_enum
        total_score
        raw_score
        elim_bonus
        adjustment
        scorecards(order_by: { score: desc }) {
          id
          player_name
          player_id
          is_sub
          position
          score
          mvp_points
          lives_left
          shots_left
          hit_diff
          missiled_opponent
          times_missiled
          medic_hits
          medic_nukes
          shot_team
          missiled_team
          accuracy
          sp_earned
          sp_spent
          nukes_activated
          nukes_detonated
          nukes_canceled
          ammo_boost
          life_boost
          resupplies
          shot_opponent
          times_zapped
          other_downtime
          resupply_downtime
          survived
          uptime
          penalties {
            id
            in_game
            mvp_value
            value
            type
            rescinded
          }
        }
        team_penalties {
          id
          type
          value
        }
      }
      loser {
        id
        color_desc
        color_enum
        total_score
        raw_score
        elim_bonus
        adjustment
        scorecards(order_by: { score: desc }) {
          id
          player_name
          player_id
          is_sub
          position
          score
          mvp_points
          lives_left
          shots_left
          hit_diff
          missiled_opponent
          times_missiled
          medic_hits
          medic_nukes
          shot_team
          missiled_team
          accuracy
          sp_earned
          sp_spent
          nukes_activated
          nukes_detonated
          nukes_canceled
          ammo_boost
          life_boost
          resupplies
          shot_opponent
          times_zapped
          other_downtime
          resupply_downtime
          survived
          uptime
          penalties {
            id
            in_game
            mvp_value
            value
            type
            rescinded
          }
        }
        team_penalties {
          id
          type
          value
        }
      }
    }
  }
`;

export default () => {
  const { gameId } = useParams();

  const { data, loading, error } = useQuery(GET_GAME, {
    variables: { id: gameId * 1 },
  });

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  return (
    <>
      <EuiSpacer />
      <Game game={data.game} />
    </>
  );
};
