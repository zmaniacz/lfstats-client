import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Event from "../components/Event";

const GET_EVENT = gql`
  query Event($eventId: Int!) {
    event(id: $eventId) {
      id
      name
      center {
        id
        name
      }
      games {
        id
        name
        startTime
        winner
        redScore
        greenScore
        pdfLink
      }
    }
  }
`;

const EventContainer = ({ match }) => (
  <Query
    query={GET_EVENT}
    variables={{ eventId: parseInt(match.params.eventId) }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :( - {`${error}`}</p>;

      return <Event event={data.event} />;
    }}
  </Query>
);

export default EventContainer;
