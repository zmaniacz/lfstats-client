import React from "react";
import {
  SortingState,
  FilteringState,
  IntegratedFiltering,
  IntegratedSorting,
  PagingState,
  IntegratedPaging
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import HitDiffTypeProvider from "./HitDiffTypeProvider";

function CompactScorecardList({ scorecards }) {
  const columns = [
    { title: "Name", name: "playerName" },
    {
      title: "Game",
      name: "name",
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
      <PagingState defaultCurrentPage={0} pageSize={10} />
      <IntegratedSorting />
      <HitDiffTypeProvider for={hitDiffColumns} />
      <FilteringState defaultFilters={[]} />
      <IntegratedFiltering />
      <IntegratedPaging />
      <Table />
      <TableHeaderRow showSortingControls />
      <TableFilterRow />
      <PagingPanel />
    </Grid>
  );
}

export default CompactScorecardList;
