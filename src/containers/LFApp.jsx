import React from "react";
import { EuiPage, EuiPageBody, EuiSpacer } from "@elastic/eui";
import LFSideBar from "./LFSideBar";
import { Route, Switch } from "react-router-dom";
import Landing from "../components/Landing";
import Events from "../components/Events";
import Footer from "../components/Footer";
import { BrowserRouter as Router } from "react-router-dom";

import "@elastic/eui/dist/eui_theme_light.css";

export default () => (
  <Router>
    <LFSideBar />
    <EuiPage className="euiNavDrawerPage">
      <EuiPageBody className="euiNavDrawerPage__pageBody">
        <Route exact path="/">
          <Landing />
        </Route>
        <Switch>
          <Route path="/events">
            <Events />
          </Route>
        </Switch>
        <EuiSpacer />
        <Footer />
      </EuiPageBody>
    </EuiPage>
  </Router>
);
