import React, { Fragment } from "react";
import EuiCustomLink from "./EuiCustomLink";
import {
  EuiInMemoryTable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiText
} from "@elastic/eui";

export default data => {
  const columns = [
    {
      field: "game_name",
      name: "Game",
      sortable: true,
      render: (game_name, item) => (
        <EuiCustomLink to={`/games/${item.id}`}>{game_name}</EuiCustomLink>
      )
    },
    {
      field: "game_datetime",
      name: "time",
      sortable: true
    },
    {
      field: "winner",
      name: "Winner Score",
      sortable: true,
      render: (winner, item) => {
        let score = 0;
        let color = "default";
        if (item.winner === "red") {
          score = item.red_adj + item.red_score;
          color = "danger";
        } else {
          score = item.green_adj + item.green_score;
          color = "secondary";
        }

        return <EuiText color={color}>{score}</EuiText>;
      }
    },
    {
      field: "loser",
      name: "Loser Score",
      sortable: true,
      render: (loser, item) => {
        let score = 0;
        let color = "default";
        if (item.winner === "red") {
          score = item.green_adj + item.green_score;
          color = "secondary";
        } else {
          score = item.red_adj + item.red_score;
          color = "danger";
        }

        return <EuiText color={color}>{score}</EuiText>;
      }
    }
  ];

  console.log(data);

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
            <EuiInMemoryTable
              columns={columns}
              items={data.data}
              compressed={true}
              pagination={true}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentBody>
    </Fragment>
  );
};
