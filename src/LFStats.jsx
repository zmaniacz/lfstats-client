import React from "react";
import { configure } from "axios-hooks";
import axios from "./utils/api";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/deepOrange";
import LFMenu from "./containers/LFMenu";
import EventList from "./components/EventList";
import Event from "./components/Event";
import * as routes from "./routes";

const StateContext = React.createContext();

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange
  },
  typography: {
    useNextVariants: true
  }
});

configure({ axios });

function LFStats() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <StateContext.Provider
          value={{
            selectedEvent: null,
            selectedCenter: null,
            typeFilter: "all"
          }}
        >
          <LFMenu>
            <Route exact path={routes.LANDING} component={EventList} />
            <Switch>
              <Route path={routes.EVENTS} component={EventList} />
              <Route path={routes.EVENT} component={Event} />
            </Switch>
          </LFMenu>
        </StateContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default LFStats;
