import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { MuiThemeProvider, createMuiTheme, Grid } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/deepOrange";
import LFMenu from "./containers/LFMenu";
import Footer from "./components/Footer";
import EventListContainer from "./containers/EventListContainer";
import EventContainer from "./containers/EventContainer";
import * as routes from "./routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const StateContext = React.createContext();

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: deepOrange
  }
});

function LFStats() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <ApolloProvider client={client}>
          <StateContext.Provider
            value={{
              selectedEvent: null,
              selectedCenter: null,
              typeFilter: "all"
            }}
          >
            <Grid container={true}>
              <LFMenu>
                <Route
                  exact
                  path={routes.LANDING}
                  component={EventListContainer}
                />
                <Switch>
                  <Route path={routes.EVENTS} component={EventListContainer} />
                  <Route path={routes.EVENT} component={EventContainer} />
                  <Route path={routes.PLAYERS} component={EventContainer} />
                </Switch>
                <Footer />
              </LFMenu>
            </Grid>
          </StateContext.Provider>
        </ApolloProvider>
      </Router>
    </MuiThemeProvider>
  );
}

export default LFStats;
