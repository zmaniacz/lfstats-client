import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const GET_EVENTS = gql`
  {
    events {
      id
      name
    }
  }
`;

function EventList() {
  const { data, loading, error } = useQuery(GET_EVENTS);

  return (
    <ul>
      {loading && <CircularProgress />}
      {error && <p>Error!</p>}
      {data &&
        data.events.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/event/${id}`}>
              {id} - {name}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default EventList;
