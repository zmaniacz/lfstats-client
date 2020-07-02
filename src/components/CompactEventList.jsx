import React, { Fragment } from "react";
import { EuiLoadingSpinner, EuiBasicTable } from "@elastic/eui";
import EuiCustomLink from "./EuiCustomLink";
import { useQuery, gql } from "@apollo/client";

const GET_RECENT_EVENTS = gql`
  {
    events(
      limit: 10
      order_by: { games_aggregate: { max: { game_datetime: desc_nulls_last } } }
    ) {
      id
      name
      center {
        name
      }
      games_aggregate {
        aggregate {
          max {
            game_datetime
          }
          count
        }
      }
    }
  }
`;

export default function CompactEventList() {
  const { data, loading, error } = useQuery(GET_RECENT_EVENTS);

  const columns = [
    {
      field: "name",
      name: "Event",
      render: (name, item) => (
        <EuiCustomLink to={`/events/${item.id}`}>{name}</EuiCustomLink>
      ),
    },
    {
      field: "center.name",
      name: "Location",
    },
    {
      field: "games_aggregate.aggregate.max.game_datetime",
      name: "Last Played",
      dataType: "date",
    },
    {
      field: "games_aggregate.aggregate.count",
      name: "Games Played",
    },
  ];

  return (
    <Fragment>
      {loading && <EuiLoadingSpinner size="xl" />}
      {error && <p>Error!</p>}
      {data && <EuiBasicTable columns={columns} items={data.events} />}
    </Fragment>
  );
}
