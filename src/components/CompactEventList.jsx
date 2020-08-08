import React from "react";
import { EuiBasicTable } from "@elastic/eui";
import EuiCustomLink from "./EuiCustomLink";
import { LoadError, LoadSpinner } from "./LFLoad";
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

  if (loading) return <LoadSpinner />;
  if (error) return <LoadError />;

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

  return <EuiBasicTable columns={columns} items={data.events} />;
}
