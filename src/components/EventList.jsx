import React from "react";
import { Link } from "react-router-dom";

const EventList = ({ events }) => {
  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
          <Link to={`/event/${event.id}`}>
            {event.id} - {event.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
