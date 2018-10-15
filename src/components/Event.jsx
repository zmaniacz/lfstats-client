import React from "react";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import GameList from "./GameList";

const Event = ({ event }) => (
  <div>
    <h1>{`${event.name} - ${event.center.name}`}</h1>
    <Tabs defaultActiveKey="event-scorecards" id="event-tabs">
      <Tab eventKey="event-scorecards" title="Scorecards" />

      <Tab eventKey="event-overall" title="Overall" />

      <Tab eventKey="event-games" title="Games Played">
        <GameList games={event.games} />
      </Tab>
    </Tabs>
  </div>
);

export default Event;
