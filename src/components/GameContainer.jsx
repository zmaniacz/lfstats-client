import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Game from "./Game";

export default function GameContainer() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/:gameId`}>
        <Game />
      </Route>
      <Route path={match.path}>
        <h3>Bro, you gotta actually pick a game</h3>
      </Route>
    </Switch>
  );
}
