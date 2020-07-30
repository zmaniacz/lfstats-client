import React from "react";
import { ApolloClient, ApolloProvider, HttpLink } from "@apollo/client";
import { cache } from "./cache";
import { BrowserRouter as Router } from "react-router-dom";
import LFApp from "./components/LFApp";
import { Auth0Provider } from "@auth0/auth0-react";

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: process.env.REACT_APP_API_URI,
  }),
});

function LFStats() {
  return (
    <Router>
      <Auth0Provider
        domain="lfstats.us.auth0.com"
        clientId="vPGz5gb3cFP3v8lyISABjRp0AEEA9h6y"
        redirectUri={window.location.origin}
      >
        <ApolloProvider client={client}>
          <LFApp />
        </ApolloProvider>
      </Auth0Provider>
    </Router>
  );
}

export default LFStats;
