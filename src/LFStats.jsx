import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { StateProvider } from "./utils/StateContext";
import { BrowserRouter as Router } from "react-router-dom";
import { resolvers, typeDefs } from "./resolvers";
import LFApp from "./components/LFApp";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: process.env.REACT_APP_API_URI,
    headers: {
      "x-hasura-admin-secret": process.env.REACT_APP_API_KEY,
    },
  }),
  typeDefs,
  resolvers,
});
cache.writeQuery({
  query: gql`
    query GetSelectedEvent {
      selectedEvent
    }
  `,
  data: {
    selectedEvent: null,
  },
});
cache.writeQuery({
  query: gql`
    query GetSelectedCenters {
      selectedCenters
    }
  `,
  data: {
    selectedCenters: [],
  },
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
