import React from "react";
import { ApolloClient, ApolloProvider, HttpLink } from "@apollo/client";
import { cache } from "./cache";
import { BrowserRouter as Router } from "react-router-dom";
import LFApp from "./components/LFApp";

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: process.env.REACT_APP_API_URI,
    headers: {
      "x-hasura-admin-secret": process.env.REACT_APP_API_KEY,
    },
  }),
});

function LFStats() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <LFApp />
      </Router>
    </ApolloProvider>
  );
}

export default LFStats;
