import React from "react";
import { EuiInMemoryTable } from "@elastic/eui";
import EuiCustomLink from "./EuiCustomLink";

export default ({ events }) => {
  const columns = [
    {
      field: "name",
      name: "Name",
      dataType: "string",
      sortable: true,
      render: (name, item) => (
        <EuiCustomLink to={`/events/${item.id}`}>{name}</EuiCustomLink>
      ),
    },
    {
      field: "type",
      name: "Type",
      dataType: "string",
      sortable: true,
    },
    {
      field: "scoring",
      name: "Scoring Style",
      dataType: "string",
      sortable: true,
    },
    {
      field: "center_name",
      name: "Location",
      dataType: "string",
      sortable: true,
    },
    {
      field: "games_aggregate.aggregate.max.game_datetime",
      name: "Last Played",
      dataType: "date",
      sortable: true,
    },
  ];

  const sorting = {
    sort: {
      field: "games_aggregate.aggregate.max.game_datetime",
      direction: "desc",
    },
    allowNeutralSort: false,
  };

  const search = {
    box: {
      incremental: true,
      schema: true,
    },
    filters: [
      {
        type: "field_value_selection",
        field: "type",
        name: "Type",
        multiSelect: "or",
        options: [
          {
            value: "social",
          },
          {
            value: "league",
          },
        ],
      },
    ],
  };

  return (
    <EuiInMemoryTable
      columns={columns}
      items={events}
      search={search}
      compressed={true}
      pagination={true}
      sorting={sorting}
    />
  );
};
