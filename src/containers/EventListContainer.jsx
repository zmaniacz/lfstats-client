import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import EventList from "../components/EventList";

class EventListContainer extends React.Component {
  render() {
    return (
      <Query
        query={gql`
          {
            events {
              id
              name
              center {
                id
                name
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :( - {`${error}`}</p>;

          return <EventList events={data.events} />;
        }}
      </Query>
    );
  }
}

export default EventListContainer;
