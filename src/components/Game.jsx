import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_GAME = gql`
  query GetGame($id: bigint) {
    games(where: { id: { _eq: $id } }) {
      id
      name
      description
      is_comp
      games_aggregate {
        aggregate {
          max {
            game_datetime
          }
        }
      }
      center {
        name
      }
    }
  }
`;

export default function Game({ gameId }) {
  return "a game";
}
