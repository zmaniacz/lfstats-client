import React from "react";
import { Link } from "react-router-dom";
import useAxios from "axios-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";

function EventList() {
  const [{ data, loading, error }] = useAxios("events");

  return (
    <ul>
      {loading && <CircularProgress />}
      {error && <p>Error!</p>}
      {data &&
        data.data.map(event => (
          <li key={event.id}>
            <Link to={`/event/${event.id}`}>
              {event.id} - {event.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default EventList;
