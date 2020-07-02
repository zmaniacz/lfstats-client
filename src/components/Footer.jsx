import React from "react";
import { useQuery, gql } from "@apollo/client";
import { EuiText } from "@elastic/eui";

const GET_FOOTER_STATS = gql`
  {
    scorecards_aggregate {
      aggregate {
        count
        sum {
          shots_hit
        }
      }
    }
    games_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export default function Footer() {
  const { data } = useQuery(GET_FOOTER_STATS);

  return (
    <EuiText color="subdued" textAlign="center" size="xs">
      <span
        style={{ display: "inline-block", transform: "scale(-1, 1)" }}
        role="img"
        aria-label="pewpew"
      >
        🔫
      </span>
      {data &&
        `Players have shot each other ${data.scorecards_aggregate.aggregate.sum.shots_hit} times in ${data.games_aggregate.aggregate.count} games with ${data.scorecards_aggregate.aggregate.count} individual scorecards`}
      <span role="img" aria-label="pewpew">
        🔫
      </span>
    </EuiText>
  );
}
