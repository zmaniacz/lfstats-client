import React, { Fragment } from "react";
import {
  EuiPageContent,
  EuiTitle,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiLoadingSpinner,
  EuiPanel,
} from "@elastic/eui";
import LoadError from "./LoadError";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import TeamScorecard from "./TeamScorecard.jsx";

const GET_GAME = gql`
  query GetGame($id: bigint) {
    games(where: { id: { _eq: $id } }) {
      id
      game_name
      game_datetime
      game_length
      pdf_id
      tdf_key
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

export default function Game() {
  const { gameId } = useParams();

  const { data, loading, error } = useQuery(GET_GAME, {
    variables: { id: gameId * 1 },
  });

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  let game = data.games[0];

  return (
    <Fragment>
      <EuiSpacer />
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>{game.game_name}</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem>
              <EuiPanel>
                <TeamScorecard
                  team={game.winner[0]}
                  gameLength={game.game_length}
                />
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem>
              <EuiPanel>
                <TeamScorecard
                  team={game.loser[0]}
                  gameLength={game.game_length}
                />
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageContent>
    </Fragment>
  );
}
