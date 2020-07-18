import React from "react";
import PropTypes from "prop-types";
import { EuiInMemoryTable, EuiHealth } from "@elastic/eui";
import EuiCustomLink from "./EuiCustomLink";
import { teamColorsVar } from "../cache";

export default function ScorecardList({ data }) {
  const columns = [
    {
      field: "player_name",
      name: "Name",
      dataType: "string",
      sortable: true,
      width: "15%",
      truncateText: true,
      render: (name, item) => (
        <EuiCustomLink to={`/players/${item.player_id}`}>{name}</EuiCustomLink>
      ),
    },
    {
      field: "position",
      name: "Position",
      dataType: "string",
      sortable: true,
      width: "15%",
      render: (name, item) => {
        let teamColor = teamColorsVar()[item.team_color_enum];
        return <EuiHealth color={teamColor}>{name}</EuiHealth>;
      },
    },
    {
      field: "game_name",
      name: "Game",
      dataType: "string",
      sortable: true,
      render: (name, item) => {
        return (
          <EuiCustomLink to={`/games/${item.game_id}`}>{name}</EuiCustomLink>
        );
      },
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
    {
      field: "hit_diff",
      name: "Hit Diff",
      dataType: "number",
      sortable: true,
      render: (name, item) => {
        return (
          <span>
            {Number.parseFloat(name).toFixed(2)} ({item.shot_opponent}/
            {item.times_zapped})
          </span>
        );
      },
    },
    {
      field: "medic_hits",
      name: "Medic Hits",
      dataType: "number",
      sortable: true,
    },
    {
      field: "accuracy",
      name: "Accuracy",
      dataType: "number",
      sortable: true,
      render: (name, item) => {
        return <span>{Number.parseFloat(name * 100).toFixed(2)} %</span>;
      },
    },
    {
      field: "shot_team",
      name: "Shot Team",
      dataType: "number",
      sortable: true,
    },
  ];

  const sorting = {
    sort: {
      field: "mvp_points",
      direction: "desc",
    },
    allowNeutralSort: false,
  };

  const search = {
    box: {
      incremental: true,
    },
    filters: [
      {
        type: "field_value_selection",
        field: "position",
        name: "Position",
        multiSelect: "or",
        options: [
          {
            value: "Commander",
          },
          {
            value: "Heavy Weapons",
          },
          {
            value: "Scout",
          },
          {
            value: "Ammo Carrier",
          },
          {
            value: "Medic",
          },
        ],
      },
    ],
  };

  return (
    <EuiInMemoryTable
      columns={columns}
      items={data}
      search={search}
      compressed={true}
      pagination={true}
      sorting={sorting}
    />
  );
}

ScorecardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      player_id: PropTypes.number,
      player_name: PropTypes.string,
      position: PropTypes.string,
      team_color_enum: PropTypes.number,
      team_rank: PropTypes.number,
      score: PropTypes.number,
      mvp_points: PropTypes.number,
      medic_hits: PropTypes.number,
      accuracy: PropTypes.number,
      shot_team: PropTypes.number,
      hit_diff: PropTypes.number,
      shot_opponent: PropTypes.number,
      times_zapped: PropTypes.number,
      game_id: PropTypes.number,
      game_name: PropTypes.string,
      game_winner_color_enum: PropTypes.number,
    })
  ),
};
