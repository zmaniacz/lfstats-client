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
} from "@devexpress/dx-react-grid-bootstrap4";
import { Row, Col } from "reactstrap";
import HitDiffTypeProvider from "./HitDiffTypeProvider";
import LFTable from "./LFTable";

const CompactScorecardList = ({ scorecards }) => {
  const columns = [
    { title: "#", name: "id" },
    { title: "Name", name: "playerName" },
    { title: "Game", name: "gameName" },
    { title: "Position", name: "position" },
    { title: "Score", name: "score" },
    { title: "MVP", name: "mvp" },
    { title: "Hit Diff", name: "hitDiff" },
    { title: "Medic Hits", name: "medicHits" },
    { title: "Accuracy", name: "accuracy" },
    { title: "Shot Team", name: "shotTeam" }
  ];

  const hitDiffColumns = ["hitDiff"];

  const rows = scorecards.map(scorecard => ({
    id: scorecard.id,
    playerId: scorecard.playerId,
    playerName: scorecard.playerName,
    gameName: "test",
    position: scorecard.position,
    score: scorecard.score,
    mvp: scorecard.mvp,
    hitDiff: scorecard.hitDiff,
    medicHits: scorecard.medicHits,
    accuracy: scorecard.accuracy,
    shotTeam: scorecard.shotTeam
  }));

  return (
    <Row>
      <Col>
        <div className="m-2">
          <Grid columns={columns} rows={scorecards}>
            <SortingState
              defaultSorting={[{ columnName: "mvp", direction: "desc" }]}
            />
            <IntegratedSorting />
            <PagingState defaultCurrentPage={0} pageSize={5} />
            <IntegratedPaging />
            <HitDiffTypeProvider for={hitDiffColumns} />
            <Table tableComponent={LFTable} />
            <TableHeaderRow showSortingControls />
            <PagingPanel />
          </Grid>
        </div>
      </Col>
    </Row>
  );
};

export default CompactScorecardList;
