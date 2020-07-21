import React from "react";
import PropTypes from "prop-types";
import { EuiInMemoryTable, EuiIcon } from "@elastic/eui";
import EuiCustomLink from "./EuiCustomLink";

export default function ScorecardSummary({ data }) {
  let renderArrow = (current, overall) => {
    let arrow = "";
    if (typeof overall !== undefined)
      if (overall > current)
        arrow = (
          <EuiIcon
            type="sortDown"
            color="red"
            title={Number.parseFloat(overall).toFixed(2)}
          />
        );
      else
        arrow = (
          <EuiIcon
            type="sortUp"
            color="green"
            title={Number.parseFloat(overall).toFixed(2)}
          />
        );

    return arrow;
  };

  const columns = [
    {
      field: "player_name",
      name: "Name",
      dataType: "string",
      sortable: true,
      render: (name, item) => (
        <EuiCustomLink to={`/players/${item.player_id}`}>{name}</EuiCustomLink>
      ),
    },
    {
      field: "avg_score",
      name: "Avg Score",
      dataType: "number",
      sortable: true,
      render: (name, item) => {
        return (
          <span>
            {Number.parseFloat(name).toFixed(0)}
            {renderArrow(name, item.overall_avg_score)}
          </span>
        );
      },
    },
    {
      field: "avg_mvp",
      name: "Avg MVP",
      dataType: "number",
      sortable: true,
      render: (name, item) => {
        return (
          <span>
            {Number.parseFloat(name).toFixed(2)}
            {renderArrow(name, item.overall_avg_mvp)}
          </span>
        );
      },
    },
    {
      field: "avg_accuracy",
      name: "Avg Acc",
      dataType: "number",
      sortable: true,
      render: (name, item) => {
        return (
          <span>
            {Number.parseFloat(name * 100).toFixed(2)} %
            {renderArrow(name, item.overall_avg_accuracy)}
          </span>
        );
      },
    },
    {
      field: "hit_diff",
      name: "HitDiff",
      dataType: "number",
      sortable: true,
      render: (name, item) => {
        return (
          <span>
            {Number.parseFloat(name).toFixed(2)}
            {renderArrow(name, item.overall_hit_diff)}
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
      field: "elim_rate",
      name: "Elim Rate",
      dataType: "number",
      sortable: true,
      render: (name, item) => {
        return <span> {(name * 100).toFixed(0)} % </span>;
      },
    },
  ];

  const sorting = {
    sort: {
      field: "avg_mvp",
      direction: "desc",
    },
    allowNeutralSort: false,
  };

  const search = {
    box: {
      incremental: true,
    },
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

ScorecardSummary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      player_id: PropTypes.number,
      player_name: PropTypes.string,
      avg_score: PropTypes.number,
      avg_mvp: PropTypes.number,
      avg_accuracy: PropTypes.number,
      hit_diff: PropTypes.number,
      medic_hits: PropTypes.number,
      elim_rate: PropTypes.number,
    })
  ),
};
