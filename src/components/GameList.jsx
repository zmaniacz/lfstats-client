import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-bootstrap4";
import { Row, Col } from "reactstrap";
import PdfLinkTypeProvider from "./PdfLinkTypeProvider";
import LFTable from "./LFTable";

const GameList = ({ games }) => {
  const columns = [
    { title: "Game Name", name: "name" },
    { title: "Winner Score", name: "winnerScore" },
    { title: "Loser Score", name: "loserScore" },
    { title: "PDF", name: "pdfLink" }
  ];

  const pdfColumns = ["pdfLink"];

  const rows = games.map(game => ({
    id: game.id,
    startTime: game.startTime,
    name: game.name,
    winnerScore: game.winner === "red" ? game.redScore : game.greenScore,
    loserScore: game.winner === "red" ? game.greenScore : game.redScore,
    pdfLink: game.pdfLink
  }));

  return (
    <Row>
      <Col xs={{ size: 8, offset: 2 }}>
        <div className="m-2">
          <Grid columns={columns} rows={rows}>
            <PdfLinkTypeProvider for={pdfColumns} />
            <Table tableComponent={LFTable} />
            <TableHeaderRow />
          </Grid>
        </div>
      </Col>
    </Row>
  );
};

export default GameList;
