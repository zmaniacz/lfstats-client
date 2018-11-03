import React from "react";
import CompactScorecardList from "./CompactScorecardList";
//import GameList from "./GameList";

const Event = ({ event }) => (
  <>
    <CompactScorecardList scorecards={event.scorecards} />
    {/*<GameList games={event.games} />*/}
  </>
);

export default Event;
