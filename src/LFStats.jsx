import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import LFApp from "./components/LFApp";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URI
});

const StateContext = React.createContext();

function LFStats() {
  return (
    <ApolloProvider client={client}>
      <StateContext.Provider
        value={{
          selectedEvent: null,
          selectedCenter: null,
          typeFilter: "all"
        }}
      >
        <LFApp />
      </StateContext.Provider>
    </ApolloProvider>
  );
}

export default LFStats;
