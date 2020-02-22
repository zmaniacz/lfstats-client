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
  EuiPanel
} from "@elastic/eui";
import LoadError from "./LoadError";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

const GET_GAME = gql`
  query GetGame($id: bigint) {
    games(where: { id: { _eq: $id } }) {
      id
      game_name
      game_datetime
      game_description
      game_length
      green_adj
      green_eliminated
      green_score
      green_team_id
      red_adj
      red_eliminated
      red_score
      red_team_id
      pdf_id
      type
      winner
      scorecards {
        id
        player_name
        player_id
        team
        penaltiesByScorecardId {
          id
          in_game
          mvp_value
          type
          value
          rescinded
        }
      }
      team_penalties {
        id
        team_color
        type
        value
      }
    }
  }
`;

export default function Game() {
  const { gameId } = useParams();

  const { data, loading, error } = useQuery(GET_GAME, {
    variables: { id: gameId * 1 }
  });

  if (loading) return <EuiLoadingSpinner size="xl" />;
  if (error) return <LoadError />;

  let game = data.games[0];
  let redTeam = {
    team: "red",
    score: game.red_score,
    adj: game.red_adj,
    team_id: game.red_team_id,
    scorecards: game.scorecards.filter(item => {
      return item.team === "red" ? item : null;
    }),
    team_penalties: game.team_penalties.filter(item => {
      return item.team_color === "red" ? item : null;
    })
  };
  let greenTeam = {
    team: "green",
    score: game.green_score,
    adj: game.green_adj,
    team_id: game.green_team_id,
    scorecards: game.scorecards.filter(item => {
      return item.team === "green" ? item : null;
    }),
    team_penalties: game.team_penalties.filter(item => {
      return item.team_color === "green" ? item : null;
    })
  };

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
              <EuiPanel></EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem>
              <EuiPanel></EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageContentBody>
      </EuiPageContent>
    </Fragment>
  );
}
