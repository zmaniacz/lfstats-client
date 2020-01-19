import React, { Fragment } from "react";
import {
  EuiInMemoryTable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiLoadingSpinner
} from "@elastic/eui";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import EuiCustomLink from "./EuiCustomLink";
import LoadError from "./LoadError";

const GET_EVENT_SCORECARDS = gql`
  query GetEvent($id: bigint) {
    events(where: { id: { _eq: $id } }) {
      scorecards {
        id
        player_name
        position
        team
        score
        mvp_points
        medic_hits
        accuracy
        shot_team
        hit_diff
        game {
          id
          game_name
          winner
        }
        player {
          id
          player_name
        }
      }
    }
  }
`;

export default function CompactScorecardList({ eventId }) {
  const { data, loading, error } = useQuery(GET_EVENT_SCORECARDS, {
    variables: { id: eventId * 1 }
  });

  const columns = [
    {
      field: "player_name",
      name: "Name",
      sortable: true,
      render: (player_name, item) => (
        <EuiCustomLink to={`/players/${item.player.id}`}>
          {player_name}
        </EuiCustomLink>
      )
    },
    {
      field: "position",
      name: "Position",
      sortable: true
    },
    {
      field: "game.game_name",
      name: "Game",
      sortable: true,
      render: (name, item) => {
        let color;
        if (item.game.winner === "red") color = "danger";
        else color = "secondary";
        return (
          <EuiCustomLink to={`/games/${item.game.id}`}>{name}</EuiCustomLink>
        );
      }
    },
    { field: "score", name: "Score", sortable: true },
    { field: "mvp_points", name: "MVP", sortable: true },
    { field: "hit_diff", name: "Hit Diff", sortable: true },
    { field: "medic_hits", name: "Medic Hits", sortable: true },
    { field: "accuracy", name: "Accuracy", sortable: true },
    { field: "shot_team", name: "Shot Team", sortable: true }
  ];

  const sorting = {
    sort: {
      field: "mvp_points",
      direction: "desc"
    },
    allowNeutralSort: false
  };

  const search = {
    box: {
      incremental: true
    },
    filters: [
      {
        type: "field_value_selection",
        field: "position",
        name: "Position",
        multiSelect: "or",
        options: [
          {
            value: "Commander"
          },
          {
            value: "Heavy Weapons"
          },
          {
            value: "Scout"
          },
          {
            value: "Ammo Carrier"
          },
          {
            value: "Medic"
          }
        ]
      }
    ]
  };

  return (
    <Fragment>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Scorecards</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
      <EuiPageContentBody>
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={false}>
            {loading && <EuiLoadingSpinner size="xl" />}
            {error && <LoadError />}
            {data && (
              <EuiInMemoryTable
                columns={columns}
                items={data.events[0].scorecards}
                search={search}
                compressed={true}
                pagination={true}
                sorting={sorting}
              />
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentBody>
    </Fragment>
  );
}
