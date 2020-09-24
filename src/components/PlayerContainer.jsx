import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { EuiSpacer } from "@elastic/eui";
import { LoadError, LoadSpinner } from "./LFLoad";
import { Player } from "./Player";

const GET_PLAYER = gql`
  query GetPlayer($id: bigint!) {
    player: players_by_pk(id: $id) {
      id
      ipl_id
      active_player_name
      players_names {
        id
        player_name
      }
    }
  }
`;

export default function PlayerContainer() {
  const { playerId } = useParams();

  const { data, loading, error } = useQuery(GET_PLAYER, {
    variables: { id: playerId * 1 },
  });

  if (loading) return <LoadSpinner />;
  if (error) return <LoadError />;

  return (
    <>
      <EuiSpacer />
      <Player player={data.player} />
    </>
  );
}
