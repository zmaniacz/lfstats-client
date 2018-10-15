import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Container from "react-bootstrap/lib/Container";
import LFMenu from "./containers/LFMenu";
import Footer from "./components/Footer";
import EventListContainer from "./containers/EventListContainer";
import EventContainer from "./containers/EventContainer";
import * as routes from "./routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const StateContext = React.createContext();

function LFStats() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <StateContext.Provider
          value={{
            selectedEvent: null,
            selectedCenter: null,
            typeFilter: "all"
          }}
        >
          <LFMenu />
          <Container>
            <Route exact path={routes.LANDING} component={EventListContainer} />
            <Switch>
              <Route path={routes.EVENTS} component={EventListContainer} />
              <Route path={routes.EVENT} component={EventContainer} />
              <Route path={routes.PLAYERS} component={EventContainer} />
            </Switch>
            <Footer />
          </Container>
        </StateContext.Provider>
      </ApolloProvider>
    </Router>
  );
}

export default LFStats;
