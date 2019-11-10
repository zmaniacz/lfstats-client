import React from "react";
import { configure } from "axios-hooks";
import axios from "./utils/api";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/deepOrange";
import LFMenu from "./containers/LFMenu";
import EventList from "./components/EventList";
import Event from "./components/Event";
import * as routes from "./routes";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URI
});

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
    <ApolloProvider client={client}>
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
              <Route exact path={routes.LANDING}>
                <EventList />
              </Route>
              <Switch>
                <Route path={routes.EVENTS}>
                  <EventList />
                </Route>
                <Route path={routes.EVENT}>
                  <Event />
                </Route>
              </Switch>
            </LFMenu>
          </StateContext.Provider>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default LFStats;
