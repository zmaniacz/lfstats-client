import React, { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import EuiCustomLink from "./EuiCustomLink";
import moment from "moment";
import { EuiInMemoryTable } from "@elastic/eui";

export default (data) => {
  const [state] = useContext(StateContext);

  const columns = [
    {
      field: "game_name",
      name: "Game",
      sortable: true,
      render: (game_name, item) => (
        <EuiCustomLink to={`/games/${item.id}`}>{game_name}</EuiCustomLink>
      ),
    },
    {
      field: "game_datetime",
      name: "Time",
      sortable: true,
      render: (game_datetime, item) => {
        console.log(moment(game_datetime));
        return moment.utc(game_datetime).format("YYYY-MM-DD HH:mm");
      },
    },
    {
      field: "winner",
      name: "Winner Score",
      sortable: true,
      render: (winner, item) => {
        return (
          <span style={{ color: state.teamColors[winner[0].color_enum] }}>
            {winner[0].total_score}
          </span>
        );
      },
    },
    {
      field: "loser",
      name: "Loser Score",
      sortable: true,
      render: (loser, item) => {
        return (
          <span style={{ color: state.teamColors[loser[0].color_enum] }}>
            {loser[0].total_score}
          </span>
        );
      },
    },
  ];

  const sorting = {
    sort: {
      field: "game_datetime",
      direction: "asc",
    },
    allowNeutralSort: false,
  };

  return (
    <EuiInMemoryTable
      columns={columns}
      items={data.data}
      compressed={true}
      pagination={true}
      sorting={sorting}
    />
  );
};
