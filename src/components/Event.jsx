import React from "react";
import { Grid } from "@material-ui/core";
import CompactScorecardList from "./CompactScorecardList";
//import GameList from "./GameList";

const Event = ({ event }) => (
  <Grid container>
    <Grid item xs={10}>
      <CompactScorecardList scorecards={event.scorecards} />
    </Grid>
    {/*<GameList games={event.games} />*/}
  </Grid>
);

export default Event;
