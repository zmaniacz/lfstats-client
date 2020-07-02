import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { StateProvider } from "./utils/StateContext";
import { BrowserRouter as Router } from "react-router-dom";
import LFApp from "./components/LFApp";

const client = new ApolloClient({
  cache: new InMemoryCache(),
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
      <StateProvider>
        <Router>
          <LFApp />
        </Router>
      </StateProvider>
    </ApolloProvider>
  );
}

export default LFStats;
