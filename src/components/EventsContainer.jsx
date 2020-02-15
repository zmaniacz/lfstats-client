import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Event from "./Event";

export default function EventsContainer() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.path}/:eventId`}>
        <Event />
      </Route>
      <Route path={match.path}>
        <h3>Please select an Event</h3>
      </Route>
    </Switch>
  );
}
