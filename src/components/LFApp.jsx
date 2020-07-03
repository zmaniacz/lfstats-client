import React from "react";
import { EuiPage, EuiPageBody, EuiSpacer } from "@elastic/eui";
import { Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import EventsContainer from "./EventsContainer";
import PlayersContainer from "./PlayersContainer";
import CentersContainer from "./CentersContainer";
import GameContainer from "./GameContainer";
import Footer from "./Footer";
import LFHeader from "./LFHeader";

import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

export default () => (
  <>
    <LFHeader />
    <EuiPage restrictWidth={true}>
      <EuiPageBody>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/events/:eventId">
            <EventsContainer />
          </Route>
          <Route path="/games">
            <GameContainer />
          </Route>
          <Route path="/players">
            <PlayersContainer />
          </Route>
          <Route path="/centers">
            <CentersContainer />
          </Route>
        </Switch>
        <EuiSpacer />
        <Footer />
      </EuiPageBody>
    </EuiPage>
  </>
);
