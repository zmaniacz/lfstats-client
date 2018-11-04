import React from "react";
import { Link } from "react-router-dom";
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import HitDiffTypeProvider from "./HitDiffTypeProvider";

const CompactScorecardList = ({ scorecards }) => {
  const columns = [
    { title: "#", name: "id" },
    { title: "Name", name: "playerName" },
    {
      title: "Game",
      name: "gameName",
      getCellValue: row => {
        return row.game.name;
      }
    },
    { title: "Position", name: "position" },
    { title: "Score", name: "score" },
    { title: "MVP", name: "mvp" },
    { title: "Hit Diff", name: "hitDiff" },
    { title: "Medic Hits", name: "medicHits" },
    { title: "Accuracy", name: "accuracy" },
    { title: "Shot Team", name: "shotTeam" }
  ];

  const hitDiffColumns = ["hitDiff"];

  return (
    <Grid columns={columns} rows={scorecards}>
      <SortingState
        defaultSorting={[{ columnName: "mvp", direction: "desc" }]}
      />
      <PagingState defaultCurrentPage={0} pageSize={5} />
      <IntegratedSorting />
      <IntegratedPaging />
      <HitDiffTypeProvider for={hitDiffColumns} />
      <Table />
      <TableHeaderRow showSortingControls />
      <PagingPanel />
    </Grid>
  );
};

export default CompactScorecardList;
