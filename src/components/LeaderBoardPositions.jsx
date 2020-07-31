import React from "react";
import { EuiFlexGroup, EuiFlexItem, EuiInMemoryTable } from "@elastic/eui";
import EuiCustomLink from "./EuiCustomLink";

export default ({ data }) => {
  const columns = [
    {
      field: "player_name",
      name: "Name",
      dataType: "string",
      sortable: false,
      truncateText: true,
      render: (name, item) => (
        <EuiCustomLink to={`/players/${item.player_id}`}>{name}</EuiCustomLink>
      ),
    },
    { field: "score", name: "Score", dataType: "number", sortable: true },
    {
      field: "mvp_points",
      name: "MVP",
      dataType: "number",
      sortable: true,
      render: (name, item) => {
        return Number.parseFloat(name).toFixed(2);
      },
    },
  ];

  const sorting = {
    sort: {
      field: "score",
      direction: "desc",
    },
    allowNeutralSort: false,
  };

  const pagination = {
    initialPageSize: 5,
    hidePerPageOptions: true,
  };

  return (
    <EuiFlexGroup wrap={true}>
      <EuiFlexItem grow={3}>
        <EuiInMemoryTable
          columns={columns}
          items={data}
          search={false}
          compressed={true}
          pagination={pagination}
          sorting={sorting}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={3}>
        <EuiInMemoryTable
          columns={columns}
          items={data}
          search={false}
          compressed={true}
          pagination={pagination}
          sorting={sorting}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={3}>
        <EuiInMemoryTable
          columns={columns}
          items={data}
          search={false}
          compressed={true}
          pagination={pagination}
          sorting={sorting}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
