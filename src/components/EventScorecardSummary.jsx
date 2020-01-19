import React, { Fragment } from "react";
import {
  EuiInMemoryTable,
  EuiText,
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

const GET_SUMMARY_STATS = gql`
  query GetSummaryStats($id: bigint) {
    events(where: { id: { _eq: $id } }) {
      scorecards(distinct_on: player_id) {
        player {
          id
          player_name
          scorecards_aggregate(where: { event_id: { _eq: $id } }) {
            aggregate {
              avg {
                accuracy
                mvp_points
                score
              }
              min {
                accuracy
                mvp_points
                score
              }
              max {
                accuracy
                mvp_points
                score
              }
              sum {
                shot_opponent
                times_zapped
                medic_hits
              }
            }
          }
        }
      }
    }
  }
`;

export default function CompactScorecardList({ eventId }) {
  const { data, loading, error } = useQuery(GET_SUMMARY_STATS, {
    variables: { id: eventId * 1 }
  });

  const columns = [
    {
      field: "player.player_name",
      name: "Name",
      sortable: true,
      render: (player_name, item) => (
        <EuiCustomLink to={`/players/${item.player.id}`}>
          {player_name}
        </EuiCustomLink>
      )
    },
    {
      field: "player.scorecards_aggregate.aggregate.min.score",
      name: "Min Score",
      sortable: true
    },
    {
      field: "player.scorecards_aggregate.aggregate.avg.score",
      name: "Avg Score",
      sortable: true
    },
    {
      field: "player.scorecards_aggregate.aggregate.max.score",
      name: "Max Score",
      sortable: true
    },
    {
      field: "player.scorecards_aggregate.aggregate.min.mvp_points",
      name: "Min MVP",
      sortable: true
    },
    {
      field: "player.scorecards_aggregate.aggregate.avg.mvp_points",
      name: "Avg MVP",
      sortable: true
    },
    {
      field: "player.scorecards_aggregate.aggregate.max.mvp_points",
      name: "Max MVP",
      sortable: true
    }
  ];

  const sorting = {
    sort: {
      field: "player.scorecards_aggregate.aggregate.avg.mvp_points",
      direction: "desc"
    },
    allowNeutralSort: false
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
