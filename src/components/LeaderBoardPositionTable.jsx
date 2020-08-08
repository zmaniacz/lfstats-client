import React from "react";
import { EuiInMemoryTable } from "@elastic/eui";
import EuiCustomLink from "./EuiCustomLink";

export default function LeaderBoardPositionTable({ position, data }) {
  const columns = [
    {
      field: "player_name",
      name: "Name",
      dataType: "string",
      sortable: false,
      truncateText: true,
      render: (name, item) => (
        <EuiCustomLink to={`/players/${item.player.id}`}>
          {item.player.active_player_name}
        </EuiCustomLink>
      ),
    },
    {
      field: "score",
      name: "Score",
      dataType: "number",
      sortable: true,
      render: (name, item) => (
        <EuiCustomLink to={`/games/${item.game.id}`}>{name}</EuiCustomLink>
      ),
    },
    {
      field: "mvp_points",
      name: "MVP",
      dataType: "number",
      sortable: true,
      render: (name, item) => (
        <EuiCustomLink to={`/games/${item.game.id}`}>
          {Number.parseFloat(name).toFixed(2)}
        </EuiCustomLink>
      ),
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
    <EuiInMemoryTable
      columns={columns}
      items={data}
      search={false}
      compressed={true}
      pagination={pagination}
      sorting={sorting}
    />
  );
}
