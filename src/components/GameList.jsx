import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import ReactTable from "react-table";
import "react-table/react-table.css";

const columns = [
  {
    Header: "Game Name",
    accessor: "name",
    Cell: row => <Link to={`/game/${row.original.id}`}>{row.value}</Link>
  },
  { Header: "Winner Score", accessor: "winnerScore" },
  { Header: "Loser Score", accessor: "loserScore" },
  {
    Header: "PDF",
    accessor: "pdfLink",
    Cell: row => (
      <a href={`${row.value}`}>
        <FontAwesomeIcon icon={faFilePdf} />
      </a>
    )
  }
];

const GameList = ({ games }) => (
  <Row>
    <Col xs={{ span: 10, offset: 1 }}>
      <ReactTable
        showPagination={false}
        columns={columns}
        defaultPageSize={Math.min(games.length, 10)}
        data={games.map(game => ({
          id: game.id,
          name: game.name,
          winnerScore: game.winner === "red" ? game.redScore : game.greenScore,
          loserScore: game.winner === "red" ? game.greenScore : game.redScore,
          pdfLink: game.pdfLink
        }))}
      />
    </Col>
  </Row>
);

export default GameList;
