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
    { title: "Name", name: "player_name" },
    {
      title: "Game",
      name: "name",
      getCellValue: row => {
        return row.game.game_name;
      }
    },
    { title: "Position", name: "position" },
    { title: "Score", name: "score" },
    { title: "MVP", name: "mvp_points" },
    { title: "Hit Diff", name: "hit_diff" },
    { title: "Medic Hits", name: "medic_hits" },
    { title: "Accuracy", name: "accuracy" },
    { title: "Shot Team", name: "shot_team" }
  ];

  const hitDiffColumns = ["hit_diff"];

  return (
    <Grid columns={columns} rows={scorecards}>
      <SortingState
        defaultSorting={[{ columnName: "mvp", direction: "desc" }]}
      />
      <PagingState defaultCurrentPage={0} pageSize={10} />
      <IntegratedSorting />

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
